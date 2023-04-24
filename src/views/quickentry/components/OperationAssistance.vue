<template>
  <Dialog v-bind="$attrs" :config="config" @close="close" :title="opTitle" @success="close">
    <template #content>
      <base-form ref="form" :config="config.form" :params="detailFrom" class="mt20 mb20">
        <template #submit_reason>
          <el-input style="width:450px" type="textarea" v-model="detailFrom.submit_reason"
            :placeholder="`${$t('configFormInput')}${$t('reasonForOperation')}`" />
        </template>
      </base-form>
    </template>
    <template #footer>
      <div class="form-confirm">
        <el-button type="primary" @click="operate('submit', {})">{{ $t('submit') }}</el-button>
        <el-button @click="close">{{ $t('cancel') }}</el-button>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, getCurrentInstance, ComponentInternalInstance } from 'vue'
import store from '@/store'
import Table from '@/components/table/index.vue'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { ElMessageBox } from 'element-plus'

import {
  EDIT_RELY_DIALOG_CONFIG,
} from '../flowline/editor/config'
import {
  submitOperationRequest,
} from '@/api/quickentry/index'
import {
  AssistanceInputParameterInfo,
} from '@/api/interface/quickentry'

interface Stateinfo {
  detailFrom: {
    submit_reason: string;
    handler: string;
  }
}


export default defineComponent({
  components: {
    Table,
    Dialog,
    baseForm
  },

  props: {
    types: {
      type: String,
      default: 'Collect'
    },
    conTypes: {
      type: String,
      default: 'Collect',
      require: false
    },
    opTitle: {
      require: false,
      type: String,
      default: '',
    },
    config: {
      type: Object,
      default: EDIT_RELY_DIALOG_CONFIG
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
    clusterinfo: {
      require: false,
      type: Object,
      default: {},
    },
  },

  emits: ['success', 'close'],

  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeArray = computed(() => {
      return store.getters.treeArray
    })

    const state: Stateinfo = reactive({
      detailFrom: {
        submit_reason: '',
        handler: props.editItem.handler,
      },
    })


    const close = () => {
      proxy.$emit('close')
    }

    const operate = (type: string, row: any) => {
      (proxy?.$refs.form as any).validFun().then(async (flag: any) => {
        const apiFun: { submit?: (data: AssistanceInputParameterInfo) => Promise<any> } = {}
        const params: { submit?: AssistanceInputParameterInfo } = {}
        if (flag) {
          switch (type) {
            case 'submit':
              apiFun.submit = submitOperationRequest
              params.submit = { ...props.editItem }
              params.submit['submit_reason'] = state.detailFrom.submit_reason
              break
          }
          if (apiFun[type] && params[type]) {
            const dataRet = await apiFun[type](params[type])
            if (dataRet) {
              proxy?.$notification('operationSuccess')
              proxy.$emit('success')
            }
          }
        }
      })
    }

    onMounted(() => {
    })

    return {
      treeArray,
      ...toRefs(state),
      EDIT_RELY_DIALOG_CONFIG,
      close,
      operate,
    }
  }
})
</script>

<style scoped lang="scss">
.addr-tooltip {
  display: inline-block;
  margin-left: 10px;
}

.form-confirm {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 40px;
}
</style>