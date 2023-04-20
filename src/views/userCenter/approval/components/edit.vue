<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel">
    <template #content>
      <base-form ref="form" :config="config.form" :params="params">
        <template #opinion>
          <span v-if="params.opinion === 'agree'" class="c-success"> {{$t('agree')}} </span>
          <span v-if="params.opinion === 'unconfirmed'"> {{$t('unapproved')}} </span>
          <span v-if="params.opinion === 'refuse'" class="c-error"> {{$t('refuse')}} </span>
        </template>
      </base-form>
    </template>
    <template #footer>
      <el-button v-if="params.opinion !== 'unconfirmed'" @click="cancel">{{ $t('close') }}</el-button>
      <template v-else>
        <el-button @click="confirm('approvalRefuse', 'refuse')">{{ $t('refuse') }}</el-button>
        <el-button @click="confirm('approvalAgree', 'agree')" type="primary">{{ $t('agree') }}</el-button>
      </template>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, watch } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { EDIT_CONFIG, NOTIFY_STATUS_CONFIG } from '../config'
import { getApprovalDetail, updateApproval } from '@/api/userCenter/approval'
import { seftime } from '@/utils/index'
import { ElMessageBox } from 'element-plus'
export default {
  components: { Dialog, Table, baseForm },
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  emits: ['close', 'success'],
  setup (props, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      config:EDIT_CONFIG,
      loading: false,
      params: { // 审批信息
        user: '',
        useTime: '',
        oauuid: '',
        notifystatus: '',
        opinion: '',
        create_time: '',
        name: '',
        submitter: '',
        cont: ''
      }
    })
    const cancel = () => { // 关闭弹框
      context.emit('close')
    }
    // 审批操作
    const confirm = (msg: string, opinion: string) => {
      ElMessageBox.confirm(proxy.$t(msg), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        state.loading = true
        updateApproval({
          uuid: props.info.uuid, opinion: opinion
        }).then(res => {
          state.loading = false
          proxy.$notification('operationSuccess')
          context.emit('success')
        })
      }).catch(() => {})
    }
    // 获取镜像信息 镜像文件信息
    watch(() => props.info, val => {
      if (val) {
        getApprovalDetail(val.uuid).then((res: any) => {
          state.params = {
            user: res[0].user,
            useTime: res[0].useTime ? seftime(res[0].create_time, res[0].finishtime) : '',
            oauuid: res[0].oauuid,
            notifystatus: NOTIFY_STATUS_CONFIG[res[0].notifystatus],
            opinion: res[0].opinion,
            create_time: res[0].create_time,
            name: res[0].name,
            submitter: res[0].submitter,
            cont: res[0].cont
          }
          state.config.titleParams.name = res[0].name
        })
      }
    }, {
      immediate: true,
      deep: true
    })
    return {
      ...toRefs(state),
      cancel,
      confirm
    }
  }
}
</script>
<style lang="scss">
</style>
