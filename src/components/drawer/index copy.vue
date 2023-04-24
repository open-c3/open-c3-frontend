<template>
  <div v-if="modelValue" v-bind="$attrs" class="drawer">
    <div v-if="model" @click="closeFun" class="drawer-bg"></div>
    <div v-loading="loading" :style="{'width': dWidth}" class="drawer-body">
      <div class="title">
        <svg-icon icon-class="add" @click="closeFun" class="drawer-close"/>
        <div class="drawer-title-con">
          <slot name="header" />
          <span v-if="title">{{ $t(title) || title }}</span>
        </div>
      </div>
      <div class="content"><slot name="content" /></div>
      <slot name="footer" class="footer"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const emits = defineEmits(['close', 'update:modelValue'])
const props = defineProps({
  modelValue: Boolean,
  model: { // 背景能否存在
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
  left: {
    type: String,
    default: '600px'
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const dWidth = computed(() => {
  if (props.width) return props.width
  else return props.left ? `calc(100% - ${props.left})` : '30%'
})

function closeFun () {
  emits('close')
  emits('update:modelValue', false)
}
</script>

<style lang="scss">
  .drawer{
    &-bg{
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2000;
      height: 100%;
      width: 100%;
      background: rgba( 0, 0, 0, .5);
    }
    &-body{
      position: fixed;
      right: 0;
      top: 0;
      width: 30%;
      height: 100vh;
      background-color: #fff;
      box-shadow: 0 8px 10px -5px #0003, 0 16px 24px 2px #00000024, 0 6px 30px 5px #0000001f;
      z-index: 2001;
      .title {
        width: calc(100% - 64px);
        height: 56px;
        padding: 20px 0 15px;
        margin: 0 32px;
        border-bottom: 1px solid #EDF0FF;
        position: relative;
        .drawer-close{
          position: absolute;
          right: 0;
          top: 20px;
          transform: scale(1.5);
          transform: rotate(45deg);
          &:hover{
            cursor: pointer;
          }
        }
        .drawer-title-con{
          height: 30px;
          line-height: 30px;
          padding-left: 1px;
          @include font-base(16px,  var(--color_text), 400);
        }
      }
      .content {
        height: calc(100% - 122px);
        padding: 20px 32px;
        overflow: auto;
      }
      .footer {
        height: 66px;
        width: calc(100% - 64px);
        padding: 15px 0 20px;
        margin: 0 32px;
        border-top: 1px solid #EDF0FF;
      }
    }
  }
</style>
