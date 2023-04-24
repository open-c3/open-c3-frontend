<template>
  <div class="body-layout1">
    <saas-tabs :label="$t('currentAlarm')" class="mt-20"/>
    <p class="tr">
      <el-button @click="refresh" icon="refresh" type="primary"/>
    </p>
    <Table :thead="thead" :data="list" :tableLoading="alarm.loading" :page="alarm.page" :pageSize="alarm.pageSize" :total="alarm.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange" :border="true">
      <!-- 名称 -->
      <template #alertname="{ row }">
        {{ row.labels.alertname }}
      </template>
      <!-- 监控对象 -->
      <template #instance="{ row }">
        {{ row.labels.instance }}
      </template>
      <template #status="{ row }">
        {{ row.status.state }}
      </template>
      <!-- 概要 -->
      <template #summary="{ row }">
        {{ row.annotations.summary }}
      </template>
      <template #value="{ row }">
        {{ row.annotations.value }}
      </template>
      <!-- 关联工单 -->
      <template #bindTT="{ row }">
        <template v-if="bindTT[row.uuid]">
          <el-button v-for="item in bindTT[row.uuid]" @click="goToCase(row, item)" link type="primary">{{ item }}</el-button>
        </template>
      </template>
      <template #operate="{ row }">
        <!-- 转工单 -->
        <el-button link @click="alarmTransferOrder(row)" type="primary">{{ $t('toCase') }}</el-button>
        <!-- 查看图表 -->
        <el-button link @click="viewChart(row)" type="primary">{{ $t('viewChart') }}</el-button>
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
import { getCurrentInstance, reactive, toRefs, computed, watch } from 'vue'
import Table from '@/components/table/index.vue'
import Dialog from '@/components/dialog/index.vue'
import store from '@/store'
import { getMonitorAlertList, getMonitorAlertTottbind, toCase, transferOrder } from '@/api/monitor/index'
import { THEAD } from './config'
import { ElMessageBox } from 'element-plus'
import { g_url } from '@/utils/index'
export default {
  components: { Dialog, Table },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      thead: THEAD,
      allList: [],
      list: [],
      alarm: {
        loading: false,
        page: 1,
        pageSize: 10,
        total: 0
      },
      bindTT: {}
    })
    const treeId = computed(() => {
      return store.getters.treeId
    })
    // 获取当前告警列表
    const getData = (page?) => {
      state.alarm.loading = true
      getMonitorAlertList(treeId.value).then((res: any) => {
        state.allList = res
        state.alarm.total = res.length
        const curPage = page ? page : 1
        pageChange(curPage)
        state.alarm.loading = false
      })
    }
    // 获取工单列表
    const getTottbind = () => {
      getMonitorAlertTottbind(treeId.value).then(res => {
        state.bindTT = res
      })
    }
    const pageChange = (page: number) => {
      state.alarm.page = page
      state.list = state.allList.slice((state.alarm.page - 1) * state.alarm.pageSize, state.alarm.page * state.alarm.pageSize)
    }
    const pageSizeChange = (pageSize: number) => {
      state.alarm.pageSize = pageSize
      pageChange(1)
    }
    // 打开工单页面
    // 暂时没有工单 跳出打开老的工单
    // http://demo01.openc3.polymericcloud.com/tt/#/tt/show/TT0000000007
    const goToCase = (row, item) => {
      console.log(row)
      console.log(item)
      toCase({
        uuid: row.uuid,
        caseuuid: item
      }).then(res => {
        window.open(g_url + res, '_blank')
      })
    }
    // 查看图表
    const viewChart = (row) => {
      window.open(row.generatorURL, '_blank')
    }
    // 刷新
    const refresh = () => {
      getTottbind()
      getData()
    }
    // 转工单
    const alarmTransferOrder = (row) => {
      ElMessageBox.confirm(proxy.$t('monitorTransferOrder'), proxy.$t('submitTicket'), {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        transferOrder(row).then(res => {
          getData(state.alarm.page)
          getTottbind()
        })
      }).catch(() => {})
    }
    watch(() => treeId.value, val => {
      refresh()
    }, {
      immediate: true
    } )
    return {
      ...toRefs(state),
      getData,
      pageChange,
      pageSizeChange,
      goToCase,
      refresh,
      viewChart,
      alarmTransferOrder
    }
  }
}
</script>