
<template>
  <div class="body-layout1">
    <search-from :params="params" :config="config" @reset="reset" @query="getList"/>
    <el-divider class="costv-divider mt16 mb16"/>
    <p class="df ai_c jc_sb">
      <span>{{ $t('cloudMon') }}</span>
      <el-button @click="flag = true" type="primary">{{ $t('add') }}</el-button>
    </p>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange"  row-id="id" class="mt20">
      <template #operate="{ row }">
        <el-button @click="info = row; flag = true;" link type="primary">{{ $t('edit') }}</el-button>
        <el-button @click="deleteFun(row.id)" link type="primary">{{ $t('delete') }}</el-button>
      </template>
    </Table>
    <add-mon v-if="flag" v-model="flag" :info="info" @close="info = null; flag = false" @success="getList"/>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import addMon from '@/views/global/cloudMon/components/add.vue'
import { THEAD_CONFIG, SEARCH_CONFIG  } from '@/views/global/cloudMon/config'
import { getCloudMon, deleteCloudMon } from '@/api/global/cloudMon'
import { ElMessageBox } from 'element-plus'
export default {
  components: { searchFrom, Table, addMon },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        id: '',
        name: '',
        type: '',
        describe: '',
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
      flag: false,
      info: null
    })
    const getFilterList = () => {
      state.tableConfig.filterList = state.tableConfig.allList.filter(item => item.id.toString().includes(state.params.id) && item.name.includes(state.params.name) && item.type.includes(state.params.type) && item.describe.includes(state.params.describe) && item.edit_time.includes(state.params.edit_time))
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
      getCloudMon().then((res: any) => {
        state.tableConfig.allList = res.reverse()
        getFilterList()
        state.loading = false
      })
      state.flag = false
      state.info = null
    }
    const reset = () => { // 重置
      state.params = {
        id: '',
        name: '',
        type: '',
        describe: '',
        edit_time: ''
      }
      getList()
    }
    const deleteFun = (id: string | number) => {
      ElMessageBox.confirm(proxy.$t('deleteMsg'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        deleteCloudMon(id).then(res => {
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
