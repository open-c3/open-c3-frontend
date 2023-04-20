<template>
  <Dialog v-bind="$attrs" :config="config" :title="editItem.title" @close="onClose" @success="onClose">
    <template #content>
      <Table :thead="ECS_DESCRIBE_THEAD" :data="list" />
      <el-form class="model-form mt20" :model="ecsForm" label-width="100px">
        <el-form-item :label="`${$t('versionInfo')}：`">
          <pre v-if="ecsForm.describe" class="layout-pre" v-html="ecsForm.describe"></pre>
          <div v-else>-</div>
        </el-form-item>
        <el-form-item :label="`ECS${$t('describe')}：`">
          <pre v-if="ecsForm.taskdefinition"  class="layout-pre" v-html="ecsForm.taskdefinition"></pre>
          <div v-else>-</div>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button type="primary" @click="onClose">{{ $t('close') }}</el-button>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, onUnmounted, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import { seftime } from '@/utils'
import {
  ECS_DESCRIBE_THEAD,
  TASK_AWS_ECS_MODAL_CONFIG,
} from '../config'
import {
  getPostEcsData
} from '@/api/history/index'
import {
  IAWSECSTicketidData
} from '@/api/interface/history'

export default defineComponent({
  components: {
    Dialog,
    Table,
  },
  props: {
    types: {
      type: String,
      default: 'EcsDescribeModal'
    },
    config: {
      type: Object,
      default: TASK_AWS_ECS_MODAL_CONFIG
    },
    editItem: {
      type: Object,
      default: {}
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
      detailInfo: {} as any,
      list: [],
      ecsForm: {
        describe: '',
        taskdefinition: '',
      },
    })

    // 关闭弹窗
    const onClose: () => void = (): void => {
      proxy.$emit('close')
    }
    // 获取AWS ECS 集群信息

    const getData: () => Promise<void> = async (): Promise<void> => {
      const params: IAWSECSTicketidData = {
        ticketid: props.editItem.ticketId,
        data: { cmd: props.editItem.item.cmd }
      }
      const testParams = {
        ticketid: '7',
        data: { cmd: `#!awsecs\nregion: cn-northwest-1\ncluster: guyuehome\nservice: test-guyuehome-front-service\ntask-definition: test-guyuehome-front-service` }
      }
      const dataRet = await getPostEcsData(testParams)
      if (dataRet) {
        state.list = dataRet.deployments
        state.ecsForm.describe = dataRet.describe
        state.ecsForm.taskdefinition = dataRet.taskdefinition
      }
    }

    const defaultOperate: () => void = (): void => {
      state.locationStr = `/api/jobx/slave/${props.editItem.slave}/ws?uuid=${props.editItem.uuid}`
      state.detailInfo = props.editItem.item
    }

    onMounted(() => {
      console.log(props.editItem)
      defaultOperate()
      getData()
    })

    onUnmounted(() => {
    })

    return {
      seftime,
      ECS_DESCRIBE_THEAD,
      ...toRefs(state),
      onClose,
      getData
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
.layout-pre {
  white-space: pre-wrap
}
</style>