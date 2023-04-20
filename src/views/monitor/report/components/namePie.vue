<template>
  <el-card class="monitor-card mt20 btn-base">
    <template #header>
      <span>{{ $t('alarmName') }}TOP 10</span>
    </template>
    <div id="namePie"></div>
  </el-card>
</template>
<script >
import { onMounted, reactive, toRefs, watch } from 'vue'
import HighCharts from 'highcharts'
export default {
  props: {
    pingtu3: {
      type: Array,
      default: () => []
    }
  },
  setup (prop, context) {
    const state = reactive({
      series: []
    })
    const init = (series) => {
      const charts = HighCharts
      charts.chart('namePie', {
        accessibility: {
          enabled: false
        },
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: ''
        },
        tooltip: {
          headerFormat: '{series.name}<br>',
          pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: (charts.theme && charts.theme.contrastTextColor) || 'black'
              }
            },
            showInLegend: true
          }
        },
        series: [{
          name: 'series',
          colorByPoint: true,
          data: series
        }]
      })
    }
    const initData = (val) => {
      state.series = []
      if (val) {
        val.forEach(item => {
          state.series.push({
            name: item[0],
            y: item[1]
          })
        })
      }
      init(state.series)
    }
    watch(() => prop.pingtu3, val => {
      initData(val)
    }, {
      // immediate: true,
      deep: true
    })
    onMounted(() => {
      initData(prop.pingtu3)
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
