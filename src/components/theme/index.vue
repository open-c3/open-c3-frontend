<template>
  <!-- <el-switch v-model="value" size="small" active-value="light" active-text="light" inactive-value="dark" inactive-text="dark" @change="changeFun"/> -->
  <span class="hand" @click="changeFun()">{{ $t(`${value == 'light' ? 'darkTheme' : 'lightTheme'}`)}}</span>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    // const reload: Function = inject('reload')
    const store = useStore()
    const state = reactive({
      value: 'light'
    })
    const themeList: Array<String> = ['light', 'dark']

    const changeFun = () => {
      state.value = state.value === 'light' ? 'dark' : 'light'
      setTheme(state.value)
    }
    const setTheme = (val) => {
      store.dispatch('setTheme', val)
      localStorage.setItem('theme', val)
      localStorage.setItem('oldTheme', val)
      const app = document.querySelector('html')
      themeList.forEach((th: any) => {
        app.classList.remove(th)
      })
      app.classList.add(val)
      // reload()
    }

    onMounted(() => {
      state.value = localStorage.getItem('theme') || store.state.app.theme
      setTheme(state.value)
    })
    return {
      ...toRefs(state),
      changeFun
    }
  }
}
</script>