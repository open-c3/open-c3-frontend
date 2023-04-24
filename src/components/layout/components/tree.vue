<template>
  <div class="c3-service-tree">
    <el-autocomplete v-model="filterText" :fetch-suggestions="getFilterTree" @select="data => handleNodeClick(data, 'select')" clearable placeholder="Search" value-key="name" select-when-unmatched class="wp100"/>
    <div class="monitor-tree-btn">
      <span>TREE</span>
      <span>
        <el-icon @click="scroll" class="mr2 hand"><Location /></el-icon>
        <el-icon @click="openAll" class="mr2 hand"><Plus /></el-icon>
        <el-icon @click="closeAll" class="mr2 hand"><Minus /></el-icon>
        <el-icon @click="getData" class="hand"><Refresh /></el-icon>
      </span>
    </div>
    <!-- <div><span v-for="item in parentAry">{{ item.name }}</span></div> -->
    <div class="tree-box" id="tree-box">
      <el-tree :data="treeAry" :props="defaultProps" :highlight-current="true" :expand-on-click-node="false" @node-click="handleNodeClick" node-key="id" ref="serviceTree" class="mb20">
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
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs, getCurrentInstance } from 'vue'
import { getUserTree } from '@/api/userCenter'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { setCookies, getCookie } from '@/utils/cookie'
export default {
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      treeAry: [],
      filterText: '',
      currentNodeKey: 4000000000,
      allIds: [],
      loading: false,
      treeId: 4000000000,
      treeData: { id: 4000000000, name: 'private', parent: 'root.private' },
      allChild: [],
      parentAry: []
    })
    const defaultProps = {
      children: 'children',
      label: 'name'
    }
    const openOrClose = (bool: Boolean) => {
      const nodeDatas = (proxy.$refs.serviceTree as any).store.nodesMap
      // 循环所有节点，将需要收起的节点数据的 expanded 属性设置为false
      for (const key in nodeDatas) {
        nodeDatas[key].expanded = bool
      }
    }
    // 关闭所有
    const closeAll = () => {
      openOrClose(false)
    }
    // 展开所有
    const openAll = () => {
      openOrClose(true)
    }
    
    const getData = () => {
      state.loading = true
      getUserTree().then((res : any) => {
        const ary = [
          {
            id: 0,
            name: 'root',
            children: res
          }
        ]
        state.treeAry = ary
        state.allChild = ary
        store.dispatch('setTreeArray', JSON.parse(JSON.stringify(ary)))
        proxy.$nextTick(() => {
          const treeId = getCookie('treeId')
          const treeData = getCookie('treeData')
          if (treeId) {
            (proxy.$refs.serviceTree as any).setCurrentKey(treeId)
            handleNodeClick(JSON.parse(treeData), 'select')
          } else {
            handleNodeClick(state.treeData, 'select')
          }
        })
      }).finally(() => {
        state.loading = false
      })
      // const ary = [
      //   {
      //     id: 0,
      //     name: 'root',
      //     children: resData
      //   }
      // ]
      // state.treeAry = ary
      // getAllIds(ary)
      // proxy.$nextTick(() => {
      //   const treeId = getCookie('treeId')
      //   const treeData = getCookie('treeData')
      //   if (treeId) {
      //     (proxy.$refs.serviceTree as any).setCurrentKey(treeId)
      //     handleNodeClick(JSON.parse(treeData), 'select')
      //   } else {
      //     handleNodeClick(state.treeData, 'select')
      //   }
      // })
    }
    const getParent = (node) => {
      if (!node.parent) {
        return
      }
      state.parentAry.unshift(node.data)
      getParent(node.parent)
    }

    const handleNodeClick = (data, node?) => {
      const newData = {
        id: data.id,
        name: data.name,
        parent: ''
      }
      if (node && node === 'select') {
        newData.parent = data.parent;
        (proxy.$refs.serviceTree as any).setCurrentKey(data.id)
      } else {
        state.parentAry = []
        getParent(node)
        newData.parent = state.parentAry.map(item => item.name).join('.')
      }
      state.treeId = data.id
      state.treeData = data
      store.dispatch('setTreeId', data.id)
      store.dispatch('setTreeData', newData)
      setCookies('treeId', data.id)
      setCookies('treeData', JSON.stringify(newData))
    }

    const getAllIds = (data) => {
      if (Array.isArray(data)) {
        data.forEach(item => {
          getAllIds(item)
        })
      } else {
        state.allChild.push(data)
        if (typeof data.children !== 'undefined' && data.children.length > 0) {
          data.children.forEach(item => {
            getAllIds(item)
          })
        }
      }
    }

    // 搜索服务树
    const getFilterTree = (query, cb) => {
      if (query) {
        cb(state.allChild.filter(item => item.name.includes(query)))
      } else {
        cb([])
      }
    }
    const scroll = () => {
      document.getElementById('tree-box').scrollTo(0, 0)
    }
    onMounted(() => {
      getData()
    })
    return {
      ...toRefs(state),
      defaultProps,
      getData,
      openAll,
      closeAll,
      handleNodeClick,
      getFilterTree,
      scroll
    }
  }
}
</script>

<style lang="scss">
.c3-service-tree {
  overflow: hidden;
  height: calc(100vh - 64px);
  .monitor-tree-btn{
    padding: 10px 10px 10px 5px;
    display: flex;
    justify-content: space-between;
    background-color: var(--color_menu_2_bg);
    @include font-base(14px, rgb(102, 102, 102), 500);
  }
  .tree-box {
    padding-left: 5px;
    padding-right: 10px;
    height: calc(100% - 70px);
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .tree-name{
      //  @include font-base(12px, $color-7, 500);
    }
    .el-tree {
      width: 100%;
    }
    .el-tree > .el-tree-node{
      width: 100%;
    }
  }
}
</style>
