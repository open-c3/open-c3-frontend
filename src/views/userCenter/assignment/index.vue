
<template>
  <div class="body-layout1">
    <saas-tabs v-model="activeName" :tabs="tabs" class="mt-20" />
    <search-from :params="commonConfig[activeName].params" :config="commonConfig[activeName].config" @reset="reset"
      @query="getAssignData(activeName)" />
    <el-divider class="costv-divider mt16 mb16" />

    <Table :thead="commonConfig[activeName].tableConfig.thead" :data="commonConfig[activeName].tableConfig.list"
      :tableLoading="commonConfig[activeName].tableConfig.loading" :page="commonConfig[activeName].tableConfig.page"
      :pageSize="commonConfig[activeName].tableConfig.pageSize" :total="commonConfig[activeName].tableConfig.total"
      :pageChange="pageChange" :pageSizeChange="pageSizeChange" row-id="id" class="mt20">
      <!-- 处理人-->
      <template #handler="{ row }">
        <div>{{ row.handler || '-' }}</div>
      </template>

      <!-- 提交人 -->
      <template #submitter="{ row }">
        <div>{{ row.submitter || '-' }}</div>
      </template>

      <!-- 耗时 -->
      <template #seftime="{ row }">
        <div>{{ seftime(row.create_time, row.finish_time) }}</div>
      </template>

      <template #status="{ row }">
        <div :style="`color:${ASSIGNMENT_STATUS_MAP[row.status].color}`">
          {{ ASSIGNMENT_STATUS_MAP[row.status].text }}
        </div>
      </template>

      <!-- 操作 -->
      <template #operate="{ row }">
        <div v-if="activeName === 'byme'">
          <el-button link type="primary" @click="operate(activeName, row, 'detail')">{{ $t('detail') }}</el-button>
          <el-button :disabled="row.status !== 'todo'" link type="primary" @click="operate(activeName, row, 'cancel')">
            {{ $t('config_options_cancel') }}
          </el-button>
        </div>
        <div v-else-if="activeName === 'tome'">
          <el-button link type="primary" @click="operate(activeName, row, 'detail')">
            {{ $t('detail') }}
          </el-button>
          <el-button :disabled="row.status !== 'todo'" link type="primary" @click="operate(activeName, row, 'todo')">{{
            $t('submit') }}</el-button>
          <el-button :disabled="row.status !== 'todo'" link type="primary" @click="operate(activeName, row, 'refuse')">
            {{ $t('refuse') }}
          </el-button>
          <el-button :disabled="row.status !== 'fail'" link type="primary" @click="operate(activeName, row, 'fail')">
            {{ $t('retry') }}
          </el-button>
          <el-button :disabled="row.status !== 'fail'" link type="primary" @click="operate(activeName, row, 'close')">
            {{ $t('close') }}
          </el-button>
        </div>
      </template>
    </Table>
  </div>
  <component :is="compType" :treeId="String(treeId)" :treeData="treeData" :config="compConfig" :editItem="editItem"
    @close="compFlag = false" @success="success" v-if="compFlag" v-model="compFlag" />
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted, computed, watch } from 'vue'
import store from '@/store'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import AssignMentDetail from './operate/AssignMentDetail.vue'
import { ElMessageBox } from 'element-plus'

import {
  TABS_CONFIG,
  ASSIGNMENT_STATUS_MAP,
  THEAD_BY_ME_CONFIG,
  THEAD_TO_ME_CONFIG,
  SEARCH_TO_ME_CONFIG,
  SEARCH_BY_ME_CONFIG,
  ASSIGNMENT_DIALOG_CONFIG,
  ASSIGNMENT_OPERATE_DIALOG,
} from './config'
import { filterAry, deepClone, seftime } from '@/utils/index'

import {
  getAssignList,
  getAssignCommit,
  getAssignOperate,
  setCustomize
} from '@/api/userCenter/assignment'

import {
  ICustonizeData,
  IAssignmentOperateData,
  IAssignmentOperateDetailData
} from '@/api/interface/userCenter'

export default {
  components: { searchFrom, Table, AssignMentDetail },
  setup() {
    const { proxy } = getCurrentInstance()

    const treeId = computed(() => {
      return store.getters.treeId
    })
    const treeData = computed(() => {
      return store.getters.treeData
    })

    const state = reactive({
      activeName: 'byme' as 'byme' | 'tome',
      tabs: TABS_CONFIG,
      commonConfig: {
        byme: {
          config: deepClone(SEARCH_BY_ME_CONFIG),
          params: {
            create_time: '',
            finish_time: '',
            handler: '',
            name: '',
            submitter: '',
          },
          tableConfig: {
            loading: false,
            thead: THEAD_BY_ME_CONFIG,
            total: 0,
            list: [],
            allList: [],
            filterList: [],
            page: 1,
            pageSize: 10
          },
        },
        tome: {
          config: deepClone(SEARCH_TO_ME_CONFIG),
          params: {
            create_time: '',
            finish_time: '',
            handler: '',
            name: '',
            submitter: '',
          },
          tableConfig: {
            loading: false,
            thead: THEAD_TO_ME_CONFIG,
            total: 0,
            list: [],
            allList: [],
            filterList: [],
            page: 1,
            pageSize: 10
          },
        },
      },
      compType: '',
      compFlag: false,
      editItem: {} as any,
      compConfig: ASSIGNMENT_DIALOG_CONFIG,

    })
    // 筛选
    const getFilterList: () => void = (): void => {
      state.commonConfig[state.activeName].tableConfig.filterList = filterAry(state.commonConfig[state.activeName].tableConfig.allList, state.commonConfig[state.activeName].params)
      state.commonConfig[state.activeName].tableConfig.total = state.commonConfig[state.activeName].tableConfig.filterList.length
      pageChange(1)
    }
    const pageChange: (page: number) => void = (page: number): void => {
      state.commonConfig[state.activeName].tableConfig.page = page
      state.commonConfig[state.activeName].tableConfig.list = state.commonConfig[state.activeName].tableConfig.filterList.slice((state.commonConfig[state.activeName].tableConfig.page - 1) * state.commonConfig[state.activeName].tableConfig.pageSize, state.commonConfig[state.activeName].tableConfig.page * state.commonConfig[state.activeName].tableConfig.pageSize)
    }
    const pageSizeChange: (pageSize: number) => void = (pageSize: number): void => {
      state.commonConfig[state.activeName].tableConfig.pageSize = pageSize
      pageChange(1)
    }

    // 获取所有数据
    const getAssignData: (activeName: 'byme' | 'tome') => Promise<void> = async (activeName: 'byme' | 'tome'): Promise<void> => {
      state.commonConfig[activeName].tableConfig.loading = true
      const dataRet = await getAssignList({ activeName }).catch(err => { state.commonConfig[activeName].tableConfig.loading = false }) as unknown as Array<any>
      if (dataRet) {
        state.commonConfig[activeName].tableConfig.loading = false
        state.commonConfig[activeName].tableConfig.allList = dataRet.reverse()
        getFilterList()
      }
    }

    // 重置
    const reset: () => void = (): void => {
      state.commonConfig[state.activeName].params = {
        create_time: '',
        finish_time: '',
        handler: '',
        name: '',
        submitter: '',
      }
      getAssignData(state.activeName)
    }

    // 操作
    const operate: (activeName: 'byme' | 'tome', row: any, type: string) => void = (activeName: 'byme' | 'tome', row: any, type: string): void => {
      if (type === 'detail') {
        state.compConfig = { ...deepClone(ASSIGNMENT_DIALOG_CONFIG), noFooter: activeName === 'byme' ? true : false }
        state.compFlag = true
        state.compType = 'AssignMentDetail'
        state.editItem = {
          title: `${proxy.$t('name')}: ${row.name}`,
          item: row,
          type: activeName
        }
        return
      }
      ElMessageBox.confirm(ASSIGNMENT_OPERATE_DIALOG[type].description, ASSIGNMENT_OPERATE_DIALOG[type].title, {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(async () => {
        if (['todo', 'fail'].includes(type)) {
          const params: IAssignmentOperateData = { id: row.id }
          const dataRet = await getAssignCommit(params)
          if (dataRet) {
            if (dataRet.data?.status === type) {
              const cusParams: ICustonizeData = {
                api: row.url,
                data: row.data as any
              }
              const customizeDataRet = await setCustomize(cusParams)
              if (customizeDataRet) {
                if (customizeDataRet.stat) {
                  await updateStatus(row.id, 'success')
                } else {
                  await updateStatus(row.id, 'fail')
                }
              }
            }
          }
        }
        if (['refuse', 'close', 'cancel'].includes(type)) {
          updateStatus(row.id, type)
        }
      }).catch(() => { })
    }

    const updateStatus: (id: string, type: string) => Promise<void> = async (id: string, type: string): Promise<void> => {
      const params: IAssignmentOperateDetailData = { id: id, data: { status: type } }
      const dataRet = await getAssignOperate(params)
      if (dataRet) {
        proxy.$notification('operationSuccess')
        if (dataRet.stat) {
          await getAssignData(type === 'cancel' ? 'byme' : 'tome')
        }
      }

    }

    //  组件操作回调
    const success: () => void = (): void => {
      state.compFlag = false
      getAssignData(state.activeName)
    }

    onMounted(() => {
      getAssignData('byme')
      // getAssignData('tome')
    })

    watch(() => state.activeName, (value) => {
      state.commonConfig[value].params = {
        create_time: '',
        finish_time: '',
        handler: '',
        name: '',
        submitter: '',
      }
      getAssignData(value)
    })

    return {
      treeId,
      treeData,
      ASSIGNMENT_STATUS_MAP,
      seftime,
      ...toRefs(state),
      getAssignData,
      reset,
      pageChange,
      pageSizeChange,
      success,
      operate,
    }
  }
}
</script>
<style lang="scss" scoped></style>
