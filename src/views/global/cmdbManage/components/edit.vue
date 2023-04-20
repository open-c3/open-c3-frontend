<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel" @success="confirm">
    <template #content>
      <base-form ref="form" :config="config.form" :params="params"/>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, watch, onMounted } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { EDIT_CONFIG } from '../config'
import { getCMDBManageDetail, editCMDBManage } from '@/api/global/cmdbManage'
export default {
  components: { Dialog, Table, baseForm },
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  emits: ['close', 'success'],
  setup (props, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      config: EDIT_CONFIG,
      loading: false,
      params: {
        name: '',
        config: ''
      }
    })
    const cancel = () => { // 关闭弹框
      context.emit('close')
    }
    const confirm = () => { // 确定
      (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
          editCMDBManage(state.params).then(res => {
            proxy.$notification('success')
            context.emit('success')
          })
        }
      })
    }
    onMounted(() => {
    })
    watch(() => props.info, val => {
      if (val) {
        state.params.name = val.name
        getCMDBManageDetail(val.name).then((res: any) => {
          state.params.config = res.config
        })
      }
    }, {
      immediate: true,
      deep: true
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
