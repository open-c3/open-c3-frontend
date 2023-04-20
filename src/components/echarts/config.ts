export const chartColors = ['#757FFF', '#E96464', '#FFDD75', '#38C6C0', ' #8879F0', ' #F39C96', ' #939BFF', '#FFF3C7', '#88D6C8', '#A18DFB', '#E96579','#F8B96C', '#FAC7AA', '#92DCA1']

// #3E3F57
const theme = localStorage.getItem('theme')

export const optionDefault = {
  legend: {
    type: 'scroll',
    bottom: 0,
    textStyle: {
      color: theme === 'light' ? '#687591' : '#9E9FB6'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    },
    position: function(point, params, dom, rect, size) {
      return posTooltipSet(point, params, dom, rect, size)
    }
  },
  grid: {
    top: '20',
    right: '20',
    left: '10%'
  },
  xAxis: {
    axisLine: { // 坐标轴轴线
      lineStyle: {
        color: theme === 'light' ? '#D7DBE9' : '#3E3F57'
      }
    },
    axisTick: { // 刻度线
      lineStyle: {
        width: 4
      }
    },
    axisLabel: { // 坐标轴刻度标签
      color: theme === 'light' ? '#687591' : '#9E9FB6'
    },
    splitLine: { // 分割线
      lineStyle: {
        color: theme === 'light' ? '#E4E5EC' : '#3E3F57'
      }
    }
  },
  yAxis: {
    // type: 'value',
    axisLine: {
      show: false,
      lineStyle: {
        color: theme === 'light' ? '#D7DBE9' : '#3E3F57'
      }
    },
    axisTick: { // 刻度线
      lineStyle: {
        width: 4
      }
    },
    axisLabel: { // 坐标轴刻度标签
      color: theme === 'light' ? '#687591' : '#9E9FB6'
    },
    splitLine: { // 分割线
      lineStyle: {
        color: theme === 'light' ? '#E4E5EC' : '#3E3F57'
      }
    }
  }
} 

export const posTooltipSet = (point, params, dom, rect, size) => { // tooltip的位置动态设置
  //其中params为当前鼠标的位置
  let left = point[0]
  let top = point[1]
  const { contentSize, viewSize} = size
  dom.style.maxWidth = `${viewSize[0] - 10}px` // 设置最宽
  // dom.style.maxWidth = '200px'
  // 判断是否超出
  if (contentSize[0] && viewSize[0] - left < contentSize[0] ) { // tooltip 展示不开
    left = left - (contentSize[0] - (viewSize[0] - left)) - 10
  } else {
    left = left - 10
  }
  if (contentSize[1] && viewSize[1] - top - 20 < contentSize[1]) {
    // top = top - (contentSize[1] - (viewSize[1] - top)) - 24
    top = top - contentSize[1] - 10
  } else {
    top = top + 12
  }
  return [left, top]
}

export const formatterFunX = (value, currency) => { // 图标Y轴刻度值显示
  let val = value
  if (!Number.isNaN(value)) {
    const num = Math.abs(value)
    if (num > 1000 ) val = value / 1000 + 'K'
    if (num > 1000000) val = value / 1000 / 1000  + 'M'
  }
  return currency + ' ' + val
}


export const formatterFunY = (value, currency) => { // 图标柱状图顶部数据
  let val = value
  if (!Number.isNaN(value)) {
    const num = Math.abs(value)
    if (num > 1000 ) val = (value / 1000).toFixed(2) + 'K'
    if (num > 1000000) val = (value / 1000 /1000 ).toFixed(2) + 'M'
  }
  return currency + ' ' + val
}

