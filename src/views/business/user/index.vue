
<template>
  <div class="body-layout1 kanban">
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
    <div class="tr">
      <el-input v-model="username" :placeholder="$t('accountName')" class="w400">
        <template #append>
          <el-button :disabled="username === ''" :loading="loading" @click="create" type="primary" icon="plus">{{ $t('createAccount') }}</el-button>
        </template>
      </el-input>
    </div>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange" class="mt20">
      <template #operate="{ row }">
        <el-button :disabled="row.projectid === 0 && treeId !== 0"  @click="deleteFun(row.id)" link type="primary">{{ $t('delete') }}</el-button>
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, computed, watch, getCurrentInstance } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import { getBusinessUse, createBusinessUse, deleteBusinessUse } from '@/api/business/user'
import { SEARCH_CONFIG, THEAD_CONFIG } from './config'
import { ElMessageBox } from 'element-plus'
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
      username: '',
      loading: false
    })
    const treeId = computed(() => {
      return store.getters.treeId
    })
    const treeData = computed(() => {
      return store.getters.treeData
    })
    const userInfo = computed(() => {
      return store.getters.userInfo
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
    const getList = () => {
      if (state.params.create_user === '') {
        delete state.params.create_user
      }
      if (state.params.name === '') {
        delete state.params.name
      }
      if (state.params.create_time_start === '' || state.params.create_time_start === null) {
        delete state.params.create_time_start
      }
      if (state.params.create_time_end === '' || state.params.create_time_end === null) {
        delete state.params.create_time_end
      }
      getBusinessUse(treeId.value, state.params).then((res: any) => {
        state.tableConfig.allList = res.reverse()
        state.tableConfig.total = state.tableConfig.allList.length
        pageChange(1)
      })
    }
    const reset = () => { // 重置
      state.params = {
        name: '',
        create_user: '',
        create_time_start: '',
        create_time_end: ''
      }
      getList()
    }
    const create = () => {
      state.loading = true
      createBusinessUse(treeId.value, {username: state.username}).then(res => {
        proxy.$notification('success')
        getList()
        state.username = ''
      }).finally(() => {
        state.loading = false
      })
    }
    // 删除用户
    const deleteFun = (id) => {
      ElMessageBox.confirm(proxy.$t('deleteUser'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel')
      }).then(() => {
        deleteBusinessUse(treeId.value, id).then(res => {
          proxy.$notification('success')
          getList()
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
      reset,
      pageChange,
      pageSizeChange,
      userInfo,
      setCreateUser,
      create,
      deleteFun
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
