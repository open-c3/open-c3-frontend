
<template>
  <div class="body-layout1">
    <search-from :params="params" :config="config" @reset="reset" @query="getList"/>
    <el-divider class="costv-divider mt16 mb16"/>
    <div class="tr">
      <el-input v-model.trim="user" :placeholder="$t('accountLoginName')" class="w400">
        <template #append>
          <el-button :disabled="user === ''" :loading="loading" @click="create" type="primary" icon="plus">{{ $t('addUser') }}</el-button>
        </template>
      </el-input>
    </div>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange" class="mt20">
      <template #pass="{ row }">
        <span v-if="row.pass === 2" class="c-error">{{ $t('yes') }}({{ $t('danger') }})</span>
        <span v-if="row.pass === 1" class="c-success">{{ $t('no') }}</span>
        <span v-if="row.pass === 0">{{ $t('nonLocalUsers') }}</span>
      </template>
      <template #operate="{ row }">
        <el-button @click="deleteFun(row.name)" link type="primary">{{ $t('delete') }}</el-button>
        <el-button @click="resetPassword(row.name)" link type="primary">{{ $t('resetPassword') }}</el-button>
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import { getUserList, connectorAddUser, deleteConnectorUser } from '@/api/connector/userManage'
import { SEARCH_CONFIG, THEAD_CONFIG } from './config'
import { ElMessageBox } from 'element-plus'
export default {
  components: { searchFrom, Table },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        name: ''
      },
      config: SEARCH_CONFIG,
      tableConfig: {
        loading: false,
        thead: THEAD_CONFIG,
        total: 0,
        list: [],
        filterList: [],
        allList: [],
        page: 1,
        pageSize: 10
      },
      user: '',
      loading: false
    })
    const pageChange = (page: number) => {
      state.tableConfig.page = page
      state.tableConfig.list = state.tableConfig.filterList.slice((state.tableConfig.page - 1) * state.tableConfig.pageSize, state.tableConfig.page * state.tableConfig.pageSize)
    }
    const pageSizeChange = (pageSize: number) => {
      state.tableConfig.pageSize = pageSize
      pageChange(1)
    }
    const getList = () => {
      getUserList().then((res: any) => {
        state.tableConfig.allList = res.reverse()
        state.tableConfig.filterList = state.tableConfig.allList.filter(item => item.name.includes(state.params.name))
        state.tableConfig.total = state.tableConfig.filterList.length
        pageChange(1)
      })
    }
    const reset = () => { // 重置
      state.params = {
        name: ''
      }
      getList()
    }
    const create = () => {
      state.loading = true
      connectorAddUser({user: state.user}).then(res => {
        proxy.$notification('success')
        getList()
        state.user = ''
      }).finally(() => {
        state.loading = false
      })
    }
    // 重置密码
    const resetPassword = (user: string) => {
      state.loading = true
      connectorAddUser({user}).then(res => {
        proxy.$notification('resetPasswordMsg')
        getList()
      }).finally(() => {
        state.loading = false
      })
    }
    // 删除用户
    const deleteFun = (name: string) => {
      ElMessageBox.confirm(proxy.$t('deleteConnectorUserMsg'), proxy.$t('deleteConnectorUser'), {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        deleteConnectorUser(name).then(res => {
          proxy.$notification('success')
          getList()
        })
      })
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
      create,
      deleteFun,
      resetPassword
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
