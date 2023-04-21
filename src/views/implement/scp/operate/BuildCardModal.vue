<template>
  <Dialog v-bind="$attrs" :config="config" @close="close" @success="confirm">
    <template #content>
      <div>
        <Table :thead="Object.assign(tableConfig.thead)" :data="tableConfig.list" :tableLoading="tableConfig.loading"
         class="mt20">
          <template #ci="{ row }">
            <el-input v-model="row.ci" />
          </template>
          <template #version="{ row }">
            <el-input v-model="row.version" />
          </template>
        </Table>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance, ref } from 'vue'
import store from '@/store'
import Table from '@/components/table/index.vue'
import Dialog from '@/components/dialog/index.vue'
import Token from '@/views/business/file/components/token.vue'
import {
  BUILD_THEAD_CONFIG,
  BUILD_DIALOG_CONFIG,
} from '../config'

export default defineComponent({
  components: { Dialog, Table, Token },
  emits: ['close', 'success'],
  props: {
    config: {
      type: Object,
      default: BUILD_DIALOG_CONFIG
    },
    compParams: {
      type: Object,
      default: {
      }
    }
  },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeId = computed(() => { return store.getters.treeId })
    const state = reactive({
      tableConfig: {
        loading: false,
        thead: BUILD_THEAD_CONFIG,
        list: [],
      },
    })

    // 获取服务器文件列表
    const getFileData: () => Promise<void> = async () => {
      state.tableConfig.list = [
        { ci: 'default', version: '$version' }
      ]
    }

    const close: () => void = () => {
      proxy.$emit('close')
    }

    const confirm: (formEl:  undefined) => Promise<void> = async (formEl:  undefined) => {
      if (state.tableConfig.list[0].ci === '' || state.tableConfig.list[0].version === '') {
        proxy.$notification(proxy.$t('scpBuildNote'), 'error')
        return
      }
      store.dispatch('setScpSourceFile', state.tableConfig.list[0])
      close()
    }

    onMounted(() => {
      getFileData()
    })
    return {
      ...toRefs(state),
      close,
      confirm,
    }
  }
})
</script>

<style lang="scss" scoped></style>