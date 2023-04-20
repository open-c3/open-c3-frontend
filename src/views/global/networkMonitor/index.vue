
<template>
  <div :loading="loading" class="body-layout1">
    <p>{{ $t('proxyNetwork') }}</p>
    <search-from :params="proxyConfig.params" :config="proxyConfig.searchConfig" @reset="reset('proxyConfig')" @query="getList('proxyConfig')"/>
    <Table :thead="proxyConfig.thead" :data="proxyConfig.list" :tableLoading="proxyConfig.loading" :page="proxyConfig.page" :pageSize="proxyConfig.pageSize" :total="proxyConfig.total" :pageChange="val => pageChange(val, 'proxyConfig')" :pageSizeChange="val => pageSizeChange(val, 'proxyConfig')"  row-id="id" class="mt20"/>
    <p>{{ $t('flowNetwork') }}</p>
    <search-from :params="lineConfig.params" :config="lineConfig.searchConfig" @reset="reset('lineConfig')" @query="getList('lineConfig')"/>
    <Table :thead="lineConfig.thead" :data="lineConfig.list" :tableLoading="lineConfig.loading" :page="lineConfig.page" :pageSize="lineConfig.pageSize" :total="lineConfig.total" :pageChange="val => pageChange(val, 'lineConfig')" :pageSizeChange="val => pageSizeChange(val, 'lineConfig')"  row-id="id" class="mt20"/>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import { PROXY_SEARCH_CONFIG, LINE_SEARCH_CONFIG, PROXY_THEAD_CONFIG, LINE_THEAD_CONFIG } from '@/views/global/networkMonitor/config'
import { getNetworkMonitor, getCINetworkMonitor } from '@/api/global/networkMonitor'
import { filterAry } from '@/utils/index'
export default {
  components: { searchFrom, Table },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      proxyConfig: {
        loading: false,
        searchConfig: PROXY_SEARCH_CONFIG,
        params: {
          id: '',
          regionid: '',
          projectid: '',
          name: '',
          node: '',
          check_time: '',
          tcp_speed: '',
          tcp_error: '',
          udp_speed: '',
          udp_error: '',
          subnet: ''
        },
        thead: PROXY_THEAD_CONFIG,
        total: 0,
        list: [],
        allList: [],
        filterList: [],
        page: 1,
        pageSize: 10
      },
      lineConfig: {
        loading: false,
        searchConfig: LINE_SEARCH_CONFIG,
        params: {
          flowid: '',
          treeid: '',
          name: '',
          check_time: '',
          test_nodes: '',
          test_error: '',
          online_nodes: '',
          online_error: ''
        },
        thead: LINE_THEAD_CONFIG,
        total: 0,
        list: [],
        allList: [],
        filterList: [],
        page: 1,
        pageSize: 10
      },
      loading: false
    })
    const pageChange = (page: number, type: string) => {
      state[type].page = page
      state[type].list = state[type].filterList.slice((state[type].page - 1) * state[type].pageSize, state[type].page * state[type].pageSize)
    }
    const pageSizeChange = (pageSize: number, type: string) => {
      state[type].pageSize = pageSize
      pageChange(1, type)
    }
    const getFilterList = (type: string) => {
      state[type].filterList = filterAry(state[type].allList, state[type].params)
      state[type].total = state[type].filterList.length
      pageChange(1, type)
    }
    // 获取 代理网络 流水线网络
    const getList = (type: string) => {
      const apiFun = {
        proxyConfig: getNetworkMonitor,
        lineConfig : getCINetworkMonitor
      }
      state[type].loading = true
      apiFun[type]().then((res: any) => {
        state[type].allList = res
        getFilterList(type)
        state[type].loading = false
      })
    }
    const reset = (type: string) => { // 重置
      const params = {
        proxyConfig: {
          id: '',
          regionid: '',
          projectid: '',
          name: '',
          node: '',
          check_time: '',
          tcp_speed: '',
          tcp_error: '',
          udp_speed: '',
          udp_error: '',
          subnet: ''
        },
        lineConfig: {
          flowid: '',
          treeid: '',
          name: '',
          check_time: '',
          test_nodes: '',
          test_error: '',
          online_nodes: '',
          online_error: ''
        }
      }
      state[type].params = params[type]
      getList(type)
    }
    onMounted(() => {
      getList('proxyConfig')
      getList('lineConfig')
    })
    return {
      ...toRefs(state),
      getList,
      reset,
      pageChange,
      pageSizeChange
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
