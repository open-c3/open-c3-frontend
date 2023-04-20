<template>
  <div ref="doughnut" class="charts"></div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, shallowRef, reactive, watch } from 'vue'
// import echarts from 'echarts'
import * as echarts from 'echarts'

import { optionDefault, chartColors } from './config'

import { deepClone } from '@/utils/index'
import { EleResize } from '@/utils/esresize'
import { dealFixed } from '@/utils/index'



export default defineComponent({
  props: {
    legendShow: { // 是否显示图例
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: []
    },
    currency: {
      type: String,
      default: 'CNY'
    }, 
    total: {
      type: Number,
      default: 0
    },
    tooltipResource: {
      type: Function,
      default: null
    }
  },
  setup (props) {
    const chart = shallowRef(null) 
    const { proxy } = getCurrentInstance()
    const state = reactive({
      option: deepClone(optionDefault)
    })
    const theme = localStorage.getItem('theme')

    const series =  {
      type: 'pie',
      center: ['35%', '50%'],
      radius: '95%',
      avoidLabelOverlap: true,
      label: {
        show: false,
      },
      emphasis: {
        label: {
          show: false
        }
      },
      labelLine: {
        show: false
      },
      data: props.data
    }

    const setChart = () => {
      state.option = {
        color: chartColors,
        tooltip: {
          trigger: 'item',
          // extraCssText: 'padding: 0px;'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: 520,
          top: 20,
          bottom: 20,
          itemGap: 15,
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
          formatter: (name) => {    //重点在这里  自定义图例
            return getFormatter(name)
          },
            tooltip: {
            show: true
          },
          textStyle: {  //图例的样式
            lineHeight: 18,
            height: 18,
            rich: {
              a: {
                fontSize: 14,
                width: 255,
                color: theme === 'light' ? '#050626' : '#ACB3CD',
                lineHeight: 18
              },
              b: {
                fontSize: 14,
                width: 296,
                color: theme === 'light' ? '#050626' : '#ACB3CD'
              }
            }
          },
           pageIcons: {
            vertical: [
              "path://M512 388.266667l149.333333 149.333333-59.733333 59.733333-89.6-89.6L422.4 597.333333l-59.733333-59.733333L512 388.266667zM512 853.333333c-187.733333 0-341.333333-153.6-341.333333-341.333333s153.6-341.333333 341.333333-341.333333 341.333333 153.6 341.333333 341.333333-153.6 341.333333-341.333333 341.333333z m0-85.333333c140.8 0 256-115.2 256-256s-115.2-256-256-256-256 115.2-256 256 115.2 256 256 256z",
              "path://M512 635.733333l149.333333-149.333333-59.733333-59.733333-89.6 89.6L422.4 426.666667l-59.733333 59.733333 149.333333 149.333333zM512 170.666667c-187.733333 0-341.333333 153.6-341.333333 341.333333s153.6 341.333333 341.333333 341.333333 341.333333-153.6 341.333333-341.333333-153.6-341.333333-341.333333-341.333333z m0 85.333333c140.8 0 256 115.2 256 256s-115.2 256-256 256-256-115.2-256-256 115.2-256 256-256z"
            ]
          },
          pageIconColor: "#757FFF", // 可点击的翻页按钮颜色
          pageIconInactiveColor: "#7f7f7f", // 禁用的按钮颜色
        },
      }
      if (props.tooltipResource) {
        state.option.tooltip.formatter = (params) => {
          const count = params.data.actualPayment
          const total = props.total
          const pre = count == total ? '100%' : dealFixed(count / total * 100) + '%'
          return props.tooltipResource(params,pre)
        }
      }
      const option: any = state.option
      option.series = [
        {
          ...series,
          data: []
        }
      ]
       const list = props.data
      if (list.length) {
        list.forEach((item: any, index: number) => {
          const obj = {
            ...item
          }
          if (chartColors[index]) obj['itemStyle'] = { color: chartColors[index] }
          option.series[0].data.push(obj)
        })
      }
  
      if (!props.legendShow) {
        option.legend.show = false
      }
      if (!chart.value) {
        chart.value = echarts.init(proxy.$el)
      }
      chart.value.clear()
      const listener = function () {
        chart.value.resize()
      }
      EleResize.on(proxy.$el, listener)
      chart.value.setOption(option)
    }

    
  const getFormatter = (name) =>  {
    let title = name
      if (name.length > 20) title = name.substr(0, 20) + '...'
      let arr = [];
      const data = {}
      if (props.data.length) {
        props.data.forEach((item: any) => {
          data[item.name] = item
        })
      }
      const count = data[name].actualPayment
      const total = props.total
      const pre = count == total ? '100%' : dealFixed(count / total * 100) + '%'
      
      // 图例的四列分别对应a b
      arr = [
        "{a|" + title + "}",
        "{b|" + count + proxy.$t(props.currency) + '（' + pre + '）' + "}"
      ]
      return arr.join("")
    }
    watch(() => props.data, () => {
      setChart()
    }, {
      deep: true
    })

    onMounted(() => {
      // setChart()
    })
  }
})
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  min-width: 947px;
  height: 100%;
  min-height: 210px;
  background-color: var(--color_bg);
}
</style>
