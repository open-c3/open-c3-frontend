<template>
  <div class="body-layout1">
    <!-- <span class="layout-title">{{ treeData?.parent }}</span> -->
    <saas-tabs :label="treeData?.parent" class="mt-20"/>
    <search-from :params="params" :config="config" @reset="searchReset" @query="handleSearch">
      <template #user>
        <div class="df">
          <el-input v-model="params.user" :placeholder="$t('initiatorFullName')" />
          <el-button @click="setCreateUser" class="ml2">{{ $t('Me') }}</el-button>
        </div>
      </template>
    </search-from>
    <el-divider class="costv-divider mt16 mb16" />
    <div class="tr">
      <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading"
        :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange"
        :pageSizeChange="pageSizeChange" class="mt20">
        <!-- 关联流水线 -->
        <template #ciinfo="{ row }">
          <div>
            {{ ciInfo[row.name] || '-' }}
          </div>
        </template>

        <!-- 是回滚流程 -->
        <template #showRollback="{ row }">
          <div>
            {{ showRollback(row.uuid) || '-' }}
          </div>
        </template>

        <!-- 任务状态 -->
        <template #status="{ row }">
          <div :style="`color: ${JOBX_GROUP_TABLE_STATUS[row.status].color}`">
            {{ JOBX_GROUP_TABLE_STATUS[row.status].text || '-' }}
          </div>
        </template>

        <!-- 耗时 -->
        <template #seftime="{ row }">
          <div>
            {{ seftime(row.starttime, row.finishtime) || '-' }}
          </div>
        </template>

        <!-- 启动方式 -->
        <template #startMethod="{ row }">
          <div>
            {{ START_METHOD_MAP[row.calltype] || '-' }}
          </div>
        </template>

        <!-- version版本 -->
        <template #version="{ row }">
          <div>
            {{ filterVersion(/\bversion:.*/, row.variable) }}
          </div>
        </template>

        <!-- 操作 -->
        <template #operate="{ row }">
          <div>
            <el-button type="primary" link @click="operate('detail', row)">
              {{ $t('executionDetails') }}
            </el-button>
            <el-button type="primary" link @click="operate('redo', row)">
              {{ $t('redo') }}
            </el-button>
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import router from '@/router'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import moment from 'moment'
import { seftime } from '@/utils'
import { ElMessageBox } from 'element-plus'
import {
  showRollback,
  filterVersion,
  START_METHOD_MAP,
  JOB_LIST_SEARCH_CONFIG,
  JOB_LIST_TABLE_CONFIG,
  JOBX_GROUP_TABLE_STATUS,
} from './config'
import {
  IFunctionVoid,
} from '@/api/interface/index'

import {
  getJobGroupList,
  getAllGroupList,
  getRedoTaskJob,
} from '@/api/history/index'

import {
  ITaskJobxGroupInfo,
  ITaskJobUUIDParams
} from '@/api/interface/history'
import {
  getUserInfo
} from '@/api/userCenter/index'

type ISearchFormParams = {
  name?: string;
  user?: string;
  status?: string;
  time_start: string;
  time_end?: string;
  taskuuid?: string
}

export default defineComponent({
  components: {
    searchFrom,
    Table,
  },
  props: {},
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeData = computed(() => {
      return store.getters.treeData
    })
    const treeId = computed(() => {
      return store.getters.treeId
    })
    const state = reactive({
      ciInfo: {},
      userSelf: '',
      params: {
        name: '', // 任务名称
        user: '', // 创建人
        status: '', // 任务状态
        time_start: moment().format('YYYY-MM-DD'), // 创建时间
        // time_start: '', // 创建时间
        time_end: '',   // 结束时间
        taskuuid: '' //任务uuid
      },
      config: JOB_LIST_SEARCH_CONFIG,
      tableConfig: {
        loading: false,
        thead: JOB_LIST_TABLE_CONFIG,
        total: 0,
        list: [],
        allList: [],
        page: 1,
        pageSize: 10
      },
    })

    // 获取分组任务列表
    const getData: (param?: ISearchFormParams) => Promise<void> = async (param?: ISearchFormParams): Promise<void> => {
      state.tableConfig.loading = true
      const midParams = param ? param : state.params
      const newParams = {}
      for (let key in midParams) {
        if (state.params[key] !== '') {
          newParams[key] = state.params[key]
        }
      }
      const params: ITaskJobxGroupInfo = {
        treeId: treeId.value,
        data: { ...newParams }
      }
      const dataRet = await getJobGroupList(params).catch(err => { state.tableConfig.loading = false })
      if (dataRet) {
        state.tableConfig.loading = false
        state.tableConfig.allList = dataRet.reverse()
        state.tableConfig.total = state.tableConfig.allList.length
        pageChange(1)
      }
      const flowLineDataRet = await getAllGroupList({ treeId: treeId.value })
      if (flowLineDataRet) {
        flowLineDataRet.forEach(item => {
          state.ciInfo[`_ci_${item.id}_`] = item.name
        })
      }
    }

    // 分页
    const pageChange: (page: number) => void = (page: number): void => {
      state.tableConfig.page = page
      state.tableConfig.list = state.tableConfig.allList.slice(
        (state.tableConfig.page - 1) * state.tableConfig.pageSize,
        state.tableConfig.page * state.tableConfig.pageSize
      )
    }

    const pageSizeChange: (size: number) => void = (size: number) => {
      state.tableConfig.pageSize = size
      pageChange(1)
    }

    // 重置搜索
    const searchReset: IFunctionVoid = (): void => {
      getData()
    }

    // 搜索 
    const handleSearch: IFunctionVoid = (): void => {
      getData()
    }

    // 创建人 是自己
    const setCreateUser: IFunctionVoid = async (): Promise<boolean> => {
      if (state.userSelf && state.userSelf === state.params.user) {
        return false
      }
      const dataRet = await getUserInfo() as any
      if (dataRet) {
        state.userSelf = dataRet.email
        state.params.user = dataRet.email
      }
      return
    }

    const operate: (type: string, row: any) => void = (type: string, row: any) => {
      if (type === 'detail') {
        if (row.jobtype === 'plugin_scp' || row.jobtype === 'plugin_cmd' || row.jobtype === 'plugin_approval' ) {
          router.push(`/history/jobdetail/${treeId.value}/${row.jobuuid}/${row.uuid}?jobtype=${row.jobtype}`)
        }else {
          router.push(`/history/jobdetail/${treeId.value}/${row.name.split('_')[2]}/${row.uuid}`)
        }
      }else if (type === 'redo') {
        ElMessageBox.confirm(proxy.$t('redoTaskMessage'), proxy.$t('redoTask'), {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(async () => {
        const params:ITaskJobUUIDParams = {
          taskuuid: row.uuid
        }
        const dataRet = await getRedoTaskJob(treeId.value, params)
        if (dataRet) {
          proxy.$notification('operationSuccess')
          getData()
        }
      })
      }
    }

    watch(() => treeId.value, (acc, cur) => {
      if (acc !== cur) {
        getData()
      }
    })

    onMounted(() => {
      getData()
    })

    return {
      treeId,
      treeData,
      START_METHOD_MAP,
      JOBX_GROUP_TABLE_STATUS,
      ...toRefs(state),
      seftime,
      operate,
      filterVersion,
      showRollback,
      searchReset,
      handleSearch,
      setCreateUser,
      pageChange,
      pageSizeChange
    }
  }
})
</script>