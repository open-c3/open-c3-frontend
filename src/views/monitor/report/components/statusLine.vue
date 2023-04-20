<template>
  <el-card class="monitor-card mt20 btn-base">
    <template #header>
      <span>{{ $t('title') }}</span>
    </template>
    <div id="container"></div>
  </el-card>
</template>
<script lang="ts">
import { onMounted, reactive, toRefs, watch, getCurrentInstance } from 'vue'
import HighCharts from 'highcharts'

export default {
  props: {
    changeData: {
      type: Array,
      default: () => []
    }
  },
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      series: [{
        name: proxy.$t('level1'),
        marker: {
          symbol: 'diamond'
        },
        color: 'red',
        data: []
      }, {
        name: proxy.$t('level2'),
        marker: {
          symbol: 'square'
        },
        color: '#759',
        data: []
      }, {
        name: proxy.$t('level3'),
        marker: {
          symbol: '#444'
        },
        color: 'red',
        data: []
      }, {
        name: proxy.$t('level4'),
        marker: {
          symbol: 'square'
        },
        color: '#888',
        data: []
      }]
    })
    const init = (xAxis, series) => {
      const charts = HighCharts
      charts.chart('container', {
        accessibility: {
          enabled: false
        },
        chart: {
          type: 'spline'
        },
        title: {
          text: proxy.$t('dateDistribution')
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: xAxis
        },
        yAxis: {
          title: {
            text: ''
          },
          labels: {
            formatter: function () {
              return this.value
            }
          }
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: '#666666',
              lineWidth: 1
            }
          }
        },
        series: series
      })
    }
    const initData = (val) => {
      const xAxis = []
      state.series[0].data = []
      state.series[1].data = []
      state.series[2].data = []
      state.series[3].data = []
      if (val) {
        val.forEach(item => {
          xAxis.push(item[0])
          state.series[0].data.push(item[1])
          state.series[1].data.push(item[2])
          state.series[2].data.push(item[3])
          state.series[3].data.push(item[4])
        })
      }
      init(xAxis, state.series)
    }
    onMounted(() => {
      initData(prop.changeData)
    })
    watch(() => prop.changeData, val => {
      initData(val)
    }, {
      // immediate: true,
      deep: true
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
