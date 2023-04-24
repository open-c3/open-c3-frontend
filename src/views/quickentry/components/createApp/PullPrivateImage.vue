<template>
  <!-- <el-card class="table-card">
    <template #header>
      <span>{{ title }}</span>
    </template> -->
    <div class="data-form-tags">
      <el-button-group class="ml-4">
        <el-tooltip v-for="(item, index) in buttonGroup" :key="index" effect="dark" :content="item.tooltip"
          placement="top">
          <el-button link class="button-group" :type="item.type" :icon="item.icon"
            @click="addTag(tableType, item.subType)">{{ item.text }}</el-button>
        </el-tooltip>
      </el-button-group>
      <div class="add-item-con">
        <div class="table-items" v-for="(item, index) in tableData[tableType]" :key="index">
          <el-row style="width:100%">
            <el-col class="table-items-col" :span="20">
              <div class="table-items-btn-content">
                <el-input v-model="item.name" />
              </div>
            </el-col>
            <el-col class="table-items-col" :span="2">
              <div class="table-items-btn-content">
                <el-button type="primary" link @click="delTag(index, tableType)">{{ $t('delete') }}</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  <!-- </el-card> -->
  <component :is="compType" v-model="compFlag" v-if="compFlag" :types="compType" :config="compConfig" :editItem="editItem"
    :treeId="String(treeId)" :treeData="treeData" @close="emitClose" @success="emitSuccess" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, getCurrentInstance, ComponentInternalInstance, computed } from 'vue'
import store from '@/store'
import Table from '@/components/table/index.vue'
import CreateDockerConfig from './CreateDockerConfig.vue'
import {
  PULL_PRIVATE_IMAGE_GROUP_ARR,
  CREATE_DOCKER_CONFIG,
  HOST_PATH_SELECT,
} from '../config'

import {
  getSecretList,
} from '@/api/quickentry/index'
import {
  AutoSecretInfo
} from '@/api/interface/quickentry'

interface StateInfo {
  tableData: {
    privateImage: Array<any>
  };
  hostPathSelect: Array<any>;
  compFlag: boolean;
  compType: string;
  compConfig: any;
  editItem: any;
}

export default defineComponent({
  components: {
    Table,
    CreateDockerConfig,
  },
  props: {
    tableType: {
      type: String,
      default: '',
    },
    tableConfig: {
      type: Object,
      default: {}
    },
    buttonGroup: {
      type: Array<any>,
      default: []
    },
    title: {
      type: String,
      default: '',
    },
    editItems: {
      type: Object,
      default: {}
    },
  },
  // emits: ['addTag', 'delTag'],
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeId = computed(() => {
      return store.getters.treeId
    })

    const treeData = computed(() => {
      return store.getters.treeData
    })
    const state: StateInfo = reactive({
      tableData: {
        privateImage: []
      },
      hostPathSelect: HOST_PATH_SELECT,
      compFlag: false,
      compType: '',
      compConfig: CREATE_DOCKER_CONFIG,
      editItem: {},
    })

    const addTag = async (type: string, groupType: string) => {
      let data = {}
      if (groupType !== '') {
        switch (groupType) {
          case 'addCredential':
            data = {
              name: ''
            }
            state.tableData[type].push(data)
            break
          case 'create':
            state.compFlag = true
            state.compType = 'CreateDockerConfig'
            state.editItem = {
              title: proxy.$t('createDockerJson'),
              namespace: props.tableConfig?.metadata.namespace,
              detail: props.editItems
            }
            break
          case 'import':
              const params: AutoSecretInfo = {
                ticketid: props.editItems.ticketid,
                namespace: props.tableConfig?.metadata.namespace,
              }
              const dataRet = await getSecretList(params)
              if (dataRet) {
                let hash = {};
                const newData = dataRet.filter(item => item.TYPE === 'kubernetes.io/dockerconfigjson').map(item => { return { name: item.NAME } })
                const middleware = JSON.parse(JSON.stringify(state.tableData[type]))
                middleware.push(...newData)
                const newArr = middleware.reduce(function (item, next) {
                  hash[next.name] ? '' : hash[next.name] = true && item.push(next)
                  return item
                }, [])
                state.tableData[type] = newArr
              }
            break
        }
      } else {
        state.tableData[type] = []
      }
    }

    const delTag = (index: number, type: string) => {
      state.tableData[type].splice(index, 1)
    }

    const emitClose = (name?:string) => {
      if (name) {
        const newFlag = state.tableData[props.tableType].filter(item => item.name === name).length
        if (newFlag.length === 0) {
          state.tableData[props.tableType].push({name})
        }
      }
      state.compFlag = false
    }

    const emitSuccess = () => {
      emitClose()
    }

    onMounted(() => {

    })

    return {
      treeId,
      treeData,
      PULL_PRIVATE_IMAGE_GROUP_ARR,
      ...toRefs(state),
      addTag,
      delTag,
      emitSuccess,
      emitClose,
    }
  }
})
</script>

<style lang="scss" scoped>
.button-group {
  font-size: 12px;
}

.add-item-con {
  width: 50%;
  margin-top: 20px;
}

.data-form-tags {
  width: 100%;
}
.table-items {
  border: 1px solid var(--color_border);
  min-height: 50px;
  padding: 5px 0;
}

.table-items-btn-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-items-col {
  margin: 3px auto;
}
.table-card {
  width: 100%;
}
</style>