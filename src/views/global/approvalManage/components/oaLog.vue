<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel">
    <template #content>
      <base-form ref="form" :config="config.form" :params="params"/>
    </template>
    <template #footer>
      <el-button @click="getData" type="primary">{{ $t('refresh') }}</el-button>
      <el-button @click="cancel">{{ $t('close') }}</el-button>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, watch, onMounted } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { OA_LOG_CONFIG } from '../config'
import { getAdminApprovalOaLog } from '@/api/global/approvalManage'
export default {
  components: { Dialog, Table, baseForm },
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  emits: ['close'],
  setup (props, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      config: OA_LOG_CONFIG,
      loading: false,
      params: {
        createLog: '',
        createLogTime: '',
        syncLog: '',
        syncLogTime: '',
        queryLog: '',
        queryLogTime: ''
      }
    })
    const cancel = () => { // 关闭弹框
      context.emit('close')
    }
    const getData = () => {
      state.loading = true
      getAdminApprovalOaLog(props.info.id).then((res: any) => {
        state.params = {
          createLog: res.create.log,
          createLogTime: res.create.time,
          syncLog: res.sync.log,
          syncLogTime: res.sync.time,
          queryLog: res.query.log,
          queryLogTime: res.query.time
        }
        state.loading = false
      })
    }
    onMounted(() => {
    })
    watch(() => props.info, val => {
      if (val) {
        getData()
      }
    }, {
      immediate: true,
      deep: true
    })
    return {
      ...toRefs(state),
      cancel,
      getData
    }
  }
}
</script>
<style lang="scss">
</style>
