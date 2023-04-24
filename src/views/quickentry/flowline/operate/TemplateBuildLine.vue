<template>
  <Dialog v-bind="$attrs" :config="config" @close="close" @success="confirm">
    <!-- <base-form ref="form" :config="config.form" :params="detailFrom" class="mt20 mb20" /> -->
    <div class="refresh-button">
        <el-button type="primary" :icon="Refresh" @click="getData"/>
      </div>
    <template #content>
      <Table 
        :thead="TEMPLATE_PIPLINE_THEAD" 
        :data="templateLine"
        :highlight-current-row="false"
        :tableLoading="loading"
      >
      <template #edit_user="{ row }">
        {{row.edit_user || '-'}}
      </template>
      <template #operation="{ row }">
        <el-button link type="primary"  @click="onOperate(row)">{{ $t('copyAs') }}</el-button>
      </template>
      </Table>
    </template>
  </Dialog>

  <component :is="opType" :types="`buildLine`" :treeId="treeId" conTypes="buildLine" :treeData="treeData" :config="TEMPLATE_CREATE_DIALOG_CONFIG" :editItem="editItems" @close="createFlag = false"
    @success="createSuccess" v-if="createFlag" v-model="createFlag" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import Table from '@/components/table/index.vue'
import Collect from './Collect.vue'
import { Refresh } from '@element-plus/icons-vue'
import { TEMPLATE_BUILD_LINE_CONFIG, TEMPLATE_PIPLINE_THEAD, TEMPLATE_CREATE_DIALOG_CONFIG } from '../config'
import { getBuildLineList } from '@/api/quickentry/index'
import { FavoritesInfo } from '@/api/interface/quickentry'

interface StateInfo {
  opType: string;
  config: object;
  detailFrom: {
    name: string;
  },
  templateLine: Array<any>;
  loading: boolean;
  createFlag: boolean;
  editItems: object;
}

export default defineComponent({
  components: {
    Dialog,
    baseForm,
    Table,
    Collect
  },
  props: {
    config: {
      type: Object,
      default :{}
    }, 
    editItem: {
      type: Object,
      default: {}
    },
    treeId: {
      type: String,
      default: '4000000000',
    },
    treeData: {
      type: Object,
      default: {}
    },
  },
  emits: ['success', 'close'],
  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance

    const state: StateInfo = reactive({
      opType:'Collect',
      config: TEMPLATE_BUILD_LINE_CONFIG,
      detailFrom: {
        name: ''
      },
      templateLine: [],
      loading: false,
      createFlag: false,
      editItems: {},
    })

    const getData = async () => {
      state.loading = true
      const params: FavoritesInfo = {
        treeId: props.treeId
      }
      const dataRet = await getBuildLineList(params)
      if (dataRet) {
        state.templateLine = dataRet
        state.loading = false
      }
    }

    const onOperate = (row) => {
      state.createFlag = true
      state.editItems = JSON.parse(JSON.stringify(row))
    }

    const createSuccess = () => {
      state.createFlag = false
      proxy.$emit('success')
      // getData()
    }

    const confirm = () => {
      close()
    }

    const close = () => {
      proxy.$emit('close')
    }

    onMounted(()=> {
      getData()
    })
    return {
      Refresh,
      ...toRefs(state),
      TEMPLATE_PIPLINE_THEAD,
      TEMPLATE_BUILD_LINE_CONFIG,
      TEMPLATE_CREATE_DIALOG_CONFIG,
      close,
      confirm,
      getData,
      onOperate,
      createSuccess,
    }
  }
})
</script>

<style scoped lang="scss">
.refresh-button {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>