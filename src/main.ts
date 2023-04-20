import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import directive from './directive'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import './assets/style/_color.scss' // 不同主题的颜色定义

import './assets/style/base.scss' // 各种基础class
import './assets/style/index.scss' // 系统内组件的class

import './assets/style/elementReset.scss' // 重置element的样式

import '@/utils/common'
import '@/utils/permission'

import svgIcon from './components/svgIcon/index.vue'

import i18n from './language'

import { t } from '@/utils/language' // I18n
import { jumpPage, notification } from '@/utils/index' // 全局函数

import saasTabs from '@/components/tabs/index.vue' // tab组件
// import tableColumnItem from '@/views/analysis/report/components/charts/table/item.vue'




import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as icons from '@element-plus/icons-vue'
// import JsonViewer from 'vue3-json-viewer'
const app = createApp(App)

app.component('svg-icon', svgIcon)
Object.keys(icons).forEach(key => { // 添加element icon
  app.component(key, icons[key])
})
const downFile = (data, options = { name: '聚云立方文件.xlsx' }) => {
  if (!data) return
  const blob = new Blob([data])
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = options.name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

app.use(i18n)

app.use(ElementPlus)
app.use(router)
app.use(store)

app.use(directive)
// app.use(JsonViewer)
app.component('saasTabs', saasTabs)
// app.component('tableColumnItem', tableColumnItem)


app.config.globalProperties.$t = t // 多语言 重写的$t 原先的$t指向i18n的原有函数
app.config.globalProperties.$jumpPage = jumpPage // 全局跳转函数
app.config.globalProperties.$notification = notification // 提示函数 默认是成功类型
app.config.globalProperties.$downFile = downFile // 下载

app.mount('#app')
