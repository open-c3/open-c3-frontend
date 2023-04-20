<template>
  <div class="body-layout1">
    <saas-tabs :label="$t('monMailList')" class="mt-20"/>
    <p class="tr">
      <!-- 添加邮件监控 -->
      <el-button @click="emailInfo = null;addEmailFlag = true" type="primary" icon="plus">{{ $t('addMailMonitor') }}</el-button>
      <el-button @click="getEmailData" :loading="emailList.loading" type="primary" icon="refresh"/>
    </p>
    <!--  -->
    <Table :thead="emailThead" :data="emailList.list" :tableLoading="emailList.loading" :page="emailList.page" :pageSize="emailList.pageSize" :total="emailList.total" :pageChange="page=>pageChange(page, 'emailList')" :pageSizeChange="size =>pageSizeChange(size, 'emailList')">
      <template #operate="{ row }">
        <el-button @click="emailInfo = row; addEmailFlag = true" type="primary" link>{{ $t('edit') }}</el-button>
        <el-button @click="deleteFun('email', row)" type="primary" link>{{ $t('delete') }}</el-button>
      </template>
    </Table>
    <saas-tabs :label="$t('mailHistory')"/>
    <p class="tr">
      <el-button @click="getHistoryData" :loading="history.loading" type="primary" icon="refresh"/>
    </p>
    <!-- 邮件历史 -->
    <Table :thead="historyThead" :data="history.list" :page="history.page" :pageSize="history.pageSize" :total="history.total" :pageChange="page=>pageChange(page, 'history')" :pageSizeChange="size =>pageSizeChange(size, 'history')" :tableLoading="history.loading"/>
  </div>
  <add-email v-if="addEmailFlag" v-model="addEmailFlag" :email-info="emailInfo" @close="addEmailFlag = false" @addSuccess="getEmailData"/>
</template>
<script lang="ts">
import { onMounted, reactive, toRefs, getCurrentInstance, computed } from 'vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import addEmail from '@/views/monitor/email/components/add.vue'
import { getEmailHistory, getEmailList, deleteEmailConfig } from '@/api/monitor/email'
import { ElMessageBox } from 'element-plus'
import { EMAIL_THEAD, HISTORY_THEAD } from './config'
export default {
  components: { Table, addEmail },
  setup () {
    const { proxy } = getCurrentInstance()
    const treeId = computed(() => {
      return store.getters.treeId
    })
    const state = reactive({
      emailThead: EMAIL_THEAD,
      historyThead: HISTORY_THEAD,
      addEmailFlag: false,
      emailInfo: null,
      emailList: { // 当前告警
        page: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        list: [],
        allList: []
      },
      history: { // 邮件历史
        page: 1,
        pageSize: 10,
        total: 0,
        list: [],
        allList: [],
        loading: false
      }
    })
    // 获取邮件历史
    const getHistoryData = () => {
      state.history.loading = true
      const list = []
      getEmailHistory().then((res: any) => {
        res.forEach(item => {
          list.push(item)
        })
        state.history.allList = list.reverse()
        state.history.total = list.length
        pageChange(1, 'history')
      }).finally(() => {
        state.history.loading = false
      })
    }
    // 监控邮件列表
    const getEmailData = () => {
      state.emailList.loading = true
      const list = []
      getEmailList().then((res: any) => {
        res.forEach(item => {
          list.push(item)
        })
        state.emailList.allList = list.reverse()
        state.emailList.total = list.length
        pageChange(1, 'emailList')
      }).finally(() => {
        state.emailList.loading = false
      })
      state.addEmailFlag = false
    }
    const pageChange = (page, type) => {
      state[type].page = page
      state[type].list = state[type].allList.slice((state[type].page - 1) * state[type].pageSize, state[type].page * state[type].pageSize)
    }
    const pageSizeChange = (size, type) => {
      state[type].pageSize = size
      pageChange(1, type)
    }
    // 删除
    const deleteFun = (type, row) => {
      const apiFun = {
        email: deleteEmailConfig
      }
      ElMessageBox.confirm(proxy.$t(`monitor.${type}.deleteMsg`), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        apiFun[type](row.id).then(res => {
          getEmailData()
          proxy.$notification('success')
        })
      }).catch(() => {})
    }
    onMounted(() => {
      getHistoryData()
      getEmailData()
    })
    return {
      ...toRefs(state),
      pageChange,
      pageSizeChange,
      getEmailData,
      deleteFun,
      getHistoryData
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
