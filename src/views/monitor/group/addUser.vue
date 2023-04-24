<template>
  <Dialog v-bind="$attrs" :config="config" @close="cancel">
    <template #content>
      <div class="add-user-content">
        <p class="jc_fe df">
          <el-input v-model.trim="user" class="w180 h30"/>
          <el-button :disabled="user === ''" @click="add"  type="primary" icon="UserFilled" class="ml10">{{ $t('addAlarmUser') }}</el-button>
        </p>
        <el-card class="mt20">
          <template #header>
            <div class="jc_sb df">
              <span>{{ $t('membersMonGroup') }}</span>
              <el-icon><Refresh /></el-icon>
            </div>
          </template>
          <Table :thead="thead" :data="list" :tableLoading="loading">
            <template #operate="{ row }">
              <el-button @click="deleteFun(row)" link type="primary">{{ $t('delete') }}</el-button>
            </template>
          </Table>
        </el-card>
      </div>
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
import Table from '@/components/table/index.vue'
import { ADD_USER_CONFIG } from '@/views/monitor/group/config'
import { getGroupUser, addGroupUser, deleteUser } from '@/api/monitor/index'
import { ElMessageBox } from 'element-plus'
export default {
  components: { Dialog, Table },
  emits: ['cancel'],
  props: {
    groupInfo: {
      type: Object,
      default: null
    }
  },
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const thead = [
      { prop: 'id', label: 'id', align: 'center' },
      { prop: 'user', label: 'member', align: 'center' },
      { prop: 'edit_user', label: 'editor', align: 'center' },
      { prop: 'edit_time', label: 'editTime', align: 'center' },
      { prop: 'operate', type: 'slot', label: 'operate', align: 'center' }
    ]
    const state = reactive({
      user: '',
      loading: false,
      account: '',
      list: [],
      groupId: null
    })
    const config = ADD_USER_CONFIG
    const getUser = () => {
      state.loading = true
      getGroupUser(state.groupId).then((res: any) => {
        state.list = res || []
      }).finally(() => {
        state.loading = false
      })
    }
    const add = () => {
      state.loading = true
      addGroupUser({
        user: state.user,
        groupid: state.groupId
      }).then(res => {
        getUser()
      }).catch(() => {
        state.loading = false
      })
      state.user = ''
    }
    // 删除
    const deleteFun = (row) => {
      ElMessageBox.confirm(proxy.$t('deleteUser'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        deleteUser(row.id).then(res => {
          getUser()
          proxy.$notification('success')
        })
      }).catch(() => {})
    }
    watch(() => prop.groupInfo, (newVal, oldVal) => {
      if (newVal) {
        state.groupId = newVal.id
        getUser()
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
      thead,
      add,
      deleteFun
    }
  }
}
</script>
<style lang="scss">
.add-user-content{
  margin-left: -50px;
  margin-right: -50px;
}
</style>
