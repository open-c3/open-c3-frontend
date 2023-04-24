<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel" @success="confirm">
    <template #content>
      <base-form ref="form" :config="config.form" :params="params">
        12
      </base-form>
    </template>
    <template #footer>
      <el-button type="primary">{{ $t('eventShield') }}</el-button>
      <el-button type="primary">{{ $t('monitorShield') }}</el-button>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, watch, getCurrentInstance, computed } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { getMonitorACK, editACK, monitorACKOrder } from '@/api/monitor/index'
import { ADD_SCRIPT_STEP_CONFIG } from '../config'
import { ElMessageBox } from 'element-plus'

export default {
  components: { Dialog, Table, baseForm },
  emits: ['close'],
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      bindTT: null,
      acked: {
        ackcaseP: 0,
        ackP: 0,
        ackcaseG: 0,
        ackG: 0,
        ackam: 0,
        tott: 0
      },
      caseInfo: null,
      caseUuid: '',
      params: {
        monitorObject: '',
        monitorContent: '',
        list: []
      },
      config: ADD_SCRIPT_STEP_CONFIG,
      loading: false
    })
    const getList = (val) => {
    }
    const cancel = () => { // 关闭弹框
      context.emit('close')
    }
    const edit = (ctrl, type) => { // 屏蔽操作
    }
    return {
      ...toRefs(state),
      cancel,
      confirm,
      edit
    }
  }
}
</script>
<style lang="scss">
</style>
