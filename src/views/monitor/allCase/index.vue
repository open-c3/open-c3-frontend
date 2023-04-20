<template>
  <div class="body-layout1">
    <search-from :params="params" :config="config" @reset="reset" @query="getData(1)"/>
    <el-divider class="costv-divider mt16 mb16"/>
    <Table :thead="thead" :data="list" :tableLoading="allCase.loading" :page="allCase.page" :pageSize="allCase.pageSize" :total="allCase.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange">
      <!-- 告警中 -->
      <template #caseuuid="{ row }">
        {{ allAlert[row.caseuuid] === 1 ? $t('yes') : $t('no')}}
      </template>
      <!-- 关联工单 -->
      <template #bindTT="{ row }">
        <template v-if="bindTT[row.caseuuid]">
          <el-button v-for="item in bindTT[row.caseuuid]" @click="goToCase(row, item)" link type="primary">{{ item }}</el-button>
        </template>
      </template>
      <template #operate="{ row }">
        <!-- 屏蔽操作 -->
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
import shieldPart from './shield.vue'
// import store from '@/store'
import { getAllCase, getMonitorAlert, getMonitorAlertTottbind, toCase } from '@/api/monitor/index'
import { THEAD, SEARCH_CONFIG } from '@/views/monitor/allCase/config'
import { g_url, formatMsTime, filterAry } from '@/utils/index'
export default {
  components: { Table, shieldPart, searchFrom },
  setup () {
    // const { proxy } = getCurrentInstance()
    const state = reactive({
      thead: THEAD,
      params: {
        time: '',
        instance: '', // 实例
        title: ''
      },
      config: SEARCH_CONFIG,
      allList: [],
      filterList: [],
      list: [],
      allCase: {
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
      state.allCase.total = state.filterList.length
      pageChange(page)
    }
    // 获取当前告警列表
    const getData = (page?) => {
      state.allCase.loading = true
      // 告警事件列表
      getAllCase().then((res: any) => {
        res.forEach(item => {
          item.time = formatMsTime(item.startat)
        })
        state.allList = res
        filterList(page)
        state.allCase.loading = false
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
      state.allCase.page = page ? page : 1
      state.list = state.filterList.slice((state.allCase.page - 1) * state.allCase.pageSize, state.allCase.page * state.allCase.pageSize)
    }
    const pageSizeChange = (pageSize: number) => {
      state.allCase.pageSize = pageSize
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
    // 重置操作
    const reset = () => {
      state.params = {
        time: '',
        instance: '',
        title: ''
      }
      getData(1)
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
