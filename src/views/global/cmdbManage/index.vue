
<template>
  <div class="body-layout1">
    <search-from :params="params" :config="config" @reset="reset" @query="getList"/>
    <el-divider class="costv-divider mt16 mb16"/>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange"  row-id="id" class="mt20">
      <template #operate="{row}">
        <el-button @click="info = row; editFlag = true;" link type="primary">{{ $t('edit') }}</el-button>
        <el-button @click="deleteFun(row.name)" link type="primary">{{ $t('delete') }}</el-button>
      </template>
    </Table>
    <edit-cmdb v-if="editFlag" v-model="editFlag" :info="info" @close="editFlag = false" @success="editFlag = false"/>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import addUser from '@/views/global/private/components/addUser.vue'
import editCmdb from '@/views/global/cmdbManage/components/edit.vue'
import { THEAD_CONFIG, SEARCH_CONFIG } from '@/views/global/cmdbManage/config'
import { ElMessageBox } from 'element-plus'
import { getCMDBManage, deleteCMDBManage } from '@/api/global/cmdbManage'
export default {
  components: { searchFrom, Table, addUser, editCmdb },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        type: '',
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
      loading: false,
      info: null,
      editFlag: false
    })
    const pageChange = (page: number) => {
      state.tableConfig.page = page
      state.tableConfig.list = state.tableConfig.filterList.slice((state.tableConfig.page - 1) * state.tableConfig.pageSize, state.tableConfig.page * state.tableConfig.pageSize)
    }
    const getFilterList = () => {
      state.tableConfig.filterList = state.tableConfig.allList.filter(item => item.type.includes(state.params.type) && item.name.includes(state.params.name))
      state.tableConfig.total = state.tableConfig.filterList.length
      pageChange(1)
    }
    const pageSizeChange = (pageSize: number) => {
      state.tableConfig.pageSize = pageSize
      pageChange(1)
    }
    const getList = () => {
      state.loading = true
      getCMDBManage().then((res: any) => {
        state.tableConfig.allList = res.reverse()
        getFilterList()
        state.loading = false
      })
    }
    const reset = () => { // 重置
      state.params = {
        type: '',
        name: ''
      }
      getList()
    }
    // 删除 
    const deleteFun = (name: string) => {
      ElMessageBox.confirm(proxy.$t('deleteMsg'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel')
      }).then(() => {
        state.tableConfig.loading = true
        deleteCMDBManage({name}).then(res => {
          proxy.$notification('success')
          getList()
        }).finally(() => {
          state.tableConfig.loading = false
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
      deleteFun
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
