<template>
  <div class="body-layout1">
    <div class="layout-title  top mb8 df ai_c br8">
      <div class="w30 h30 icon-box df hand mr16 layout-title-left" @click="backList">
        <svg-icon icon-class="reportLeft" class="layout-title-left-svg" />
      </div>
      <div class="layout-title-header">{{ treeData?.parent }}</div>
    </div>
    <el-divider class="costv-divider mt16 mb16" />

    <div class="layout-content">
      <div class="layout-content-button">
        <el-button type="primary" link class="mr20">
          {{ $t('jobxdetailCancelClick') }}:{{ flowlineProjectNBame }}({{ flowlineInfoName }})
        </el-button>
        <!-- k8sname -->
        <div v-for="(item, index) in k8sname" :key="index" class="mr20">
          <el-button class="ml10" link type="primary" @click="describek8s(item)" icon="Search">{{ item }}</el-button>
        </div>

        <!-- ecsname -->
        <div v-for="(item, index) in ecsName" :key="index" class="mr20">
          <el-button class="ml10" link type="primary" @click="describeecs(item)">
            {{ item.name }}[{{ item.min }}/{{ item.max }}]
          </el-button>
        </div>
      </div>
      <el-card class="mt10">
        <template #header>
          <div class="card-header">
            <span>{{ $t('flowTask') }} {{ detailInfo?.starttime }} {{ $t('version') }}:
              {{ filterVersion(/\bversion:.*/, detailInfo?.variable) }}
              (<span :style="`color:${JOBX_GROUP_TABLE_STATUS[detailInfo?.status]?.color}`">
                {{ JOBX_GROUP_TABLE_STATUS[detailInfo?.status]?.detailText }}
              </span>) {{ $t('initiator') }}: {{ detailInfo?.user }}

              <div class="detail-reason" v-if="detailInfo?.reason">{{ $t('error') }}：{{ detailInfo?.reason }}</div>
            </span>
            <div>
              <!-- 执行详情 -->
              <el-button class="ml10" type="primary" link @click="operate('release', 'exDetail')">
                {{ $t('executionDetails') }}
              </el-button>
              <!-- 终止任务 -->
              <el-button v-if="operateStatus(detailInfo, rollbackShow, rversion)['release']['killJob']"
                style="color: var(--el-color-danger)" class="ml10" type="primary" link
                @click="operate('release', 'killJob')">
                {{ $t('terminateTask') }}
              </el-button>
              <!-- 紧急回滚 -->
              <el-button v-if="operateStatus(detailInfo, rollbackShow, rversion)['release']['emRollback']" class="ml10"
                type="primary" link @click="operate('release', 'rollback')">
                {{ $t('emergencyRollback') }}
              </el-button>
              <!-- 回滚 -->
              <el-button v-if="operateStatus(detailInfo, rollbackShow, rversion)['release']['rollback']" class="ml10"
                type="primary" link @click="operate('release', 'rollback')">
                {{ $t('Rollback') }}
              </el-button>
              <!-- 不回滚 -->
              <el-button v-if="operateStatus(detailInfo, rollbackShow, rversion)['release']['noRollback']" class="ml10"
                type="primary" link @click="operate('release', 'noRollback')">
                {{ $t('NotRollback') }}
              </el-button>
              <!-- 已过期不可回滚 -->
              <el-button v-if="operateStatus(detailInfo, rollbackShow, rversion)['release']['exNoRollback']" disabled
                class="ml10" link @click="operate('release', 'exNoRollback')">
                {{ $t('ExpiredCannotRollback') }}
              </el-button>
              <!-- 刷新 -->
              <div class="ml10" style="display: inline-block;">
                <svg-icon class="icon-style" icon-class="refresh" width="20" @click="onRefresh('release')" />
              </div>
              <!-- 运行时间 -->
              <div class="ml10" style="display: inline-block;">
                {{ seftime(detailInfo?.['starttime'], detailInfo?.['finishtime']) }}
              </div>
            </div>
          </div>
        </template>
        <div class="task-detail-con">
          <TaskJobCard v-for="(item, index) in subtaskDetail" :key="index" class="task-card" :treeId="String(treeId)"
            :editItem="{ ...item, jobInfoByUuid, ecsNameHash }" :treeData="treeData" :taskIndex="index" :cardIndex="1" />
        </div>
      </el-card>

      <!-- 回滚任务 -->
      <el-card class="mt10" v-if="rversion">
        <template #header>
          <div class="card-header">
            <span>{{ $t('rollbackTask') }} {{ detailRollInfo?.starttime }} {{ $t('version') }}:
              {{ filterVersion(/\bversion:.*/, detailRollInfo?.variable) }}
              (<span :style="`color:${JOBX_GROUP_TABLE_STATUS[detailRollInfo?.status]?.color}`">
                {{ JOBX_GROUP_TABLE_STATUS[detailRollInfo?.status]?.detailText }}
              </span>) {{ $t('initiator') }}: {{ detailRollInfo?.user }}
              <div class="detail-reason" v-if="detailRollInfo?.reason">{{ $t('error') }}：{{ detailRollInfo?.reason }}</div>
            </span>
            <div>
              <!-- 执行详情 -->
              <el-button class="ml10" type="primary" link @click="operate('release', 'exDetail')">
                {{ $t('executionDetails') }}
              </el-button>
              <!-- 终止任务 -->
              <el-button v-if="operateStatus(detailRollInfo, rollbackShow, rversion)['release']['killJob']"
                style="color: var(--el-color-danger)" class="ml10" type="primary" link
                @click="operate('release', 'killJob')">
                {{ $t('terminateTask') }}
              </el-button>
              <!-- 紧急回滚 -->
              <el-button v-if="operateStatus(detailRollInfo, rollbackShow, rversion)['release']['emRollback']"
                class="ml10" type="primary" link @click="operate('release', 'rollback')">
                {{ $t('emergencyRollback') }}
              </el-button>
              <!-- 回滚 -->
              <el-button v-if="operateStatus(detailRollInfo, rollbackShow, rversion)['release']['rollback']" class="ml10"
                type="primary" link @click="operate('release', 'rollback')">
                {{ $t('Rollback') }}
              </el-button>
              <!-- 不回滚 -->
              <el-button v-if="operateStatus(detailRollInfo, rollbackShow, rversion)['release']['noRollback']"
                class="ml10" type="primary" link @click="operate('release', 'noRollback')">
                {{ $t('NotRollback') }}
              </el-button>
              <!-- 已过期不可回滚 -->
              <el-button v-if="operateStatus(detailRollInfo, rollbackShow, rversion)['release']['exNoRollback']" disabled
                class="ml10" link @click="operate('release', 'exNoRollback')">
                {{ $t('ExpiredCannotRollback') }}
              </el-button>
              <!-- 刷新 -->
              <div class="ml10" style="display: inline-block;">
                <svg-icon class="icon-style" icon-class="refresh" width="20" @click="onRefresh('rollback')" />
              </div>
              <!-- 运行时间 -->
              <div class="ml10" style="display: inline-block;">
                {{ seftime(detailRollInfo?.['starttime'], detailRollInfo?.['finishtime']) }}
              </div>
            </div>
          </div>
        </template>
        <div class="task-detail-con">
          <TaskJobCard v-for="(item, index) in rollbackSubTaskDetail" :key="index" class="task-card"
            :treeId="String(treeId)" :editItem="{ ...item, jobInfoByUuid, ecsNameHash }" :treeData="treeData"
            :taskIndex="index" :cardIndex="2" />
        </div>
      </el-card>
    </div>
  </div>
  <component :is="compType" v-if="compFlag" v-model="compFlag" :editItem="editItem" :treeId="String(treeId)"
    :treeData="treeData" :types="compType" :conTypes="compType" :config="compConfig" @close="emitClose"
    @success="emitSuccess" @refresh="emitRefresh" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance, onUnmounted } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import store from '@/store'
import DescribeModal from '@/views/quickentry/flowline/operate/DescribeModal.vue'
import EcsDescribeModal from '../components/EcsDescribeModal.vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import TaskJobCard from '../components/TaskJobCard.vue'
import TaskJobDetailModal from '../components/TaskJobDetailModal.vue'

import { seftime } from '@/utils'
import {
  cprojectId,
  filterVersion,
  changeUuid,
  chuuid2deploy,
  operateStatus,
  DESCRIBE_MODAL_CONFIG,
  JOBX_GROUP_TABLE_STATUS,
  TASK_AWS_ECS_MODAL_CONFIG,
  TASK_JOB_DETAIL_MODAL_CONFIG,
} from '../config'

import {
  getFlowlineInfo,
  getSubTaskInfo,
  deleteKillTaskJobx,
  rollbackTaskJobx,
  getSubTaskJobxInfo,
  getTaskJobInfo,
} from '@/api/history/index'
import {
  getLineDetail
} from '@/api/quickentry/index'
import {
  ITaskJobxGroupInfo,
  IFlowlineDetailParams,
  IRollbackTaskJobxParams,
} from '@/api/interface/history'

export default defineComponent({
  components: {
    Table,
    searchFrom,
    TaskJobCard,
    DescribeModal,
    EcsDescribeModal,
    TaskJobDetailModal,
  },
  props: {},
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const route = useRoute()
    const treeData = computed(() => {
      return store.getters.treeData
    })
    const treeId = computed(() => {
      return store.getters.treeId
    })
    const state = reactive({
      backId: '',
      updateUUid: '',
      compType: '',
      dversion: '',
      rversion: '',
      rollBackId: '',
      flowlineInfoName: '',
      flowlineProjectNBame: '',
      upperTaskuuid: '',
      compFlag: false,
      rollbackShow: false,
      backidcalled: false,
      rollbackExist: false,
      rollbackLinkShow: false,
      timer: null,
      detailInfo: null,
      projectInfo: null,
      subtaskDetail: null,
      rollbackSubTaskDetail: null,
      ecsNameHash: null,
      rollbackTimer: null,
      detailRollInfo: {} as any,
      jobInfoByUuid: {} as any,
      jobReloadStatus: {} as any,
      mainJobInfoByUuid: {} as any,
      ecsName: [],
      k8sname: [],
      editItem: {},
      compConfig: TASK_JOB_DETAIL_MODAL_CONFIG,
    })

    // 获取 发布任务 流水线信息
    const getDetailData: () => Promise<void> = async (): Promise<void> => {
      const params: IFlowlineDetailParams = {
        treeId: route.params.treeId,
        uuid: state.updateUUid,
      }
      const dataRet = await getFlowlineInfo(params)
      if (dataRet) {
        state.detailInfo = dataRet
        state.flowlineInfoName = dataRet.name
        state.dversion = filterVersion(/\bversion:.*/, dataRet.variable)
        state.rversion = filterVersion(/\b_rollbackVersion_:.*/, dataRet.variable)
        state.backId = cprojectId(dataRet.name)
        if (state.backId && !state.backidcalled) {
          getProjectData()
        }
        state.backidcalled = true
        if (dataRet.status !== 'running' && dataRet.status !== 'init') {
          clearTimer('timer')
        }
        if (state.rollbackExist) {
          state.rollbackLinkShow = true
          state.rollbackShow = false
        } else {
          state.rollbackLinkShow = false
          state.rollbackShow = true
        }
      }
      getDetailTaskData()
    }

    // 发布任务 获取Job信息
    const getDetailTaskData: () => Promise<void> = async (): Promise<void> => {
      const params: IFlowlineDetailParams = {
        treeId: route.params.treeId,
        uuid: state.updateUUid,
      }
      const dataRet = await getSubTaskJobxInfo(params)
      if (dataRet) {
        state.subtaskDetail = dataRet
        // 每台机器下的任务
        dataRet.forEach(async (item) => {
          if (!state.jobInfoByUuid?.[item.uuid] && state.jobInfoByUuid?.default) {
            state.jobInfoByUuid[item.uuid] = state.jobInfoByUuid?.default
          }
          if (item.status !== 'init' && !state.jobReloadStatus?.[item.uuid]) {
            const subParams: IFlowlineDetailParams = {
              treeId: route.params.treeId,
              uuid: item.uuid,
            }
            const subDataRet = await getSubTaskInfo(subParams)
            if (subDataRet) {
              state.jobInfoByUuid[item?.uuid] = subDataRet
              if (!state.jobInfoByUuid?.default) {
                let newArr = []
                subDataRet.forEach((cItem) => {
                  newArr.push({ status: null, extended: { name: cItem?.extended?.name } })
                  let cItemData = cItem.extended
                  if (cItemData.scripts_type === 'buildin') {
                    let isEcsReg: RegExp = /^#!awsecs/
                    let isApplyReg: RegExp = /apply/
                    let hasTaskDefReg: RegExp = /task-definition:/
                    if (cItemData.scripts_cont && cItemData.scripts_argv
                      && isEcsReg.test(cItemData.scripts_cont) && hasTaskDefReg.test(cItemData.scripts_cont)
                      && isApplyReg.test(cItemData.scripts_argv)) {
                      let cReg: RegExp = /task-definition:(.*)\b/
                      let cnt = cReg.exec(cItemData.scripts_cont)
                      let ecsname = 'unkown'
                      if (cnt && cnt.length > 1) {
                        ecsname = cnt[1].trim()
                      }

                      let cReg1: RegExp = /minimumHealthyPercent:(.*)\b/
                      let cnt1 = cReg1.exec(cItemData.scripts_cont)
                      let min = 'min'
                      if (cnt1 && cnt1.length > 1) {
                        min = cnt[1].trim()
                      }

                      let cReg2: RegExp = /maximumPercent:(.*)\b/;
                      let cnt2 = cReg2.exec(cItemData.scripts_cont)
                      let max = 'max';
                      if (cnt2 && cnt2.length > 1) {
                        max = cnt2[1].trim()
                      }

                      if (!state.ecsNameHash?.[cItem.extended.name]) {
                        state.ecsName.push({ name: ecsname, cmd: cItemData.scripts_cont, ticketid: cItemData.user, min, max })
                        state.ecsNameHash[cItem.extended.name] = { name: ecsname, cmd: cItemData.scripts_cont, ticketid: cItemData.user, min, max }
                      }
                    }
                  }
                })
                state.jobInfoByUuid['default'] = newArr
              }
              const taskJobTask: IFlowlineDetailParams = {
                treeId: route.params.treeId,
                uuid: item.uuid,
              }
              const jobDataRet = await getTaskJobInfo(taskJobTask)
              if (jobDataRet) {
                state.mainJobInfoByUuid[item.uuid] = dataRet
                if (dataRet.status == 'success' || dataRet.status == 'fail') {
                  state.jobReloadStatus[item.uuid] = true
                }
              }
            }
          }
        })
      }
    }

    // 回滚任务 流水线信息
    const getRollbackData: () => Promise<void> = async (): Promise<void> => {
      const params: IFlowlineDetailParams = {
        treeId: route.params.treeId,
        uuid: state.upperTaskuuid,
      }
      const dataRet = await getFlowlineInfo(params)
      if (dataRet) {
        state.detailRollInfo = dataRet
        state.rollBackId = cprojectId(dataRet.name)
        if (dataRet.status !== 'running' && dataRet.status !== 'init') {
          clearTimer('rollbackTimer')
        }
      }
      getRollbackTaskJobData()
    }

    // 获取 回滚任务 的Job信息
    const getRollbackTaskJobData: () => Promise<void> = async (): Promise<void> => {
      const params = {
        treeId: route.params.treeId,
        uuid: state.upperTaskuuid,
      }
      const dataRet = await getSubTaskJobxInfo(params)
      state.rollbackSubTaskDetail = dataRet
      dataRet.forEach(async (item) => {
        if (!state.jobInfoByUuid?.[item.uuid] && state.jobInfoByUuid?.default) {
          state.jobInfoByUuid[item.uuid] = state.jobInfoByUuid?.default
        }
        if (item.status !== 'init' && !state.jobReloadStatus?.[item.uuid]) {
          const subParams: IFlowlineDetailParams = {
            treeId: route.params.treeId,
            uuid: item.uuid,
          }
          const subDataRet = await getSubTaskInfo(subParams)
          if (subDataRet) {
            state.jobInfoByUuid[item?.uuid] = subDataRet
          }
          const mainDataRet = await getTaskJobInfo(subParams)
          if (mainDataRet) {
            state.mainJobInfoByUuid[item.uuid] = mainDataRet
            if (mainDataRet.status == 'success' || mainDataRet.status == 'fail') {
              state.jobReloadStatus[item.uuid] = true
            }
          }
        }
      })

    }



    // 获取项目信息
    const getProjectData: () => Promise<void> = async (): Promise<void> => {
      const params = {
        id: route.params.projectid,
      }
      const dataRet = await getLineDetail(route.params.treeId, params)
      if (dataRet) {
        state.flowlineProjectNBame = dataRet.name
        state.projectInfo = dataRet
        if (dataRet.ci_type === 'kubernetes') {
          state.k8sname = dataRet.ci_type_name.split(',')
        }
      }
    }

    // 返回上一级 
    const backList = () => {
      clearTimer('timer')
      clearTimer('rollbackTimer')

      router.push('/history/jobx')
    }

    // 刷新 
    const onRefresh = (type: string) => {
      if (type === 'release') {
        getDetailData()
      } else if (type === 'rollback') {
        getRollbackData()
      }
    }

    // 终止发布任务接口
    const killTaskJobx = async (uuid: string | string[] | number): Promise<any> => {
      const params: IFlowlineDetailParams = {
        treeId: route.params.treeId,
        uuid: state.updateUUid,
      }
      const dataRet = await deleteKillTaskJobx(params)
      if (dataRet) {
        return dataRet.data
      }
    }
    // 回滚、紧急回滚/不回滚操作
    const setRollbackTaskJobx: (rollbackType: string) => Promise<void> = async (rollbackType: string): Promise<void> => {
      const params: IRollbackTaskJobxParams = {
        treeId: route.params.treeId,
        uuid: state.updateUUid,
        rollbackType,
      }
      const dataRet = await rollbackTaskJobx(params)
      if (dataRet) {
        window.location.reload()
      }
      return
    }

    // 操作  
    const operate: (type: string, subType: string, row?: any) => void = (type: string, subType: string, row?: any): void => {
      const taskuuid = state.updateUUid
      let timer = null
      // if (type === 'release') {
      // 执行详情
      if (subType === 'exDetail') {
        state.compFlag = true
        state.compType = 'TaskJobDetailModal'
        state.compConfig = TASK_JOB_DETAIL_MODAL_CONFIG
        state.editItem = {
          title: proxy.$t('taskExecutionLog'),
          slave: state.detailInfo.slave,
          uuid: taskuuid,
          jobxaddr: '',
        }
      }
      //终止任务
      else if (subType === 'killJob') {
        if (state.detailInfo?.status === 'running') {
          ElMessage({
            message: proxy.$t('abortPublishTask'),
            type: 'warning'
          })
          killTaskJobx(taskuuid)
          if (timer !== null) {
            clearInterval(timer)
            timer = null
          }
          timer = setInterval(() => {
            if (state.detailInfo?.status !== 'running') {
              ElMessage({
                message: proxy.$t('taskTerminated'),
                type: 'success'
              })
              clearInterval(timer)
              timer = null
            }
            killTaskJobx(taskuuid)
            onRefresh(type)
          }, 3000)
        }
      }

      // 回滚、 紧急回滚
      else if (subType === 'rollback') {
        if (state.detailInfo?.status === 'running') {
          ElMessage({
            message: proxy.$t('abortPublishTask'),
            type: 'warning'
          })
          killTaskJobx(taskuuid)
          timer = setInterval(() => {
            ElMessage({
              message: proxy.$t('taskTerminated'),
              type: 'success'
            })
            if (state.detailInfo?.status !== 'running') {
              setRollbackTaskJobx(subType)
              clearInterval(timer)
              timer = null
            }
            killTaskJobx(taskuuid)
            onRefresh(type)
          }, 3000)
        } else {
          setRollbackTaskJobx(subType)
        }
      }
      // 不回滚
      else if (subType === 'noRollback') {
        setRollbackTaskJobx(subType)
      }
      // 已过期不可回滚
      else if (subType === 'exNoRollback') { }

      // } else if (type === 'rollback') {
      // }
    }

    // 组件成功回调
    const emitSuccess: () => void = (): void => {
      emitClose()
    }

    const emitRefresh: () => void = (): void => {

    }

    const emitClose: () => void = (): void => {
      state.compFlag = false
    }

    // 基础信息定时发布任务
    const handleDetailDataTimer = () => {
      if (state.timer !== null) {
        clearTimer('timer')
        return
      }
      state.timer = setInterval(() => {
        getDetailData()
      }, 5000)
    }

    //  基础信息定时回滚任务
    const handleRollbackTimer = () => {
      if (state.rollbackTimer !== null) {
        clearTimer('rollbackTimer')
        return
      }
      state.rollbackTimer = setInterval(() => {
        if (state.rversion) {
          getRollbackData()
        }
      }, 5000)
    }

    //清除定时任务 
    const clearTimer = (type: string) => {
      if (state[type] !== null) {
        clearInterval(state[type])
      }
      state[type] = null
    }

    watch(() => treeId.value, (acc, cur) => {
      if (acc !== cur) { }
    })

    const describek8s: (row: any) => void = (row: any): void => {
      state.compFlag = true
      state.compType = 'DescribeModal'
      state.compConfig = JSON.parse(JSON.stringify(DESCRIBE_MODAL_CONFIG))
      state.editItem = {
        ticketid: state.projectInfo.ci_type_ticketid,
        name: row,
        type: state.projectInfo.ci_type,
        namespace: state.projectInfo.ci_type_namespace,
        kind: state.projectInfo.ci_type_kind
      }
    }

    const describeecs: (row: any) => void = (row: any): void => {
      state.compFlag = true
      state.compType = 'EcsDescribeModal'
      state.compConfig = JSON.parse(JSON.stringify(TASK_AWS_ECS_MODAL_CONFIG))
      state.editItem = {
        ticketid: state.projectInfo.ci_type_ticketid,
        item: row,
        title: 'AWS ECS'
      }
    }


    onMounted(() => {
      state.updateUUid = chuuid2deploy(route.params.taskuuid as string)
      state.upperTaskuuid = changeUuid(state.updateUUid as string)
      getDetailData()
      getRollbackData()
      handleDetailDataTimer()
      handleRollbackTimer()
    })

    onUnmounted(() => {
      //离开路由之后 清除定时器
      clearTimer('timer')
      clearTimer('rollbackTimer')
    })

    return {
      treeId,
      treeData,
      JOBX_GROUP_TABLE_STATUS,
      ...toRefs(state),
      changeUuid,
      backList,
      seftime,
      filterVersion,
      operateStatus,
      onRefresh,
      operate,
      emitSuccess,
      emitClose,
      emitRefresh,
      describek8s,
      describeecs,
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
  background-color: var(--color_bg_con);
  padding: 24px 20px;

  &-button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-detail-con {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
}

.task-card {
  display: inline-block;
  flex: 1;
  margin: 10px 20px;
  min-width: 500px;
  max-width: 500px;
  min-height: 330px;
}

.detail-reason {
  display: inline-block;
  margin-left: 10px;
  color: var(--el-color-danger)
}
</style>