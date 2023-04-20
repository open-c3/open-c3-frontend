import request from '@/utils/request'
import { g_url } from '@/utils/index'
import { setTreeUnbindData, addCollectorData, configUserTestData } from '@/api/interface/monitor'
const c3siteaddr = g_url
/**
 * http://127.0.0.1/api/agent/monitor/config/treeunbind/:treeid
 * /api/agent/monitor/config/treeunbind/:treeid 服务树解绑/获取状态 get
 */
export function getTreeUnbind (treeId: number) {
  return request({
    url: `/api/agent/monitor/config/treeunbind/${treeId}`,
    method: 'get'
  })
}

/**
 * http://127.0.0.1/api/agent/monitor/config/treeunbind/:treeid
 * /api/agent/monitor/config/treeunbind/:treeid 服务树解绑/设置状态 post
 * status
 */
export function setTreeUnbind (treeId: number, data: setTreeUnbindData) {
  return request({
    url: `/api/agent/monitor/config/treeunbind/${treeId}`,
    method: 'post',
    data
  })
}

/**
 * /api/agent/nodeinfo/:treeid 获取节点主机资源 get
 */
export function getNodeInfo (treeId: number) {
  return request({
    url: `/api/agent/nodeinfo/${treeId}`,
    method: 'get'
  })
}


/**
 * /api/agent/monitor/alert/{treeId}?siteaddr={c3siteaddr} 变量影响到返回结果的generatorURL的内容 get
 * 返回字段说明：
    startsAt开始时间
    labels.alertname监控名称
    labels.instance监控对象
    status.active监控状态
    annotations.summary监控概要
    annotations.value当前值
    generatorURL查看图标的url
 */
  export function getCurrentWarning (treeId: number) {
    return request({
      url: `/api/agent/monitor/alert/${treeId}?siteaddr=${c3siteaddr}`,
      method: 'get'
    })
  }
    
/**
 * /api/agent/monitor/config/collector/${params.treeId} 获取当前服务树节点下的监控指标采集列表 get
 * 返回字段说明：
    id: 编号
    edit_user: 最后编辑人
    edit_time: 最后编辑时间
    type: 类型
    subtype: 子类型
    content1: 内容1
    content2: 内容2
    注： 页面上内容部分，如果content2为空，只显示content1，如果content2有内容显示 内容1【匹配： 内容2】
    注: 类型的中文名称对应关系： vm.alias = { 'port': '端口', 'process': '进程', 'http': 'HTTP', 'tcp': 'TCP','udp': 'UDP', 'path': '路径' }  类型和子类型如果在这个里面有对应的别名信息，显示别名。
  */
export function getCollector (treeId: number) {
  return request({
    url: `/api/agent/monitor/config/collector/${treeId}`,
    method: 'get'
  })
}
    
/**
 * /api/agent/monitor/config/collector/${data.treeId} 新建，编辑已存在的监控采集项，和新建的区别是post数据中有要编辑的采集项的id
 * 字段说明：
    id: 采集项id id有为修改,没有为添加
    type: 类型
    subtype: 子类型
    content1: 内容1
    content2: 内容2
  */
export function addCollector (treeId: number, data: addCollectorData) {
  return request({
    url: `/api/agent/monitor/config/collector/${treeId}`,
    method: 'post',
    data
  })
}
    
/**
 * /api/agent/monitor/config/collector/{data.treeId}/${data.id} 删除监控指标采集项：delete
 */
export function deleteCollector (treeId: number, id: number) {
  return request({
    url: `/api/agent/monitor/config/collector/${treeId}/${id}`,
    method: 'delete'
  })
}
    
/**
 * /api/agent/monitor/config/rule/{treeId} 获取服务树节点下监控策略列表 get
 * 字段信息：
     id编号
      alert名称
      expr表达式
      severity告警级别
      summary概要
      edit_user编辑者
      edit_time编辑时间
  */
export function getRule (treeId: number) {
  return request({
    url: `/api/agent/monitor/config/rule/${treeId}`,
    method: 'get'
  })
}
/**
 * /api/agent/monitor/config/rule/{treeId} 添加或者编辑策略 post
 * 用途：添加策略
      模式： model  其值包含两种情况：simple、custom
          model为simple的情况：
                    指标名： metrics
                    比较：    method
                    阈值：    threshold
          model为custom的情况：
                    表达式：expr
      告警级别： severity 级别分别为：level1、level2、level3、level4
      持续时间： for
      概要：        summary
      描述：        description
      值：            value
  用途： 编辑策略
    与添加策略类似，post数据中多一个 id的字段，内容为要编辑的策略的id
  */
export function addRule (data) {
  return request({
    url: `/api/agent/monitor/config/rule/${data.treeId}`,
    method: 'post',
    data
  })
}
    
/**
 * /api/agent/monitor/config/rule/{treeId}/{id} 删除一个监控策略：delete
 */
export function deleteRule (treeId: number, id: number) {
  return request({
    url: `/api/agent/monitor/config/rule/${treeId}/${id}`,
    method: 'delete'
  })
}

/**
 * /api/agent/monitor/config/ruletpl/{treeId} 获取监控策略模版列表：get
 */ 
export function getRuleTpl (treeId: number) {
  return request({
    url: `/api/agent/monitor/config/ruletpl/${treeId}`,
    method: 'get'
  })
}

/**
 * /api/agent/monitor/config/ruletpl/save/{treeId}/{name} 保存为模版：post
 */ 
export function saveRuleTpl (treeId: number, name: string) {
  return request({
    url: `/api/agent/monitor/config/ruletpl/save/${treeId}/${name}`,
    method: 'post'
  })
}

/**
 * /api/agent/monitor/config/ruletpl/sync/{treeId}/{name} 通过模版添加监控策略：post
 */ 
export function syncRuleTpl (treeId: number, name: string) {
  return request({
    url: `/api/agent/monitor/config/ruletpl/sync/${treeId}/${name}`,
    method: 'post'
  })
}

/**
 * /api/agent/monitor/config/rule/{treeId} 清空节点策略：post
 */ 
export function clearNodeRule (treeId: number) {
  return request({
    url: `/api/agent/monitor/config/rule/${treeId}`,
    method: 'delete'
  })
}

/**
 * /api/agent/monitor/config/rule/copy/{fromId}/{treeId} 复制节点策略：post
 */ 
export function copyNodeRule (data) {
  return request({
    url: `/api/agent/monitor/config/rule/copy/${data.fromId}/${data.treeId}`,
    method: 'post',
    data
  })
}
    
/**
 * /api/agent/monitor/config/user/{treeId} 获取服务树节点下告警通知列表 get
 * 字段：
    user: 账户名
    edit_user: 创建人
    edit_time: 创建时间
  */
export function getConfigUser (treeId: number) {
  return request({
    url: `/api/agent/monitor/config/user/${treeId}`,
    method: 'get'
  })
}
    
/**
 * /api/agent/monitor/config/user/{treeId} 添加告警接收人 post
 添加用户：
    post数据 { user: "username123" }
  添加告警组：
      post数据 { user: "@username123" }
  添加轮班组：
      post数据 { user: "%username123" }
  添加部门:
      post 数据： { user: ":username123" }
  其中username123为添加的名称，前面的特色标志区分不同的类型。
  */
export function addConfigUser (data) {
  return request({
    url: `/api/agent/monitor/config/user/${data.treeId}`,
    method: 'post',
    data
  })
}
    
/**
 * /api/agent/monitor/config/user/{treeId}/{id} 删除告警接收人delete
 */
export function deleteConfigUser (treeId: number, id: number) {
  return request({
    url: `/api/agent/monitor/config/user/${treeId}/${id}`,
    method: 'delete'
  })
}
    
/**
 * /api/agent/monitor/config/usertest 指定用户测试消息通道 post
 */
export function configUserTest (data: configUserTestData) {
  return request({
    url: '/api/agent/monitor/config/usertest',
    method: 'post',
    data
  })
}
    