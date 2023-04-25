
<template>
  <div class="body-layout1">
    <saas-tabs :label="treeData?.parent" class="mt-20"/>
    <p class="df jc_sb">
      <span>
        {{ $t('autoUpdateStatus') }}
        <el-switch v-model="status"/>
        <el-button v-if="status !== oldStatus" @click="saveStatus" type="primary" class="ml10">{{ $t('saveNewState') }}</el-button>
      </span>
      <span>
        <!-- <el-button type="primary">{{ $t('editRecord') }}</el-button> -->
        <el-button @click="getList" icon="refresh"></el-button>
        <el-button @click="addRegionFlag = true" icon="plus"></el-button>
      </span>
    </p>
    <el-divider class="costv-divider mt16 mb16"/>
    <div>
      <p v-for="(item, index) in part1" :key="index" class="f12">
        {{ item.title }}<span :class="item.contentClass">{{ item.content }}</span>
      </p>
    </div>
    <p class="tr">
      <a :href="`${siteAddr}/api/agent/proxy/${treeId}`" target="_blank">
        <el-button type="primary">{{ $t('proxyInterface') }}</el-button>
      </a>
    </p>
    <el-divider class="costv-divider mt16 mb16"/>
    <div class="f12">
      <p>
        <span class="b">{{ $t('install') }}AGENT MON:</span>
        <span class="c-error">curl -L {{siteAddr}}/api/scripts/installAgentMon.sh |sudo OPEN_C3_ADDR={{siteAddr}} bash</span>
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
      <template #proxy="{ row }">
        <p class="df ai_c jc_c">
          <span class="c-success">{{ $t('normal') }}{{row.proxy?.success||0}}</span>
          <span class="c-error ml5">{{ $t('abnormal') }}{{row.proxy?.fail||0}}</span>
          <el-button v-if="row.regionprojectid === treeId"  @click=" info = row;addProxyFlag = true;" link type="primary" class="ml5">{{ $t('addProxy') }}</el-button>
        </p>
      </template>
      <template #agent="{ row }">
        <p class="df ai_c jc_c">
          <span class="c-success">{{ $t('normal') }}{{row.agent?.success||0}}</span>
          <span class="c-error ml5">{{ $t('abnormal') }}{{row.agent?.fail||0}}</span>
          <el-button v-if="row.proxy?.success || row.agent?.success > 0 || row.agent?.fail > 0 " @click="info = row; addAgentFlag = true;" link type="primary" class="ml5">{{ $t('addNetwork') }}</el-button>
        </p>
      </template>
    </Table>
    <!-- 添加自定义区域 -->
    <add-region v-if="addRegionFlag" v-model="addRegionFlag" :tree-data="treeData" @close="addRegionClose"/>
    <!-- 添加代理 -->
    <add-proxy v-if="addProxyFlag" v-model="addProxyFlag" :info="info" :tree-id="treeId" :tree-data="treeData" @cancel="addProxyClose" @update="getList"/>
    <!-- 添加网段 -->
    <add-agent v-if="addAgentFlag" v-model="addAgentFlag" :info="info" :tree-id="treeId" :tree-data="treeData" @update="getList"/>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, computed, watch, getCurrentInstance } from 'vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import addRegion from '@/views/business/agent/components/addRegion.vue'
import addProxy from '@/views/business/agent/components/addProxy.vue'
import addAgent from '@/views/business/agent/components/addAgent.vue'
import { ElMessageBox } from 'element-plus'
import { THEAD_CONFIG } from '@/views/business/agent/config'
import { getAgentStatus, saveAgentStatus, getRegionList } from '@/api/business/agent'
import { g_url } from '@/utils/index'
export default {
  components: { Table, addRegion, addProxy, addAgent },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      loading: false,
      status: false,
      oldStatus: false,
      siteAddr: g_url,
      // siteAddr: window.location.protocol + '//' + window.location.host
      tableConfig: {
        loading: false,
        thead: THEAD_CONFIG,
        total: 0,
        list: [],
        allList: [],
        page: 1,
        pageSize: 10
      },
      info: null,
      addRegionFlag: false,
      addProxyFlag: false,
      addAgentFlag: false
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
        { title: proxy.$t('installProxy'), contentClass: 'c-error', content: `curl -L ${state.siteAddr}/api/scripts/installProxy.sh |sudo OPEN_C3_ADDR=${state.siteAddr} bash`},
        { title: proxy.$t('installAgent'), contentClass: 'c-error', content: `curl -L ${state.siteAddr}/api/scripts/installAgent.sh |sudo OPEN_C3_ADDR=${state.siteAddr} bash`},
        { title: proxy.$t('specifyAGENTStartup'), contentClass: '', content: 'OPEN_C3_AGENT_USER=worker'},
        { title: proxy.$t('forcedReinstall'), contentClass: '', content: 'OPEN_C3_AGENT_FORCE_INSTALL=1'},
        { title: proxy.$t('uninstallCommand'), contentClass: '', content: 'rm -rf /opt/mydan /data/mydan /etc/cron.d/mydan_bootstrap_cron_7d29f42'}
      ]
    })
    const part2 = computed(() => {
      return [
        { title: `${proxy.$t('install')}  MysqlQuery【${proxy.$t('port')} 65113】`, content: `curl -L ${state.siteAddr}/api/scripts/installMysqlQuery.sh |sudo OPEN_C3_ADDR=${state.siteAddr} bash`},
        { title: `${proxy.$t('install')}  RedisQuery【${proxy.$t('port')} 65114】`, content: `curl -L ${state.siteAddr}/api/scripts/installRedisQuery.sh |sudo OPEN_C3_ADDR=${state.siteAddr} bash`},
        { title: `${proxy.$t('install')}  MongodbQuery【${proxy.$t('port')} 65115】`, content: `curl -L ${state.siteAddr}/api/scripts/installMongodbQuery.sh |sudo OPEN_C3_ADDR=${state.siteAddr} bash`},
      ]
    })
    // 获取开关状态
    const getStatus = () => {
      getAgentStatus(treeId.value).then((res: any) => {
        state.status = res.status && res.status !== 'off'
        state.oldStatus = res.status && res.status !== 'off'
      })
    }
    // 保存开关状态
    const saveStatus = () => {
      ElMessageBox.confirm(proxy.$t('saveNewState'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        state.loading = true
        const status = state.status ? 'on' : 'off'
        saveAgentStatus(treeId.value, { status }).then(res => {
          state.loading = false
          getStatus()
        })
      })
      
    }
    const getList = () => {
      state.tableConfig.loading = true
      getRegionList(treeId.value).then((res: any) => {
        state.tableConfig.allList = res
        state.tableConfig.total = res.length
        state.tableConfig.loading = false
        pageChange(1)
      })
    }
    const addProxyClose = () => {
      getList()
      state.addProxyFlag = false
    }
    const addRegionClose = () => {
      getList()
      state.addRegionFlag = false
    }
    watch(() => treeId.value, val => {
      getStatus()
      getList()
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
      part2,
      saveStatus,
      addProxyClose,
      getList,
      addRegionClose
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
