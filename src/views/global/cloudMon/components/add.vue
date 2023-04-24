<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel" @success="confirm">
    <template #content>
      <base-form ref="form" :config="config.form" :params="params"/>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, computed, watch, onMounted } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { getCloudMonExporter, getCloudMonDetail, addCloudMon } from '@/api/global/cloudMon'
import { ADD_CONFIG } from '../config'

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
      config:ADD_CONFIG,
      loading: false,
      params: {
        id: '',
        name: '',
        type: '',
        describe: '',
        config: ''
      }
    })
    const cancel = () => { // 关闭弹框
      context.emit('close')
    }
    const confirm = () => { // 确定
      (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
          const data = state.params
          if (!props.info) {
            delete data.id
          }
          addCloudMon(data).then(res => {
            proxy.$notification('success')
            context.emit('success')
          })
        }
      })
    }
    onMounted(() => {
      getCloudMonExporter().then((res: any) => {
        state.config.form.config[1].data = res.map(item => {
          return {
            name: item,
            value: item
          }
        })
      })
    })
    watch(() => props.info, val => {
      if (val) {
        getCloudMonDetail(val.id).then((res: any) => {
          state.params = {
            id: val.id,
            name: res.name,
            type: res.type,
            describe: res.describe,
            config: res.config
          }
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
