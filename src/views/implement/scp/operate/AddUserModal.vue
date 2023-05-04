<template>
  <Dialog v-bind="$attrs" :config="config" @close="close" @success="confirm">
    <template #content>
      <base-form ref="addUserForm" :config="config.form" :params="params" />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance, ref } from 'vue'
import store from '@/store'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { createBusinessUse } from '@/api/business/user'
import {
  ADD_USER_CONFIG,
} from '../config'

export default defineComponent({
  components: { Dialog, baseForm },
  emits: ['close', 'success'],
  props: {
    config: {
      type: Object,
      default: ADD_USER_CONFIG
    },
    compParams: {
      type: Object,
      default: {
      }
    }
  },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeId = computed(() => { return store.getters.treeId })
    const state = reactive({
      params: {
        username: ''
      }
    })

    const close: () => void = () => {
      proxy.$emit('close')
    }

    const confirm = async () => {
      (proxy.$refs.addUserForm as any).validFun().then(async valid => {
        if (valid) {
          const dataRet = await createBusinessUse(Number(treeId.value), state.params)
          if (dataRet) {
            proxy.$notification('success')
            close()
          }
        }
      })
    }

    onMounted(() => {
    })

    return {
      ...toRefs(state),
      close,
      confirm,
    }
  }
})
</script>

<style lang="scss" scoped></style>