<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel" @success="confirm">
    <template #content>
      <Table :thead="config.ip" :data="ipList" :tableLoading="ipLoading" @selectionChange="selectAry" row-key="id"
        ref="ipTable" class="w800">
        <template #multiple>
          <el-table-column :reserve-selection="true" type="selection" :align="'center'" width="45" />
        </template>
        <template #inip="scope">
          <div>
            <el-button type="primary" link @click="operate((scope as any).row.inip, (scope as any).index)">{{(scope as any).row.inip || '-'}}</el-button>
          </div>
        </template>
        <template #exip="scope">
          <div>
            <el-button type="primary" link @click="operate((scope as any).row.exip, (scope as any).index)">{{(scope as any).row.exip || '-'}}</el-button>
          </div>
        </template>
      </Table>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, watch } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import { getNodeInfo } from '@/api/monitor/config'
import { CHOICE_SERVER_CONFIG } from '../config'

export default {
  components: { Dialog, Table },
  emits: ['close', 'choiceServer'],
  props: {
    info: {
      type: Object,
      default: () => null
    },
    treeId: {
      type: [Number, String],
      default: ''
    },
    selectUser: {
      type: String,
      default: 'root',
    }
  },
  setup(props, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      config: CHOICE_SERVER_CONFIG,
      loading: false,
      type: 'ip',
      ipLoading: false,
      ipList: [],
      groupLoading: false,
      groupList: [],
      groupId: '',
      ip: [],
      handwrittenIP: '',
      terminalAddr :`${window.location.protocol}//${window.location.host}/api/job/cmd/`
    })

    const confirm = () => {
      context.emit('choiceServer', state.ip)
    }

    const cancel = () => {
      context.emit('close')
    }

    const selectAry = (ary: Array<any>) => {
      state.ip = ary.map(item => item.exip)
    }

    // 虚拟终端
    const operate = (row:string, index:number) => {
      let link = `${props.treeId}?node=${row}&sudo=${props.selectUser}&siteaddr=${window.location.protocol}//${window.location.host}`
      window.open(`${state.terminalAddr}${link}`, '_blank')
    }

    watch(() => props.treeId, val => {
      if (val) {
        const treeId = parseInt(val.toString())
        getNodeInfo(treeId).then((res: any) => {
          state.ipList = res
        })
      }
    }, {
      immediate: true
    })

    return {
      ...toRefs(state),
      confirm,
      cancel,
      selectAry,
      operate,
    }
  }
}
</script>
<style lang="scss"></style>
