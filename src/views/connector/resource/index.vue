
<template>
  <div class="body-layout1">
    <search-from :params="params" :config="config" @reset="reset" @query="getList"/>
    <el-divider class="costv-divider mt16 mb16"/>
    <div class="tr">
      <el-input v-model.trim="name" :placeholder="$t('nodeIp')" class="w400">
        <template #append>
          <el-button :disabled="name === ''" :loading="loading" @click="create" type="primary" icon="plus">{{ $t('addHost') }}</el-button>
        </template>
      </el-input>
    </div>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange" class="mt20">
      <template #operate="{ row }">
        <el-button @click="deleteFun(row.id)" link type="primary">{{ $t('delete') }}</el-button>
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, watch } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import { getConnectorResource, addConnectorResource, deleteConnectorResource } from '@/api/connector/resource'
import { SEARCH_CONFIG, THEAD_CONFIG } from './config'
import { ElMessageBox } from 'element-plus'
import store from '@/store'
export default {
  components: { searchFrom, Table },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        name: '',
        inip: '',
        exip: '',
        create_user: '',
        create_time: ''
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
      name: '',
      loading: false
    })
    const getFilterList = () => {
      state.tableConfig.filterList = state.tableConfig.allList.filter(item => item.name.includes(state.params.name) && item.inip.includes(state.params.inip) && item.exip.includes(state.params.exip) && item.create_user.includes(state.params.create_user) && item.create_time.includes(state.params.create_time))
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
      getConnectorResource(store.getters.treeId).then((res: any) => {
        state.tableConfig.allList = res.reverse()        
        getFilterList()
      })
    }
    const reset = () => { // 重置
      state.params = {
        name: '',
        inip: '',
        exip: '',
        create_user: '',
        create_time: ''
      }
      getList()
    }
    const create = () => {
      state.loading = true
      addConnectorResource(store.getters.treeId, {name: state.name}).then(res => {
        proxy.$notification('success')
        getList()
        state.name = ''
      }).finally(() => {
        state.loading = false
      })
    }
    // 删除机器
    const deleteFun = (id: number) => {
      ElMessageBox.confirm(proxy.$t('deleteResource'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        deleteConnectorResource(store.getters.treeId, id).then(res => {
          proxy.$notification('success')
          getList()
        })
      })
    }
    watch(() => store.getters.treeId, () => {
      getList()
    }, {
      immediate: true,
      deep: true
    })
    return {
      ...toRefs(state),
      getList,
      reset,
      pageChange,
      pageSizeChange,
      create,
      deleteFun
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
