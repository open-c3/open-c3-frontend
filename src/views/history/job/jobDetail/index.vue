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
      <el-card class="mt10">
        <template #header>
          <div class="card-header">
            <span>{{ $t('basicInfo') }}</span>
          </div>
        </template>
        <div class="card-content">
          <el-form :model="detailInfo" label-width="120px" class="detail-form">
            <el-row :gutter="20">
              <el-col :span="8">
                <!-- 作业名称 -->
                <el-form-item :label="`${$t('JobName')}：`">
                  {{ detailInfo.name || '-' }}
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <!-- 执行结果 -->
                <el-form-item :label="`${$t('implementResult')}：`">
                  <span :style="`color:${JOBX_GROUP_TABLE_STATUS[detailInfo.status]?.color}`">
                    {{ JOBX_GROUP_TABLE_STATUS[detailInfo.status]?.text || '-' }}
                  </span>
                </el-form-item>
              </el-col>
              <!-- 启动人 -->
              <el-col :span="8">
                <el-form-item :label="`${$t('initiator')}：`">
                  {{ detailInfo.user || '-' }}
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 开始时间 -->
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item :label="`${$t('startAt')}：`">
                  {{ detailInfo.starttime || '-' }}
                </el-form-item>
              </el-col>
              <!-- 结束时间 -->
              <el-col :span="8">
                <el-form-item :label="`${$t('finishAt')}：`">
                  {{ detailInfo.finishtime || '-' }}
                </el-form-item>
              </el-col>
              <!-- 耗时 -->
              <el-col :span="8">
                <el-form-item :label="`${$t('useTime')}：`">
                  {{ seftime(detailInfo.starttime, detailInfo.finishtime) || '-' }}
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 任务日志 -->
            <el-form-item :label="`${$t('taskLog')}：`">
              <el-button class="log-error-button" type="primary" @click="handleTaskDetail">
                {{ $t('taskDetails') }}
              </el-button>
              <span class="log-error-span" v-if="detailInfo.reason">
                {{ $t('error') }}: {{ detailInfo.reason || '-' }}
              </span>
            </el-form-item>
            <!-- 调用变量 -->
            <el-form-item :label="`${$t('callVariable')}：`">
              {{ detailInfo.variable || '-' }}
            </el-form-item>

          </el-form>
        </div>
      </el-card>

      <!-- 作业步骤 -->
      <el-card class="mt10">
        <template #header>
          <div class="card-header">
            <span>{{ $t('jobStep') }}</span>
            <el-button class="button" link>
              <svg-icon class="icon-style" icon-class="refresh" width="20" @click="onRefresh" />
            </el-button>
          </div>
        </template>
        <div>
          <el-card v-for="(item, index) in jobStepInfo" :key="index" class="mt10">
            <template #header>
              <div class="card-header">
                <span>{{ itemTableConfig[index][`${item.subtask_type}-${index}`].title }}</span>
              </div>
            </template>
            <div>
              <Table :thead="[]" :data="itemTableConfig[index][`${item.subtask_type}-${index}`].tableConfig.list">
                <el-table-column type="expand">
                  <template #default="{ row }">
                    <el-form :model="row.extended" label-width="100px" :inline="true">
                      <div v-if="item.subtask_type === 'approval'">
                        <el-form-item :label="`${$t('approvalContent')}：`">
                          {{ row?.extended?.cont || '' }}
                        </el-form-item>
                        <el-form-item label="pause：">
                          {{ row?.extended?.pause || '' }}
                        </el-form-item>
                      </div>
                      <div v-else>
                        <el-form-item :label="`${cIndex}：`" v-for="(cItem, cIndex) in row.extended" :key="cItem.uuid">
                          {{ cItem || '-' }}
                        </el-form-item>
                      </div>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('taskName')" prop="name" :align="'center'">
                  <template #default="{ row }">
                    {{ row?.extended?.name || '-' }}
                  </template>
                </el-table-column>

                <el-table-column v-if="item.subtask_type === 'approval'" :label="$t('approver')" prop="approver"
                  :align="'center'">
                  <template #default="{ row }">
                    {{ row?.extended?.approver || '-' }}
                  </template>
                </el-table-column>

                <el-table-column v-else :label="$t('NumberExecutionHosts')" prop="nodecount" :align="'center'">
                  <template #default="{ row }">
                    {{ row?.nodecount || '-' }}
                  </template>

                </el-table-column>

                <el-table-column :label="$t('startAt')" prop="starttime" :align="'center'">
                  <template #default="{ row }">
                    {{ row?.starttime || '-' }}
                  </template>
                </el-table-column>

                <el-table-column :label="$t('finishAt')" prop="finishtime" :align="'center'">
                  <template #default="{ row }">
                    {{ row?.finishtime || '-' }}
                  </template>
                </el-table-column>

                <el-table-column :label="$t('useTime')" prop="seftime" :align="'center'">
                  <template #default="{ row }">
                    {{ seftime(row?.starttime, row?.finishtime) }}
                  </template>
                </el-table-column>

                <el-table-column :label="$t('status')" prop="status" :align="'center'">
                  <template #default="{ row }">
                    <span :style="`color:${JOBX_GROUP_TABLE_STATUS[row?.status]?.color}`">
                      {{ row.status === '' || row.status === null ? '-' : JOBX_GROUP_TABLE_STATUS[row?.status]?.text }}
                    </span>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('operate')" prop="operate" :align="'center'">
                  <template #default="{ row }">
                    <el-button-group
                      v-for="(sItem, sIndex) in JOB_TASK_STATUS_BUTTON_GROUP[item.subtask_type]?.[row.status]"
                      :key="sIndex">
                      <el-button type="primary" link @click="taskOperate(sItem, index, row)"
                        v-if="setJobTaskShow(sItem, index, row)">
                        {{ sItem.text }}
                      </el-button>
                    </el-button-group>
                  </template>
                </el-table-column>
              </Table>
            </div>
            <!-- 作业日志 -->
            <div class="mt20" v-if="!item.jobtype">
              <span>{{ $t('taskLog') }}</span>
              <TaskWebsocket style="background-color:#000" :interval="false" :locationStr="locationStr"
                :taskuuid="editItem.uuid" />
            </div>
          </el-card>
        </div>
      </el-card>
    </div>
  </div>
  <component :is="compType" v-if="compFlag" v-model="compFlag" :editItem="editItem" :treeId="String(treeId)"
    :treeData="treeData" :types="compType" :config="compConfig" @close="emitClose" @success="emitSuccess"
    :hasTable="hasTable" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance, onUnmounted } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import store from '@/store'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import TaskWebsocket from '../components/TaskWebsocket.vue'
import TaskJobDetailModal from '../components/TaskJobDetailModal.vue'

import { seftime, deepClone } from '@/utils'
import {
  ITEM_TABLE_HEAD,
  TASK_JOB_DETAIL_STEP_MAP_TEXT,
  JOBX_GROUP_TABLE_STATUS,
  TASK_JOB_DETAIL_MODAL_CONFIG,
  JOB_TASK_STATUS_BUTTON_GROUP,
  SUB_TASK_OPERATE_MESSAGE_GROUP,
} from '../config'

import {
  getSubTaskInfo,
  getTaskJobInfo,
  updateImpleOperate,
  updateTaskOperate,
} from '@/api/history/index'
import {
  ISubTaskConfirmData,
  IFlowlineDetailParams,
} from '@/api/interface/history'



export default defineComponent({
  components: {
    searchFrom,
    Table,
    TaskJobDetailModal,
    TaskWebsocket,
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
      compType: '',
      jobType: '',
      compFlag: false,
      compConfig: TASK_JOB_DETAIL_MODAL_CONFIG,
      editItem: {} as any,
      hasTable: false,
      timer: null,
      detailInfo: {} as any,
      jobStepInfo: {} as any,
      // itemTableConfig: [TASK_JOB_DETAIL_STEP_MAP],
      itemTableConfig: [],
      operateMessage: SUB_TASK_OPERATE_MESSAGE_GROUP,
      locationStr: '',
    })

    // 获取 基本信息
    const getDetailData: () => Promise<void> = async (): Promise<void> => {
      const params: IFlowlineDetailParams = {
        treeId: route.params.treeId,
        uuid: route.params.taskuuid,
      }
      const dataRet = await getTaskJobInfo(params)
      if (dataRet) {
        state.detailInfo = { ...dataRet, loguuid: `${dataRet.uuid}${dataRet.jobuuid}${dataRet.jobtype.split('_')[1]}` }

        if (dataRet.status === 'fail' || dataRet.status === 'success') {
          clearTimer('timer')
        }
        if (dataRet.jobtype) {
          state.jobType = dataRet.jobtype
        }
        // state.locationStr = `/api/jobx/slave/${state.detailInfo.slave}/ws?uuid=${route.params.taskuuid}`
      }
    }

    // 获取 作业步骤 
    const getJobStepData: () => Promise<void> = async (): Promise<void> => {
      const newArr = JSON.parse(JSON.stringify(state.itemTableConfig))
      const params: IFlowlineDetailParams = {
        treeId: route.params.treeId,
        uuid: route.params.taskuuid,
      }
      const dataRet = await getSubTaskInfo(params)
      if (dataRet) {
        state.jobStepInfo = [...dataRet]
        state.jobStepInfo.forEach((item, index) => {
          newArr.push({
            [`${item.subtask_type}-${index}`]: {
              value: item.subtask_type,
              title:TASK_JOB_DETAIL_STEP_MAP_TEXT[item.subtask_type],
              tableConfig: {
                list: [item],
              }
            }
          })
        })
        state.itemTableConfig = [...newArr]
      }
    }

    // 返回上一级 
    const backList = () => {
      clearTimer('timer')
      router.push('/history/job')
    }

    // 查看任务日志
    const handleTaskDetail: () => void = (): void => {
      state.compFlag = true
      state.hasTable = false
      state.compType = 'TaskJobDetailModal'
      state.compConfig = TASK_JOB_DETAIL_MODAL_CONFIG
      state.editItem = {
        title: proxy.$t('taskExecutionLog'),
        slave: state.detailInfo.slave,
        uuid: route.params.taskuuid,
      }
    }

    // 刷新作业步骤
    const onRefresh: () => void = (): void => {
      getJobStepData()
    }

    // 作业步骤任务状态条件
    const setJobTaskShow: (item: any, index: number, row: any) => boolean = (item: any, index: number, row: any): boolean => {
      if (item.type === row.subtask_type) {
        return {
          success: {
            detail: true,
            confirm: !!item.pause,
          },
          decision: {
            detail: true,
            running: true,
            ignore: true,
            shutTask: true,
          },
          ignore: {
            detail: true,
            confirm: !!item.pause
          },
          running: {
            detail: true,
          },
          fail: {
            detail: true,
            next: index !== state.jobStepInfo.length - 1 && item.status !== 'fail',
            confirm: !!item.pause,
          },
          refuse: {
            detail: true,
          }
        }?.[row.status]?.[item.value]
      }
      return true
    }

    // 按钮操作
    const taskOperate: (item: any, index: number, row: any) => void = (item: any, index: number, row: any): void => {
      const commonParams: ISubTaskConfirmData = {
        taskuuid: route.params.taskuuid as string,
        subtaskuuid: row.uuid,
        subtasktype: row.subtask_type
      }
      const apiFun = {
        confirm: updateImpleOperate,
        running: updateImpleOperate,
        ignore: updateTaskOperate,
        shutTask: updateTaskOperate,
      }
      // running
      const apiParams = {
        confirm: { treeId: route.params.treeId, data: { ...commonParams, control: 'next' } },
        next: { treeId: route.params.treeId, data: { ...commonParams, control: 'next' } },
        retry: { treeId: route.params.treeId, data: { ...commonParams, control: 'running' } },
        ignore: { treeId: route.params.treeId, data: { ...commonParams, control: 'ignore' } },
        termination: { treeId: route.params.treeId, data: { ...commonParams, control: 'fail' } },
      }
      switch (item.value) {
        case 'detail':
          state.compType = 'TaskJobDetailModal'
          state.compFlag = true
          state.hasTable = true
          state.compConfig = TASK_JOB_DETAIL_MODAL_CONFIG
          state.editItem = {
            item: row,
            title: proxy.$t('taskExecutionLog'),
            slave: state.detailInfo.slave,
            cardUUid: route.params.taskuuid,
            uuid: `${route.params.taskuuid}${row.uuid}${item.type}`,
          }
          break
        case 'confirm':
        case 'shutTask':
        case 'ignore':
        case 'running':
        case 'next':
          ElMessageBox.confirm(state.operateMessage[item.value].message, state.operateMessage[item.value].title, {
            confirmButtonText: state.operateMessage[item.value].btnConfirm ? state.operateMessage[item.value].btnConfirm : proxy.$t('confirm'),
            cancelButtonText: proxy.$t('cancel'),
            type: 'warning'
          }).then(async () => {
            if (apiFun[item.value] && apiParams[item.value]) {
              const dataRet = await apiFun[item.value](apiParams[item.value])
              if (dataRet) {
                getJobStepData()
                proxy.$notification('operationSuccess')
              }
            }
          })
          break
      }
    }

    // 组件成功回调
    const emitSuccess: () => void = (): void => {
      emitClose()
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

    const defaultOperate: () => void = (): void => {
      if (route.query?.jobtype) {
        state.jobType = route.query?.jobtype as string
      }
    }

    onMounted(async () => {
      await getJobStepData()
      await defaultOperate()
      getDetailData()
      handleDetailDataTimer()
    })

    onUnmounted(() => {
      //离开路由之后 清除定时器
      clearTimer('timer')
    })

    return {
      treeId,
      treeData,
      JOBX_GROUP_TABLE_STATUS,
      JOB_TASK_STATUS_BUTTON_GROUP,
      SUB_TASK_OPERATE_MESSAGE_GROUP,
      ...toRefs(state),
      onRefresh,
      backList,
      seftime,
      emitClose,
      taskOperate,
      emitSuccess,
      handleTaskDetail,
      setJobTaskShow,
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


.detail-form {
  :deep(.el-form-item__label) {
    font-size: 12px !important;
  }

  :deep(.el-form-item__content) {
    font-size: 12px !important;
  }
}

.layout-content {
  background-color: var(--color_bg_con);
  padding: 24px 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.log-error-span {
  display: inline-block;
  color: var(--el-color-error);
  margin-left: 10px
}

.log-error-button {
  font-size: 12px;
}
</style>