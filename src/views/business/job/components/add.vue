<template>
  <Drawer v-bind="$attrs" :title="title" :loading="loading"  @close="cancel" width="800px">
    <template #content>
      <p>{{ treeData?.parent }}</p>
      <el-divider class="costv-divider mt16 mb16"/>
      <base-form ref="form" :config="config.form" :params="params">
        <template #btn>
          <el-button type="primary">{{ $t('globalVariableSettings') }}</el-button>
        </template>
      </base-form>
      <el-card>
        <template #header>
          {{ $t('globalVariableParameters') }}
        </template>
        <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading">
          <template #name="{row}">
            <el-input v-model="row.name"/>
          </template>
          <template #value="{row}">
            <el-input v-model="row.value"/>
          </template>
          <template #describe="{row}">
            <el-input v-model="row.describe"/>
          </template>
          <template #option="{row}">
            <el-input v-model="row.option"/>
          </template>
          <template #operate="{index}">
            <el-button @click="del(index)" link type="primary">{{ $t('delete') }}</el-button>
          </template>
        </Table>
        <el-button @click="add" type="primary" link class="mt10">{{ $t('add') }}</el-button>
      </el-card>
      <p>
        <el-button link type="primary">{{ $t('addScriptStep') }}</el-button>
        <el-button link type="primary">{{ $t('addFileStep') }}</el-button>
        <el-button link type="primary">{{ $t('addApprovalStep') }}</el-button>
      </p>
    </template>
    <template #footer>
      <el-button>12</el-button>
    </template>
  </Drawer>
  <script-step v-if="scriptStepFlag" v-model="scriptStepFlag"/>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, watch, getCurrentInstance, computed } from 'vue'
import store from '@/store'
import Drawer from '@/components/drawer/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import Table from '@/components/table/index.vue'
import scriptStep from '@/views/business/job/components/scriptStep.vue'
import { ADD_CONFIG, VARIABLE_THEAD_CONFIG } from '../config'
import { addCollector } from '@/api/monitor/config'

export default {
  components: { Drawer, baseForm, Table, scriptStep },
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
      title: 'newJob',
      params: {
        id: '',
        type: 'port',
        subtype: '',
        content1: '',
        content2: '',
        help: ''
      },
      config: ADD_CONFIG,
      loading: false,
      tableConfig: {
        obj: {name: '', value: '', describe: '', option: '' },
        thead: VARIABLE_THEAD_CONFIG,
        list: [{name: '', value: '', describe: '', option: '' }],
        loading: false
      },
      scriptStepFlag: true
    })
    const add = () => {
      state.tableConfig.list.push(JSON.parse(JSON.stringify(state.tableConfig.obj)))
    }
    const del = (index: number) => {
      state.tableConfig.list.splice(index, 1)
    }
    watch(() => state.params.type, (newVal, oldVal) => {
    }, {
      immediate: true
    })
    watch(() => state.params.subtype, (newVal, oldVal) => {
    }, {
      immediate: true
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
    // 弹框成功的回调
    const confirm = () => {
      (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
          // addCollector(store.getters.treeId, {}).then(res => {
          //   context.emit('addSuccess')
          //   proxy.$notification('success')
          // }).finally(() => {
          //   state.loading = false
          // })
        }
      })
    }
    return {
      ...toRefs(state),
      cancel,
      confirm,
      treeData,
      add,
      del
    }
  }
}
</script>
<style lang="scss">
</style>
