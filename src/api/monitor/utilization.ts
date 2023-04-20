import request from '@/utils/request'
// 主机利用率低

/**
 * /api/agent/nodelow/{treeid} 获取资源利用率低的信息  get
 * 返回：
    id: 编号
    name: 主机名
    inip: 内网ip
    exip: 外网ip
    type: 资源类型
    status: 状态
    lowcnt: 低利用率天数,
    cpu: CPU
    mem: 内存,
    netin: 下载带宽
    netout: 上传带宽,
    date: 最后统计日期,

    注1：页面上的状态的数字是可以点击的。点击点击后显示本类型的列表
    注2:网络流量的单位需要换算。
 */
export function getNodeLow (treeId: number) {
  return request({
    url: `/api/agent/nodelow/${treeId}`,
    method: 'get'
  })
}

/**
 * /api/agent/nodelow/detail/{treeid}/{ip} 获取单个主机近期的数据：get
 */
export function getNodeLowById (treeId: number,ip: string) {
  return request({
    url: `/api/agent/nodelow/detail/${treeId}/${ip}`,
    method: 'get'
  })
}
