<template>
  <Dialog v-bind="$attrs" :config="config" @close="close" @success="confirm">
    <template #content>
      <saas-tabs v-model="activeName" :tabs="tabsList" class="mt-20" />
      <div v-if="activeName === 'select'">
        <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading"
          :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange"
          :pageSizeChange="pageSizeChange" class="mt20">
          <template #size="{ row }">
            {{ bytesToSize(row.size) }}
          </template>
          <template #operate="{ row }">
            <el-button @click="deleteFun(row.id)" link type="primary">{{ $t('delete') }}</el-button>
          </template>
        </Table>
      </div>
      <div v-else-if="activeName === 'input'">
       <el-form :model="shareForm" label-width="100px"></el-form>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import store from '@/store'
import Table from '@/components/table/index.vue'
import Dialog from '@/components/dialog/index.vue'
import {
  bytesToSize,
  TABS_CONFIG,
  SHARE_DIALOG_CONFIG
} from '../config'
import { THEAD_CONFIG } from '@/views/business/file/config'
import {
  getFileServer
} from '@/api/business/file'
export default defineComponent({
  components: { Dialog, Table },
  emits: ['close', 'success'],
  props: {
    config: {
      type: Object,
      default: SHARE_DIALOG_CONFIG
    },
    compParams: {
      type: Object,
      default: {}
    }
  },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    // const { treeId, treeData } = computed(() => { return store.getters })
    const treeId = computed(() => { return store.getters.treeId })

    const state = reactive({
      activeName: 'select',
      tabsList: TABS_CONFIG,
      tableConfig: {
        loading: false,
        thead: THEAD_CONFIG,
        total: 0,
        list: [],
        allList: [],
        filterList: [],
        page: 1,
        pageSize: 10
      },
      shareForm: {}
    })

    // 获取服务器文件列表
    const getFileData: () => Promise<void> = async (): Promise<void> => {
      const dataRet  = await getFileServer(treeId.value, {}) as unknown as Array<any>
      if (dataRet) {
        console.log(dataRet)
        state.tableConfig.allList = dataRet.reverse()
        state.tableConfig.total = dataRet.length
        state.tableConfig.list = dataRet.reverse()

      }
    }

    const close: () => void = (): void => {
      proxy.$emit('close')
    }

    const confirm: () => void = (): void => {
      close()
    }

    const deleteFun = (id: string) => {

    }

    const pageChange:(page:number)=>void = (page:number):void => {
      state.tableConfig.page = page
    }

    const pageSizeChange:(size:number) => void = (size:number):void => {
      state.tableConfig.pageSize = size
      pageChange(1)
    }

    onMounted(() => {
      console.log(store.getters)
      getFileData()
    })
    return {
      TABS_CONFIG,
      bytesToSize,
      ...toRefs(state),
      close,
      confirm,
      deleteFun,
      pageChange,
      pageSizeChange,
    }
  }
})
</script>

<style lang="scss" scoped></style>