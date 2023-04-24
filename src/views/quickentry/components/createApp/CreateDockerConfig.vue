<template>
  <Dialog v-bind="$attrs" :config="config" :title="editItem.title" @close="close" @success="close">
    <template #content>
      <div class="operate-button">
        <el-button type="primary" @click="handleImportHarbor(true)">{{ $t('importHarbor') }}</el-button>
      </div>
      <base-form ref="form" :config="config.form" :params="dockerJsonForm" class="mt20">
        <template #selectedTicketId>
          <el-select class="w450" v-model="selectedTicketId">
            <el-option v-for="item in credentialArr" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </template>
        <template #namespace>
          <div v-if="namespacetemp">
            <el-input class="w450" v-model="dockerJsonForm.namespace" :disabled="!!editItem.namespace" />
          </div>
          <div v-else>
            <el-select :disabled="!!editItem.namespace" class="w450" v-model="dockerJsonForm.namespace"
              :placeholder="`${$t('configFormSelect')}${$t('namespace')}`">
              <el-option v-for="item in nameSpaceArr" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </template>
      </base-form>
    </template>
    <template #footer>
      <div>
        <el-button type="primary" @click="operate('assist')">{{ $t('operationAssistance') }}</el-button>
        <el-button type="primary" @click="operate('add')">{{ $t('confirmAdd') }}</el-button>
        <el-button @click="close">{{ $t('cancel') }}</el-button>
      </div>
    </template>
  </Dialog>
  <component :is="compType" v-model="compFlag" v-if="compFlag" :types="compType" :config="compConfig"
    :editItem="editItems" :treeId="String(treeId)" :treeData="treeData" :opTitle="compTitle" @close="emitClose"
    @success="emitSuccess" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, getCurrentInstance, ComponentInternalInstance } from 'vue'
import store from '@/store'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import OperationAssistance from '../OperationAssistance.vue'
import { ElMessageBox } from 'element-plus'
import {
  CREATE_DOCKER_CONFIG,
  OPERATION_ASSISTANCE_FORM_CONFIG,
} from '../config'
import {
  getNameSpaceList,
  getHarborTicket,
  addDockerConfigJson,
  getClusterLists,
} from '@/api/quickentry/index'
import {
  FlowDeleteLine,
  DockerCOnfigJSONInfo,
} from '@/api/interface/quickentry'

import { deepClone } from '@/utils'

interface Stateinfo {
  dockerJsonForm: DockerCOnfigJSONInfo;
  namespacetemp: boolean;
  nameSpaceArr: { label: string, value: string, statue?: string, age?: string }[];
  credentialArr: { label: string, value: string }[];
  harborFlag: boolean;
  selectedTicketId: string;
  compFlag: boolean;
  compType: string;
  compConfig: any;
  compTitle: string;
  editItems: any;
  clusterList: Array<any>;
  clusterinfo: any;
}

export default defineComponent({
  components: {
    Dialog,
    baseForm,
    OperationAssistance
  },

  props: {
    types: {
      type: String,
      default: 'CreateDockerConfig'
    },
    config: {
      type: Object,
      default: deepClone(CREATE_DOCKER_CONFIG)
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
      dockerJsonForm: {
        ticketid: '',
        namespace: '',
        name: '',
        server: '',
        username: '',
        password: '',
        email: '',
      },
      selectedTicketId: '',
      namespacetemp: false,
      nameSpaceArr: [],
      credentialArr: [],
      harborFlag: false,
      compFlag: false,
      compType: 'OperationAssistance',
      compConfig: deepClone(OPERATION_ASSISTANCE_FORM_CONFIG),
      compTitle: '',
      editItems: {},
      clusterList: [],
      clusterinfo: {},
    })

    // 获取集群列表
    const getNamespaceData = async () => {
      const params: FlowDeleteLine = {
        id: props.editItem.detail.ticketid
      }
      const dataRet = await getNameSpaceList(params)
      if (dataRet) {
        state.nameSpaceArr = dataRet.map(item => {
          return {
            label: item.NAME,
            value: item.NAME,
            status: item.STATUS,
            age: item.AGE,
          }
        })
      }
    }

    const emitClose = () => {
      state.compFlag = false
    }

    const emitSuccess = () => {
      emitClose()
    }

    const confirm = () => {
      close()
    }

    const close = (name?: string) => {
      if (name) {
        proxy.$emit('close', name)
        return
      }
      proxy.$emit('close')
    }

    const defaultAction = () => {
      if (props.editItem.namespace) {
        state.namespacetemp = true
        state.dockerJsonForm.namespace = props.editItem.namespace
        state.dockerJsonForm.ticketid = props.editItem.detail.ticketid
      } else {
        getNamespaceData()
      }
    }

    // 从Harbor凭据中获取信息
    const handleImportHarbor = async (hidden: boolean) => {
      props.config.form.config.filter(item => item.prop === 'selectedTicketId')[0].hidden = !hidden
      if (hidden) {
        if (!state.harborFlag) {
          const dataRet = await getHarborTicket({}).catch(err => state.harborFlag = true)
          if (dataRet) {
            state.harborFlag = true
            state.credentialArr = dataRet.map(item => {
              return {
                label: item.name,
                value: item.id,
              }
            })
          }
        }
      }
    }

    // 集群列表
    const getClusterData = async () => {
      const dataRet = await getClusterLists({})
      if (dataRet) {
        const newData = JSON.parse(JSON.stringify(dataRet))
        state.clusterList = newData.map(item => {
          if (String(item.id) === props.editItem.detail.ticketid) {
            state.clusterinfo = item
          }
          item.value = String(item.id)
          item.label = item.name
          return item
        })
      }
    }


    const operate = async (type: string) => {
      (proxy.$refs.form as any).validFun().then(async (valid) => {
        if (valid) {
          if (type === 'add') {
            ElMessageBox.confirm(proxy.$t('addDockerConfigDesc'), proxy.$t('addDockerConfigTitle'), {
              confirmButtonText: proxy.$t('confirm'),
              cancelButtonText: proxy.$t('cancel')
            }).then(async () => {
              const params: DockerCOnfigJSONInfo = state.dockerJsonForm
              const dataRet = await addDockerConfigJson(params)
              if (dataRet) {
                close(state.dockerJsonForm.name)
              }
            })
          } else if (type === 'assist') {
            state.compFlag = true
            state.compType = 'OperationAssistance'
            state.compConfig = deepClone(OPERATION_ASSISTANCE_FORM_CONFIG)
            state.compTitle = proxy.$t('operationAssistance'),
              state.editItems = {
                type: 'kubernetes',
                name: `kubernetes secret create`,
                handler: state.clusterinfo.create_user,
                url: '/api/ci/v2/kubernetes/secret/dockerconfigjson',
                method: 'POST',
                submit_reason: '',
                remarks: `\n集群ID:${props.editItem.ticketId};\n集群名称:${state.clusterinfo.name}\n命名空间:${props.editItem.namespace}\nsecret:${state.dockerJsonForm.name}`
              }
          }
        }
      })
    }

    onMounted(() => {
      defaultAction()
      getClusterData()
    })

    return {
      treeArray,
      ...toRefs(state),
      CREATE_DOCKER_CONFIG,
      confirm,
      close,
      operate,
      emitClose,
      emitSuccess,
      handleImportHarbor,
    }
  }
})
</script>

<style scoped lang="scss">
.w450 {
  width: 450px
}
</style>