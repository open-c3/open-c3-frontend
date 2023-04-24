<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel" @success="confirm">
    <template #content>
      <p class="f14">{{ $t('instance') }}:  {{ params.monitorObject }}</p>
      <Table :thead="thead" :data="params.list" :tableLoading="loading"/>
    </template>
    <template #footer>
      <el-button @click="edit('ackcase', 'P')" :disabled="acked.ackcaseP !== 0" type="primary">{{ $t('eventShield') }}</el-button>
      <el-button @click="edit('ack', 'P')" :disabled="acked.ackP !== 0" type="primary">{{ $t('monitorShield') }}</el-button>
      <el-button @click="edit('ackcase', '' )" :disabled="acked.ackcaseG !== 0" type="primary">{{ $t('eventShieldAll') }}</el-button>
      <el-button @click="edit('ack',     '' )" :disabled="acked.ackG !== 0" type="primary">{{ $t('monitorShieldAll') }}</el-button>
      <el-button @click="edit('ackam',   '' )" :disabled="acked.ackam !== 0" type="primary">{{ $t('AMShield') }}</el-button>
      <el-button @click="goToCase"  :disabled="acked.tott !== 0" type="primary">{{ $t('toCase') }}</el-button>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, watch, getCurrentInstance, computed } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { getMonitorACK, editACK, monitorACKOrder } from '@/api/monitor/index'
import { SHIELD_CONFIG, SHIELD_THEAD } from './config'
import { ElMessageBox } from 'element-plus'

export default {
  components: { Dialog, Table, baseForm },
  emits: ['close'],
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const thead = SHIELD_THEAD
    const state = reactive({
      bindTT: null,
      acked: {
        ackcaseP: 0,
        ackP: 0,
        ackcaseG: 0,
        ackG: 0,
        ackam: 0,
        tott: 0
      },
      caseInfo: null,
      caseUuid: '',
      params: {
        monitorObject: '',
        monitorContent: '',
        list: []
      },
      config:SHIELD_CONFIG,
      loading: false
    })
    const getList = (val) => {
      getMonitorACK(val.ackuuid).then((res: any) => {
        state.acked = res.acked
        state.params.list = res.data
        state.params.monitorObject = res.caseinfo.instance
        state.params.monitorContent = res.caseinfo.title
        state.caseInfo = res.caseinfo
        state.caseUuid = res.caseuuid
      })
    }
    const cancel = () => { // 关闭弹框
      context.emit('close')
    }
    const edit = (ctrl, type) => { // 屏蔽操作
      editACK(prop.info.ackuuid, {
        ctrl: ctrl,
        type: type
      }).then(res => {
        proxy.$notification('success')
        getList(prop.info)
      })
    }
    // 监控告警转工单
    const goToCase = () => {
      // id: prop.info.ackuuid,
      // caseinfo: state.caseInfo,
      // casedata: state.params.list,
      // caseuuid: state.caseUuid
      ElMessageBox.confirm(proxy.$t('monitorTransferOrder'), proxy.$t('submitTicket'), {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        monitorACKOrder(prop.info.ackuuid, {
          caseinfo: state.caseInfo,
          casedata: state.params.list,
          caseuuid: state.caseUuid
        }).then(res => {
          proxy.$notification('success')
          getList(prop.info)
        })
      }).catch(() => {})
    }
    watch(() => prop.info, (newVal, oldVal) => {
      getList(newVal)
    }, {
      immediate: true,
      deep: true
    })
    return {
      ...toRefs(state),
      cancel,
      confirm,
      thead,
      edit,
      goToCase
    }
  }
}
</script>
<style lang="scss">
</style>
