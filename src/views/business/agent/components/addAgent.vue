<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel">
    <template #content>
      <el-input v-model.trim="subnet" :placeholder="$t('addNetworkPlaceholder')" class="w500">
        <template #append>
          <el-button :disabled="subnet === ''" @click="addAgent" type="primary">{{ $t('addNetwork') }}</el-button>
        </template>
      </el-input>
      <Table :thead="thead" :data="list" :tableLoading="tableLoading" class="mt20">
        <template #select="{ row }">
          <el-checkbox v-model="row.select" :key="row.id"></el-checkbox>
        </template>
        <template #operate="{ row }">
          <el-button @click="deleteFun(row.id)" link type="primary">{{ $t('delete') }}</el-button>
        </template>
      </Table>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, computed, watch, onMounted } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { ADD_AGENT_CONFIG, AGENT_THEAD_CONFIG } from '@/views/business/agent/config'
import { getAgentList, addAgentNetwork, deleteAgentNetwork } from '@/api/business/agent'
import { ElMessageBox } from 'element-plus'
export default {
  components: { Dialog, Table, baseForm },
  props: {
    info: {
      type: Object,
      default: null
    },
    treeId: {
      type: Number,
      default: ''
    },
    treeData: {
      type: Object,
      default: () => null
    }
  },
  emits: ['close', 'update'],
  setup (props, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      config:ADD_AGENT_CONFIG,
      loading: false,
      subnet: '',
      thead: AGENT_THEAD_CONFIG,
      list: [],
      tableLoading: false,
      relation: {}
    })
    const getList = () => {
      getAgentList(props.treeId, props.info.id).then((res: any) => {
        state.list = res
      })
    }
    const cancel = () => { // 关闭弹框
      context.emit('close')
    }
    const addAgent = () => {
      state.loading = true
      addAgentNetwork(props.treeData.id, props.info.id, { subnet: state.subnet}).then(res => {
        state.loading = false
        proxy.$notification('operationSuccess')
        getList()
        context.emit('update')
      })
    }
    const deleteFun = (id: string | number) => {
      ElMessageBox.confirm(proxy.$t('deleteNetwork'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        state.tableLoading = true
        deleteAgentNetwork(props.treeData.id, id).then(res => {
          state.tableLoading = false
          proxy.$notification('operationSuccess')
          getList()
          context.emit('update')
        })
      })
    }

    onMounted(() => {
      if (props.treeId) {
        getList()
      }
      if (props.treeData) {
        state.config.titleParams.parent = props.treeData['parent']
      }
      if (props.info) {
        state.config.titleParams.name = props.info['region']
      }
    })
    return {
      ...toRefs(state),
      cancel,
      addAgent,
      deleteFun
    }
  }
}
</script>
<style lang="scss">
</style>
