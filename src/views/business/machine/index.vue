
<template>
  <div class="body-layout1">
    <saas-tabs :label="treeData?.parent" class="mt-20"/>
    <search-from :params="params" :config="config" @reset="reset" @query="getList">
      <template #create_user>
        <span class="df">
          <el-input v-model="params.create_user" :placeholder="$t('creatorFullName')"/>
          <el-button @click="setCreateUser" class="ml2">{{ $t('Me') }}</el-button>
        </span>
      </template>
    </search-from>
    <el-divider class="costv-divider mt16 mb16"/>
    <div class="df jc_fe">
      <el-input v-model.trim="name" :placeholder="$t('addMachinePlaceholder')" class="w500">
        <template #append>
          <el-button :disabled="name === ''" @click="addFun" icon="plus" type="primary">{{ $t('addHost') }}</el-button>
        </template>
      </el-input>
    </div>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange" class="mt20">
      <template #operate="{ row }">
        <el-button  @click="deleteFun(row.id)" link type="primary">{{ $t('delete') }}</el-button>
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, computed, watch, getCurrentInstance } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import { getNotEmptyObj } from '@/utils/index'
import { SEARCH_CONFIG, THEAD_CONFIG } from './config'
import { ElMessageBox } from 'element-plus'
import { getMachineList, addMachine, deleteMachine } from '@/api/business/machine'
export default {
  components: { searchFrom, Table },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        name: '',
        create_user: '',
        create_time_start: '',
        create_time_end: '',
        inip: '',
        exip: ''
      },
      config: SEARCH_CONFIG,
      tableConfig: {
        loading: false,
        thead: THEAD_CONFIG,
        total: 0,
        list: [],
        allList: [],
        page: 1,
        pageSize: 10
      },
      name: ''
    })
    const treeId = computed(() => {
      return store.getters.treeId
    })
    const treeData = computed(() => {
      return store.getters.treeData
    })
    const setCreateUser = () => {
      state.params.create_user = store.getters.userInfo?.email
    }
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
      getMachineList(treeId.value, getNotEmptyObj(state.params)).then((res: any) => {
        state.tableConfig.allList = res.reverse()
        state.tableConfig.total = state.tableConfig.allList.length
        pageChange(1)
        state.tableConfig.loading = false
      })
    }
    const reset = () => { // 重置
      state.params = {
        name: '',
        create_user: '',
        create_time_start: '',
        create_time_end: '',
        inip: '',
        exip: ''
      }
      getList()
    }
    // 删除机器
    const deleteFun = (id: string | number) => {
      ElMessageBox.confirm(proxy.$t('deleteConfirmDesc'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        state.tableConfig.loading = true
        deleteMachine(treeId.value, id).then(res => {
          proxy.$notification('operationSuccess')
          getList()
        }).finally(() => {
          state.tableConfig.loading = false
        })
      })
    }
    // 添加机器
    const addFun = () => {
      addMachine(treeId.value, {name: state.name}).then(res => {
        proxy.$notification('operationSuccess')
        state.name = ''
        getList()
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
      reset,
      pageChange,
      pageSizeChange,
      setCreateUser,
      deleteFun,
      addFun
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
