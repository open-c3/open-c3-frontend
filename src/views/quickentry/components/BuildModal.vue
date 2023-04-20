<template>
  <Dialog v-bind="$attrs" :config="config" :title="editItem.title" @close="close" @success="close">
    <template #content>
      <div>
        <div class="layout-title">
          <div class="layout-title-header">{{ editItem.name }}</div>
          <div v-if="editItem.refresh" class="layout-title-operate">
            <el-tooltip class="box-item" effect="dark" :content="$t('retestImmed')" placement="top">
              <svg-icon class="icon-style" icon-class="refresh" width="20" @click="onRefresh()" />
            </el-tooltip>
          </div>
        </div>
        <el-divider class="costv-divider mt16 mb16" />
        <div class="layout-content" :readonly="true" id="logDetail">{{ logDetail }}</div>
      </div>
    </template>
    <template #footer>
      <div>
        <el-button type="primary" @click="close">{{$t('close')}}</el-button>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, getCurrentInstance, ComponentInternalInstance, onUnmounted } from 'vue'
import store from '@/store'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { BUILD_MODAL_CONFIG } from './config'
import {

} from '@/api/quickentry/index'
import {

} from '@/api/interface/quickentry'

interface TreeInfo {
  id: number;
  name: string;
  children?: TreeInfo[];
}
interface Stateinfo {
  treeArray: TreeInfo[];
  toTreeId: string | number;
  toTreeName: string;
  siteaddr: string;
  myWebSorket: any;
  logDetail: string;
  timer: any
}


export default defineComponent({
  components: {
    Dialog,
    baseForm
  },

  props: {
    types: {
      type: String,
      default: 'Collect'
    },
    conTypes: {
      type: String,
      default: 'Collect',
      require: false
    },
    config: {
      type: Object,
      default: BUILD_MODAL_CONFIG
    },
    editItem: {
      type: Object,
      default: {}
    },
    treeId: {
      type: String,
      default: '4000000000',
    },
    treeData: {
      type: Object,
      default: {}
    },
  },

  emits: ['success', 'close', 'refresh'],

  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeArray = computed(() => {
      return store.getters.treeArray
    })

    const state: Stateinfo = reactive({
      treeArray: [],
      toTreeId: props.treeId,
      toTreeName: props.treeData.name,
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
      const urlMysorket = `${wsH}${state.siteaddr}${props.editItem.websorketUrl}`
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

    const confirm = () => {
      close()
    }

    const onRefresh = () => {
      proxy.$emit('refresh')
    }

    const close = () => {
      proxy.$emit('close')
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
      state.treeArray = treeArray.value
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
      BUILD_MODAL_CONFIG,
      confirm,
      close,
      onRefresh,
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