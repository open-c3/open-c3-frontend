// 添加通信地址
export interface addUserAddrData {
  user: string;
  email: string;
  phone: string;
  voicemail?: string;
}

// 驳回
export interface updateAllACKData {
  uuid: string; 
  type: string; 
  mt: string;
}

// 获取审计日志
export interface getAuditLogParams {
  time?: string;
  user?: string;
  title?: string;
  content?: string;
}

// 添加云监控
export interface addCloudMonData {
  id?: string | number,
  name: string;
  type: string;
  describe: string;
  config: string;
}

// 添加用户部门关系绑定
export interface addUserDepartmentData {
  user: string;
  department: string;
}

// 添加私有节点
export interface addConnectorPrivateData {
  user: string;
}

// 删除cmdb
export interface deleteCMDBManageData {
  name: string;
}

// 编辑CMDB
export interface editCMDBManageData {
  name: string;
  config?: string;
}

// 审批
export interface updateApprovalData {
  id: string | number;
  opinion: string;
}

// 
export interface saveSysctlData {
  config ?: {
    'ci.autobuild'?: string | number;
    'cidefaulttagger'?: string | number;
    'ci.findtags.concurrency'?: string | number;
    'ci.findtags.interval'?: string | number;
    'ci.default.cpulimit'?: string | number;
    'ci.default.memlimit'?: string | number;
    'ci.available.mem'?: string | number;
    'ci.default.showcount'?: string | number;
    'sys.backup.name'?: string | number;
    'sys.backup.url'?: string | number;
    'sys.backup.token'?: string | number;
    'external.qa.sys.callback.url'?: string | number;
    'external.qa.sys.callback.match'?: string | number;
    'sys.cluster.domain'?: string | number;
    'sys.cluster.slave'?: string | number;
    'sys.sso.cookie'?: string | number;
    'sys.login.type'?: string | number;
    'sys.login.ldap.host'?: string | number;
    'sys.login.ldap.port'?: string | number;
    'sys.login.ldap.admin.user'?: string | number;
    'sys.login.ldap.admin.pass'?: string | number;
    'sys.login.ldap.dn'?: string | number;
    'sys.login.ldap.role.admin'?: string | number;
    'sys.login.ldap.role.ops'?: string | number;
    'sys.login.ldap.role.dev'?: string | number;
    'sys.login.ldap.mysqlon'?: string | number;
    'sys.cache.nodeinfo.timeout'?: string | number;
    'sys.cache.treemap.timeout'?: string | number;
    'sys.cache.userinfo.timeout'?: string | number;
    'sys.cache.usertree.timeout'?: string | number;
    'sys.cache.point.timeout'?: string | number;
    'sys.monitor.mode'?: string | number;
    'sys.monitor.grep.tree'?: string | number;
    'sys.monitor.grep.node'?: string | number;
    'sys.monitor.uexip'?: string | number;
    'sys.monitor.prometheus.prometheus.replica'?: string | number;
    'sys.monitor.prometheus.alertmanager.replica'?: string | number;
    'sys.monitor.thanos.thanos.web.addr'?: string | number;
    'sys.monitor.thanos.objstore.mode'?: string | number;
    'sys.monitor.thanos.objstore.S3.bucket'?: string | number;
    'sys.monitor.thanos.objstore.S3.access_key'?: string | number;
    'sys.monitor.thanos.objstore.S3.secret_key'?: string | number;
    'sys.monitor.thanos.objstore.S3.endpoint'?: string | number;
    'sys.monitor.thanos.alertmanager.replica'?: string | number;
    'sys.tt.external_api_endpoint'?: string | number;
    'sys.tt.external_api_endpoint.env.appkey'?: string | number;
    'sys.tt.external_api_endpoint.env.appname'?: string | number;
    'sys.monitor.tt.caseurl'?: string | number;
    'sys.monitor.proxy.default.treeid'?: string | number;
    'sys.monitor.tt.type'?: string | number;
    'sys.device.sync.interval'?: string | number;
    'sys.device.sync.tree'?: string | number;
    'sys.device.sync.bind'?: string | number;
    'sys.device.ingestion.node'?: string | number;
    'sys.device.auth.strict'?: string | number;
    'cmdb.tags.ProductOwner'?: string | number;
    'cmdb.tags.OpsOwner'?: string | number;
    'cmdb.tags.Department'?: string | number;
    'cmdb.tags.Name'?: string | number;
    'sys.thirdparty.keycloak.on'?: string | number;
    'sys.thirdparty.keycloak.url.open'?: string | number;
    'sys.thirdparty.keycloak.url.admin'?: string | number;
  }
}