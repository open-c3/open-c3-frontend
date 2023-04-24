
// import { t } from '@/utils/language'
import { notification } from '@/utils/index'
export const copy = {
  mounted: function (el, { value }) {
    el.$value = value
    // el控件定义 onclick 事件
    el.onclick = () => {
      if (!el.$value) {
        // 值为空的时候，给出提示。可根据项目UI仔细设计
        // notification('warning', ['config.copyEmpty'])
        return
      }
      // 动态创建 textarea 标签
      const textarea = document.createElement('textarea')
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = true
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.$value
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea)
      // 选中值并复制
      textarea.select()
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(() => {
          notification('copySuccess')
        })
      } else {
        const result = document.execCommand('Copy')
        if (result) {
          // 可根据项目UI仔细设计
          notification('copySuccess')
        }
      }
      
      // const result = document.execCommand('Copy')
      // if (result) {
      //   // 可根据项目UI仔细设计
      //   t('copySuccess')
      // }
      document.body.removeChild(textarea)
    }
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  beforeUpdate (el, { value }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unmounted (el) {
    el.removeEventListener('click', el.handler)
  }
}

export default copy
