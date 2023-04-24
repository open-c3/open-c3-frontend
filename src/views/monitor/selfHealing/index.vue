<template>
  <div class="body-layout1">
    <saas-tabs :label="$t('selfHealingTasks')" class="mt-20"/>
    <div class="df jc_sb mb20">
      <span>{{ $t('laborSaved') }} : {{ hour }}{{ $t('hour') }}</span>
      <el-button @click="getTask" :loading="task.loading" icon="refresh" type="primary"/>
    </div>
    <!-- 已执行的自愈任务 -->
    <Table :thead="task.thead" :data="task.list" :tableLoading="task.loading" :page="task.page" :pageSize="task.pageSize" :total="task.total" :pageChange="page => pageChange(page, 'task')" :pageSizeChange="size => pageSizeChange(size, 'task')">
      <!-- 作业执行状态 -->
      <template #taskstat="{ row }">
        <span :class="row.taskstat === 'success' ? 'c-success' : 'c-error'">{{ row.taskstat }}</span>
      </template>
      <!-- 自愈状态 -->
      <template #healingstat="{ row }">
        <span :class="row.healingstat === 'success' ? 'c-success' : 'c-error'">{{ row.healingstat }}</span>
      </template>
      <template #operate="{ row }">
        <!-- 查看作业 -->
        <el-button @click="openJOBHistory(row.taskuuid)" link type="primary">{{ $t('viewJob')}}</el-button>
      </template>
    </Table>
    <saas-tabs :label="$t('selfHealingConfig')"/>
    <p class="tr">
      <el-button @click="info = null; addFlag = true;" :loading="task.loading" icon="plus" type="primary">{{ $t('addSelfHealing') }}</el-button>
      <el-button @click="getConfig" :loading="task.loading" icon="refresh" type="primary"/>
    </p>
    <!-- 自愈套餐配置 -->
    <Table :thead="config.thead" :data="config.list" :tableLoading="config.loading" :page="config.page" :pageSize="config.pageSize" :total="config.total" :pageChange="page => pageChange(page, 'config')" :pageSizeChange="size => pageSizeChange(size, 'config')">
      <template #operate="{ row }">
        <el-button @click="info = row; addFlag = true;" link type="primary">{{ $t('edit') }}</el-button>
        <el-button @click="deleteFun(row)" link type="primary">{{ $t('delete') }}</el-button>
      </template>
    </Table>
  </div>
  <add-config v-if="addFlag" v-model="addFlag" :info="info" @close="addFlag = false" @addSuccess="getConfig"/>
</template>
<script lang="ts">
import { onMounted, reactive, toRefs, getCurrentInstance } from 'vue'
import Table from '@/components/table/index.vue'
import addConfig from '@/views/monitor/selfHealing/add.vue'
import { ElMessageBox } from 'element-plus'
import { getSelfHealingConfig, getSelfHealingTask, deleteSelfHealing } from '@/api/monitor/selfHealing'
import { TASK_THEAD_CONFIG, THEAD_CONFIG } from './config'
import { g_url } from '@/utils/index'
export default {
  components: { Table, addConfig },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      hour: '',
      task: { // 已执行的自愈任务
        thead: TASK_THEAD_CONFIG,
        page: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        list: [],
        allList: []
      },
      config: { // 自愈套餐配置
        thead: THEAD_CONFIG,
        page: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        list: [],
        allList: []
      },
      addFlag: false,
      info: null
    })
    const pageChange = (page, type) => {
      state[type].page = page
      state[type].list = state[type].allList.slice((state[type].page - 1) * state[type].pageSize, state[type].page * state[type].pageSize)
    }
    const pageSizeChange = (size, type) => {
      state[type].pageSize = size
      pageChange(1, type)
    }
    const getTask = () => {
      state.task.loading = true
      getSelfHealingTask().then((res: any) => {
        state.task.allList = res.data.reverse()
        state.task.total = res.data.length
        state.hour = res.time
        pageChange(1, 'task')
      }).finally(() => {
        state.task.loading = false
      })
    }
    const getConfig = () => {
      state.config.loading = true
      getSelfHealingConfig().then((res: any) => {
        state.config.allList = res.reverse()
        state.config.total = res.length
        pageChange(1, 'config')
      }).finally(() => {
        state.config.loading = false
      })
      state.addFlag = false
    }
    // 查看作业
    const openJOBHistory = ( uuid ) => {
      window.open(`${g_url}/#/history/jobdetail/0/${uuid}`, '_blank')
    }
    // 删除
    const deleteFun = (row) => {
      ElMessageBox.confirm(proxy.$t('deleteSelfHealing'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        deleteSelfHealing(row.id).then(res => {
          getConfig()
          proxy.$notification('success')
        })
      }).catch(() => {})
    }
    onMounted(() => {
      getTask()
      getConfig()
    })
    return {
      ...toRefs(state),
      pageChange,
      pageSizeChange,
      deleteFun,
      getTask,
      getConfig,
      openJOBHistory
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
