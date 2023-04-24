<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading"  @close="cancel" @success="cancel" width="800px">
    <template #content>
      <div class="mh300">
        <p v-for="(item, index) in list">
          <span class="mr20">{{$t('Group')}}{{ index + 1 }}({{ item.length }}{{ $t('NumMachines') }}) : {{ item.toString() }}</span>
        </p>
      </div>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, watch, getCurrentInstance } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import { MACHINE_LIST_CONFIG } from '../config'
import { getJobxGroupMachine } from '@/api/business/nodeBatch'
export default {
  components: { Dialog },
  emits: ['cancel', 'success'],
  props: {
    info: {
      type: Object,
      default: null
    },
    treeId: {
      type: Number,
      default: ''
    }
  },
  setup (props, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      title: 'selectServer',
      config: MACHINE_LIST_CONFIG,
      list: [],
      loading: false
    })
    const cancel = () => { // 关闭弹框
      context.emit('cancel')
    }
    
    watch(() => props.info, val => {
      if (val) {
        state.loading = true
        getJobxGroupMachine(props.treeId, props.info.id).then((res: any) => {
          state.list = res
          state.loading = false
        })
      }
    }, {
      immediate: true,
      deep: true
    })
    return {
      ...toRefs(state),
      cancel
    }
  }
}
</script>
<style lang="scss">
</style>
