<template>
  <Dialog v-bind="$attrs" :config="config" @close="cancel">
    <template #content>
      <el-card class="utilization-detail">
        <template #header>
          <div class="df jc_sb">
            <span>{{ $t('hostLoadDetail') }} {{ detailInfo.inip }}</span>
            <el-icon @click="getData"><Refresh /></el-icon>
          </div>
        </template>
        <p>
          <el-select v-model="status" clearable @change="getData">
            <el-option v-for="item in typeAry" :key="item.value" :value="item.value" :label="item.label"/>
          </el-select>
        </p>
        <Table :thead="thead" :data="list" :loading="loading">
          <template #status="{ row }">
            <div v-if="row.status === 'low'" class="c-error">{{ row.status }}</div>
            <div v-else-if="row.status === 'warn'" class="c-info">{{ row.status }}</div>
            <div v-else-if="row.status === 'normal'" class="c-success">{{ row.status }}</div>
            <div v-else>{{ row.status }}</div>
          </template>
          <template #netin="{ row }">
            <div v-if="row.netin < 1024">{{ row.netin.toFixed(2) }} b/s</div>
            <div v-else-if="row.netin < 1024*1024">{{ (row.netin / 1024).toFixed(2) }} kb/s</div>
            <div v-else>{{ (row.netin / 1024 / 1024).toFixed(2) }} Mb/s</div>
          </template>
          <template #netout="{ row }">
            <div v-if="row.netout < 1024">{{ row.netout.toFixed(2) }} b/s</div>
            <div v-else-if="row.netout < 1024*1024">{{ (row.netout / 1024).toFixed(2) }} kb/s</div>
            <div v-else>{{ (row.netout / 1024 / 1024).toFixed(2) }} Mb/s</div>
          </template>
        </Table>
      </el-card>
    </template>
    <template #footer>
      <div class="btn-base">
        <el-button @click="cancel" type="info">{{$t('cancel')}}</el-button>
      </div>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, watch, getCurrentInstance } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import { DETAIL_CONFIG, DETAIL_THEAD_CONFIG } from './config.js'
import { getNodeLowById } from '@/api/monitor/utilization'

export default {
  components: { Dialog, baseForm, Table },
  emits: ['cancel'],
  props: {
    detailInfo: {
      type: Object,
      default: null
    }
  },
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      loading: false,
      thead: DETAIL_THEAD_CONFIG,
      list: [],
      typeAry: [
        { label: proxy.$t('lowUtilization'), value: 'low' },
        { label: proxy.$t('warn'), value: 'warn' },
        { label: proxy.$t('normal'), value: 'normal' },
        { label: proxy.$t('unknown'), value: 'unkown' }
      ],
      status: ''
    })
    const config = DETAIL_CONFIG
    const getData = () => {
      state.loading = true
      getNodeLowById(store.getters.treeId, prop.detailInfo.inip).then((res: any) => {
        state.list = res.filter(item => {
          return item.status === state.status || state.status === ''
        })
      }).finally(() => {
        state.loading = false
      })
    }
    watch(() => prop.detailInfo, (newVal, oldVal) => {
      if (newVal) {
        getData()
      }
    }, {
      immediate: true,
      deep: true
    })
    const cancel = () => { // 关闭弹框
      context.emit('cancel')
    }
    return {
      ...toRefs(state),
      config,
      cancel,
      getData
    }
  }
}
</script>
<style lang="scss">
.utilization-detail{
  margin-left: -50px;
  margin-right: -50px;
}
</style>
