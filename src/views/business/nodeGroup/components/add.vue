<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel" @success="confirm">
    <template #content>
      <base-form ref="form" :config="config.form" :params="params" class="ml-50 mr-50">
        <template #plugin>
          <saas-tabs v-model="params.plugin" :tabs="tabs" size="small mt-20 w560">
            <template #content="{ item }">
              <div v-if="item.name === 'node' && params.plugin === 'node'">
                <Table :thead="selectedType.nameHeader" :data="selectedType.nameList" @selectionChange="(val) => selectAry(val, 'node')" row-key="id" ref="nameTable" class="w560" max-height="250">
                  <template #multiple>
                    <el-table-column :reserve-selection="true" type="selection" align="center" width="45"/>
                  </template>
                </Table>
                <p>
                  {{ $t('advancedOptions')}}-{{ $t('handwrittenIP') }} <el-input type="text" v-model="more" :placeholder="$t('multipleIP')" class="w360"/>
                  <el-button @click="selectAry(more, 'more')" type="primary" class="ml5">{{ $t('confirm') }}</el-button>
                </p>
              </div>
              <div v-if="item.name === 'type' && params.plugin === 'type'">
                <Table :thead="selectedType.typeHeader" :data="selectedType.typeList" @selectionChange="(val) => selectAry(val, 'type')" row-key="type" ref="typeTable" class="w560" max-height="250">
                  <template #multiple>
                    <el-table-column :reserve-selection="true" type="selection" align="center" width="45"/>
                  </template>
                </Table>
                <p>
                  {{ $t('advancedOptions')}}-{{ $t('handwrittenIP') }} <el-input type="text" v-model="more" :placeholder="$t('multipleIP')" class="w360"/>
                  <el-button @click="selectAry(more, 'more')" type="primary" class="ml5">{{ $t('confirm') }}</el-button>
                </p>
              </div>
            </template>
          </saas-tabs>
        </template>
        <template #params>
          <Table :thead="thead" :data="params.params" class="w560">
            <template #id="{ index }">{{ index + 1 }}</template>
            <template #operate="{ row, index }">
              <el-button @click="deleteSelectAry(row.ip, index)" link type="primary">{{ $t('delete') }}</el-button>
            </template>
          </Table>
        </template>
      </base-form>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, watch } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import store from '@/store'
import { NAME_THEAD_CONFIG, ADD_GROUP_CONFIG, PARAMS_THEAD_CONFIG, TYPE_THEAD_CONFIG, TABS_CONFIG } from '../config'
import { ElMessageBox } from 'element-plus'
import { getJobNodeInfo, createJobNodeGroup, getJobNodeGroupInfo, updateJobNodeGroup } from '@/api/business/nodeGroup'
export default {
  components: { Dialog, Table, baseForm },
  emits: ['close', 'success'],
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const thead = PARAMS_THEAD_CONFIG
    const state = reactive({
      config:ADD_GROUP_CONFIG,
      loading: false,
      params: {
        name: '',
        plugin: 'node',
        params: []
      },
      selectedType: {
        nameList: [],
        typeList: [],
        nameHeader: NAME_THEAD_CONFIG,
        typeHeader: TYPE_THEAD_CONFIG
      },
      tabs: TABS_CONFIG,
      more: ''
    })
    // 选择或填写
    const selectAry = (val:Array<any> | string, type: string) => {
      // 高级选项填写的需要清空table表格的选项
      if (type === 'more') {
        const ary = Array.from(new Set(val.toString().split(',')))
        state.params.params = ary.map(item => {
          return { ip: item}
        })
        if (state.params.plugin === 'node') {
          (proxy.$refs.nameTable as any).resetCurRow()
        } else if (state.params.plugin === 'type') {
          (proxy.$refs.typeTable as any).resetCurRow()
        }
      } else  {
        if(type === 'type'){
          state.params.params = (val as any).map(item => {
            return { ip: item.type, id: item.id}
          })
        } else if (type === 'node') {
          state.params.params = (val as any).map(item => {
            return { ip: item.name, id: item.id }
          })
        }
        state.more = ''
      } 
    }
    // 删除已选的
    const deleteSelectAry = (ip: string, index: number) => {
      let row = null
      if (state.params.plugin === 'node') {
        row = state.selectedType.nameList.find(item => item.id === state.params.params[index]['id'])
        if (row) {
          (proxy.$refs.nameTable as any).toggleRowSelectionFun(row, false)
        }
      } else if (state.params.plugin === 'type') {
        row = state.selectedType.typeList.find(item => item.id === state.params.params[index]['id'])
        if (row) {
          (proxy.$refs.typeTable as any).toggleRowSelectionFun(row, false)
        }
      }
      if (!row) {
        state.more = ''
        state.params.params.splice(index, 1)
      }
    }
    const cancel = () => { // 关闭弹框
      context.emit('close')
    }
    const create = () => {
      createJobNodeGroup(store.getters.treeId, {
        name: state.params.name,
        params: state.params.params.map(item => item.ip).toString(),
        plugin: state.params.plugin
      }).then(res => {
        proxy.$notification('success')
        context.emit('success')
        state.loading = false
      })
    }
    const update = () => {
      updateJobNodeGroup(store.getters.treeId, prop.info.id, {
        name: state.params.name,
        params: state.params.params.map(item => item.ip).toString(),
        plugin: state.params.plugin
      }).then(res => {
        proxy.$notification('success')
        context.emit('success')
        state.loading = false
      })
    }
    const confirm = () => {
      (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
          const msg = prop.info ? proxy.$t('updateGroupMsg') : proxy.$t('createGroupMsg')
          ElMessageBox.confirm(msg, '', {
            confirmButtonText: proxy.$t('confirm'),
            cancelButtonText: proxy.$t('cancel'),
            type: 'warning'
          }).then(() => {
            state.loading = true
            if (prop.info) {
              update()
            } else {
              create()
            }
          })
        }
      })
    }
    
    const getList = () => {
      getJobNodeInfo(store.getters.treeId).then((res: any) => {
        state.selectedType.nameList = res
        const ary = []
        res.forEach(item => {
          if (!ary.find(child => child.type === item.type)) {
            ary.push({type: item.type, id: item.id })
          }
        })
        state.selectedType.typeList = ary
      })
    }
    watch(() => state.params.plugin, val => {
      state.params.params = []
      state.more = ''
    })
    watch(() => store.getters.treeId, val => {
      getList()
    }, {
      immediate: true
    })
    watch(() => prop.info, val => {
      if (val) {
        getJobNodeGroupInfo(store.getters.treeId, val.id).then((res: any) => {
          state.params.name = res.name
          state.params.plugin = res.plugin
          state.params.params = res.params.split(',').map(item => {
            return {
              ip: item
            }
          })
        })
      }
    }, {
      immediate: true,
      deep: true
    })
    return {
      ...toRefs(state),
      cancel,
      confirm,
      thead,
      selectAry,
      deleteSelectAry
    }
  }
}
</script>
<style lang="scss">
</style>
