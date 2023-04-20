
<template>
  <div class="body-layout1">
    <saas-tabs :label="$t('myAck')" class="mt-20"/>
    <search-from :params="params" :config="config" @reset="reset" @query="getList"/>
    <el-divider class="costv-divider mt16 mb16"/>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange"  row-id="id" class="mt20">
      <template #expirem="{ row }">
        {{ row.expirem }} {{ $t('minute') }} 
      </template>
      <template #operate="{ row }">
        <el-button @click="revokeFun(row.ackuuid, row.type, row.mt)" link type="primary">{{ $t('revoke') }}</el-button>
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import { THEAD_CONFIG, SEARCH_CONFIG } from '@/views/global/allACK/config'
import { ElMessageBox } from 'element-plus'
import { getMyACK, updateMyACK } from '@/api/userCenter/myACK'
export default {
  components: { searchFrom, Table },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        edit_time: '',
        expirem: '',
        to: '',
        mt: '',
        edit_user: '',
        labels: ''
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
      state.tableConfig.filterList = state.tableConfig.allList.filter(item => item.edit_time.includes(state.params.edit_time) && item.expirem.toString().includes(state.params.expirem) && item.to.includes(state.params.to) && item.mt.includes(state.params.mt) && item.edit_user.includes(state.params.edit_user) && item.edit_user.includes(state.params.edit_user) && item.labels.includes(state.params.labels))
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
    const getList = () => {
      state.tableConfig.loading = true
      getMyACK().then((res: any) => {
        state.tableConfig.allList = res.reverse()
        getFilterList()
        state.tableConfig.loading = false
      })
    }
    const reset = () => { // 重置
      state.params = {
        edit_time: '',
        expirem: '',
        to: '',
        mt: '',
        edit_user: '',
        labels: ''
      }
      getList()
    }
    const revokeFun = (uuid, type, mt) => {
      ElMessageBox.confirm(proxy.$t('revokeConfirm'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        state.loading = true
        updateMyACK({uuid, type, mt}).then(res => {
          proxy.$notification('success')
          state.loading = false
          getList()
        })
      }).catch(() => {})
    }
    onMounted(() => {
      getList()
    })
    return {
      ...toRefs(state),
      getList,
      reset,
      pageChange,
      pageSizeChange,
      revokeFun
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
