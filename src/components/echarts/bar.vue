<template>
  <div ref="bar" class="charts"></div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, shallowRef, reactive, watch, ComponentInternalInstance } from 'vue'
// import echarts from 'echarts'
import * as echarts from 'echarts'
import { optionDefault, chartColors, formatterFunX, formatterFunY } from './config'

import { deepClone } from '@/utils/index'
import { EleResize } from '@/utils/esresize'

export default defineComponent({
  props: {
    legendShow: { // 是否显示图例
      type: Boolean,
      default: true
    },
    xAxis:{
      type: Array,
      default: () => []
    },
    series: {
      type: Object,
      default: () => {}
    },
    comparative: {
      type: String,
      default: 'actuals_only'
    },
    currency: {
      type: String,
      default: 'CNY'
    },
    label: {
      type: Boolean,
      default : false
    }
  },
  setup (props) {
    const chart = shallowRef<any>(null) 
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const state = reactive({
      option: deepClone(optionDefault),
      currentSeriesIndex: 0,
      currentDataIndex: 0
    })
    const initOption = (option:any) => { // 默认设置
      option.color = chartColors
      if (!props.legendShow) {
        option.legend.show = false
        option.grid.bottom = 30
      }
      if (props.label) {
        option.label = {
          show: true,
          position:'top'
        }
      }
      option.xAxis.type = 'category'
      option.xAxis.axisTick.alignWithLabel = true
      option.yAxis.type = 'value'
      option.yAxis.axisLabel.formatter = (value:any) => { //柱状图y数据的处理
        return formatterFunX(value, props.comparative === 'actuals_only' ? props.currency : '')
      }
      option.label.formatter = (value:any) => { //柱状图顶部数据的处理
        if (value.axisDimension === option.xAxis) {
          return value.value
        }
        return formatterFunY(value.value, props.comparative === 'actuals_only' ? props.currency : '')
      }
    }
    const setChart = () => {
      const option: any = state.option
      option.color = chartColors
      option.xAxis.data = props.xAxis //props.xAxis? props.xAxis :['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      option.series = props.series? props.series :[
        {
          name: 'test',
          data: [], //[120, 200, 150, 80, 70, 110, 130]
          type: 'bar',
          barMaxWidth: 40,
        }
      ]
      if (!chart.value) {
        chart.value = echarts.init(proxy?.$el)
      }
      chart.value.clear()
      const listener = function () {
        chart.value.resize()
      }
      EleResize.on?.(proxy?.$el, listener)
      chart.value.setOption(option)
    }
    initOption(state.option)
    watch(() => [props.xAxis, props.series], () => {
      setChart()
    }, {
      deep: true
    })
    onMounted(() => {
      setChart()
    })
  }
})
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  min-width: 389px;
  height: 100%;
  min-height: 360px;
  background-color: var(--color_bg_con);
}
</style>
