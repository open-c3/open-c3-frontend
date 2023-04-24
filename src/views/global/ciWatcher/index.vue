
<template>
  <div :loading="loading" class="body-layout1">
    <p>{{ $t('CITaskMonitor') }} {{ $t('memoryUsage') }}({{ used }}/{{ total }}) {{ $t('surplus') }}{{free}}M</p>
    <el-divider class="costv-divider mt16 mb16"/>
    <p>CI {{ $t('queue') }}</p>
    <search-from :params="ciConfig.params" :config="ciConfig.searchConfig" @reset="reset('ciConfig')" @query="getList('ciConfig')"/>
    <Table :thead="ciConfig.thead" :data="ciConfig.list" :tableLoading="ciConfig.loading" :page="ciConfig.page" :pageSize="ciConfig.pageSize" :total="ciConfig.total" :pageChange="val => pageChange(val, 'ciConfig')" :pageSizeChange="val => pageSizeChange(val, 'ciConfig')"  row-id="id" class="mt20">
      <template #operate="{ row }">
        <el-button @click="flowLineDetail(row.project_groupid, row.project_id)" type="primary" link>{{ $t('goto') }}</el-button>
        <el-button @click="queueJumping(row.version_uuid)" type="primary" link>{{ $t('queueJumping') }}</el-button>
      </template>
    </Table>
    <p>{{ $t('ciRunning') }}</p>
    <search-from :params="runningConfig.params" :config="runningConfig.searchConfig" @reset="reset('runningConfig')" @query="getList('runningConfig')"/>
    <Table :thead="runningConfig.thead" :data="runningConfig.list" :tableLoading="runningConfig.loading" :page="runningConfig.page" :pageSize="runningConfig.pageSize" :total="runningConfig.total" :pageChange="val => pageChange(val, 'runningConfig')" :pageSizeChange="val => pageSizeChange(val, 'runningConfig')"  row-id="id" class="mt20">
      <template #operate="{ row }">
        <el-button @click="flowLineDetail(row.project_groupid, row.project_id)" type="primary" link>{{ $t('goto') }}</el-button>
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import { CI_THEAD_CONFIG, RUNNING_THEAD_CONFIG, CI_SEARCH_CONFIG, RUNNING_SEARCH_CONFIG } from '@/views/global/ciWatcher/config'
import { getWatcherList, watcherJump } from '@/api/global/ciWatcher'
import { filterAry } from '@/utils/index'
export default {
  components: { searchFrom, Table },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      free: 0,
      total: 0,
      used: 0,
      ciConfig: {
        loading: false,
        searchConfig: CI_SEARCH_CONFIG,
        params: {
          project_id: '',
          project_groupid: '',
          project_name: '',
          version_name: '',
          version_slave: '',
          project_cpulimit: '',
          project_memlimit: '',
          version_status: '',
          version_queueid: ''
        },
        thead: CI_THEAD_CONFIG,
        total: 0,
        list: [],
        allList: [],
        filterList: [],
        page: 1,
        pageSize: 10
      },
      runningConfig: {
        loading: false,
        searchConfig: RUNNING_SEARCH_CONFIG,
        params: {
          project_id: '',
          project_groupid: '',
          project_name: '',
          version_name: '',
          version_slave: '',
          project_cpulimit: '',
          project_memlimit: '',
          version_status: '',
          version_queueid: ''
        },
        thead: RUNNING_THEAD_CONFIG,
        total: 0,
        list: [],
        allList: [],
        filterList: [],
        page: 1,
        pageSize: 10
      },
      loading: false
    })
    const pageChange = (page: number, type: string) => {
      state[type].page = page
      state[type].list = state[type].filterList.slice((state[type].page - 1) * state[type].pageSize, state[type].page * state[type].pageSize)
    }
    const pageSizeChange = (pageSize: number, type: string) => {
      state[type].pageSize = pageSize
      pageChange(1, type)
    }
    const getFilterList = (type: string) => {
      state[type].filterList = filterAry(state[type].allList, state[type].params)
      state[type].total = state[type].filterList.length
      pageChange(1, type)
    }
    // 获取 CI队列 正在运行列表
    const getList = (type?: string) => {
      state.loading = true
      getWatcherList().then((res: any) => {
        state.used = res.mem.used
        state.total = res.mem.total
        state.free = res.mem.free
        if (type) {
          if (type === 'ciConfig') {
            state.ciConfig.allList = res.ready
          } else {
            state.runningConfig.allList = res.running
          }
          getFilterList(type)
        } else {
          state.ciConfig.allList = res.ready
          state.runningConfig.allList = res.running
          getFilterList('ciConfig')
          getFilterList('runningConfig')
        }
        state.loading = false
      })
    }
    // 插队
    const queueJumping = (uuid: string | number) => {
      state.ciConfig.loading = true
      watcherJump(uuid).then(res => {
        proxy.$notification('operationSuccess')
        getList()
        state.ciConfig.loading = false
      })
    }
    // 进入流水线详情
    const flowLineDetail = (treeId: string|number, sourceId: string|number) => {
      proxy.$jumpPage(` /quickentryflowlinedetail/${treeId}/${sourceId}`)
    }
    const reset = (type: string) => { // 重置
      state[type].params = {
        project_id: '',
        project_groupid: '',
        project_name: '',
        version_name: '',
        version_slave: '',
        project_cpulimit: '',
        project_memlimit: '',
        version_status: '',
        version_queueid: ''
      }
      getList(type)
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
      queueJumping,
      flowLineDetail
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
