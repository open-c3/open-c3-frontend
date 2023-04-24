<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel" @success="confirm">
    <template #content>
      <saas-tabs :tabs="tabs" v-model="type" class="mt-20"/>
      <el-form>
        <el-form-item v-if="type === 'ip'">
          <Table :thead="config.ip" :data="ipList" :tableLoading="ipLoading" @selectionChange="selectAry" row-key="id" ref="ipTable" class="w800">
            <template #multiple>
              <el-table-column :reserve-selection="true" type="selection" align="center" width="45"/>
            </template>
          </Table>
        </el-form-item>
        <el-form-item v-if="type === 'group'" :label="`${$t('name')} - ${$t('plugIn')}:`">
          <el-radio-group v-model="groupId" @change="changeServer" class="ml-4">
            <el-radio v-for="item in groupList" :label="item.id" :disabled="item.disabled">{{item.name}}-{{ item.plugin }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="ip !== '' && type !== 'handwrittenIP'" :label="$t('serverInformation')">
          {{ ip }}
        </el-form-item>
        <el-form-item v-if="type==='handwrittenIP'">
          <el-input v-model="ip" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }"/>
          {{ $t('handwrittenIPMultiple') }}
          {{ $t('handwrittenIPMultiple2') }}
        </el-form-item>
      </el-form>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, watch } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import { getJobNodeGroup, getJobNodeGroupInfo } from '@/api/business/nodeGroup'
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
    }
  },
  setup (props, context) {
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
      tabs: [
        { label: 'selectServerViaIP', name: 'ip'},
        { label: 'groupSelection', name: 'group'},
        { label: 'handwrittenIP', name: 'handwrittenIP'}
      ],
      ip: '',
      handwrittenIP: ''
    })
    const confirm = () => {
      context.emit('choiceServer', state.ip)
    }
    const cancel = () => {
      context.emit('close')
    }
    const selectAry = (ary: Array<any>) => {
      state.ip = ary.map(item => item.exip).toString()
    }
    const changeServer = (val: string|number) => {
      getJobNodeGroupInfo(props.treeId, val).then((res: any) => {
        const item = state.groupList.find(item => item.id === val)
        if (res.params === 'extend' || res.params === 'idc') {
          item.disabled = true
        } else {
          state.ip = res.params
        }
      })
    }
    watch(() => props.treeId, val => {
      if (val) {
        const treeId = parseInt(val.toString())
        getJobNodeGroup(treeId).then((res: any) => {
          console.log(res)
          state.groupList = res.map(item => {
            item.disabled = false
            return item
          })
        })
        getNodeInfo(treeId).then((res: any) => {
          state.ipList = res
          console.log(res)
        })
      }
    }, {
      immediate: true
    })
    watch(() => state.type, val => {
      state.ip = ''
    }, {
      immediate: true
    })
    return {
      ...toRefs(state),
      confirm,
      cancel,
      selectAry,
      changeServer
    }
  }
}
</script>
<style lang="scss">
</style>
