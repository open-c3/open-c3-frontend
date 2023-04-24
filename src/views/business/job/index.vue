
<template>
  <div class="body-layout1">
    <!-- <span>{{ treeData?.parent }}</span>
    <el-divider class="costv-divider mt16 mb16"/> -->
    <saas-tabs :label="treeData?.parent" class="mt-20"/>
    <search-from :params="params" :config="config" @reset="reset" @query="getList"/>
    <el-divider class="costv-divider mt16 mb16"/>
    <div class="tr">
      <el-button type="primary" icon="plus">{{ $t('newJob') }}</el-button>
    </div>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange" class="mt20"/>
  </div>
  <addJob v-if="addJobFlag" v-model="addJobFlag"/>
</template>
<script lang="ts">
import { onMounted, reactive, toRefs, computed, watch } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import addJob from '@/views/business/job/components/add.vue'
import store from '@/store'
import { g_url } from '@/utils/index'
import { getUserInfo } from '@/api/userCenter'
import { getJobList } from '@/api/business/job'
import { SEARCH_CONFIG, THEAD_CONFIG } from './config'
export default {
  components: { searchFrom, Table, addJob },
  setup () {
    // const url = window.location.origin
    const url = g_url
    const state = reactive({
      userData: null,
      params: {
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
      addJobFlag: true
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
      getJobList(treeId.value, state.params).then((res: any) => {
        state.tableConfig.allList = res
        pageChange(1)
      })
    }
    const reset = () => { // 重置
      state.params = {
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
    watch(() => treeId.value, val => {
      getList()
    }, {
      immediate: true,
      deep: true
    })
    onMounted(() => {
      getUserInfo().then(res => {
        console.log(res)
        state.userData = res
      })
    })
    return {
      ...toRefs(state),
      getList,
      treeId,
      treeData,
      reset,
      pageChange,
      pageSizeChange
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
