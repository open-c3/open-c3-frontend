<template>
  <div class="btn-base">
    <Dialog v-bind="$attrs" :config="config" @close="close" @success="confirm">
    <template #content>
      <base-form ref="form" :config="config.form" :params="detailFrom" class="mt20 mb20" />
    </template>
  </Dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { CREATE_BLANK_LINE_CONFIG } from '../config'
import { createBlankLines } from '@/api/quickentry/index'
import { FlowBlankLine } from '@/api/interface/quickentry'
export default defineComponent({
  components: {
    Dialog,
    baseForm
  },
  props: {
    config: {
      type: Object,
      default: CREATE_BLANK_LINE_CONFIG
    },
    editItem: {
      type: Object,
      default: {}
    },
    treeId: {
      type: String,
      default: '4000000000'
    },
    treeData: {
      type: Object,
      default: {}
    },
  },
  emits: ['success', 'close'],
  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance

    const state = reactive({
      config: CREATE_BLANK_LINE_CONFIG,
      detailFrom: {
        name: ''
      }
    })

    const confirm = () => {
      (proxy?.$refs.form as any).validFun().then((flag: any) => {
        if (flag) { // 验证通过
          const params:FlowBlankLine = {
            treeId: props.treeId,
            name: state.detailFrom.name,
          }
          createBlankLines(props.treeId, params).then((data) => {
            proxy?.$notification('createLineSuccess')
            context.emit('success')
          }).finally(() => {
          })
        }
      })
    }

    const close = () => {
      proxy.$emit('close')
    }

    onMounted(()=> {
      state.detailFrom.name = props.editItem.name
    })
    return {
      ...toRefs(state),
      CREATE_BLANK_LINE_CONFIG,
      confirm,
      close,
    }
  }
})
</script>

<style lang="scss" scoped>

</style>