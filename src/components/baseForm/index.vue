<template>
    <el-form ref="baseForm" :model="info" :label-position="config?.position || 'right'" :label-width="config?.labelWidth + 'px' || ''" :size="config?.size || ''" class="base-form">
        <el-row :gutter="config?.gutter || 0">
          <template v-for="(item, index) in config?.config" :key="index">
            <el-col v-if="!item.hidden" :span="item.span || 24" :offset="item.offset || 0">
              <el-form-item v-if="!item.hidden" :prop="item.prop" :rules="item.rules" :label="$t(item.label) + (config.symbol ? config.symbol : '')" :label-width="item.labelWidth ? item.labelWidth + 'px' : (config.labelWidth + 'px' || '')">
                <template v-if="item.type == 'desc'">
                  {{ info[item.prop] || '-' }}
                </template>
                <template v-else-if="item.type == 'slot'">
                  <slot :name="item.prop" :item="item" />
                </template>
                <form-item
                  v-else
                  :item="item"
                  v-model="info[item.prop]"
                />
                <div v-if="item.tips" class="f12" style="color: #ACB3CB;">{{ item.tips }}</div>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
        <slot name="other"></slot>
      </el-form>
  </template>
  
  <script lang="ts">
  import formItem from '../search/form-item.vue'
  import { getCurrentInstance, onMounted, reactive, toRefs, watch } from 'vue'
  
  export default {
    components: { formItem },
    props: {
      config: {
        type: Object,
        default: () => {}
      },
      params: {
        type: Object,
        default: () => {}
      },
      cloud: {
        type: String,
        default: ''
      }
    },
    setup (props, context) {
      const { proxy } = getCurrentInstance()
      let baseForm = null
      const state = reactive({
        info: {}
      })
      watch(() => props.params, () => {
        state.info = props.params
      }, {
        immediate: true
      })
  
      const clear = () => { // 清除验证
       ( proxy.$refs.baseForm as any).clearValidate()
      }
  
      const validFun = () => {
        const promise = new Promise(resolve => {
          baseForm.validate(valid => {
            resolve(valid)
          })
        })
        return promise
      }
  
      onMounted(() => {
        proxy.$nextTick(() => {
          baseForm = proxy.$refs.baseForm
        })
      })
      return {
        ...toRefs(state),
        baseForm,
        clear,
        validFun
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .base-form {
    :deep(.el-form-item .form_item) {
      width: 100%;
    }
  }
  </style>
  