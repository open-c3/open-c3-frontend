<template>
  <div class="body-layout1">
    <span class="layout-title">
      <el-select filterable v-model="timeSelect" :placeholder="`${$t('configFormSelect')}${$t('time')}`"
        @change="onTimeChange" size="small">
        <el-option v-for="item in timeOption" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <div class="ml10">/ CMDB {{ treeData?.parent ? `/ ${treeData?.parent}` : '' }}</div>
    </span>
    <el-divider class="costv-divider mt16 mb16" />
    <div class="layout-content">
      <div class="layout-content-operation">
        <el-input class="layout-content-operation-input" @keyup.enter.native="onSelectCloudDetail('all', 'all', 'input')"
          v-model="grepdata._search" placeholder="Enter search terms..." />
        <el-button class="layout-content-operation-button" type="primary" :icon="Search"
          @click="onSelectCloudDetail('all', 'all', 'input')">
          {{ $t('globalSearch') }}
        </el-button>
      </div>
      <el-divider class="costv-divider mt16 mb16" />
      <div class="layout-content-card">
        <div class="layout-content-card-operate">
          <el-button class="layout-content-card-operate" type="primary"
            @click="operate('quantity', { tab: 0, metrics: 'c3_cmdb_resources_count' })">{{ $t('quantity') }}</el-button>
          <el-button class="layout-content-card-operate" type="primary"
            @click="operate('useTime', { tab: 0, metrics: 'c3_cmdb_sync_usetime' })">{{ $t('useTime') }}</el-button>
          <el-button class="layout-content-card-operate" type="primary"
            @click="operate('expire', { tab: 1, metrics: 'c3_cmdb_resources_mtime' })">{{ $t('expire') }}</el-button>
        </div>
        <el-card class="card-box-items" v-for="(item, index) in resourceCard" :key="index">
          <template #header>
            <div class="card-header">
              {{ CMDB_RESOURCE_MAP[item] }}{{ resourcesTotal[item] === 0 ? '' : `(${resourcesTotal[item]})` }}
            </div>
          </template>
          <!-- 内容分类 -->
          <div v-loading="loading">
            <Table :show-header="false" :thead="resourceData[item].header" :data="resourceData[item].data" :border="true">
              <el-table-column v-for="cItem in resourceData[item].header" :key="cItem.props" :prop="cItem.props"
                :label="cItem.label" align="left">
                <template #default="scope">
                  <div v-if="scope.row?.[cItem.prop]?.length > 0" class="cloud-vendor-content">
                    <div v-if="scope.row[cItem.prop][0]">
                      <svg-icon
                        :icon-class="OPEN_C3_CLOUD_VENDOR.includes(scope.row[cItem.prop][0]) ? scope.row[cItem.prop][0] : 'cloud-vendor'"
                        :width="scope.row[cItem.prop][0] === 'ksyun'? '50px': '20px'" :height="scope.row[cItem.prop][0] === 'ksyun'? '50px': '20px'" />
                    </div>
                    <el-button type="primary" link @click="onSelectCloudDetail(item, scope.row[cItem.prop][1], 'items')"
                      class="ml10 resource-button">{{ scope.row[cItem.prop][3] }}{{ scope.row[cItem.prop][2] && scope.row[cItem.prop][2] >
                        0
                        ?
                        `(${scope.row[cItem.prop][2]})` : '' }}</el-button>
                  </div>
                </template>
              </el-table-column>
            </Table>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import { Search } from '@element-plus/icons-vue'
import {
  CMDB_RESOURCE_MAP,
  OPEN_C3_CLOUD_VENDOR,
} from './config'

import {
  getMachineList,
  getCMDBResourceList,
  getCMDBV2ResourceList,
} from '@/api/device/index'
import {
  CMDBDataMenuInfo,
} from '@/api/interface/device'
import router from '@/router'

interface StateInfo {
  timeSelect: string;
  timeOption: { value: string | number, label: string | number }[];
  grepdata: { _search: string };
  loading: boolean;
  resourceCard: string[];
  resourceData: {
    compute: any;
    storage: any;
    database: any;
    networking: any;
    domain: any;
    others: any;
  };
  resourcesTotal: {
    compute: number;
    storage: number;
    database: number;
    networking: number;
    domain: number;
    others: number;
  };
  resourceOperate: {
    resourceType?: string;
    subType?: string;
    type?: string;
  }
}

export default defineComponent({
  components: {
    Table,
  },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const state: StateInfo = reactive({
      timeSelect: 'current',
      timeOption: [],
      grepdata: { _search: '' },
      loading: false,
      resourceCard: ['compute', 'networking', 'storage', 'database', 'domain', 'others'],
      resourceData: {
        compute: {
          header: [],
          data: [],
        },
        storage: {
          header: [],
          data: [],
        },
        database: {
          header: [],
          data: [],
        },
        networking: {
          header: [],
          data: [],
        },
        domain: {
          header: [],
          data: [],
        },
        others: {
          header: [],
          data: [],
        },
      },
      resourcesTotal: {
        compute: 0,
        storage: 0,
        database: 0,
        networking: 0,
        domain: 0,
        others: 0,
      },
      resourceOperate: {},
    })

    const treeId = computed(() => {
      return store.getters.treeId
    })

    const treeData = computed(() => {
      return store.getters.treeData
    })

    // 获取CMDB时间下拉数据
    const getMachLineTimeData = async (time?: string) => {
      const dataRet = await getMachineList({})
      if (dataRet) {
        state.timeOption.push({ value: 'current', label: 'current' })
        state.timeOption = dataRet.map(item => {
          return {
            value: item,
            label: item
          }
        })
      }
    }

    // 选择时间current
    const onTimeChange = (value: string) => {
      getData(value)
    }

    // 获取CMDB资源信息
    const getData = async (time?: string) => {
      state.resourceData = {
        compute: {
          header: [],
          data: [],
        },
        storage: {
          header: [],
          data: [],
        },
        database: {
          header: [],
          data: [],
        },
        networking: {
          header: [],
          data: [],
        },
        domain: {
          header: [],
          data: [],
        },
        others: {
          header: [],
          data: [],
        },
      },
        state.loading = true
      const params: CMDBDataMenuInfo = { timemachine: time }
      // const dataRet = await getCMDBResourceList(treeId.value, params).catch(err => state.loading = false)
      const dataRet = await getCMDBV2ResourceList(treeId.value, params).catch(err => state.loading = false)
      if (dataRet) {
        state.loading = false
        const newData = JSON.parse(JSON.stringify(dataRet))
        for (let key in dataRet) {
          state.resourcesTotal[key] = newData[key].map(item => item.map(cItem => cItem[2] ? Number(cItem[2]) : 0))
          newData[key].map((item, index) => {
            state.resourceData[key].data.push({ ...item })
            for (let keys in item) {
              if (state.resourceData[key].header.filter(cItem => cItem.prop === keys).length > 0) {
                return
              } else {
                state.resourceData[key].header.push({ prop: keys, label: keys, align: 'left', type: 'slotTable' })
              }
            }
          })
        }
        for (let key in state.resourcesTotal) {
          const initialValue = 0
          state.resourcesTotal[key] = state.resourcesTotal[key].flat(Infinity).reduce((acc, cur) => acc + cur, initialValue)
        }
      }
    }

    // 跳转操作 
    const operate = (type: 'quantity' | 'useTime' | 'expire', row?: { tab: number, metrics: string }) => {
      const newUrl = `/third-party/monitor/prometheus/graph?g0.expr=${row.metrics}&g0.tab=${row.metrics}&g0.stacked=0&g0.show_exemplars=0&g0.range_input=3h`
      window.open(newUrl, '_blank')
    }
    const onSelectCloudDetail = (resourceType: string, subType: string, type: string) => {
      state.resourceOperate = {
        resourceType,
        subType,
        type,
      }
      sessionStorage.setItem('sourceType', type)
      if (type === 'input') {
        sessionStorage.setItem('globalSearch', state.grepdata._search || '')
      }
      window.location.hash = `/device/data/${treeId.value}/${state.timeSelect}/${resourceType}/${subType}`
      // /:treeId/:timemachine/:type/:subtype

    }
    const success = () => { // 操作成功的回调
      getMachLineTimeData()
    }

    onMounted(() => {
      getMachLineTimeData()
      getData(state.timeSelect === 'current'? 'curr': state.timeSelect)
    })

    watch(() => treeId.value, (acc, cur) => {
      if (acc !== cur) {
        getMachLineTimeData()
        getData(state.timeSelect === 'current'? 'curr': state.timeSelect)
      }
    })

    return {
      Search,
      ...toRefs(state),
      treeId,
      treeData,
      CMDB_RESOURCE_MAP,
      OPEN_C3_CLOUD_VENDOR,
      success,
      operate,
      onTimeChange,
      onSelectCloudDetail,
      getMachLineTimeData,
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.layout-content {
  &-operation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    margin: 10px auto;
    height: 40px;

    &-input {
      height: 100%;
    }

    &-button {
      height: 100%;
      margin-left: 20px;
    }
  }

  &-table {
    margin: 20px auto;
  }
}

.layout-content-card {
  &-operate {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &-button {
      margin-left: 10px;
    }
  }
}

.card-box-items {
  margin: 20px auto 40px;
}

.cloud-vendor-content {
  display: flex;
  justify-content: left;
  align-items: center;
  vertical-align: middle;
}
.resource-button {
  margin-top: -5px;
}

</style>