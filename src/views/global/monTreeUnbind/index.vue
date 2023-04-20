
<template>
  <div :loading="loading" class="body-layout1">
    <!-- <p>{{ $t('monTreeUnInheritance') }}</p>
    <el-divider class="costv-divider mt16 mb16"/> -->
    <p class="df ai_c">
      {{ $t('treeInheritanceCancellation') }}
      <el-switch v-model="status" class="ml10"/>
      <el-button v-show="oldStatus !== status" @click="save" type="primary" class="ml10">{{ $t('saveNewState') }}</el-button>
    </p>
    <!-- <p>{{ $t('unInheritedList') }}</p> -->
    <el-divider class="costv-divider mt16 mb16"/>
    <search-from :params="tableConfig.params" :config="tableConfig.searchConfig" @reset="reset" @query="getList"/>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange"  row-id="id" class="mt20">
      <template #operate="{ row }">
        <el-button @click="deleteUnbind(row.treeid)" type="primary" link>{{ $t('delete') }}</el-button>
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, watch } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import { THEAD_CONFIG, SEARCH_CONFIG } from '@/views/global/monTreeUnbind/config'
import { filterAry } from '@/utils/index'
import { ElMessageBox } from 'element-plus'
import { getTreeUnbindList } from '@/api/global/monTreeUnbind'
import { getTreeUnbind, setTreeUnbind } from '@/api/monitor/config'
export default {
  components: { searchFrom, Table },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      status: false,
      oldStatus: false,
      tableConfig: {
        loading: false,
        searchConfig: SEARCH_CONFIG,
        params: {
          id: '',
          treeid: '',
          treename: '',
          edit_user: '',
          edit_time: ''
        },
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
    const pageChange = (page: number) => {
      state.tableConfig.page = page
      state.tableConfig.list = state.tableConfig.filterList.slice((state.tableConfig.page - 1) * state.tableConfig.pageSize, state.tableConfig.page * state.tableConfig.pageSize)
    }
    const pageSizeChange = (pageSize: number) => {
      state.tableConfig.pageSize = pageSize
      pageChange(1)
    }
    const getFilterList = () => {
      state.tableConfig.filterList = filterAry(state.tableConfig.allList, state.tableConfig.params)
      state.tableConfig.total = state.tableConfig.filterList.length
      pageChange(1)
    }
    // 获取列表数据
    const getList = () => {
      state.tableConfig.loading = true
      getTreeUnbindList().then((res: any) => {
        console.log(res)
        state.tableConfig.allList = res
        getFilterList()
        state.tableConfig.loading = false
      })
    }
    const reset = () => { // 重置
      state.tableConfig.params = {
        id: '',
        treeid: '',
        treename: '',
        edit_user: '',
        edit_time: ''
      }
      getList()
    }
    const getTreeStatus = () => {
      getTreeUnbind(store.getters.treeId).then(res => {
        console.log(res)
        if (res && res.status === 1) {
          state.status = true
          state.oldStatus = true
        } else {
          state.status = false
          state.oldStatus = false
        }
      })
    }
    // 解除绑定
    const deleteUnbind = (treeId: number) => {
      ElMessageBox.confirm(proxy.$t('deleteUnbind'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel')
      }).then(() => {
        setTreeUnbind(treeId, { status: '0'}).then(res => {
          proxy.$notification('success')
          getTreeStatus()
          getList()
        })
      })
    }
    // 设置状态
    const save = () => {
      ElMessageBox.confirm(proxy.$t('saveNewState'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel')
      }).then(() => {
        const str = state.status ? '1' : 0
        setTreeUnbind(store.getters.treeId, { status: str}).then(res => {
          proxy.$notification('success')
          getTreeStatus()
          getList()
        })
      })
    }
    watch(() => store.getters.treeId, val => {
      getList()
      getTreeStatus()
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
      save,
      deleteUnbind
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
