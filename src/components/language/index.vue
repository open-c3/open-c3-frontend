<template>
  <el-dropdown trigger="hover" class="language" popper-class="popperClass" @command="setLanguageCondition">
    <div class="df ai_c">
      <svg-icon icon-class="saas-lang-change" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(item, index) in options" :key="index" :command="item.value">{{ item.label }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { ref, defineComponent, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { LANGUAGE_PACK } from '@/utils/constants'


export default defineComponent({
  setup () {
    const store = useStore()
    const { locale } = useI18n()
    const setLanguageCondition = (val) => {
      locale.value = val
      localStorage.setItem('language', val)
      store.dispatch('setLocale', val)
      window.location.reload()
    }
    const options = LANGUAGE_PACK

    return {
      value: ref(localStorage.getItem('language') || 'zhCn'),
      options,
      setLanguageCondition
    }
  }
})
</script>

<style lang="scss" scoped>
.language {
  .svg-icon {
    color: #B2BBDC;
    width: 20px!important;
    height: 20px!important;
  }
}
</style>
