
<template>
  <div class="body-layout1">
    <saas-tabs :label="$t('credential')" class="mt-20" />
    <search-from :params="params" :config="config" @reset="reset" @query="getList" />
    <el-divider class="costv-divider mt16 mb16" />
    <p class="tr">
      <el-button type="primary" icon="key" @click="createFun">{{ $t('newCredential') }}</el-button>
    </p>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading"
      :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange"
      :pageSizeChange="pageSizeChange" row-id="id" class="mt20">
      <template #operate="{ row }">
        <el-button link type="primary" @click="editFun('show', row)">{{ $t('show') }}</el-button>
        <el-button :disabled="!row.self" link type="primary" @click="editFun('edit', row)">{{ $t('edit') }}</el-button>
        <el-button :disabled="!(row.self === 1)" @click="deleteFun(row.id)" link type="primary">
          {{ $t('delete') }}
        </el-button>
      </template>
    </Table>
  </div>
  <component :is="compType" :types="opType" :treeId="String(treeId)" :ticketId="ticketId" :treeData="treeData"
    :config="opConfig" :editItem="editItem" @close="compFlag = false" @success="success" v-if="compFlag"
    v-model="compFlag" />
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted, computed } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import {
  THEAD_CONFIG,
  SEARCH_CONFIG,
  IMPORT_CLUSTERMODAL_CONFIG,
} from '@/views/userCenter/ticket/config'
import { ElMessageBox } from 'element-plus'
import { getTicketList, deleteTicketById } from '@/api/userCenter/ticket'
import { filterAry, deepClone } from '@/utils/index'
import ImportClusterModal from '@/views/quickentry/flowline/editor/operate/ImportClusterModal.vue'
import store from '@/store'
export default {
  components: { searchFrom, Table, ImportClusterModal },
  setup() {
    const { proxy } = getCurrentInstance()

    const treeId = computed(() => {
      return store.getters.treeId
    })
    const treeData = computed(() => {
      return store.getters.treeData
    })
    const state = reactive({
      params: {
        name: '',
        edit_time: '',
        edit_user: '',
        type: '',
        describe: ''
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
      opType: '',
      compType: '',
      compFlag: false,
      editItem: {} as any,
      opConfig: IMPORT_CLUSTERMODAL_CONFIG,
      ticketId: '',

    })
    // 筛选
    const getFilterList = () => {
      state.tableConfig.filterList = filterAry(state.tableConfig.allList, state.params)
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
    // 获取所有数据
    const getList = () => {
      state.tableConfig.loading = true
      getTicketList().then((res: any) => {
        state.tableConfig.allList = res.reverse()
        getFilterList()
        state.tableConfig.loading = false
      })
    }
    const reset = () => { // 重置
      state.params = {
        name: '',
        edit_time: '',
        edit_user: '',
        type: '',
        describe: ''
      }
      getList()
    }
    // 新建凭据
    const createFun: () => void = (): void => {
      state.compFlag = true
      state.ticketId = ''
      state.compType = 'ImportClusterModal'
      state.opConfig = deepClone(IMPORT_CLUSTERMODAL_CONFIG)
      state.editItem = {
        title: proxy.$t('newCredential'),
        type: 'create',
        ticketType: 'Harbor',
        sourceId: '',
        point: '',
      }
    }

    //查看/编辑凭据 
    const editFun: (type: string, row: any) => void = (type: string, row: any): void => {
      state.compFlag = true
      state.compType = 'ImportClusterModal'
      state.ticketId = String(row.id)
      state.opConfig = deepClone(IMPORT_CLUSTERMODAL_CONFIG)
      state.editItem = {
        type,
        title: type === 'edit' ? proxy.$t('editCredential') : proxy.$t('viewCredHelpText'),
        ticketType: 'Harbor',
        sourceId: '',
        point: '',
      }
    }

    // 删除操作
    const deleteFun = (id: string | number) => {
      ElMessageBox.confirm(proxy.$t('deleteCredential'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        state.loading = true
        deleteTicketById(id).then(res => {
          proxy.$notification('operationSuccess')
          state.loading = false
          getList()
        })
      }).catch(() => { })
    }

    const success: () => void = (): void => {
      state.compFlag = false
      getList()
    }

    onMounted(() => {
      getList()
    })
    return {
      treeId,
      treeData,
      ...toRefs(state),
      getList,
      reset,
      pageChange,
      pageSizeChange,
      deleteFun,
      createFun,
      success,
      editFun,
    }
  }
}
</script>
<style lang="scss" scoped></style>
