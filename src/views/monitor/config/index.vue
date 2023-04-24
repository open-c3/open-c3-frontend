<template>
  <div class="body-layout1">
    <saas-tabs v-model="activeName" :tabs="tabs">
      <template #content="{ item }">
        <!-- 服务树继承解除 -->
        <div v-if="item.name === 'tree'">
          <p class="df js_sb"> 
            <span>{{ treeData?.parent }}</span>
            <thirdApp/>
          </p>
          <p></p>
          <p class="df ai_c">
            {{ $t('treeInheritanceCancellation') }}
            <el-switch v-model="status" class="ml5"/>
            <el-button v-show="oldStatus !== status" @click="save" type="primary" class="ml10">{{ $t('saveNewState') }}</el-button>
          </p>
        </div>
        <!-- 节点主机资源 -->
        <div v-else-if="item.name === 'hostResource'">
          <search-from :params="hostResource.params" :config="hostResource.config" @reset="reset" @query="getHostResource" class="mt20"/>
          <el-divider class="costv-divider mt16 mb16"/>
          <Table :thead="hostResource.thead" :data="hostResource.list" :tableLoading="hostResource.loading" :page="hostResource.page" :pageSize="hostResource.pageSize" :total="hostResource.total" :pageChange="page=>pageChange(page, 'hostResource')" :pageSizeChange="size =>pageSizeChange(size, 'hostResource')">
            <template #clientVersion="{ row }">
              <span v-if="row.inip">{{row.inips.version}}</span>
              <span v-if="row.exip && ! row.inip">{{row.exips.version}}</span>
            </template>
            <template #clientLastDetectionTime="{ row }">
              <span v-if="row.inip">{{row.inips.edit_time}}</span>
              <span v-if="row.exip && ! row.inip">{{row.exips.edit_time}}</span>
            </template>
            <template #clientErrorReason="{ row }">
              <span v-if="row.inip && row.inips.status=='fail'">failcount:{{row.inips.fail}}; {{row.inips.reason}}</span>
              <span v-if="row.exip && ! row.inip && row.exips.status=='fail'">failcount:{{row.exips.fail}}; {{row.exips.reason}}</span>
            </template>
          </Table>
        </div>
        <!-- 当前告警 -->
        <div v-else-if="item.name === 'currentAlarm'">
          <p class="tr">
            <el-button @click="getCurrentData" :loading="currentWarning.loading" type="primary" icon="Refresh" />
          </p>
          <el-divider class="costv-divider mt16 mb16"/>
          <Table :thead="currentWarning.thead" :data="currentWarning.list" :tableLoading="currentWarning.loading" :page="currentWarning.page" :pageSize="currentWarning.pageSize" :total="currentWarning.total" :pageChange="page=>pageChange(page, 'currentWarning')" :pageSizeChange="size =>pageSizeChange(size, 'currentWarning')">
            <template #operate="{ row }">
              <el-button @click="openChart(row)" link type="primary">{{ $t('viewChart') }}</el-button>
            </template>
          </Table>
        </div>
        <!-- 监控指标采集 -->
        <div v-else-if="item.name === 'collectionMonIndicators'">
          <p class="df jc_sb">
            <span>{{ $t('collectionMonIndicators')}}【{{ $t('process')}}、{{$t('port')}}、HTTP】</span>
            <span class="df jc_fe">
              <el-button @click="monitorIndicatorsInfo = null; monitorIndicators.flag = true" type="primary" icon="plus">{{ $t('addCollectionMonIndicators')}}</el-button>
              <el-button @click="getCollectorData" :loading="monitorIndicators.loading" type="primary" icon="Refresh" />
            </span>
          </p>
          <el-divider class="costv-divider mt16 mb16"/>
          <Table :thead="monitorIndicators.thead" :data="monitorIndicators.list" :page="monitorIndicators.page" :pageSize="monitorIndicators.pageSize" :total="monitorIndicators.total" :pageChange="page=>pageChange(page, 'monitorIndicators')" :pageSizeChange="size =>pageSizeChange(size, 'monitorIndicators')" :tableLoading="monitorIndicators.loading">
            <template #content1="{ row }">
              {{ row.content2 === '' ? row.content1 : `${row.content1}【${$t('match')}${row.content2}】` }}
            </template>
            <template #operate="{ row }">
              <el-button @click="monitorIndicatorsInfo = row; monitorIndicators.flag = true" link type="primary">{{ $t('edit') }}</el-button>
              <el-button @click="deleteFun('monitorIndicators', row)" link type="primary">{{ $t('delete') }}</el-button>
            </template>
          </Table>
        </div>
        <!-- 监控策略 -->
        <div v-else-if="item.name === 'monStrategy'">
          <p class="tr">
            <span class="df jc_fe">
              <el-button @click="ruleInfo = null;monitorStrategy.flag = true" type="primary" icon="plus">{{ $t('addMonStrategy')}}</el-button>
              <el-button @click="monitorStrategy.addTmpFlag = true" type="primary" icon="plus">{{ $t('addMonStrategyByTemp')}}</el-button>
              <el-button @click="monitorStrategy.syncTmpFlag = true" type="primary" icon="plus">{{ $t('saveAsTemp')}}</el-button>
              <el-button @click="monitorStrategy.copyRuleFlag = true" type="primary" icon="plus">{{ $t('copyTreeStrategy')}}</el-button>
              <el-button @click="clearStrategy" icon="delete">{{ $t('clearStrategy')}}</el-button>
              <el-button @click="getRuleData" :loading="monitorStrategy.loading" type="primary" icon="Refresh" />
            </span>
          </p>
          <el-divider class="costv-divider mt16 mb16"/>
          <Table :thead="monitorStrategy.thead" :data="monitorStrategy.list" :page="monitorStrategy.page" :pageSize="monitorStrategy.pageSize" :total="monitorStrategy.total" :pageChange="page=>pageChange(page, 'monitorStrategy')" :pageSizeChange="size =>pageSizeChange(size, 'monitorStrategy')" :tableLoading="monitorStrategy.loading">
            <template #expr="{ row }">
              <el-tooltip effect="dark" :content="$t(row.expr)" placement="top">
                <span>{{ row?.expr.length > 63 ? '...' + row.expr.substr(row.expr.length - 60) : row.expr }}</span>
              </el-tooltip>
            </template>
            <template #operate="{ row }">
              <el-button @click="ruleInfo = row; monitorStrategy.flag = true" link type="primary">{{ $t('edit') }}</el-button>
              <el-button @click="deleteFun('monitorStrategy', row)" link type="primary">{{ $t('delete') }}</el-button>
            </template>
          </Table>
        </div>
        <!-- 通知列表 -->
        <div v-else-if="item.name === 'notifyList'">
          <p class="tr">
            <span class="df jc_fe">
              <template v-if="addUser.type === '' || addUser.type === ':'">
                <el-input v-model.trim="addUser.user" class="w300 h30">
                  <template #prepend>
                    <el-select v-model="addUser.type" @change="addUser.user = ''" class="w100">
                      <el-option :label="$t('user')" value=""/>
                      <el-option :label="$t('alarmGroup')" value="@" />
                      <el-option :label="$t('onCall')" value="%" />
                      <el-option :label="$t('department')" value=":" />
                    </el-select>
                  </template>
                </el-input>
              </template>
              <template v-else>
                <el-select v-model="addUser.type" @change="addUser.user = ''" class="w100">
                  <el-option :label="$t('user')" value=""/>
                  <el-option :label="$t('alarmGroup')" value="@" />
                  <el-option :label="$t('onCall')" value="%" />
                  <el-option :label="$t('department')" value=":" />
                </el-select>
                <el-select v-model.trim="addUser.user" class="w200 h30">
                  <template v-if="addUser.type === '@'">
                    <el-option v-for="(item, index) in groupList" :key="index" :label="item.name" :value="item.name"/>
                  </template>
                  <template v-else-if="addUser.type === '%'">
                    <el-option v-for="(item, index) in onCallList" :key="index" :label="item.name" :value="item.name"/>
                  </template>
                </el-select>
              </template>
              <el-input v-model="addUser.subgroup" :placeholder="$t('subgroup')" class="w160 ml5"/>
              <el-button :disabled="addUser.loading || addUser.user === ''" @click="add" type="primary" icon="UserFilled" class="ml10">{{ $t('add') }}</el-button>
              <el-button @click="getNoticeData" :loading="notice.loading" type="primary" icon="Refresh" />
            </span>
          </p>
          <el-divider class="costv-divider mt16 mb16"/>
          <Table :thead="notice.thead" :data="notice.list" :page="notice.page" :pageSize="notice.pageSize" :total="notice.total" :pageChange="page=>pageChange(page, 'notice')" :pageSizeChange="size =>pageSizeChange(size, 'notice')" :tableLoading="notice.loading">
            <template #operate="{ row }">
              <el-button @click="deleteFun('notice', row)" link type="primary">{{ $t('delete') }}</el-button>
              <el-button @click="userTest(row)" link type="primary">{{ $t('testMessageChannel')}}</el-button>
            </template>
          </Table>
        </div>
      </template>
    </saas-tabs>
  </div>
  <!-- 监控指标采集 -->
  <add-indicators v-if="monitorIndicators.flag" v-model="monitorIndicators.flag" :info="monitorIndicatorsInfo" @addSuccess="getCollectorData" @cancel="monitorIndicators.flag = false"/>
  <!-- 监控策略 -->
  <add-strategy v-if="monitorStrategy.flag" v-model="monitorStrategy.flag" :rule-info="ruleInfo" @addSuccess="getRuleData" @cancel="monitorStrategy.flag = false"/>
  <!-- 通过模版添加监控策略 syncTmp-->
  <add-tmp v-if="monitorStrategy.addTmpFlag" v-model="monitorStrategy.addTmpFlag" @addSuccess="getRuleData" @cancel="monitorStrategy.addTmpFlag = false"/>
  <!-- 保存为模版 -->
  <sync-tmp v-if="monitorStrategy.syncTmpFlag" v-model="monitorStrategy.syncTmpFlag" @addSuccess="getRuleData" @cancel="monitorStrategy.syncTmpFlag = false"/>
  <!-- 复制其他服务树节点策略 -->
  <copyRule v-if="monitorStrategy.copyRuleFlag" v-model="monitorStrategy.copyRuleFlag" @addSuccess="getRuleData" @cancel="monitorStrategy.copyRuleFlag = false"/>
</template>
<script lang="ts">
import { onMounted, reactive, toRefs, getCurrentInstance, computed, watch } from 'vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import thirdApp from '@/views/monitor/components/thirdApp.vue'
import searchFrom from '@/components/search/index.vue'
import addIndicators from '@/views/monitor/config/components/addIndicators.vue'
import addStrategy from '@/views/monitor/config/components/addStrategy.vue'
import addTmp from '@/views/monitor/config/components/addTmp.vue'
import syncTmp from '@/views/monitor/config/components/syncTmp.vue'
import copyRule from '@/views/monitor/config/components/copyRule.vue'
import { getTreeUnbind, setTreeUnbind, getNodeInfo, getCurrentWarning, getCollector, deleteCollector, getRule, deleteRule, getConfigUser, addConfigUser, deleteConfigUser, configUserTest, clearNodeRule } from '@/api/monitor/config'
import { getConfigGroup } from '@/api/monitor/index'
import { getConfigOnCall } from '@/api/monitor/onCall'
import { ElMessageBox } from 'element-plus'
import { TABS_CONFIG, hostResourceSearch, hostResourceThead, currentWarningThead, monitorIndicatorsThead, monitorStrategyThead, noticeThead } from './config'
export default {
  components: { Table, thirdApp, searchFrom, addIndicators, addStrategy, addTmp, syncTmp, copyRule },
  setup () {
    const { proxy } = getCurrentInstance()
    const treeId = computed(() => {
      return store.getters.treeId
    })
    const treeData = computed(() => {
      return store.getters.treeData
    })
    const state = reactive({
      activeName: 'tree',
      tabs: TABS_CONFIG,
      status: false,
      oldStatus: false,
      hostResource: { // 节点主机资源
        config: hostResourceSearch,
        params: {
          type: '',
          inip: '',
          exip: ''
        },
        thead: hostResourceThead,
        page: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        list: [],
        allList: [],
        noFilterList: [],
      },
      currentWarning: { // 当前告警
        thead: currentWarningThead,
        page: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        list: [],
        allList: []
      },
      monitorIndicators: { // 监控指标采集
        thead: monitorIndicatorsThead,
        page: 1,
        pageSize: 10,
        total: 0,
        list: [],
        allList: [],
        loading: false,
        flag: false
      },
      monitorStrategy: { // 监控策略
        thead: monitorStrategyThead,
        page: 1,
        pageSize: 10,
        total: 0,
        list: [],
        allList: [],
        loading: false,
        flag: false,
        addTmpFlag: false,
        syncTmpFlag: false,
        copyRuleFlag: false
      },
      notice: { // 通知列表
        thead: noticeThead,
        page: 1,
        pageSize: 10,
        total: 0,
        list: [],
        allList: [],
        loading: false,
        flag: false
      },
      monitorIndicatorsInfo: null,
      ruleInfo: null,
      addUser: {
        loading: false,
        type: '',
        user: '',
        subgroup: ''
      },
      groupList: [],
      onCallList: []
    })
    // 获取状态
    const getTreeStatus = () => {
      getTreeUnbind(treeId.value).then((res: any) => {
        state.status = res.status ? true : false
        state.oldStatus = res.status ? true : false
      })
    }
    // 设置状态
    const save = () => {
      ElMessageBox.confirm(proxy.$t('saveNewState'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel')
      }).then(() => {
        const str = state.status ? '1' : 0
        setTreeUnbind(treeId.value, { status: str}).then(res => {
          proxy.$notification('success')
          getTreeStatus()
        })
      })
    }
    // 重置
    const reset = () => {
      state.hostResource.params = {
        type: '',
        inip: '',
        exip: ''
      }
    }
    // 节点主机资源
    const getHostResource = () => {
      getNodeInfo(treeId.value).then((res: any) => {
        state.hostResource.noFilterList = res
        state.hostResource.allList = res
        state.hostResource.total = res.length
        pageChange(1, 'hostResource')
      })
    }
    // 获取当前告警列表
    const getCurrentData = () => {
      state.currentWarning.loading = true
      const list = []
      getCurrentWarning(treeId.value).then((res: any) => {
        res.forEach(item => {
          item.alertname = item?.labels.alertname
          item.instance = item?.labels.instance
          item.state = item?.status.state
          item.summary = item?.annotations.summary
          item.value = item?.annotations.value
          list.push(item)
        })
        state.currentWarning.allList = list.reverse()
        state.currentWarning.total = list.length
        pageChange(1, 'currentWarning')
      }).finally(() => {
        state.currentWarning.loading = false
      })
    }
    // 监控指标采集
    const getCollectorData = () => {
      state.monitorIndicators.loading = true
      const list = []
      getCollector(treeId.value).then((res: any) => {
        res.forEach(item => {
          list.push(item)
        })
        state.monitorIndicators.allList = list.reverse()
        state.monitorIndicators.total = list.length
        pageChange(1, 'monitorIndicators')
      }).finally(() => {
        state.monitorIndicators.loading = false
      })
      state.monitorIndicators.flag = false
    }
    // 策略
    const getRuleData = () => {
      state.monitorStrategy.loading = true
      const list = []
      getRule(treeId.value).then((res: any) => {
        res.forEach(item => {
          list.push(item)
        })
        state.monitorStrategy.allList = list.reverse()
        state.monitorStrategy.total = list.length
        pageChange(1, 'monitorStrategy')
      }).finally(() => {
        state.monitorStrategy.loading = false
      })
      state.monitorStrategy.flag = false
      state.monitorStrategy.addTmpFlag = false
      state.monitorStrategy.syncTmpFlag = false
    }
    // 通知列表
    const getNoticeData = () => {
      state.notice.loading = true
      const list = []
      getConfigUser(treeId.value).then((res: any) => {
        res.forEach(item => {
          list.push(item)
        })
        state.notice.allList = list.reverse()
        state.notice.total = list.length
        pageChange(1, 'notice')
      }).finally(() => {
        state.notice.loading = false
      })
      state.notice.flag = false
    }
    // 查看图表
    const openChart = (row) => {
      window.open(row.generatorURL)
    }
    const pageChange = (page, type) => {
      state[type].page = page
      if (type === 'hostResource') {
        const list = state.hostResource.noFilterList.filter(item => item.type.includes(state.hostResource.params.type) && item.inip.includes(state.hostResource.params.inip) && item.exip.includes(state.hostResource.params.exip))
        state[type].total = state[type].total
        state[type].list = list.slice((state[type].page - 1) * state[type].pageSize, state[type].page * state[type].pageSize)
      } else {
        state[type].list = state[type].allList.slice((state[type].page - 1) * state[type].pageSize, state[type].page * state[type].pageSize)
      }
    }
    const pageSizeChange = (size, type) => {
      state[type].pageSize = size
      pageChange(1, type)
    }
    // 删除
    const deleteFun = (type, row) => {
      const apiFun = {
        monitorIndicators: deleteCollector,
        monitorStrategy: deleteRule,
        notice: deleteConfigUser
      }
      const apiGetData = {
        monitorIndicators: getCollectorData,
        monitorStrategy: getRuleData,
        notice: getNoticeData
      }
      const msg = {
        monitorIndicators: 'deleteCollectionMonIndicators',
        monitorStrategy: 'deleteMonStrategy',
        notice: 'deleteUser'
      }
      ElMessageBox.confirm(proxy.$t(msg[type]), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        apiFun[type](treeId.value, row.id).then(res => {
          apiGetData[type]()
          proxy.$notification('success')
        })
      }).catch(() => {})
    }
    // 清空节点策略
    const clearStrategy = () => {
      ElMessageBox.confirm(proxy.$t('clearStrategy'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        clearNodeRule(treeId.value).then(res => {
          proxy.$notification('success')
          getRuleData()
        })
      }).catch(() => {})
    }
    // 添加告警人
    const add = () => {
      state.addUser.loading = true
      addConfigUser({
        treeId: treeId.value,
        user: state.addUser.type + state.addUser.user,
        subgroup: state.addUser.subgroup
      }).then(res => {
        getNoticeData()
        state.addUser.user = ''
      }).finally(() => {
        state.addUser.loading = false
      })
    }
    // 测试
    const userTest = (row) => {
      configUserTest({
        projectid: treeId.value,
        user: row.user
      }).then(res => {
        if (res) {
          proxy.$notification('userTestSuccess')
        }
      })
    }
    const getGroupData = () => {
      getConfigGroup().then((res: any) => {
        state.groupList = res
      })
    }
    const getOnCallData = () => {
      getConfigOnCall().then((res: any) => {
        state.onCallList = res
      })
    }
    onMounted(() => {
      getGroupData()
      getOnCallData()
    })
    watch(() => treeId.value, val => {
      getTreeStatus()
      getHostResource()
      getCurrentData()
      getCollectorData()
      getRuleData()
      getNoticeData()
      // state.tabs[0].label = treeData.value.parent
    },{
      immediate: true
    })
    return {
      ...toRefs(state),
      treeData,
      pageChange,
      pageSizeChange,
      getCurrentData,
      openChart,
      getCollectorData,
      deleteFun,
      getRuleData,
      getNoticeData,
      noticeThead,
      add,
      userTest,
      save,
      reset,
      clearStrategy,
      getHostResource
    }
  }
}
</script>
<style lang="scss" scoped>
.monitor-config{
  width: 100%;
  .monitor-config-content{
    width: calc(100% - 140px);
  }
}

</style>
