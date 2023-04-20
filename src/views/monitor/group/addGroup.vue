<template>
  <Dialog v-bind="$attrs" :config="config" :params="params" :loading="loading" @close="cancel" @success="confirm">
    <template #content>
      <base-form ref="form" :config="config.form" :params="params"/>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, watch, getCurrentInstance } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { ADD_GROUP_CONFIG } from '@/views/monitor/group/config'
import { addConfigGroup } from '@/api/monitor/index'
export default {
  components: { Dialog, baseForm },
  emits: ['addGroupSuccess', 'cancel'],
  props: {
    groupInfo: {
      type: Object,
      default: null
    }
  },
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      loading: false,
      params: {
        id: null,
        name: '',
        description: ''
      },
      config: ADD_GROUP_CONFIG
    })
    watch(() => prop.groupInfo, (newVal, oldVal) => {
      const config = JSON.parse(JSON.stringify(ADD_GROUP_CONFIG))
      if (newVal !== null) {
        state.params.id = newVal.id
        state.params.name = newVal.name
        state.params.description = newVal.description
        config.title = 'editAlarmReceivingGroup'
      } else {
        config.title = 'addAlarmReceivingGroup'
      }
      state.config = config
    }, {
      immediate: true,
      deep: true
    })
    const cancel = () => { // 关闭弹框
      context.emit('cancel')
    }
    // 弹框成功的回调
    const confirm = () => {
      (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
          state.loading = true
          if (state.params.id === null) {
            delete state.params.id
          }
          addConfigGroup(state.params).then(res => {
            if (res) {
              context.emit('addGroupSuccess')
              proxy.$notification('success')
            }
          }).finally(() => {
            state.loading = false
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
