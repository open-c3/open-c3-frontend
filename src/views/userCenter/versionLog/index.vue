
<template>
  <div class="body-layout1">
    <saas-tabs :label="$t('systemUpdate')" class="mt-20"/>
    <p class="c2">
      <span>{{ $t('version') }}: {{ name }} </span>
      <span class="ml10">{{ $t('update') }}: {{ time }}</span>
    </p>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange"  row-id="id" class="mt20"/>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import Table from '@/components/table/index.vue'
import { THEAD_CONFIG } from '@/views/userCenter/versionLog/config'
import { getVersionLog, getVersionName } from '@/api/userCenter/versionLog'

export default {
  components: { Table },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      name: '',
      time: '',
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
      loading: false,
      flag: false
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
      state.tableConfig.loading = true
      state.loading = true
      getVersionLog().then((res: any) => {
        state.tableConfig.allList = res
        state.tableConfig.total = res.length
        pageChange(1)
        state.tableConfig.loading = false
      })
      getVersionName().then((res: any) => {
        state.name = res.name
        state.time = res.time
        state.loading = false
      })
    }
    
    onMounted(() => {
      getList()
    })
    return {
      ...toRefs(state),
      getList,
      pageChange,
      pageSizeChange
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
