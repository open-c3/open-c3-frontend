<template>
  <el-card class="mt20">
    <template #header>
      <span>{{ $t('alarmLevel') }}</span>
    </template>
    <div id="levelPie"></div>
  </el-card>
</template>
<script lang="ts">
import { onMounted, reactive, toRefs, watch } from 'vue'
import HighCharts from 'highcharts'
export default {
  props: {
    pingtu1: {
      type: Array,
      default: () => []
    }
  },
  setup (prop, context) {
    const state = reactive({
      series: []
    })
    const init = (series) => {
      const charts: any = HighCharts
      charts.chart('levelPie', {
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
    watch(() => prop.pingtu1, val => {
      initData(val)
    }, {
      // immediate: true,
      deep: true
    })
    onMounted(() => {
      initData(prop.pingtu1)
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
