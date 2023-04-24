<template>
  <div class="body-layout1">
    <saas-tabs :label="$t('onCallManage')" class="mt-20"/>
    <p class="tr">
      <!-- 添加告警值班组 -->
      <el-button @click="groupInfo = null; addGroupFlag = true" type="primary" icon="plus">{{ $t('addAlarmCall') }}</el-button>
      <el-button @click="getOnCallData" :loading="onCall.loading" icon="refresh" type="primary"/>
    </p>
    <Table :thead="thead" :data="onCall.list" :tableLoading="onCall.loading" :page="onCall.page" :pageSize="onCall.pageSize" :total="onCall.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange">
        <template #operate="{ row }">
          <!-- 值班表 -->
          <el-button @click="groupInfo = row; dutyScheduleFlag = true" link type="primary">{{ $t('onCallTable')}}</el-button>
          <!-- 值班日历 -->
          <el-button @click="groupInfo = row; addCalendarFlag = true" link type="primary">{{ $t('dutyDay')}}</el-button>
          <el-button @click="groupInfo = row; addGroupFlag = true;" link type="primary">{{ $t('edit') }}</el-button>
          <el-button @click="deleteFun(row)" link type="primary">{{ $t('delete') }}</el-button>
        </template>
      </Table>
  </div>
  <add-group v-if="addGroupFlag" v-model="addGroupFlag" :group-info="groupInfo" @cancel="addGroupFlag = false" @addGroupSuccess="getOnCallData"/>
  <!-- 值班日历 -->
  <add-calendar v-if="addCalendarFlag" v-model="addCalendarFlag" :group-info="groupInfo" @cancel="addCalendarFlag = false"/>
  <!-- 值班表 -->
  <duty-schedule v-if="dutyScheduleFlag" v-model="dutyScheduleFlag" :group-info="groupInfo" @cancel="dutyScheduleFlag = false"/>
</template>
<script lang="ts">
import { onMounted, reactive, toRefs, getCurrentInstance } from 'vue'
import Table from '@/components/table/index.vue'
import addGroup from '@/views/monitor/onCall/components/addGroup.vue'
import addCalendar from '@/views/monitor/onCall/components/addCalendar.vue'
import dutySchedule from '@/views/monitor/onCall/components/dutySchedule.vue'
import { getConfigOnCall, deleteOnCallGroup } from '@/api/monitor/onCall'
import { ElMessageBox } from 'element-plus'
import { THEAD_CONFIG } from './config'
export default {
  components: { Table, addGroup, dutySchedule, addCalendar},
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      thead: THEAD_CONFIG,
      onCall: { // 值班表管理
        page: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        list: [],
        allList: []
      },
      list: [],
      params: {},
      addGroupFlag: false,
      groupInfo: null,
      addCalendarFlag: false,
      dutyScheduleFlag: false
    })
    const pageChange = (page) => {
      state.onCall.page = page
      state.onCall.list = state.onCall.allList.slice((state.onCall.page - 1) * state.onCall.pageSize, state.onCall.page * state.onCall.pageSize)
    }
    const pageSizeChange = (size) => {
      state.onCall.pageSize = size
      pageChange(1)
    }
    // 获取组列表
    const getOnCallData = () => {
      state.onCall.loading = true
      const list = []
      getConfigOnCall().then((res: any) => {
        res.forEach(item => {
          list.push(item)
        })
        state.onCall.allList = list.reverse()
        state.onCall.total = list.length
        pageChange(1)
      }).finally(() => {
        state.onCall.loading = false
      })
      state.addGroupFlag = false
    }
    // 删除
    const deleteFun = (row) => {
      ElMessageBox.confirm(proxy.$t('deleteOnCall'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        deleteOnCallGroup(row.id).then(res => {
          getOnCallData()
          proxy.$notification('success')
        })
      }).catch(() => {})
    }
    onMounted(() => {
      getOnCallData()
    })
    return {
      ...toRefs(state),
      pageChange,
      pageSizeChange,
      getOnCallData,
      deleteFun
    }
  }
}
</script>
<style lang="scss" scoped>
.monitor-config{
  width: 100%;
  .monitor-config-content{
    width: calc(100% - 140px);
  }
}

</style>
