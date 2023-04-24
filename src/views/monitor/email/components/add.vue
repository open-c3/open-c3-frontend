<template>
  <Dialog v-bind="$attrs" :config="config" :params="params" :loading="loading" @close="cancel" @success="confirm">
    <template #content>
      <base-form ref="form" :config="config.form" :params="params">
        <template #config>
          <v-ace-editor
            v-model:value="params.config"
            @init="editorInit"
            lang="yaml"
            theme="cobalt"
            style="height: 300px;width: 100%;"/>
        </template>
      </base-form>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, watch, getCurrentInstance } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import { VAceEditor } from 'vue3-ace-editor'
// import 'brace/ext/searchbox'x
import 'ace-builds/src-noconflict/mode-yaml'
import 'ace-builds/src-noconflict/theme-cobalt'
import 'ace-builds/src-noconflict/ext-searchbox'
// import 'brace/theme/cobalt'
import baseForm from '@/components/baseForm/index.vue'
import { ADD_CONFIG } from '../config'
import { addEmailConfig, getEmailConfig } from '@/api/monitor/email.js'

export default {
  components: { Dialog, VAceEditor, baseForm },
  emits: ['cancel', 'addSuccess'],
  props: {
    emailInfo: {
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
        description: '',
        config: `
---
POP3:
  USER: foo@xx.com
  PASSWORD: abc123
  HOST: pop.exmail.qq.com

to: '@ops'
`
      },
      config: ADD_CONFIG
    })
    const editorInit = (editor) => {
      editor.setReadOnly(false)
    }
    const getConfig = () => {
      getEmailConfig(prop.emailInfo.id).then((res: any) => {
        state.params.config = res.config
      })
    }
    watch(() => prop.emailInfo, (newVal, oldVal) => {
      if (newVal !== null) {
        state.params.name = newVal.name
        state.params.description = newVal.description
        state.params.id = newVal.id
        getConfig()
      }
    }, {
      immediate: true,
      deep: true
    })
    // 弹框成功的回调
    const confirm = () => {
      (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
          if (state.params.id === null) {
            delete state.params.id
          }
          state.loading = true
          addEmailConfig(state.params).then(res => {
            context.emit('addSuccess')
            proxy.$notification('success')
          }).finally(() => {
            state.loading = false
          })
        }
      })
    }
    const cancel = () => { // 关闭弹框
      context.emit('cancel')
    }
    return {
      ...toRefs(state),
      cancel,
      confirm,
      editorInit
    }
  }
}
</script>
<style lang="scss">
</style>
