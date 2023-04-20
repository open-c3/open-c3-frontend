
<template>
  <div class="body-layout1">
    <saas-tabs :label="$t('auditLog')" class="mt-20"/>
    <search-from :params="params" :config="config" @reset="reset" @query="getList"/>
    <el-divider class="costv-divider mt16 mb16"/>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange"  row-id="id" class="mt20"/>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import { THEAD_CONFIG, SEARCH_CONFIG } from '@/views/global/auditLog/config'
import { getAuditLog } from '@/api/global/auditLog'
import { getNotEmptyObj } from '@/utils/index'
export default {
  components: { searchFrom, Table },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        time: '',
        user: '',
        title: '',
        content: ''
      },
      config: SEARCH_CONFIG,
      tableConfig: {
        loading: false,
        thead: THEAD_CONFIG,
        total: 0,
        list: [],
        allList: [],
        page: 1,
        pageSize: 10
      },
      loading: false
    })
    const pageChange = (page: number) => {
      state.tableConfig.page = page
      state.tableConfig.list = state.tableConfig.allList.slice((state.tableConfig.page - 1) * state.tableConfig.pageSize, state.tableConfig.page * state.tableConfig.pageSize)
    }
    const pageSizeChange = (pageSize: number) => {
      state.tableConfig.pageSize = pageSize
      pageChange(1)
    }
    const getList = () => {
      state.loading = true
      getAuditLog(getNotEmptyObj(state.params)).then((res: any) => {
        state.tableConfig.allList = res.reverse()
        state.tableConfig.total = state.tableConfig.allList.length
        pageChange(1)
        state.loading = false
      })
    }
    const reset = () => { // 重置
      state.params = {
        time: '',
        user: '',
        title: '',
        content: ''
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
