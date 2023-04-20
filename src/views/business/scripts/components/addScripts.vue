<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel" @success="add">
    <template #content>
      <base-form ref="form" :config="config.form" :params="params">
        <template #cont>
          <v-ace-editor
            v-model:value="params.cont"
            @init="editorInit"
            lang="yaml"
            theme="cobalt"
            style="height: 400px;width: 100%;"/>
        </template>
      </base-form>
      <a :href="url" target="_blank" class="ml140">{{ $t('commandHelp') }}</a>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance, computed, watch } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { VAceEditor } from 'vue3-ace-editor'
// import 'brace/ext/searchbox'
import 'ace-builds/src-noconflict/mode-yaml'
import 'ace-builds/src-noconflict/theme-cobalt'
import 'ace-builds/src-noconflict/ext-searchbox'
// import 'brace/theme/cobalt'
import store from '@/store'
import { ADD_CONFIG } from '../config'
import { addScript, getScriptDetail, updateScript, getScripts } from '@/api/business/scripts'
import { g_url } from '@/utils'
import { ElMessageBox } from 'element-plus'
export default {
  components: { Dialog, VAceEditor, baseForm },
  emits: ['close', 'success'],
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      url: `${g_url}/book/客户端内置命令/`,
      list: [],
      params: {
        type: '',
        name: '',
        cont: ``,
        from: 'manual',
        select: ''
      },
      config: ADD_CONFIG,
      loading: false
    })
    const cancel = () => { // 关闭弹框
      context.emit('close')
    }
    // 添加/编辑
    const add = () => {
      (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
          const msg = prop.info ? 'updateScriptMsg' : 'addScriptMsg'
          ElMessageBox.confirm(proxy.$t(msg), '', {
            confirmButtonText: proxy.$t('confirm'),
            cancelButtonText: proxy.$t('cancel')
          }).then(() => {
            const apiFun = prop.info ? updateScript(store.getters.treeId, state.params, prop.info.id) : addScript(store.getters.treeId, state.params)
            apiFun.then(res => {
              proxy.$notification('success')
              context.emit('success')
            })
          })
        }
      })
    }
    const editorInit = (editor) => {
      editor.setReadOnly(false)
    }
    // 根据id获取详情
    const detail = (id: number) => {
      getScriptDetail(store.getters.treeId, id).then((res: any) => {
        state.params.cont = res.cont
        state.params.type = res.type
      })
    }
    // 获取列表
    const getList = () => {
      getScripts(store.getters.treeId, {}).then((res: any) => {
        state.config.form.config[3].data = res
      })
    }
    // 选择克隆
    watch(() => state.params.from, val => {
      state.config.form.config[3].hidden = val === 'manual' ? true : false
    }, {
      immediate: true
    })
    watch(() => state.params.select, val => {
      if (val) {
        detail(parseInt(val))
      }
    }, {
      immediate: true
    })
    onMounted(() => {
      if(prop.info) {
        state.params.name = prop.info.name
        detail(prop.info.id)
      } else {
        getList()
      }
      state.config.title = prop.info ? 'updateScript' : 'newScript'
      state.config.form.config[1].hidden = prop.info ? true : false
    })
    return {
      ...toRefs(state),
      cancel,
      confirm,
      add,
      editorInit,
      detail
    }
  }
}
</script>
<style lang="scss">
</style>
