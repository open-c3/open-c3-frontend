
<template>
  <div class="body-layout1">
    <saas-tabs :label="$t('systemMonitoringInfo')" class="mt-20"/>
    <search-from :params="params" :config="config" @reset="reset" @query="getList"/>
    <el-divider class="costv-divider mt16 mb16"/>
    <p class="tr">
      <!-- <span>{{ $t('systemMonitoringInfo') }}</span> -->
      <el-button @click="flag = true" type="primary">{{ $t('addUserAddress') }}</el-button>
    </p>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange"  row-id="id" class="mt20">
      <template #operate="{ row }">
        <el-button @click="deleteFun(row.id.toString())" link type="primary">{{ $t('delete') }}</el-button>
      </template>
    </Table>
    <add-addr v-if="flag" v-model="flag" @close="flag = false" @success="getList"/>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import addAddr from '@/views/global/userAddr/components/add.vue'
import { THEAD_CONFIG, SEARCH_CONFIG  } from '@/views/global/userAddr/config'
import { getUserAddr, deleteUserAddr } from '@/api/global/userAddr'
import { ElMessageBox } from 'element-plus'
export default {
  components: { searchFrom, Table, addAddr },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        id: '',
        user: '',
        email: '',
        phone: '',
        voicemail: '',
        edit_user: '',
        edit_time: ''
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
      loading: false,
      flag: false
    })
    const getFilterList = () => {
      state.tableConfig.filterList = state.tableConfig.allList.filter(item => item.id.toString().includes(state.params.id) && item.user.includes(state.params.user) && item.email.includes(state.params.email) && item.phone.includes(state.params.phone) && item.voicemail.includes(state.params.voicemail) && item.edit_user.includes(state.params.edit_user) && item.edit_time.includes(state.params.edit_time))
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
      getUserAddr().then((res: any) => {
        state.tableConfig.allList = res.reverse()
        getFilterList()
        state.loading = false
      })
      state.flag = false
    }
    const reset = () => { // 重置
      state.params = {
        id: '',
        user: '',
        email: '',
        phone: '',
        voicemail: '',
        edit_user: '',
        edit_time: ''
      }
      getList()
    }
    const deleteFun = (id: string) => {
      ElMessageBox.confirm(proxy.$t('deleteUserAddr'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        deleteUserAddr(id).then(res => {
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
      deleteFun
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
