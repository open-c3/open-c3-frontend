<template>
  <Dialog v-bind="$attrs" :config="config" :title="editItem.title" @close="close" @success="close">
    <template #content>
      <div v-loading="loading" class="dialog-style">
        <div v-if="editStep === 0">
          {{ $t('importYAML') }}
          <el-input class="step-zero" :rows="20" v-model="newYaml" type="textarea" />
        </div>

        <div v-if="editStep === 1">
          <div v-if="editData.metadata">
            <el-form class="edit-data-form" v-model="editData" label-width="160px" :inline="true">
              <el-form-item :label="$t('name')" prop="name">
                <el-input v-model="editData.metadata.name" :disabled="dialogType === 'apply'" />
              </el-form-item>

              <el-form-item :label="$t('namespace')" prop="namespace">
                <el-input v-if="dialogType === 'apply'" v-model="editData.metadata.namespace"
                  :disabled="dialogType === 'apply'" />
                <el-select v-else>
                  <el-option v-for="item in namespaceArr" :key="item.NAME" :value="item.NAME" :label="item.NAME" />
                </el-select>
              </el-form-item>
              <el-form-item label="">
                <el-button v-if="editStep === 1" type="primary">{{ $t('importYAML') }}</el-button>
              </el-form-item>
            </el-form>

            <!-- metadata -->
            <el-form class="edit-data-form" v-model="editData" label-width="160px">
              <el-form-item :label="$t('tag')">
                <AppCreateTags :title="$t('tag')" :tableConfig="tableConfig" :tableType="'metaTable'" />
              </el-form-item>
              <el-form-item :label="$t('annotations')">
                <AppCreateTags :title="$t('annotations')" :tableConfig="tableConfig" :tableType="'annoteTable'" />
              </el-form-item>

              <el-form-item :label="$t('stopWaitingTime')">
                <el-input-number v-model="editData.spec.template.spec.terminationGracePeriodSeconds" :min="1"
                  size="small" />
              </el-form-item>
              <el-form-item :label="$t('numberCopies')">
                <el-input-number v-model="editData.spec.replicas" :min="1" size="small" />
              </el-form-item>
            </el-form>
            <el-divider class="costv-divider mt0 mb16" />

            <!-- selector  -->
            <el-form class="edit-data-form" v-model="editData" label-width="160px" :inline="true">
              <el-form-item label="selector【matchLabels】">
                <AppCreateTags title="selector【matchLabels】" :tableConfig="tableConfig" :tableType="'selectorTable'" />
              </el-form-item>
            </el-form>
            <el-divider class="costv-divider mt0 mb16" />

            <!-- 滚动升级策略 -->
            <el-form class="edit-data-form" v-model="editData" label-width="160px">
              <el-form-item :label="$t('rollUpgStrate')">
                <el-tabs v-model="editData.spec.strategy.type" class="demo-tabs">
                  <el-tab-pane label="RollingUpdate" name="RollingUpdate">
                    <el-form v-model="editData" label-width="100px" :inline="true">
                      <el-form-item label="MaxUnavailable">
                        <el-input v-model="editData.spec.strategy.rollingUpdate.maxUnavailable" />
                      </el-form-item>
                      <el-form-item label="MaxSurge">
                        <el-input v-model="editData.spec.strategy.rollingUpdate.maxSurge" />
                      </el-form-item>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="Recreate" name="Recreate">
                    <div class="blank-tabs">{{ $t('emptyText') }}</div>
                  </el-tab-pane>
                </el-tabs>
              </el-form-item>
            </el-form>
            <el-divider class="costv-divider mt0 mb16" />

            <!-- 添加数据卷 -->
            <el-form class="edit-data-form" v-model="editData" label-width="160px">
              <el-form-item :label="$t('AddDataVolume')">
                <AddButtonGroupTable :typeFlag="true" class="demo-tabs" :buttonGroup="dataVolumeArr"
                  :tableConfig="editData['volume']" :tableType="'volume'" />
              </el-form-item>
            </el-form>
            <el-divider class="costv-divider mt0 mb16" />

            <!-- 拉取私有镜像管理 -->
            <el-form class="edit-data-form" v-model="editData" label-width="160px">
              <el-form-item :label="$t('pullPrivateImage')">
                <PullPrivateImage class="demo-tabs" :title="$t('pullPrivateImage')" :buttonGroup="privateImageArr"
                  :tableConfig="editData" :tableType="'privateImage'" :editItems="editItem" />
              </el-form-item>
            </el-form>

            <!-- 调度 -->
            <el-form class="edit-data-form" v-model="editData" label-width="160px">
              <el-form-item label="nodeSelector">
                <AppCreateTags title="nodeSelector" :tableConfig="tableConfig" :tableType="'nodeSelectorTable'" />
              </el-form-item>
              <el-form-item :label="$t('advancedSchedueSet')">
                <el-switch v-model="advancedconfigFlag" />
              </el-form-item>
              <el-form-item label="" class="mt20" v-if="advancedconfigFlag">
                <AddAdvancedconfig :title="$t('advancedSchedueSet')" class="demo-tabs" :namespace="namespaceArr"
                  :tableConfig="editData" :nodeLabel="nodeLabel" :nodePodLabel="nodepodLabel" :tableType="'advance'" />
              </el-form-item>
            </el-form>

            <!-- hostAliases -->
            <el-form class="edit-data-form" v-model="editData" label-width="160px">
              <el-form-item label="hostAliases">
                <HostAliasesTable title="hostAliases" class="demo-tabs" :tableConfig="tableConfig"
                  :tableType="'hostAliases'" />
              </el-form-item>
            </el-form>

            <!-- 容器 -->
            <el-form class="edit-data-form" v-model="editData" label-width="160px">
              <el-form-item :label="$t('container')">
                <AddContainer class="demo-tabs" :editData="editData" :container="containers" :tableType="'containers'"
                  :buttonGroup="CONTAINER_GROUP_ARR" />
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div v-if="editStep === 2">
        </div>
      </div>
    </template>

    <template #footer>
      <div v-if="editStep === 0 || editStep === 1">
        <!-- <el-button v-if="editStep === 1" type="primary">{{ $t('importYAML') }}</el-button> -->
        <el-button type="primary" @click="onhandleSteps(editStep, 'nextStep')">{{ $t('nextStep') }}</el-button>
      </div>
      <div v-if="editStep === 2">
        <el-button type="primary" @click="onhandleSteps(editStep, 'previous')">{{ $t('previous') }}</el-button>
        <el-button type="primary" @click="operate('assist')">{{ $t('operationAssistance') }}</el-button>
        <el-button type="primary" @click="operate('commit')">{{ $t('commitChanges') }}</el-button>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, getCurrentInstance, ComponentInternalInstance } from 'vue'
import store from '@/store'
import Table from '@/components/table/index.vue'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import AppCreateTags from './createApp/AppCreateTags.vue'
import AddButtonGroupTable from './createApp/AddButtonGroupTable.vue'
import PullPrivateImage from './createApp/PullPrivateImage.vue'
import AddAdvancedconfig from './createApp/AddAdvancedconfig.vue'
import HostAliasesTable from './createApp/HostAliasesTable.vue'
import AddContainer from './createApp/AddContainer.vue'
import {
  METADATA_THEAD,
  DATA_VOLUME_GROUP,
  BUILD_MODAL_CONFIG,
  CONTAINER_GROUP_ARR,
  HOST_ALIASES_GROUP_ARR,
  PULL_PRIVATE_IMAGE_GROUP_ARR,
} from './config'
import {
  getDeployment,
  getEditDeployment,
  getTempContainer,
  getTempOperate,
  getServiceLBAnnote,
  getNameSpaceList,
  getJSONYamlData,
} from '@/api/quickentry/index'
import {
  EditDeplymentInfo,
  QuickentryPromiseInfo,
  TempOperateInfo,
} from '@/api/interface/quickentry'

interface TreeInfo {
  id: number;
  name: string;
  children?: TreeInfo[];
}

interface ApiFunInfo {
  create?: (data?: any) => Promise<QuickentryPromiseInfo | any>
  apply?: (data: EditDeplymentInfo) => Promise<QuickentryPromiseInfo | any>
}

interface Stateinfo {
  treeArray: TreeInfo[];
  dialogType: 'create' | 'apply';
  editStep: number
  editData: {
    apiVersion?: string;
    kind?: string;
    metadata?: any;
    spec?: any
    status?: any
  };
  labels: Array<any>;
  annotations: Array<any>;
  selectorlabels: Array<any>;
  nodeSelector: Array<any>;
  hostAliases: Array<any>;
  containerData: any;
  nodeLabel: { key: {}, value: {} };
  nodepodLabel: { key: {}, value: {} };
  serviceLBAnnotations: any;
  namespaceArr: Array<any>;
  newYaml: string;
  tableConfig: {
    metaTable: {
      data: Array<any>
      loading: boolean
      condition: {
        flag: boolean;
        isCreate: boolean;
        value: string;
      }
    },
    annoteTable: {
      data: Array<any>
      loading: boolean
      condition: {
        flag: boolean;
        isCreate: boolean;
        value: string;
      }
    },
    selectorTable: {
      data: Array<any>
      loading: boolean
      condition: {
        flag: boolean;
        isCreate: boolean;
        value: string;
      }
    },
    nodeSelectorTable: {
      data: Array<any>
      loading: boolean
      condition: {
        flag: boolean;
        isCreate: boolean;
        value: string;
      }
    },
    hostAliases: {
      data: Array<any>
      loading: boolean
      condition: {
        flag: boolean;
        isCreate: boolean;
        value: string;
      }
    },
  };
  advancedconfigFlag: boolean;
  dataVolumeArr: Array<any>;
  privateImageArr: Array<any>;
  loading: boolean;
  hostAliasesArr: Array<any>;
  containers: Array<any>
}


export default defineComponent({
  components: {
    Dialog,
    baseForm,
    Table,
    AddContainer,
    AppCreateTags,
    HostAliasesTable,
    AddButtonGroupTable,
    PullPrivateImage,
    AddAdvancedconfig,
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
      default: BUILD_MODAL_CONFIG
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

  emits: ['success', 'close', 'refresh'],

  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeArray = computed(() => {
      return store.getters.treeArray
    })

    const state: Stateinfo = reactive({
      treeArray: [],
      dialogType: 'create',
      editData: {},
      editStep: 1,
      labels: [],
      annotations: [],
      selectorlabels: [],
      nodeSelector: [],
      hostAliases: [],
      containerData: [],
      nodeLabel: { key: {}, value: {} },
      nodepodLabel: { key: {}, value: {} },
      serviceLBAnnotations: {},
      namespaceArr: [],
      containers: [],
      newYaml: '',
      tableConfig: {
        metaTable: {
          data: [{ key: '', symbol: '', value: '' }],
          loading: false,
          condition: {
            flag: false,
            isCreate: false,
            value: '',
          }
        },
        annoteTable: {
          data: [{ key: '', symbol: '', value: '' }],
          loading: false,
          condition: {
            flag: false,
            isCreate: false,
            value: '',
          }
        },
        selectorTable: {
          data: [{ key: '', symbol: '', value: '' }],
          loading: false,
          condition: {
            flag: false,
            isCreate: false,
            value: '',
          }
        },
        nodeSelectorTable: {
          data: [{ key: '', symbol: '', value: '' }],
          loading: false,
          condition: {
            flag: false,
            isCreate: false,
            value: '',
          }
        },
        hostAliases: {
          data: [{ ip: '', symbol: '', hostnames: [] }],
          loading: false,
          condition: {
            flag: false,
            isCreate: false,
            value: '',
          }
        }
      },
      dataVolumeArr: DATA_VOLUME_GROUP,
      privateImageArr: PULL_PRIVATE_IMAGE_GROUP_ARR,
      // 默认值是false
      advancedconfigFlag: false,
      loading: false,
      hostAliasesArr: HOST_ALIASES_GROUP_ARR,
    })

    // 获取基础信息
    const getData = async () => {
      const apiFun: ApiFunInfo = {
        create: getDeployment,
        apply: getEditDeployment
      }
      const apiParams: { create: any, apply: EditDeplymentInfo } = {
        create: {},
        apply: {
          ticketId: props.editItem.ticketid,
          name: props.editItem.name,
          namespace: props.editItem.namespace
        }
      }
      if (apiParams[state.dialogType] && apiFun[state.dialogType]) {
        state.loading = true
        const dataRet = await apiFun[state.dialogType](apiParams[state.dialogType]).catch(err => state.loading = false)
        if (dataRet) {
          state.editData = dataRet
          if (props.editItem.namespace) {
            state.editData.metadata.namespace = props.editItem.namespace
          }
          metadataAttr(['labels', 'annotations'], state.editData.metadata)
          spceAttr(state.editData.spec)
        }
        onCondition(
          ['metaTable', 'annoteTable', 'selectorTable', 'hostAliases'],
          [state.labels, state.annotations, state.selectorlabels, state.hostAliases])
        state.tableConfig.metaTable.condition = {
          flag: true,
          isCreate: state.dialogType === 'create',
          value: state.editData.metadata.name,
        }
        state.tableConfig.annoteTable.condition = {
          flag: false,
          isCreate: false,
          value: '',
        }
        state.tableConfig.selectorTable.condition = {
          flag: true,
          isCreate: state.dialogType === 'create',
          value: state.editData.metadata.name,
        }
        await getNameSpaceData()
        await getTempContainerData()
        await getTemplateOperate('node', 'nodeLabel')
        await getTemplateOperate('node_pod', 'nodepodLabel')
        if (state.dialogType === 'create') {
          await getServiceAnnoteData()
        }
        state.loading = false
      }
    }

    const onCondition = (type: string | string[], data: Array<any>) => {
      if (typeof type === 'string') {
        state.tableConfig[type].data = data
      } else if (Array.isArray(type)) {
        type.forEach((item, index) => {
          state.tableConfig[item].data = data[index]
        })
      }
    }

    // 获取容器模版信息
    const getTempContainerData = async () => {
      const dataRet = await getTempContainer({})
      if (dataRet) {
        state.containerData = dataRet
      }
    }

    // node节点操作
    const getTemplateOperate = async (type: 'node' | 'node_pod', attrs: 'nodeLabel' | 'nodepodLabel') => {
      const params: TempOperateInfo = {
        nodeType: type,
        data: {
          ticketid: props.editItem.ticketid,
          namespace: props.editItem.namespace
        }
      }
      const dataRet = await getTempOperate(params)
      if (dataRet) {
        state[attrs] = dataRet
      }
    }

    // 获取service_lb_annotation 模版信息
    const getServiceAnnoteData = async () => {
      const dataRet = await getServiceLBAnnote({})
      if (dataRet) {
        state.serviceLBAnnotations = dataRet
      }
    }

    const getNameSpaceData = async () => {
      const params = {
        id: props.editItem.ticketid
      }
      const dataRet = await getNameSpaceList(params)
      if (dataRet) {
        state.namespaceArr = dataRet
      }
    }


    const metadataAttr = (type: string | Array<any>, row: any) => {
      if (typeof type === 'string') {
        if (row[type]) {
          for (let key in row[type]) {
            state[type].push({
              key,
              value: row[type][key],
              symbol: ''
            })
          }
        }
      } else if (Array.isArray(type)) {
        type.forEach((item, index) => {
          if (row[item]) {
            for (let key in row[item]) {
              state[item].push({
                key,
                value: row[item][key],
                symbol: ''
              })
            }
          }
        })
      }
    }

    const spceAttr = (row: any) => {
      if (row.selector && row.selector.matchLabels) {
        for (let key in row.selector.matchLabels) {
          state.selectorlabels.push({ key, value: row.selector.matchLabels[key] })
        }
      }
      if (row.template.spec && row.template.spec.nodeSelector) {
        for (let key in row.template.spec.nodeSelector) {
          state.selectorlabels.push({ key, value: row.template.spec.nodeSelector[key] })
        }
      }
      if (row.template.spec && row.template.spec.hostAliases) {
        state.hostAliases = row.template.spec.hostAliases
      }
      if (row.template.spec && row.template.spec.containers) {
        state.containers = row.template.spec.containers
      }
      if (!(row.template.spec && row.template.spec.volumes)) {
        state.editData.spec.template.spec.volumes = [];
      }
      if (!(row.template.spec && row.template.spec.affinity)) {
        state.editData.spec.template.spec.affinity = {}
        if (!(row.template.spec.affinity && row.template.spec.affinity.nodeAffinity) || Object.keys(row.template.spec.affinity.nodeAffinity).length === 0) {
          state.editData.spec.template.spec.affinity.nodeAffinity = {}
        }
        if (!(row.template.spec.affinity && row.template.spec.affinity.podAffinity) || Object.keys(row.template.spec.affinity.podAffinity).length === 0) {
          state.editData.spec.template.spec.affinity.podAffinity = {}
        }
        if (!(row.template.spec.affinity && row.template.spec.affinity.podAntiAffinity) || Object.keys(row.template.spec.affinity.podAntiAffinity).length === 0) {
          state.editData.spec.template.spec.affinity.podAntiAffinity = {}
        }
      }
    }

    const onhandleSteps = (step: number, type: 'nextStep' | 'previous') => {
      if (type === 'nextStep') {
        state.editStep = step + 1
      } else if (type === 'previous') {
        state.editStep = step - 1
      }
    }

    const operate = (type: string) => {
    }

    const confirm = () => {
      close()
    }

    const onRefresh = () => {
      proxy.$emit('refresh')
    }

    const close = () => {
      proxy.$emit('close')
    }

    const defaultOperate = () => {
      if (props.editItem.name && props.editItem.namespace) {
        state.dialogType = 'apply'
      }
    }

    const addTag = (type: string) => {
      state.tableConfig[type].data.push({ key: '', symbol: '=', value: '' })
    }

    const delTag = (index: number, type: string) => {
      state.tableConfig[type].data.splice(index, 1)
    }

    onMounted(() => {
      state.treeArray = treeArray.value
      defaultOperate()
      getData()
    })

    return {
      treeArray,
      ...toRefs(state),
      BUILD_MODAL_CONFIG,
      METADATA_THEAD,
      CONTAINER_GROUP_ARR,
      addTag,
      delTag,
      confirm,
      close,
      onRefresh,
      operate,
      onhandleSteps,
    }
  }
})
</script>

<style scoped lang="scss">
.dialog-style {
  min-height: 400px;
}

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
  padding: 10px;
  min-height: 400px;
  widows: 100%;
  background-color: #000;
  color: #FFF;
}

.step-zero {
  width: 100%;
  overflow: auto;
  word-break: break-all;
}

.edit-data-form {
  :deep(.el-form-item__label) {
    font-size: 12px !important;
  }

  :deep(.el-form-item__content) {
    font-size: 12px !important;
  }
}

.demo-tabs {
  width: 100%;
}

.blank-tabs {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dispatch-style {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>