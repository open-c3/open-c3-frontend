
<template>
  <div class="body-layout1">
    <saas-tabs :label="$t('ackManage')" class="mt-20"/>
    <search-from :params="params" :config="config" @reset="reset" @query="getList"/>
    <!-- <el-divider class="costv-divider mt16 mb16"/> -->
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
import addAddr from '@/views/global/userAddr/components/add.vue'
import { THEAD_CONFIG, SEARCH_CONFIG } from '@/views/global/allACK/config'
import { ElMessageBox } from 'element-plus'
import { getAllACK, updateAllACK } from '@/api/global/allACK'
export default {
  components: { searchFrom, Table, addAddr },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        edit_time: '', // 创建时间
        expirem: '', // 过期时间
        to: '', // 作用对象
        mt: '', // 类型
        edit_user: '', // 编辑人
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
      state.loading = true
      getAllACK().then((res: any) => {
        state.tableConfig.allList = res.reverse()
        getFilterList()
        state.loading = false
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
        updateAllACK({uuid, type, mt}).then(res => {
          proxy.$notification('success')
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
