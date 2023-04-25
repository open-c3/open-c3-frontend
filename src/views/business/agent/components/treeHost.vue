<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel">
    <template #content>
      <Table :thead="thead" :data="list" :tableLoading="tableLoading" class="mt20">
        <template #nameCheck>
          <el-table-column>
            <template #header>
              <el-checkbox :indeterminate="nameIndeterminate" v-model="name" @change="val => checkAll(val, 'name')">{{ $t('hostname') }}</el-checkbox>
            </template>
            <template #default="scope">
              <el-checkbox v-if="scope.row.name !== ''" v-model="scope.row.nameCheck" @change="val => checkOne(val, 'name')">{{ scope.row.name }}</el-checkbox>
            </template>
          </el-table-column>
        </template>
        <template #inipCheck>
          <el-table-column>
            <template #header>
              <el-checkbox :indeterminate="inipIndeterminate" v-model="inip" @change="val => checkAll(val, 'inip')">{{ $t('privateIP') }}</el-checkbox>
            </template>
            <template #default="scope">
              <el-checkbox v-if="scope.row.inip !== ''" v-model="scope.row.inipCheck" @change="val => checkOne(val, 'inip')">{{ scope.row.inip }}</el-checkbox>
            </template>
          </el-table-column>
        </template>
        <template #exipCheck>
          <el-table-column>
            <template #header>
              <el-checkbox :indeterminate="exipIndeterminate" v-model="exip" @change="val => checkAll(val, 'exip')">{{ $t('internetIP') }}</el-checkbox>
            </template>
            <template #default="scope">
              <el-checkbox v-if="scope.row.exip !== ''" v-model="scope.row.exipCheck" @change="val => checkOne(val, 'exip')">{{ scope.row.exip }}</el-checkbox>
            </template>
          </el-table-column>
        </template>
      </Table>
    </template>
    <template #footer>
      <el-button @click="cancel">{{ $t('cancel') }}</el-button>
      <el-button @click="confirm" type="primary">{{ $t('selected') }}</el-button>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { getNodeInfo } from '@/api/monitor/config'
import { HOST_THEAD_CONFIG, TREE_HOST_CONFIG } from '@/views/business/agent/config'

export default {
  components: { Dialog, Table, baseForm },
  props: {
    treeId: {
      type: Number,
      default: 4000000000
    },
    treeData: {
      type: Object,
      default: () => null
    },
    info: {
      type: Object,
      default: () => null
    }
  },
  emits: ['close', 'confirm'],
  setup (props, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      config:TREE_HOST_CONFIG,
      loading: false,
      thead: HOST_THEAD_CONFIG,
      list: [],
      tableLoading: false,
      relation: {},
      name: false,
      nameIndeterminate: false,
      inip: false,
      inipIndeterminate: false,
      exip: false,
      exipIndeterminate: false
    })
    const cancel = () => { // 关闭弹框
      context.emit('close')
    }
    const confirm = () => {
      const ary = []
      state.list.forEach(item => {
        if (item.name && item.nameCheck) {
          ary.push(item.name)
        }
        if (item.inip && item.inipCheck) {
          ary.push(item.inip)
        }
        if (item.exip && item.exipCheck) {
          ary.push(item.exip)
        }
      })
      context.emit('confirm', ary)
    }
    // 全选
    const checkAll = (val, type) => {
      state.list.forEach(item => {
        if (item[type] !== '') {
          item[`${type}Check`] = val
        }
      })
      state[`${type}Indeterminate`] = false
    }
    // 选择单个
    const checkOne = (val, type) => {
      const ary = state.list.filter(item => item[type] !== '' && item[`${type}Check`] === true)
      const all = state.list.filter(item => item[type] !== '')
      state[type] = ary.length === all.length ? true : false
      state[`${type}Indeterminate`] = ary.length && ary.length < all.length ? true : false
    }
    onMounted(() => {
      if (props.treeId) {
        getNodeInfo(props.treeId).then((res: any) => {
          state.list = res.map(item => {
            item.nameCheck = false
            item.inipCheck = false
            item.exipCheck = false
            return item
          })
        })
      }
      if (props.treeData) {
        state.config.titleParams.parent = props.treeData['parent']
      }
      if (props.info) {
        state.config.titleParams.id = props.info['id']
      }
    })
    return {
      ...toRefs(state),
      cancel,
      confirm,
      checkAll,
      checkOne
    }
  }
}
</script>
<style lang="scss">
</style>
