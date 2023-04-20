<template>
  <el-popover
    v-model:visible="visible"
    placement="bottom-start"
    width="400"
    trigger="focus">
    <div class="f12 lh20">
      <div class="df ai_c">
        <el-icon v-if="numPass" class="c-success"><circle-check /></el-icon>
        <el-icon v-else class="c-error"><circle-close /></el-icon>
        <div class="ml10">最少 8 个字符</div>
      </div>
      <div class="df ai_c">
        <el-icon  v-if="rulePass" class="c-success"><circle-check /></el-icon>
        <el-icon v-else class="c-error"><circle-close /></el-icon>
        <div class="ml10">至少包含小写字母、大写字母、数字、特殊字符（!@#$%&*_-）中的三种</div>
      </div>
    </div>
    <template #reference>
      <el-input
        v-model.trim="password"
        :placeholder="placeholder"
        autocomplete="new-password"
        show-password
        v-bind="$attrs"
        @blur="inputBlur"
        @focus="inputFocus"
        @input="validateFun()"/>
    </template>
  </el-popover>
</template>

<script lang="ts">
import { getCurrentInstance, reactive, toRefs, watch } from 'vue'

import { passwordNum } from '@/utils'

export default {
  props: {
    modelValue: String,
    placeholder: String
  },
  emits: ['update:modelValue'],
  setup (props) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      password: '',
      numPass: false,
      rulePass: false,
      visible: false
    })
    const validateFun = () => { // 输入变化验证
      const password = state.password
      if (password.length >= 8) {
        state.numPass = true
      } else {
        state.numPass = false
      }
      const n = passwordNum(password)
      if (n >= 3) {
        state.rulePass = true
      } else {
        state.rulePass = false
      }
    }
    const inputFocus = () => {
      state.visible = true
    }
    const inputBlur = () => {
      state.visible = false
    }
    // 监控
    watch(() => props.modelValue, value => {
      // 表单重置触发
      state.password = value
    }, {
      immediate: true
    })
    watch(() => state.password, value => {
      proxy.$emit('update:modelValue', value)
    }, {
      immediate: true,
      deep: true
    })
    return {
      ...toRefs(state),
      validateFun,
      inputFocus,
      inputBlur
    }
  }
}
</script>
