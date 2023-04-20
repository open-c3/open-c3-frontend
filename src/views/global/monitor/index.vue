
<template>
  <div class="body-layout1">
    <saas-tabs :label="$t('systemMonitoringInfo')" class="mt-20"/>
    <search-from :params="params" :config="config" @reset="reset" @query="getList"/>
    <el-divider class="costv-divider mt16 mb16"/>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange"  row-id="id" class="mt20">
      <template #stat="{ row }">
        <span :class="row.stat === 'ok' || row.stat === 'healthy' ? 'c-success' : 'c-error'">{{ row.stat }}</span>
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import { getSystemMonitor } from '@/api/global/monitor'
import { THEAD_CONFIG, SEARCH_CONFIG  } from '@/views/global/monitor/config'
export default {
  components: { searchFrom, Table },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        time: '',
        host: '', // 监控对象
        stat: '',
        type: '', // 监控指标
        val: ''
      },
      config: SEARCH_CONFIG,
      tableConfig: {
        loading: false,
        thead: THEAD_CONFIG,
        total: 0,
        list: [],
        allList: [],
        filterList: [],
        page: 1,
        pageSize: 10
      },
      loading: false
    })
    const getFilterList = () => {
      state.tableConfig.filterList = state.tableConfig.allList.filter(item => item.time.includes(state.params.time) && item.host.includes(state.params.host) && item.stat.includes(state.params.stat) && item.type.includes(state.params.type) && item.val.toString().includes(state.params.val))
      state.tableConfig.total = state.tableConfig.filterList.length
      pageChange(1)
    }
    const pageChange = (page: number) => {
      state.tableConfig.page = page
      state.tableConfig.list = state.tableConfig.filterList.slice((state.tableConfig.page - 1) * state.tableConfig.pageSize, state.tableConfig.page * state.tableConfig.pageSize)
    }
    const pageSizeChange = (pageSize: number) => {
      state.tableConfig.pageSize = pageSize
      pageChange(1)
    }
    // 获取所有列表数据
    const getList = () => {
      getSystemMonitor().then((res: any) => {
        state.tableConfig.allList = res.reverse()
        getFilterList()
      })
    }
    const reset = () => { // 重置
      state.params = {
        time: '',
        host: '',
        stat: '',
        type: '',
        val: ''
      }
      getList()
    }
    onMounted(() => {
      getList()
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
