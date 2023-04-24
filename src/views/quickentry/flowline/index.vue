<template>
  <div class="body-layout1">
    <saas-tabs :label="treeData?.parent" class="mt-20" />
    <div>
      <search-from :params="searchParams.params" :config="searchParams.config" @reset="reset" @query="onSearch" />
    </div>
    <div class="layout-content">
      <div class="layout-content-operation">
        <div class="layout-content-operation-find">
          <el-button :icon="Search" type="primary" @click="collectOperate('searchLine', {})">
            {{ $t('findFlow') }}
          </el-button>
        </div>
        <div class="layout-content-operation-create">
          <el-button :icon="Plus" type="primary" @click="collectOperate('createLine', {})">
            {{ $t('createLine') }}
          </el-button>
          <el-button :icon="Plus" type="primary" @click="collectOperate('buildLine', {})">
            {{ $t('buildCreateLine') }}
          </el-button>
        </div>
      </div>
      <div class="layout-content-table">
        <Table :thead="FLOW_LINE_LIST_TABLE_HEADER" :data="params.list" :highlight-current-row="false"
          :tableLoading="loading" :total="params.total" :page="params.page" :pageSize="params.pageSize"
          :pageChange="page => pageChange(page)" :pageSizeChange="size => pageSizeChange(size)">
          <template #name="{ row }">
            <div class="table-name">
              <svg-icon class="table-name-icon" v-if="!row.favorites" icon-class="collect-empty"
                @click="collectOperate('collect', row)" />
              <svg-icon class="table-name-icon" v-if="row.favorites" icon-class="collect-fill"
                @click="collectOperate('unCollect', row)" />
              <el-button class="table-name-text hand ellipsis" link type="primary" @click="onDetailData(row, 'detail')">
                {{ row.name || '-' }}
              </el-button>
            </div>
          </template>
          <template #audit_level="{ row }">
            <div :style="`color:var(--color_text_success)`" v-if="row.audit_level === '1'">{{ $t('yes') }}</div>
            <div :style="`color:var(--color_text_danger)`" v-else>{{ $t('no') }}</div>
          </template>

          <template #alias="{ row }">
            <div>{{ row.alias || '-' }}</div>
          </template>

          <template #ci_type_namespace="{ row }">
            <div>{{ row.ci_type_namespace || '-' }}</div>
          </template>

          <template #ci_type="{ row }">
            <div>{{ `${row.ci_type}${row.ci_type_kind ? `.${row.ci_type_kind}` : ''}` || '-' }}</div>
            <div v-if="row.ci_type_name">
              <div v-for="item in row.ci_type_name.split(',')" :key="item">
                <el-button @click="onCiTypeModal(row, item)" type="primary" link v-if="row.ci_type === 'kubernetes'">{{
                  row.ci_type_namespace }}/{{ item }}</el-button>
                <div v-else>{{ row.ci_type_namespace }}/{{ item }}</div>
              </div>
            </div>
          </template>

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

          <template #taskInfoTest="{ row }">
            <div v-if="taskInfoTest[row.id]">
              <div @click="onDeployDetail(row, taskInfoTest[row.id].uuid)">
                <div v-if="taskInfoTest[row.id].status == 'fail'" class="status-icon">
                  <svg-icon icon-class="fail-fill" width="16" height="16" /><span>{{ taskInfoTest[row.id].version
                  }}</span>
                </div>
                <div v-if="taskInfoTest[row.id].status == 'running'" class="status-icon">
                  <svg-icon icon-class="flowline-loading" width="16" height="16" /><span>{{ taskInfoTest[row.id].version
                  }}</span>
                </div>
                <div v-if="taskInfoTest[row.id].status == 'success'" class="status-icon">
                  <svg-icon icon-class="success-fill" width="16" height="16" /><span>{{ taskInfoTest[row.id].version
                  }}</span>
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

          <template #taskInfoOnline="{ row }">
            <div v-if="taskInfoOnline[row.id]">
              <div @click="onDeployDetail(row, taskInfoOnline[row.id].uuid)">
                <div v-if="taskInfoOnline[row.id].status == 'fail'" class="status-icon">
                  <svg-icon icon-class="fail-fill" width="16" height="16" /><span>{{ taskInfoOnline[row.id].version
                  }}</span>
                </div>
                <div v-if="taskInfoOnline[row.id].status == 'running'" class="status-icon">
                  <svg-icon icon-class="flowline-loading" width="16" height="16" /><span>{{ taskInfoOnline[row.id].version
                  }}</span>
                </div>
                <div v-if="taskInfoOnline[row.id].status == 'success'" class="status-icon">
                  <svg-icon icon-class="success-fill" width="16" height="16" /><span>{{ taskInfoOnline[row.id].version
                  }}</span>
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
          <template #operation="{ row }">
            <el-table-column :label="$t('operate')" width="120" :align="'center'" fixed="right">
              <template #default="{ row }">
                <div class="df jc_c">

                  <el-button link type="primary" @click="onDetailData(row, 'editor')">{{ $t('edit') }}</el-button>
                  <el-dropdown @command="(command) => { handleCommand(command, row) }" type="primary">
                    <el-button link type="primary">{{ $t('more') }}<el-icon>
                        <ArrowDown />
                      </el-icon></el-button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item command="copyAs">{{ $t('copyAs') }}</el-dropdown-item>
                        <el-dropdown-item command="saveTemplate">{{ $t('saveTemplate') }}</el-dropdown-item>
                        <el-dropdown-item command="modifyName">{{ $t('modifyName') }}</el-dropdown-item>
                        <el-dropdown-item command="delete">{{ $t('delete') }}</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </template>
            </el-table-column>
          </template>
        </Table>
      </div>
    </div>
  </div>
  <component :is="opType" :types="opType" :conTypes="configTypes" :treeId="String(treeId)" :treeData="treeData"
    :config="opConfig" :editItem="editItem" @close="compFlag = false" @success="success" v-if="compFlag"
    v-model="compFlag" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import Table from '@/components/table/index.vue'
import Collect from './operate/Collect.vue'
import SearchPipeline from './operate/SearchPipeline.vue'
import CreateBlankLine from './operate/CreateBlankLine.vue'
import TemplateBuildLine from './operate/TemplateBuildLine.vue'
import searchFrom from '@/components/search/index.vue'
import store from '@/store'
import BuildModal from '../components/BuildModal.vue'
import DescribeModal from './operate/DescribeModal.vue'
import DescribeDetailModal from './operate/DescribeDetailModal.vue'
import { Search, Plus } from '@element-plus/icons-vue'
import {
  getciId,
  cversion,
  cjobtype,
  PANEL_COLOR,
  FLOWLINE_INDEX_SEARCH,
  EDIT_NAME_CONFIG,
  SAVE_COPYAS_CONFIG,
  SAVE_TEMPLATE_CONFIG,
  DESCRIBE_MODAL_CONFIG,
  COLLECT_DIALOG_CONFIG,
  CREATE_BLANK_LINE_CONFIG,
  SEARCH_LINE_DIALOG_CONFIG,
  TEMPLATE_BUILD_LINE_CONFIG,
  FLOW_LINE_LIST_TABLE_HEADER,
  DESCRIBE_MODAL_DETAIL_CONFIG,
} from './config'
import {
  TAG_VERSION_MODAL_CONFIG
} from './detail/config'
import { analysisGroupLists } from '@/api/dashboard/index'
import { ElMessageBox } from 'element-plus'
import {
  deleteFlowLine,
  deleteJobxTest,
  getJobxTaskList,
  deleteJobxOnline,
  deleteProjectLine,
  delToFavoriteOperate,
} from '@/api/quickentry/index'
import {
  ProjectDetailInfo
} from '@/api/interface/quickentry'

import {
  getConnectorUserTree
} from '@/api/connector/tree'

interface StateInfo {
  opType: string;
  configTypes: string;
  opConfig: object;
  loading: boolean;
  lineList: Array<any>;
  taskInfoTest: object;
  taskInfoOnline: object;
  taskInfoTestRunning: object;
  taskInfoOnlineRunning: object;
  editItem: object;
  compFlag: boolean;
  TableList: Array<any>;
  treeArray: Array<any>;
  queryTreeId: string;
  params: {
    page: number;
    pageSize: number;
    total: number;
    loading: boolean;
    list: Array<any>
  };
  searchParams: {
    config?: any,
    params: {
      name: string;
      audit_level: string;
      alias: string;
      ci_type_namespace: string;
      ci_type: string;
      edit_user: string;
      id: string;
    };
  }
}

export default defineComponent({
  components: {
    Table,
    searchFrom,
    Collect,
    BuildModal,
    DescribeModal,
    SearchPipeline,
    CreateBlankLine,
    TemplateBuildLine,
    DescribeDetailModal
  },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const route = useRoute()
    const state: StateInfo = reactive({
      opType: 'Collect', //Collect unCollect CreateBlankLine SearchPipeline TemplateBuildLine
      configTypes: 'Collect',
      opConfig: COLLECT_DIALOG_CONFIG,
      loading: false,
      lineList: [],
      taskInfoTest: {},
      taskInfoOnline: {},
      taskInfoTestRunning: {},
      taskInfoOnlineRunning: {},
      compFlag: false,
      editItem: {},
      TableList: [],
      treeArray: [],
      queryTreeId: '',
      params: {
        page: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        list: []
      },
      searchParams: {
        config: FLOWLINE_INDEX_SEARCH,
        params: {
          name: '',
          audit_level: '',
          alias: '',
          ci_type_namespace: '',
          ci_type: '',
          edit_user: '',
          id: '',
        }
      }
    })

    const treeId = computed(() => {
      return store.getters.treeId
    })

    const treeData = computed(() => {
      return store.getters.treeData
    })

    // 获取流水线列表
    const getLineList = async (queryTreeId?: string) => {
      state.loading = true
      const dataRet = await analysisGroupLists({ treeId: queryTreeId || treeId.value })
      if (dataRet) {
        state.loading = false
        // state.params.list = dataRet.reverse()
        state.TableList = dataRet.reverse()
        pageChange(1)
        state.params.total = dataRet.length
      }
    }

    // 获取测试环境状态
    const getTaskTestList = async (queryTreeId?: string) => {
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

    // 获取服务树信息
    const getTreeData: () => Promise<void> = async (): Promise<void> => {
      const dataRet = await getConnectorUserTree() as any
      if (dataRet) {
        state.treeArray = dataRet
      }
    }

    // 流水线操作
    const collectOperate = (type: string, row: ProjectDetailInfo) => {
      state.editItem = row ? JSON.parse(JSON.stringify(row)) : null
      switch (type) {
        case 'collect':
          state.opType = 'Collect'
          state.configTypes = 'Collect'
          state.opConfig = JSON.parse(JSON.stringify(COLLECT_DIALOG_CONFIG))
          state.compFlag = true
          break
        case 'searchLine':
          state.compFlag = true
          state.opConfig = JSON.parse(JSON.stringify(SEARCH_LINE_DIALOG_CONFIG))
          state.opType = 'SearchPipeline'
          state.configTypes = 'SearchPipeline'
          break
        case 'createLine':
          state.compFlag = true
          state.opConfig = JSON.parse(JSON.stringify(CREATE_BLANK_LINE_CONFIG))
          state.opType = 'CreateBlankLine'
          state.configTypes = 'CreateBlankLine'
          break
        case 'buildLine':
          state.compFlag = true
          state.opConfig = JSON.parse(JSON.stringify(TEMPLATE_BUILD_LINE_CONFIG))
          state.opType = 'TemplateBuildLine'
          state.configTypes = 'TemplateBuildLine'
          break
        case 'unCollect':
          ElMessageBox.confirm(proxy?.$t('favoriteDesc'), proxy?.$t('favoriteTitle'), {
            confirmButtonText: proxy?.$t('config_options_confirm'),
            cancelButtonText: proxy?.$t('config_options_cancel'),
            type: 'warning'
          }).then(() => {
            state.loading = true
            delToFavoriteOperate({ ciid: row.id, treeId: state.queryTreeId || treeId.value }).then(data => {
              proxy?.$notification('cancelFavoritesSuccess')
              getLineList()
            })
          }).catch(() => { })
          break
      }
    }


    const success = () => { // 操作成功的回调
      state.compFlag = false
      getLineList()
    }

    // 查看应用
    const onCiTypeModal = (row: any, item: string) => {
      state.compFlag = true
      switch (row.ci_type_kind) {
        case 'deployment':
          state.opType = 'DescribeModal'
          state.configTypes = 'DescribeModal'
          state.opConfig = JSON.parse(JSON.stringify(DESCRIBE_MODAL_CONFIG))
          state.editItem = {
            ticketid: row.ci_type_ticketid,
            name: item,
            type: row.ci_type,
            namespace: row.ci_type_namespace,
            kind: row.ci_type_kind
          }
          break
        case 'daemonset':
          state.opType = 'DescribeDetailModal'
          state.configTypes = 'DescribeDetailModal'
          state.opConfig = JSON.parse(JSON.stringify(DESCRIBE_MODAL_DETAIL_CONFIG))
          state.editItem = {
            ticketid: row.ci_type_ticketid,
            name: item,
            type: row.ci_type,
            namespace: row.ci_type_namespace,
            kind: row.ci_type_kind
          }
          break
      }
    }

    // 查看构建状态
    const onBuildStatus = (row: ProjectDetailInfo) => {
      state.opConfig = JSON.parse(JSON.stringify(TAG_VERSION_MODAL_CONFIG))
      state.opType = 'buildModal'
      state.compFlag = true
      state.editItem = {
        title: proxy.$t('tagVersion'),
        name: `${treeData.value?.parent}`,
        refresh: false,
        websorketUrl: `/api/ci/slave/${row.lastbuild.slave}/ws?uuid=${row.lastbuild.uuid}`
      }
    }

    // 查看部署详情
    const onDeployDetail: (row: ProjectDetailInfo, uuid: string) => void = (row: ProjectDetailInfo, uuid: string): void => {
      router.push(`/history/jobxdetail/${state.queryTreeId || treeId.value}/${row.id}/${uuid}`)
    }

    // 重置搜索
    const reset = () => {
      state.searchParams.params = {
        name: '',
        audit_level: '',
        alias: '',
        ci_type_namespace: '',
        ci_type: '',
        edit_user: '',
        id: '',
      }
      pageChange(1)
      state.params.total = state.params.list.length
    }

    const onSearch = () => {
      const newlist = JSON.parse(JSON.stringify(state.TableList))
      const list = newlist.filter(item => {
        return ((item.name ? item.name : '').includes(state.searchParams.params.name)) &&
          ((item.audit_level ? item.audit_level : '').includes(state.searchParams.params.audit_level)) &&
          ((item.alias ? item.alias : '').includes(state.searchParams.params.alias)) &&
          ((item.ci_type_namespace ? item.ci_type_namespace : '')?.includes(state.searchParams.params.ci_type_namespace)) &&
          ((item.ci_type ? item.ci_type : '').includes(state.searchParams.params.ci_type)) &&
          ((item.edit_user ? item.edit_user : '').includes(state.searchParams.params.edit_user)) &&
          ((item.id ? item.id : '').includes(state.searchParams.params.id))
      })
      state.params.list = list
      state.params.total = list.length
    }

    // 分页
    const pageChange = (page: number) => {
      state.params.page = page
      const list = JSON.parse(JSON.stringify(state.TableList))
      state.params.list = list.slice((state.params.page - 1) * state.params.pageSize, state.params.page * state.params.pageSize)
    }

    const pageSizeChange = (size: number) => {
      state.params.pageSize = size
      pageChange(1)
    }

    // 更多操作
    const handleCommand = async (command: string, row: ProjectDetailInfo) => {
      state.editItem = row ? JSON.parse(JSON.stringify(row)) : null
      switch (command) {
        case 'delete':
          ElMessageBox.confirm(proxy?.$t('deleteConfirmDesc'), proxy?.$t('deleteConfirmTitle'), {
            confirmButtonText: proxy?.$t('config_options_confirm'),
            cancelButtonText: proxy?.$t('config_options_cancel'),
            type: 'warning'
          }).then(async () => {
            state.loading = true
            // 删除作业配置
            const setJobDataRet = await deleteFlowLine(state.queryTreeId || treeId.value, { id: row.id })
            // 删除持续构建配置
            const projectDataRet = await deleteProjectLine(state.queryTreeId || treeId.value, { id: row.id })
            // 删除测试分批组
            const testGroupDataRet = await deleteJobxTest(state.queryTreeId || treeId.value, { id: row.id })
            // 删除线上分批组
            const onlineGroupDataRet = await deleteJobxOnline(state.queryTreeId || treeId.value, { id: row.id })
            if (setJobDataRet && projectDataRet && testGroupDataRet && onlineGroupDataRet) {
              proxy?.$notification('deleteSuccess')
              state.loading = false
              getLineList()
            }
          }).catch((error) => { console.error(error) })
          break

        case 'copyAs':
          state.compFlag = true
          state.opType = 'Collect'
          state.configTypes = 'copyAs'
          state.opConfig = JSON.parse(JSON.stringify(SAVE_COPYAS_CONFIG))
          break
        case 'saveTemplate':
          state.compFlag = true
          state.opType = 'Collect'
          state.configTypes = 'saveTemp'
          state.opConfig = JSON.parse(JSON.stringify(SAVE_TEMPLATE_CONFIG))
          break
        case 'modifyName':
          state.compFlag = true
          state.opType = 'Collect'
          state.configTypes = 'modifyName'
          state.opConfig = JSON.parse(JSON.stringify(EDIT_NAME_CONFIG))
          break
      }

    }

    // 跳转详情
    const onDetailData = (row: ProjectDetailInfo, type: 'detail' | 'editor') => {
      store.dispatch('setSelectName', row.name)
      switch (type) {
        case 'detail':
          router.push(`/quickentry/flowlinedetail/${state.queryTreeId || treeId.value}/${row.id}`)
          break
        case 'editor':
          router.push(`/quickentry/flowlineEditor/${state.queryTreeId || treeId.value}/${row.id}`)
          break
      }
    }

    const defaultOperate = () => {
      if (route.query.treeid) {
        state.queryTreeId = route.query.treeid as string
        store.dispatch('setTreeId', route.query.treeid)
        getLineList(route.query.treeid as string)
        getTaskTestList(route.query.treeid as string)
      } else {
        getLineList()
        getTaskTestList()
      }
    }

    onMounted(() => {
      defaultOperate()
      getTreeData()
    })

    watch(() => treeId.value, (value) => {
      if (value !== undefined) {
        getLineList()
        getTaskTestList()
      }
    })
    return {
      Plus,
      Search,
      ...toRefs(state),
      treeId,
      treeData,
      PANEL_COLOR,
      EDIT_NAME_CONFIG,
      SAVE_COPYAS_CONFIG,
      SAVE_TEMPLATE_CONFIG,
      DESCRIBE_MODAL_CONFIG,
      COLLECT_DIALOG_CONFIG,
      TAG_VERSION_MODAL_CONFIG,
      CREATE_BLANK_LINE_CONFIG,
      SEARCH_LINE_DIALOG_CONFIG,
      TEMPLATE_BUILD_LINE_CONFIG,
      FLOW_LINE_LIST_TABLE_HEADER,
      DESCRIBE_MODAL_DETAIL_CONFIG,
      success,
      getciId,
      cversion,
      cjobtype,
      reset,
      onSearch,
      pageChange,
      pageSizeChange,
      onDetailData,
      onCiTypeModal,
      handleCommand,
      onBuildStatus,
      collectOperate,
      onDeployDetail,
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-title {
  // font-size: 20px;
  font-weight: normal;
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

.table-name {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &-icon {
    cursor: pointer;
  }

  &-text {
    margin-left: 10px;
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
}
</style>