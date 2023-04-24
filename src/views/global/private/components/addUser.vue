<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel" @success="confirm">
    <template #content>
      <base-form ref="form" :config="config.form" :params="params"/>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, computed } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { addConnectorPrivate } from '@/api/global/private'
import { ADD_USER_CONFIG } from '../config'

export default {
  components: { Dialog, Table, baseForm },
  emits: ['close', 'success'],
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      config: ADD_USER_CONFIG,
      loading: false,
      params: {
        user: ''
      }
    })
    const cancel = () => { // 关闭弹框
      context.emit('close')
    }
    const confirm = () => { // 确定
      (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
          addConnectorPrivate(state.params).then(res => {
            proxy.$notification('success')
            context.emit('success')
          })
        }
      })
    }
    return {
      ...toRefs(state),
      cancel,
      confirm
    }
  }
}
</script>
<style lang="scss">
</style>
