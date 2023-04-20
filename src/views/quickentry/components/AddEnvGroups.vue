<template>
  <Dialog v-bind="$attrs" :config="config" @close="close" @success="confirm">
    <template #content>
      <el-form ref="form" :model="serverFrom" label-width="120px">
        <div v-if="!editItem.ciid">
          <el-form-item :label="$t('groupName')" prop="name">
            <el-input v-model="serverFrom.name" />
          </el-form-item>
          <el-form-item :label="$t('remark')" prop="note">
            <el-input v-model="serverFrom.note" />
          </el-form-item>
        </div>

        <el-form-item :label="$t('groupType')">
          <el-radio-group v-model="machineType">
            <el-radio label="list">{{ $t('nodeList') }}</el-radio>
            <el-radio label="percent">{{ $t('percent') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="machineType === 'list'">
          <el-form-item :label="$t('SelectiveMachine')">
            <div class="machine-select">
              <el-button type="primary" @click="onOpenDialog">
                {{ $t('selectSearchBatch') }}({{ choiceServerNum }})
              </el-button>
              <div class="mt10">({{ $t('selectMachineMessage') }})</div>
            </div>
          </el-form-item>

          <el-form-item :label="$t('matchineIP')" prop="machineList">
            <div class="machine-select">
              <el-input v-model="serverFrom.machineList" type="textarea" />
              <div class="mt10">{{ `${$t('machindListMessage')}；（${$t('example')}： 1.1.1.1,2.2.2.2;3.3.3.3）` }}</div>
            </div>
          </el-form-item>
        </div>
        <div v-if="machineType === 'percent'">
          <el-form-item :label="$t('ProportionalInput')" prop="machinePercent">
            <div class="percent-select">
              <el-input type="textarea" v-model="serverFrom.machinePercent" />
              <div class="percent-desc">
                <div>1. {{ $t('percentFirstDesc') }}（{{ `${$t('example')}：1 : 2 or 10% : 5%` }}）</div>
                <div>2. {{ $t('percentSecondDesc') }}</div>
                <div>{{ $t('example') }}： 123,234;1~100;1:2</div>
                <div>;1~10,13;2</div>
                <div>1234;1,3,5;1:10%</div>
              </div>
            </div>
          </el-form-item>

          <el-form-item :label="$t('serverInformation')" prop="macheinInfoTable">
            <Table style="width:100%" :thead="PERCENT_TABLE_THEAD" :data="tableList" :highlight-current-row="false"
              :tableLoading="tableLoading" />
          </el-form-item>
        </div>
      </el-form>
    </template>
    <template #footer>
      <el-button type="primary" @click="operate('delete', {})">{{ $t('deleteAndExit') }}</el-button>
      <el-button type="primary" @click="operate('save', {})">{{ $t('save') }}</el-button>
      <el-button @click="close">{{ $t('cancel') }}</el-button>
    </template>
  </Dialog>
  <component :is="opType" :types="opType" :conTypes="configTypes" :treeId="treeId" :treeData="treeData" :config="opConfig"
    :radioOption="RADIO_OPTION" :editItem="editItems" @close="compClose" @success="compSuccess" v-if="compFlag"
    v-model="compFlag" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, getCurrentInstance, ComponentInternalInstance, watch } from 'vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import Dialog from '@/components/dialog/index.vue'
import SelectServer from './Selectserver.vue'
import {
  RADIO_OPTION,
  ADD_ENV_GROUPS_CONFIG,
  PERCENT_TABLE_THEAD,
  SELECT_SERVER_FORM_CONFIG,
} from './config'
import {
  updateGroupxx,
  deleteGroup,
  createGroupxx,
  getGroupDetailinfo,
  getMachineTable,
} from '@/api/quickentry/index'
import {
  GroupInfo,
  QuickentryPromiseInfo,
} from '@/api/interface/quickentry'
import { ElMessageBox, ElNotification } from 'element-plus'
import { deepClone } from '@/utils'
interface ApiFunInfo {
  delete?: (data?: any) => Promise<QuickentryPromiseInfo | any>
  save?: (data: GroupInfo) => Promise<QuickentryPromiseInfo | any>
}

interface Stateinfo {
  serverFrom: {
    name?: string;
    note?: string;
    machineList?: string;
    machinePercent?: string | number
  };
  machineType: 'list' | 'percent';
  tableList: Array<any>;
  tableLoading: boolean;
  choiceServerNum: number;
  opType: string;
  compFlag: boolean;
  opConfig: any;
  configTypes: string;
  editItems: any;
}

export default defineComponent({
  components: {
    Table,
    Dialog,
    SelectServer,
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
      default: ADD_ENV_GROUPS_CONFIG
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
  },

  emits: ['success', 'close', 'selectRepo'],

  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeArray = computed(() => {
      return store.getters.treeArray
    })

    const selectIpArray = computed(() => {
      return store.getters.selectIpArray
    })

    const selectGroupArray = computed(() => {
      return store.getters.selectGroupArray
    })

    const variableArray = computed(() => {
      return store.getters.variableArray
    })

    const customArray = computed(() => {
      return store.getters.customArray
    })
    const state: Stateinfo = reactive({
      serverFrom: {
        name: '',
        note: '',
      },
      machineType: 'list',
      choiceServerNum: 0,
      tableList: [],
      tableLoading: false,
      opType: 'Selectserve',
      compFlag: false,
      opConfig: deepClone(SELECT_SERVER_FORM_CONFIG),
      configTypes: '',
      editItems: {}
    })

    // 基本参数
    const parameterProcessing = async () => {
      if (props.editItem.ciid) {
        state.serverFrom.name = `_ci_${props.editItem.ciid}_`
        if (props.editItem.grouptype) {
          state.serverFrom.name = `_ci_${props.editItem.grouptype}_${props.editItem.ciid}_`
        }
        state.serverFrom.note = 'ci'
      }
    }


    // 获取服务器信息
    const getSrverInformation = async () => {
      if (props.editItem.groupid) {
        const params: GroupInfo = {
          treeId: props.treeId,
          groupId: props.editItem.groupid
        }
        const dataRet = await getGroupDetailinfo(params)
        if (dataRet) {
          const newData = JSON.parse(JSON.stringify(dataRet))
          state.choiceServerNum = newData.node.split(';').length
          state.serverFrom['name'] = newData.name
          state.serverFrom['note'] = newData.note
          state.machineType = newData.group_type
          if (newData.group_type === 'list') {
            state.serverFrom.machineList = newData.node
          } else if (newData.group_type === 'percent') {
            state.serverFrom.machinePercent = newData.percent
          }
        }
      }
    }


    // 获取服务器信息
    const getMacheInfoData = async () => {
      state.tableLoading = true
      const dataRet = await getMachineTable({ treeId: props.treeId }).catch(err => { state.tableLoading = false })
      if (dataRet) {
        state.tableLoading = false
        state.tableList = dataRet
      }
    }

    const onOpenDialog = () => {
      state.compFlag = true
      state.configTypes = 'SelectServer'
      state.opType = 'SelectServer'
      state.editItems = {
        title: proxy.$t('SelectiveMachine')
      }
    }

    // 组件回调
    const compClose = () => {
      state.compFlag = false
    }

    const compSuccess = () => {
      compClose()
    }
    const operate = async (type: string, row?: any) => {
      const apiFun: ApiFunInfo = {}
      const paramsFun = {}
      const msgFun = {}
      switch (type) {
        case 'delete':
          msgFun['delete'] = {}
          paramsFun['delete'] = {}
          msgFun['delete'].title = proxy?.$t('deleteGroup')
          msgFun['delete'].desc = proxy?.$t('deleteGroupDesc')
          paramsFun['delete'].treeId = props.treeId
          paramsFun['delete'].groupId = props.editItem.groupid
          apiFun['delete'] = deleteGroup
          break
        case 'save':
          msgFun['save'] = {}
          msgFun['save'].title = state.serverFrom.machineList.length === 0 ? proxy?.$t('createGroup') : proxy?.$t('updateGroup')
          msgFun['save'].desc = state.serverFrom.machineList.length === 0 ? proxy?.$t('createGroupDesc') : proxy?.$t('updateGroupDesc')
          paramsFun['save'] = {}
          paramsFun['save'].treeId = props.treeId
          paramsFun['save'].groupId = props.editItem.groupid
          paramsFun['save'].data = {
            group_type: state.machineType,
            name: state.serverFrom.name,
            note: state.serverFrom.note,
          }
          if (state.machineType === 'list') {
            paramsFun['save'].data['node'] = state.serverFrom.machineList
          } else if (state.machineType === 'percent') {
            paramsFun['save'].data['percent'] = state.serverFrom.machinePercent
          }
          apiFun['save'] = updateGroupxx
          paramsFun['create'] = {}
          paramsFun['create'].treeId = props.treeId
          paramsFun['create'].data = {
            group_type: state.machineType,
            name: state.serverFrom.name,
            note: state.serverFrom.note,
          }
          if (state.machineType === 'list') {
            paramsFun['create'].data['node'] = state.serverFrom.machineList
          } else if (state.machineType === 'percent') {
            paramsFun['create'].data['percent'] = state.serverFrom.machinePercent
          }
          apiFun['create'] = createGroupxx
          break
      }
      if (apiFun[type] && paramsFun[type]) {
        ElMessageBox.confirm(msgFun[type].desc, msgFun[type].title, {
          confirmButtonText: proxy?.$t('config_options_confirm'),
          cancelButtonText: proxy?.$t('config_options_cancel'),
          type: 'warning'
        }).then(async () => {
          if (props.editItem.groupid) {
            const dataRet = await apiFun[type](paramsFun[type])
            if (dataRet) {
              proxy.$notification('operationSuccess')
              proxy.$emit('success', props.editItem.grouptype)
            }
          } else {
            if (type === 'save') {
              const dataRet = await apiFun['create'](paramsFun['create'])
              if (dataRet) {
                proxy.$notification('operationSuccess')
                proxy.$emit('success', props.editItem.grouptype)
              }
            } else if (type === 'delete') {
              proxy.$notification('operationSuccess')
              close()
            }
          }
        }).catch(() => { })
          .finally(() => { })
      }
    }

    const confirm = () => {
      (proxy?.$refs.form as any).validate().then(async (flag: any) => {
        if (flag) {
          close()
        }
      })
    }

    const close = () => {
      proxy.$emit('close')
    }

    onMounted(() => {
      parameterProcessing()
      getSrverInformation()
      getMacheInfoData()
    })

    watch(() => selectIpArray.value, (value) => {
      if (value.length !== 0) {
        if (state.serverFrom.machineList) {
          state.serverFrom.machineList =
            `${state.serverFrom.machineList}${state.serverFrom.machineList[state.serverFrom.machineList.length - 1] === ';' ? '' : ';'}${value.join(',')}`
        } else {
          state.serverFrom.machineList = value.join(',')
        }
      }
    })

    watch(() => selectGroupArray.value, (value) => {
      if (value['name']) {
        if (state.serverFrom.machineList) {
          state.serverFrom.machineList =
            `${state.serverFrom.machineList}${state.serverFrom.machineList[state.serverFrom.machineList.length - 1] === ';' ? '' : ';'}${value.join(',')}`
        } else {
          state.serverFrom.machineList = value.join(',')
        }
      }
    })
    watch(() => variableArray.value, (value) => {
      if (value !== '') {
        if (state.serverFrom.machineList) {
          state.serverFrom.machineList =
            `${state.serverFrom.machineList}${state.serverFrom.machineList[state.serverFrom.machineList.length - 1] === ';' ? '' : ';'}${value}`
        } else {
          state.serverFrom.machineList = value
        }
      }
    })

    watch(() => customArray.value, (value) => {
      if (value !== '') {
        if (state.serverFrom.machineList) {
          state.serverFrom.machineList =
            `${state.serverFrom.machineList}${state.serverFrom.machineList[state.serverFrom.machineList.length - 1] === ';' ? '' : ';'}${value.join(',')}`
        } else {
          state.serverFrom.machineList = value.join(',')
        }
      }
    })

    return {
      treeArray,
      selectIpArray,
      selectGroupArray,
      variableArray,
      customArray,
      ...toRefs(state),
      RADIO_OPTION,
      ADD_ENV_GROUPS_CONFIG,
      PERCENT_TABLE_THEAD,
      getMacheInfoData,
      close,
      confirm,
      operate,
      onOpenDialog,
      compSuccess,
      compClose,
      parameterProcessing,
      getSrverInformation,
    }
  }
})
</script>

<style scoped lang="scss">
.machine-select {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
</style>