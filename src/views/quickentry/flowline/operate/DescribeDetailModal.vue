<template>
  <div>
    <Dialog v-bind="$attrs" :config="config" @close="close" :title="`describe ${$t('information')}`"
      @success="confirm">
      <template #content>
        <div v-loading="loading">
          <h3 class="mt30 mb30">{{ $t('detail') }}</h3>
          <div v-if="describe.length > 0" class="describe-detail-border">
            <pre class="layout-pre" v-html="describe"></pre>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, getCurrentInstance, ComponentInternalInstance } from 'vue'
import store from '@/store'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import {
  DESCRIBE_MODAL_DETAIL_CONFIG,
} from '../config'
import Table from '@/components/table/index.vue'
import {
  getDescAppInformation,
} from '@/api/quickentry/index'
import {
  GetAppInfomation,
} from '@/api/interface/quickentry'

interface TreeInfo {
  id: number;
  name: string;
  children?: TreeInfo[];
}
interface Stateinfo {
  loading: boolean;
  treeArray: TreeInfo[];
  toTreeId: string | number;
  toTreeName: string;
  newTableList: Array<any>;
  oldTableList: Array<any>;
  describe: string;
}

export default defineComponent({
  components: {
    Dialog,
    Table,
    baseForm
  },

  props: {
    types: {
      type: String,
      default: 'config'
    },
    conTypes: {
      type: String,
      default: 'config',
      require: false
    },
    config: {
      type: Object,
      default: DESCRIBE_MODAL_DETAIL_CONFIG
    },
    editItem: {
      type: Object,
      default: {}
    },
    treeId: {
      type: String,
      default: '4000000000'
    },
    treeData: {
      type: Object,
      default: {}
    },
  },

  emits: ['success', 'close'],

  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeArray = computed(() => {
      return store.getters.treeArray
    })

    const state: Stateinfo = reactive({
      loading: false,
      newTableList: [],
      oldTableList: [],
      describe: '',
      treeArray: [],
      toTreeId: props.treeId,
      toTreeName: props.treeData.name,
    })

    const confirm = () => {
      close()
    }

    const close = () => {
      proxy.$emit('close')
    }

    const handleNodeClick = (data: TreeInfo) => {
      state.toTreeId = data.id
      state.toTreeName = data.name
    }

    const getDetailFormName = async () => {
      const params: GetAppInfomation = {
        ticketid: props.editItem.ticketid,
        name: props.editItem.name,
        type: props.editItem.type,
        namespace: props.editItem.namespace
      }
      state.loading = true
      try {
        const dataRet = await getDescAppInformation(params)
        state.loading = false
        if (dataRet) {
          state.describe = dataRet
        }
      } catch (error) {
        state.loading = false
        console.error(error)
      }
    }

    onMounted(() => {
      state.treeArray = treeArray.value
      getDetailFormName()
    })

    return {
      treeArray,
      ...toRefs(state),
      DESCRIBE_MODAL_DETAIL_CONFIG,
      confirm,
      close,
      handleNodeClick,
    }
  }
})
</script>

<style scoped lang="scss">
.describe-detail-border {
  padding: 10px;
  border: 1px solid var(--el-color-gray);
}
.layout-pre {
  white-space: pre-wrap
}
</style>