
<template>
  <div v-loading="loading" class="body-layout1">
    <div class="df ai_c jc_sb">
      <span>{{ $t('systemParameterManage') }}</span>
      <span>
        <el-button @click="save" type="primary">{{ $t('save') }}</el-button>
        <el-button @click="getData">{{ $t('refresh') }}</el-button>
      </span>
    </div>
    <template v-for="item in ary">
      <saas-tabs v-model="config[item].activeName" :tabs="config[item].tabs"/>
      <base-form :ref="`${item}Form`" :config="config[item].form" :params="params" class="w900">
        <!-- CI -->
        <template #ci_autobuild>
          <el-select v-model="params.ci_autobuild" class="w230 mr5">
            <el-option v-for="item in ['0','1']" :key="item" :value="item">{{ item }}</el-option>
          </el-select>
          {{ $t('tagPlaceholder') }}
        </template>
        <template #ci_findtags_interval>
          <el-select v-model="params.ci_findtags_interval" class="w230 mr5">
            <el-option v-for="item in ['0','30', '60', '90','120', '180', '300']" :key="item" :value="item">{{ item }}</el-option>
          </el-select>
          {{ $t('findTagsIntervalSecondPlaceholder') }}
        </template>
        <template #ci_default_cpulimit>
          <el-input v-model="params.ci_default_cpulimit" class="w230 mr5"/>
          {{ $t('cpuSingleBuildPlaceholder') }}
        </template>
        <template #ci_default_memlimit>
          <el-input v-model="params.ci_default_memlimit" class="w230 mr5"/>
          {{ $t('memorySingleBuildPlaceholder') }}
        </template>
        <template #ci_available_mem>
          <el-input v-model="params.ci_available_mem" class="w230 mr5"/>
          {{ $t('allMemorySingleBuildPlaceholder') }}
        </template>   
        <template #ci_default_showcount>
          <el-input v-model="params.ci_default_showcount" class="w230 mr5"/>
          {{ $t('QASystemLinkag') }}
        </template>
        <!-- 同步 -->
        <template #sys_monitor_proxy_default_treeid>
          <el-input v-model="params.sys_monitor_proxy_default_treeid" class="w230 mr5"/>
          {{ $t('proxyServiceTreePlaceholder') }}
        </template>
        <!-- 工单 -->
        <template #sys_monitor_tt_type>
          <el-input v-model="params.sys_monitor_tt_type" class="w230 mr5"/>
          {{ $t('defaultTTSystemPlaceholder') }}
        </template>
        <!-- CMDB -->
        <template #sys_device_auth_strict>
          <el-select v-model="params.sys_device_auth_strict" class="w100 mr5">
            <el-option value="0" label="0"/>
            <el-option value="1" label="1"/>
          </el-select>
          {{ $t('roleStrictPlaceholder') }}
        </template>
      </base-form>
    </template>
    <!-- <saas-tabs v-model="config.ci.activeName" :tabs="config.ci.tabs"/>
    <base-form ref="ciForm" :config="config.ci.form" :params="params">
      <template #ci_autobuild>
        <el-select v-model="params.ci_autobuild" class="w230 mr5">
          <el-option v-for="item in ['0','1']" :key="item" :value="item">{{ item }}</el-option>
        </el-select>
        {{ $t('tagPlaceholder') }}
      </template>
      <template #ci_findtags_interval>
        <el-select v-model="params.ci_findtags_interval" class="w230 mr5">
          <el-option v-for="item in ['0','30', '60', '90','120', '180', '300']" :key="item" :value="item">{{ item }}</el-option>
        </el-select>
        {{ $t('findTagsIntervalSecondPlaceholder') }}
      </template>
      <template #ci_default_cpulimit>
        <el-input v-model="params.ci_default_cpulimit" class="w230 mr5"/>
        {{ $t('cpuSingleBuildPlaceholder') }}
      </template>
      <template #ci_default_memlimit>
        <el-input v-model="params.ci_default_memlimit" class="w230 mr5"/>
        {{ $t('memorySingleBuildPlaceholder') }}
      </template>
      <template #ci_available_mem>
        <el-input v-model="params.ci_available_mem" class="w230 mr5"/>
        {{ $t('allMemorySingleBuildPlaceholder') }}
      </template>
      <template #ci_default_showcount>
        <el-input v-model="params.ci_default_showcount" class="w230 mr5"/>
        {{ $t('QASystemLinkag') }}
      </template>
    </base-form>
    <saas-tabs v-model="config.sys.activeName" :tabs="config.sys.tabs"/>
    <base-form ref="sysForm" :config="config.sys.form" :params="params" class="w900"/>
    <saas-tabs v-model="config.qa.activeName" :tabs="config.qa.tabs"/>
    <base-form ref="qaForm" :config="config.qa.form" :params="params" class="w900"/>
    <saas-tabs v-model="config.cluster.activeName" :tabs="config.cluster.tabs"/>
    <base-form ref="clusterForm" :config="config.cluster.form" :params="params" class="w900"/>
    <saas-tabs v-model="config.sso.activeName" :tabs="config.sso.tabs"/>
    <base-form ref="ssoForm" :config="config.sso.form" :params="params" class="w900"/>
    <saas-tabs v-model="config.login.activeName" :tabs="config.login.tabs"/>
    <base-form ref="loginForm" :config="config.login.form" :params="params" class="w900"/>
    <saas-tabs v-model="config.cache.activeName" :tabs="config.cache.tabs"/>
    <base-form ref="cacheForm" :config="config.cache.form" :params="params" class="w900"/>
    <saas-tabs v-model="config.monitor.activeName" :tabs="config.monitor.tabs"/>
    <base-form ref="monitorForm" :config="config.monitor.form" :params="params" class="w900"/>
    <saas-tabs v-model="config.tt.activeName" :tabs="config.tt.tabs"/>
    <base-form ref="ttForm" :config="config.tt.form" :params="params" class="w900"/>
    <saas-tabs v-model="config.proxy.activeName" :tabs="config.proxy.tabs"/>
    <base-form ref="proxyForm" :config="config.proxy.form" :params="params">
      <template #sys_monitor_proxy_default_treeid>
        <el-input v-model="params.sys_monitor_proxy_default_treeid" class="w230 mr5"/>
        {{ $t('proxyServiceTreePlaceholder') }}
      </template>
    </base-form>
    <saas-tabs v-model="config.monTT.activeName" :tabs="config.monTT.tabs"/>
    <base-form ref="monTTForm" :config="config.monTT.form" :params="params">
      <template #sys_monitor_tt_type>
        <el-input v-model="params.sys_monitor_tt_type" class="w230 mr5"/>
        {{ $t('defaultTTSystemPlaceholder') }}
      </template>
    </base-form>
    <saas-tabs v-model="config.cmdb.activeName" :tabs="config.cmdb.tabs"/>
    <base-form ref="cmdbForm" :config="config.cmdb.form" :params="params" class="w900">
      <template #sys_device_auth_strict>
        <el-select v-model="params.sys_device_auth_strict" class="w100 mr5">
          <el-option value="0" label="0"/>
          <el-option value="1" label="1"/>
        </el-select>
        {{ $t('roleStrictPlaceholder') }}
      </template>
    </base-form>
    <saas-tabs v-model="config.keyCloak.activeName" :tabs="config.keyCloak.tabs"/>
    <base-form ref="keyCloakForm" :config="config.keyCloak.form" :params="params" class="w900"/> -->
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted, watch } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { SYSCTL_CONFIG } from '@/views/global/sysctl/config'
import { getSysctl, saveSysctl } from '@/api/global/sysctl'
import { ElMessageBox } from 'element-plus'

export default {
  components: { searchFrom, Table, baseForm },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      config: SYSCTL_CONFIG,
      ary: ['ci', 'sys', 'qa', 'cluster', 'sso', 'login', 'cache', 'monitor', 'tt', 'proxy', 'monTT', 'cmdb', 'keyCloak'],
      params: {
        ci_autobuild: '1', // 自动构建
        cidefaulttagger: '', // 默认tagger
        ci_findtags_concurrency: 0, // findtags 并发数
        ci_findtags_interval: 0, // findtags 间隔
        ci_default_cpulimit: '', // 单个构建默认CPU限制(核)
        ci_default_memlimit: '', // 单个构建默认内存限制
        ci_available_mem: '', // 可以分配给构建任务的所有内存
        ci_default_showcount: '', // 流水线默认显示版本数量
        sys_backup_name: '', // 名称
        sys_backup_url: '', // 上传地址url
        sys_backup_token: '', // 上传地址token
        external_qa_sys_callback_url: '', // 回调地址
        external_qa_sys_callback_match: '', // 返回结果匹配内容
        sys_cluster_domain: '', // 集群设置域名
        sys_cluster_slave: '', // 集群设置列表
        sys_sso_cookie: '',
        sys_login_type: '', // 登录验证方式
        sys_login_ldap_host: '', // 登录验证方式为ldap参数
        sys_login_ldap_port: '',
        sys_login_ldap_admin_user: '',
        sys_login_ldap_admin_pass: '',
        sys_login_ldap_dn: '',
        sys_login_ldap_role_admin: '',
        sys_login_ldap_role_ops: '',
        sys_login_ldap_role_dev: '',
        sys_login_ldap_mysqlon: '', // 登录验证方式为ldap参数
        sys_cache_nodeinfo_timeout: '', // 缓存超时
        sys_cache_point_timeout: '',
        sys_cache_treemap_timeout: '',
        sys_cache_userinfo_timeout: '',
        sys_cache_usertree_timeout: '', // 缓存超时
        sys_monitor_mode: 'off', // 监控模式
        sys_monitor_grep_tree: '', // treeFilter
        sys_monitor_grep_node: '', // hostIpFilter
        sys_monitor_uexip: '', // 使用公网IP监控的网段
        sys_monitor_prometheus_prometheus_replica: '', // prometheus副本数
        sys_monitor_prometheus_alertmanager_replica: '', // alertmanager副本数
        sys_monitor_thanos_thanos_web_addr: '', // thanos web地址
        sys_monitor_thanos_objstore_mode: '', // 对象存储类型
        sys_monitor_thanos_objstore_S3_bucket: '', // bucket
        sys_monitor_thanos_objstore_S3_access_key: '', // access_key
        sys_monitor_thanos_objstore_S3_secret_key: '', // secret_key
        sys_monitor_thanos_objstore_S3_endpoint: '', // endpoint
        sys_monitor_thanos_alertmanager_replica: '', // alertmanager 副本数
        sys_tt_external_api_endpoint: '', // 工单地址
        sys_tt_external_api_endpoint_env_appkey: '',
        sys_tt_external_api_endpoint_env_appname: '',
        sys_monitor_tt_caseurl: '', // 工单查看
        sys_monitor_proxy_default_treeid: '', // 代理服务树节点
        sys_monitor_tt_type: '', // 默认使用工单系统
        sys_device_sync_interval: '', // 同步间隔
        sys_device_sync_tree: '', // 导入服务树结构
        sys_device_sync_bind: '', // 导入服务树绑定关系
        sys_device_ingestion_node: '', // 主机摄取
        sys_device_auth_strict: '', // 权限
        cmdb_tags_ProductOwner: '', // 产品负责人
        cmdb_tags_OpsOwner: '', // 运维负责人
        cmdb_tags_Department: '', // 所属部门
        cmdb_tags_Name: '', // 资源名称
        sys_thirdparty_keycloak_on: '', // 开关
        sys_thirdparty_keycloak_url_open: '', // User Page URL
        sys_thirdparty_keycloak_url_admin: '' // Admin Page URL
      },
      paramsObj: {
        ci_autobuild: 'ci.autobuild', // 自动构建
        cidefaulttagger: 'cidefaulttagger', // 默认tagger
        ci_findtags_concurrency: 'ci.findtags.concurrency', // findtags 并发数
        ci_findtags_interval: 'ci.findtags.interval', // findtags 间隔
        ci_default_cpulimit: 'ci.default.cpulimit', // 单个构建默认CPU限制(核)
        ci_default_memlimit: 'ci.default.memlimit', // 单个构建默认内存限制
        ci_available_mem: 'ci.available.mem', // 可以分配给构建任务的所有内存
        ci_default_showcount: 'ci.default.showcount', // 流水线默认显示版本数量
        sys_backup_name: 'sys.backup.name', // 名称
        sys_backup_url: 'sys.backup.url', // 上传地址url
        sys_backup_token: 'sys.backup.token', // 上传地址token
        external_qa_sys_callback_url: 'external.qa.sys.callback.url', // 回调地址
        external_qa_sys_callback_match: 'external.qa.sys.callback.match', // 返回结果匹配内容
        sys_cluster_domain: 'sys.cluster.domain', // 集群设置域名
        sys_cluster_slave: 'sys.cluster.slave', // 集群设置列表
        sys_sso_cookie: 'sys.sso.cookie',
        sys_login_type: 'sys.login.type', // 登录验证方式
        sys_login_ldap_host: 'sys.login.ldap.host', // 登录验证方式为ldap参数
        sys_login_ldap_port: 'sys.login.ldap.port',
        sys_login_ldap_admin_user: 'sys.login.ldap.admin.user',
        sys_login_ldap_admin_pass: 'sys.login.ldap.admin.pass',
        sys_login_ldap_dn: 'sys.login.ldap.dn',
        sys_login_ldap_role_admin: 'sys.login.ldap.role.admin',
        sys_login_ldap_role_ops: 'sys.login.ldap.role.ops',
        sys_login_ldap_role_dev: 'sys.login.ldap.role.dev',
        sys_login_ldap_mysqlon: 'sys.login.ldap.mysqlon', // 登录验证方式为ldap参数
        sys_cache_nodeinfo_timeout: 'sys.cache.nodeinfo.timeout', // 缓存超时
        sys_cache_treemap_timeout: 'sys.cache.treemap.timeout',
        sys_cache_userinfo_timeout: 'sys.cache.userinfo.timeout',
        sys_cache_usertree_timeout: 'sys.cache.usertree.timeout', 
        sys_cache_point_timeout: 'sys.cache.point.timeout', // 缓存超时
        sys_monitor_mode: 'sys.monitor.mode', // 监控模式
        sys_monitor_grep_tree: 'sys.monitor.grep.tree', // treeFilter
        sys_monitor_grep_node: 'sys.monitor.grep.node', // hostIpFilter
        sys_monitor_uexip: 'sys.monitor.uexip', // 使用公网IP监控的网段
        sys_monitor_prometheus_prometheus_replica: 'sys.monitor.prometheus.prometheus.replica', // prometheus副本数
        sys_monitor_prometheus_alertmanager_replica: 'sys.monitor.prometheus.alertmanager.replica', // alertmanager副本数
        sys_monitor_thanos_thanos_web_addr: 'sys.monitor.thanos.thanos.web.addr', // thanos web地址
        sys_monitor_thanos_objstore_mode: 'sys.monitor.thanos.objstore.mode', // 对象存储类型
        sys_monitor_thanos_objstore_S3_bucket: 'sys.monitor.thanos.objstore.S3.bucket', // bucket
        sys_monitor_thanos_objstore_S3_access_key: 'sys.monitor.thanos.objstore.S3.access_key', // access_key
        sys_monitor_thanos_objstore_S3_secret_key: 'sys.monitor.thanos.objstore.S3.secret_key', // secret_key
        sys_monitor_thanos_objstore_S3_endpoint: 'sys.monitor.thanos.objstore.S3.endpoint', // endpoint
        sys_monitor_thanos_alertmanager_replica: 'sys.monitor.thanos.alertmanager.replica', // alertmanager 副本数
        sys_tt_external_api_endpoint: 'sys.tt.external_api_endpoint', // 工单地址
        sys_tt_external_api_endpoint_env_appkey: 'sys.tt.external_api_endpoint.env.appkey',
        sys_tt_external_api_endpoint_env_appname: 'sys.tt.external_api_endpoint.env.appname',
        sys_monitor_tt_caseurl: 'sys.monitor.tt.caseurl', // 工单查看
        sys_monitor_proxy_default_treeid: 'sys.monitor.proxy.default.treeid', // 代理服务树节点
        sys_monitor_tt_type: 'sys.monitor.tt.type', // 默认使用工单系统
        sys_device_sync_interval: 'sys.device.sync.interval', // 同步间隔
        sys_device_sync_tree: 'sys.device.sync.tree', // 导入服务树结构
        sys_device_sync_bind: 'sys.device.sync.bind', // 导入服务树绑定关系
        sys_device_ingestion_node: 'sys.device.ingestion.node', // 主机摄取
        sys_device_auth_strict: 'sys.device.auth.strict', // 权限
        cmdb_tags_ProductOwner: 'cmdb.tags.ProductOwner', // 产品负责人
        cmdb_tags_OpsOwner: 'cmdb.tags.OpsOwner', // 运维负责人
        cmdb_tags_Department: 'cmdb.tags.Department', // 所属部门
        cmdb_tags_Name: 'cmdb.tags.Name', // 资源名称
        sys_thirdparty_keycloak_on: 'sys.thirdparty.keycloak.on', // 开关
        sys_thirdparty_keycloak_url_open: 'sys.thirdparty.keycloak.url.open', // User Page URL
        sys_thirdparty_keycloak_url_admin: 'sys.thirdparty.keycloak.url.admin' // Admin Page URL
      },
      data: {},
      loading: false
    })
    const getData = () => {
      state.loading = true
      getSysctl().then((res: any) => {
        for(const key of Object.keys(state.paramsObj)) {
          const val = res[state.paramsObj[key]]
          state.params[key] = typeof val === 'undefined' ? '' : val
        }
        state.data = res
        state.loading = false
      })
    }
    // 保存
    const save = () => {
      const res = Object.values(proxy.$refs).map(item => {
        return (item[0] as any).validFun()
      })
      Promise.all(res).then(all => {
        if (all.findIndex(item => item !== true) === -1) {
          ElMessageBox.confirm(proxy.$t('saveSystemParameter'), '', {
            confirmButtonText: proxy.$t('confirm'),
            cancelButtonText: proxy.$t('cancel'),
            type: 'warning'
          }).then(() => {
            state.loading = true
            for(const key of Object.keys(state.params)) {
              state.data[state.paramsObj[key]] = state.params[key]
            }
            saveSysctl({
              config: state.data
            }).then(res => {
              proxy.$notification('operationSuccess')
              getData()
              state.loading = false
            })
          })
        }
      })
    }
    // 监控模式更改
    watch(() => [state.params.sys_monitor_mode, state.params.sys_monitor_thanos_objstore_mode], ([newModel, newStore]) => {
      state.config.monitor.form.config[1].hidden = newModel === 'off'
      state.config.monitor.form.config[2].hidden = newModel === 'off'
      state.config.monitor.form.config[3].hidden = newModel === 'off'
      state.config.monitor.form.config[4].hidden = !(newModel === 'prometheus')
      state.config.monitor.form.config[5].hidden = !(newModel === 'prometheus')
      state.config.monitor.form.config[6].hidden = !(newModel === 'thanos')
      state.config.monitor.form.config[7].hidden = !(newModel === 'thanos')
      state.config.monitor.form.config[8].hidden = !(newModel === 'thanos' && newStore === 'S3')
      state.config.monitor.form.config[9].hidden = !(newModel === 'thanos' && newStore === 'S3')
      state.config.monitor.form.config[10].hidden = !(newModel === 'thanos' && newStore === 'S3')
      state.config.monitor.form.config[11].hidden = !(newModel === 'thanos' && newStore === 'S3')
      state.config.monitor.form.config[12].hidden = !(newModel === 'thanos')
    }, {
      immediate: true,
      deep: true
    })
    // 登录验证方式
    watch(() => state.params.sys_login_type, val => {
      state.config.login.form.config.forEach((item, index) => {
        if (index > 0) {
          item.hidden = !(val === 'ldap')
        }
      })
    }, {
      immediate: true,
      deep: true
    })
    onMounted(() => {
      getData()
    })
    return {
      ...toRefs(state),
      getData,
      save
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
