<template>
  <div v-loading="loading" class="body-layout1 monitor-report">
    <div class="df">
      <!-- 告警等级 -->
      <el-card v-for="(item, index) in  monitorList" :key="index" :class="`monitor-card monitor-card${index}`">
          <template #header>
            <span>{{ item.title }}</span>
          </template>
          <div class="tc f24">{{ item.num }}</div>
        </el-card>
    </div>
    <!-- 标签 -->
    <el-card class="monitor-card mt20 btn-base">
      <template #header>
        <span>{{ $t('tag') }}</span>
        <!-- <el-icon><Refresh /></el-icon> -->
      </template>
      <p>{{ $t('dataLatestUpdateTime') }} {{ updateTime }}</p>
      <p>
        {{ $t('data') }}
        <el-select v-model="date" @change="getReportData">
          <el-option v-for="item in timeList" :key="item" :label="item" :value="item"/>
        </el-select>
      </p>
    </el-card>
    <div class="monitor-config-content">
      <!-- 告警状况 -->
      <status-line :change-data="changeData"/>
      <div class="df">
        <level-pie :pingtu1="pingtu1" class="pie1"/>
        <instance-pie :pingtu2="pingtu2" class="pie2"/>
      </div>
      <div class="df">
        <name-pie :pingtu3="pingtu3" class="pie1"/>
        <instance-name-pie :pingtu4="pingtu4" class="pie2"/>
      </div>
      <!-- 详情 -->
      <el-card class="monitor-card mt20 btn-base">
        <template #header>
          <span>{{ $t('detail') }}</span>
        </template>
        <Table :thead="thead" :data="detail.list" :page="detail.page" :pageSize="detail.pageSize" :total="detail.total" :pageChange="page=>pageChange(page, 'detail')" :pageSizeChange="size =>pageSizeChange(size, 'detail')" :tableLoading="detail.loading"/>
      </el-card>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, computed, watch } from 'vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import statusLine from '@/views/monitor/report/components/statusLine.vue'
import levelPie from '@/views/monitor/report/components/levelPie.vue'
import instancePie from '@/views/monitor/report/components/instancePie.vue'
import namePie from '@/views/monitor/report/components/namePie.vue'
import instanceNamePie from '@/views/monitor/report/components/instanceNamePie.vue'
import { getMonReportTimeList, getMonReportData } from '@/api/monitor/report'
export default {
  components: { levelPie, statusLine, instancePie, namePie, instanceNamePie, Table },
  setup () {
    const { proxy } = getCurrentInstance()
    const thead = [
      { prop: 'time', label: 'timeTxt', align: 'center' },
      { prop: 'fromtreeid', label: 'treeID', align: 'center' },
      { prop: 'severity', label: 'alarmLevel', align: 'center' },
      { prop: 'instance', label: 'instance', align: 'center' },
      { prop: 'alertname', label: 'alarmName', align: 'center', width: 220 }
    ]
    const treeId = computed(() => {
      return store.getters.treeId
    })
    const state = reactive({
      loading: false,
      monitorList: [
        { title: proxy.$t('level1Alarm'), num: 0 },
        { title: proxy.$t('level2Alarm'), num: 0 },
        { title: proxy.$t('level3Alarm'), num: 0 },
        { title: proxy.$t('level4Alarm'), num: 0 }
      ],
      updateTime: '',
      timeList: [],
      date: '',
      detail: {
        page: 1,
        pageSize: 100,
        total: 0,
        list: [],
        allList: [],
        loading: false
      },
      changeData: [],
      pingtu1: [],
      pingtu2: [],
      pingtu3: [],
      pingtu4: []
    })
    // 获取时间列表
    const getTimeList = () => {
      getMonReportTimeList(treeId.value).then((res: any) => {
        state.timeList = res
      })
    }
    const getReportData = () => {
      state.loading = true
      const date = state.date === '' ? 'current' : state.date
      getMonReportData(treeId.value, date).then((res: any) => {
        state.monitorList[0].num = res.count1
        state.monitorList[1].num = res.count2
        state.monitorList[2].num = res.count3
        state.monitorList[3].num = res.count4
        state.updateTime = res.updatetime
        state.detail.allList = res.detailtable.reverse()
        state.detail.total = res.detailtable.length
        pageChange(1, 'detail')
        state.changeData = res.change
        state.pingtu1 = res.pingtu1
        state.pingtu2 = res.pingtu2
        state.pingtu3 = res.pingtu3
        state.pingtu4 = res.pingtu4
        state.loading = false
      })
    }
    const pageChange = (page, type) => {
      state[type].page = page
      state[type].list = state[type].allList.slice((state[type].page - 1) * state[type].pageSize, state[type].page * state[type].pageSize)
    }
    const pageSizeChange = (size, type) => {
      state[type].pageSize = size
      pageChange(1, type)
    }
    watch(() => treeId.value, val => {
      state.date = ''
      getTimeList()
      getReportData()
    }, {
      immediate: true,
      deep: true
    })
    return {
      ...toRefs(state),
      thead,
      pageChange,
      pageSizeChange,
      getReportData
    }
  }
}
</script>
<style lang="scss" scoped>
.monitor-report{
  .monitor-card1,.monitor-card2, .monitor-card0{
    width: calc((100% - 60px) / 4);
    margin-right: 20px;
  }
  .monitor-card3{
    width: calc((100% - 60px) / 4);
  }
  .pie1{
    width: calc((100% - 20px) / 2);
    margin-right: 20px;
  }
  .pie2{
    width: calc((100% - 20px) / 2);
  }
}

</style>
