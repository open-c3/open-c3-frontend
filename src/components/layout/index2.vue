<template>
  <div class="layout">
    <div class="header">
      <div class="logo df ai_c mr10 pt20 ml20" >
        <img src="@/assets/img/logo.png" class="w30 mr5"/>
        <span>{{ $t('jy') }}</span>
      </div>
    </div>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import headerPart from '@/components/layout/components/header.vue'
export default defineComponent({
  components: { headerPart },
  setup () {
  }
})
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .header{
    height: 64px;
    width: 100%;
    background-color: var(--color_menu_1_bg);
    .logo{
      color: #fff !important;
    }
   
  }
  .main {
    height: 100%;
    width: 100%;
    background-color: var(--color_main_bg);
    overflow: auto;
  }
}
</style>