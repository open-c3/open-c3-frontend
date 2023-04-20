<template>
  <div class="body-layout1">
    <div class="layout-title">
      <div class="w30 h30 icon-box df hand mr16 layout-title-left" @click="backList">
        <svg-icon icon-class="reportLeft" class="layout-title-left-svg" />
      </div>
      <div class="layout-title-select">
        <el-select filterable v-model="timeSelect" :placeholder="`${$t('configFormSelect')}${$t('time')}`"
          @change="onTimeChange">
          <el-option v-for="item in timeOption" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <div class="ml10">
          / CMDB {{ treeData?.parent ? `/ ${treeData?.parent}` : '' }} / {{ resourceType }} / {{ subType }}
        </div>
      </div>
    </div>
    <el-divider class="costv-divider mt16 mb16" />
    <div class="layout-content" v-loading="loading">
      <div class="layout-content-operation mt30 mb30">
        <div class="layout-content-operation-input">
          <el-input @keyup.enter.native="onSearch" v-model="grepdata._search_" placeholder="Enter search terms..."
            clearable />
        </div>
        <search-from class="layout-content-operation-search" :params="searchParams.params" :config="searchParams.config"
          @reset="reset" @query="onSearch" @showmoreFilters="showmoreFilters">
          <template v-for="(item) in searchParams.config.formConfig" :key="item.prop">
            <el-select class="ml10 mr10" v-model="grepdata[item.prop]"
              :placeholder="`${$t('configFormSelect')}${item.labels}`">
              <el-option v-for="cItem in item.data" :key="cItem.name" :label="`${cItem.name}(${cItem.count})`"
                :value="cItem.name" />
            </el-select>
          </template>
        </search-from>
      </div>
      <el-divider class="costv-divider mt16 mb16" />
      <div class="table-content">
        <Table :thead="thead" :data="params.list" :highlight-current-row="false" :page="params.page"
          :pageSize="params.pageSize" :tableLoading="params.loading" :total="params.total"
          :pageChange="page => pageChange(page)" :pageSizeChange="size => pageSizeChange(size)">
          <template #order="{ index }">
            {{ (params.page - 1) * params.pageSize + index + 1 }}
          </template>
          <template #subtype="{ row }">
            <el-button v-if="row.subtype && row.subtype !== ''" type="primary" link @click="handleDetail('detail', row)">
              {{ row.subtype }}
            </el-button>
            <div v-else> - </div>
          </template>
          <template #baseinfo="{ row }">
            {{ row.baseinfo || '-' }}
          </template>
          <template #system="{ row }">
            <div :class="row.match === '2' ? 'is-success' : ''"> {{ row.system || '-' }}</div>
          </template>
          <template #contact="{ row }">
            <el-tooltip v-if="row.contact" class="box-item" effect="dark" :content="row.contact" placement="top">
              <div style="cursor: pointer;">{{ row.contact || '-' }}</div>
            </el-tooltip>
            <div v-else> - </div>
          </template>
          <template #control="{ row }">
            <div v-if="row.control">
              <el-button v-for="item in row.control" :key="item.name" type="primary" link
                @click="operate(row.uuid, row.type, row.subtype, item)">{{ item.name }}</el-button>
            </div>
          </template>
        </Table>
      </div>
    </div>
  </div>
  <component :is="componentId" v-if="componentFlag" v-model="componentFlag" :config="componentConfig" :editItem="editItem"
    :treeId="treeId.value" :timemachine="timeSelect" @close="onCompClose" @success="onCompSuccess" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { useRoute } from 'vue-router'
import store from '@/store'
import router from '@/router'

import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import { Search } from '@element-plus/icons-vue'
import ResourceTypeModal from './operate/ResourceTypeModal.vue'
import {
  CMDB_DATA_SEARCH_PARAMS,
  CMDB_DATA_TABLE_THEAD,
  RESOURCE_TYPE_MODEL_CONFIG,
} from './config'
import { deepClone } from '@/utils/index'

import {
  getMachineList,
  getCMDBDataDetail,
  getCMDBDataBlank,
} from '@/api/device/index'
import {
  CMDBResourceDataInfo,
  CMDBResourceDataBlankInfo,
} from '@/api/interface/device'

interface TableOperateItem {
  name: string;
  type: string;
  url: string
}
interface RowDataInfo {
  baseinfo: string;
  contact: string;
  subtype: string;
  system: string;
  type: string;
  uuid: string;
}

interface StateInfo {
  timeSelect: string | string[];
  resourceType: string | number | string[];
  subType: string | number | string[];
  filterStatus: boolean;
  loading: boolean;
  TableList: Array<any>;
  thead: any;
  componentId: string;
  componentFlag: boolean;
  componentConfig: any;
  editItem: any;
  params: {
    loading: boolean;
    list: Array<any>;
    total: number;
    page: number;
    pageSize: number;
  };
  timeOption: { value: string | number, label: string | number, name?: string | number, id?: string | number }[];
  grepdata: { _search_: string };
  searchParams: {
    config?: any,
    params: any,
  };
  filterData: {
    debug: Array<any>
    filter: { alias: string | number, name: string | number }[];
    filterdata: Array<any>,
    data: RowDataInfo[];
  };
}

export default defineComponent({
  components: {
    Table,
    searchFrom,
    ResourceTypeModal,
  },

  setup() {
    const route = useRoute()
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const state: StateInfo = reactive({
      timeSelect: 'current',
      timeOption: [],
      loading: false,
      TableList: [],
      thead: deepClone(CMDB_DATA_TABLE_THEAD),
      componentId: 'ResourceTypeModal',
      componentFlag: false,
      componentConfig: {},
      editItem: {},
      params: {
        list: [],
        total: 0,
        page: 1,
        pageSize: 10,
        loading: false,
      },
      grepdata: { _search_: '' },
      searchParams: {
        config: CMDB_DATA_SEARCH_PARAMS,
        params: {},
      },
      resourceType: '',
      subType: '',
      filterStatus: false,
      filterData: {
        filter: [],
        filterdata: [],
        data: [],
        debug: []
      },
    })

    const treeId = computed(() => {
      return store.getters.treeId
    })

    const treeData = computed(() => {
      return store.getters.treeData
    })

    // 获取CMDB时间下拉数据
    const getMachLineTimeData = async (time?: string | string[]) => {
      const dataRet = await getMachineList({})
      if (dataRet) {
        state.timeOption.push({ value: 'current', label: 'current', name: 'current', id: 'current', })
        state.timeOption = dataRet.map(item => {
          return {
            value: item,
            label: item
          }
        })
      }
    }

    // 获取CMDB资源详细信息
    const getDetailData = async (time?: string | string[]) => {
      const params: CMDBResourceDataInfo = {
        treeId: treeId.value,
        type: String(route.params.type),
        subtype: String(route.params.subtype),
        data: {
          grepdata: state.grepdata,
          timemachine: String(time)
        }
      }
      state.params.loading = true
      if (state.grepdata._search_ && state.grepdata._search_ !== '') {
        params.data.grepdata._search_ = state.grepdata._search_
      }
      if (state.grepdata._search_ === null) {
        delete params.data.grepdata._search_
      }
      const dataRet = await getCMDBDataDetail(params).catch(err => state.params.loading = false)
      if (dataRet) {
        state.params.loading = false
        state.filterData = JSON.parse(JSON.stringify(dataRet))
        grepFilter()
        state.TableList = dataRet.data
        state.params.list = dataRet.data
        state.params.total = dataRet.data.length
      }
      pageChange(1)
      onerationHidden()
    }

    const onerationHidden = () => {
      const newHidden = state.TableList.map(item => item.control ? item.control : '').filter(item => item !== '')
      if (newHidden.length === 0) {
        state.thead.filter(item => item.prop === 'control')[0].hidden = true
      }
    }

    // 重置搜索条件
    const reset = () => {
      for (let key in state.grepdata) {
        state.grepdata[key] = ''
      }
    }

    // 按搜索条件查询 
    const onSearch = () => {
      getDetailData(state.timeSelect === 'current'? 'curr' : state.timeSelect)
    }

    // 资源操作
    const operate = async (uuid: string, type: string | string[], subtype: string | string[], items: TableOperateItem) => {
      if (items['type'] === 'blank') {
        const params: CMDBResourceDataBlankInfo = {
          subtype,
          type,
          uuid,
          timemachine: state.timeSelect === 'current'? 'curr': state.timeSelect,
          data: { exturl: items['url'] }
        }
        const dataRet = await getCMDBDataBlank(params)
        if (dataRet) {
        }
      }
    }

    // 过滤器显隐
    const showmoreFilters = () => {
      state.filterStatus = !state.filterStatus
      if (state.filterStatus) {
        // true 表示已开启 需要关闭 
        state.searchParams.config.formBtnConfig.filter(item => item.emitName === 'showmoreFilters')[0].name = proxy.$t('hideFilter')
      } else {
        state.searchParams.config.formBtnConfig.filter(item => item.emitName === 'showmoreFilters')[0].name = proxy.$t('showmoreFilters')
      }
      grepFilter()
    }

    // 控制过滤器数量
    const grepFilter = () => {
      const formConfig = []
      console.log(state.filterData)
      state.filterData.filter.forEach((item, index) => {
        formConfig.push({
          labels: item.alias,
          prop: item.name,
          type: 'slot',
          data: state.filterData.filterdata[item.name],
          placeholder: `${proxy.$t('configFormSelect')}${item.alias}`
        })
      })
      const hideFilter = JSON.parse(JSON.stringify(formConfig)).filter((item, index) => index < 6)
      if (state.filterStatus) {
        state.searchParams.config.formConfig = [...formConfig]
      } else {
        state.searchParams.config.formConfig = [...hideFilter]
      }
    }

    // 选择时间current
    const onTimeChange = (value: string) => {
      getMachLineTimeData(value)
    }

    // 分页
    const pageChange = (page: number) => {
      state.params.page = page
      const list = JSON.parse(JSON.stringify(state.TableList))
      state.params.list = list.slice((state.params.page - 1) * state.params.pageSize, state.params.page * state.params.pageSize)
    }

    const pageSizeChange = (size: number) => {
      state.params.pageSize = size
      pageChange(1)
    }

    const backList = () => {
      if (route.query.ids) router.push({ query: {} })
      router.push('/device/index')
    }

    const success = () => { // 操作成功的回调
      getMachLineTimeData()
    }

    const onInitData = () => {
      state.resourceType = route.params.type
      state.subType = route.params.subtype
      state.timeSelect = route.params.timemachine
      state.grepdata._search_ = sessionStorage.getItem('globalSearch')
      sessionStorage.removeItem('globalSearch')
    }

    //查看资源详情
    const handleDetail = async (type: string, row: RowDataInfo) => {
      state.componentFlag = true
      state.componentConfig = deepClone(RESOURCE_TYPE_MODEL_CONFIG)
      state.editItem = {
        title: `${state.timeSelect} / ${route.params.type} / ${route.params.subtype} / ${row.uuid}`,
        row: row,
        type: route.params.type,
        subtype: route.params.subtype,
        timemachine: route.params.timemachine
      }
    }

    const onCompClose = () => {
      state.componentFlag = false
    }

    const onCompSuccess = () => {
      onCompClose()
    }

    onMounted(() => {
      onInitData()
      getDetailData(state.timeSelect === 'current'? 'curr' : state.timeSelect)
      getMachLineTimeData(state.timeSelect)
    })

    watch(() => treeId.value, (acc, cur) => {
      if (acc !== cur) {
        onInitData()
        getDetailData(state.timeSelect === 'current'? 'curr': state.timeSelect)
        getMachLineTimeData(state.timeSelect === 'current'? 'curr': state.timeSelect)
        window.location.hash = `/device/data/${treeId.value}/${state.timeSelect}/${route.params.type}/${route.params.subtype}`
      }
    })

    return {
      Search,
      ...toRefs(state),
      treeId,
      treeData,
      CMDB_DATA_TABLE_THEAD,
      RESOURCE_TYPE_MODEL_CONFIG,
      reset,
      operate,
      success,
      backList,
      onSearch,
      grepFilter,
      pageChange,
      onCompClose,
      onTimeChange,
      handleDetail,
      pageSizeChange,
      onCompSuccess,
      showmoreFilters,
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

  &-left {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-select {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}

.layout-content {
  &-operation {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    &-search {
      display: flex;
      justify-content: flex-start;
      margin: 20px 0;
    }

    &-input {
      width: 80%;
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
  justify-content: center;
  align-items: center;
}

.is-success {
  color: var(--el-color-success)
}
</style>