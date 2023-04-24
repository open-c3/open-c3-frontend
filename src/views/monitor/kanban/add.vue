<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel" @success="confirm">
    <template #content>
      <el-form :model="params" :rules="rules" label-width="120px" label-position="right" ref="kanBanForm">
        <el-form-item :label="$t('dashBoardName')" prop="name">
          <el-input v-model="params.name" :placeholder="$t('dashBoardName')"/>
        </el-form-item>
        <el-form-item :label="$t('dashBoardUrl')" prop="name">
          <el-input v-model="params.url" :placeholder="$t('dashBoardUrl')"/>
        </el-form-item>
        <el-form-item class="btn-base">
          <el-button @click="confirm" type="primary">{{ $t('addDashBoard')}}</el-button>
        </el-form-item>
      </el-form>
      <Table :thead="kanBan.thead as any" :data="kanBan.list" :tableLoading="kanBan.loading">
          <template #id="{ row }">
            <span v-if="row"><el-switch v-model="row.switch" @change="e => defaultChange(e, row)"/></span>
          </template>
          <template #operate="{ row }">
            <el-button :disabled="row.edit_user === 'sys'" link @click="deleteFun(row)" type="primary">{{ $t('delete') }}</el-button>
          </template>
        </Table>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, watch, getCurrentInstance, computed } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import { getConfigKanBanList, createKanBan, updateKanBan, deleteKanBan } from '@/api/monitor/index'
import { ElMessageBox } from 'element-plus'
import { THEAD_CONFIG, ADD_CONFIG } from './config'
export default {
  components: { Dialog, Table },
  emits: ['cancel', 'addSuccess'],
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        name: '',
        url: ''
      },
      config: ADD_CONFIG,
      rules: {
        name: [{ required: true, trigger: 'blur', message: proxy.$t('requiredText') }],
        url: [{ required: true, trigger: 'blur', message: proxy.$t('requiredText') }]
      },
      kanBan: {
        thead: THEAD_CONFIG,
        list: [],
        loading: false
      },
      loading: false
    })
    const treeId = computed(() => {
      return store.getters.treeId
    })
    const cancel = () => { // 关闭弹框
      context.emit('cancel')
    }
    const getList = () => {
      state.kanBan.loading = true
      getConfigKanBanList(treeId.value).then(res => {
        res.forEach(item => {
          item.switch = item.default === 1
        })
        state.kanBan.list = res
      }).finally(() => {
        state.kanBan.loading = false
      })
    }
    // 弹框成功的回调
    const confirm = () => {
      (proxy.$refs.kanBanForm as any).validate(valid => {
        if (valid) {
          state.loading = true
          createKanBan(treeId.value, state.params).then(res => {
            context.emit('addSuccess')
            proxy.$notification('success')
            getList()
          }).finally(() => {
            state.loading = false
          })
        }
      })
    }
    const defaultChange = (e, row) => {
      updateKanBan(treeId.value, row.id).then(res => {
        getList()
      })
    }
    const deleteFun = (row) => { // 删除节点
      ElMessageBox.confirm(proxy.$t('deleteMsg'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        deleteKanBan(treeId.value, row.id).then(res => {
          getList()
        })
      }).catch(() => {})
    }
    watch(() => treeId.value, (newVal, oldVal) => {
      getList()
    }, {
      immediate: true
    })
    return {
      ...toRefs(state),
      cancel,
      confirm,
      defaultChange,
      deleteFun
    }
  }
}
</script>
<style lang="scss">
</style>
