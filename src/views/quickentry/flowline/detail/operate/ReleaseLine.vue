<template>
  <Dialog v-bind="$attrs" :title="`${config.title} ${editItem.name}`" :config="config" @close="close" @success="confirm">
    <template #content>
      <div>
        <!-- 机器列表 -->
        <div class="layout-content-machine">
          <h3>{{ $t('nodeList') }}</h3>
          <el-form :model="form" label-width="150px">
            <div v-if="!newTaskData.variable._pip_">
              <el-form-item v-for="(item, index) in editItem.showIPstr" :key="index"
                :label="`${$t('Group')}${index + 1}：(${item.num})${$t('NumMachines')}`">
                <div v-for="(cItem, cIndex) in item.infos" :key="cIndex">
                  <div class="layout-machie">{{ cItem }}</div>
                </div>
              </el-form-item>
            </div>
            <el-form-item v-if="newTaskData.variable._pip_" :label="$t('Machine')">
              <div>{{ newTaskData.variable._pip_ || '-' }}</div>
            </el-form-item>
          </el-form>
          <el-form>

          </el-form>
        </div>
        <el-divider class="costv-divider mt16 mb16" />

        <!-- 发布步骤 -->
        <div class="layout-content-step">
          <h3>{{ $t('deployStep') }}</h3>
          <el-form :model="form" label-width="120px">
            <el-form-item v-for="(item, index) in editItem.jobStep" :key="index" :label="`${$t('step')}${index + 1}：`">
              <div class="layout-machie">{{ item }}</div>
            </el-form-item>
          </el-form>
        </div>
        <el-divider class="costv-divider mt16 mb16" />

        <!-- 发布版本 -->
        <div class="layout-content-version">
          <h3 v-if="editItem.index === 0 && editItem.version">{{ $t('deployVersion') }}:
            <div class="layout-content-version-text">{{ editItem.version }}</div>
          </h3>
          <div v-if="!editItem.version">
            <base-form ref="releaseForm" :config="VERSION_DEPLOY_FORM_CONFIG" :params="releaseForm" class="mt20 mb20" />
          </div>
        </div>
        <!-- 回滚版本 -->
        <div class="layout-content-rollback">
          <h3 v-if="editItem.index > 0">
            {{ $t('rollbackVersion') }}:
            <div class="layout-content-rollback-text">{{ editItem.version }}</div>
          </h3>
        </div>

        <!-- 最后一次发布版本 -->
        <div class="layout-content-lastversion" v-if="editItem.jobType === 'online' && editItem.index === 0">
          <div v-if="editItem.lastVersion.version">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <div> {{ $t('LatestRelease') }} </div>
                  <el-button link type="danger" :disabled="versionForm.isRollback" @click="onClickUseVersion"
                    class="layout-machie">
                    {{ $t('clickUse') }}</el-button>
                </div>
              </template>
              <el-form :model="form" label-width="180px">
                <el-form-item :label="`${$t('lastVersion')}：`">
                  <div>{{ editItem.lastVersion.version }}</div>
                </el-form-item>
                <el-form-item :label="`${$t('time')}：`">
                  <div>{{ editItem.lastVersion.create_time }}</div>
                </el-form-item>
                <el-form-item :label="`${$t('deployTask')}：`">
                  <div>{{ editItem.lastVersion.jobxuuid }}</div>
                </el-form-item>
              </el-form>
            </el-card>
          </div>
          <div style="margin:10px 0" v-if="!editItem.lastVersion.version">
            <div>{{ $t('noRollbackDesc') }}</div>
          </div>

          <!-- 发布时回滚版本 -->
          <div class="mt30">
            <el-form :model="versionForm" label-width="120px">
              <el-form-item :label="$t('notRollback')" prop="isRollback">
                <el-switch v-model="versionForm.isRollback" />
              </el-form-item>
              <div v-if="!versionForm.isRollback">
                <el-form-item :label="$t('rollbackVersion')" prop="rollbackName">
                  <el-radio-group v-model="versionForm.type">
                    <el-radio label="select">{{ $t('selectVersion') }}</el-radio>
                    <el-radio label="input">{{ $t('writtenVersion') }}</el-radio>
                  </el-radio-group>
                  <div v-if="versionForm.type === 'select'">
                    <el-select style="width:250px" v-model="versionForm.rollbackName" class="m-2"
                      :placeholder="`${$t('configFormSelect')}${$t('version')}`">
                      <el-option v-for="(item, index) in editItem.succcessVersion" :key="index"
                        :label="`${item.create_time} = ${item.name}`" :value="item.name" />
                    </el-select>
                  </div>
                  <div v-else>
                    <el-input style="width:250px" v-model="versionForm.rollbackName"
                      :placeholder="`${$t('configFormInput')}${$t('version')}`" />
                  </div>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>

        <!-- jobVar -->
        <div class="mt30">
          <el-form :model="jobForm" label-width="120px">
            <div v-for="(item, index) in jobVar" :key="index">
              <div v-if="!varsvalue[item.name]">
                <el-form-item :label="item.name" v-if="!['ip', 'version'].includes(item.name)">
                  <el-input style="width:250px" v-model="newTaskData.variable[item.name]" :placeholder="item.describe" />
                  <div>{{ item.describe }}</div>
                </el-form-item>
              </div>
              <div v-if="varsvalue[item.name]">
                <div v-if="!['ip', 'version'].includes(item.name)">
                  <el-form-item :label="item.name">
                    <el-radio-group v-model="jobForm.type" style="margin-right:20px">
                      <el-radio label="select">{{ $t('select') }}</el-radio>
                      <el-radio label="input">{{ $t('writtern') }}</el-radio>
                    </el-radio-group>
                    <div v-if="jobForm.type === 'select'">
                      <!-- <el-select style="width:250px" v-model="jobForm.rollbackName" class="m-2" -->
                      <el-select style="width:250px" v-model="newTaskData.variable[item.name]" class="m-2"
                        :placeholder="`${$t('configFormSelect')}`">
                        <el-option v-for="(cItem, cIndex) in varsvalue[item.name]" :key="cIndex" :label="cItem"
                          :value="cItem" />
                      </el-select>
                    </div>
                    <div v-else>
                      <!-- <el-input style="width:250px" v-model="jobForm.rollbackName" :placeholder="item.describe"/> -->
                      <el-input style="width:250px" v-model="newTaskData.variable[item.name]"
                        :placeholder="item.describe" />
                    </div>
                    <div>{{ item.describe }}</div>
                  </el-form-item>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </template>
    <template #footer>
      <div>
        <el-button @click="close">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="confirm">{{ $t('submit') }}</el-button>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, getCurrentInstance, ComponentInternalInstance, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

import { ElMessageBox, ElMessage } from 'element-plus'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'

import {
  VERSION_DEPLOY_FORM_CONFIG,
  ROLLBACK_RELEASE_OPERATE_CONFIG
} from '../config'
import {
  getTreeJobs,
  getAllGroupList,
  getConnector,
  getAllJobsList,
  flowLinemManualSub,
  createNewTask,
} from '@/api/quickentry/index'
import {
  FavoritesInfo,
  JobListInfo,
  ManuralSubmitInfo
} from '@/api/interface/quickentry'

interface Stateinfo {
  toTreeId: string | number;
  toTreeName: string;
  siteaddr: string;
  myWebSorket: any;
  logDetail: string;
  form: any;
  allGroups: Array<any>;
  newTaskData: {
    jobname: any,
    group: string,
    variable: {
      checker?: any;
      tagger?: any;
      version?: any;
      _jobtype_?: any;
      _exit_?: any;
      _appname_?: any;
      _skipSameVersion_?: any;
      _pip_?: string;
      _rollbackVersion_?: string;
    },
    uuid?: string;
  };
  jobinfo: {
    name?: string;
    uuid?: string;
  };
  jobVar: Array<any>;
  varsvalue: object;
  releaseForm: {
    versionName: string;
    versionDesc: string;
  };
  versionForm: {
    isRollback: boolean;
    type: 'select' | 'input';
    rollbackName: string;
  },
  jobForm: any;
  userInfo: {
    admin?: string;
    conpany?: string;
    email?: string;
    name?: string;
    showconnector?: string
  }
}


export default defineComponent({
  components: {
    Dialog,
    baseForm
  },

  props: {
    types: {
      type: String,
      default: 'ReleaseLine'
    },
    conTypes: {
      type: String,
      default: 'release',
      require: false
    },
    config: {
      type: Object,
      default: ROLLBACK_RELEASE_OPERATE_CONFIG
    },
    editItem: {
      type: Object,
      default: {}
    },
    treeId: {
      type: String,
      default: '4000000000'
    },
    treeData: {
      type: Object,
      default: {}
    },
  },

  emits: ['success', 'close', 'refresh'],

  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const route = useRoute()

    const state: Stateinfo = reactive({
      toTreeId: props.treeId,
      toTreeName: props.treeData.name,
      siteaddr: '',
      myWebSorket: null,
      logDetail: '',
      form: {},
      allGroups: [],
      newTaskData: props.editItem.taskData,
      jobinfo: {},
      userInfo: {},
      jobVar: [],
      varsvalue: {},
      releaseForm: {
        versionName: '',
        versionDesc: '',
      },
      versionForm: {
        isRollback: false,
        type: 'select',
        rollbackName: '',
      },
      jobForm: {
        type: 'select',
      },
    })

    // 获取所有组信息 
    const getAllGroupsData = async () => {
      const params: FavoritesInfo = {
        treeId: props.treeId
      }
      const dataRet = await getAllGroupList(params)
      if (dataRet) {
        state.allGroups = dataRet
      }
    }

    const getUsetInfo = async () => {
      const dataRet = await getConnector({})
      if (dataRet) {
        state.userInfo = dataRet
      }
    }

    // 获取 登录信息
    const getConnectorData = async (type: 'checker' | 'tagger') => {
      switch (type) {
        case 'checker':
          if (!props.editItem.taskData.variable.checker) {
            state.newTaskData.variable.checker = state.userInfo.email;
          }
          break
        case 'tagger':
          if (!props.editItem.taskData.variable.tagger) {
            state.newTaskData.variable.tagger = state.userInfo.email;
          }
          break
      }
    }

    // 获取所有的job信息
    const getAllJobsData = async () => {
      const dataRet = await getTreeJobs({ treeId: props.treeId })
      if (dataRet) {
        const newData = dataRet
        newData.forEach((item, index) => {
          if (item.name === `_ci_${route.params.sourceId}_`) {
            state.jobinfo = item
          }
        })
        if (state.jobinfo) {
          state.newTaskData.jobname = state.jobinfo.name
          const newParams: JobListInfo = {
            treeId: props.treeId,
            uuid: state.jobinfo.uuid,
            jobType: props.editItem.jobType
          }
          const cDataRet = await getAllJobsList(newParams)
          if (cDataRet) {
            const cNewData = cDataRet
            state.jobVar = cDataRet
            if (props.editItem.jobType === 'test') {
              state.newTaskData.variable = {
                version: props.editItem.version,
                _jobtype_: props.editItem.jobType,
                _exit_: 1
              }
            } else {
              state.newTaskData.variable = {
                version: props.editItem.version,
                _jobtype_: props.editItem.jobType,
                _appname_: state.newTaskData.jobname,
                _skipSameVersion_: 0
              }
            }
            cNewData.forEach((item, index) => {
              if (item.option) {
                let splitStr = ','
                if (item.option.search(/;/) >= 0) {
                  splitStr = ';'
                }
                let vars = item.option.split(splitStr)
                if (item.option.length > 0 && vars.length > 0) {
                  state.varsvalue[item.name] = vars
                }
              }
              if (item.name) {
                getConnectorData(item.name)
              }
            })
          }
        }
      }
    }

    const creatTaskNote = () => {
      if (!state.newTaskData.variable._rollbackVersion_) {
        proxy.$notification(proxy.$t('selectVersionMsg'), 'error')
        return
      }
      const newVar = Object.keys(state.varsvalue)
      const flag = newVar.map(item => {
        if (state.newTaskData.variable[item]) {
          return true
        } else {
          return false
        }
      })
      if (flag.indexOf(false) > -1) {
        proxy.$notification(proxy.$t('fillReleaseInfoMsg'), 'error')
        return
      }
      ElMessageBox.confirm(proxy?.$t('createTaskDesc'), proxy?.$t('createTaskTitle'), {
        confirmButtonText: proxy?.$t('config_options_confirm'),
        cancelButtonText: proxy?.$t('config_options_cancel'),
        type: 'warning'
      }).then(async () => {
        const TaskDataRet = await createNewTask({ id: route.params.treeId, data: state.newTaskData })
        if (TaskDataRet) {
          close()
          router.push(`/history/jobxdetail/${route.params.treeId}/${route.params.sourceId}/${TaskDataRet.uuid}`)
        }
      }).catch(() => { })
    }

    const onClickUseVersion = () => {
      state.versionForm = {
        type: 'input',
        isRollback: false,
        rollbackName: props.editItem.lastVersion.version
      }
    }

    const confirm = async () => {
      if (state.versionForm.isRollback) {
        delete state.newTaskData.variable._rollbackVersion_
      }
      if (state.newTaskData.variable.version === '') {
        if (!state.releaseForm.versionDesc) {
          state.releaseForm.versionDesc = `deploy：${state.releaseForm.versionDesc}`
          const params: ManuralSubmitInfo = {
            treeId: route.params.treeId,
            id: route.params.sourceId,
            data: {
              version: state.releaseForm.versionName,
              describe: state.releaseForm.versionDesc
            }
          }
          const ManDataRet = await flowLinemManualSub(params)
          if (ManDataRet) {
            state.newTaskData.variable.version = state.releaseForm.versionName
            creatTaskNote()
          }
          return
        }
      }
      if (state.versionForm.rollbackName !== '') {
        state.newTaskData.variable._rollbackVersion_ = state.versionForm.rollbackName
      }
      creatTaskNote()
    }


    const close = () => {
      proxy.$emit('close')
    }

    const onInputChange = (value) => {

    }

    onMounted(() => {
      getUsetInfo()
      getAllGroupsData()
      getAllJobsData()
    })

    onUnmounted(() => {
    })

    watch(() => state.versionForm.type, (value) => {
      state.versionForm.rollbackName = ''
    })
    watch(() => state.jobForm.type, (value) => {
      state.jobForm.rollbackName = ''
    })

    return {
      ...toRefs(state),
      VERSION_DEPLOY_FORM_CONFIG,
      ROLLBACK_RELEASE_OPERATE_CONFIG,
      close,
      confirm,
      onInputChange,
      getAllJobsData,
      getAllGroupsData,
      onClickUseVersion,
    }
  }
})
</script>

<style scoped lang="scss">
.select-tree {
  border: 1px solid var(--color-dialog-line);
}

.select-tree-name {
  width: 100%;
  height: 50px;
  padding: 10px;
  border-bottom: 1px solid var(--color-dialog-line);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-left {
    width: 100%;
    font-weight: 600;
  }

  &-right {
    height: 100%
  }
}

.layout-title {
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-header {
    color: var(--color_text)
  }

  &-operate {
    display: flex;
    justify-content: flex-end;
  }
}

.layout-content {
  &-machine {
    width: 100%;
  }

  &-version {
    width: 100%;

    &-text {
      display: inline-block;
      color: var(--color_text_success);
    }
  }

  &-rollback {
    &-text {
      display: inline-block;
      color: var(--color_text_danger);
    }
  }
}

.layout-machie {
  display: inline-block;
  margin-right: 5px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>