<template>
  <div id="main" v-loading="loading">
    <el-config-provider :locale="curLocale">
      <router-view  v-if="isRouterAlive" />
    </el-config-provider>
  </div>
</template>

<script lang="ts">
  import { computed, getCurrentInstance, provide, reactive, toRefs } from 'vue'
  import { useStore } from 'vuex'
  
  import zhCn from 'element-plus/lib/locale/lang/zh-cn'
  import en from 'element-plus/lib/locale/lang/en'
  import ja from 'element-plus/lib/locale/lang/ja'
  
  // import { getLanguages } from '@/utils/language'
  
  export default ({
    setup () {
      const { proxy } = getCurrentInstance()
      const store = useStore()
      const state = reactive({
        isRouterAlive: true // 用于页面重新渲染
      })
      const loading = computed(() => { // 全局loading
        return store.state.app.loading
      })
      // 定义所有的语言包
      const localeAll = {
        zhCn: zhCn,
        en: en,
        ja: ja
      }
      const curLocale = computed(() => { // 当前语言包
        return localeAll[store.state.app.locale]
      })
      const reload = () => { // 页面重新加载函数
        state.isRouterAlive = false
        proxy.$nextTick(() => {
          state.isRouterAlive = true
        })
      }
      provide('reload', reload) // 注册重新渲染函数
      
      // 判断是否有上次保存的语言类型，如果有就使用上次保存的语言并在vuex中更新，如果没有则使用vuex中默认的中文并保存在本地浏览器
      const init = () => {
        const localStorageLanguage = localStorage.getItem('language')
        const storeLanguage = store.state.app.locale
        if (localStorageLanguage !== null) {
          store.dispatch('setLocale', localStorageLanguage)
        } else {
          localStorage.setItem('language', storeLanguage)
        }
        // getLanguages() // 获取语言包
        themeFun()
      }

      // 颜色主题加载

      const themeFun = () => {
        let val = localStorage.getItem('theme') || 'light'
        if (localStorage.getItem('oldTheme')) {
          val = localStorage.getItem('oldTheme')
          localStorage.setItem('theme', val)
          // localStorage.removeItem('oldTheme')
        }
        store.dispatch('setTheme', val)
        const app = document.querySelector('html')
        app.classList.add(val) 
      }
      
      init() // 页面初始化函数
  
      return {
        ...toRefs(state),
        loading,
        init,
        curLocale
      }
    }
  })
  </script>

