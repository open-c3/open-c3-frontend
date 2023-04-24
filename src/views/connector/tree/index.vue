
<template>
  <div class="body-layout1">
    <!-- @node-click="nodeClick" -->
    <el-tree :data="treeData" :props="defaultProps" default-expand-all :expand-on-click-node="false" node-key="id" class="connector-tree">
      <template #default="{ node, data }">
        <template v-if="data.children && data.children.length">
          <el-icon v-if="node.expanded"><FolderOpened /></el-icon>
          <el-icon v-else><Folder /></el-icon>
        </template>
        <el-icon v-else><CopyDocument /></el-icon>
        <el-popover placement="right" :width="300" trigger="click">
          <p>{{nodeClick(data, node)}}</p>
          <p>
            <template v-if="data.id >= 4000000000">{{ $t('privateNode') }}</template>
            <el-button v-if="node.level < 6 && data.id < 4000000000" @click="addNode(data, node)" type="primary" link>{{ $t('addNode') }}</el-button>
            <el-button v-if="node.level > 1 && data.id < 4000000000" @click="deleteNode(data, node)" type="primary" link>{{ $t('deleteNode') }}</el-button>
          </p>
          <template #reference>
            <span @click="data.visible = true">
              {{ node.label }}
            </span>
          </template>
        </el-popover>
      </template>
    </el-tree>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import { getConnectorUserTree, connectorAddTreeNode, connectorDeleteTreeNode, getTreeNodeResource } from '@/api/connector/tree'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  components: { searchFrom, Table },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      }
    })
    // const setVisible = (data) => {
    //   if (Array.isArray(data)) {
    //     data.forEach(item => {
    //       setVisible(item)
    //     })
    //   } else {
    //     data.visible = false
    //     if (data.children) {
    //       data.children.forEach(item => {
    //         setVisible(item)
    //       })
    //     }
    //   }
    // }
    const nodeClick = (data, node) => {
      if (node) {
        let currentN = node
        let nodesStr = node.data.name
        while(currentN.level > 1){
          currentN = currentN.parent
          nodesStr = currentN.data.name + '.' + nodesStr
        }
        return nodesStr
      }
    }
    const getData = () => {
      getConnectorUserTree().then(res => {
        // const children = res
        // setVisible(children)
        // state.treeData = [ { id: 0, name: 'ROOT', children: children, visible: false }]
        state.treeData = [ { id: 0, name: 'ROOT', children: res, visible: false }]
      })
    }
    // 增加节点
    const addNode = (data, node) => {
      const nodeName = nodeClick(data, node)
      ElMessageBox.prompt(proxy.$t('addNodeTitle'), proxy.$t('addNodeMsg', {name: nodeName}), {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        // inputPattern:/^\S+$/g,
        inputPattern:/^[a-zA-Z][a-zA-Z0-9_]*$/,
        inputErrorMessage: proxy.$t('requiredText'),
        inputPlaceholder: 'new node name'
      }).then(({ value }) => {
        connectorAddTreeNode(data.id, {name: value}).then(res => {
          proxy.$notification('success')
          getData()
        })
      }).catch(() => {
      })
    }
    // 删除节点
    const deleteNode = (data, node) => {
      const nodeName = nodeClick(data, node)
      ElMessageBox.confirm(proxy.$t('deleteNodeMsg', {name: nodeName}), proxy.$t('deleteNodeTitle'), {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        getTreeNodeResource(data.id).then(res => {
          connectorDeleteTreeNode(data.id).then(res => {
            proxy.$notification('success')
            getData()
          })
        })
      })
    }
    onMounted(() => {
      getData()
    })
    return {
      ...toRefs(state),
      nodeClick,
      addNode,
      deleteNode
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
