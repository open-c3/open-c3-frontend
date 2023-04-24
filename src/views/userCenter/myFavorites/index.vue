
<template>
  <div class="body-layout1">
    <saas-tabs :label="$t('ownerFavoriteLine')" class="mt-20" />
    <search-from :params="params" :config="config" @reset="reset" @query="getList" />
    <el-divider class="costv-divider mt16 mb16" />
    <div class="layout-content-operation">
      <div class="layout-content-operation-find">
      </div>
      <div class="layout-content-operation-create">
        <el-button :icon="Plus" type="primary" @click="collectOperate('searchLine', {})">
          {{ $t('moreFavorite') }}
        </el-button>
      </div>
    </div>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading"
      :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange"
      :pageSizeChange="pageSizeChange" row-id="id" class="mt20">

      <!-- id -->
      <template #id="{ row }">
        <div class="table-name">
          <svg-icon class="table-name-icon" v-if="!row.favorites" icon-class="collect-empty"
            @click="collectOperate('collect', row)" />
          <svg-icon class="table-name-icon" v-if="row.favorites" icon-class="collect-fill"
            @click="collectOperate('unCollect', row)" />
          {{ row.name || '-' }}
        </div>
      </template>

      <!-- 服务树名 -->
      <template #treename="{ row }">
        <el-tooltip effect="dark" :content="row.treename" placement="top">
          <div class="tree-name-text" @click="goFlowline('treename', row)">
            {{ row.treename || '-' }}
          </div>
        </el-tooltip>
      </template>

      <!-- 构建状态 -->
      <template #lastbuild="{ row }">
        <div v-if="row.lastbuild.status">
          <div @click="onBuildStatus(row)">
            <div v-if="row.lastbuild.status == 'fail'" class="status-icon">
              <svg-icon icon-class="fail-fill" width="16" height="16" /><span>{{ row.lastbuild.name }}</span>
            </div>
            <div v-if="row.lastbuild.status == 'running'" class="status-icon">
              <svg-icon icon-class="flowline-loading" width="16" height="16" />
              <span>{{ row.lastbuild.name }}</span>
            </div>
            <div v-if="row.lastbuild.status == 'success'" class="status-icon">
              <svg-icon icon-class="success-fill" width="16" height="16" /><span>{{ row.lastbuild.name }}</span>
            </div>
          </div>
          <div>{{ row.lastbuild?.starttime || '-' }}</div>
        </div>
        <div v-else>-</div>
      </template>

      <!-- 测试环境状态 -->
      <template #taskInfoTest="{ row }">
        <div v-if="taskInfoTest[row.id]">
          <div @click="onDeployDetail(row, taskInfoTest[row.id].uuid)">
            <div v-if="taskInfoTest[row.id].status == 'fail'" class="status-icon">
              <svg-icon icon-class="fail-fill" width="16" height="16" /><span>
                {{ taskInfoTest[row.id].version }}
              </span>
            </div>
            <div v-if="taskInfoTest[row.id].status == 'running'" class="status-icon">
              <svg-icon icon-class="flowline-loading" width="16" height="16" /><span>
                {{ taskInfoTest[row.id].version }}
              </span>
            </div>
            <div v-if="taskInfoTest[row.id].status == 'success'" class="status-icon">
              <svg-icon icon-class="success-fill" width="16" height="16" /><span>
                {{ taskInfoTest[row.id].version }}
              </span>
            </div>
          </div>
          <div>
            <div>{{ taskInfoTest[row.id]?.starttime || '-' }}</div>
            <div v-if="taskInfoTestRunning[row.id] && taskInfoTest[row.id].status !== 'running'">
              <el-icon class="is-loading" :size="16" :color="`${PANEL_COLOR[taskInfoTest[row.id].status]}`">
                <Loading />
              </el-icon>
            </div>
          </div>
        </div>
        <div v-else>-</div>
      </template>
      <!-- 线上环境状态 -->
      <template #taskInfoOnline="{ row }">
        <div v-if="taskInfoOnline[row.id]">
          <div @click="onDeployDetail(row, taskInfoOnline[row.id].uuid)">
            <div v-if="taskInfoOnline[row.id].status == 'fail'" class="status-icon">
              <svg-icon icon-class="fail-fill" width="16" height="16" /><span>
                {{ taskInfoOnline[row.id].version }}
              </span>
            </div>
            <div v-if="taskInfoOnline[row.id].status == 'running'" class="status-icon">
              <svg-icon icon-class="flowline-loading" width="16" height="16" /><span>
                {{ taskInfoOnline[row.id].version }}
              </span>
            </div>
            <div v-if="taskInfoOnline[row.id].status == 'success'" class="status-icon">
              <svg-icon icon-class="success-fill" width="16" height="16" /><span>
                {{ taskInfoOnline[row.id].version }}
              </span>
            </div>
          </div>
          <div>
            <div>{{ taskInfoOnline[row.id]?.starttime || '-' }}</div>
            <div v-if="taskInfoOnlineRunning[row.id] && taskInfoOnline[row.id].status !== 'running'">
              <el-icon class="is-loading" :size="16" :color="`${PANEL_COLOR[taskInfoOnline[row.id].status]}`">
                <Loading />
              </el-icon>
            </div>
          </div>
        </div>
        <div v-else>-</div>
      </template>
      <template #operate="{ row }">
        <el-button @click="goFlowline('flowline', row)" link type="primary">{{ $t('goTo') }}</el-button>
      </template>
    </Table>
  </div>

  <component :is="opType" :types="opType" :conTypes="configTypes" :treeId="String(treeId)" :treeData="treeData"
    :config="opConfig" :editItem="editItem" @close="compFlag = false" @success="success" v-if="compFlag"
    v-model="compFlag" />
</template>


<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted, computed, watch } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import BuildModal from '@/views/quickentry/components/BuildModal.vue'
import { ElMessageBox } from 'element-plus'
import SearchPipeline from '@/views/quickentry/flowline/operate/SearchPipeline.vue'
import {
  getciId,
  cversion,
  cjobtype,
  PANEL_COLOR,
  THEAD_CONFIG,
  SEARCH_CONFIG,
  COLLECT_DIALOG_CONFIG,
  TAG_VERSION_MODAL_CONFIG,
  SEARCH_LINE_DIALOG_CONFIG,
} from './config'
import { setCookies } from '@/utils/cookie'
import {
  getFavoriteList
} from '@/api/userCenter/favorites'
import {
  ProjectDetailInfo
} from '@/api/interface/quickentry'
import {
  getJobxTaskList,
  delToFavoriteOperate,
} from '@/api/quickentry/index'
import store from '@/store'
import router from '@/router'
import { Plus } from '@element-plus/icons-vue'


export default {
  components: { searchFrom, Table, BuildModal, SearchPipeline },
  setup() {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        id: '',
        name: '',
        alias: '',
        edit_user: '',
        treename: ''
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
      opConfig: null as any,
      opType: '',
      compFlag: false,
      editItem: {} as any,
      configTypes: 'Collect',
      taskInfoTest: {} as any,
      taskInfoTestRunning: {} as any,
      taskInfoOnline: {} as any,
      taskInfoOnlineRunning: {} as any
    })

    const treeId = computed(() => {
      return store.getters.treeId
    })

    const treeData = computed(() => {
      return store.getters.treeData
    })

    const getFilterList: () => void = (): void => {
      state.tableConfig.filterList =
        state.tableConfig.allList.filter(item =>
          item.id.includes(state.params.id) &&
          item.name.toString().includes(state.params.name) &&
          item.alias.includes(state.params.alias) &&
          item.edit_user.includes(state.params.edit_user) &&
          item.treename.includes(state.params.treename))
      state.tableConfig.total = state.tableConfig.filterList.length
      pageChange(1)
    }

    const pageChange: (page: number) => void = (page: number): void => {
      state.tableConfig.page = page
      state.tableConfig.list = state.tableConfig.filterList.slice((state.tableConfig.page - 1) * state.tableConfig.pageSize, state.tableConfig.page * state.tableConfig.pageSize)
    }

    const pageSizeChange: (pageSize: number) => void = (pageSize: number): void => {
      state.tableConfig.pageSize = pageSize
      pageChange(1)
    }

    const getList: () => Promise<void> = async (): Promise<void> => {
      state.tableConfig.loading = true
      const dataRet = await getFavoriteList({ treeId: treeId.value })
      state.tableConfig.loading = false
      if (dataRet) {
        state.tableConfig.allList = dataRet.reverse()
        getFilterList()
        let mtree = []
        let htree = {}
        dataRet.forEach(item => {
          if (!htree[item.groupid]) {
            htree[item.groupid] = 1
            mtree.push(item.groupid)
          }
        })
        if (mtree.length) {
          getTaskTestList(mtree.join(','))
        }
      }
    }

    // 重置
    const reset: () => void = (): void => {
      state.params = {
        id: '',
        name: '',
        alias: '',
        treename: '',
        edit_user: '',
      }
      getList()
    }

    const goFlowline: (type: string, row: any) => void = (type: string, row: any) => {
      store.dispatch('setTreeId', row.groupid)
      setCookies('treeId', row.groupid)
      if (type === 'treename') {
        router.push(`/quickentry/flowline?treeid=${row.groupid}`)
      } else if (type === 'flowline') {
        router.push(`/quickentry/flowlinedetail/${row.groupid}/${row.id}`)
      }
    }

    // 流水线操作
    const collectOperate: (type: string, row: ProjectDetailInfo) => void = (type: string, row: ProjectDetailInfo) => {
      state.editItem = row ? JSON.parse(JSON.stringify(row)) : null
      switch (type) {
        case 'collect':
          state.opType = 'Collect'
          state.configTypes = 'Collect'
          state.opConfig = JSON.parse(JSON.stringify(COLLECT_DIALOG_CONFIG))
          state.compFlag = true
          break
        case 'unCollect':
          ElMessageBox.confirm(proxy?.$t('favoriteDesc'), proxy?.$t('favoriteTitle'), {
            confirmButtonText: proxy?.$t('config_options_confirm'),
            cancelButtonText: proxy?.$t('config_options_cancel'),
            type: 'warning'
          }).then(() => {
            state.loading = true
            delToFavoriteOperate({ ciid: row.id, treeId: treeId.value }).then(data => {
              proxy?.$notification('cancelFavoritesSuccess')
              getList()
              getTaskTestList()
            })
          }).catch(() => { })
          break
        case 'searchLine':
          state.compFlag = true
          state.opConfig = JSON.parse(JSON.stringify(SEARCH_LINE_DIALOG_CONFIG))
          state.opType = 'SearchPipeline'
          state.configTypes = 'SearchPipeline'
          break
      }
    }

    // 查看构建状态
    const onBuildStatus: (row: ProjectDetailInfo) => void = (row: ProjectDetailInfo): void => {
      state.opConfig = JSON.parse(JSON.stringify(TAG_VERSION_MODAL_CONFIG))
      state.opType = 'buildModal'
      state.compFlag = true
      state.editItem = {
        title: `${treeData.value?.parent}`,
        name: `${treeData.value?.parent}`,
        refresh: false,
        websorketUrl: `/api/ci/slave/${row.lastbuild.slave}/ws?uuid=${row.lastbuild.uuid}`
      }
    }

    // 获取测试环境状态
    const getTaskTestList = async (queryTreeId?: string) => {
      state.taskInfoTest = {}
      state.taskInfoTestRunning = {}
      state.taskInfoOnline = {}
      state.taskInfoOnlineRunning = {}
      const dataRet = await getJobxTaskList({ treeId: queryTreeId || treeId.value })
      if (dataRet.length) {
        dataRet.forEach(item => {
          var projectId = getciId(item.name)
          var version = cversion(item.variable)
          var jobtype = cjobtype(item.variable)
          if (item.slave != '_null_' && jobtype == 'test') {
            state.taskInfoTest[projectId] = item
            if (item.status == 'running') {
              state.taskInfoTestRunning[projectId] = 1
            }
          }
          if (item.slave != '_null_' && jobtype == 'online') {
            state.taskInfoOnline[projectId] = item
            if (item.status == 'running') {
              state.taskInfoOnlineRunning[projectId] = 1
            }
          }
        })
      }
    }
    // 测试环境状态
    const onDeployDetail: (row: ProjectDetailInfo, uuid: string) => void = (row: ProjectDetailInfo, uuid: string): void => {
      router.push(`/history/jobxdetail/${treeId.value}/${row.id}/${uuid}`)
    }

    const success: () => void = (): void => {
      state.compFlag = false
      getList()
      getTaskTestList()
    }

    const close: () => void = (): void => {
      state.compFlag = false
    }

    onMounted(() => {
      getList()
      getTaskTestList()
    })

    watch(() => treeId.value, (value) => {
      if (value !== undefined) {
        getList()
        getTaskTestList()
      }
    })
    return {
      Plus,
      treeId,
      treeData,
      PANEL_COLOR,
      ...toRefs(state),
      getList,
      reset,
      success,
      pageChange,
      pageSizeChange,
      goFlowline,
      onBuildStatus,
      onDeployDetail,
      collectOperate,
    }
  }
}
</script>
<style lang="scss" scoped>
.tree-name-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100px;
  cursor: pointer;
}

.layout-content {
  &-operation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-find {
      font-size: 14px;
    }
    &-create {
      font-size: 14px;
    }
  }
  &-table {
    margin: 20px auto;
  }
}

.status-icon {
  vertical-align: middle;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;

  :first-child {
    display: inline-block;
    margin-right: 5px;
  }
}</style>
