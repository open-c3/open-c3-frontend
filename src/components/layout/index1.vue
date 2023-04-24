<template>
  <div class="df main">
    <left-part class="left"/>
    <div class="flex1 pr">
      <language-part class="lang"/>
      <RouterView />
      <div class="footer tc">
        <!-- {{ $t('footer_text')}} -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import leftPart from './components/left.vue'

import languagePart from '../language/index.vue'

export default defineComponent({
  components: { leftPart, languagePart }
})
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  min-width: 1280px;
  min-height: 800px;
  .left {
    width: 60%;
    background-color: #161337;
    background-image: url('../../assets/img/bg.svg');
    background-repeat: no-repeat;
    background-size: 100% auto;
    // background-position: bottom;
    background-position: center bottom;
    // background-repeat: no-repeat;
    // background-size: contain;
  }
  .lang {
    position: absolute;
    top: 24px;
    right: 24px;
  }
  .footer {
    position: absolute;
    width: 100%;
    bottom: 24px;
    line-height: 17px;
    @include font-base(12px, #ACB3CB);
  }
}

</style>