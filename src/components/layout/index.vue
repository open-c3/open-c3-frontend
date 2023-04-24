<template>
  <div class="layout">
    <header-part />
    <div class="main">
      <div class="main-left">
        <left-part />
      </div>
      <div class="main-resize" title="收缩侧边栏"></div>
      <div class="main-right">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import headerPart from '@/components/layout/components/header.vue'
import leftPart from '@/components/layout/components/tree.vue'
export default defineComponent({
  components: { headerPart, leftPart },
  setup () {
    const store = useStore()
    const route = useRoute()
    const dragControllerDiv = () => {
        var resize = document.getElementsByClassName('main-resize');
        var left = document.getElementsByClassName('main-left');
        var right = document.getElementsByClassName('main-right');
        var main = document.getElementsByClassName('main');
        for (let i = 0; i < resize.length; i++) {
          // 鼠标按下事件
          (resize[i] as any).onmousedown = function (e) {
            //颜色改变提醒
            (resize[i] as any).style.background = '#818181';
            var startX = e.clientX;
            (resize[i] as any).left = (resize[i] as any).offsetLeft;
            // 鼠标拖动事件
            document.onmousemove = function (e) {
              var endX = e.clientX;
              var moveLen = (resize[i] as any).left + (endX - startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
              var maxT = main[i].clientWidth - (resize[i] as any).offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

              if (moveLen < 240) moveLen = 240; // 左边区域的最小宽度为240px
              if (moveLen > maxT - 500) moveLen = maxT - 500; //右边区域最小宽度为500px

              (resize[i] as any).style.left = moveLen; // 设置左侧区域的宽度

              for (let j = 0; j < left.length; j++) {
                (left[j] as any).style.width = moveLen + 'px';
                (right[j] as any).style.width = (main[i].clientWidth - moveLen - 10) + 'px';
              }
            };
            // 鼠标松开事件
            document.onmouseup = function (evt) {
              //颜色恢复
              (resize[i] as any).style.background = '#d6d6d6';
              document.onmousemove = null;
              document.onmouseup = null;
              (resize[i] as any).releaseCapture && (resize[i] as any).releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
            };
            (resize[i] as any).setCapture && (resize[i] as any).setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
            return false;
          };
        }
    }
    onMounted(() => {
      dragControllerDiv()
    })
  }
})
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .main {
    height: 100%;
    background-color: var(--color_main_bg);
    overflow: auto;
    display: flex;
    .main-left{
      background-color: var(--color_menu_2_bg);
      min-width: 240px;
      height: 100%;
      overflow: auto;
    }
    .main-resize{
      width: 2px;
      background-color: #d6d6d6;
      cursor: col-resize;
      flex-shrink: 0;
    }
    .main-right{
      max-width: calc(100% - 242px);
      height: calc(100vh - 60px);
      padding: 24px;
      flex-grow: 1;
      overflow-y: auto;
    }
  }
}
</style>