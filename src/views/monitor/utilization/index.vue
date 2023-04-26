<template>
  <div class="body-layout1 monitor-utilization">
    <!-- 利用率低 -->
    <div class="df">
      <el-card v-for="(item, index) in  monitorList" :key="index" :class="`monitor-card monitor-card${index} ${item.class}`">
        <template #header>
          <span>{{ item.title }}</span>
        </template>
        <div @click="statusChange(item.status)" class="tc f24">{{ item.num }}</div>
      </el-card>
    </div>
    <saas-tabs :label="$t('lowResourceUtilization')"/>
    <search-from :params="params" :config="config" @reset="searchReset" @query="getData"/>
    <Table :thead="thead" :data="utilization.list" :page="utilization.page" :pageSize="utilization.pageSize" :total="utilization.total" :pageChange="pageChange" :tableLoading="utilization.loading">
      <template #status="{ row }">
        <div v-if="row.status === 'low'" class="c-error">{{ row.status }}</div>
        <div v-else-if="row.status === 'warn'" class="c-warning">{{ row.status }}</div>
        <div v-else-if="row.status === 'normal'" class="c-success">{{ row.status }}</div>
        <div v-else>unknown</div>
      </template>
      <!-- 下载 -->
      <template #netin="{ row }">
        <div v-if="row.netin < 1024">{{ row.netin.toFixed(2) }} b/s</div>
        <div v-else-if="row.netin < 1024*1024">{{ (row.netin / 1024).toFixed(2) }} kb/s</div>
        <div v-else>{{ (row.netin / 1024 / 1024).toFixed(2) }} Mb/s</div>
      </template>
      <!-- 上传 -->
      <template #netout="{ row }">
        <div v-if="row.netout < 1024">{{ row.netout.toFixed(2) }} b/s</div>
        <div v-else-if="row.netout < 1024*1024">{{ (row.netout / 1024).toFixed(2) }} kb/s</div>
        <div v-else>{{ (row.netout / 1024 / 1024).toFixed(2) }} Mb/s</div>
      </template>
      <template #operate="{ row }">
        <el-button @click="detailInfo = row; flag = true" type="primary" link>{{ $t('detail')}}</el-button>
        <!-- 查看图表 -->
        <el-button @click="openChart(row)" type="primary" link>{{ $t('viewChart') }}</el-button>
      </template>
    </Table>
  </div>
  <div class="monitor-config df">
    <Detail v-if="flag" v-model="flag" :detail-info="detailInfo" @cancel="flag = false"/>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, computed, watch } from 'vue'
import Table from '@/components/table/index.vue'
import searchFrom from '@/components/search/index.vue'
import store from '@/store'
import Detail from '@/views/monitor/utilization/detail.vue'
import { SEARCH_CONFIG, THEAD_CONFIG } from './config'
import { getNodeLow } from '@/api/monitor/utilization'
import { g_url } from '@/utils/index'
export default {
  components: { Table, searchFrom, Detail },
  setup () {
    const { proxy } = getCurrentInstance()
    const treeId = computed(() => {
      return store.getters.treeId
    })
    const state = reactive({
      config: SEARCH_CONFIG,
      thead: THEAD_CONFIG,
      monitorList: [
        { title: proxy.$t('lowUtilization') + ':low', num: 0, class: 'c-error', status: 'low' },
        { title: proxy.$t('warn') + ':warn', num: 0, class: 'c-warning', status: 'warn' },
        { title: proxy.$t('normal') + ':normal', num: 0, class: 'c-success', status: 'normal' },
        { title: proxy.$t('unknown') + ':unknown', num: 0, class: '', status: 'unkown' }
      ],
      params: {
        name: '', // 主机名
        inip: '', // 内网ip
        exip: '', // 外网ip
        status: ''
      },
      utilization: {
        page: 1,
        pageSize: 10,
        total: 0,
        list: [],
        allList: [],
        loading: false,
        filterList: []
      },
      flag: false,
      detailInfo: null
    })
    const filterList = () => {
      state.utilization.filterList = state.utilization.allList.filter(item => {
        if (item.name.includes(state.params.name) && (item.inip === null || item.inip.includes(state.params.inip)) && (state.params.status === '' || item.status === state.params.status) && (item.exip === null || item.exip.includes(state.params.exip))) {
          return true
        } else {
          return false
        }
      })
      state.utilization.total = state.utilization.filterList.length
      pageChange(1)
    }
    const pageChange = (page) => {
      state.utilization.page = page
      state.utilization.list = state.utilization.filterList.slice((state.utilization.page - 1) * state.utilization.pageSize, state.utilization.page * state.utilization.pageSize)
    }
    const pageSizeChange = (size) => {
      state.utilization.pageSize = size
      pageChange(1)
    }
    const statusChange = (status) => {
      state.params.status = status
      pageChange(1)
    }
    const searchReset = () => {
      state.params.name = ''
      state.params.inip = ''
      state.params.exip = ''
      state.params.status = ''
      getData()
    }
    const getData = () => {
      state.utilization.loading = true
      getNodeLow(treeId.value).then((res: any) => {
        state.utilization.loading = false
        state.utilization.allList = res.reverse()
        const low = state.utilization.allList.filter(item => item.status === 'low')
        const warn = state.utilization.allList.filter(item => item.status === 'warn')
        const normal = state.utilization.allList.filter(item => item.status === 'normal')
        const unkown = state.utilization.allList.filter(item => item.status === 'unkown')
        state.monitorList[0].num = low ? low.length : 0
        state.monitorList[1].num = warn ? warn.length : 0
        state.monitorList[2].num = normal ? normal.length : 0
        state.monitorList[3].num = unkown ? unkown.length : 0
        filterList()
      })
    }
    // 查看图表
    const openChart = (row) => {
      window.open(`${g_url}/third-party/monitor/grafana/d/rYdddlPWk/node-exporter-full?orgId=1&from=now-14d&to=now&var-DS_PROMETHEUS=default&var-job=openc3&var-node=${row.inip}&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B`)
    }
    watch(() => treeId.value, val => {
      getData()
    }, {
      immediate: true,
      deep: true
    })
    return {
      ...toRefs(state),
      getData,
      pageChange,
      pageSizeChange,
      statusChange,
      filterList,
      searchReset,
      openChart
    }
  }
}
</script>
<style lang="scss" scoped>
.monitor-utilization{
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
