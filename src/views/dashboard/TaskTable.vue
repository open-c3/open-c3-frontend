<template>
  <div class="box-card">
    <div class="box-card-title">
      <div class="box-card-title-left">{{ $t('recentTask') }}</div>
      <div class="box-card-title-right" @click="onOpenJob">
        {{$t('more')}}
        <svg-icon icon-class="mores" class="draw-more mr20" />
        </div>
    </div>
    <el-divider class="costv-divider m0" />
    <div class="box-card-content">
      <Table :thead="TASK_TABLE_THEAD" :data="lastList">
        <!-- 执行用户 -->
        <template #user="{ row }">
          <div>{{ row.user }}</div>
        </template>

        <!-- 开始时间 -->
        <template #starttime="{ row }">
          <div>{{ row.starttime }}</div>
        </template>

        <!-- 结束时间 -->
        <template #finishtime="{ row }">
          <div>{{ row.finishtime }}</div>
        </template>

        <!-- 耗时 -->
        <template #finishtimes="{ row }">
          <div>{{seftime(row.starttime, row.finishtime)}}</div>
        </template>

        <!-- 当前状态 -->
        <template #status="{ row }">
          <div :style="`background-color:${TASK_TABLE_STATUS_MAP[row.status]?.color}`" class="table-status"></div>
          <span
            :style="`color:${TASK_TABLE_STATUS_MAP[row.status]?.color}`">{{ TASK_TABLE_STATUS_MAP[row.status]?.name }}</span>
        </template>
        <!-- 作业名称 -->
        <template #name="{ row }">
          <div v-if="groupsList[row.name]">{{ groupsList[row.name]}} </div>
          <div v-else>{{ row.name }}</div>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, watch, reactive, computed } from 'vue'
import moment from 'moment'
import router from '@/router/index'

import { seftime } from '@/utils/index'
import Table from '@/components/table/index.vue'
import { analysisLastTableLists, analysisGroupLists } from '@/api/dashboard/index'
import { TASK_TABLE_THEAD, TASK_TABLE_STATUS_MAP } from './config'
import store from '@/store'

export default defineComponent({
  components: {
    Table
  },
  setup() {
    const treeId = computed(() => {
      return store.getters.treeId
    })

    const state = reactive({
      lastList: [], 
      groupsList: {} 
    })

    // 获取任务执行记录数据
    const getTaskTableList = async () => {
      const dataRet = await analysisLastTableLists({ treeId: treeId.value })
      state.lastList = dataRet
    }

    // 获取CI组信息
    const getCiGroupList = async () => {
      const dataRet = await analysisGroupLists({ treeId: treeId.value })
      dataRet.forEach(item => {
        state.groupsList[`_ci_${item.id}_`] = item.name
      })
    }

    // 跳转作业任务
    const onOpenJob = () => {
        router.push('/history/job')
    }

    onMounted(() => {
      if (treeId.value!=='') {
        getTaskTableList()
        getCiGroupList()
      }
    })

    watch(() => treeId.value, (value) => {
      if (value!== '') {
        getTaskTableList()
        getCiGroupList()
      }
    })
    return {
      moment,
      seftime,
      ...toRefs(state),
      TASK_TABLE_THEAD,
      TASK_TABLE_STATUS_MAP,
      onOpenJob
    }
  }
})

</script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
  border-radius: 8px;
  background-color: var(--color_bg);

  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color_text_menu_2);
    padding: 16px;
      font-size: 16px;
      line-height: 22px;
    &-left {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-right {
      font-size: 12px;
      cursor: pointer;
    }
  }

  &-content {
    width: 100%;
    height: 400px;
    border-radius: 8px;
    padding: 20px 10px 40px 10px;
    overflow: auto;
  }
}
.draw-more {
  width: 16px;
  height: 16px;
}
.table-status {
  width: 8px;
  height: 8px;
  border-radius: 100%;
  display: inline-block;
  margin-right: 10px;
}
</style>