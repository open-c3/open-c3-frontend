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
              style="height: 900px;width: 100%;"/>
        </template>
      </base-form>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, watch, getCurrentInstance } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { ADD_GROUP_CONFIG } from '../config'
import { addConfigOnCall, getConfigOnCallById } from '@/api/monitor/onCall'
import { VAceEditor } from 'vue3-ace-editor'
// import 'brace/ext/searchbox'
import 'ace-builds/src-noconflict/mode-yaml'
import 'ace-builds/src-noconflict/theme-cobalt'
import 'ace-builds/src-noconflict/ext-searchbox'
// import 'brace/theme/cobalt'
export default {
  components: { Dialog, VAceEditor, baseForm },
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
        description: '',
        config: `
---
site: cn
pivot: 2021.06.10
queue:
- user1
- user2
- user3
---
site: us
pivot: 2021.06.11 20:00
timezone: America/Los_Angeles
duration: '19:10 ~ 7:20'
period: 7
level: [ 1, 2 ]
day: [ 1, 2, 3, 4, 5 ]
queue:
- usr1
- usr2
- usr3
`
      },
      config: ADD_GROUP_CONFIG
    })
    const editorInit = (editor) => {
      editor.setReadOnly(false)
    }
    const getConfig = () => {
      getConfigOnCallById(prop.groupInfo.id).then((res: any) => {
        state.params.config = res.config
      })
    }
    watch(() => prop.groupInfo, (newVal, oldVal) => {
      const config = JSON.parse(JSON.stringify(ADD_GROUP_CONFIG))
      if (newVal !== null) {
        config.form.config[0].disabled = true
        getConfig()
        state.params.id = newVal.id
        state.params.name = newVal.name
        state.params.description = newVal.description
        config.title = 'editOnCall'
      } else {
        config.title = 'addOnCall'
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
          if (state.params.id === null) {
            delete state.params.id
          }
          state.loading = true
          addConfigOnCall(state.params).then(res => {
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
      confirm,
      editorInit
    }
  }
}
</script>
<style lang="scss">
</style>
