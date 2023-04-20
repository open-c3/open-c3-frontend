
<template>
  <div class="body-layout1">
    <search-from :params="params" :config="config" @reset="reset" @query="getList"/>
    <el-divider class="costv-divider mt16 mb16"/>
    <p class="df ai_c jc_sb">
      <span>{{ $t('privateNodeManage') }}</span>
      <el-button @click="addUserFlag = true" type="primary">{{ $t('addUser') }}</el-button>
    </p>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange"  row-id="id" class="mt20">
      <template #operate="{row}">
        <!-- 测试消息通道 -->
        <el-button @click="userTest(row.user)" link type="primary">{{ $t('testMessageChannel') }}</el-button>
        <!-- 管理机器 -->
        <el-button link type="primary">{{ $t('manageMachines') }}</el-button>
      </template>
    </Table>
    <add-user v-if="addUserFlag" v-model="addUserFlag" @success="getList" @close="addUserFlag = false"/>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import addUser from '@/views/global/private/components/addUser.vue'
import store from '@/store'
import { THEAD_CONFIG, SEARCH_CONFIG } from '@/views/global/private/config'
import { configUserTest } from '@/api/monitor/config.js'
import { getConnectorPrivate } from '@/api/global/private'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  components: { searchFrom, Table, addUser },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        id: '',
        user: '',
        edit_user: '',
        edit_time: ''
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
      addUserFlag: true
    })
    const pageChange = (page: number) => {
      state.tableConfig.page = page
      state.tableConfig.list = state.tableConfig.filterList.slice((state.tableConfig.page - 1) * state.tableConfig.pageSize, state.tableConfig.page * state.tableConfig.pageSize)
    }
    const getFilterList = () => {
      state.tableConfig.filterList = state.tableConfig.allList.filter(item => item.id.toString().includes(state.params.id) && item.user.includes(state.params.user) && item.edit_time.includes(state.params.edit_time) && item.edit_user.includes(state.params.edit_user))
      state.tableConfig.total = state.tableConfig.filterList.length
      pageChange(1)
    }
    const pageSizeChange = (pageSize: number) => {
      state.tableConfig.pageSize = pageSize
      pageChange(1)
    }
    const getList = () => {
      state.loading = true
      getConnectorPrivate().then((res: any) => {
        const ary = res.map(item => {
          return {
            id: item.id || '',
            user: item.user || '',
            edit_user: item.edit_user || '',
            edit_time: item.edit_time || ''
          }
        })
        state.tableConfig.allList = ary.reverse()
        getFilterList()
        state.loading = false
      })
      state.addUserFlag = false
    }
    const reset = () => { // 重置
      state.params = {
        id: '',
        user: '',
        edit_user: '',
        edit_time: ''
      }
      getList()
    }
    // 测试用户通道
    const userTest = (user: string) => {
      configUserTest({user: user.replace(/_/g, "."), projectid: store.getters.treeId}).then(res => {
        ElMessageBox.alert(proxy.$t('testMessageChannelDesc'), proxy.$t('testMessageChannelTitle'), {
          confirmButtonText: proxy.$t('confirm'),
          callback: () => {
          }
        })
      })
    }
    // 管理机器需要跳出
    onMounted(() => {
      getList()
    })
    return {
      ...toRefs(state),
      getList,
      reset,
      pageChange,
      pageSizeChange,
      userTest
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
