<template>
  <el-card v-bind="$attrs" class="box-card">
    <template #header>
      <div class="card-header" @click="jumpSubTask">
        <div class="card-header-left">
          {{ cardIndex }}-{{ Number(taskIndex) + 1 }} (<span
            :style="`color:${JOBX_GROUP_TABLE_STATUS[editItem?.status]?.color}`">
            {{ JOBX_GROUP_TABLE_STATUS[editItem?.status]?.detailText }}
          </span>)
          <el-tooltip effect="dark" :content="editItem['nodelist']" placement="top">
            <div class="card-header-left-button" type="primary" link>
              {{ editItem['nodelist'] }}
            </div>
          </el-tooltip>
        </div>

        <div class="card-header-right">
          <el-button v-if="editItem?.confirm === 'WaitConfirm'" class="mr10" type="primary" link
            @click.stop="handleConfirm">{{ $t('ignoreError') }}</el-button>
          <span>{{ seftime(editItem.starttime, editItem.finishtime) }}</span>
        </div>
      </div>
    </template>
    <div class="card-content">
      <div v-if="editItem.jobInfoByUuid?.[editItem.uuid]?.length">
        <div v-for="(item, index) in editItem.jobInfoByUuid?.[editItem.uuid]" class="card-content-item"
          :style="`background-color:${SUB_TASK_GROUP_STATUS[item.status]}`" @click="handleOpenDialog(item)">
          <div class="card-content-item-row">
            <div>
              {{ seftime(item.starttime, item.finishtime) }}
              <span class="span-block"> {{ index + 1 }}</span>
              <span class="span-block">({{ JOBX_GROUP_TABLE_STATUS[item?.status].text }})</span>
              <span class="span-block">{{ item.extended.name }}</span>
            </div>
            <div class="card-content-item-operate">
              <div class="card-content-item-operate-div">
                <el-button type="primary" link v-for="(cItem, cIndex) in SUB_TASK_OPERATE_GROUP" :key="cIndex"
                  @click.stop="handleOperate(cItem.value, item, editItem.uuid)">
                  <svg-icon v-if="cItem.value === 'refresh'" class="icon-style" icon-class="refresh" width="20" />
                  <span v-else>
                    <span v-if="handleClickShowStatus(item, cItem)">{{ cItem.text }}</span>
                  </span>
                </el-button>
              </div>

              <div>
                <div class="item-group" v-for="(cItem, cIndex) in SUB_TASK_OPERATE_SPAN_INFO_GROUP" :key="cIndex">
                  <div v-if="handleShowStatus(cItem)">
                    [{{ cItem.text }}]
                  </div>
                </div>
              </div>
              <div>
                <!-- <el-button type="primary" link @click.stop="describeecs({})">{{ $t('viewEcsStatus') }}</el-button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="card-content-empty">
        {{ $t('waitExecution') }}
      </div>
    </div>
  </el-card>
  <component :is="compType" v-if="compFlag" v-model="compFlag" :hasTable="hasTable" :treeId="treeId" :treeData="treeData"
    :editItem="compEditItem" :types="compType" :config="compConfig" @close="emitClose" @success="emitSuccess"
    @refresh="emitRefresh" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import TaskJobDetailModal from '../components/TaskJobDetailModal.vue'
import EcsDescribeModal from './EcsDescribeModal.vue'
import { useRoute } from 'vue-router'
import { seftime } from '@/utils'
import {
  TASK_AWS_ECS_MODAL_CONFIG,
  JOBX_GROUP_TABLE_STATUS,
  SUB_TASK_GROUP_STATUS,
  SUB_TASK_OPERATE_GROUP,
  TASK_JOB_DETAIL_MODAL_CONFIG,
  SUB_TASK_OPERATE_MESSAGE_GROUP,
  SUB_TASK_OPERATE_SPAN_INFO_GROUP,
} from '../config'
import { ElMessageBox } from 'element-plus'

import {
  updateIgnoreError,
  updateImpleOperate,
  updateTaskOperate,
} from '@/api/history/index'

import {
  ISubTaskSubuuIdParams,
  ISubTaskConfirmData
} from '@/api/interface/history'

export default defineComponent({
  components: {
    TaskJobDetailModal,
    EcsDescribeModal
  },
  props: {
    taskIndex: {
      type: Number,
      default: 0
    },
    cardIndex: {
      type: Number,
      default: 0
    },
    treeId: {
      type: String,
      default: ''
    },
    treeData: {
      type: Object,
      default: {}
    },
    editItem: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const route = useRoute()
    const state = reactive({
      compType: '',
      compFlag: false,
      compEditItem: {} as any,
      compConfig: null,
      hasTable: false,
      operateMessage: SUB_TASK_OPERATE_MESSAGE_GROUP
    })
    // subTask 子任务点击跳转 
    const jumpSubTask: () => void = (): void => {
      window.open(`/#/history/jobdetail/${props.treeId}/${route.params.projectid}/${props.editItem.uuid}`, '_blank')
    }

    // 忽略错误 
    const handleConfirm: () => void = (): void => {
      ElMessageBox.confirm(proxy.$t('ignoreErrorMessage'), proxy.$t('ignoreError'), {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(async () => {
        const params: ISubTaskSubuuIdParams = {
          treeId: props.treeId,
          subuuid: props.editItem.uuid,
        }
        const dataRet = await updateIgnoreError(params)
        if (dataRet) {
          proxy.$notification('operationSuccess')
        }
      })
    }

    // 子流程点击打开弹窗
    const handleOpenDialog: (row: any) => void = (row: any): void => {
      console.log('rowsssss', props.editItem)
      state.compType = 'TaskJobDetailModal'
      state.compFlag = true
      state.compConfig = TASK_JOB_DETAIL_MODAL_CONFIG
      state.hasTable = true
      state.compEditItem = {
        title: proxy.$t('taskExecutionLog'),
        item: row,
        cardUUid: row.uuid,
        uuid: props.editItem.uuid
      }
    }

    // 子流程操作 
    const handleOperate: (type: string, row: any, uuid: string) => void = (type: string, row: any, uuid: string): void => {
      const commonParams: ISubTaskConfirmData = {
        taskuuid: uuid,
        subtaskuuid: row.uuid,
        subtasktype: row.subtask_type
      }
      const apiFun = {
        confirm: updateImpleOperate,
        retry: updateImpleOperate,
        ignore: updateTaskOperate,
        termination: updateTaskOperate,
      }
      // running
      const apiParams = {
        confirm: { treeId: props.treeId, data: { ...commonParams, control: 'next' } },
        retry: { treeId: props.treeId, data: { ...commonParams, control: 'running' } },
        ignore: { treeId: props.treeId, data: { ...commonParams, control: 'ignore' } },
        termination: { treeId: props.treeId, data: { ...commonParams, control: 'fail' } },
      }
      if (type === 'refresh') {
        return
      } else {
        ElMessageBox.confirm(state.operateMessage[type].message, state.operateMessage[type].title, {
          confirmButtonText: state.operateMessage[type].btnConfirm ? state.operateMessage[type].btnConfirm : proxy.$t('confirm'),
          cancelButtonText: proxy.$t('cancel'),
          type: 'warning'
        }).then(async () => {
          if (apiFun[type] && apiParams[type]) {
            const dataRet = await apiFun[type](apiParams[type])
            if (dataRet) {
              proxy.$notification('operationSuccess')
            }
          }
        })
      }
    }

    //查看ECS状态
    const describeecs: (row: any) => void = (row: any): void => {
      console.log(row, props.editItem)
      state.compFlag = true
      state.compType = 'EcsDescribeModal'
      state.compConfig = JSON.parse(JSON.stringify(TASK_AWS_ECS_MODAL_CONFIG))
      state.compEditItem = {
        // ticketid: state.projectInfo.ci_type_ticketid,
        ticketid: '',
        item: row,
        title: 'AWS ECS'
      }
    }

    // 子流程 分组信息操作展示条件 
    const handleClickShowStatus: (item: any, subItem: any) => boolean = (item: any, subItem: any): boolean => {
      return {
        [subItem.value]: (item.status === 'decision'),
        confirm: item.pause && (item.status == 'fail' || item.status == 'success' || item.status == 'ignore')
      }[subItem.value]
    }

    //子流程 分组信息展示条件 
    const handleShowStatus: (row: any) => boolean = (row: any): boolean => {
      return { [row.value]: props.editItem.extended?.[row.type] === row.value }[row.value]
    }

    // 组件回调
    const emitSuccess: () => void = (): void => {
      emitClose()
    }

    const emitRefresh: () => void = (): void => { }

    const emitClose: () => void = (): void => {
      state.compFlag = false
    }

    onMounted(() => {
    })

    return {
      JOBX_GROUP_TABLE_STATUS,
      SUB_TASK_GROUP_STATUS,
      SUB_TASK_OPERATE_GROUP,
      SUB_TASK_OPERATE_SPAN_INFO_GROUP,
      ...toRefs(state),
      seftime,
      jumpSubTask,
      handleConfirm,
      handleOpenDialog,
      emitSuccess,
      emitClose,
      emitRefresh,
      handleOperate,
      handleShowStatus,
      handleClickShowStatus,
      describeecs,
    }
  }
})
</script>

<style lang="scss" scoped>
.box-card {
  min-width: 500px;
  max-width: 500px;
  margin: 10px 20px;
  min-height: 330px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-left,
  &-right {
    vertical-align: middle;
    display: flex;
    align-items: center;
  }
}

.card-header-left-button {
  display: inline-block;
  color: var(--el-color-primary);
  width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: 6px;
  cursor: pointer;
}

.card-content {
  font-size: 12px;

  &-item {
    width: 100%;
    height: 70px;
    cursor: pointer;
    margin-bottom: 10px;

    &-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 5px 10px;
      height: 100%;
    }

    &-operate {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-direction: column;
      height: 100%;

      &-div {
        &-button {
          display: inline-block;
          margin-left: 3px;
        }
      }

    }
  }

  &-empty {
    width: 100%;
    height: 100%;
    min-height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.span-block {
  display: inline-block;
  margin-left: 5px;
  color: var(--color_bg);
}

.item-group {
  display: inline-block;
  margin-left: 5px;
  color: var(--color_text);
}
</style>