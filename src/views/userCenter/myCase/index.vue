<template>
  <div class="body-layout1">
    <saas-tabs :label="$t('myAlarmEvents')" class="mt-20"/>
    <search-from :params="params" :config="config" @reset="reset" @query="getData(1)"/>
    <!-- <el-divider class="costv-divider mt16 mb16"/> -->
    <Table :thead="thead" :data="list" :tableLoading="myCase.loading" :page="myCase.page" :pageSize="myCase.pageSize" :total="myCase.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange">
      <template #caseuuid="{ row }">
        {{ allAlert[row.caseuuid] === 1 ? $t('yes') : $t('no')}}
      </template>
      <template #bindTT="{ row }">
        <template v-if="bindTT[row.caseuuid]">
          <el-button v-for="item in bindTT[row.caseuuid]" @click="goToCase(row, item)" link type="primary">{{ item }}</el-button>
        </template>
      </template>
      <template #operate="{ row }">
        <el-button @click="info = row; flag = true;" link type="primary">{{ $t('maskMessages') }}</el-button>
      </template>
    </Table>
  </div>
  <shield-part v-if="flag" v-model="flag" :info="info" @close="info = null; flag = false"/>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import Table from '@/components/table/index.vue'
import searchFrom from '@/components/search/index.vue'
import shieldPart from '@/views/monitor/allCase/shield.vue'
import { getMonitorAlert, getMonitorAlertTottbind, toCase } from '@/api/monitor/index'
import { getMyCase } from '@/api/userCenter/myCase'
import { THEAD, SEARCH_CONFIG } from '@/views/userCenter/myCase/config'
import { g_url, formatMsTime, filterAry } from '@/utils/index'
export default {
  components: { Table, shieldPart, searchFrom },
  setup () {
    // const { proxy } = getCurrentInstance()
    const state = reactive({
      thead: THEAD,
      params: {
        edit_time: '',
        instance: '',
        title: ''
      },
      config: SEARCH_CONFIG,
      allList: [],
      filterList: [],
      list: [],
      myCase: {
        loading: false,
        page: 1,
        pageSize: 10,
        total: 0
      },
      bindTT: {},
      allAlert: {},
      flag: false,
      info: null
    })
    const filterList = (page) => {
      state.filterList = filterAry(state.allList, state.params)
      state.myCase.total = state.filterList.length
      pageChange(page)
    }
    // 获取当前告警列表
    const getData = (page?) => {
      state.myCase.loading = true
      // 告警事件列表  getAllCase
      getMyCase().then((res: any) => {
        res.forEach(item => {
          item.time = formatMsTime(item.startat)
        })
        state.allList = res
        filterList(page)
        state.myCase.loading = false
      })
      // 告警状态
      getMonitorAlert().then((res: any) => {
        state.allAlert = res
      })
      // 告警工单
      getMonitorAlertTottbind(0).then((res: any) => {
        state.bindTT = res
      })
    }
    
    const pageChange = (page?: number) => {
      state.myCase.page = page ? page : 1
      state.list = state.filterList.slice((state.myCase.page - 1) * state.myCase.pageSize, state.myCase.page * state.myCase.pageSize)
    }
    const pageSizeChange = (pageSize: number) => {
      state.myCase.pageSize = pageSize
      pageChange(1)
    }
    // 打开工单页面
    // 暂时没有工单 跳出打开老的工单
    const goToCase = (row, id) => {
      toCase({
        uuid: row.caseuuid,
        caseuuid: id
      }).then((res : any) => {
        console.log(res)
        window.open(g_url + res, '_blank')
      })
    }
    const reset = () => {
      state.params = {
        edit_time: '',
        instance: '',
        title: ''
      }
      filterList(1)
    }
    onMounted(() => {
      getData(1)
    })
    return {
      ...toRefs(state),
      getData,
      pageChange,
      pageSizeChange,
      goToCase,
      reset,
      filterList
    }
  }
}
</script>
