<template>
  <Dialog v-bind="$attrs" :config="config" :title="editItem.title" @close="onClose" @success="onClose">
    <template #content>
      <div v-if="hasTable">
        <el-form class="model-form " :model="detailInfo" label-width="100px" :inline="true">
          <!-- 任务名称 -->
          <el-form-item :label="$t('taskName') + '：'">
            {{ detailInfo.extended?.name }}
          </el-form-item>
          <!-- 任务类型 -->
          <el-form-item :label="$t('taskType') + '：'">
            {{ SUB_TASK_TYPE_MAP[detailInfo?.subtask_type] }}
          </el-form-item>
          <!-- 执行账户 -->
          <el-form-item :label="$t('executionAccount') + '：'">
            {{ detailInfo.extended?.user }}{{ detailInfo.extended?.approver }}
          </el-form-item>
          <!-- 耗时 -->
          <el-form-item :label="$t('useTime') + '：'">
            {{ seftime(detailInfo.starttime, detailInfo.finishtime) }}
          </el-form-item>
        </el-form>

        <el-form class="model-form " :model="detailInfo" label-width="100px" :inline="true">
          <!-- 任务状态 -->
          <el-form-item :label="$t('jobxTaskStatus') + '：'">
            <span :style="`color:${JOBX_GROUP_TABLE_STATUS[detailInfo.status].color}`">
              {{ JOBX_GROUP_TABLE_STATUS[detailInfo.status].text }}
            </span>
          </el-form-item>
          <!-- 开始时间 -->
          <el-form-item :label="$t('startAt') + '：'">
            {{ detailInfo.starttime }}
          </el-form-item>
          <!-- 结束时间 -->
          <el-form-item :label="$t('finishAt') + '：'">
            {{ detailInfo.finishtime || '-' }}
          </el-form-item>
        </el-form>
      </div>
      <div>{{ $t('logDetailsText') }}</div>
      <div class="mt10">
        <TaskWebsocket :locationStr="locationStr" :taskuuid="editItem.uuid" />
      </div>
    </template>
    <template #footer>
      <el-button type="primary" @click="onClose">{{ $t('close') }}</el-button>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch,onUnmounted, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import TaskWebsocket from './TaskWebsocket.vue'
import { seftime } from '@/utils'
import {
  SUB_TASK_TYPE_MAP,
  TASK_JOB_DETAIL_MODAL_CONFIG,
  JOBX_GROUP_TABLE_STATUS,
} from '../config'
import {
  getModalTaskJob
} from '@/api/history/index'

export default defineComponent({
  components: {
    Dialog,
    TaskWebsocket,
  },
  props: {
    types: {
      type: String,
      default: 'TaskJobDetailModal'
    },
    config: {
      type: Object,
      default: TASK_JOB_DETAIL_MODAL_CONFIG
    },
    editItem: {
      type: Object,
      default: {}
    },
    hasTable: {
      type: Boolean,
      default: false,
      required: false
    },
    treeId: {
      type: String,
      default: '4000000000',
    },
    treeData: {
      type: Object,
      default: {}
    },
  },
  emits: ['success', 'close'],
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const state = reactive({
      locationStr: '',
      timer: null,
      detailInfo: {} as any
    })

    // 关闭弹窗
    const onClose: () => void = (): void => {
      proxy.$emit('close')
    }

    const defaultOperate: () => void = (): void => {
      state.locationStr = `/api/jobx/slave/${props.editItem.slave}/ws?uuid=${props.editItem.uuid}`
      state.detailInfo = props.editItem.item
    }

    // 定时器轮询
    const getTaskJob: () => Promise<void> = async (): Promise<void> => {
      const params = {
        treeId: props.treeId,
        uuid: props.editItem.uuid,
        subtaskuuid: props.editItem.item.uuid,
      }
      const dataRet = await getModalTaskJob(params).catch(err => {clearTimer()})
      if (dataRet) {
        state.detailInfo = dataRet
        if (dataRet.status === 'success' || dataRet.status === 'fail') {
          clearTimer()
        }
      }
    }
    // 基础信息定时发布任务
    const handleDetailDataTimer = () => {
      if (state.timer !== null) {
        clearTimer()
        return
      }
      state.timer = setInterval(() => {
        getTaskJob()
      }, 5000)
    }

    //清除定时任务 
    const clearTimer = () => {
      if (state.timer !== null) {
        clearInterval(state.timer)
      }
      state.timer = null
    }

    onMounted(() => {
      defaultOperate()
      getTaskJob()
      handleDetailDataTimer()
    })

    onUnmounted(() => {
      clearTimer()
    })

    return {
      SUB_TASK_TYPE_MAP,
      JOBX_GROUP_TABLE_STATUS,
      seftime,
      ...toRefs(state),
      onClose
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-content {
  padding: 10px;
  min-height: 400px;
  widows: 100%;
  background-color: #000;
  color: #FFF;
}

.model-form {
  :deep(.el-form-item__label) {
    font-size: 12px !important;
  }

  :deep(.el-form-item__content) {
    font-size: 12px !important;
  }
}
</style>