<template>
  <div class="task-card">

    <div class="task-card-top">
      <el-row class="task-card-row" :gutter="24">
        <el-col class="task-card-row-item" v-for="item in treeTaskData" :key="item.name" :span="6">
          <TaskDataCard :dataItem="item" />
        </el-col>
      </el-row>
    </div>

    <div class="task-card-history">
      <HistoryFigure />
    </div>

    <div class="task-card-statistics">
      <el-row class="task-hard-statistics-row" :gutter="24">
        <el-col class="task-hard-statistics-item" :span="9">
          <RunTime />
        </el-col>
        <el-col class="task-hard-statistics-item" :span="15">
          <TaskTable />
      </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs, computed, watch } from 'vue'
import store from '@/store'
import {
  taskDataLists,
  commonDataLists,
  monthTaskLists,
  crontabTaskLists
} from '@/api/dashboard/index'
import TaskDataCard from './TaskDataCard.vue'
import HistoryFigure from './HistoryFigure.vue'
import RunTime from './RunTimes.vue'
import TaskTable from './TaskTable.vue'
import { taskDataList, DEFAULT_TREE_ID } from './config'
export default {
  components: {
    TaskDataCard,
    HistoryFigure,
    RunTime,
    TaskTable
  },
  setup() {
    const treeId = computed(() => {
      return store.getters.treeId
    })
    const treeData = computed(() => {
      return store.getters.treeData
    })
    const state = reactive({
      treeTaskData: JSON.parse(JSON.stringify(taskDataList))
    })

    // 获取业务主机数
    const getTaskList = async () => {
      const dataRet = await taskDataLists({ treeId: treeId.value })
      state.treeTaskData.filter(item => item.id === 'nodeHosts')[0].total = dataRet.node

    }

    // 获取常用作业数
    const getComminList = async () => {
      const dataRet = await commonDataLists({ treeId: treeId.value })
      state.treeTaskData.filter(item => item.id === 'commonJob')[0].total = dataRet.permanent
    }

    // 获取本月执行任务数
    const monthTaskList = async () => {
      const dataRet = await monthTaskLists({ treeId: treeId.value })
      state.treeTaskData.filter(item => item.id === 'monthTasks')[0].isStatus = true
      state.treeTaskData.filter(item => item.id === 'monthTasks')[0].success = dataRet.success
      state.treeTaskData.filter(item => item.id === 'monthTasks')[0].fail = dataRet.fail
      state.treeTaskData.filter(item => item.id === 'monthTasks')[0].running = dataRet.running
      state.treeTaskData.filter(item => item.id === 'monthTasks')[0].total = (dataRet.success + dataRet.fail + dataRet.running) || 0
    }

    // 获取定时任务数

    const crontabTaskList = async () => {
      const dataRet = await crontabTaskLists({ treeId: treeId.value })
      state.treeTaskData.filter(item => item.id === 'scheduledTasks')[0].isStatus = true
      state.treeTaskData.filter(item => item.id === 'scheduledTasks')[0].unavailable = dataRet.unavailable
      state.treeTaskData.filter(item => item.id === 'scheduledTasks')[0].available = dataRet.available
      state.treeTaskData.filter(item => item.id === 'scheduledTasks')[0].total = (dataRet.unavailable + dataRet.available) || 0
    }

    watch(() => treeId.value, (value) => {
      if (value) {
        getTaskList()
        getComminList()
        crontabTaskList()
        monthTaskList()
      }
    })

    onMounted(() => {
      if (treeId.value!== '') {
        getTaskList()
        getComminList()
        crontabTaskList()
        monthTaskList()
      }
    })
    return {
      ...toRefs(state),
      taskDataList,
      treeId,
      treeData,
      getTaskList
    }
  }
}
</script>

<style lang="scss" scoped>
.task-card {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  &-top {
    width: 101%;
    display: flex;
    justify-content: center;
    align-items: center;

    &-items {
      flex: 1;
      margin: 0 20px;
    }
  }

  &-row {
    width: 100%;
  }

  &-history {
    width: 100%;
    margin: 20px 10px;
  }

  &-statistics {
    width: 100%;
    margin: 20px 10px;
    &-row {
      width: 100%;
    }
  }
}
</style>