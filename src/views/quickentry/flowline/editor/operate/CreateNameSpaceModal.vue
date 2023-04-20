<template>
  <Dialog v-bind="$attrs" :config="config" @close="close" :title="editItem.title" @success="close">
    <template #content>
      <base-form ref="form" :config="config.form" :params="detailFrom" class="mt20 mb20" />
    </template>
    <template #footer>
      <div class="form-confirm">
        <el-button type="primary" @click="operate('Assistance', {})">{{ $t('operationAssistance') }}</el-button>
        <el-button type="primary" @click="operate('confirmAdd', {})">{{ $t('confirmAdd') }}</el-button>
        <el-button @click="close">{{ $t('cancel') }}</el-button>
      </div>
    </template>
  </Dialog>
  <component :is="compType" :types="opType" :opTitle="opTitle" :conTypes="compType" :treeId="treeId" :treeData="treeData" :config="opConfig"
    :editItem="editItems" @close="compFlag = false" @success="compSuccess" v-if="compFlag" v-model="compFlag" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, getCurrentInstance, ComponentInternalInstance } from 'vue'
import store from '@/store'
import OperationAssistance from '../../../components/OperationAssistance.vue'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { deepClone } from '@/utils'

import {
  EDIT_RELY_DIALOG_CONFIG,
} from '../config'
import {
  OPERATION_ASSISTANCE_FORM_CONFIG
} from '../../../components/config'
import {
  getRelyList,
  addNewNameSpace,
  getCodeTicketNoPath,
} from '@/api/quickentry/index'
import {
  TicketAllInfo,
  AssistanceInputParameterInfo,
  NameSpaceInfo,
  QuickentryPromiseInfo
} from '@/api/interface/quickentry'

interface Stateinfo {
  detailFrom: {
    nameSpace: string;
  },
  defaultProps: {
    children: string;
    label: string;
  },
  tableList: Array<any>;
  newrely: any;
  loading: boolean;
  tickedList: TicketAllInfo[];
  compType: string;
  opType: string;
  opTitle: string;
  compFlag: boolean;
  opConfig: object;
  editItems: AssistanceInputParameterInfo;
}


export default defineComponent({
  components: {
    Dialog,
    baseForm,
    OperationAssistance,
  },

  props: {
    types: {
      type: String,
      default: 'Collect'
    },
    conTypes: {
      type: String,
      default: 'Collect',
      require: false
    },
    config: {
      type: Object,
      default: EDIT_RELY_DIALOG_CONFIG
    },
    editItem: {
      type: Object,
      default: {}
    },
    treeId: {
      type: Number,
      default: 4000000000
    },
    treeData: {
      type: Object,
      default: {}
    },
    clusterinfo: {
      require: false,
      type: Object,
      default: {},
    },
  },

  emits: ['success', 'close'],

  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeArray = computed(() => {
      return store.getters.treeArray
    })

    const state: Stateinfo = reactive({
      detailFrom: {
        nameSpace: '',
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      tableList: [],
      tickedList: [],
      newrely: {},
      loading: false,

      compType: '',
      opType: '',
      opTitle: '',
      compFlag: false,
      opConfig: deepClone(OPERATION_ASSISTANCE_FORM_CONFIG),
      editItems: {},
    })

    // 获取依赖规则列表
    const getDatalRely = async () => {
      state.loading = true
      const params = {
        id: props.editItem.sourceId
      }
      const dataRet = await getRelyList(params).catch(() => { state.loading = false })
      if (dataRet) {
        state.loading = false
        state.tableList = [...dataRet]
      }
    }
    // 获取凭据列表 
    const getTickIdList = async () => {
      const dataRet = await getCodeTicketNoPath({})
      if (dataRet) {
        const newData = JSON.parse(JSON.stringify(dataRet))
        newData.map(item => item.label = item.name)
        state.tickedList = [...newData]
        props.config.form.config.filter(item => item.prop === 'ticketid')[0].data = state.tickedList
      }
    }

    const close = () => {
      proxy.$emit('close')
    }

    const compSuccess = () => {
      compClose()
    }

    const compClose = () => {
      state.compFlag = false
    }

    const operate = (type: string, row: any) => {
      (proxy?.$refs.form as any).validFun().then(async (flag: any) => {
        const apiFun:{Assistance?: string, confirmAdd?: (data: NameSpaceInfo)=> Promise<QuickentryPromiseInfo | any>} = {}
        const params: {Assistance?: any, confirmAdd?: NameSpaceInfo} = {}
        if (flag) {
          state.opType = type
          switch (type) {
            case 'Assistance':
              state.compFlag = true
              state.compType = 'OperationAssistance'
              state.opConfig = deepClone(OPERATION_ASSISTANCE_FORM_CONFIG)
              state.opTitle = proxy.$t('operationAssistance'),
              state.editItems = {
                type: 'kubernetes',
                name: `${proxy.$t('create')}NAMESPACE`,
                handler: props.clusterinfo.create_user,
                url: '/api/ci/v2/kubernetes/namespace',
                method: 'POST',
                submit_reason: '',
                remarks: `\n集群ID:${props.editItem.ticketId};\n集群名称:${props.clusterinfo.name}\n命名空间:${state.detailFrom.nameSpace}`
              }
              break
            case 'confirmAdd':
              apiFun.confirmAdd = addNewNameSpace
              params['confirmAdd'] = {
                ticketid: props.editItem.ticketId,
                namespace: state.detailFrom.nameSpace
              }
              break
          }
          if (apiFun[type] && params[type]) {
            const dataRet = await apiFun[type](params[type])
            if (dataRet) {
              proxy?.$notification('operationSuccess')
              proxy.$emit('success')
            }
          }
        }
      })
    }

    onMounted(() => {
    })

    return {
      treeArray,
      ...toRefs(state),
      EDIT_RELY_DIALOG_CONFIG,
      close,
      operate,
      compSuccess,
      getTickIdList,
      getDatalRely,
    }
  }
})
</script>

<style scoped lang="scss">
.addr-tooltip {
  display: inline-block;
  margin-left: 10px;
}

.form-confirm {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 40px;
}
</style>