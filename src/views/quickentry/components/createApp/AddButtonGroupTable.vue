<template>
  <div class="data-form-tags">
    <el-button-group class="ml-4">
      <el-tooltip v-for="(item, index) in buttonGroup" :key="index" effect="dark" :content="item.tooltip" placement="top">
        <el-button link class="button-group" :type="item.type" :icon="item.icon"
          @click="addTag(tableType, item.subType)">{{ item.text }}</el-button>
      </el-tooltip>
    </el-button-group>
    <div class="add-item-con">
      <div class="table-items" v-for="(item, index) in tableData" :key="index">
        <el-row>
          <el-col :span="22">
            <div class="table-items-btn-content">
              <el-form style="width:100%" v-model="tableData" label-width="110px" :inline="true">
                <el-row style="width:100%">
                  <el-col v-if="typeFlag" :span="tableType === 'volume' ? 6 : 4">
                    <el-form-item :label="`${tableType === 'volume' ? $t('type') : ''}`">
                      <div class="ml10">
                        {{ ENV_VARIABLE_GROUP_MAP[tableType][item.groupTypes] }}
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="typeFlag? tableType === 'volume' ? 18 : 20: 24/ item.labelArr.length" v-for="cItem in item.labelArr" :key="cItem.value">
                    <el-form-item :label="cItem.label">
                      <div v-if="cItem.type === 'input'">
                        <div v-if="!item[tableType]?.[cItem.value]">
                          <el-input v-model="item[cItem.value]" />
                        </div>
                        <div v-else>
                          <el-input v-model="item[tableType][cItem.value]" />
                        </div>
                      </div>
                      <div v-else-if="cItem.type === 'select'">
                        <div v-if="!item[tableType]?.[cItem.value]">
                          <el-select v-model="item[cItem.value]">
                            <el-option v-for="dItem in hostPathSelect" :key="dItem" :label="dItem" :value="dItem" />
                          </el-select>
                        </div>
                        <div v-else>
                          <el-select v-model="item[tableType][cItem.value]">
                            <el-option v-for="dItem in hostPathSelect" :key="dItem" :label="dItem" :value="dItem" />
                          </el-select>
                        </div>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="table-items-btn-content">
              <el-button type="primary" link @click="delTag(index, tableType)">{{ $t('delete') }}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Table from '@/components/table/index.vue'
import {
  METADATA_THEAD,
  HOST_PATH_SELECT,
  ENV_VARIABLE_GROUP_MAP,
} from '../config'

interface StateInfo {
  tableData: Array<any>;
  hostPathSelect: Array<any>
}

export default defineComponent({
  components: {
    Table,
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
    typeFlag: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  // emits: ['addTag', 'delTag'],
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const state: StateInfo = reactive({
      tableData: [],
      hostPathSelect: HOST_PATH_SELECT
    })

    const addTag = (type: string, groupType: string) => {
      let data = {
        name: '',
        groupTypes: groupType,
      }
      if (groupType !== '') {
        switch (type) {
          case 'volume':
            if (groupType === 'emptyDir') {
              data['emptyDir'] = {}
              data['labelArr'] = [{ type: 'input', value: 'name', label: proxy.$t('name') }]
            }

            if (groupType === 'hostPath') {
              data['hostPath'] = {}
              data['labelArr'] = [
                { type: 'input', value: 'name', label: proxy.$t('name') },
                { type: 'input', value: 'path', label: 'path' },
                { type: 'select', value: 'type', label: 'type' }
              ]
            }

            if (groupType === 'nfs') {
              data['nfs'] = { server: '', path: '' }
              data['labelArr'] = [
                { type: 'input', value: 'name', label: proxy.$t('name') },
                { type: 'input', value: 'server', label: 'server' },
                { type: 'input', value: 'path', label: 'path' }
              ]
            }
            if (groupType === 'secret') {
              data['secret'] = { secretName: '', }
              data['labelArr'] = [
                { type: 'input', value: 'name', label: proxy.$t('name') },
                { type: 'input', value: 'secretName', label: 'secretName' }
              ]
            }
            if (groupType === 'persistentVolumeClaim') {
              data['persistentVolumeClaim'] = { claimName: '', }
              data['labelArr'] = [
                { type: 'input', value: 'name', label: proxy.$t('name') },
                { type: 'input', value: 'claimName', label: 'claimName' }
              ]
            }
            if (groupType === 'configMap') {
              data['configMap'] = { configName: '', }
              data['labelArr'] = [
                { type: 'input', value: 'name', label: proxy.$t('name') },
                { type: 'input', value: 'configName', label: 'configMap' }
              ]
              //data = { "name": '', "configMap": { "name":'', "items": [ { "key": '', "path": '' } ] } }
            }
            break
          case 'variable':
            if (groupType === 'ordinary') {
              data.groupTypes = ''
              data['ordinary'] = {}
              data['labelArr'] = [
                { type: 'input', value: 'name', label: 'name' },
                { type: 'input', value: 'value', label: 'value' }
              ]
            }
            if (groupType === 'ConfigMap') {
              data['ConfigMap'] = {}
              data['labelArr'] = [
                { type: 'input', value: 'name', label: 'name' },
                { type: 'input', value: 'ConfigMapName', label: 'ConfigMapName' },
                { type: 'input', value: 'ConfigMapKey', label: 'ConfigMapKey' }
              ]
            }
            if (groupType === 'Secret') {
              data['Secret'] = {}
              data['labelArr'] = [
                { type: 'input', value: 'name', label: 'name' },
                { type: 'input', value: 'SecretName', label: 'SecretName' },
                { type: 'input', value: 'SecretKey', label: 'SecretKey' }
              ]
            }
            if (groupType === 'Field') {
              data['Field'] = {}
              data['labelArr'] = [
                { type: 'input', value: 'name', label: 'name' },
                { type: 'input', value: 'fieldPath', label: 'SecretName' },
              ]
            }
            break
          case 'portset':
            data[groupType] = {}
            data['labelArr'] = [
              { type: 'input', value: 'name', label: 'name' },
              { type: 'input', value: 'port', label: proxy.$t('port') },
            ]
            break
          case 'volumeMount':
            data[groupType] = {}
            data['labelArr'] = [
              { type: 'input', value: 'name', label: 'name' },
              { type: 'input', value: 'mountPath', label: 'mountPath' },
            ]
            if (groupType === 'singleDirectory') {
              data['labelArr'].push({ type: 'input', value: 'subPath', label: 'subPath' })
            }
            break
        }
        state.tableData.push(data)
      } else {
        state.tableData = []
      }
    }

    const delTag = (index: number, type: string) => {
      state.tableData.splice(index, 1)
    }

    onMounted(() => {

    })

    return {
      METADATA_THEAD,
      ENV_VARIABLE_GROUP_MAP,
      ...toRefs(state),
      addTag,
      delTag,
    }
  }
})

</script>

<style lang="scss" scoped>
.button-group {
  font-size: 12px;
}

.add-item-con {
  width: 100%;
  margin-top: 20px;
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

.table-card {
  width: 100%
}
</style>