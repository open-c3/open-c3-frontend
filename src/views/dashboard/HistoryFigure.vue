<template>
  <div class="box-card">
    <div class="box-card-title">{{ $t('historyFigure') }}</div>
    <el-divider class="costv-divider m0" />
    <div class="box-card-content">
      <div ref="chart" class="charts" id="charts"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, toRefs, watch, reactive, computed } from 'vue'
import * as echarts from 'echarts'
import { EleResize } from '@/utils/esresize'
import { analysisDateLists } from '@/api/dashboard/index'
import store from '@/store'
import { CHART_COLORS } from './config'
type EChartsOption = echarts.EChartsOption;

export default defineComponent({
  setup(props) {

    let option: EChartsOption;

    const { proxy } = getCurrentInstance()

    const treeId = computed(() => {
      return store.getters.treeId
    })

    const state = reactive({
      chartsXData: [],     // x轴数组
      chartsExcData: [],   // 执行成功数组
      chartsTotalData: [], // 总数数组
    })

    // 获取历史任务图表数据
    const getHistoryDateList = async () => {
      const dataRet = await analysisDateLists({ treeId: treeId.value })
      state.chartsXData = dataRet.map(item => { return item[0] })
      state.chartsExcData = dataRet.map(item => { return item[1] })
      state.chartsTotalData = dataRet.map(item => { return item[2] })
    }

    const setCharts = () => {
      const charts = document.getElementById('charts')
      const myChart = echarts.init(charts);
      option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [proxy.$t('executionSuccess'), proxy.$t('total')]
        },
        color: CHART_COLORS,
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [...state.chartsXData]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: proxy.$t('executionSuccess'),
            type: 'line',
            smooth: true,
            data: [...state.chartsExcData]
          },
          {
            name: proxy.$t('total'),
            type: 'line',
            smooth: true,
            data: [...state.chartsTotalData]
          },
        ]
      }
      myChart.setOption(option)

      const listener = () => {
        myChart.resize()
      }
      EleResize.on(charts, listener)
    }

    onMounted(() => {
      if (treeId.value !=='') {       
        new Promise((resolve, reject) => {
          resolve(getHistoryDateList())
        }).then(res => {
          setCharts()
        })
      }
    })

    watch(() => treeId.value, (value) => {
      if (value!== '') {
        // getHistoryDateList()
        new Promise((resolve, reject) => {
          resolve(getHistoryDateList())
        }).then(res => {
          setCharts()
        })
      }
    })
    return {
      ...toRefs(state),
      CHART_COLORS,
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
    padding: 16px;
    font-size: 16px;
    line-height: 22px;
    color: var(--color_text_menu_2);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-content {
    width: 100%;
    height: 400px;
    border-radius: 8px;
    padding: 20px 10px;
  }
}

.charts {
  width: 100%;
  height: 100%
}
</style>