<template>
    <div class="layout-content mt10" :readonly="true" id="logDetail">{{ logDetail }}</div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, getCurrentInstance, ComponentInternalInstance, onUnmounted } from 'vue'
import store from '@/store'
import {

} from '@/api/quickentry/index'
import {

} from '@/api/interface/quickentry'

interface TreeInfo {
  id: number;
  name: string;
  children?: TreeInfo[];
}

export default defineComponent({
  components: {},
  props: {
    locationStr: {
      type: String,
      default: '',
    },
    taskuuid: {
      type: String,
      default: '=',
    },
  },

  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeArray = computed(() => {
      return store.getters.treeArray
    })

    const state = reactive({
      siteaddr: '',
      myWebSorket: null,
      logDetail: '',
      timer: null
    })

    const getWebsorket = () => {
      state.siteaddr = window.location.host
      // state.siteaddr = 'demo01.openc3.polymericcloud.com'
      let wsH = 'ws://'
      if (window.location.protocol === 'https:') {
        wsH = 'wss://'
      }
      const urlMysorket = `${wsH}${state.siteaddr}${props.locationStr}`
      state.myWebSorket = new WebSocket(urlMysorket);
      state.myWebSorket.onopen = wsbOpen
      state.myWebSorket.onmessage = wsMessage
      state.myWebSorket.onerror = wsError
      state.myWebSorket.onclose = wsClose
    }

    const wsbOpen = () => {
      console.log("opening ws");
    }

    const wsMessage = (message) => {
      if (message.data === 'wsresetws') {
        state.logDetail = ''
      } else {
        state.logDetail = state.logDetail + message.data
      }
    }

    const wsError = () => {
    }

    const wsClose = () => {
      console.log('WebSocket 断开连接')
    }

    let webTimer = 0
    const webSorketRun = () => {
      if (state.timer !== null) {
        clearTimer()
        return
      }
      try {
        state.timer = setInterval(() => {
          webTimer = webTimer + 1
          if (webTimer < 300) {
            state.myWebSorket.send('H')
          }
        }, 6000)
      } catch (error) {
        clearTimer()
      }
    }
    // 清除定时器
    const clearTimer = () => {
      clearInterval(state.timer)
      state.timer = null
    }

    onMounted(() => {
      getWebsorket()
      webSorketRun()
    })

    onUnmounted(() => {
      //离开路由之后断开 websocket 连接
      clearTimer()
      state.myWebSorket.close();
    })
    return {
      treeArray,
      ...toRefs(state),
    }
  }
})
</script>

<style scoped lang="scss">
.select-tree {
  border: 1px solid var(--color-dialog-line);
}

.select-tree-name {
  width: 100%;
  height: 50px;
  padding: 10px;
  border-bottom: 1px solid var(--color-dialog-line);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-left {
    width: 100%;
    font-weight: 600;
  }

  &-right {
    height: 100%
  }
}

.layout-title {
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-header {
    color: var(--color_text)
  }

  &-operate {
    display: flex;
    justify-content: flex-end;
  }
}

.layout-content {
  padding: 10px;
  min-height: 400px;
  widows: 100%;
  background-color: #000;
  color: #FFF;
}
</style>