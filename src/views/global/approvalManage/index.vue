
<template>
  <div class="body-layout1">
    <p>{{ $t('approvalSystem') }}</p>
    <search-from :params="params" :config="config" @reset="reset" @query="getList"/>
    <el-divider class="costv-divider mt16 mb16"/>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange"  row-id="id" class="mt20">
      <template #oauuid="{ row }">
        <el-button @click="info = row; oaLogFlag = true;" type="primary" link>{{ $t('log') }}</el-button>
        <el-button @click="updateTT(row.id)" :disabled="row.opinion !== 'unconfirmed'" type="primary" link class="mr5">{{ $t('redo') }}</el-button>
        <span v-if="row.oauuid === 0 || row.oauuid === '0'">{{ $t('notSent') }}</span>
        <span v-else-if="row.oauuid === 1 || row.oauuid === '1'">{{ $t('creating') }}</span>
        <span v-else>{{ row.oauuid }}</span>
      </template>
      <!-- 通知状态 -->
      <template #opinion="{ row }">
        <el-button @click="approver(row.id)" :disabled="row.opinion !== 'unconfirmed'" type="primary" link class="mr5">{{$t('redo')}}</el-button>
        <span>{{notifyStatus[row.notifystatus]}}</span>
      </template>
      <!-- 审批状态 -->
      <template #approvalStatus="{ row }">
        <span v-if="row.opinion === 'agree'" class="c-success"> {{$t('agree')}} </span>
        <span v-if="row.opinion === 'unconfirmed'"> {{$t('unapproved')}} </span>
        <span v-if="row.opinion === 'refuse'" class="c-error"> {{$t('refuse')}} </span>   
      </template>
      <!-- 操作 -->
      <template #operate="{ row }">
        <el-button @click="info = row; editFlag = true;" type="primary" link>{{ row.opinion === 'unconfirmed' ? $t('approval') : $t('show') }}</el-button>
      </template>
    </Table>
    <oa-log v-if="oaLogFlag" v-model="oaLogFlag" :info="info" @close="oaLogFlag = false; info = null;"/>
    <edit v-if="editFlag" v-model="editFlag" :info="info" :notify-status="notifyStatus" @close="editFlag = false; info = null;" @success="getList"/>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import oaLog from '@/views/global/approvalManage/components/oaLog.vue'
import edit from '@/views/global/approvalManage/components/edit.vue'
import { THEAD_CONFIG, SEARCH_CONFIG } from '@/views/global/approvalManage/config'
import { getAdminApproval, oaRedo, notifyRedo } from '@/api/global/approvalManage'
import { ElMessageBox } from 'element-plus'
import { filterAry } from '@/utils/index'
export default {
  components: { searchFrom, Table, oaLog, edit },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        id: '',
        create_time: '',
        submitter: '',
        user: '',
        assist: '',
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
      info: null,
      oaLogFlag: false,
      editFlag: false,
      notifyStatus: { 
        null: proxy.$t('notSentYet'), 
        sending: proxy.$t('sending'), 
        done: proxy.$t('done'), 
        skip: proxy.$t('ignore'), 
        fail: proxy.$t('Fail')
      },
    })
    const pageChange = (page: number) => {
      state.tableConfig.page = page
      state.tableConfig.list = state.tableConfig.filterList.slice((state.tableConfig.page - 1) * state.tableConfig.pageSize, state.tableConfig.page * state.tableConfig.pageSize)
    }
    const pageSizeChange = (pageSize: number) => {
      state.tableConfig.pageSize = pageSize
      pageChange(1)
    }
    const getFilterList = () => {
      const filterList = filterAry(state.tableConfig.allList, state.params)
      state.tableConfig.total = filterList.length
      state.tableConfig.filterList = filterList
      pageChange(1)
    }
    const getList = () => {
      state.loading = true
      getAdminApproval().then((res: any) => {
        state.tableConfig.allList = res
        getFilterList()
        state.loading = false
      })
      state.editFlag = false
    }
    const reset = () => { // 重置
      state.params = {
        id: '',
        create_time: '',
        submitter: '',
        user: '',
        assist: '',
        name: '',
        oauuid: ''
      }
      getList()
    }
    // 重做
    const updateTT = (id: string|number) => {
      ElMessageBox.confirm(proxy.$t('redoDesc'), proxy.$t('redoTitle'), {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        oaRedo(id).then(res => {
          proxy.$notification('success')
          getList()
        })
      }).catch(() => {})
      
    }
    // 重新发起审批消息
    const approver = (id: string|number) => {
      ElMessageBox.confirm(proxy.$t('approverDesc'), proxy.$t('approverTitle'), {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        notifyRedo(id).then(res => {
          proxy.$notification('success')
          getList()
        })
      }).catch(() => {})
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
      updateTT,
      approver
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
