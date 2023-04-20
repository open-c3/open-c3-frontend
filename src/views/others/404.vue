<template>
  <div class="box wp100 hp100">
    <div class="center-box df h304 ">
      <div class="box-left w360">
        <img :src="theme == 'light' ? zhIcon : enIcon" alt="" />
      </div>
      <div class="box-right">
        <div class="right-hd f60">404</div>
        <div class="right-middle mt24 ml96">{{ $t("sorry-page") }}</div>
        <div class="right-btm tc h30 mt24 ml96">
          <div class="right-cont f14 h22" @click="onclick">{{ $t("back-homepage") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { findPage1 } from "@/utils/index";
import zhIcon from "@/assets/img/404.png";
import enIcon from "@/assets/img/404a.png";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore()

    const theme = computed(() => {
      return store.state.app.theme
    })

    const onclick = () => {
      router.push(findPage1());
    };
    return {
      onclick,
      zhIcon,
      enIcon,
      theme
    };
  },
};
</script>
<style lang="scss" scoped>
.box {
  background-color: var(--color_main_bg);
  margin-top: -24px; 
  overflow: hidden;
  .center-box {
    width: 649px;
    margin: 0 auto;
    margin-top: 180px;
    .box-right {
      width: 289px;
      .right-hd {
        width: 109px;
        height: 64px;
        font-family: Helvetica;
        color: var(--el-border-color);
        line-height: 71px;
        margin-left: 96px;
        margin-top: 71px;
      }
      .right-middle {
        width: 193px;
        color: var(--color_text_tip);
        line-height: 22px;
      }
      .right-btm {
        width: 97px;
        border-radius: 15px;
        background-color: var(--color-chart-1);
        line-height: 30px;
        .right-cont {
          width: 67px;
          letter-spacing: 1px;
          margin-left: 15px;
          color: var(--color_text_menu_1_active);
        }
      }
    }
  }
}
</style>