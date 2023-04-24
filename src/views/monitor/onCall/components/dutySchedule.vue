<template>
  <Dialog v-bind="$attrs" :config="config" :params="params" :loading="loading" @close="cancel">
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
    <template #footer>
      <div class="btn-base">
        <el-button @click="cancel" type="info">{{$t('cancel')}}</el-button>
      </div>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, watch } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
// import 'brace/ext/searchbox'
import 'ace-builds/src-noconflict/mode-yaml'
import 'ace-builds/src-noconflict/theme-cobalt'
import 'ace-builds/src-noconflict/ext-searchbox'
// import 'brace/theme/cobalt'
import { DUTY_SCHEDULE_CONFIG } from '../config'
import { getDutySchedule } from '@/api/monitor/onCall.js'
import { VAceEditor } from 'vue3-ace-editor'
export default {
  components: { Dialog, VAceEditor, baseForm },
  emits: ['cancel'],
  props: {
    groupInfo: {
      type: Object,
      default: null
    }
  },
  setup (prop, context) {
    const state = reactive({
      loading: false,
      params: {
        name: '',
        description: '',
        config: ''
      },
      config: DUTY_SCHEDULE_CONFIG
    })
    const editorInit = (editor) => {
      editor.setReadOnly(true)
    }
    const getConfig = () => {
      getDutySchedule(prop.groupInfo.name).then((res: any) => {
        state.params.config = res
      })
    }
    watch(() => prop.groupInfo, (newVal, oldVal) => {
      if (newVal !== null) {
        getConfig()
        state.params.name = newVal.name
        state.params.description = newVal.description
      }
    }, {
      immediate: true,
      deep: true
    })
    const cancel = () => { // 关闭弹框
      context.emit('cancel')
    }
    return {
      ...toRefs(state),
      cancel,
      editorInit
    }
  }
}
</script>
<style lang="scss">
</style>
