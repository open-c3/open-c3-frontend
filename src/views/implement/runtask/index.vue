<template>
  <div class="body-layout1">
    <saas-tabs :label="treeData?.parent" class="mt-20" />
    <div class="layout-content">
      <el-form :model="taskForm" label-width="100px">
        <el-form-item :label="$t('task')">
          <el-select class="w450" v-model="taskForm.choiceJob" @change="jobhandleChange">
            <el-option v-for="item in allTaskOptions" :key="item" :value="JSON.stringify(item)" :label="item.alias" />
          </el-select>
        </el-form-item>

        <el-form-item v-if="showJobxGroup === 1" :label="$t('Group')">
          <el-select class="w450" v-model="taskData.group">
            <el-option v-for="item in allGroups" :key="item" :value="item.name" :label="item.alias" />
          </el-select>
        </el-form-item>
        <div v-for="(item, index) in jobVar" :key="index">
          <!-- C3TEXT -->
          <el-form-item v-if="!varsValue[item.name] && item.name === 'C3TEXT'" :label="item.name">
            <el-input class="w450" type="textarea" v-model="item.value" :placeholder="$t('content')" />
            <div class="mt5">{{ item.describe || '' }}</div>
          </el-form-item>

          <!-- C3SUBTREE -->
          <el-form-item v-if="!varsValue[item.name] && item.name === 'C3SUBTREE'" :label="item.name">
            <el-select class="w450" v-model="item.value">
              <el-option v-for="(cItem, cIndex) in c3Subtree" :key="cIndex" :value="cItem.id" :label="cItem.name" />
            </el-select>
            <div class="mt5">{{ item.describe || '' }}</div>
          </el-form-item>

          <!-- item.name !== C3SUBTREE、 C3TEXT -->
          <el-form-item v-if="!varsValue[item.name] && item.name !== 'C3SUBTREE' && item.name !== 'C3SUBTREE'"
            :label="item.name">
            <el-input v-model="item.value" :placeholder="$t('fillTaskVariables')" />
            <div class="mt5">{{ item.describe || '' }}</div>
          </el-form-item>

          <!-- varsValue[item.name] -->
          <el-form-item v-if="varsValue[item.name]" :label="item.name">
            <div v-if="handwritten[item.name]">
              <el-input class="w450" v-model="item.value" :placeholder="$t('fillTaskVariables')" />
            </div>
            <div v-else>
              <el-select class="w450" v-model="item.value">
                <el-option v-for="(cItem, cIndex) in varsValue[item.name]" :key="cIndex" :value="cItem" :label="cItem" />
              </el-select>
            </div>
            <div class="ml10" v-if="item.name !== 'tester' && item.name !== 'approver'">
              <el-tooltip class="box-item" effect="dark" :content="handwritten[item.name] ? $t('writtern') : $t('select')"
                placement="top">
                <div class="item-value-switch">
                  <el-switch v-model="handwritten[item.name]" @change="onSwitchChange(index, item.name, $event)" />
                  <div class="ml10">{{ handwritten[item.name] ? $t('filterText') : $t('select') }}</div>
                </div>
              </el-tooltip>
            </div>
          </el-form-item>

          <!-- 选择服务器 -->
          <el-form-item v-if="item.name === 'ip'" label="">
            <el-button type="primary" @click="handleSelectServer">{{ $t('selectServer') }}</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div class="layout-content-confirm">
        <el-button type="primary" @click="handleConfirm">{{ $t('confirm') }}</el-button>
      </div>
    </div>
  </div>
  <component :ref="compType" :is="compType" v-if="compFlag" v-model="compFlag" :radioOption="SELECT_SERVER_RADIO_OPTION"
    :treeData="treeData" :treeId="treeId" :editItem="editItem" :config="ADD_ENV_GROUPS_CONFIG" @close="compClose"
    @success="compSuccess" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import store from '@/store'
import Selectserver from '@/views/quickentry/components/Selectserver.vue'
import {
  ADD_ENV_GROUPS_CONFIG,
  SELECT_SERVER_RADIO_OPTION,
} from '../config'
import {
  getAllGroupList,
  getTreeJobs,
  getGroupBatchesList,
  getJobformList,
  getSubTreeList,
  createNewTask,
  runquicklyRunjob,
} from '@/api/implement/index'


import {
  TreeIdInfo,
  JobGroupFormInfo,
  CreateTaskInfo,
  RunJobTaskInfo,
} from '@/api/interface/implement'

interface StateInfo {
  taskForm: any;
  allTaskOptions: Array<any>
  ciInfo: any;
  allGroups: Array<any>;
  _rollbackVersion_: string;
  deployVersion: string;
  iamtask4Jobx: number;
  showJobxGroup: number;
  varsValue: any;
  taskData: any;
  c3Subtree: Array<any>;
  c3SubtreeLoadover: boolean;
  jobsLoadover: boolean;
  groupStrArr: Array<any>;
  varTemp: Array<any>;
  jobVar: Array<any>;
  handwritten: any;
  compType: string;
  editItem: any;
  compFlag: boolean;
  selectIpStr: string;
}

export default defineComponent({
  props: {
    jobId: {
      type: String,
      default: '',
      required: false
    }
  },
  components: {
    Selectserver,
  },
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeId = computed(() => {
      return store.getters.treeId
    })

    const treeData = computed(() => {
      return store.getters.treeData
    })

    const selectIpArray = computed(() => {
      return store.getters.selectIpArray
    })

    const selectGroupArray = computed(() => {
      return store.getters.selectGroupArray
    })

    const customArray = computed(() => {
      return store.getters.customArray
    })

    const state: StateInfo = reactive({
      taskForm: {
        choiceJob: '',
      },
      allTaskOptions: [],
      ciInfo: {},
      allGroups: [],
      _rollbackVersion_: '',
      deployVersion: '',
      iamtask4Jobx: 0,
      showJobxGroup: 0,
      varsValue: {},
      taskData: {
        jobname: null,
        group: null,
        variable: {},
        uuid: null
      },
      c3Subtree: [],
      c3SubtreeLoadover: false,
      jobsLoadover: false,
      groupStrArr: [],
      varTemp: [],
      jobVar: [],
      handwritten: {},
      compType: '',
      editItem: {},
      compFlag: false,
      selectIpStr: '',
    })

    //获取所有作业列表
    const getAllGroupsData = async () => {
      const params: TreeIdInfo = {
        treeId: treeId.value
      }
      const dataRet = await getAllGroupList(params)
      if (dataRet) {
        dataRet.forEach(item => {
          state.ciInfo[`_ci_${item.id}_`] = item.name
          state.ciInfo[`_ci_test_${item.id}_`] = `${item.name}:${proxy.$t('test')}`
          state.ciInfo[`_ci_online_${item.id}_`] = `${item.name}:${proxy.$t('online')}`
        })

        const jobDataRet = await getTreeJobs(params)
        if (jobDataRet) {
          state.jobsLoadover = true
          if (props.jobId) {
            jobDataRet.forEach(item => {
              state.allTaskOptions = [item]
              state.taskForm.choiceJob = item
            })
          } else {
            state.allTaskOptions = jobDataRet
          }
        }
        state.allTaskOptions.forEach(item => {
          if (state.ciInfo[item.name]) {
            item.alias = `(${proxy.$t('assembly_line')}:${state.ciInfo[item.name]})`
          } else {
            item.alias = item.name
          }
        })
        const jobxDataRet = await getGroupBatchesList(params)
        if (jobxDataRet) {
          state.allGroups = jobxDataRet
          jobxDataRet.forEach(item => {
            if (state.ciInfo[item.value]) {
              item.alias = `(${proxy.$t('assembly_line')}:${state.ciInfo[item.name]})`
            } else {
              item.alias = item.value
            }
          })
        }
      }
    }

    // 加载子服务树 
    const getLoadSubTree = async () => {
      const params: TreeIdInfo = {
        treeId: treeId.value
      }
      const dataRet = await getSubTreeList(params)
      if (dataRet) {
        state.c3Subtree = dataRet
        state.c3SubtreeLoadover = true
      }
    }

    // 默认操作
    const defaultOption = () => {
      state._rollbackVersion_ = ''
      state.deployVersion = ''
      state.iamtask4Jobx = 0
      state.showJobxGroup = 0
      state.taskData.group = null
    }

    const selectOption = (item: any, flag: boolean) => {
      if (item.option) {
        let splitstr = ','
        if (item.option.search(/;/) >= 0) {
          splitstr = ';'
        }
        let vars = item.option.split(splitstr)
        if (item.option.length && vars.length > 0) {
          state.varsValue[item.name] = vars
          if (flag) {
            state.varTemp.push(item)
          }
        }
      }
    }

    // 作业下拉框change
    const jobhandleChange = async (value: string) => {
      const newValue = JSON.parse(value)
      if (newValue) {
        defaultOption()
        state.taskData.jobname = newValue.name
        const params: JobGroupFormInfo = {
          treeId: treeId.value,
          uuid: newValue.uuid
        }
        const dataRet = await getJobformList(params)
        if (dataRet) {
          dataRet.forEach(item => {
            if (item.value === '') {
              if (item.name === 'C3SUBTREE') {
                getLoadSubTree()
              }
              if (item.name === 'ip') {
                if (item.describe !== '') {
                  state.groupStrArr = item.describe.split(':')
                  if (state.groupStrArr[0] === 'group') {
                    if (item.describe === 'group') {
                      state.iamtask4Jobx = 1
                      state.showJobxGroup = 1
                    } else {
                      state.taskData.group = state.groupStrArr[1]
                      state.iamtask4Jobx = 1
                      state.showJobxGroup = 0
                    }
                  } else {
                    state.varTemp.push(item)
                  }
                } else {
                  state.varTemp.push(item)
                }
              } else {
                if (item.name !== '_pip_') {
                  state.varTemp.push(item)
                }
                if (item.option) {
                  selectOption(item, false)
                }
              }
            } else {
              if (item.name === '_rollbackVersion_') {
                state._rollbackVersion_ = item.value
              }
              if (item.name === 'version') {
                state.deployVersion = item.value
              }
              if (item.option) {
                selectOption(item, true)
              }
            }
          })
          if (state.varTemp.length === 0) {
            state.jobVar = []
            state.taskData.variable = {}
          } else {
            state.jobVar = state.varTemp
          }
        }
      }
    }

    const onSwitchChange = (index: number, name: string, value: boolean) => {
      state.handwritten[state.jobVar[index][name]] = value
    }

    const handleSelectServer = (item: any, index: number) => {
      state.compFlag = true
      state.compType = 'Selectserver'
      state.editItem = {
        title: proxy.$t('SelectiveMachine')
      }
    }

    const compClose = (type?: string) => {
      state.selectIpStr = type
      state.compFlag = false
    }

    const compSuccess = () => {
      compClose()
    }

    // 提交表单
    const handleConfirm = async () => {
      let varDict = {}
      state.jobVar.forEach(item => {
        varDict[item.name] = item.value
      })
      if (state._rollbackVersion_!== '') {
        varDict['_rollbackVersion_'] = state._rollbackVersion_
      }
      if (state.deployVersion!== '') {
        varDict['version'] = state.deployVersion
      }
      state.taskData.variable = varDict
      if (state.taskData.group === null ) {
        delete state.taskData.group
      }
      if (state.taskData.uuid === null ) {
        delete state.taskData.uuid
      }
      if (state.iamtask4Jobx) {
        const params: CreateTaskInfo = {
          id: treeId.value,
          data: state.taskData
        }
        const dataRet = await createNewTask(params)

      }
      console.log(state.jobVar)
    }

    onMounted(() => {
      getAllGroupsData()
    })

    watch(() => [selectIpArray.value, selectGroupArray.value, customArray.value], (value) => {
      const newIpInput = state.jobVar.filter(item => item.name === 'ip')
      if (state.selectIpStr === 'ip') {
        newIpInput[0].value = value[0].join(',')
      } else if (state.selectIpStr === 'group') {
        newIpInput[0].value = value[1].join(',')
      } else if (state.selectIpStr === 'custom') {
        newIpInput[0].value = value[2]
      }
    })

    return {
      treeId,
      treeData,
      selectIpArray,
      selectGroupArray,
      customArray,
      ...toRefs(state),
      ADD_ENV_GROUPS_CONFIG,
      SELECT_SERVER_RADIO_OPTION,
      jobhandleChange,
      getLoadSubTree,
      onSwitchChange,
      compClose,
      compSuccess,
      handleConfirm,
      handleSelectServer
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-content {
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.layout-content-confirm {
  margin-top: 30px;
}

.w450 {
  width: 450px;
}

.item-value-switch {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>