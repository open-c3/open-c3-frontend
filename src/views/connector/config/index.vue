
<template>
  <div v-loading="loading">
    <el-card :header="$t('JYDocking')">
      <base-form ref="form" :config="config.JY.form" :params="params" class="w1100 ml20">
        <template #btn>
          <el-button :disabled="!(params.juyunappname && params.juyunappkey)" @click="save" class="ml-100">{{ $t('JYConnectorInitialization') }}</el-button>
        </template>
      </base-form>
    </el-card>
    <el-card class="mt20">
      <template #header>
        <div class="df ai_c jc_sb">
          <span>
            {{ $t('connectorConfigManage') }}
          </span>
          <el-button @click="save" type="primary">{{ $t('save') }}</el-button>
        </div>
      </template>
      <!-- 历史连接器 -->
      <p>{{ $t(config.history.title) }}</p>
      <base-form ref="form" :config="config.history.form" :params="history" class="w650 ml20"/>
      <el-divider class="costv-divider mt16 mb16"/>
      <!-- 登录 -->
      <p>{{ $t(config.login.title) }}</p>
      <base-form ref="form" :config="config.login.form" :params="params" class="w650 ml20"/>
      <!-- 服务树 -->
      <p>{{ $t(config.tree.title) }}</p>
      <base-form ref="form" :config="config.tree.form" :params="params" class="w650 ml20"/>
      <!-- 消息出口 -->
      <p>{{ $t(config.message.title) }}</p>
      <base-form ref="form" :config="config.message.form" :params="params" class="w650 ml20"/>
      <!-- 外部辅助审批 -->
      <p>{{ $t(config.external.title) }}</p>
      <base-form ref="form" :config="config.external.form" :params="params" class="w650 ml20"/>
      <!-- 工单扩展(用户详情) -->
      <p>{{ $t(config.ticket.title) }}</p>
      <base-form ref="form" :config="config.ticket.form" :params="params" class="w650 ml20"/>
      <!-- 连接器存活检测 -->
      <p>{{ $t(config.connector.title) }}</p>
      <base-form ref="form" :config="config.connector.form" :params="params" class="w650 ml20"/>
      <!-- 前端风格 -->
      <p>{{ $t(config.style.title) }}</p>
      <base-form ref="form" :config="config.style.form" :params="params" class="w650 ml20"/>
      <!-- 连接器设置 -->
      <p>{{ $t(config.setting.title) }}</p>
      <base-form ref="form" :config="config.setting.form" :params="params" class="w650 ml20"/>
      <el-divider class="costv-divider mt16 mb16"/>
      <!-- 报告 -->
      <p>{{ $t(config.report.title) }}</p>
      <base-form ref="form" :config="config.report.form" :params="params" class="w650 ml20"/>
    </el-card>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted, watch } from 'vue'
import baseForm from '@/components/baseForm/index.vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import { HISTORY_CONFIG, JY_CONFIG, LOGIN_CONFIG, TREE_CONFIG, MESSAGE_CONFIG, EXTERNAL_CONFIG, TICKET_CONFIG, CONNECTOR_CONFIG, STYLE_CONFIG, SETTING_CONFIG, REPORT_CONFIG } from './config'
import { getConnectorConfig, getConnectorList, setConnectorConfig } from '@/api/connector/config'
import { ElMessageBox } from 'element-plus'
export default {
  components: { baseForm, searchFrom, Table },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      history: {
        name: 'current',
      },
      params: {
        juyunappname: '',
        juyunappkey: '',
        ssousername: '', // 获取用户信息
        ssologoutapi: '', // 用户登出
        ssocallback: '',  // 回调
        cookiekey: '', // cookie
        ssochpasswd: '', // 修改密码
        usertree: '', // 用户服务树
        treemap:'', // 全量服务树
        treemapenv_appname: '',
        treemapenv_appkey: '',
        nodeinfo: '', // 服务树资源
        nodeinfoenv_appname: '', // appname
        nodeinfoenv_appkey: '', // appkey
        pmspoint: '', // 权限控制
        usermail: '', // 邮件
        usermailenv_appname: '', // appname
        usermailenv_appkey: '', // appkey
        usermesg: '', // 短信
        usermesgenv_appname: '', // appname
        usermesgenv_appkey: '', // appkey
        usercall: '', // 语音
        usercallenv_appname: '', // appname
        usercallenv_appkey: '', // appkey
        approver: '', // 外部辅助审批-审批接口
        approverenv_appname: '', // appname
        approverenv_appkey: '', // appkey
        userinfo: '', // 工单扩展-审批接口
        userinfoenv_appname: '', // appname
        userinfoenv_appkey: '', // appkey
        alive: '', // 探活地址
        frontendstyle: '', // 前端风格
        debug: '', // 调试日志
        apicache: '', // 接口缓存
        openc3_job_system_only: '', // 仅使用作业系统
        monagent9100: '', // 使用原生
        gitreport2company: '', // 报告合并
        flowreport2company: ''
      },
      config: {
        JY: JY_CONFIG,
        history: HISTORY_CONFIG,
        login: LOGIN_CONFIG,
        tree: TREE_CONFIG,
        message: MESSAGE_CONFIG,
        external: EXTERNAL_CONFIG,
        ticket: TICKET_CONFIG,
        connector: CONNECTOR_CONFIG,
        style: STYLE_CONFIG,
        setting: SETTING_CONFIG,
        report: REPORT_CONFIG
      },
      loading: false
    })
    
    const getList = () => {
      getConnectorList().then((res: any) => {
        state.config.history.form.config[0].data = res.map(item => {
          return { id: item, label: item}
        })
      })
    }
    const getData = (name: string) => {
      state.loading = true
      getConnectorConfig(name).then((res: any) => {
        state.loading = false
        getList()
        state.params.ssousername = res.ssousername
        state.params.ssologoutapi = res.ssologoutapi
        state.params.ssocallback = res.ssocallback
        state.params.cookiekey = res.cookiekey
        state.params.ssochpasswd = res.ssochpasswd
        state.params.usertree = res.usertree
        state.params.treemap = res.treemap
        state.params.treemapenv_appname = res?.treemapenv?.appname || ''
        state.params.treemapenv_appkey = res?.treemapenv?.appkey || ''
        state.params.nodeinfo = res.nodeinfo
        state.params.nodeinfoenv_appname = res?.nodeinfoenv?.appname || ''
        state.params.nodeinfoenv_appkey = res?.nodeinfoenv?.appkey || ''
        state.params.pmspoint = res.pmspoint
        state.params.usermail = res.usermail
        state.params.usermailenv_appname = res?.usermailenv?.appname || ''
        state.params.usermailenv_appkey = res?.usermailenv?.appkey || ''
        state.params.usermesg = res.usermesg
        state.params.usermesgenv_appname = res?.usermesgenv?.appname || ''
        state.params.usermesgenv_appkey = res?.usermesgenv?.appkey || ''
        state.params.usercall = res.usercall
        state.params.usercallenv_appname = res?.usercallenv?.appname || ''
        state.params.usercallenv_appkey = res?.usercallenv?.appkey || ''
        state.params.approver = res.approver
        state.params.approverenv_appname = res?.approverenv?.appname || ''
        state.params.approverenv_appkey = res?.approverenv?.appkey || ''
        state.params.userinfo = res.userinfo
        state.params.userinfoenv_appname = res?.userinfoenv?.appname || ''
        state.params.userinfoenv_appkey = res?.userinfoenv?.appkey || ''
        state.params.alive = res.alive
        state.params.frontendstyle = res.frontendstyle
        console.log(state.params.frontendstyle, res.frontendstyle)
        state.params.debug = res.debug
        state.params.apicache = res.apicache
        state.params.openc3_job_system_only = res.openc3_job_system_only
        state.params.monagent9100 = res.monagent9100
        state.params.gitreport2company = res.gitreport2company
        state.params.flowreport2company = res.flowreport2company
      })
    }
    const save = () => {
      const data = {
        juyunappname: state.params.juyunappname,
        juyunappkey: state.params.juyunappkey,
        ssousername: state.params.ssousername,
        ssologoutapi: state.params.ssologoutapi,
        ssocallback: state.params.ssocallback,
        cookiekey: state.params.cookiekey,
        ssochpasswd: state.params.ssochpasswd,
        usertree: state.params.usertree, // 用户服务树
        treemap: state.params.treemap, // 全量服务树
        // treemapenv: {
        //   appname: state.params.treemapenv_appname,
        //   appkey: state.params.treemapenv_appkey
        // },
        nodeinfo: state.params.nodeinfo, // 服务树资源
        // nodeinfoenv: {
        //   appname: state.params.nodeinfoenv_appname, // appname
        //   appkey: state.params.nodeinfoenv_appkey // appkey
        // },
        pmspoint: state.params.pmspoint, // 权限控制
        usermail: state.params.usermail,
        // usermailenv: {
        //   appname: state.params.usermailenv_appname, // appname
        //   appkey: state.params.usermailenv_appkey // appkey
        // },
        usermesg: state.params.usermesg, // 短信
        // usermesgenv: {
        //   appname: state.params.usermesgenv_appname, // appname
        //   appkey: state.params.usermesgenv_appkey // appkey
        // },
        usercall: state.params.usercall, // 语音
        // usercallenv: {
        //   appname: state.params.usercallenv_appname, // appname
        //   appkey: state.params.usercallenv_appkey // appkey
        // },
        approver: state.params.approver, // 审批接口
        // approverenv: {
        //   appname: state.params.approverenv_appname, // appname
        //   appkey: state.params.approverenv_appkey // appkey
        // },
        userinfo: state.params.userinfo,
        // userinfoenv: {
        //   appname: state.params.userinfoenv_appname, // appname
        //   appkey: state.params.userinfoenv_appkey // appkey
        // },
        alive: state.params.alive, // 探活地址
        frontendstyle: state.params.frontendstyle, // 前端风格
        debug: state.params.debug, // 调试日志
        apicache: state.params.apicache, // 接口缓存
        openc3_job_system_only: state.params.openc3_job_system_only, // 仅使用作业系统
        monagent9100: state.params.monagent9100, // 使用原生
        gitreport2company: state.params.gitreport2company, // 报告合并
        flowreport2company: state.params.flowreport2company
      }
      let config = {}
      for(const key of Object.keys(data)) {
        if (data[key] !== '' && typeof data[key] !== 'undefined') {
          config[key] = data[key]
        }
      }
      if (state.params.treemapenv_appname !== '' && state.params.treemapenv_appkey !== '') {
        config['treemapenv'] = {
          appname: state.params.treemapenv_appname,
          appkey: state.params.treemapenv_appkey
        }
      }
      if (state.params.nodeinfoenv_appname !== '' && state.params.nodeinfoenv_appkey !== '') {
        config['nodeinfoenv'] = {
          appname: state.params.nodeinfoenv_appname,
          appkey: state.params.nodeinfoenv_appkey
        }
      }
      if (state.params.usermailenv_appname !== '' && state.params.usermailenv_appkey !== '') {
        config['usermailenv'] = {
          appname: state.params.usermailenv_appname,
          appkey: state.params.usermailenv_appkey
        }
      }
      if (state.params.usermesgenv_appname !== '' && state.params.usermesgenv_appkey !== '') {
        config['usermesgenv'] = {
          appname: state.params.usermesgenv_appname,
          appkey: state.params.usermesgenv_appkey
        }
      }
      if (state.params.usercallenv_appname !== '' && state.params.usercallenv_appkey !== '') {
        config['usercallenv'] = {
          appname: state.params.usercallenv_appname,
          appkey: state.params.usercallenv_appkey
        }
      }
      if (state.params.approverenv_appname !== '' && state.params.approverenv_appkey !== '') {
        config['approverenv'] = {
          appname: state.params.approverenv_appname,
          appkey: state.params.approverenv_appkey
        }
      }
      if (state.params.userinfoenv_appname !== '' && state.params.userinfoenv_appkey !== '') {
        config['userinfoenv'] = {
          appname: state.params.userinfoenv_appname,
          appkey: state.params.userinfoenv_appkey
        }
      }
      console.log(config)
      ElMessageBox.confirm(proxy.$t('saveConnectorDesc'), proxy.$t('saveConnectorTitle'), {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        state.loading = true
        setConnectorConfig({
          config: config
        }).then(res => {
          proxy.$notification('saveConnectorSuccess')
          getData(state.history.name)
          state.loading = false
        })
      })
    }
    watch(() => state.history.name, val => {
      getData(val)
    }, {
      immediate: true
    })
    return {
      ...toRefs(state),
      save,
      getData
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
