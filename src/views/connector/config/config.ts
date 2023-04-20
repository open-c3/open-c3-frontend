import { t } from '@/utils/language'
// 聚云立方对接
export const JY_CONFIG = Object.freeze({
  title: 'JYDocking',
  form: {
    position: 'right',
    labelWidth: 120,
    config: [
      {
        label: 'AppName',
        prop: 'juyunappname',
        type: 'text',
        class: 'w300',
        span: 10
      },
      {
        label: 'AppKey',
        prop: 'juyunappkey',
        type: 'text',
        class: 'w300',
        span: 10
      },
      {
        label: '',
        prop: 'btn',
        type: 'slot',
        class: 'w300',
        span: 4
      }
    ]
  }
})

// 连接器配置管理-历史连接器
export const HISTORY_CONFIG = {
  title: 'historyConnector',
  form: {
    position: 'right',
    labelWidth: 120,
    config: [
      {
        label: 'connectorSwitchingSaving',
        prop: 'name',
        type: 'select',
        class: 'w300',
        data: []
      }
    ]
  }
}

// 连接器配置管理-登录
export const LOGIN_CONFIG = Object.freeze({
  title: 'login',
  form: {
    position: 'right',
    labelWidth: 120,
    config: [
      {
        label: 'getUserInfo',
        prop: 'ssousername',
        type: 'text',
        class: 'w500',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'userLogout',
        prop: 'ssologoutapi',
        type: 'text',
        class: 'w500',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'callback',
        prop: 'ssocallback',
        type: 'text',
        class: 'w500',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'cookieName',
        prop: 'cookiekey',
        type: 'text',
        class: 'w500',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'changePassword',
        prop: 'ssochpasswd',
        type: 'text',
        class: 'w500',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }
    ]
  }
})

// 连接器配置管理-服务树
export const TREE_CONFIG = Object.freeze({
  title: 'tree',
  form: {
    position: 'right',
    labelWidth: 120,
    config: [
      {
        label: 'userTree',
        prop: 'usertree',
        type: 'text',
        class: 'w500',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'fullTree',
        prop: 'treemap',
        type: 'text',
        class: 'w500',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'appname',
        prop: 'treemapenv_appname',
        type: 'text',
        class: 'w200',
        span: 10,
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'appkey',
        prop: 'treemapenv_appkey',
        type: 'text',
        class: 'w200',
        span: 10,
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'treeResource',
        prop: 'nodeinfo',
        type: 'text',
        class: 'w500',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'appname',
        prop: 'nodeinfoenv_appname',
        type: 'text',
        class: 'w200',
        span: 10,
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'appkey',
        prop: 'nodeinfoenv_appkey',
        type: 'text',
        class: 'w200',
        span: 10,
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'permissionControl',
        prop: 'pmspoint',
        type: 'text',
        class: 'w500',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }
    ]
  }
})

// 连接器配置管理-消息出口
export const MESSAGE_CONFIG = Object.freeze({
  title: 'messageChannel',
  form: {
    position: 'right',
    labelWidth: 120,
    config: [
      {
        label: 'email',
        prop: 'usermail',
        type: 'text',
        class: 'w500',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'appname',
        prop: 'usermailenv_appname',
        type: 'text',
        class: 'w200',
        span: 10,
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'appkey',
        prop: 'usermailenv_appkey',
        type: 'text',
        class: 'w200',
        span: 10,
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'sms',
        prop: 'usermesg',
        type: 'text',
        class: 'w500',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'appname',
        prop: 'usermesgenv_appname',
        type: 'text',
        class: 'w200',
        span: 10,
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'appkey',
        prop: 'usermesgenv_appkey',
        type: 'text',
        class: 'w200',
        span: 10,
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'voice',
        prop: 'usercall',
        type: 'text',
        class: 'w500',
        // rules: [
        //   { required: true, trigger: 'blur', message: t('requiredText') }
        // ]
      },
      {
        label: 'appname',
        prop: 'usercallenv_appname',
        type: 'text',
        class: 'w200',
        span: 10,
        // rules: [
        //   { required: true, trigger: 'blur', message: t('requiredText') }
        // ]
      },
      {
        label: 'appkey',
        prop: 'usercallenv_appkey',
        type: 'text',
        class: 'w200',
        span: 10,
        // rules: [
        //   { required: true, trigger: 'blur', message: t('requiredText') }
        // ]
      }
    ]
  }
})

// 连接器配置管理-外部辅助审批
export const EXTERNAL_CONFIG = Object.freeze({
  title: 'externalAuxiliaryApproval',
  form: {
    position: 'right',
    labelWidth: 120,
    config: [
      {
        label: 'approvalInterface',
        prop: 'approver',
        type: 'text',
        class: 'w500',
        // rules: [
        //   { required: true, trigger: 'blur', message: t('requiredText') }
        // ]
      },
      {
        label: 'appname',
        prop: 'approverenv_appname',
        type: 'text',
        class: 'w200',
        span: 10,
        // rules: [
        //   { required: true, trigger: 'blur', message: t('requiredText') }
        // ]
      },
      {
        label: 'appkey',
        prop: 'approverenv_appkey',
        type: 'text',
        class: 'w200',
        span: 10,
        // rules: [
        //   { required: true, trigger: 'blur', message: t('requiredText') }
        // ]
      }
    ]
  }
})

// 连接器配置管理-工单扩展（用户详情）
export const TICKET_CONFIG = Object.freeze({
  title: 'troubleTicketingUserDetail',
  form: {
    position: 'right',
    labelWidth: 120,
    config: [
      {
        label: 'approvalInterface',
        prop: 'userinfo',
        type: 'text',
        class: 'w500',
        // rules: [
        //   { required: true, trigger: 'blur', message: t('requiredText') }
        // ]
      },
      {
        label: 'appname',
        prop: 'userinfoenv_appname',
        type: 'text',
        class: 'w200',
        span: 10,
        // rules: [
        //   { required: true, trigger: 'blur', message: t('requiredText') }
        // ]
      },
      {
        label: 'appkey',
        prop: 'userinfoenv_appkey',
        type: 'text',
        class: 'w200',
        span: 10,
        // rules: [
        //   { required: true, trigger: 'blur', message: t('requiredText') }
        // ]
      }
    ]
  }
})

// 连接器配置管理-连接器存活检测
export const CONNECTOR_CONFIG = Object.freeze({
  title: 'connectorSurvivalDetection',
  form: {
    position: 'right',
    labelWidth: 120,
    config: [
      {
        label: 'exploringAddress',
        prop: 'alive',
        type: 'text',
        class: 'w500',
        // rules: [
        //   { required: true, trigger: 'blur', message: t('requiredText') }
        // ]
      }
    ]
  }
})

// 连接器配置管理-前端风格
export const STYLE_CONFIG = Object.freeze({
  title: 'frontEndStyle',
  form: {
    position: 'right',
    labelWidth: 120,
    config: [
      {
        label: 'chooseFrontEndStyle',
        prop: 'frontendstyle',
        type: 'select',
        class: 'w500',
        data: [
          { id: 'openc3', label: 'openc3'},
          { id: 'juyun', label: 'juyun'}
        ]
      }
    ]
  }
})

// 连接器配置管理-连接器设置
export const SETTING_CONFIG = Object.freeze({
  title: 'connectorSettings',
  form: {
    position: 'right',
    labelWidth: 120,
    config: [
      {
        label: 'debugLog',
        prop: 'debug',
        type: 'select',
        class: 'w500',
        data: [
          { id: '0', label: 'off'},
          { id: '1', label: 'on'}
        ]
      },
      {
        label: 'interfaceCacheSeconds',
        prop: 'apicache',
        type: 'text',
        class: 'w500'
        // data: [
        //   { id: '0', label: 'off'},
        //   { id: '1', label: 'on'}
        // ],
        // rules: [
        //   { required: true, trigger: 'blur', message: t('requiredText') }
        // ]
      },
      {
        label: 'useJobSystemOnly',
        prop: 'openc3_job_system_only',
        type: 'select',
        class: 'w500',
        data: [
          { id: '0', label: 'off'},
          { id: '1', label: 'on'}
        ]
      },
      {
        label: 'useNative',
        prop: 'monagent9100',
        type: 'select',
        class: 'w500',
        data: [
          { id: '0', label: 'off'},
          { id: '1', label: 'on'}
        ]
      }
    ]
  }
})

// 连接器配置管理-报告
export const REPORT_CONFIG = Object.freeze({
  title: 'report',
  form: {
    position: 'right',
    labelWidth: 120,
    config: [
      {
        label: 'gitReportMerge',
        prop: 'gitreport2company',
        type: 'select',
        class: 'w500',
        data: [
          { id: '0', label: 'off'},
          { id: '1', label: 'on'}
        ]
      },
      {
        label: 'flowReportMerge',
        prop: 'flowreport2company',
        type: 'select',
        class: 'w500',
        data: [
          { id: '0', label: 'off'},
          { id: '1', label: 'on'}
        ]
      },
    ]
  }
})
