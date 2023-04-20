<template>
  <div class="body-layout3">
    <div class="layout-title  top mb8 df ai_c br8">
      <div class="w30 h30 icon-box df hand mr16 layout-title-left" @click="backList">
        <svg-icon icon-class="reportLeft" class="layout-title-left-svg" />
      </div>
      <div class="layout-title-header">{{ treeData?.parent }} => {{ selectName }}</div>
    </div>

    <!-- 图表 -->
    <el-card v-if="versionList.length !== 0" class="box-card">
      <div v-for="(item, index) in versionList" :key="index">
        <BuildPie :setId="`charts-${item.version}`" :pieData="versionItems[`APP__ci_${selectSourceId}__VERSION`]" />
      </div>
    </el-card>

    <div class="con">
      <search-from :params="searchParams.params" :config="searchParams.config" @reset="reset" @query="onSearch" />
      <div class="layout-content-operation">
        <div class="layout-content-operation-find">
          <div v-for="item in k8sname" class="layout-content-operation-find-left">
            <div style="display: inline-block;" class="mr20">{{ item }}</div>
            <el-button type="primary" link @click="describek8s(item)">{{ $t('show') }}</el-button>
            <!-- <el-button type="primary" link @click="editk8s(item)">{{ $t('edit') }}</el-button> -->
          </div>
          <div v-for="item in ecsName" class="layout-content-operation-find-right">
            <el-button type="primary" link @click="describeecs(item.name, item)">{{ $t('show') }}</el-button>
          </div>
        </div>
        <div class="layout-content-operation-create">
          <el-tooltip class="box-item" effect="dark" :content="$t('viewTags')" placement="top">
            <el-button type="primary" @click="operate('tagVersion', {})">
              {{ $t('tagVersion') }}
            </el-button>
          </el-tooltip>

          <el-tooltip class="box-item" effect="dark" :content="$t('showAllHistory')" placement="top">
            <el-button type="primary" @click="getDetailList(0)">
              {{ $t('showHistory') }}
            </el-button>
          </el-tooltip>

          <el-tooltip class="box-item" effect="dark" :content="$t('stopAllBuilds')" placement="top">
            <svg-icon class="icon-style" icon-class="pause" width="20" @click="operate('stopAllBuilds', {})" />
          </el-tooltip>

          <el-tooltip class="box-item" effect="dark" :content="$t('editConfig')" placement="top">
            <svg-icon class="icon-style" icon-class="edit-config" width="20" @click="operate('editConfig', {})" />
          </el-tooltip>

          <el-tooltip class="box-item" effect="dark" :content="$t('refresh')" placement="top">
            <svg-icon class="icon-style" icon-class="refresh" width="20" @click="getDetailList(1)" />
          </el-tooltip>
        </div>
      </div>

      <div class="layout-content-table">
        <h3 class="layout-title-header" v-if="lastversion.version && lastversion.version !== ''">
          {{ $t('lastSuccessVersion') }}:{{ lastversion.version }}
        </h3>

        <Table :thead="DETAIL_TABLE_PIPLINE_THEAD" :data="params.list" :total="params.total"
          :highlight-current-row="false" :tableLoading="params.loading" :page="params.page" :pageSize="params.pageSize"
          @pageChange="page => pageChange(page)" @pageSizeChange="size => pageSizeChange(size)">
          <template #id="{ row }">
            <el-table-column fixed prop="id" label="ID" width="120">
              <template #default="{ row }">
                <div> {{ row.id || '-' }}</div>
              </template>
            </el-table-column>
          </template>

          <template #name="{ row }">
            <el-table-column fixed prop="id" :label="$t('version')" width="120">
              <template #default="{ row }">
                <div> {{ row.name || '-' }}</div>
              </template>
            </el-table-column>
          </template>

          <template #taginfo="{ row }">
            <div> {{ row.taginfo || '-' }}</div>
          </template>

          <template #status="{ row }">
            <div class="build-status">
              <div v-if="row.status && row.status !== 'init' && row.status !== 'done'" class="build-status-detail"
                @click="getBuildDetail(row)" :style="`background-color:${DETAIL_TABLE_STATUS_COLOR[row.status]}`">
                <div>
                  <svg-icon :class="`build-status-detail-icon ${row.status === 'running' ? 'build-init' : ''}`" width="20"
                    :icon-class="`${DETAIL_TABLE_STATUS_TYPE[row.status]}`" />
                  <span>{{ $t('useTime') }}：</span>
                  <span>{{ seftime(row.starttime, row.finishtime) }}</span>
                </div>
                <div>{{ row.starttime }}</div>
              </div>
              <div v-if="row.status === 'init'">
                <svg-icon class="build-status-detail-icon build-init"
                  :icon-class="`${DETAIL_TABLE_STATUS_TYPE[row.status]}`" />
                {{ $t('initText') }}
              </div>
              <div class="build-status-operate">
                <!-- 构建 -->
                <el-button v-if="!(row.status == 'running' || row.status == 'ready')" class="build-status-operate-build"
                  link type="primary" @click="getBuild('build', row)">
                  <svg-icon icon-class="flowline-builds" />
                  <div style="display:inline-block;margin-left:5px">
                    {{ $t('build') }}
                  </div>
                </el-button>
                <!-- 停止构建 -->
                <el-button v-if="row.status == 'running' || row.status == 'ready'" class="build-status-operate-build" link
                  type="primary" @click="getBuild('killbuild', row)">
                  <svg-icon icon-class="inverse-stop" />
                  <div style="display:inline-block;margin-left:5px">
                    {{ $t('stop') }}
                  </div>
                </el-button>
                <!-- 调试 -->
                <el-button class="build-status-operate-debug" link type="primary" @click="getDebug(row)">
                  <svg-icon icon-class="flowline-debug" />
                  <div style="display:inline-block;margin-left:5px">
                    {{ $t('debug') }}
                  </div>
                </el-button>
              </div>
            </div>
          </template>

          <template #taskInfoTest="{ row, index }">
            <div>
              <div v-for="(item, indexs) in taskInfoTest[row.name]" :key="indexs">
                <div class="build-status-detail" @click="goDeployDetail(item.uuid)"
                  :style="`background-color:${DETAIL_TABLE_STATUS_COLOR[item.status]}`">
                  <div>
                    <svg-icon :class="`build-status-detail-icon ${item.status === 'running' ? 'build-init' : ''}`"
                      width="20" :icon-class="`${DETAIL_TABLE_STATUS_TYPE[item.status]}`" />
                    <span>#{{ indexs + 1 }} | {{ $t('useTime') }}：</span><span>
                      {{ seftime(item.starttime, item.finishtime) }}</span>
                  </div>
                  <div>{{ item.starttime }}</div>
                </div>
              </div>
              <!-- 操作 -->
              <div class="deploy-icon" v-if="row.status === 'success' && jobStepLen && showIPstrLen.test">
                <svg-icon icon-class="flowline-builds" width="20" height="20"
                  @click="getOperateEnv(row.name, 'test', index)" />
              </div>
              <div class="deploy-icon" v-if="row.status != 'success' && jobStepLen && showIPstrLen.test">
                <el-tooltip class="box-item" effect="dark" :content="$t('firstBuild')" placement="right">
                  <svg-icon icon-class="flowline-disabled-builds" width="20" height="20" />
                </el-tooltip>
              </div>
              <div class="deploy-icon" v-if="!jobStepLen || !showIPstrLen.test">
                <el-tooltip class="box-item" effect="dark" :content="$t('noConfig')" placement="right">
                  <svg-icon icon-class="flowline-disabled-builds" width="20" height="20" />
                </el-tooltip>
              </div>
            </div>
          </template>

          <template #taskInfoOnline="{ row }">
            <div>( {{ shownum(projectVersionCount["Do_" + row.name]) }} / {{ shownum(projectVersionCount[row.name]) }} )
            </div>
          </template>

          <template #taskOnlineEnv="{ row, index }">
            <div :class="`${taskInfoOnline[row.name]?.length > 0 ? 'task-online-env': ''}`">
              <div v-for="(item, indexs) in taskInfoOnline[row.name]" :key="indexs">
                <div class="build-status-detail" @click="goDeployDetail(item.uuid)"
                  :style="`background-color:${DETAIL_TABLE_STATUS_COLOR[item.status]}`">
                  <div>
                    {{ $t('Deploy') }}
                    <svg-icon :class="`build-status-detail-icon ${item.status === 'running' ? 'build-init' : ''}`"
                      width="20" :icon-class="`${DETAIL_TABLE_STATUS_TYPE[item.status]}`" />
                    <span>#{{ indexs + 1 }} | {{ $t('useTime') }}：</span>
                    <span>{{ seftime(item.starttime, item.finishtime) }}</span>
                  </div>
                  <div>{{ item.starttime }}</div>
                </div>
                <!-- 回滚配置 回滚版本 -->
                <div class="panel panel-info" v-if="!taskInfoRollback[item.uuid]?.['status']"
                  style="background-color: #BBB;margin-bottom: 5px;width:185px; border-radius:4px;">
                  <div v-if="!item.rollbackversion">{{ $t('rollBackNotConfig') }}</div>
                  <div v-if="item.rollbackversion">{{ $t('rollbackVersion') }} {{ item.rollbackversion }}</div>
                </div>
                <!-- 已选择不回滚 -->
                <div class="panel panel-info"
                  v-if="taskInfoRollback[item.uuid]?.['status'] && taskInfoRollback[item.uuid]?.['slave'] == '_null_'"
                  style="cursor:pointer;background-color: #98b266;margin-bottom: 5px;width:185px">
                  {{ $t('noRollback') }}
                </div>
                <!-- 回滚 -->
                <div class="build-status-detail"
                  v-if="taskInfoRollback[item.uuid]?.['status'] && taskInfoRollback[item.uuid]?.['slave'] != '_null_'"
                  :style="`background-color:${panelcolor[taskInfoRollback[item.uuid]?.['status']]}`"
                  @click="goDeployDetail(taskInfoRollback[item.uuid]?.['slave'])">
                  {{ $t('Rollback') }}
                  <svg-icon
                    :class="`build-status-detail-icon ${taskInfoRollback[item.uuid]?.['status'] === 'running' ? 'build-init' : ''}`"
                    width="20" :icon-class="`${DETAIL_TABLE_STATUS_TYPE[taskInfoRollback[item.uuid]?.['status']]}`" />
                  <span>
                    #{{ taskInfoRollback[item.uuid]?.['version'] }} | {{ $t('useTime') }}：
                  </span>
                  <span>
                    {{ seftime(taskInfoRollback[item.uuid]?.['starttime'], taskInfoRollback[item.uuid]?.['finishtime']) }}
                  </span>
                  {{ taskInfoRollback[item.uuid]?.['starttime'] }}
                </div>
              </div>
            </div>
            <div>
              <!-- 发布 -->
              <div class="deploy-icon" v-if="index == 0 && row.status === 'success' && jobStepLen && showIPstrLen.online">
                <el-button class="build-status-operate-build" link type="primary"
                  @click="getOperateEnv(row.name, 'online', index)">
                  <svg-icon icon-class="flowline-builds" width="20" height="20" />
                  {{ $t('Deploy') }}
                </el-button>
              </div>
              <!-- 回滚 -->
              <div class="deploy-icon" v-if="index > 0 && row.status === 'success' && jobStepLen && showIPstrLen.online">
                <el-button class="build-status-operate-build" link style="color:#285f99!important" type="primary"
                  @click="getOperateEnv(row.name, 'online', index)">
                  <svg-icon icon-class="flowline-rollback-build" width="20" height="20" />
                  {{ $t('Rollback') }}
                </el-button>
              </div>
              <!-- 先进行构建 -->
              <div class="deploy-icon" v-if="row.status != 'success' && jobStepLen && showIPstrLen.online">
                <el-tooltip class="box-item" effect="dark" :content="$t('firstBuild')" placement="right">
                  <svg-icon icon-class="flowline-noconfig-build" width="20" height="20" />
                </el-tooltip>
              </div>
              <!-- 没有配置 -->
              <div class="deploy-icon" v-if="!jobStepLen || !showIPstrLen.online">
                <el-tooltip class="box-item" effect="dark" :content="$t('noConfig')" placement="right">
                  <svg-icon icon-class="flowline-disabled-builds" width="20" height="20" />
                </el-tooltip>
              </div>
            </div>
          </template>
        </Table>
      </div>
    </div>
  </div>
  <component :is="compType" v-model="compFlag" v-if="compFlag" :types="compType" :conTypes="conpTypes"
    :config="compConfig" :editItem="editItem" :treeId="String(treeId)" :treeData="treeData" @close="emitClose"
    @success="emitSuccess" @refresh="emitRefresh" />
  <!-- 编辑配置 -->
  <EditorSetting v-if="editSetFlag" v-model="editSetFlag" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import moment from 'moment'
import router from '@/router'
import searchFrom from '@/components/search/index.vue'
import EditorSetting from './operate/EditorSetting.vue'
import DescribeModal from '../operate/DescribeModal.vue'
import DescribeDetailModal from '../operate/DescribeDetailModal.vue'
import StatelessApplication from '../../components/StatelessApplication.vue'
import { seftime } from '@/utils/index'
import { useRoute } from 'vue-router'
import store from '@/store'
import ReleaseLine from './operate/ReleaseLine.vue'
import BuildModal from '../../components/BuildModal.vue'
import Table from '@/components/table/index.vue'
import { ElMessageBox } from 'element-plus'
import BuildPie from '../operate/BuildPie.vue'
import {
  DESCRIBE_MODAL_CONFIG,
  DESCRIBE_MODAL_DETAIL_CONFIG,
} from '../config'
import {
  panelcolor,
  FLOWLINE_DETAIL_SEARCH,
  TAG_VERSION_MODAL_CONFIG,
  DETAIL_TABLE_PIPLINE_THEAD,
  DETAIL_TABLE_STATUS_COLOR,
  DETAIL_TABLE_STATUS_TYPE,
  ROLLBACK_RELEASE_OPERATE_CONFIG
} from './config'
import {
  cversion,
  cjobtype,
  shownum,
  isRollbackTask,
  crollbackversion,
} from '../config'

import {
  MachineBatchInfo,
  ConfirmBuildInfo,
  KillBuildsInfo,
  ProjectDetailInfo,
} from '@/api/interface/quickentry'
import {
  getK8sDeploy,
  getMachineBatchName,
  getLineDetail,
  getLineDetaulList,
  getJobxTaskListParams,
  getJobVersionParams,
  getVersionList,
  getLastVersionDetail,
  getJobListInfo,
  onBuildOperate,
  killBuildOperate,
  stopAllBuildOperate,
} from '@/api/quickentry/index'
import {
  TaskDataTestParams
} from '@/api/interface/dashboard'

interface StateInfo {
  taskInfoTest: object;
  taskInfoOnline: object;
  taskInfoRollback: object;
  selectTreeId: string[] | string | number;
  selectSourceId: string[] | string | number;
  params: {
    list: Array<any>;
    total: number;
    page: number;
    pageSize: number;
    loading: boolean;
  };
  selectName: string;
  addr: string;
  k8sname: Array<any>;
  projectDetail: ProjectDetailInfo;
  lastversion: {
    version: string;
    create_time: string;
    jobxuuid: string
  };
  versionList: Array<any>;
  versionItems: object;
  jobStepLen: number;
  showIPstr: { 'test': Array<any>, 'online': Array<any> };
  showIPstrLen: { 'test': number, 'online': number };
  projectVersionCount: object;
  projectVersionNode: object;
  jobStep: Array<any>;
  ecsName: Array<any>;
  compType: string;
  compFlag: boolean;
  conpTypes: string;
  editItem: {
    dialogType?: string;
    title?: string;
    name?: string;
    ticketid?: string;
    type?: string;
    namespace?: string;
    kind?: string;
    version?: string;
    index?: number;
    refresh?: boolean;
    websorketUrl?: string;
    showIPstr?: Array<any>;
    jobStep?: Array<any>;
    taskData?: {
      jobname?: any,
      group?: string,
      variable?: {
        checker?: any
        tagger?: any
      },
      uuid?: string,
    };
    lastVersion?: any;
    succcessVersion?: Array<any>
    jobType?: 'online' | 'test'
  }
  compConfig: object;
  successVersion: Array<any>;
  TableList: Array<any>;
  searchParams: {
    config: any,
    params: {
      id: string;
      name: string;
      create_time: string;
      tagger: string;
      taginfo: string;
      user: string;
      status: string;
    }
  };
  editSetFlag: boolean;
}

export default defineComponent({
  components: {
    Table,
    BuildPie,
    DescribeModal,
    DescribeDetailModal,
    StatelessApplication,
    searchFrom,
    BuildModal,
    EditorSetting,
    ReleaseLine,
  },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const route = useRoute()
    const treeId = computed(() => {
      return store.getters.treeId
    })

    const treeData = computed(() => {
      return store.getters.treeData
    })
    const getSiteAddr: string = `${window.location.protocol}//${window.location.host}`
    const state: StateInfo = reactive({
      taskInfoOnline: {},
      taskInfoTest: {},
      selectTreeId: treeId.value,
      selectSourceId: '',
      params: {
        page: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        list: []
      },
      selectName: '',
      addr: '',
      k8sname: [],
      projectDetail: {},
      lastversion: {
        version: '',
        create_time: '',
        jobxuuid: ''
      },
      versionList: [],
      versionItems: {},
      taskInfoRollback: {},
      jobStepLen: 0,
      showIPstr: { 'test': [], 'online': [] },
      showIPstrLen: { 'test': 0, 'online': 0 },
      projectVersionCount: {},
      projectVersionNode: {},
      jobStep: [],
      ecsName: [],
      compType: '',
      compFlag: false,
      conpTypes: '',
      editItem: {
        name: '',
        websorketUrl: ''
      },
      compConfig: {},
      successVersion: [],
      TableList: [],
      searchParams: {
        config: FLOWLINE_DETAIL_SEARCH,
        params: {
          id: '',
          name: '',
          create_time: '',
          tagger: '',
          taginfo: '',
          user: '',
          status: '',
        }
      },
      editSetFlag: false
    })

    // 获取机器发布环境分组内容
    const getNodeByName = async (envname: 'test' | 'online') => {
      state.showIPstr[envname] = [];
      state.showIPstrLen[envname] = 0;
      const nodeParams: MachineBatchInfo = {
        envname: envname,
        id: route.params.sourceId
      }
      const dataRet = await getMachineBatchName(state.selectTreeId, nodeParams)
      if (dataRet) {
        const newData = JSON.parse(JSON.stringify(dataRet))
        newData.forEach((item, index) => {
          const subAll = []
          let oneLen = item.length
          if (oneLen > 0) {
            let ss = 0
            let groupNum = 0
            let ipStr = []
            item.forEach((cItem, cIndex) => {
              if (ss === 8) {
                subAll.push(ipStr.join())
                ss = 0
                ipStr = []
              }
              ipStr.push(cItem)
              if (oneLen === cIndex + 1) {
                subAll.push(ipStr.join())
              }
              ss += 1
              groupNum += 1
            })
            let infos = { 'num': groupNum, 'infos': subAll }
            state.showIPstr[envname].push(infos)
          }
        })
        state.showIPstrLen[envname] = state.showIPstr[envname].length
      }
    }

    // 获取流水线详情信息
    const getDetail = async () => {
      const dataRet = await getLineDetail(state.selectTreeId, { id: route.params.sourceId })
      if (dataRet) {
        state.projectDetail = dataRet
        state.selectName = dataRet.name
        if (dataRet.ci_type === 'kubernetes') {
          state.k8sname = dataRet.ci_type_name.split(",");
        }
      }
    }

    // 获取流水线版本 
    const getVersionLists = async () => {
      const dataRet = await getVersionList({ treeId: state.selectTreeId })
      if (dataRet) {
        const newData = JSON.parse(JSON.stringify(dataRet))
        newData.forEach(item => {
          state.versionItems[item.name] = [];
          if (item.name === `APP__ci_${state.selectSourceId}__VERSION`) {
            state.versionList.push(item.name)
          }
          for (let key in item.data) {
            state.versionItems[item.name].push(key, parseFloat(item.data[key]))
          }
        })
      }
    }

    // 获取流水线最新的版本
    const getLastVersionList = async () => {
      const dataRet = await getLastVersionDetail({ id: route.params.sourceId })
      if (dataRet) {
        state.lastversion = { ...dataRet }
      }
    }

    // 获取测试状态信息 
    const getTestTask = async () => {
      const params: TaskDataTestParams = {
        treeId: state.selectTreeId,
        id: route.params.sourceId
      }
      const dataRet = await getJobxTaskListParams(params)
      if (dataRet) {
        const newData = JSON.parse(JSON.stringify(dataRet))
        newData.forEach((item) => {
          const version: string = cversion(item.variable)
          const collbackversion: string = crollbackversion(item.variable)
          const jobtype: string = cjobtype(item.variable)
          item.version = version
          item.rollbackversion = collbackversion
          if (jobtype === 'test') {
            if (!state.taskInfoTest[version]) {
              state.taskInfoTest[version] = []
            }
            state.taskInfoTest[version].push(item)
          }
          if (jobtype === 'online') {
            const rollbackTask = isRollbackTask(item.uuid)
            if (rollbackTask) {
              let str = item.uuid
              let strRep = str.length - 1
              str = str.replace(str[strRep], str[strRep].toLowerCase())
              item.uuid = str
              state.taskInfoRollback[item.uuid] = item
            } else {
              if (!state.taskInfoOnline[version]) {
                state.taskInfoOnline[version] = []
              }
              state.taskInfoOnline[version].push(item)
            }
          }
        })
      }
    }

    // 获取业务信息 
    const getJobVersion = async () => {
      const params: TaskDataTestParams = {
        treeId: state.selectTreeId,
        id: route.params.sourceId
      }
      const dataRet = await getJobVersionParams(params)
      if (dataRet) {
        const newData = dataRet
        newData.forEach((item, index) => {
          if (!state.projectVersionCount[item.value]) {
            state.projectVersionCount[item.value] = 0
            state.projectVersionNode[item.value] = []
          }
          state.projectVersionCount[item.value] = state.projectVersionCount[item.value] + 1
          state.projectVersionNode[item.value].push(item.node)
        })
      }
    }

    // 获取job列表 
    const getJobslist = async () => {
      const params: TaskDataTestParams = {
        treeId: state.selectTreeId,
        id: route.params.sourceId
      }
      const dataRet = await getJobListInfo(params)
      if (dataRet) {
        const JobData = dataRet.data
        JobData.forEach((item) => {
          state.jobStep.push(item.name)
          if (item?.scripts_type === 'buildin') {
            const isecs = /^#!awsecs/
            const isapply = /apply/
            const hastaskdef = /task-definition:/
            if (item.scripts_cont && item.scripts_argv && isecs.test(item.scripts_cont) && hastaskdef.test(item.scripts_cont) && isapply.test(item.scripts_argv)) {
              const reg = /task-definition:(.*)\b/;
              const cnt = reg.exec(item.scripts_cont)
              let ecsname = 'unkown';
              if (cnt && cnt.length > 1) {
                ecsname = cnt[1].trim()
              }

              const reg1 = /minimumHealthyPercent:(.*)\b/;
              const cnt1 = reg1.exec(item.scripts_cont)
              let min = 'min';
              if (cnt1 && cnt1.length > 1) {
                min = cnt1[1].trim()
              }

              const reg2 = /maximumPercent:(.*)\b/;
              const cnt2 = reg2.exec(item.scripts_cont)
              let max = 'max';
              if (cnt2 && cnt2.length > 1) {
                max = cnt2[1].trim()
              }
              state.ecsName.push({ "name": ecsname, "cmd": item.scripts_cont, "ticketid": item.user, "min": min, "max": max })
            }
          }
        })
        state.jobStepLen = state.jobStep.length
      }
    }

    // 获取详情信息
    const getBuildDetail = async (row) => {
      state.compConfig = JSON.parse(JSON.stringify(TAG_VERSION_MODAL_CONFIG))
      state.compType = 'buildModal'
      state.compFlag = true
      state.editItem = {
        title: proxy.$t('buildStatus'),
        name: `${treeData.value?.parent}`,
        refresh: false,
        websorketUrl: `/api/ci/slave/${row.slave}/ws?uuid=${row.uuid}`
      }
    }

    // 获取流水线构建版本列表
    const getDetailList = async (limit: number) => {
      state.params.loading = true
      const dataRet = await getLineDetaulList(state.selectTreeId, { id: route.params.sourceId, limit: limit })
      if (dataRet) {
        state.params.loading = false
        state.params.list = dataRet
        if (limit === 0) {
          state.params.total = dataRet.length
        }
        state.TableList = dataRet
        const newData = JSON.parse(JSON.stringify(dataRet))
        state.successVersion = []
        newData.forEach(item => {
          if (item.status === 'success') {
            if (state.successVersion.length < 30) {
              state.successVersion.push(item)
            }
          }
        })
      }
    }

    // 调试操作
    const getDebug = async (row) => {
      if (state.projectDetail['buildimage']) {
        const blankHarf: string = `/api/ci/dockershell?image=${state.projectDetail['buildimage']}&projectid=${state.selectSourceId}&tag=${row.name}&siteaddr=${getSiteAddr}`
        window.open(blankHarf)
      } else {
        const blankHarf = `/api/ci/dockershell?image=centos:7&projectid=${state.selectSourceId}&tag=${row.name}&siteaddr=${getSiteAddr}`
        window.open(blankHarf)
      }
    }

    const describek8s = (name: string) => {
      state.compFlag = true
      switch (state.projectDetail.ci_type_kind) {
        case 'deployment':
          state.compType = 'DescribeModal'
          state.conpTypes = 'DescribeModal'
          state.compConfig = JSON.parse(JSON.stringify(DESCRIBE_MODAL_CONFIG))
          state.editItem = {
            ticketid: state.projectDetail.ci_type_ticketid,
            name: name,
            type: state.projectDetail.ci_type,
            namespace: state.projectDetail.ci_type_namespace,
            kind: state.projectDetail.ci_type_kind
          }
          break
        case 'daemonset':
          state.compType = 'DescribeDetailModal'
          state.conpTypes = 'DescribeDetailModal'
          state.compConfig = JSON.parse(JSON.stringify(DESCRIBE_MODAL_DETAIL_CONFIG))
          state.editItem = {
            ticketid: state.projectDetail.ci_type_ticketid,
            name: name,
            type: state.projectDetail.ci_type,
            namespace: state.projectDetail.ci_type_namespace,
            kind: state.projectDetail.ci_type_kind
          }
          break
      }
    }

    const editk8s = async (name) => {
      state.compFlag = true
      state.compType = 'StatelessApplication'
      state.conpTypes = 'StatelessApplication'
      state.compConfig = JSON.parse(JSON.stringify(DESCRIBE_MODAL_DETAIL_CONFIG))
      state.editItem = {
        title: proxy.$t('statelessApplication'),
        dialogType: 'edit',
        ticketid: state.projectDetail.ci_type_ticketid,
        name: name,
        type: state.projectDetail.ci_type,
        namespace: state.projectDetail.ci_type_namespace,
        kind: state.projectDetail.ci_type_kind
      }
      const params = {
        ticketId: state.projectDetail.ci_type_ticketid,
      }
      const dataRet = await getK8sDeploy(params)
      if (dataRet) {
        state.editItem['data'] = dataRet
        if (state.projectDetail.ci_type_kind === 'deployment') {
        } else if (state.projectDetail.ci_type_kind === 'daemonset') {
          state.editItem['title'] = proxy.$t('daemonSet')
        }
      }
    }

    const describeecs = (name: string, row: any) => {
      console.log(name, row)
    }

    // 构建操作
    const getBuild = async (type: 'build' | 'killbuild', row: any) => {
      switch (type) {
        case 'build':
          ElMessageBox.confirm(proxy?.$t('buildDesc'), proxy?.$t('buildTitle'), {
            confirmButtonText: proxy?.$t('config_options_confirm'),
            cancelButtonText: proxy?.$t('config_options_cancel'),
            type: 'warning'
          }).then(() => {
            state.params.loading = true
            const params: ConfirmBuildInfo = {
              treeId: state.selectTreeId,
              id: route.params.sourceId,
              uuid: row.uuid
            }
            onBuildOperate(params).then(data => {
              proxy?.$notification('operationSuccess')
              getDetailList(1)
            })
          }).catch(() => { state.params.loading = false })
          break
        case 'killbuild':
          ElMessageBox.confirm(proxy?.$t('killBuildDesc'), proxy?.$t('stopAllBuildTitle'), {
            confirmButtonText: proxy?.$t('config_options_confirm'),
            cancelButtonText: proxy?.$t('config_options_cancel'),
            type: 'warning'
          }).then(() => {
            state.params.loading = true
            const params: KillBuildsInfo = {
              slave: row.slave,
              uuid: row.uuid
            }
            killBuildOperate(params).then(data => {
              state.params.loading = false
              proxy?.$notification('operationSuccess')
              getDetailList(1)
            })
          }).catch(() => { state.params.loading = false })
          break
      }
    }

    // 测试 发布 回滚 操作
    const getOperateEnv = async (name: string, type: 'online' | 'test', index: number) => {
      state.compFlag = true
      state.editItem = {
        name: `${treeData.value?.parent}(${state.selectName})`,
        version: name,
        lastVersion: state.lastversion,
        index: index,
        showIPstr: state.showIPstr[type],
        jobStep: state.jobStep,
        taskData: {
          jobname: null,
          group: `_ci_${type}_${route.params.sourceId}_`,
          variable: {},
          uuid: null,
        },
        jobType: type,
        succcessVersion: state.successVersion
      }
      state.compType = 'ReleaseLine'
      state.compConfig = JSON.parse(JSON.stringify(ROLLBACK_RELEASE_OPERATE_CONFIG))
    }

    // 测试、正式环境构建跳转历史详情
    const goDeployDetail = async (uuid: string) => {
      router.push(`/history/jobxdetail/${route.params.treeId}/${route.params.sourceId}/${uuid}`)
    }

    // 详情操作 
    const operate = async (type, row) => {
      state.conpTypes = type
      switch (type) {
        case 'stopAllBuilds':
          ElMessageBox.confirm(proxy?.$t('stopAllBuildDesc'), proxy?.$t('stopAllBuildTitle'), {
            confirmButtonText: proxy?.$t('config_options_confirm'),
            cancelButtonText: proxy?.$t('config_options_cancel'),
            type: 'warning'
          }).then(() => {
            state.params.loading = true
            const params: ConfirmBuildInfo = {
              treeId: state.selectTreeId,
              id: route.params.sourceId,
            }
            stopAllBuildOperate(params).then(data => {
              proxy?.$notification('operationSuccess')
              getDetailList(1)
            })
          }).catch(() => { state.params.loading = false })
          break;
        case 'tagVersion':
          state.compConfig = JSON.parse(JSON.stringify(TAG_VERSION_MODAL_CONFIG))
          state.compType = 'buildModal'
          state.compFlag = true
          state.editItem = {
            title: proxy.$t('tagVersion'),
            name: `${treeData.value?.parent}=>${state.selectName}`,
            refresh: true,
            websorketUrl: `/api/ci/slave/${state.projectDetail?.slave}/ws?uuid=${state.projectDetail.id}`
          }
          break
        case 'editConfig':
          state.editSetFlag = true
          break
      }

    }


    const success = () => { // 操作成功的回调
      getDetailList(1)
    }

    // 重置函数
    const reset = () => {
      state.searchParams.params = {
        id: '',
        name: '',
        create_time: '',
        tagger: '',
        taginfo: '',
        user: '',
        status: '',
      }
      pageChange(1)
    }

    const onSearch = () => {
      const newList = JSON.parse(JSON.stringify(state.TableList))
      const list = newList.filter(item => {
        return String(item.id).includes(state.searchParams.params.id) &&
          item.name.includes(state.searchParams.params.name) &&
          item.create_time.includes(state.searchParams.params.create_time) &&
          item.tagger.includes(state.searchParams.params.tagger) &&
          item.taginfo.includes(state.searchParams.params.taginfo) &&
          item.user.includes(state.searchParams.params.user) &&
          item.status.includes(state.searchParams.params.status)
      })
      state.params.list = list
      state.params.total = list.length
    }

    const pageChange = (page: number) => {

    }

    const pageSizeChange = (size: number) => {

    }

    // 返回列表页
    const backList = () => { // 返回列表页
      if (route.query.ids) router.push({ query: {} })
      router.push('/quickentry/flowline')
    }

    // 组件成功回调
    const emitSuccess = () => {
      state.compFlag = false
      getDetailList(1)
    }

    const emitClose = () => {
      state.compFlag = false
    }

    const emitRefresh = () => {
      getDetail()
      state.editItem = {
        name: `${treeData.value?.parent}=>${state.selectName}`,
        refresh: true,
        websorketUrl: `/api/ci/slave/${state.projectDetail?.slave}/ws?uuid=${state.projectDetail.id}`
      }
    }

    onMounted(() => {
      state.selectTreeId = route.params.treeId
      state.selectSourceId = route.params.sourceId
      getDetail()
      getJobslist()
      getTestTask()
      getJobVersion()
      getDetailList(1)
      getVersionLists()
      getLastVersionList()
      getNodeByName('test')
      getNodeByName('online')
    })

    watch(() => treeId.value, (acc, cur) => {
      if (String(acc) !== String(route.params.treeId)) {
        router.push('/quickentry/flowline')
      }
    })

    return {
      moment,
      ...toRefs(state),
      treeId,
      treeData,
      panelcolor,
      getSiteAddr,
      DETAIL_TABLE_STATUS_TYPE,
      DETAIL_TABLE_STATUS_COLOR,
      DETAIL_TABLE_PIPLINE_THEAD,
      ROLLBACK_RELEASE_OPERATE_CONFIG,
      editk8s,
      reset,
      operate,
      seftime,
      shownum,
      getBuild,
      success,
      getDebug,
      backList,
      emitClose,
      onSearch,
      pageChange,
      describek8s,
      describeecs,
      pageSizeChange,
      emitRefresh,
      emitSuccess,
      getTestTask,
      getJobslist,
      getJobVersion,
      getNodeByName,
      getDetailList,
      getBuildDetail,
      goDeployDetail,
      getVersionLists,
      getOperateEnv,
      getLastVersionList,
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &-left {
    display: flex;
    justify-content: center;
    align-items: center;

    &-svg {
      color: var(--color_btn_bg);
    }
  }

  &-header {
    color: var(--color_text)
  }
}

.layout-content {
  &-operation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;

    &-find {
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      &-left,
      &-right {
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
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

.icon-style {
  width: 20px;
  height: 20px;
  margin: 0 10px;
}

.build-status {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &-detail {
    cursor: pointer;
    border-radius: 8px;
    width: 185px;
    height: 50px;
    margin-bottom: 5px;
    color: var(--color_text) !important;

    &-icon {
      color: var(--color_text) !important;
      margin-right: 5px;
    }
  }
}

.build-init {
  animation: rotate 13s linear infinite
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg)
  }

  50% {
    transform: rotateZ(1800deg)
  }

  100% {
    transform: rotateZ(3600deg)
  }
}

.box-card {
  margin-bottom: 20px;
}

.deploy-icon {
  margin-top: 10px;
}

.con {
  background-color: var(--color_bg_con);
  padding: 24px 20px;
}

.task-online-env {
  min-width: 230px;
  height: 200px;
  overflow-y: auto;
}
</style>