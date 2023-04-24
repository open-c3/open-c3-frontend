<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel" @success="confirm">
    <template #content>
      <div class="df copy-rule">
        <el-tree :data="treeAry" :props="defaultProps" :highlight-current="true" @node-click="handleNodeClick" node-key="id" class="copy-rule-tree">
          <template #default="{ node, data }">
            <div class="tree-name ellipsis" :title="node.label">
              <template v-if="data.children && data.children.length">
                <el-icon v-if="node.expanded"><FolderOpened /></el-icon>
                <el-icon v-else><Folder /></el-icon>
              </template>
              <el-icon v-else><CopyDocument /></el-icon>
              {{ node.label }}
            </div>
          </template>
        </el-tree>
        <div class="copy-rule-table">
          <Table :thead="thead" :data="list" maxHeight="calc(100vh - 384px)" class="copy-rule-table">
            <template #operate="{ row }">
              <el-button @click="deleteFun(row)" link type="primary">{{ $t('delete') }}</el-button>
            </template>
          </Table>
        </div>
      </div>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import { SYNC_TMP_CONFIG } from '../config'
import { copyNodeRule } from '@/api/monitor/config.js'
import { getUserTree } from '@/api/userCenter'
export default {
  components: { Dialog, Table },
  emits: ['cancel', 'addSuccess'],
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const defaultProps = {
      children: 'children',
      label: 'name'
    }
    const state = reactive({
      treeAry: [],
      thead: [
      { prop: 'id', label: 'nodeId', align: 'center' },
      { prop: 'name', label: 'nodeName', align: 'center' },
      { prop: 'operate', type: 'slot', label: 'operate', align: 'center', width: 120 }
      ],
      list: [],
      loading: false,
      config: SYNC_TMP_CONFIG
    })
    const handleNodeClick = (data) => {
      if (!data.id || store.getters.treeId === data.id) return
      if (state.list.findIndex(item => item.id === data.id) === -1) {
        state.list.push({
          id: data.id,
          name: data.name
        })
      }
    }
    const cancel = () => { // 关闭弹框
      context.emit('cancel')
    }
    // 弹框成功的回调
    const confirm = () => {
      if (state.list.length === 0) return
      const result = state.list.map(item => {
        return copyNodeRule({ fromId: item.id, treeId: store.getters.treeId })
      })
      state.loading = true
      Promise.all(result).then(res => {
        context.emit('addSuccess')
        proxy.$notification('success')
      }).catch(err => {
      }).finally(() => {
        state.loading = false
      })
    }
    const deleteFun = (row) => {
      state.list.splice(state.list.findIndex(item => item.id === row.id), 1)
    }
    onMounted(() => {
      state.loading = true
      getUserTree().then((res : any) => {
        state.treeAry = res
      }).finally(() => {
        state.loading = false
      })
    })
    return {
      ...toRefs(state),
      cancel,
      confirm,
      defaultProps,
      handleNodeClick,
      deleteFun
    }
  }
}
</script>
<style lang="scss">
.copy-rule{
  height: calc(100vh - 400px);
  .copy-rule-tree{
    min-width: 200px;
    width: 200px;
    margin-left: -50px;
    margin-right: 10px;
    overflow: auto;
  }
  .copy-rule-table{
    width: 470px;
    margin-right: -30px;
    // overflow: auto;
  }
}
</style>
