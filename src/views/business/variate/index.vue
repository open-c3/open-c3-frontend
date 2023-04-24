
<template>
  <div class="body-layout1">
    <saas-tabs :label="treeData?.parent" class="mt-20"/>
    <p>{{ $t('variableInfo') }}</p>
    <el-divider class="costv-divider mt16 mb16"/>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange" class="mt20">
      <template #operate="{ row }">
        <el-button  @click="deleteFun(row.node)" link type="primary">{{ $t('delete') }}</el-button>
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, computed, watch, getCurrentInstance } from 'vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import { ElMessageBox } from 'element-plus'
import { getVariateList, deleteVariate } from '@/api/business/variate'
import { THEAD_CONFIG } from '@/views/business/variate/config'
export default {
  components: { Table },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      tableConfig: {
        loading: false,
        thead: THEAD_CONFIG,
        total: 0,
        list: [],
        allList: [],
        page: 1,
        pageSize: 10
      }
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
    // 获取列表
    const getList = () => {
      state.tableConfig.loading = true
      const ary = []
      getVariateList(treeId.value).then((res: any) => {
        state.tableConfig.loading = false
        if (res && res.length) {
          state.tableConfig.thead[0].label = res[0][0]
          state.tableConfig.thead[1].label = res[0][1]
          res.forEach((item, index) => {
            if (index > 0) {
              ary.push({
                node: item[0],
                version: item[1]
              })
            }
          })
        }
        state.tableConfig.allList = ary
        state.tableConfig.total = state.tableConfig.allList.length
        pageChange(1)
      })
    }
    // 删除变量
    const deleteFun = (id: string | number) => {
      ElMessageBox.confirm(proxy.$t('deleteConfirmDesc'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        state.tableConfig.loading = true
        deleteVariate(treeId.value, id).then(res => {
          proxy.$notification('operationSuccess')
          getList()
        }).finally(() => {
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
