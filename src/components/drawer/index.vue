<template>
  <el-drawer
    v-if="title !== ''"
    v-bind="$attrs"
    v-model="modelValue"
    :title=" $t(title) || title "
    :direction="direction"
    :size="width"
    :modal="modal"
    :custom-class="customClass">
    <div v-loading="loading" class="drawer-content"><slot name="content" /></div>
    <template v-if="footerFlag" #footer><slot name="footer"/></template>
  </el-drawer>
  <el-drawer
    v-else
    v-bind="$attrs"
    v-model="modelValue"
    :show-close="false"
    :direction="direction"
    :size="width"
    :modal="modal"
    :custom-class="customClass">
    <template #header><slot name="drawerHeader"/></template>
    <div v-loading="loading" class="drawer-content"><slot name="content" /></div>
    <template v-if="footerFlag" #footer><slot name="footer"/></template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ComponentInternalInstance } from 'vue'

// const emits = defineEmits(['close', 'update:modelValue'])
const { slots } = getCurrentInstance() as ComponentInternalInstance
const footerFlag = slots.footer ? true : false
const props = defineProps({
  modelValue: Boolean,
  modal: { // 是否存在遮照层
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '50%'
  },
  loading: {
    type: Boolean,
    default: false
  },
  direction: { // 打开的方向
    type: String,
    default: 'rtl'
  },
  customClass: {
    type: String,
    default: ''
  }
})
// function closeFun () {
//   emits('close')
//   emits('update:modelValue', false)
// }
</script>
