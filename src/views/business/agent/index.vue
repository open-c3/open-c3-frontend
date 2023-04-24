
<template>
  <div class="body-layout1">
    <saas-tabs :label="treeData?.parent" class="mt-20"/>
    <p class="df jc_sb">
      <span>
        {{ $t('autoUpdateStatus') }}
        <el-switch v-model="flag"/>
      </span>
      <span>
        <el-button type="primary">{{ $t('editRecord') }}</el-button>
        <el-button icon="refresh"></el-button>
        <el-button icon="plus"></el-button>
      </span>
    </p>
    <el-divider class="costv-divider mt16 mb16"/>
    <div>
      <p v-for="(item, index) in part1" :key="index" class="f12">
        {{ item.title }}<span :class="item.contentClass">{{ item.content }}</span>
      </p>
    </div>
    <p class="tr">
      <el-button type="primary">{{ $t('proxyInterface') }}</el-button>
    </p>
    <el-divider class="costv-divider mt16 mb16"/>
    <div class="f12">
      <p>
        <span class="b">{{ $t('install') }}AGENT MON:</span>
        <span class="c-error">curl -L {{siteaddr}}/api/scripts/installAgentMon.sh |sudo OPEN_C3_ADDR={{siteaddr}} bash</span>
      </p>
      <p class="b">{{ $t('deployWindowsExporter') }}</p>
      <p>{{ $t('deployWindowsExporter1') }}<br>Release v0.20.0 · prometheus-community/windows_exporter</p>
      <p>{{ $t('deployWindowsExporter2') }}<br>cd C:\Users\Administrator\Downloads<br>msiexec /i windows_exporter-0.20.0-amd64.msi LISTEN_PORT=65110</p>
      <p>{{ $t('deployWindowsExporter3') }}<br>netstat -ano {{ $t('deployWindowsExporter3_1') }}<br>service.msc {{ $t('deployWindowsExporter3_2') }}<br>http://localhost:65110/metrics {{ $t('deployWindowsExporter3_3') }}</p>
    </div>
    <el-divider class="costv-divider mt16 mb16"/>
    <div class="f12">
      <p v-for="(item, index) in part2" :key="index">
        {{ item.title }} <span class="c-error">{{ item.content }}</span>
      </p>
    </div>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange" class="mt20">
      <template #operate="{ row }">
        <el-button  link type="primary">{{ $t('delete') }}</el-button>
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, computed, watch, getCurrentInstance } from 'vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import { ElMessageBox } from 'element-plus'
import { getVariateList, deleteVariate } from '@/api/business/variate'
import { THEAD_CONFIG } from '@/views/business/agent/config'
import { getAgentStatus } from '@/api/business/agent'
export default {
  components: { Table },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      flag: false,
      siteaddr: '',
      tableConfig: {
        loading: false,
        thead: THEAD_CONFIG,
        total: 0,
        list: [],
        allList: [],
        page: 1,
        pageSize: 10
      }
    })
    const treeId = computed(() => {
      return store.getters.treeId
    })
    const treeData = computed(() => {
      return store.getters.treeData
    })
    const pageChange = (page: number) => {
      state.tableConfig.page = page
      state.tableConfig.list = state.tableConfig.allList.slice((state.tableConfig.page - 1) * state.tableConfig.pageSize, state.tableConfig.page * state.tableConfig.pageSize)
    }
    const pageSizeChange = (pageSize: number) => {
      state.tableConfig.pageSize = pageSize
      pageChange(1)
    }
    const part1 = computed(() => {
      return [
        { title: proxy.$t('installProxy'), contentClass: 'c-error', content: `curl -L ${state.siteaddr}/api/scripts/installProxy.sh |sudo OPEN_C3_ADDR=${state.siteaddr} bash`},
        { title: proxy.$t('installAgent'), contentClass: 'c-error', content: `curl -L ${state.siteaddr}/api/scripts/installAgent.sh |sudo OPEN_C3_ADDR=${state.siteaddr} bash`},
        { title: proxy.$t('specifyAGENTStartup'), contentClass: '', content: 'OPEN_C3_AGENT_USER=worker'},
        { title: proxy.$t('forcedReinstall'), contentClass: '', content: 'OPEN_C3_AGENT_FORCE_INSTALL=1'},
        { title: proxy.$t('uninstallCommand'), contentClass: '', content: 'rm -rf /opt/mydan /data/mydan /etc/cron.d/mydan_bootstrap_cron_7d29f42'}
      ]
    })
    const part2 = computed(() => {
      return [
        { title: `${proxy.$t('install')}  MysqlQuery【${proxy.$t('port')} 65113】`, content: `curl -L ${state.siteaddr}/api/scripts/installMysqlQuery.sh |sudo OPEN_C3_ADDR=${state.siteaddr} bash`},
        { title: `${proxy.$t('install')}  RedisQuery【${proxy.$t('port')} 65114】`, content: `curl -L ${state.siteaddr}/api/scripts/installRedisQuery.sh |sudo OPEN_C3_ADDR=${state.siteaddr} bash`},
        { title: `${proxy.$t('install')}  MongodbQuery【${proxy.$t('port')} 65115】`, content: `curl -L ${state.siteaddr}/api/scripts/installMongodbQuery.sh |sudo OPEN_C3_ADDR=${state.siteaddr} bash`},
      ]
    })
    const getStatus = () => {
      getAgentStatus(treeId.value).then(res => {
        console.log(res)
      })
    }
    watch(() => treeId.value, val => {
      getStatus()
    }, {
      immediate: true,
      deep: true
    })
    return {
      ...toRefs(state),
      treeId,
      treeData,
      pageChange,
      pageSizeChange,
      part1,
      part2
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
