<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel" @success="confirm">
    <template #content>
      <base-form ref="form" :config="config.form" :params="params">
        <template #help>
          <el-input
            v-if="params.subtype !== 'link'"
            v-model="params.help"
            :autosize="{ minRows: 5, maxRows: 8 }"
            disabled
            type="textarea"
            :placeholder="helpObj[params.type]"/>
          <el-input
            v-else
            v-model="params.help"
            :autosize="{ minRows: 5, maxRows: 8 }"
            disabled
            type="textarea"
            :placeholder="helpObj.link"/>
        </template>
      </base-form>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, watch, getCurrentInstance } from 'vue'
import store from '@/store'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { ADD_INDICATORS_CONFIG, helpObj } from '../config'
import { addCollector } from '@/api/monitor/config'

export default {
  components: { Dialog, baseForm },
  emits: ['cancel', 'addSuccess'],
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        id: '',
        type: 'port',
        subtype: '',
        content1: '',
        content2: '',
        help: ''
      },
      config: ADD_INDICATORS_CONFIG,
      loading: false
    })
    watch(() => state.params.type, (newVal, oldVal) => {
      const fromConfig = JSON.parse(JSON.stringify(ADD_INDICATORS_CONFIG))
      state.params.content1 = ''
      state.params.content2 = ''
      if (newVal === 'port') {
        fromConfig.form.config.splice(2, 3)
        fromConfig.form.config.splice(3, 1)
      } else if (newVal === 'process') {
        fromConfig.form.config[5].label = 'process'
        fromConfig.form.config[5].placeholder = 'process'
        fromConfig.form.config.splice(1, 1)
        fromConfig.form.config.splice(2, 2)
        fromConfig.form.config.splice(3, 1)
      } else if (newVal === 'http') {
        fromConfig.form.config[5].label = 'URL'
        fromConfig.form.config[5].placeholder = 'URL'
        fromConfig.form.config.splice(1, 2)
        fromConfig.form.config.splice(2, 1)
      } else if (newVal === 'path') {
        fromConfig.form.config[5].label = 'path'
        fromConfig.form.config[5].placeholder = 'path'
        if (state.params.subtype !== 'link') {
          fromConfig.form.config.splice(1, 3)
          fromConfig.form.config.splice(3, 1)
        }
      } else if (newVal === 'push') {
        fromConfig.form.config.splice(1, 6)
        fromConfig.noFooter = true
      } else if (newVal === 'nodeext') {
        fromConfig.form.config[5].label = 'URL'
        fromConfig.form.config[5].placeholder = 'URL'
        fromConfig.form.config.splice(1, 4)
        fromConfig.form.config.splice(2, 1)
      }
      state.config = fromConfig
    }, {
      immediate: true
    })
    watch(() => state.params.subtype, (newVal, oldVal) => {
      const fromConfig = JSON.parse(JSON.stringify(ADD_INDICATORS_CONFIG))
      if (state.params.type === 'path') {
        fromConfig.form.config[5].label = 'path'
        fromConfig.form.config[5].placeholder = 'path'
        if (newVal !== 'link') {
          fromConfig.form.config.splice(1, 3)
          fromConfig.form.config.splice(3, 1)
        } else {
          fromConfig.form.config.splice(1, 3)
        }
        state.config = fromConfig
      }
    }, {
      immediate: true
    })
    watch(() => prop.info, (newVal, oldVal) => {
      console.log(newVal)
      if (newVal !== null) {
        state.params.type = newVal.type
        state.params.subtype = newVal.subtype
        state.params.content1 = newVal.content1
        state.params.content2 = newVal.content2
        state.params.id = newVal.id
        state.config.title = 'editCollectionMonIndicators'
      } else {
        state.config.title = 'addCollectionMonIndicators'
      }
    }, {
      immediate: true,
      deep: true
    })
    onMounted(() => {
    })
    const cancel = () => { // 关闭弹框
      context.emit('cancel')
    }
    // 弹框成功的回调
    const confirm = () => {
      (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
          if (state.params.type === 'port' && state.params.content1.length === 1) {
            proxy.$notification('check port', 'info')
            return
          }
          state.loading = true
          let data = {
            id: null,
            type: state.params.type,
            subtype: state.params.type === 'nodeext' ? 'nodeext' : state.params.subtype,
            content1 : state.params.content1,
            content2: state.params.content2,
          }
          if (state.params.id !== '') {
            data.id = state.params.id
          } else {
            delete data.id
          }
          
          addCollector(store.getters.treeId, data).then(res => {
            context.emit('addSuccess')
            proxy.$notification('success')
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
      helpObj
    }
  }
}
</script>
<style lang="scss">
</style>
