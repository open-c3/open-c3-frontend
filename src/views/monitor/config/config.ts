import { t } from '@/utils/language'
export const TABS_CONFIG = [
  {
    label: 'treeInheritanceCancellation',
    name: 'tree'
  },
  {
    label: 'hostResource',
    name: 'hostResource'
  },
  {
    label: 'currentAlarm',
    name: 'currentAlarm'
  },
  {
    label: 'collectionMonIndicators',
    name: 'collectionMonIndicators'
  },
  {
    label: 'monStrategy',
    name: 'monStrategy'
  },
  {
    label: 'notifyList',
    name: 'notifyList'
  }
]
export const hostResourceSearch = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'type',
      type: 'text',
      placeholder: 'type'
    },
    {
      label: '',
      prop: 'inip',
      type: 'text',
      placeholder: 'privateIP'
    },
    {
      label: '',
      prop: 'exip',
      type: 'text',
      placeholder: 'internetIP'
    }
  ],
  formBtnConfig: [
    {
      name: 'reset',
      emitName: 'reset'
    },
    {
      name: 'query',
      emitName: 'query',
      type: 'primary'
    }
  ]
})
// 节点主机资源
export const hostResourceThead = Object.freeze([
  { prop: 'name', label: 'hostname', align: 'center' },
  { prop: 'type', label: 'type', align: 'center' },
  { prop: 'inip', label: 'privateIP', align: 'center' },
  { prop: 'exip', label: 'internetIP', align: 'center' },
  { prop: 'clientVersion', label: 'clientVersion', align: 'center', type: 'slot' },
  { prop: 'clientLastDetectionTime', label: 'clientLastDetectionTime', align: 'center', type: 'slot' },
  { prop: 'clientErrorReason', label: 'clientErrorReason', align: 'center', type: 'slot' }
])
// 当前告警
export const currentWarningThead = Object.freeze([
  { prop: 'startsAt', label: 'startAt', align: 'center' },
  { prop: 'alertname', label: 'name', align: 'center' },
  { prop: 'instance', label: 'monitorObject', align: 'center' },
  { prop: 'state', label: 'status', align: 'center' },
  { prop: 'summary', label: 'summary', align: 'center' },
  { prop: 'value', label: 'value', align: 'center' },
  { prop: 'operate', type: 'slot', label: 'operate', align: 'center', width: 120 }
])
// 监控指标
export const monitorIndicatorsThead = Object.freeze([
  { prop: 'id', label: 'id', align: 'center' },
  { prop: 'type', label: 'type', align: 'center' },
  { prop: 'subtype', label: 'classify', align: 'center' },
  { prop: 'content1', label: 'content', align: 'center', type: 'slot' },
  { prop: 'edit_user', label: 'editor', align: 'center' },
  { prop: 'edit_time', label: 'editTime', align: 'center' },
  { prop: 'operate', type: 'slot', label: 'operate', align: 'center', width: 120 }
])
// 监控策略
export const monitorStrategyThead = Object.freeze([
  { prop: 'id', label: 'id', align: 'center' },
  { prop: 'alert', label: 'name' },
  { prop: 'subgroup', label: 'subgroup' },
  { prop: 'expr', label: 'expression', type: 'slot' },
  { prop: 'severity', label: 'alarmLevel', align: 'center'},
  { prop: 'summary', label: 'summary' },
  { prop: 'edit_user', label: 'editor', align: 'center' },
  { prop: 'edit_time', label: 'editTime', align: 'center' },
  { prop: 'operate', type: 'slot', label: 'operate', align: 'center', width: 120 }
])
// 通知列表
export const noticeThead = Object.freeze([
  { prop: 'user', label: 'accName', align: 'center' },
  { prop: 'subgroup', label: 'subgroup', align: 'center' },
  { prop: 'edit_user', label: 'creator', align: 'center' },
  { prop: 'edit_time', label: 'creatorTime', align: 'center' },
  { prop: 'operate', type: 'slot', label: 'operate', align: 'center', width: 180 }
])


// 增加/编辑监控指标采集
export const ADD_INDICATORS_CONFIG = {
  width: '700px',
  title: 'addCollectionMonIndicators',
  noFooter: false,
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 100,
    config: [
      {
        label: 'type',
        prop: 'type',
        type: 'radio',
        placeholder: 'type',
        span: 24,
        class: 'w450',
        data: [
          { id: 'port', name: t('port') },
          { id: 'process', name: t('process') },
          { id: 'http', name: 'HTTP' },
          { id: 'path', name: t('path') },
          { id: 'nodeext', name: t('nodeExt')},
          { id: 'push', name: 'PUSH' }
        ],
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }, { // 类型为端口
        label: 'protocol',
        prop: 'subtype',
        type: 'radio',
        placeholder: 'protocol',
        span: 24,
        class: 'w450',
        data: [
          { id: 'tcp', name: 'TCP' },
          { id: 'udp', name: 'UDP' }
        ],
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }, { // 类型为进程
        label: 'way',
        prop: 'subtype',
        type: 'radio',
        placeholder: 'way',
        span: 24,
        class: 'w450',
        data: [
          { id: 'name', name: t('processNameType') },
          { id: 'cmdline', name: t('startCommandLineType') }
        ],
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }, { // 类型为HTTP
        label: 'protocol',
        prop: 'subtype',
        type: 'radio',
        placeholder: 'protocol',
        span: 24,
        class: 'w450',
        data: [
          { id: 'GET', name: 'GET' },
          { id: 'POST', name: 'POST' },
          { id: 'HEAD', name: 'HEAD' }
        ],
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }, { // 类型为路径
        label: 'pathType',
        prop: 'subtype',
        type: 'radio',
        placeholder: 'pathType',
        span: 24,
        class: 'w450',
        data: [
          { id: 'file', name: t('directory') },
          { id: 'dir', name: t('file') },
          { id: 'link', name: t('softLink') }
        ],
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }, {
        label: 'port',
        prop: 'content1',
        type: 'text',
        placeholder: 'portPlaceholder',
        span: 24,
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }, {
        label: 'match',
        prop: 'content2',
        type: 'text',
        placeholder: 'match',
        span: 24,
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }, {
        label: 'help',
        prop: 'help',
        type: 'slot',
        placeholder: 'help',
        span: 24,
        class: 'w450'
      }
    ]
  }
}

// 增加/编辑监控策略
export const ADD_STRATEGY_CONFIG = {
  width: '700px',
  title: 'addMonStrategy',
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 100,
    config: [
      {
        label: 'monName',
        prop: 'alert',
        type: 'text',
        placeholder: 'monName',
        span: 24,
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }, {
        label: 'mode',
        prop: 'model',
        type: 'radio',
        span: 24,
        class: 'w450',
        data: [
          { id: 'simple', name: t('simple') },
          { id: 'bindtree', name: t('bindingTree') },
          { id: 'bindetree', name: t('bindingTreeTerminationInheritance')},
          { id: 'custom', name: t('custom') }
        ],
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }, {
        label: 'condition',
        prop: 'condition',
        type: 'slot',
        placeholder: 'condition',
        span: 24,
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }, {
        label: 'expression', // 绑定服务树 绑定服务树 继承关系解除
        prop: 'bindtreesql',
        type: 'text',
        placeholder: 'sum(up) by(instance) == 0',
        span: 24,
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }, { // 自定义
        label: 'expression',
        prop: 'expr',
        type: 'text',
        placeholder: ' up{job="openc3"} == 0',
        span: 24,
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }, {
        label: 'alarmLevel',
        prop: 'severity',
        type: 'radio',
        span: 24,
        class: 'w450',
        data: [
          { id: 'level1', name: t('alarmLevel1') },
          { id: 'level2', name: t('alarmLevel2') },
          { id: 'level3', name: t('alarmLevel3') },
          { id: 'level4', name: t('alarmLevel4') }
        ],
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }, {
        label: 'timeDuration',
        prop: 'for',
        type: 'text',
        placeholder: 'timeDurationPlaceholder',
        span: 24,
        class: 'w450'
      }, {
        label: 'summary',
        prop: 'summary',
        type: 'text',
        placeholder: '例如：load1 :{{$labels.alertname}}',
        span: 24,
        class: 'w450'
      }, {
        label: 'describe',
        prop: 'description',
        type: 'text',
        placeholder: '业务500报警: {{ $value }}',
        span: 24,
        class: 'w450'
      }, {
        label: 'value',
        prop: 'value',
        type: 'text',
        placeholder: '告警显示的值：例如 {{ $value }}',
        span: 24,
        class: 'w450'
      }, {
        label: 'subgroup',
        prop: 'subgroup',
        type: 'text',
        span: 24,
        class: 'w450'
      }
    ]
  }
}
export const ADD_TMP_CONFIG = {
  width: '700px',
  title: 'addMonStrategyByTemp',
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 100,
    config: [
      {
        label: 'name',
        prop: 'name',
        type: 'select',
        span: 24,
        class: 'w450',
        data: [],
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }
    ]
  }
}
// 保存为模版
export const SYNC_TMP_CONFIG = {
  width: '700px',
  title: 'saveAsTemp',
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 100,
    config: [
      {
        label: 'name',
        prop: 'name',
        type: 'text',
        span: 24,
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }
    ]
  }
}

export const helpObj = Object.freeze({
  port: `用途：监控端口死活, 监控端口是否对外开放。
  指标：
  
  node_port: 端口状态，有如下三种状态：
  
     0: 端口没在监听状态
     1: 有端口活动，可能监听的是127.0.0.1
     2: 端口监听在0.0.0.0上，对外开放
  
  例子：
  
  udp:
  node_port{port="53",protocol="udp"} 0
  
  tcp:
  node_port{port="22",protocol="tcp"} 2
  node_port{port="80",protocol="tcp"} 1
  node_port{port="8080",protocol="tcp"} 0
  
  说明：
  
  可以用ss -t -l -n查看tcp端口，ss -u -l -n 为udp。
  采集过程中把如 *:80 、:::8080 的状态设置为2。`,
  process: `用途：进程死活监控，进程重启监控。
  指标：
  
  node_process_count: 匹配到的进程的数量
  node_process_etime: 进程已经运行的时间，单位秒。
  
  例子：
  name[进程名]监控方式：
  node_process_count{name="c3_api"} 2
  node_process_etime{name="c3_api",pid="17706"} 52210
  node_process_etime{name="c3_api",pid="17705"} 52210
  
  cmdline[启动命令行]监控方式:
  node_process_count{cmdline="openc3.node_query.65110"} 1
  node_process_etime{cmdline="openc3.node_query.65110",pid="24137"} 2294903
  
  不同方式区别：
  name为进程名，可以通过 ps -p $pid -o comm查看。
  cmdline为启动命令行，可以通过ps -p $pid -o cmd查看。
  
  支持的字符：a-zA-Z0-9 .-_@`,
  http: `用途：监控HTTP服务。
  指标：
  
  node_http_code: http返回码
  node_http_time: 请求耗时，单位为毫秒
  node_http_content_check: 返回的内容和配置的是否匹配
  
  
  例子：
  
  node_http_code{method="GET",url="http://127.0.0.1"} 200
  node_http_code{method="GET",url="https://www.baidu.com"} 200
  
  node_http_time{method="GET",url="http://127.0.0.1"} 2
  node_http_time{method="GET",url="https://www.baidu.com"} 52
  
  node_http_content_check{check="baidu",method="GET",url="https://www.baidu.com"} 1`,
  path: `用途：判断文件或者目录是否存在。判断软链接是否存在，判断软链接的内容是否匹配。
  指标：
  
  node_path: 路径是否存在
  node_path_check: 是否匹配
  
  
  例子：
  
  node_path{type="file",path="/tmp/foo.txt"} 1
  node_path{type="link",path="/tmp/bar.txt"} 0
  node_path{type="dir",path="/tmp/bar.txt"} 0
  
  node_path_check{check="v2.2.3",type="link",path="/tmp/bar.txt"} 1`,
  push: `用途：收集用户自己上报的指标。

  用法：
  
  监控的AGENT安装后，会在本地监听65110端口。
  把要上报的数据上报到本地该端口，系统会定时收集。
  
  上报方式如下：
  
  curl -X POST -d "[{"metric": "test-metric", "endpoint": "test-endpoint","value": 1,"tags": "idc=lg,project=xx"}]" http://127.0.0.1:65110/v1/push
  
  
  上报后的数据如下：
  test-metric{endpoint="test-endpoint",idc="lg",project="xx",source="apipush"} 1
  
  endpoint被当作一个普通的标签。
  source标签是系统默认添加的，用于区分是通过api push而来的数据。
  tags中的标签会变成一个或者多个标签。
  
  字段:
  metric和value是必要的，endpoint和tags非必要。
  
  兼容falcon:
  ts= date +%s;
  curl -X POST -d "[{"metric": "test-metric", "endpoint": "test-endpoint", "timestamp": $ts,"step": 60,"value": 1,"counterType": "GAUGE","tags": "idc=lg,project=xx"}]" http://127.0.0.1:65110/v1/push
  
  注：push 方式60秒为周期，如果60秒内没有上报新的数据，本地AGENT会把该指标删除。`,
  link: `用途：判断文件或者目录是否存在。判断软链接是否存在，判断软链接的内容是否匹配。
  指标：
  
  node_path: 路径是否存在
  node_path_check: 是否匹配
  
  
  例子：
  
  node_path{type="file",path="/tmp/foo.txt"} 1
  node_path{type="link",path="/tmp/bar.txt"} 0
  node_path{type="dir",path="/tmp/bar.txt"} 0
  
  node_path_check{check="v2.2.3",type="link",path="/tmp/bar.txt"} 1`,
  nodeext: `用途：采集主机上其他服务的metrics

  例如：
  :9100/metrics`
})
