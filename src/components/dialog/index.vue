<template>
    <el-dialog v-bind="$attrs" :title="config.titleParams ? $t(config.title, config.titleParams ) : $t(config.title)" :close-on-click-modal="config.modalControl" :show-close="config.showClose" append-to-body :width="config.width ? config.width : '800px'" @close="close" :class="config.customClass ? config.customClass : 'edit-node'">
    <div v-loading="loading" >
      <slot name="content"  />
    </div>
    <template #footer v-if="!config.noFooter">
      <div class="dialog-footer tr btn-base">
        <slot name="footer" />
        <template v-if="!config.noDefaultFooter">
          <el-button @click="close">{{ $t('cancel') }}</el-button>
          <el-button :disabled="loading" type="primary" class="ml16" @click="confirm">{{ $t('confirm') }}</el-button>
        </template>
      </div>
    </template>
    </el-dialog>
</template>
  
<script setup lang="ts">
  import { toRefs, reactive, watch, getCurrentInstance } from 'vue'
  const props = defineProps({
    config: {
      type: Object,
      default: () => {
        return {
          title: '',
          noFooter: false, // 是否有底部按钮区
          noDefaultFooter: false, // 是否是默认按钮
          modalControl: true, // 是否点击modal关闭
          showClose: true // 是否显示关闭按钮
        }
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  })
  const emits = defineEmits(['close', 'success'])
  const { proxy } = getCurrentInstance()
  function close () { // 关闭函数
    emits('close')
  }
  
  function confirm () { // 确认函数
    emits('success')
  }
  </script>
  
  <style lang="scss" scoped>
  .edit-node {
    // line-height: 20px;
    .code {
      width: 180px;
      // height: 180px;
      padding: 10px;
      img {
        border: 1px solid #D7DBE9;
        width: 160px;
      }
    }
  }
  </style>
  