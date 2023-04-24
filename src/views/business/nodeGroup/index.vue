
<template>
  <div class="body-layout1">
    <saas-tabs :label="treeData?.parent" class="mt-20"/>
    <search-from :params="params" :config="config" @reset="reset" @query="getList">
      <template #create_user>
        <span class="df">
          <el-input v-model="params.create_user" :placeholder="$t('creatorFullName')"/>
          <el-button @click="setCurUser('create_user')" class="ml2">{{ $t('Me') }}</el-button>
        </span>
      </template>
      <template #edit_user>
        <span class="df">
          <el-input v-model="params.edit_user" :placeholder="$t('editorFullName')"/>
          <el-button @click="setCurUser('edit_user')" class="ml2">{{ $t('Me') }}</el-button>
        </span>
      </template>
    </search-from>
    <el-divider class="costv-divider mt16 mb16"/>
    <div class="tr">
      <el-button @click=" info = null; addGroupFlag = true" type="primary" icon="plus">{{ $t('newGroup') }}</el-button>
    </div>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange" class="mt20">
      <template #operate="{ row }">
        <el-button @click=" info = row; addGroupFlag = true" link type="primary">{{ $t('edit') }}</el-button>
        <el-button @click="deleteFun(row.id)" link type="primary">{{ $t('delete') }}</el-button>
      </template>
    </Table>
    <add-group v-if="addGroupFlag" v-model="addGroupFlag" :info="info" @close="addGroupFlag = false" @success="getList"/>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, computed, watch, getCurrentInstance } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import addGroup from '@/views/business/nodeGroup/components/add.vue'
import { getJobNodeGroup, deleteJobGroup } from '@/api/business/nodeGroup'
import { SEARCH_CONFIG, THEAD_CONFIG } from './config'
import { ElMessageBox } from 'element-plus'
import { getNotEmptyObj } from '@/utils/index'
export default {
  components: { searchFrom, Table, addGroup },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        name: '',
        plugin: '',
        jobname: '',
        create_user: '',
        edit_user: '',
        create_time_start: '',
        create_time_end: '',
        edit_time_start: '',
        edit_time_end: ''
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
      addGroupFlag: false,
      info: null,
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
    // 设置创建人全称 编辑人全称
    const setCurUser = (type: string) => {
      state.params[type] = store.getters.userInfo?.email
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
      state.tableConfig.loading = true
      getJobNodeGroup(treeId.value, getNotEmptyObj(state.params)).then((res: any) => {
        state.tableConfig.allList = res.reverse()
        state.tableConfig.total = state.tableConfig.allList.length
        pageChange(1)
        state.tableConfig.loading = false
      })
      state.addGroupFlag = false
    }
    const reset = () => { // 重置
      state.params = {
        name: '',
        plugin: '',
        jobname: '',
        create_user: '',
        edit_user: '',
        create_time_start: '',
        create_time_end: '',
        edit_time_start: '',
        edit_time_end: ''
      }
      getList()
    }
    // 删除分组
    const deleteFun = (id) => {
      ElMessageBox.confirm(proxy.$t('deleteGroupMsg'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        state.tableConfig.loading = true
        deleteJobGroup(treeId.value, id).then(res => {
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
      reset,
      pageChange,
      pageSizeChange,
      userInfo,
      setCurUser,
      deleteFun
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
