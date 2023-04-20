<template>
  <Dialog v-bind="$attrs" :title="editItem.title" :config="config" @close="close" @success="close">
    <template #content>
      <!-- <div class="refresh-button">
        <el-button type="primary" :icon="Refresh" @click="getData"/>
      </div> -->
      <div v-loading="loading">
        <div v-if="isGrpcol">
          <div style="margin-bottom:50px" v-for="(infoItems, infoIndex) in grpcol" :key="infoIndex">
            <el-collapse v-model="activeNames" @change="handleChange">
              <!-- 主要信息 -->
              <el-collapse-item :title="$t('mainInformation')" :name="`baseinfo-${infoIndex}`">
                <div class="detail-card-content">
                  <div class="row" v-for="item in infoItems.baseinfo" :key="item.name">
                    <div class="label-content">
                      <label class="col-md-4  overflow-wraps">
                        <div :style="`${item.color ? `color:${item.color}` : ''}`">{{ item.name }}</div>
                      </label>
                      <label class="col-md-8 control-label fwbold">
                        <div v-if="item.success">
                          <div v-if="item.isSuccess" class="label-active">
                            {{ item.value }}{{ item.tail ? item.tail : '' }}
                          </div>
                          <div v-if="!item.isSuccess" class="label-cancel">
                            {{ item.value }}{{ item.tail ? item.tail : '' }}
                          </div>
                        </div>
                        <div v-if="!item.success">
                          {{ item.value }}{{ item.tail ? item.tail : '' }}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </el-collapse-item>

              <!-- 系统信息 -->
              <el-collapse-item :title="$t('systemInfo')" :name="`system-${infoIndex}`">
                <div class="detail-card-content">
                  <div class="row" v-for="item in infoItems.system" :key="item.name">
                    <div class="label-content">
                      <label class="col-md-4  control-label fwbold overflow-wraps">
                        <div v-if="item.color">
                          <div ng-style="{color: item.color}">{{ item.name }}</div>
                        </div>
                        <div v-if="!item.color">
                          {{ item.name }}
                        </div>
                      </label>
                      <label class="col-md-8 control-label fwbold">
                        <div v-if="item.success">
                          <div v-if="item.isSuccess" class="label-active">
                            {{ item.value }}{{ item.tail ? item.tail : '' }}
                          </div>
                          <div v-if="!item.isSuccess" class="label-cancel">
                            {{ item.value }}{{ item.tail ? item.tail : '' }}
                          </div>
                        </div>
                        <div v-if="!item.success">
                          {{ item.value }}{{ item.tail ? item.tail : '' }}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </el-collapse-item>

              <!-- 其他信息 -->
              <el-collapse-item :title="$t('otherInfo')" :name="`other-${infoIndex}`">
                <div class="detail-card">
                  <div class="detail-card-content">
                    <div v-for="item in infoItems.otherinfo" :key="item[0]">
                      <div v-if="treenamecol !== item[0]" class="label-content">
                        <div class="col-md-4  control-label fwbold overflow-wraps">
                          <div class="overflow-wraps" :style="`${item.color ? `color:${item.color}` : ''}`">{{ item[0] }}
                          </div>
                        </div>
                        <div class="col-md-8 control-label fwbold">
                          {{ item[1] }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-collapse-item>

              <el-collapse-item :title="$t('operate')" :name="`operate-${infoIndex}`">
                <div class="detail-card-content">
                  <div class="row" v-for="item in infoItems.otherinfo" :key="item.name">
                    <div v-if="treenamecol === item[0]" style="margin-bottom: 20px;" class="label-content">
                      <div class="col-md-4  control-label fwbold overflow-wraps">{{ $t('fullTree') }}</div>
                      <label class="col-md-8 control-label fwbold">
                        <el-tag class="ml10" v-for="gItem in item[1].split(',')">{{ gItem }}</el-tag>
                      </label>
                    </div>

                    <div style="margin-bottom: 20px;" v-if="item[0] === '_tree_'">
                      <label style="display:inline-block" class="col-md-4  control-label fwbold overflow-wraps">{{
                        $t('internalServiceTree') }}</label>
                      <el-autocomplete class="w300" v-model="item[1]" :fetch-suggestions="querySearch" clearable />
                      <div style="display:inline-block" v-if="timemachine === 'curr'">
                        <el-tooltip effect="dark" :content="$t('bindTooltip')" placement="top">
                          <el-button class="ml20" type="primary" @click="onBindTree(item[1], 'bind')">
                            {{ $t('bind') }}
                          </el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" :content="$t('returnTooltip')" placement="top">
                          <el-button @click="onBindTree('x', 'return')">{{ $t('return') }}</el-button>
                        </el-tooltip>
                      </div>
                    </div>

                    <div style="margin-bottom: 20px;" v-if="extcol[item[0]]">
                      <label style="display:inline-block" class="col-md-4  control-label fwbold overflow-wraps">{{
                        extcol[item[0]].alias }}</label>
                      <div style="display:inline-block" class="col-md-6">
                        <div style="display:inline-block" v-if="extcol[item[0]].select">
                          <el-select class="w300" v-model="item[1]">
                            <el-option v-for="cItem in extcol[item[0]].select" :key="cItem" :label="cItem"
                              :value="cItem" />
                          </el-select>
                        </div>
                        <div style="display:inline-block" v-else>
                          <el-input class="w300" v-model="item[1]" />
                        </div>
                        <el-button class="ml20" type="primary" @click="onSaveExtcol(item[0], item[1])">{{ $t('save')
                        }}</el-button>
                      </div>

                    </div>

                    <div style="margin-bottom: 20px;" v-if="'_mysqlauth_' == item[0]">
                      <label style="display:inline-block" class="col-md-4  control-label fwbold overflow-wraps">{{ item[0]
                      }}</label>
                      <el-input class="w300" v-model="item[1]" />
                      <el-button class="ml20" type="primary" @click="onChpasswd(item, '_mysqladdr_', 'mysql', item[1])">
                        {{ $t('modifyMysqlPwd') }}</el-button>
                    </div>

                    <div style="margin-bottom: 20px;" v-if="'_redisauth_' == item[0]">
                      <label style="display:inline-block" class="col-md-4  control-label fwbold overflow-wraps">{{ item[0]
                      }}</label>
                      <el-input class="w300" v-model="item[1]" />
                      <el-button class="ml20" type="primary" @click="onChpasswd(item, '_redisaddr_', 'redis', item[1])">
                        {{ $t('modifyRedisPwd') }}
                      </el-button>
                    </div>

                    <div style="margin-bottom: 20px;" v-if="'_mongodbauth_' == item[0]">
                      <label style="display:inline-block" class="col-md-4  control-label fwbold overflow-wraps">{{ item[0]
                      }}</label>
                      <el-input class="w300" v-model="item[1]" />
                      <el-button class="ml20" type="primary"
                        @click="onChpasswd(item, '_mongodbaddr_', 'mongodb', item[1])">
                        {{ $t('modifyMongoDBPwd') }}
                      </el-button>
                    </div>

                    <div style="margin-bottom: 20px;" v-if="'_auth_' == item[0]">
                      <label style="display:inline-block"
                        class="col-md-4  control-label fwbold overflow-wraps">登录账号</label>
                      <el-input class="w300" v-model="item[1]" />
                      <el-button class="ml20" type="primary" @click="handleChAuth(item[1])">
                        {{ $t('modifyMongoDBPwd') }}
                      </el-button>
                    </div>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>

        <div v-else>
          <el-form v-model="noGrpcolForm" label-width="180px">
            <div v-for="item in noGrpcol" :key="item">
              <div v-for="cItem in item" :key="cItem[0]">
                <el-form-item :label="cItem[0]"> {{ cItem[1] }} </el-form-item>
                <div v-if="treenamecol === cItem[0]">
                  <el-form-item :label="$t('fullTree')">
                    <el-tag class="ml10" v-for="gItem in cItem[1].split(',')">{{ gItem }}</el-tag>
                  </el-form-item>
                </div>
                <div v-if="cItem[0] === '_tree_'">
                  <el-form-item :label="$t('internalServiceTree')">
                    <el-autocomplete class="w450" v-model="cItem[1]" :fetch-suggestions="querySearch" clearable
                      placeholder="Please Input" />
                    <el-tooltip effect="dark" :content="$t('bindTooltip')" placement="top">
                      <el-button type="primary" @click="onBindTree(cItem[1], 'bind')" class="ml20">{{ $t('bind')
                      }}</el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" :content="$t('returnTooltip')" placement="top">
                      <el-button @click="onBindTree('x', 'return')">{{ $t('return') }}</el-button>
                    </el-tooltip>
                  </el-form-item>
                </div>

                <div v-if="extcol[cItem[0]]">
                  <el-form-item :label="extcol[cItem[0]].alias">
                    <div v-if="extcol[cItem[0]].select">
                      <el-select v-model="cItem[1]" class="m-2" placeholder="Select">
                        <el-option v-for="item in extcol[cItem[0]].select" :key="item" :label="item" :value="item" />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-input v-model="cItem[1]" />
                    </div>
                    <el-button type="primary" @click="onSaveExtcol(cItem[0], cItem[1])">{{ $t('save') }}</el-button>
                  </el-form-item>
                </div>
                <div v-if="cItem[0] === '_mysqlauth_'">
                  <el-form-item :label="cItem[0]">
                    <el-input v-model="cItem[1]" />
                    <el-button type="primary" @click="onChpasswd(item, '_mysqladdr_', 'mysql', cItem[1])">
                      {{ $t('modifyMysqlPwd') }}</el-button>
                  </el-form-item>
                </div>


                <div v-if="cItem[0] === '_redisauth_'">
                  <el-form-item :label="cItem[0]">
                    <el-input v-model="cItem[1]" />
                    <el-button type="primary" @click="onChpasswd(item, '_redisaddr_', 'redis', cItem[1])">
                      {{ $t('modifyRedisPwd') }}
                    </el-button>
                  </el-form-item>
                </div>
                <div v-if="cItem[0] === '_mongodbauth_'">
                  <el-form-item :label="cItem[0]">
                    <el-input v-model="cItem[1]" />
                    <el-button type="primary" @click="onChpasswd(item, '_mongodbaddr_', 'mongodb', cItem[1])">
                      {{ $t('modifyMongoDBPwd') }}
                    </el-button>
                  </el-form-item>
                </div>

                <div v-if="cItem[0] === '_auth_'">
                  <el-form-item :label="cItem[0]">
                    <el-input v-model="cItem[1]" />
                    <el-button type="primary" @click="handleChAuth(cItem[1])">
                      {{ $t('modifyMongoDBPwd') }}
                    </el-button>
                  </el-form-item>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </template>
    <template #footer>
      <el-button @click="close">{{ $t('cancel') }}</el-button>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import { Refresh } from '@element-plus/icons-vue'
import {
  RESOURCE_TYPE_MODEL_CONFIG,
  device_dataRet,
  BIND_TREE_MAP,
} from '../config'
import { ElMessageBox } from 'element-plus'

import {
  getDataModelDetail,
  getIntervalServerTree,
  getDeviceTreebind,
  handleSaveExtcol,
  handleAuthExtcol,
} from '@/api/device/index'

import {
  CMDBChpassword,
  CMDBResourceDataBlankInfo,
} from '@/api/interface/device'
interface RestaurantItem {
  value: string
}

interface GrpcolInfo {
  baseinfo: Array<any>;
  index?: number;
  otherinfo: Array<any>
  system: Array<any>
}

interface StateInfo {
  activeNames: Array<any>;
  isGrpcol: boolean;
  grpcol: GrpcolInfo[];
  noGrpcol: Array<any>;
  treenamecol: any;
  extcol: any;
  noGrpcolForm: any;
  loading: boolean;
}

export default defineComponent({
  props: {
    treeId: {
      type: String,
      default: '4000000000'
    },
    config: {
      type: Object,
      default: RESOURCE_TYPE_MODEL_CONFIG
    },
    timemachine: {
      type: String,
      default: 'curr'
    },
    editItem: {
      type: Object,
      default: {}
    }
  },
  components: {
    Dialog
  },
  emits: ['success', 'close'],
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const restaurants = ref<RestaurantItem[]>([])
    const state: StateInfo = reactive({
      activeNames: [],
      isGrpcol: false,
      grpcol: [],
      noGrpcol: [],
      treenamecol: {},
      extcol: {},
      noGrpcolForm: {},
      loading: false
    })

    // 获取资源详情
    const getData = async () => {
      state.loading = true
      const params: CMDBResourceDataBlankInfo = {
        treeId: props.treeId,
        type: props.editItem.type,
        subtype: props.editItem.subtype,
        uuid: props.editItem.row.uuid,
        timemachine: props.editItem.timemachine === 'current' ? 'curr': props.editItem.timemachine,
      }
      const dataRet = await getDataModelDetail(params).catch(err => { state.loading = false })
      if (dataRet) {
        console.log(dataRet)
        state.loading = false
        state.noGrpcol = dataRet.data
        state.treenamecol = dataRet.treenamecol
        state.extcol = dataRet.extcol
        const newData = JSON.parse(JSON.stringify(dataRet))
        if (dataRet.grpcol) {
          state.isGrpcol = true
          const addinfo = [...dataRet.grpcol?.system, ...dataRet.grpcol?.baseinfo]
          const disposeGrpcol = []
          newData.forEach((dataItems, dataIndex) => {
            const newSystem = []
            const newBaseInfo = []

            dataRet.grpcol.system.map(info => {
              if (info.prefix) {
                addinfo.filter(cItem => !!cItem['prefix']).map(preItem => {
                  newSystem.push(...dataItems.filter(item => item[0].indexOf(preItem['prefix']) === 0).map(item => {
                    return { name: item[0], value: item[1] }
                  }))
                })
              } else {
                newSystem.push(...dataItems.filter(item => item[0] === info.name).map(item => {
                  info.name = item[0]
                  info['value'] = item[1]
                  if (info['success']) {
                    info['isSuccess'] = !!info['success'].find(d => d === item[1])
                  }
                  return info
                }))
              }
            })

            dataRet.grpcol.baseinfo.map(info => {
              if (info['prefix']) {
                addinfo.filter(cItem => !!cItem['prefix']).map(preItem => {
                  newBaseInfo.push(...dataItems.filter(item => item[0].indexOf(preItem['prefix']) === 0).map(item => {
                    return {
                      name: item[0],
                      value: item[1]
                    }
                  }))
                })
              } else {
                newBaseInfo.push(...dataItems.filter(item => item[0] === info.name).map(item => {
                  info.name = item[0]
                  info['value'] = item[1]
                  if (info.success) {
                    info['isSuccess'] = !!info.success.find(d => d === item[1])
                  }
                  return info
                }))
              }
            })

            const newGrpcol = [
              ...dataRet.grpcol.system.filter(item => !!item.name).map(item => item.name),
              ...dataRet.grpcol.baseinfo.filter(item => !!item.name).map(item => item.name)
            ]
            if (addinfo.find(cItem => cItem['prefix'])) {
              newGrpcol.push(
                ...dataItems.filter(item => item[0].indexOf(addinfo.find(cItem => cItem['prefix'])['prefix']) === 0).map(item => item[0])
              )
            }

            const newOtherinfo = dataItems.filter(item => !newGrpcol.find(cItem => cItem === item[0]))
            disposeGrpcol.push({
              index: dataIndex,
              system: formatArr(newSystem),
              baseinfo: formatArr(newBaseInfo),
              otherinfo: newOtherinfo,
            })
            disposeGrpcol.forEach((item, index) => {
              state.activeNames.push(`baseinfo-${index}`)
              state.activeNames.push(`system-${index}`)
              state.activeNames.push(`operate-${index}`)
            })
            state.grpcol = disposeGrpcol
          })
        }
      }
    }

    const formatArr = (arr) => {
      let map = new Map();
      for (let item of arr) {
        if (!map.has(item.name)) {
          map.set(item.name, item);
        }
      }
      return Array.from(map.values())
    }

    // 获取内部服务树列表
    const getInnerTree = async () => {
      const dataRet = await getIntervalServerTree({})
      if (dataRet) {
        const newData = JSON.parse(JSON.stringify(dataRet))
        restaurants.value = [...newData.map(item => { return { value: item.name } })]
      }
    }

    const querySearch = (queryString: string, cb: any) => {
      const results = queryString
        ? restaurants.value.filter(createFilter(queryString))
        : restaurants.value
      cb(results)
    }

    const createFilter = (queryString: string) => {
      return (restaurant: RestaurantItem) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    }

    const onBindTree = async (row: string, type: string) => {
      // BIND_TREE_MAP
      ElMessageBox.confirm(BIND_TREE_MAP[type].desc, BIND_TREE_MAP[type].title, {
        confirmButtonText: proxy?.$t('config_options_confirm'),
        cancelButtonText: proxy?.$t('config_options_cancel'),
        type: 'warning'
      }).then(() => {
        const params: CMDBResourceDataBlankInfo = {
          type: props.editItem.type,
          subtype: props.editItem.subtype,
          uuid: props.editItem.row.uuid,
          newtree: row
        }
        getDeviceTreebind(params).then(res => {
          proxy?.$notification('cancelFavoritesSuccess')
        })
      }).catch(() => { })
    }

    const onSaveExtcol = async (key: string, value: string) => {
      ElMessageBox.confirm(proxy?.$t('reviseDesc'), proxy?.$t('revise'), {
        confirmButtonText: proxy?.$t('config_options_confirm'),
        cancelButtonText: proxy?.$t('config_options_cancel'),
        type: 'warning'
      }).then(() => {
        const params: CMDBResourceDataBlankInfo = {
          type: props.editItem.type,
          subtype: props.editItem.subtype,
          uuid: props.editItem.row.uuid,
          name: key,
          data: { data: value }
        }
        handleSaveExtcol(params).then(res => {
          proxy?.$notification('cancelFavoritesSuccess')
        }).catch(() => { })
      })
    }

    const onChpasswd = async (item: string[], key: string, type: string, value: string) => {
      let dbaddr = ''
      item.forEach(items => {
        if (items[0] === key) {
          dbaddr = items[1]
        }
      })
      ElMessageBox.confirm(proxy?.$t('modifyAccountInfoDesc'), `${proxy?.$t('save')}${type}://${dbaddr}${proxy.$t('account')}`, {
        confirmButtonText: proxy?.$t('config_options_confirm'),
        cancelButtonText: proxy?.$t('config_options_cancel'),
        type: 'warning'
      }).then(() => {
        const params: CMDBChpassword = {
          dbtype: type,
          dbaddr: dbaddr,
          passwd: value,
        }
        handleAuthExtcol(params).then(res => {
          proxy?.$notification('cancelFavoritesSuccess')
        }).catch(() => { })
      })
    }

    const handleChAuth = async (value: string) => {
      ElMessageBox.confirm(proxy?.$t('modifyAccountInfoDesc'), proxy?.$t('modifyAccountInfo'), {
        confirmButtonText: proxy?.$t('config_options_confirm'),
        cancelButtonText: proxy?.$t('config_options_cancel'),
        type: 'warning'
      }).then(() => {
        const params: CMDBChpassword = {
          dbtype: `${props.editItem.type}-${props.editItem.type}`,
          dbaddr: props.editItem.row.uuid,
          passwd: value,
        }
        handleAuthExtcol(params).then(res => {
          proxy?.$notification('cancelFavoritesSuccess')
        }).catch(() => { })
      })
    }

    const handleChange = (value) => {
    }

    const close = () => {
      proxy.$emit('close')
    }

    onMounted(() => {
      getData()
      getInnerTree()
    })

    return {
      Refresh,
      ...toRefs(state),
      close,
      getData,
      formatArr,
      onBindTree,
      onSaveExtcol,
      onChpasswd,
      handleChAuth,
      querySearch,
      handleChange,
    }
  }
})
</script>

<style lang="scss" scoped>
.w450 {
  width: 450px;
}

.w300 {
  width: 300px;
}

.label-content {
  display: flex;
  align-items: center;
}

.label-active {
  color: var(--color_text_success)
}

.overflow-wraps {
  min-width: 250px;
  // overflow-wrap: break-word;
  overflow-wrap: anywhere
}

.detail-card-content {
  font-weight: normal;
}

.label-cancel {
  color: var(--color_text_danger)
}
.refresh-button {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>