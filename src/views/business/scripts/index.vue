
<template>
  <div class="body-layout1">
    <!-- <span>{{ treeData?.parent }}</span>
    <el-divider class="costv-divider mt16 mb16"/> -->
    <search-from :params="params" :config="config" @reset="reset" @query="getList">
      <template #create_user>
        <span class="df">
          <el-input v-model="params.create_user" :placeholder="$t('creatorFullName')"/>
          <el-button @click="setCreateUser" class="ml2">{{ $t('Me') }}</el-button>
        </span>
      </template>
    </search-from>
    <el-divider class="costv-divider mt16 mb16"/>
    <div class="df jc_sb">
      <span>{{ $t('scriptInfo') }}</span>
      <el-button @click="info = null;addFlag = true" type="primary" icon="plus" class="ml10">{{ $t('newScript') }}</el-button>
    </div>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange" class="mt20">
      <template #operate="{ row }">
        <el-button  @click="info = row; addFlag = true" link type="primary">{{ $t('edit') }}</el-button>
        <el-button @click="info = row; runFlag = true" link type="primary">{{ $t('execute') }}</el-button>
        <el-button :disabled="row.jobname !== ''"  @click="deleteFun(row.id)" link type="primary">{{ $t('delete') }}</el-button>
      </template>
    </Table>
  </div>
  <add-scripts v-if="addFlag" v-model="addFlag" :info="info" @close="addFlag = false" @success="getList"/>
  <run-scripts v-if="runFlag" v-model="runFlag" :info="info" @close="runFlag = false"/>
</template>
<script lang="ts">
import { reactive, toRefs, computed, watch, getCurrentInstance } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import addScripts from '@/views/business/scripts/components/addScripts.vue'
import runScripts from '@/views/business/scripts/components/runScripts.vue'
import store from '@/store'
import { getScripts, deleteScript } from '@/api/business/scripts'
import { SEARCH_CONFIG, THEAD_CONFIG } from './config'
import { ElMessageBox } from 'element-plus'
export default {
  components: { searchFrom, Table, addScripts, runScripts },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        name: '',
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
      addFlag: false,
      runFlag: false,
      // runFlag: true,
      info: null
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
      if (state.params.create_user === '') {
        delete state.params.create_user
      }
      if (state.params.edit_user === '') {
        delete state.params.edit_user
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
      if (state.params.edit_time_start === '' || state.params.edit_time_start === null) {
        delete state.params.edit_time_start
      }
      if (state.params.edit_time_end === '' || state.params.edit_time_end === null) {
        delete state.params.edit_time_end
      }
      getScripts(treeId.value, state.params).then((res: any) => {
        state.tableConfig.allList = res.reverse()
        state.tableConfig.total = state.tableConfig.allList.length
        pageChange(1)
      })
      state.addFlag = false
    }
    const reset = () => { // 重置
      state.params = {
        name: '',
        create_user: '',
        edit_user: '',
        create_time_start: '',
        create_time_end: '',
        edit_time_start: '',
        edit_time_end: ''
      }
      getList()
    }
    // 删除文件
    const deleteFun = (id) => {
      ElMessageBox.confirm(proxy.$t('deleteScript'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel')
      }).then(() => {
        state.tableConfig.loading = true
        deleteScript(treeId.value, id).then(res => {
          proxy.$notification('success')
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
      reset,
      pageChange,
      pageSizeChange,
      setCreateUser,
      deleteFun
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
