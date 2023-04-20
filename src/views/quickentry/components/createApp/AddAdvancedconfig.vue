<template>
    <!-- 高级调度设置 -->
    <div class="data-form-tags">
      <!-- First -->
      <el-form v-model="affinityData" label-width="160px">
        <div v-for="(typeItem, typeIndex) in FIRST_AFFINITY_SECHDUE" :key="typeItem.typeName">
          <el-form-item v-for="(sechdueItem, sechdueIndex) in typeItem.sechdue" :key="sechdueItem"
            :label="sechdueItem.label">
            <div class="affinity-operate">
              <!-- 操作 -->
              <div class="affinity-operate-detail">
                <div class="affinity-operate-detail-add">
                  <el-button :icon="Plus" type="primary" link @click="addSecdue(typeItem, sechdueItem, sechdueIndex)">
                    {{ $t('add') }}
                  </el-button>
                  <el-button :icon="Delete" link @click="clearSecdue()">
                    {{ $t('clearUp') }}
                  </el-button>
                </div>
                <!-- 列表项 -->
                <div class="affinity-operate-detail-message">
                  <el-tooltip v-if="sechdueItem.msgFlag" class="box-item" effect="dark"
                    :content="`（${typeItem.typeName}）${FIRST_AFFINITY_SECHDUE_MESSAGE_MAP[typeItem.typeName]}`"
                    placement="top">
                    <div class="affinity-operate-detail-message-text">
                      ({{ typeItem.typeName }}){{ FIRST_AFFINITY_SECHDUE_MESSAGE_MAP[typeItem.typeName] }}
                    </div>
                  </el-tooltip>
                </div>
              </div>
              <!-- 列表 -->
              <div class="affinity-operate-row" v-if="affinityData?.[sechdueItem.type]?.[typeItem.typeName]">
                <div v-if="sechdueItem?.select === 'nodeSelectorTerms'">
                  <div class="table-items"
                    v-for="(cItem, cIndex) in affinityData[sechdueItem.type][typeItem.typeName][sechdueItem.select]?.[0].matchExpressions"
                    :key="cIndex">
                    <AdvancedList :tableData="affinityData" :node-label="nodeLabel" :c-item="cItem"
                      @delCol="emitDelCol(sechdueIndex, typeItem, sechdueItem)"
                      @handleChange="emitHandleChange($event, { option: 'nodeLabel', cIndex, typeItem, sechdueItem })" />
                  </div>
                </div>
                <!-- state.affinityData[sechdueItem.type][typeItem.typeName][0][nodeAffSelect].matchExpressions -->
                <div v-else-if="sechdueItem?.select === 'preference'">
                  <div class="table-items"
                    v-for="(cItem, cIndex) in affinityData[sechdueItem.type][typeItem.typeName][0][sechdueItem.select].matchExpressions"
                    :key="cIndex">
                    <AdvancedList :tableData="affinityData" :node-label="nodeLabel" :c-item="cItem"
                      @delCol="emitDelCol(sechdueIndex, typeItem, sechdueItem)"
                      @handleChange="emitHandleChange($event, { option: 'nodeLabel', cIndex, typeItem, sechdueItem })" />
                  </div>
                </div>
                <div v-else-if="sechdueItem?.select === 'labelSelector'">
                  <div class="table-items"
                    v-for="(cItem, cIndex) in affinityData[sechdueItem.type][typeItem.typeName]?.[0][sechdueItem.select].matchExpressions"
                    :key="cIndex">
                    <AdvancedList :tableData="affinityData" :node-label="nodeLabel" :c-item="cItem"
                      @delCol="emitDelCol(sechdueIndex, typeItem, sechdueItem)"
                      @handleChange="emitHandleChange($event, { option: 'nodeLabel', cIndex, typeItem, sechdueItem })" />
                  </div>
                </div>
                <div v-else-if="sechdueItem?.select === 'podAffinityTerm'">
                  <div class="table-items"
                    v-for="(cItem, cIndex) in affinityData[sechdueItem.type][typeItem.typeName]?.[0][sechdueItem.select].labelSelector.matchExpressions"
                    :key="cIndex">
                    <AdvancedList :tableData="affinityData" :node-label="nodeLabel" :c-item="cItem"
                      @delCol="emitDelCol(sechdueIndex, typeItem, sechdueItem)"
                      @handleChange="emitHandleChange($event, { option: 'nodeLabel', cIndex, typeItem, sechdueItem })" />
                  </div>
                </div>
              </div>
            </div>

          </el-form-item>
          <el-divider class="costv-divider mt0 mb16" />
        </div>
      </el-form>

      <!-- Second -->
      <el-form v-model="affinityData" label-width="160px">
        <div v-for="(typeItem, typeIndex) in SECOND_AFFINITY_SECHDUE" :key="typeItem.typeName">
          <el-form-item v-for="(sechdueItem, sechdueIndex) in typeItem.sechdue" :key="sechdueItem"
            :label="sechdueItem.label">
            <div class="affinity-operate">
              <!-- 操作 -->
              <div class="affinity-operate-detail">
                <div class="affinity-operate-detail-add">
                  <el-button :icon="Plus" type="primary" link @click="addSecdue(typeItem, sechdueItem, sechdueIndex)">
                    {{ $t('add') }}
                  </el-button>
                  <el-button :icon="Delete" link @click="clearSecdue()">
                    {{ $t('clearUp') }}
                  </el-button>
                </div>
                <!-- 列表项 -->
                <div class="affinity-operate-detail-message">
                  <el-tooltip v-if="sechdueItem.msgFlag" class="box-item" effect="dark"
                    :content="`（${typeItem.typeName}）${FIRST_AFFINITY_SECHDUE_MESSAGE_MAP[typeItem.typeName]}`"
                    placement="top">
                    <div class="affinity-operate-detail-message-text">
                      ({{ typeItem.typeName }}){{ FIRST_AFFINITY_SECHDUE_MESSAGE_MAP[typeItem.typeName] }}
                    </div>
                  </el-tooltip>
                </div>
              </div>
              <!-- 列表 -->
              <div class="affinity-operate-row" v-if="affinityData?.[sechdueItem.type]?.[typeItem.typeName]">
                <div v-if="sechdueItem?.select === 'nodeSelectorTerms'">
                  <div class="table-items"
                    v-for="(cItem, cIndex) in affinityData[sechdueItem.type][typeItem.typeName][sechdueItem.select]?.[0].matchExpressions"
                    :key="cIndex">
                    <AdvancedList :tableData="affinityData" :node-label="nodeLabel" :c-item="cItem"
                      @delCol="emitDelCol(sechdueIndex, typeItem, sechdueItem)"
                      @handleChange="emitHandleChange($event, { option: 'nodeLabel', cIndex, typeItem, sechdueItem })" />
                  </div>
                </div>
                <div v-else-if="sechdueItem?.select === 'preference'">
                  <div class="table-items"
                    v-for="(cItem, cIndex) in affinityData[sechdueItem.type][typeItem.typeName][0][sechdueItem.select]?.matchExpressions"
                    :key="cIndex">
                    <AdvancedList :tableData="affinityData" :node-label="nodeLabel" :c-item="cItem"
                      @delCol="emitDelCol(sechdueIndex, typeItem, sechdueItem)"
                      @handleChange="emitHandleChange($event, { option: 'nodeLabel', cIndex, typeItem, sechdueItem })" />
                  </div>
                </div>
                <div v-else-if="sechdueItem?.select === 'labelSelector'">
                  <div class="table-items"
                    v-for="(cItem, cIndex) in affinityData[sechdueItem.type][typeItem.typeName]?.[0][sechdueItem.select].matchExpressions"
                    :key="cIndex">
                    <AdvancedList :tableData="affinityData" :node-label="nodeLabel" :c-item="cItem"
                      @delCol="emitDelCol(sechdueIndex, typeItem, sechdueItem)"
                      @handleChange="emitHandleChange($event, { option: 'nodeLabel', cIndex, typeItem, sechdueItem })" />
                  </div>
                </div>
                <div v-else-if="sechdueItem?.select === 'podAffinityTerm'">
                  <div class="table-items"
                    v-for="(cItem, cIndex) in affinityData[sechdueItem.type][typeItem.typeName]?.[0][sechdueItem.select].labelSelector.matchExpressions"
                    :key="cIndex">
                    <AdvancedList :tableData="affinityData" :node-label="nodeLabel" :c-item="cItem"
                      @delCol="emitDelCol(sechdueIndex, typeItem, sechdueItem)"
                      @handleChange="emitHandleChange($event, { option: 'nodeLabel', cIndex, typeItem, sechdueItem })" />
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-divider class="costv-divider mt0 mb16" />
        </div>
      </el-form>
    </div>
    <!-- 容忍 -->
    <div class="data-form-tags">
      <el-form v-model="tolerationArr" label-width="80px">
        <el-form-item :label="$t('tolerate')">
          <el-button-group class="button-group-operate">
            <el-button v-for="(item, index) in TOLERATE_TABLE_GROUP_ARR" link class="button-group" :type="item.type"
              :icon="item.icon" @click="addTol">{{ item.text }}</el-button>
          </el-button-group>
          <div class="add-item-con">
            <div class="table-items" v-for="(item, index) in tolerationArr" :key="index">
              <el-row>
                <el-col :span="22">
                  <div class="table-items-btn-content">
                    <div class="table-items-btn-content">
                      <el-form style="width:100%" v-model="tolerationArr" label-width="80px" :inline="true">
                        <el-row style="width:100%">
                          {{item}}
                        </el-row>
                      </el-form>
                    </div>
                  </div>
                  <!-- <div class="table-items-btn-content">
                    <el-form style="width:100%" v-model="tolerations" label-width="80px" :inline="true">
                      <el-row style="width:100%">
                        <el-col :span="6">
                          <el-form-item :label="$t('type')">{{ item.groupTypes }}</el-form-item>
                        </el-col>
                        <el-col :span="18 / item.labelArr.length" v-for="cItem in item.labelArr" :key="cItem.value">
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
                  </div> -->
                </el-col>
                <el-col :span="2">
                  <div class="table-items-btn-content">
                    <el-button type="primary" link>{{ $t('delete') }}</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Table from '@/components/table/index.vue'
import {
  METADATA_THEAD,
  FIRST_AFFINITY_SECHDUE,
  SECOND_AFFINITY_SECHDUE,
  HOST_PATH_SELECT,
  AFFINITY_OPERATOR_OPTION,
  TOLERATE_TABLE_GROUP_ARR,
  FIRST_AFFINITY_SECHDUE_MESSAGE_MAP,
} from '../config'
import AdvancedList from './AdvancedList.vue'
import AddButtonGroupTable from './AddButtonGroupTable.vue'
import {
  Plus,
  Delete,
} from '@element-plus/icons-vue'

interface StateInfo {
  affinityData: any;
  nodeAffSelect: string;
  hostPathSelect: Array<any>;
    tolerationArr: Array<any>;
}
export default defineComponent({
  components: {
    Table,
    AdvancedList,
    AddButtonGroupTable,
  },
  props: {
    namespace: {
      type: Array<any>,
      default: [],
    },
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
    nodeLabel: {
      type: Object,
      default: {},
      required: false
    },
    nodePodLabel: {
      type: Object,
      default: {},
      required: false
    },
  },

  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const state: StateInfo = reactive({
      affinityData: {
        // 节点亲和度
        nodeAffinity: {
          requiredDuringSchedulingIgnoredDuringExecution: {
            nodeSelectorTerms: [{
              matchExpressions: []
            }]
          },
          requiredDuringSchedulingRequiredDuringExecution: {
            nodeSelectorTerms: [{
              matchExpressions: []
            }]
          },
          preferredDuringSchedulingIgnoredDuringExecution: [
            {
              podAffinityTerm: {
                labelSelector: {
                  matchExpressions: []
                }
              }
            }
          ],
          preferredDuringSchedulingRequiredDuringExecution: [
            {
              podAffinityTerm: {
                labelSelector: {
                  matchExpressions: []
                }
              }
            }
          ]
        },
        // pod亲和度
        podAffinity: {
          requiredDuringSchedulingIgnoredDuringExecution: [{
            labelSelector: {
              matchExpressions: []
            },
            namespaces: [],
            topologyKey: ''
          }],
          requiredDuringSchedulingRequiredDuringExecution: [{
            labelSelector: {
              matchExpressions: []
            },
            namespaces: [],
            topologyKey: ''
          }],
          preferredDuringSchedulingIgnoredDuringExecution: [
            {
              podAffinityTerm: {
                labelSelector: {
                  matchExpressions: []
                },
                namespaces: [],
                topologyKey: ''
              }
            }
          ],
          preferredDuringSchedulingRequiredDuringExecution: [
            {
              podAffinityTerm: {
                labelSelector: {
                  matchExpressions: []
                },
                namespaces: [],
                topologyKey: ''
              }
            }
          ]
        },
        // pod反亲和度
        podAntiAffinity: {
          requiredDuringSchedulingIgnoredDuringExecution: [{
            labelSelector: {
              matchExpressions: []
            },
            namespaces: [],
            topologyKey: ''
          }],
          requiredDuringSchedulingRequiredDuringExecution: [{
            labelSelector: {
              matchExpressions: []
            },
            namespaces: [],
            topologyKey: ''
          }],
          preferredDuringSchedulingIgnoredDuringExecution: [
            {
              podAffinityTerm: {
                labelSelector: {
                  matchExpressions: []
                },
                namespaces: [],
                topologyKey: ''
              }
            }
          ],
          preferredDuringSchedulingRequiredDuringExecution: [
            {
              podAffinityTerm: {
                labelSelector: {
                  matchExpressions: []
                },
                namespaces: [],
                topologyKey: ''
              }
            }
          ]
        }
      },
      nodeAffSelect: 'nodeSelectorTerms',
      hostPathSelect: HOST_PATH_SELECT,
      tolerationArr: [],
    })

    const addTol = () => {
      let data = { key: '', operator: '', value: '', effect: '' }
      state.tolerationArr.push(data)
    }

    const sechdueSelect = (firstLevel: string, secondLevel: string): string => {
      let nodeAffSelect = ''
      switch (firstLevel) {
        case 'nodeAffinity':
          switch (secondLevel) {
            case 'requiredDuringSchedulingIgnoredDuringExecution':
            case 'requiredDuringSchedulingRequiredDuringExecution':
              nodeAffSelect = 'nodeSelectorTerms'
              break
            case 'preferredDuringSchedulingIgnoredDuringExecution':
            case 'preferredDuringSchedulingRequiredDuringExecution':
              nodeAffSelect = 'preference'
              break
          }
          break
        case 'podAffinity':
          switch (secondLevel) {
            case 'requiredDuringSchedulingIgnoredDuringExecution':
            case 'requiredDuringSchedulingRequiredDuringExecution':
              nodeAffSelect = 'labelSelector'
              break
            case 'preferredDuringSchedulingIgnoredDuringExecution':
            case 'preferredDuringSchedulingRequiredDuringExecution':
              nodeAffSelect = 'podAffinityTerm'
              break
          }
          break
        case 'podAntiAffinity':
          switch (secondLevel) {
            case 'requiredDuringSchedulingIgnoredDuringExecution':
            case 'requiredDuringSchedulingRequiredDuringExecution':
              nodeAffSelect = 'labelSelector'
              break
            case 'preferredDuringSchedulingIgnoredDuringExecution':
            case 'preferredDuringSchedulingRequiredDuringExecution':
              nodeAffSelect = 'podAffinityTerm'
              break
          }
          break
      }
      return nodeAffSelect
    }

    // 添加调度设置
    const addSecdue = (typeItem: any, sechdueItem: any, sechdueIndex: number) => {
      let data = { key: '', values: [], operator: '' }
      let nodeAffSelect = sechdueSelect(sechdueItem.type, typeItem.typeName)
      state.nodeAffSelect = nodeAffSelect
      if (nodeAffSelect === 'nodeSelectorTerms') {
        if (!state.affinityData[sechdueItem.type][typeItem.typeName]) {
          state.affinityData[sechdueItem.type][typeItem.typeName] = {}
        }
        if (!state.affinityData[sechdueItem.type][typeItem.typeName][nodeAffSelect]) {
          state.affinityData[sechdueItem.type][typeItem.typeName][nodeAffSelect] = [{}]
        }
        if (!state.affinityData[sechdueItem.type][typeItem.typeName][nodeAffSelect][0].matchExpressions) {
          state.affinityData[sechdueItem.type][typeItem.typeName][nodeAffSelect][0].matchExpressions = []
        }
        state.affinityData[sechdueItem.type][typeItem.typeName][nodeAffSelect][0].matchExpressions.push(data)


      } else if (nodeAffSelect === 'preference') {
        if (!state.affinityData[sechdueItem.type][typeItem.typeName]) {
          state.affinityData[sechdueItem.type][typeItem.typeName] = []
        }
        if (!state.affinityData[sechdueItem.type][typeItem.typeName][0]?.[nodeAffSelect]) {
          state.affinityData[sechdueItem.type][typeItem.typeName] = [{ [nodeAffSelect]: {} }]
        }
        if (!state.affinityData[sechdueItem.type][typeItem.typeName][0][nodeAffSelect].matchExpressions) {
          state.affinityData[sechdueItem.type][typeItem.typeName][0][nodeAffSelect].matchExpressions = []
        }
        state.affinityData[sechdueItem.type][typeItem.typeName][0][nodeAffSelect].matchExpressions.push(data)

      } else if (nodeAffSelect === 'labelSelector') {
        if (!state.affinityData[sechdueItem.type][typeItem.typeName]) {
          state.affinityData[sechdueItem.type][typeItem.typeName] = []
        }
        if (!state.affinityData[sechdueItem.type][typeItem.typeName][0]?.[nodeAffSelect]) {
          state.affinityData[sechdueItem.type][typeItem.typeName] = [{ [nodeAffSelect]: {} }]
        }
        if (!state.affinityData[sechdueItem.type][typeItem.typeName][0]?.[nodeAffSelect]?.matchExpressions) {
          state.affinityData[sechdueItem.type][typeItem.typeName][0][nodeAffSelect].matchExpressions = []
        }
        state.affinityData[sechdueItem.type][typeItem.typeName][0][nodeAffSelect].matchExpressions.push(data)


      } else if (nodeAffSelect === 'podAffinityTerm') {
        if (!state.affinityData[sechdueItem.type][typeItem.typeName]) {
          state.affinityData[sechdueItem.type][typeItem.typeName] = []
        }
        if (!state.affinityData[sechdueItem.type][typeItem.typeName][0]?.[nodeAffSelect]) {
          state.affinityData[sechdueItem.type][typeItem.typeName] = [{ [nodeAffSelect]: {} }]
        }
        if (!state.affinityData[sechdueItem.type][typeItem.typeName][0]?.[nodeAffSelect]?.labelSelector) {
          state.affinityData[sechdueItem.type][typeItem.typeName][0][nodeAffSelect].labelSelector = {}
        }
        if (!state.affinityData[sechdueItem.type][typeItem.typeName][0]?.[nodeAffSelect]?.labelSelector?.matchExpressions) {
          state.affinityData[sechdueItem.type][typeItem.typeName][0][nodeAffSelect].labelSelector.matchExpressions = []
        }
        state.affinityData[sechdueItem.type][typeItem.typeName][0][nodeAffSelect].labelSelector.matchExpressions.push(data)
      }
    }

    // 删除调度设置
    const delSecdue = (typeItem: any, sechdueItem: any, sechdueIndex: number) => {
    }

    // 清空调度列表项
    const clearSecdue = () => {
    }

    // 选择key
    const handleChange = (option: string, cIndex: number, typeItem: any, sechdueItem: any, event: any) => {
      const selectData = state.affinityData[sechdueItem.type][typeItem.typeName]
      if (Array.isArray(selectData)) {
        // state.affinityData[sechdueItem.type][typeItem.typeName][nodeAffSelect][0].matchExpressions.push(data)
        selectData[0][state.nodeAffSelect].matchExpressions.filter((item, index) => (item.key === event) && index === cIndex)[0].values = props[option]['value'][event]
      } else {
        // selectData[state.nodeAffSelect][0].matchExpressions = props[option]['value'][event]
      }
    }

    // 组件穿参
    const emitHandleChange = (event?: string, row?: any) => {
      handleChange(row.option, row.cIndex, row.typeItem, row.sechdueItem, event)
    }

    const emitDelCol = (sechdueIndex: number, typeItem: any, sechdueItem: any,) => {
      delSecdue(typeItem, sechdueItem, sechdueIndex)
    }

    const defaultOption = () => {
      state.affinityData = props.tableConfig.spec.template.spec.affinity
      state.tolerationArr = props.tableConfig.spec.template.spec.tolerations || []
    }

    onMounted(() => {
      defaultOption()
    })

    return {
      Plus,
      Delete,
      METADATA_THEAD,
      TOLERATE_TABLE_GROUP_ARR,
      FIRST_AFFINITY_SECHDUE,
      SECOND_AFFINITY_SECHDUE,
      AFFINITY_OPERATOR_OPTION,
      FIRST_AFFINITY_SECHDUE_MESSAGE_MAP,
      ...toRefs(state),
      addTol,
      addSecdue,
      delSecdue,
      clearSecdue,
      handleChange,
      emitHandleChange,
      emitDelCol,
      sechdueSelect
    }
  }
})

</script>

<style lang="scss" scoped>
.table-card {
  width: 100%;
}

.affinity-operate {
  width: 700px;
  &-detail {
    width: 210px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    &-add {
      margin-left: 2px;
      flex: 1;
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      height: 32px;
    }

    &-message {
      font-size: 12px;
      flex: 1;

      &-text {
        cursor: pointer;
        margin-left: 200px;
        width: 300px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  &-row {
    width: 100%;
  }
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

  &-first {
    display: flex;
    justify-content: center;
    align-items: center;

    &-form {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.el-col-operate {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pod-namespace {
  margin: 10px 0;
}
.add-item-con {
  width: 100%;
  margin-top: 20px;
}
.button-group-operate {
  margin-top: 9px;
}

.w200 {
  width: 200px;
}
</style>