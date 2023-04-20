<template>
  <div class="body-layout1">
    <saas-tabs :label="$t('membersMonGroup')" class="mt-20"/>
    <p class="tr">
      <!-- 添加告警接收组  -->
      <el-button @click="groupInfo = null; addGroupFlag = true" type="primary" icon="plus">{{ $t('addAlarmReceivingGroup') }}</el-button>
      <el-button @click="getGroupData" :loading="group.loading" type="primary" icon="refresh"/>
    </p>
    <Table :thead="thead" :data="group.list" :tableLoading="group.loading">
      <template #operate="{ row }">
        <!-- 编辑组成员 -->
        <el-button @click="addUserFlag = true; groupInfo = row" link type="primary">{{ $t('editGroupMembers') }}</el-button>
        <el-button @click="groupInfo = row; addGroupFlag = true;" link type="primary">{{ $t('edit') }}</el-button>
        <el-button @click="deleteFun(row)" link type="primary">{{ $t('delete') }}</el-button>
      </template>
    </Table>
  </div>
  <add-group v-if="addGroupFlag" v-model="addGroupFlag" :group-info="groupInfo" @cancel="addGroupFlag = false" @addGroupSuccess="getGroupData"/>
  <addUser v-if="addUserFlag" v-model="addUserFlag" :group-info="groupInfo" @cancel="addUserFlag = false"/>
</template>
<script lang="ts">
import { onMounted, reactive, toRefs, getCurrentInstance } from 'vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import addGroup from '@/views/monitor/group/addGroup.vue'
import addUser from '@/views/monitor/group/addUser.vue'
import { getConfigGroup, deleteGroup } from '@/api/monitor/index'
import { ElMessageBox } from 'element-plus'
import { THEAD_CONFIG } from '@/views/monitor/group/config'
export default {
  components: { Table, addGroup, addUser},
  setup () {
    const { proxy } = getCurrentInstance()
    const thead = THEAD_CONFIG
    const state = reactive({
      group: { // 监控组成员
        page: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        list: [],
        allList: []
      },
      list: [],
      params: {},
      addGroupFlag: false,
      groupInfo: null,
      addUserFlag: false
    })
    const pageChange = (page) => {
      state.group.page = page
      state.group.list = state.group.allList.slice((state.group.page - 1) * state.group.pageSize, state.group.page * state.group.pageSize)
    }
    const pageSizeChange = (size) => {
      state.group.pageSize = size
      pageChange(1)
    }
    // 获取组列表
    const getGroupData = () => {
      state.group.loading = true
      const list = []
      getConfigGroup().then((res: any) => {
        res.forEach(item => {
          list.push(item)
        })
        state.group.allList = list.reverse()
        state.group.total = list.length
        pageChange(1)
      }).finally(() => {
        state.group.loading = false
      })
      state.addGroupFlag = false
    }
    // 删除
    const deleteFun = (row) => {
      ElMessageBox.confirm(proxy.$t('deleteAlarmReceivingGroup'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        deleteGroup(row.id).then(res => {
          getGroupData()
          proxy.$notification('success')
        })
      }).catch(() => {})
    }
    onMounted(() => {
      getGroupData()
    })
    return {
      ...toRefs(state),
      thead,
      pageChange,
      pageSizeChange,
      getGroupData,
      deleteFun
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
