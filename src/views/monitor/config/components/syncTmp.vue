<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel" @success="confirm">
    <template #content>
      {{ config }}
      <base-form ref="tmpForm" :config="config.form" :params="params"/>
    </template>
    
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import store from '@/store'
import { SYNC_TMP_CONFIG } from '../config'
import { saveRuleTpl } from '@/api/monitor/config.js'
export default {
  components: { Dialog, baseForm },
  emits: ['cancel', 'addSuccess'],
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        name: ''
      },
      loading: false,
      config: SYNC_TMP_CONFIG
    })
    const cancel = () => { // 关闭弹框
      context.emit('cancel')
    }
    // 弹框成功的回调
    const confirm = () => {
      (proxy.$refs.tmpForm as any).validFun().then(valid => {
        if (valid) {
          state.loading = true
          saveRuleTpl(store.getters.treeId, state.params.name).then(res => {
            context.emit('addSuccess')
            proxy.$notification('success')
          }).finally(() => {
            state.loading = false
          })
        }
      })
    }
    onMounted(() => {
    })
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
