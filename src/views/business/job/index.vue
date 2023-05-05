
<template>
  <div class="body-layout1">
    <!-- <span>{{ treeData?.parent }}</span>
    <el-divider class="costv-divider mt16 mb16"/> -->
    <saas-tabs :label="treeData?.parent" class="mt-20" />
    <search-from :params="params" :config="config" @reset="reset" @query="getList" />
    <el-divider class="costv-divider mt16 mb16" />
    <div class="tr">
      <el-button type="primary" icon="plus" @click="addJobFlag = true">{{ $t('newJob') }}</el-button>
    </div>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading"
      :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange"
      :pageSizeChange="pageSizeChange" class="mt20">
      <template #flowline="{ row }">
        <div>{{ flowlineData[row.name] || '-' }}</div>
      </template>
      <template #hasvariable="{ row }">
        <div>{{ SETTING_VARIABLE_MAP[row.hasvariable] || '-' }}</div>
      </template>
      <template #operate="{ row }">
        <div>
          <el-button type="primary" link @click="operate('execute', row)">{{ $t('execute') }}</el-button>
          <el-button type="primary" link @click="operate('edit', row)">{{ $t('edit') }}</el-button>
          <el-button type="primary" link @click="operate('clone', row)">{{ $t('clone') }}</el-button>
          <el-button type="primary" link @click="operate('delete', row)">{{ $t('delete') }}</el-button>
        </div>
      </template>
    </Table>
  </div>
  <addJob v-if="addJobFlag" v-model="addJobFlag" />
  <empty-variable v-if="emptyFlag" v-model="emptyFlag" @success="emptySuccess" @close="emptyClose" :info="emptyInfo" />
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, ComponentInternalInstance, getCurrentInstance } from 'vue'
import router from '@/router'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import addJob from '@/views/business/job/components/add.vue'
import EmptyVariable from '@/views/business/job/components/EmptyVariable.vue'
import store from '@/store'
import { g_url } from '@/utils/index'
import { getUserInfo } from '@/api/userCenter'
import { getCiList } from '@/api/business/nodeBatch'
import { SEARCH_CONFIG, THEAD_CONFIG, SETTING_VARIABLE_MAP } from '@/views/business/job/config'
import { ElMessageBox } from 'element-plus'
import {
  getJobList,
  deleteJobItem,
  getJobVariable,
  runJobOperate,
} from '@/api/business/job'

import {
  JobItemsData,
  JobItemsInfo,
  JobItemsVariableInfo,
  RunJobItemInfo,
} from '@/api/interface/business'

export default defineComponent({
  components: { searchFrom, Table, addJob, EmptyVariable },
  setup() {
    // const url = window.location.origin
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const url = g_url
    const state = reactive({
      userData: null,
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
      addJobFlag: false,
      flowlineData: {},
      emptyFlag: false,
      emptyInfo: {},
      variableDict: {},
      selectRow: {} as JobItemsData,
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
      const entries = Object.entries(state.params)
      entries.forEach(([key, value]) => {
        if (value === '' || value === null) {
          delete state.params[key]
        }
      });
      state.tableConfig.loading = true
      getJobList(treeId.value, state.params).then((res: any) => {
        state.tableConfig.loading = false
        state.tableConfig.allList = res
        pageChange(1)
      }).finally(() => {
        state.tableConfig.loading = false
      })
    }

    // 获取流水线列表
    const getFlowlineList = async () => {
      const dataRet = await getCiList(treeId.value) as unknown as Array<any>
      if (dataRet) {
        dataRet.map(item => {
          state.flowlineData[`_ci_${item.id}_`] = item.name
        })
      }
    }

    // 获取用户列表
    const getUserData = () => {
      getUserInfo().then(res => {
        state.userData = res
      })
    }

    // 操作 
    const operate = async (type: string, row: JobItemsData) => {
      if (type === 'delete') {
        const dataParam = { treeId: treeId.value, uuid: row.uuid }
        handleMessage<JobItemsInfo>({ title: proxy.$t('deleteTask'), describe: proxy.$t('deleteTaskDescribe'), params: dataParam, callback: deleteJobItem })
      } else if (type === 'execute') {
        state.selectRow = row
        const param: JobItemsVariableInfo = {
          treeId: treeId.value,
          jobuuid: row.uuid,
          query: { empty: 1 }
        }
        const dataRet = await getJobVariable(param)
        if (dataRet.length > 0) {
          state.emptyFlag = true
          state.emptyInfo = { row, data: dataRet }
        } else {
          const dataParam = { treeId: treeId.value, data: { jobuuid: row.uuid } }
          handleMessage<RunJobItemInfo>({ title: proxy.$t('executeJob'), describe: proxy.$t('executeJobMessage'), params: dataParam, callback: runJobOperate, target: 'target' })
        }
      } else if (type === 'edit') {
        state.addJobFlag = true
      }else if (type === 'clone') {
        state.addJobFlag = true
      }
    }

    const emptyClose = () => {
      state.emptyFlag = false
    }

    const emptySuccess = async (list?: Array<any>) => {
      list && list.forEach(item => {
        state.variableDict[item.name] = item.value
      })
      const params: RunJobItemInfo = {
        treeId: treeId.value,
        data: {
          jobuuid: state.selectRow['uuid'],
          variable: state.variableDict
        }
      }
      if (list) {
        handleMessage<RunJobItemInfo>({ title: proxy.$t('executeJob'), describe: proxy.$t('executeJobMessage'), params, callback: runJobOperate, target: 'target' })
      }
    }

    const handleMessage = <T>({ title, describe, params, callback, target }: { title: string, describe: string, params: T, callback: any, target?: string }) => {
      return ElMessageBox.confirm(describe, title, {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        callback(params).then(res => {
          proxy.$notification('operationSuccess')
          if (target) {
            router.push(`/history/jobdetail/${treeId.value}/${state.selectRow['name'].indexOf('_') > 0 ? state.selectRow['name'].split('_')[2] : 'empty'}/${res.uuid}`)
            return
          }
          getList()
        })
      })
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

    watch(() => treeId.value, val => {
      getList()
    }, {
      immediate: true,
      deep: true
    })
    onMounted(() => {
      getUserData()
      getFlowlineList()
    })
    return {
      SETTING_VARIABLE_MAP,
      ...toRefs(state),
      getList,
      treeId,
      treeData,
      reset,
      operate,
      pageChange,
      pageSizeChange,
      emptySuccess,
      emptyClose,
      // handleMessage
    }
  }
})
</script>
<style lang="scss" scoped></style>
