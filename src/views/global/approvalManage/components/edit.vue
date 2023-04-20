<template>
  <Drawer v-bind="$attrs" :loading="loading"  @close="cancel" width="800px">
    <template #drawerHeader>
      <div class="el-drawer__header">
        <span class="el-drawer__title">
          {{ $t('approval')}} : {{ info?.name }}
        </span>
        <el-icon @click="cancel" class="el-drawer__close-btn"><Close /></el-icon>
      </div>
    </template>
    <template #content>
      <p class='tr'><el-button @click="getData" type="primary">{{$t('refresh')}}</el-button></p>
      <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" row-id="id" class="mt20">
        <template #create_time="{row}">
          {{ seftime(row.create_time, row.finishtime) }}
        </template>
        <!-- 通知状态 -->
        <template #opinion="{ row }">
          <span>{{notifyStatus[row.notifystatus]}}</span>
        </template>
        <!-- 审批状态 -->
        <template #approvalStatus="{ row }">
          <span v-if="row.opinion === 'agree'" class="c-success"> {{$t('agree')}} </span>
          <span v-if="row.opinion === 'unconfirmed'"> {{$t('unapproved')}} </span>
          <span v-if="row.opinion === 'refuse'" class="c-error"> {{$t('refuse')}} </span>   
        </template>
      </Table>
      <base-form ref="form" :config="config.form" :params="params" class="mt20">
        <template #btn>
          <el-button type="primary">{{ $t('globalVariableSettings') }}</el-button>
        </template>
      </base-form>
    </template>
    <template #footer>
      <el-button @click="confirm('agree')" :disabled="info.opinion !== 'unconfirmed'" type="primary">{{$t('agree')}}</el-button>
      <el-button @click="confirm('refuse')" :disabled="info.opinion !== 'unconfirmed'">{{$t('refuse')}}</el-button>
    </template>
  </Drawer>
</template>
<script lang="ts">
import { reactive, toRefs, watch, getCurrentInstance } from 'vue'
import Drawer from '@/components/drawer/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import Table from '@/components/table/index.vue'
import { EDIT_THEAD_CONFIG, EDIT_CONFIG } from '../config'
import { getApprovalDetail, updateApproval } from '@/api/global/approvalManage'
import { seftime } from '@/utils/index'
export default {
  components: { Drawer, baseForm, Table },
  emits: ['close', 'success'],
  props: {
    info: {
      type: Object,
      default: null
    },
    notifyStatus: {
      type: Object,
      default: null
    }
  },
  setup (props, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      title: 'newJob',
      params: {
        create_time: '',
        name: '',
        submitter: '',
        cont: ''
      },
      config: EDIT_CONFIG,
      loading: false,
      tableConfig: {
        thead: EDIT_THEAD_CONFIG,
        list: [],
        loading: false
      }
    })
    const getData = () => {
      getApprovalDetail(props.info.id).then((res: any) => {
        console.log(res)
        state.tableConfig.list = res
        if (res && res.length > 0) {
          state.params = {
            create_time: res[0].create_time,
            name: res[0].name,
            submitter: res[0].submitter,
            cont: res[0].cont
          }
        }
      })
    }
    const cancel = () => { // 关闭弹框
      context.emit('close')
    }
    // 弹框成功的回调
    const confirm = (opinion: string) => {
      state.loading = true
      updateApproval({ id: props.info.id, opinion}).then(res => {
        context.emit('success')
        proxy.$notification('operationSuccess')
        state.loading = false
      })
    }
    watch(() => props.info, val => {
      if (val) {
        getData()
      }
    }, {
      immediate: true,
      deep: true
    })
    return {
      ...toRefs(state),
      cancel,
      confirm,
      seftime,
      getData
    }
  }
}
</script>
<style lang="scss">
</style>
