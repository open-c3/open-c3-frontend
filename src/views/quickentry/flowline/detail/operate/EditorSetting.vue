<template>
  <Drawer v-bind="$attrs" :title="title"  @close="cancel" width="1000px">
    <template #content>
    <Editor :titleFlag="false"/>
    </template>
  </Drawer>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, watch, getCurrentInstance, computed } from 'vue'
import store from '@/store'
import Drawer from '@/components/drawer/index.vue'
import Editor from '../../editor/index.vue'

export default {
  components: { Drawer, Editor },
  emits: ['cancel', 'addSuccess'],
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const treeData = computed(() => {
      return store.getters.treeData
    })
    const state = reactive({
      title: proxy.$t('editConfig'),
    })

    watch(() => prop.info, (newVal, oldVal) => {
    }, {
      immediate: true,
      deep: true
    })
    onMounted(() => {
    })
    const cancel = () => { // 关闭弹框
      context.emit('cancel')
    }

    return {
      ...toRefs(state),
      cancel,
      treeData,
    }
  }
}
</script>
<style lang="scss">
</style>
