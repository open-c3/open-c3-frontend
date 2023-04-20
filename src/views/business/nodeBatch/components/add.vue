<template>
  <Drawer v-bind="$attrs" :title="title" :loading="loading"  @close="cancel" width="800px">
    <template #content>
      <base-form ref="form" :config="config" :params="params" class="mt20">
        <template #btn>
          <el-button @click="choiceServerFlag = true" type="primary" class="mr5">{{ $t('selectSearchBatch') }}({{ num }})</el-button>({{ $t('selectMachineMessage') }})
        </template>
        <template #node>
          <el-input v-model="params.node" type="textarea" class="w500"/>
          <div class="c6">{{ $t('machindListMessage') }}</div>
        </template>
        <template #percent>
          <el-input v-model="params.percent" type="textarea" class="w500"/>
          <div class="c6">1.{{ $t('percentFirstDesc') }} <br>2.{{ $t('percentSecondDesc') }}<br>{{ $t('example') }}:123,234;1~100;1:2<br>;1~10,13;2<br>1234;1,3,5;1:10%</div>
        </template>
        <template #list>
          <Table :thead="PERCENT_THEAD_CONFIG" :data="list" class="w500"/>
        </template>
      </base-form>
    </template>
    <template #footer>
      <el-button v-if="info" @click="deleteFun(info.id)">{{ $t('deleteAndExit') }}</el-button>
      <el-button @click="cancel">{{ $t('cancel')}}</el-button>
      <el-button @click="confirm" type="primary">{{ $t('confirm')}}</el-button>
    </template>
  </Drawer>
  <choice-server v-if="choiceServerFlag" v-model="choiceServerFlag"  :treeId="treeId" @close="choiceServerFlag = false" @choiceServer="choiceServerConfirm"/>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, watch, getCurrentInstance, computed } from 'vue'
import store from '@/store'
import Drawer from '@/components/drawer/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import Table from '@/components/table/index.vue'
import choiceServer from '@/views/business/nodeBatch/components/choiceServer.vue'
import { ADD_NODE_BATCH_CONFIG, PERCENT_THEAD_CONFIG } from '../config'
import { getNodeInfo } from '@/api/monitor/config'
import { createJobxGroup, updateJobxGroup, getJobxGroupInfo, deleteJobxGroupInfo } from '@/api/business/nodeBatch'
import { createJobxGroupData  } from '@/api/interface/business'
import { ElMessageBox } from 'element-plus'
export default {
  components: { Drawer, baseForm, Table, choiceServer },
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
      config: ADD_NODE_BATCH_CONFIG,
      treeId: store.getters.treeId,
      loading: false,
      params: {
        name: '',
        note: '',
        group_type: 'list',
        node: '',
        percent: ''
      },
      choiceServerFlag: false,
      list: []
    })
    const cancel = () => { // 关闭弹框
      context.emit('cancel')
    }
    const create = (data: createJobxGroupData) => {
      createJobxGroup(props.treeId, data).then(res => {
        proxy.$notification('operationSuccess')
        context.emit('success')
      })
    }
    const update = (data: createJobxGroupData) => {
      updateJobxGroup(props.treeId, props.info.id, data).then(res => {
        proxy.$notification('operationSuccess')
        context.emit('success')
      })
    }
    // 弹框成功的回调
    const confirm = () => {
      (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
          const data = {
            name: state.params.name,
            note: state.params.note,
            group_type: state.params.group_type,
          }
          if (state.params.group_type === 'list') {
            data['node'] = state.params.node
          } else {
            data['percent'] = state.params.percent
          }
          if (props.info) {
            update(data)
          } else {
            create(data)
          }
        }
      })
    }
    const choiceServerConfirm = (ip: string) => {
      state.params.node = state.params.node === '' ? ip : `${state.params.node};${ip}`
      state.choiceServerFlag = false
    }
    const num = computed(() => {
      if (state.params.node === '') {
        return 0
      } else {
        const node = state.params.node.replaceAll('\n', ';')
        return node.split(';').length
      }
    })
    // 删除分组
    const deleteFun = (id: number) => {
      ElMessageBox.confirm(proxy.$t('deleteGroupMsg'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        state.loading = true
        deleteJobxGroupInfo(props.treeId, id).then(res => {
          proxy.$notification('operationSuccess')
          context.emit('success')
          state.loading = false
        })
      })
    }
    watch(() => state.params.group_type, val => {
      state.config.config[3].hidden = val === 'percent'
      state.config.config[4].hidden = val === 'percent'
      state.config.config[5].hidden = val === 'list'
      state.config.config[6].hidden = val === 'list'
    }, {
      immediate: true
    })
    
    watch(() => props.info, val => {
      if (val) {
        getJobxGroupInfo(props.treeId, props.info.id).then((res: any) => {
          state.params = {
            name: res.name,
            note: res.note,
            group_type: res.group_type,
            node: res.group_type === 'list' ? res.node : '',
            percent: res.group_type === 'percent' ? res.percent : ''
          }
        })
      }
      getNodeInfo(props.treeId).then((res: any) => {
        state.list = res
      })
    }, {
      immediate: true,
      deep: true
    })
    return {
      ...toRefs(state),
      cancel,
      confirm,
      choiceServerConfirm,
      PERCENT_THEAD_CONFIG,
      num,
      deleteFun
    }
  }
}
</script>
<style lang="scss">
</style>
