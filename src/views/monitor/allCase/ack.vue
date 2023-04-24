<template>
  <div class="body-layout1">
    <saas-tabs :label="$t('monitorACK')" class="mt-20"/>
    <p class="f14">{{ $t('instance') }}:  {{ params.monitorObject }}</p>
    <Table :thead="thead" :data="params.list" :tableLoading="loading"/>
    <p class="tr">
      <el-button @click="edit('ackcase', 'P')" :disabled="acked.ackcaseP !== 0" type="primary">{{ $t('eventShield') }}</el-button>
      <el-button @click="edit('ack', 'P')" :disabled="acked.ackP !== 0" type="primary">{{ $t('monitorShield') }}</el-button>
      <el-button @click="edit('ackcase', '' )" :disabled="acked.ackcaseG !== 0" type="primary">{{ $t('eventShieldAll') }}</el-button>
      <el-button @click="edit('ack',     '' )" :disabled="acked.ackG !== 0" type="primary">{{ $t('monitorShieldAll') }}</el-button>
      <el-button @click="edit('ackam',   '' )" :disabled="acked.ackam !== 0" type="primary">{{ $t('AMShield') }}</el-button>
      <el-button @click="goToCase"  :disabled="acked.tott !== 0" type="primary">{{ $t('toCase') }}</el-button>
    </p>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { useRoute } from 'vue-router'
import { getMonitorACK, editACK, monitorACKOrder } from '@/api/monitor/index'
import { SHIELD_CONFIG, SHIELD_THEAD } from './config'
import { ElMessageBox } from 'element-plus'

export default {
  components: { Dialog, Table, baseForm },
  emits: ['close'],
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const route = useRoute()
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
    const getList = (val: string) => {
      getMonitorACK(val).then((res: any) => {
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
    const edit = (ctrl: string, type: string) => { // 屏蔽操作
      editACK(route.params.id.toString(), {
        ctrl: ctrl,
        type: type
      }).then(res => {
        proxy.$notification('success')
        getList(route.params.id.toString())
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
        monitorACKOrder(route.params.id.toString(), {
          caseinfo: state.caseInfo,
          casedata: state.params.list,
          caseuuid: state.caseUuid
        }).then(res => {
          proxy.$notification('success')
          getList(route.params.id.toString())
        })
      }).catch(() => {})
    }
    onMounted(() => {
      getList(route.params.id.toString())
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
