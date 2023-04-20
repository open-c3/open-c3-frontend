<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel" @success="confirm">
    <template #content>
      <base-form ref="tmpForm" :config="config.form" :params="params"/>
    </template>
    
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import store from '@/store'
import { ADD_TMP_CONFIG } from '../config'
import { syncRuleTpl, getRuleTpl } from '@/api/monitor/config.js'
export default {
  components: { Dialog, baseForm },
  emits: ['cancel', 'addSuccess'],
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        treeId: store.getters.treeId,
        name: ''
      },
      loading: false,
      config: ADD_TMP_CONFIG
    })
    const cancel = () => { // 关闭弹框
      context.emit('cancel')
    }
    // 弹框成功的回调
    const confirm = () => {
      (proxy.$refs.tmpForm as any).validFun().then(valid => {
        if (valid) {
          state.loading = true
          syncRuleTpl(store.getters.treeId, state.params.name).then(res => {
            context.emit('addSuccess')
            proxy.$notification('success')
          }).finally(() => {
            state.loading = false
          })
        }
      })
    }
    onMounted(() => {
      getRuleTpl(store.getters.treeId).then((res: any) => {
        state.config.form.config[0].data = res.map(item => {
          return { id: item, name: item}
        })
      })
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
