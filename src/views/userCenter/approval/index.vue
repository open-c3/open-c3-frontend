
<template>
  <div class="body-layout1">
    <saas-tabs :label="$t('myApproval')" class="mt-20"/>
    <search-from :params="params" :config="config" @reset="reset" @query="getList"/>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange"  row-id="id" class="mt20">
      <template #opinion="{ row }">
        <span v-if="row.opinion === 'agree'" class="c-success"> {{$t('agree')}} </span>
        <span v-if="row.opinion === 'unconfirmed'"> {{$t('unapproved')}} </span>
        <span v-if="row.opinion === 'refuse'" class="c-error"> {{$t('refuse')}} </span>
      </template>
      <template #operate="{ row }">
        <el-button @click="info = row; editFlag = true;" link type="primary">{{ row.opinion=='unconfirmed' ? $t('approval') : $t('show')}}</el-button>
      </template>
    </Table>
    <edit-approval v-if="editFlag" v-model="editFlag" :info="info" @success="getList" @close="editFlag = false"/>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import editApproval from '@/views/userCenter/approval/components/edit.vue'
import { THEAD_CONFIG, SEARCH_CONFIG, NOTIFY_STATUS_CONFIG } from '@/views/userCenter/approval/config'
import { getApprovalList } from '@/api/userCenter/approval'
import { filterAry, seftime } from '@/utils/index'
export default {
  components: { searchFrom, Table, editApproval },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        create_time: '',
        finishtime: '',
        submitter: '',
        name: '',
        oauuid: ''
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
      editFlag: true,
      info: null
    })
    const getFilterList = () => {
      state.tableConfig.filterList =filterAry(state.tableConfig.allList, state.params)
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
    const getList = () => {
      state.tableConfig.loading = true
      getApprovalList().then((res: any) => {
        state.tableConfig.allList = res.map(item => {
          item.notifystatus = NOTIFY_STATUS_CONFIG[item.notifystatus]
          item.useTime = item.finishtime ? seftime(item.create_time, item.finishtime) : ''
          item.oauuid = item.oauuid === 0 ? proxy.$t('notSent') : item.oauuid === 1 ? proxy.$t('creating') : item.oauuid
          return item
        })
        getFilterList()
        state.tableConfig.loading = false
      })
      state.editFlag = false
    }
    const reset = () => { // 重置
      state.params = {
        create_time: '',
        finishtime: '',
        submitter: '',
        name: '',
        oauuid: ''
      }
      getList()
    }
    onMounted(() => {
      getList()
    })
    return {
      ...toRefs(state),
      getList,
      reset,
      pageChange,
      pageSizeChange
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
