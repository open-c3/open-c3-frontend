
<template>
  <div class="body-layout1">
    <saas-tabs :label="treeData?.parent" class="mt-20"/>
    <div class="tr">
      <el-button @click="getList">{{ $t('refresh') }}</el-button>
      <el-button @click=" info = null; addNodeFlag = true" type="primary" icon="plus">{{ $t('newBatch') }}</el-button>
    </div>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange" class="mt20">
      <template #ciInfo="{ row }">
        {{ ciObj[row.name] }}
      </template>
      <template #operate="{ row }">
        <el-button @click=" info = row; machineListFlag = true" link type="primary">{{ $t('nodeList') }}</el-button>
        <el-button @click=" info = row; addNodeFlag = true" link type="primary">{{ $t('edit') }}</el-button>
        <el-button @click="deleteFun(row.id)" link type="primary">{{ $t('delete') }}</el-button>
      </template>
    </Table>
    <add-node v-if="addNodeFlag" v-model="addNodeFlag" :info="info" :tree-id="treeId" @cancel="info = null; addNodeFlag = false" @success="getList"/>
    <machine-list v-if="machineListFlag" v-model="machineListFlag" :info="info" :tree-id="treeId" @cancel="info = null; machineListFlag = false"/>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, computed, watch, getCurrentInstance } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import addNode from '@/views/business/nodeBatch/components/add.vue'
import machineList from '@/views/business/nodeBatch/components/machineList.vue'
import { getJobxGroup, getCiList, deleteJobxGroupInfo } from '@/api/business/nodeBatch'
import { THEAD_CONFIG } from './config'
import { ElMessageBox } from 'element-plus'

export default {
  components: { searchFrom, Table, addNode, machineList },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      ciObj: {},
      tableConfig: {
        loading: false,
        thead: THEAD_CONFIG,
        total: 0,
        list: [],
        allList: [],
        page: 1,
        pageSize: 10
      },
      addNodeFlag: true,
      info: null,
      machineListFlag: false,
      loading: false
    })
    const treeId = computed(() => {
      return store.getters.treeId
    })
    const treeData = computed(() => {
      return store.getters.treeData
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
      getJobxGroup(treeId.value).then((res: any) => {
        state.tableConfig.allList = res
        state.tableConfig.total = state.tableConfig.allList.length
        pageChange(1)
        state.tableConfig.loading = false
      })
      getCiList(treeId.value).then((res: any) => {
        res.forEach(item => {
          state.ciObj[`_ci_test_${item.id}_`] = item.name
          state.ciObj[`_ci_online_${item.id}_`] = item.name
        })
      })
      state.addNodeFlag = false
      state.info = null
    }
    // 删除分组
    const deleteFun = (id: number) => {
      ElMessageBox.confirm(proxy.$t('deleteGroupMsg'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        state.tableConfig.loading = true
        deleteJobxGroupInfo(treeId.value, id).then(res => {
          proxy.$notification('success')
          getList()
          state.tableConfig.loading = false
        })
      })
    }
    watch(() => treeId.value, val => {
      getList()
    }, {
      immediate: true,
      deep: true
    })
    return {
      ...toRefs(state),
      getList,
      treeId,
      treeData,
      pageChange,
      pageSizeChange,
      deleteFun
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
