<template>
  <div>
    <Dialog v-bind="$attrs" :config="config" @close="close" :title="`deployment describe ${$t('information')}`"
      @success="confirm">
      <template #content>
        <div v-loading="loading">

          <h3 class="mt30 mb30">{{ $t('newContainer') }}</h3>
          <Table :thead="DEPLOYMENT_DESCRIBE_NEWPOD_THEAD" :data="newTableList" :highlight-current-row="false">
            <template #STATUS="{ row }">
              <div :class="row.STATUS === 'Running' ? 'status-success' : 'status-fail'">
                {{ row.STATUS || '-' }}
              </div>
            </template>
            <template #operation="{ row }">
              <el-tooltip class="box-item" effect="dark" :content="$t('showMore')" placement="top">
                <el-button type="primary" link @click="operate(row, 'view')">
                  <svg-icon icon-class="describe-view" width="16px" height="16px" />
                </el-button>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" :content="$t('enterTerminal')" placement="top">
                <el-button type="primary" link @click="operate(row, 'terminal')">
                  <svg-icon icon-class="describe-terminal" width="16px" height="16px" />
                </el-button>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" :content="$t('showLog')" placement="top">
                <el-button type="primary" link @click="operate(row, 'log')">
                  <svg-icon icon-class="describe-log" width="16px" height="16px" />
                </el-button>
              </el-tooltip>
            </template>
          </Table>

          <h3 class="mt30 mb30">{{ $t('oldContainer') }}</h3>
          <Table :thead="DEPLOYMENT_DESCRIBE_OLDPOD_THEAD" :data="oldTableList" :highlight-current-row="false">
            <template #NAME="{ row }">
              <el-table-column prop="NAME" :label="$t('oldContainer')" sortable width="180" :align="'center'">
                <template #default="{ row }">
                  {{ row.NAME || '-' }}
                </template>
              </el-table-column>
            </template>

            <template #READY="{ row }">
              <el-table-column prop="NAME" label="READY" width="120" sortable :align="'center'">
                <template #default="{ row }">
                  {{ row.READY || '-' }}
                </template>
              </el-table-column>
            </template>
            <template #STATUS="{ row }">
              <el-table-column prop="NAME" label="STATUS" width="120" sortable :align="'center'">
                <template #default="{ row }">
                  <div :class="row.STATUS === 'Running' ? 'status-success' : 'status-fail'">
                    {{ row.STATUS || '-' }}
                  </div>
                </template>
              </el-table-column>
            </template>

            <template #RESTARTS="{ row }">
              <el-table-column prop="NAME" label="RESTARTS" width="120" sortable :align="'center'">
                <template #default="{ row }">
                  {{ row.RESTARTS || '-' }}
                </template>
              </el-table-column>
            </template>

            <template #AGE="{ row }">
              <el-table-column prop="NAME" label="AGE" sortable :align="'center'">
                <template #default="{ row }">
                  {{ row.AGE || '-' }}
                </template>
              </el-table-column>
            </template>

            <template #operation="{ row }">
              <el-tooltip class="box-item" effect="dark" content="查看" placement="top">
                <el-button type="primary" link @click="operate(row, 'view')">
                  <svg-icon icon-class="describe-view" width="16px" height="16px" />
                </el-button>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="进入POD虚拟终端" placement="top">
                <el-button type="primary" link @click="operate(row, 'terminal')">
                  <svg-icon icon-class="describe-terminal" width="16px" height="16px" />
                </el-button>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="查看POD日志" placement="top">
                <el-button type="primary" link @click="operate(row, 'log')">
                  <svg-icon icon-class="describe-log" width="16px" height="16px" />
                </el-button>
              </el-tooltip>
            </template>
          </Table>
          <h3 class="mt30 mb30">{{ $t('detail') }}</h3>
          <div class="describe-detail-border">
            <pre v-html="describe"></pre>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
  <component :is="compType" v-if="compFlag" v-model="compFlag" :editItem="compEditItem" @close="compFlag = false"
    @success="onEmitSuccess" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, getCurrentInstance, ComponentInternalInstance } from 'vue'
import store from '@/store'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import {
  COLLECT_DIALOG_CONFIG,
  DEPLOYMENT_DESCRIBE_NEWPOD_THEAD,
  DEPLOYMENT_DESCRIBE_OLDPOD_THEAD,
} from '../config'
import Table from '@/components/table/index.vue'
import DescribeDetailModal from './DescribeDetailModal.vue'
import {
  getAppInformation,
  getDescAppInformation,
} from '@/api/quickentry/index'
import {
  GetAppInfomation,
} from '@/api/interface/quickentry'

interface TreeInfo {
  id: number;
  name: string;
  children?: TreeInfo[];
}
interface Stateinfo {
  loading: boolean;
  treeArray: TreeInfo[];
  toTreeId: string | number;
  toTreeName: string;
  newTableList: Array<any>;
  oldTableList: Array<any>;
  describe: string;
  compType: string;
  compFlag: boolean;
  compEditItem: GetAppInfomation
}

interface ContainerInfo {
  NAME: string;
  AGE: string;
  READY: string;
  RESTARTS: string;
  STATUS: string;
  operate?: 'view' | 'terminal' | 'log'
}

export default defineComponent({
  components: {
    Dialog,
    Table,
    baseForm,
    DescribeDetailModal
  },

  props: {
    types: {
      type: String,
      default: 'config'
    },
    conTypes: {
      type: String,
      default: 'config',
      require: false
    },
    config: {
      type: Object,
      default: COLLECT_DIALOG_CONFIG
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

  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeArray = computed(() => {
      return store.getters.treeArray
    })

    const state: Stateinfo = reactive({
      loading: false,
      newTableList: [],
      oldTableList: [],
      describe: '',
      treeArray: [],
      toTreeId: props.treeId,
      toTreeName: props.treeData.name,
      compType: '',
      compFlag: false,
      compEditItem: {
        name: '',
        kind: '',
        namespace: '',
        type: '',
        ticketid: ''
      }
    })

    const confirm = () => {
      close()
    }

    const close = () => {
      proxy.$emit('close')
    }

    const handleNodeClick = (data: TreeInfo) => {
      state.toTreeId = data.id
      state.toTreeName = data.name
    }

    const onEmitSuccess = () => {
      state.compFlag = false
    }

    const getDetailFormName = async () => {
      const params: GetAppInfomation = {
        ticketid: props.editItem.ticketid,
        name: props.editItem.name,
        type: props.editItem.type,
        namespace: props.editItem.namespace
      }
      const apiFuns = {
        deployment: getAppInformation,
        daemonset: getDescAppInformation
      }
      switch (props.editItem.kind) {
        case 'deployment':
          break
        case 'daemonset':
          params.kind = props.editItem.kind
          break
      }
      state.loading = true
      try {
        const dataRet = await apiFuns[props.editItem.kind](params)
        state.loading = false
        if (dataRet) {
          state.newTableList = [...dataRet.newpod]
          state.oldTableList = [...dataRet.oldpod]
          state.describe = dataRet.describe
        }
      } catch (error) {
        state.loading = false
        console.error(error)
      }
    }

    // 操作
    const operate = (row: ContainerInfo, type: 'view' | 'terminal' | 'log') => {
      const terminalAddr: string = `${window.location.protocol}//${window.location.host}/api/ci/kubernetes/pod/shell`
      let newBlank = ''
      switch (type) {
        case 'view':
          state.compFlag = true
          state.compType = 'DescribeDetailModal'
          state.compEditItem = {
            ticketid: props.editItem.ticketid,
            name: row.NAME,
            type: 'pod',
            namespace: props.editItem.namespace,
            kind: props.editItem.kind
          }
          break
        case 'terminal':
          newBlank = `?namespace=${props.editItem.namespace}&name=${row.NAME}&clusterid=${props.editItem.ticketid}&type=sh&siteaddr=${window.location.protocol}//${window.location.host}`
          window.open(terminalAddr + newBlank, '_blank')
          break
        case 'log':
          newBlank = `?namespace=${props.editItem.namespace}&name=${row.NAME}&clusterid=${props.editItem.ticketid}&type=log&siteaddr=${window.location.protocol}//${window.location.host}`
          window.open(terminalAddr + newBlank, '_blank')
          break

      }
    }

    onMounted(() => {
      state.treeArray = treeArray.value
      getDetailFormName()
    })

    return {
      treeArray,
      ...toRefs(state),
      COLLECT_DIALOG_CONFIG,
      DEPLOYMENT_DESCRIBE_NEWPOD_THEAD,
      DEPLOYMENT_DESCRIBE_OLDPOD_THEAD,
      confirm,
      operate,
      close,
      onEmitSuccess,
      handleNodeClick,
    }
  }
})
</script>

<style scoped lang="scss">
.describe-detail-border {
  padding: 10px;
  border: 1px solid var(--el-color-gray);
}

.status-success {
  color: var(--el-color-success)
}

.status-fail {
  color: var(--el-color-danger)
}
</style>