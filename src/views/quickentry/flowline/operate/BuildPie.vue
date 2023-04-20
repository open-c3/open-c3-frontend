<template>
  <div class="box-card">
    <div class="box-card-title">{{ $t('statisticsTask') }}</div>
    <el-divider class="costv-divider m0" />
    <div class="box-card-content">
      <div ref="chart" class="charts" :id="setId"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, toRefs, watch, reactive, computed } from 'vue'
import * as echarts from 'echarts'
import { EleResize } from '@/utils/esresize'
import { analysisRunTimeLists } from '@/api/dashboard/index'
import store from '@/store'
import { CHART_COLORS } from '../detail/config'

type EChartsOption = echarts.EChartsOption;

export default defineComponent({
  props: {
    setId: {
      type: String,
      default: ''
    },
    pieData: {
      type: Array,
      default: []
    }
  },
  setup(props) {

    let option: EChartsOption;

    const { proxy } = getCurrentInstance()

    const treeId = computed(() => {
      return store.getters.treeId
    })

    const state = reactive({
      chartsTimeData: [],     // 转化的图表数组
    })

    // 获取任务执行时长统计数据
    const getHistoryDateList = async () => {
      const newData = JSON.parse(JSON.stringify(props.pieData))
      const pieValues = []
      const pieNames = []
      newData.forEach((item, index) => {
        if (typeof item === 'string') {
          pieNames.push(item)
        }
        if (typeof item === 'number') {
          pieValues.push(item)
        }
      })
      state.chartsTimeData = pieValues.map((item,index) => {
        return {
          value: item,
          name: `${pieNames[index]}：${parseFloat(item)}%`
        }
      })
    }

    const setCharts = () => {
      const charts = document.getElementById(`${props.setId}`)
      const myChart = echarts.init(charts);

      option = {
        tooltip: {
          trigger: 'axis'
        },
        color: CHART_COLORS,
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [
          {
            name: proxy.$t('executionSuccess'),
            type: 'pie',
            radius: '50%',
            data: [...state.chartsTimeData],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
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
      new Promise((resolve, reject) => {
        resolve(getHistoryDateList())
      }).then(res => {
        setCharts()
      })
    })

    watch(() => treeId.value, (value) => {
      if (value) {
        getHistoryDateList()
      }
    })
    return {
      ...toRefs(state),
      CHART_COLORS
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
    padding: 0 16px 16px;
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