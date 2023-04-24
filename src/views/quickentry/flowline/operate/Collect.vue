<template>
  <Dialog v-bind="$attrs" :config="config" @close="close" @success="confirm">
    <template #content>
      <base-form ref="form" :config="config.form" :params="detailFrom" class="mt20 mb20">
        <template #switch>
          <el-switch v-model="detailFrom.switch" />
        </template>
        <template #selectTree>
          <el-switch v-model="detailFrom.selectTree" />
        </template>
      </base-form>

      <div v-if="detailFrom.selectTree" class="select-tree">
        <div class="select-tree-name">
          <div class="select-tree-name-left">
            TREE:{{ $t('cloneTo') }} {{ toTreeId }}：{{ toTreeName }}
          </div>
          <div class="select-tree-name-right">
            <el-icon @click="scroll" class="mr2 hand">
              <Location />
            </el-icon>
            <el-icon @click="openAll" class="mr2 hand">
              <Plus />
            </el-icon>
            <el-icon @click="closeAll" class="mr2 hand">
              <Minus />
            </el-icon>
            <el-icon @click="getData" class="hand">
              <Refresh />
            </el-icon>
          </div>
        </div>
        <el-tree :data="treeArray" :props="defaultProps" :default-expanded-keys="[0, treeId]" :current-node-key="treeId"
          :highlight-current="true" @node-click="handleNodeClick" node-key="id" ref="serviceTree" class="mb20"
          id="tree-box">
          <template #default="{ node, data }">
            <div class="tree-name ellipsis" :title="node.label">
              <template v-if="data.children && data.children.length">
                <el-icon v-if="node.expanded">
                  <FolderOpened />
                </el-icon>
                <el-icon v-else>
                  <Folder />
                </el-icon>
              </template>
              <el-icon v-else>
                <CopyDocument />
              </el-icon>
              {{ node.label }}
            </div>
          </template>
        </el-tree>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, getCurrentInstance, ComponentInternalInstance } from 'vue'
import store from '@/store'
import { setCookies, getCookie } from '@/utils/cookie'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { COLLECT_DIALOG_CONFIG } from '../config'
import {
  modiftNameLine,
  addToFavoriteOperate,
  createBlankLines,
  createJobLine,
  createJobxEnv,
} from '@/api/quickentry/index'
import { getUserTree } from '@/api/userCenter'
import {
  ReNameFlowLine,
  FavoritesParams,
  FlowBlankLine,
  CreateJobLine,
} from '@/api/interface/quickentry'

interface TreeInfo {
  id: number;
  name: string;
  children?: TreeInfo[];
}
interface Stateinfo {
  detailFrom: {
    name: string;
    switch: boolean;
    selectTree: boolean;
  },
  defaultProps: {
    children: string;
    label: string;
  },
  treeArray: TreeInfo[];
  toTreeId: string | number;
  toTreeName: string;
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
      default: COLLECT_DIALOG_CONFIG
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
      default: {
        id: '4000000000', 
        name: 'private',
      }
    },
  },

  emits: ['success', 'close'],

  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeArray = computed(() => {
      return store.getters.treeArray
    })

    const state: Stateinfo = reactive({
      detailFrom: {
        name: '',
        switch: false,
        selectTree: false
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeArray: [],
      toTreeId: props.treeId,
      toTreeName: props.treeData.name,
    })

    const openOrClose: (bool: boolean) => void = (bool: Boolean): void => {
      const nodeDatas = (proxy.$refs.serviceTree as any).store.nodesMap
      // 循环所有节点，将需要收起的节点数据的 expanded 属性设置为false
      for (const key in nodeDatas) {
        nodeDatas[key].expanded = bool
      }
    }

    const scroll: () => void = (): void => {
      document.getElementById('tree-box').scrollTo(0, 0)
    }
    // 关闭所有
    const closeAll: () => void = (): void => {
      openOrClose(false)
    }
    // 展开所有
    const openAll: () => void = (): void => {
      openOrClose(true)
    }

    const getData: () => Promise<void> = async (): Promise<void> => {
      const dataRet = await getUserTree()
      if (dataRet) {
        // const arr: TreeInfo[] = [{
        const arr = [{
          id: 0,
          name: 'root',
          children: dataRet
        }]
        state.treeArray = arr as any
        proxy.$nextTick(() => {
          const treeId = getCookie('treeId')
          const treeData = getCookie('treeData')
          if (treeId) {
            (proxy.$refs.serviceTree as any).setCurrentKey(treeId)
            handleNodeClick(JSON.parse(treeData), 'select')
          } else {
            handleNodeClick(props.treeData as any, 'select')
          }
        })
      }
    }

    const confirm = () => {
      (proxy?.$refs.form as any).validFun().then(async (flag: any) => {
        if (flag) {
          switch (props.conTypes) {
            case 'Collect':
              const params: FavoritesParams = {
                name: state.detailFrom.name,
                ciid: props.editItem.id
              }
              addToFavoriteOperate(props.treeId, params).then((data) => {
                proxy?.$notification('favoritesSuccess')
                context.emit('success')
              })
                .finally(() => {
                })
              break
            case 'buildLine':
              const buildParams: FlowBlankLine = {
                name: state.detailFrom.name,
                status: +state.detailFrom.switch,
                sourceid: props.editItem.id
              }
              createBlankLines(props.treeId, buildParams).then((res) => {
                proxy?.$notification('createLineSuccess')
                context.emit('success')
              })
              break
            case 'copyAs':
            case 'saveTemp':
              // 新建流水线
              const copyParams: FlowBlankLine = {
                name: state.detailFrom.name,
                sourceid: props.editItem.id,
                status: state.detailFrom.selectTree ? 0 : +state.detailFrom.switch,
              }
              const createDataRet = await createBlankLines(props.conTypes === 'saveTemp' ? 0 : state.toTreeId, copyParams)

              // 新建作业
              const jobParams: CreateJobLine = {
                fromname: `_ci_${props.editItem.id}_`,
                toname: `_ci_${createDataRet.id}_`,
                toprojectid: props.conTypes === 'saveTemp' ? 0 : state.toTreeId
              }
              const CreateJobDataRet = await createJobLine(props.treeId, jobParams)
              // 新建测试环境作业
              const testParams: CreateJobLine = {
                fromname: `_ci_test_${props.editItem.id}_`,
                toname: `_ci_test_${createDataRet.id}_`,
                toprojectid: props.conTypes === 'saveTemp' ? 0 : state.toTreeId
              }
              const testDataRet = await createJobxEnv(props.treeId, testParams)

              // 新建线上环境作业
              const onlineParams: CreateJobLine = {
                fromname: `_ci_online_${props.editItem.id}_`,
                toname: `_ci_online_${createDataRet.id}_`,
                toprojectid: props.conTypes === 'saveTemp' ? 0 : state.toTreeId
              }
              const onlineDataRet = await createJobxEnv(props.treeId, onlineParams)
              if (createDataRet && CreateJobDataRet && testDataRet && onlineDataRet) {
                proxy?.$notification('operationSuccess')
                context.emit('success')
              }
              break
            case 'modifyName':
              const modifyParams: ReNameFlowLine = {
                name: state.detailFrom.name,
                id: props.editItem.id
              }
              const modifyDataRet = await modiftNameLine(props.treeId, modifyParams)
              if (modifyDataRet) {
                proxy?.$notification('operationSuccess')
                context.emit('success')
              }
              break
          }
        }
      })
    }

    const close = () => {
      proxy.$emit('close')
    }

    const handleNodeClick = (data: TreeInfo, node?: string) => {
      state.toTreeId = data.id
      state.toTreeName = data.name
    }

    const getDetailFormName = () => {
      switch (props.conTypes) {
        case 'Collect':
        case 'modifyName':
          state.detailFrom.name = props.editItem.name
          break
        case 'buildLine':
          state.detailFrom.name = `${props.editItem.name}-${proxy.$t('template')}`
          break
        case 'copyAs':
          state.detailFrom.name = `${props.editItem.name}-copy`
          break
      }
    }

    onMounted(() => {
      state.treeArray = treeArray.value
      getDetailFormName()
    })

    return {
      treeArray,
      ...toRefs(state),
      COLLECT_DIALOG_CONFIG,
      confirm,
      close,
      handleNodeClick,
      scroll,
      closeAll,
      openAll,
      getData,
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
    width: 70px;
    height: 100%
  }
}
</style>