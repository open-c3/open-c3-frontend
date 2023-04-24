export const TEMPLATE_CONFIG = Object.freeze({
  jobTaskNotifyTemplate: {
    email: {
      position: 'right',
      gutter: 20,
      labelWidth: 180,
      config: [
        {
          label: 'emailTitle',
          prop: 'notifyTemplateEmailTitle',
          type: 'text',
          class: 'w600'
        },
        {
          label: 'emailContent',
          prop: 'notifyTemplateEmailContent',
          type: 'textarea',
          class: 'w600'
        },
      ]
    },
    sms: {
      position: 'right',
      gutter: 20,
      labelWidth: 180,
      config: [
        {
          label: 'smsContent',
          prop: 'notifyTemplateSmsContent',
          type: 'textarea',
          class: 'w600'
        },
      ]
    }
  },
  CIBuildNotifyTemplate: {
    email: {
      position: 'right',
      gutter: 20,
      labelWidth: 180,
      config: [
        {
          label: 'emailTitle',
          prop: 'ciTemplateEmailTitle',
          type: 'text',
          class: 'w600'
        },
        {
          label: 'emailContent',
          prop: 'ciTemplateEmailContent',
          type: 'textarea',
          class: 'w600'
        },
      ]
    },
    sms: {
      position: 'right',
      gutter: 20,
      labelWidth: 180,
      config: [
        {
          label: 'smsContent',
          prop: 'ciTemplateSmsContent',
          type: 'textarea',
          class: 'w600'
        },
      ]
    }
  },
  deployNotifyTemplate: {
    email: {
      position: 'right',
      gutter: 20,
      labelWidth: 180,
      config: [
        {
          label: 'emailTitle',
          prop: 'flowTemplateEmailTitle',
          type: 'text',
          class: 'w600'
        },
        {
          label: 'emailContent',
          prop: 'flowTemplateEmailContent',
          type: 'textarea',
          class: 'w600'
        },
      ]
    },
    sms: {
      position: 'right',
      gutter: 20,
      labelWidth: 180,
      config: [
        {
          label: 'smsContent',
          prop: 'flowTemplateSmsContent',
          type: 'textarea',
          class: 'w600'
        },
      ]
    }
  },
  approvalNotifyTemplate: {
    email: {
      position: 'right',
      gutter: 20,
      labelWidth: 180,
      config: [
        {
          label: 'emailTitle',
          prop: 'approvalTemplateEmailTitle',
          type: 'text',
          class: 'w600'
        },
        {
          label: 'emailContent',
          prop: 'approvalTemplateEmailContent',
          type: 'textarea',
          class: 'w600'
        },
      ]
    },
    sms: {
      position: 'right',
      gutter: 20,
      labelWidth: 180,
      config: [
        {
          label: 'smsContent',
          prop: 'approvalTemplateSmsContent',
          type: 'textarea',
          class: 'w600'
        },
      ]
    }
  },
  monSystemAlarmNotifyTemplate: {
    email: {
      position: 'right',
      gutter: 20,
      labelWidth: 180,
      config: [
        {
          label: 'emailTitle',
          prop: 'monitorTemplateEmailTitle',
          type: 'text',
          class: 'w600'
        },
        {
          label: 'emailContent',
          prop: 'monitorTemplateEmailContent',
          type: 'textarea',
          class: 'w600'
        },
      ]
    },
    sms: {
      position: 'right',
      gutter: 20,
      labelWidth: 180,
      config: [
        {
          label: 'smsContent',
          prop: 'monitorTemplateSmsContent',
          type: 'textarea',
          class: 'w600'
        },
      ]
    },
    voice: {
      position: 'right',
      gutter: 20,
      labelWidth: 180,
      config: [
        {
          label: 'voiceContent',
          prop: 'monitorTemplateCallContent',
          type: 'textarea',
          class: 'w600'
        },
      ]
    }
  },
  monSystemEmail: {
    email: {
      position: 'right',
      gutter: 20,
      labelWidth: 180,
      config: [
        {
          label: 'emailTitle',
          prop: 'mailmonTemplateEmailTitle',
          type: 'text',
          class: 'w600'
        },
        {
          label: 'emailContent',
          prop: 'mailmonTemplateEmailContent',
          type: 'textarea',
          class: 'w600'
        },
      ]
    },
    sms: {
      position: 'right',
      gutter: 20,
      labelWidth: 180,
      config: [
        {
          label: 'smsContent',
          prop: 'mailmonTemplateSmsContent',
          type: 'textarea',
          class: 'w600'
        },
      ]
    },
    voice: {
      position: 'right',
      gutter: 20,
      labelWidth: 180,
      config: [
        {
          label: 'voiceContent',
          prop: 'mailmonTemplateCallContent',
          type: 'textarea',
          class: 'w600'
        },
      ]
    }
  }
})

export const COPY_CONFIG = Object.freeze({
  jobTaskNotifyTemplate: {
    email: {
      notifyTemplateEmailTitle: '作业:${name} 状态:${status}', // 邮件模板标题
      notifyTemplateEmailContent: '服务树:${projectname}\n作业名称:${name}\n任务编号:${uuid}\n任务状态:${status}\n\n详情：' + window.location.protocol + '//' + window.location.host + '/#/history/jobdetail/${projectid}/${uuid}', // 邮件模板内容
    },
    sms: {
      notifyTemplateSmsContent: '服务树:${projectname}\n作业名称:${name}\n任务编号:${uuid}\n任务状态:${status}\n\n详情：' + window.location.protocol + '//' + window.location.host + '/#/history/jobdetail/${projectid}/${uuid}', // 短信模板内容
    }
  },
  CIBuildNotifyTemplate: {
    email: {
      ciTemplateEmailTitle: 'Open-C3构建消息 项目: ${projectname} 版本:${version}', // 构建通知模版标题
      ciTemplateEmailContent: '状态: ${status}\n服务树:${treename}\n项目名称: ${projectname}\n代码仓库地址: ${addr}\n版本: ${version}\n触发测试环境发布: ${calltestenv}\n触发线上环境发布: ${callonlineenv}\n错误信息: ${errormsg}\n构建日志:\n${buildlog}\n\n详情:' + window.location.protocol + '//' + window.location.host + '/#/quickentry/flowlinedetail/${treeid}/${projectid}', // 构建通知模版内容
    },
    sms: {
      ciTemplateSmsContent: 'Open-C3构建消息\n服务树:${treename}\n项目:${projectname}\n版本:${version}\n状态:${status}\n\n详情:' + window.location.protocol + '//' + window.location.host + '/#/quickentry/flowlinedetail/${treeid}/${projectid}', // 构建通知模版短信内容
    }
  },
  deployNotifyTemplate: {
    email: {
      flowTemplateEmailTitle: 'Open-C3发布消息 项目: ${ci.name} 版本:${jobx.var.version}', // 发布通知模版标题
      flowTemplateEmailContent: '状态: ${jobx.status}\n项目名称: ${ci.name}\n代码仓库地址: ${ci.addr}\n版本: ${jobx.var.version}\n\n详情:' + window.location.protocol + '//' + window.location.host + '/#/quickentry/flowlinedetail/${ci.groupid}/${ci.id}', // 发布通知模版内容
    },
    sms: {
      flowTemplateSmsContent: 'Open-C3发布消息\n状态: ${jobx.status}\n项目名称: ${ci.name}\n代码仓库地址: ${ci.addr}\n版本: ${jobx.var.version}\n\n详情:' + window.location.protocol + '//' + window.location.host + '/#/quickentry/flowlinedetail/${ci.groupid}/${ci.id}', // 发布通知模版短信内容
    }
  },
  approvalNotifyTemplate: {
    email: {
      approvalTemplateEmailTitle: '发布审批: ${cont}', // 审批通知模版
      approvalTemplateEmailContent: '审批内容: ${cont}\n\n审批链接:' + window.location.protocol + '//' + window.location.host + '/#/quickapproval/${uuid}\n极速审批:' +  window.location.protocol + '//' + window.location.host + '/api/job/approval/fast/${uuid}\n', // 审批通知模版
    },
    sms: {
      approvalTemplateSmsContent: '审批内容: ${cont}\n\n审批链接:' + window.location.protocol + '//' + window.location.host + '/#/quickapproval/${uuid}\n极速审批:' +  window.location.protocol + '//' + window.location.host + '/api/job/approval/fast/${uuid}\n', // 审批通知模版
    }
  },
  monSystemAlarmNotifyTemplate: {
    email: {
      monitorTemplateEmailTitle: '告警名称: ${labels.alertname} 状态：${statusZH}', // 监控系统告警通知模版
      monitorTemplateEmailContent: '[openc3]\n状态：${statusZH}\n当前时间: ${time}\n告警时间: ${startsAtZH}\n\n监控对象: ${instancename}\n对象别名: ${instancealias}\n\n服务树: ${treename}\n\n告警名称: ${labels.alertname}\n告警概要: ${annotations.summary}\n故障描述：\n${annotations.descriptions}\n\nACK:' + window.location.protocol + '//' + window.location.host + '/#/ack/${ack}${c3tempusertoken}', // 监控系统告警通知模版
    },
    sms: {
      monitorTemplateSmsContent: '[openc3]\n状态：${statusZH}\n当前时间: ${time}\n告警时间: ${startsAtZH}\n\n监控对象: ${instancename}\n对象别名: ${instancealias}\n\n服务树: ${treename}\n\n告警名称: ${labels.alertname}\n告警概要: ${annotations.summary}\n故障描述：\n${annotations.descriptions}\n\nACK:' + window.location.protocol + '//' + window.location.host + '/#/ack/${ack}${c3tempusertoken}', // 监控系统告警通知模版 短信
    },
    voice: {
      monitorTemplateCallContent: '语音告警，监控对象: ${labels.instance} ${annotations.descriptions', // 监控系统告警通知模版 语音
    }
  },
  monSystemEmail: {
    email: {
      mailmonTemplateEmailTitle: '邮件监控: ${labels.subject}', // 监控系统邮件内容监控通知模版
      mailmonTemplateEmailContent: '账号： ${labels.account}\n内容：\n ${labels.content}\n', // 监控系统邮件内容监控通知模版
    },
    sms: {
      mailmonTemplateSmsContent: '账号：\n${labels.account}\n邮件标题：\n${labels.subject}\n邮件内容:\n${labels.content100}', // 监控系统邮件内容监控通知模版 短信
    },
    voice: {
      mailmonTemplateCallContent: '账号： ${labels.account}\n邮件标题：\n${labels.subject}' // 监控系统邮件内容监控通知模版 语音
    }
  }
})

// 保存参数
export const PARAMS_CONFIG = {
  notifyTemplateEmailTitle: '', // 邮件模板标题
  notifyTemplateEmailContent: '', // 邮件模板内容
  notifyTemplateSmsContent: '', // 短信模板内容
  ciTemplateEmailTitle: '', // 构建通知模版标题
  ciTemplateEmailContent: '', // 构建通知模版内容
  ciTemplateSmsContent: '', // 构建通知模版短信内容
  flowTemplateEmailTitle: '', // 发布通知模版标题
  flowTemplateEmailContent: '', // 发布通知模版内容
  flowTemplateSmsContent: '', // 发布通知模版短信内容
  approvalTemplateEmailTitle: '', // 审批通知模版
  approvalTemplateEmailContent: '', // 审批通知模版
  approvalTemplateSmsContent: '', // 审批通知模版
  monitorTemplateEmailTitle: '', // 监控系统告警通知模版
  monitorTemplateEmailContent: '', // 监控系统告警通知模版
  monitorTemplateSmsContent: '', // 监控系统告警通知模版 短信
  monitorTemplateCallContent: '', // 监控系统告警通知模版 语音
  mailmonTemplateEmailTitle: '', // 监控系统邮件内容监控通知模版
  mailmonTemplateEmailContent: '', // 监控系统邮件内容监控通知模版
  mailmonTemplateSmsContent: '', // 监控系统邮件内容监控通知模版 短信
  mailmonTemplateCallContent: '' // 监控系统邮件内容监控通知模版 语音
}

// tab配置
export const TABS_CONFIG = Object.freeze([
  {
    label: 'jobTaskNotifyTemplate',
    name: 'jobTaskNotifyTemplate'
  },
  {
    label: 'CIBuildNotifyTemplate',
    name: 'CIBuildNotifyTemplate'
  },
  {
    label: 'deployNotifyTemplate',
    name: 'deployNotifyTemplate'
  },
  {
    label: 'approvalNotifyTemplate',
    name: 'approvalNotifyTemplate'
  },
  {
    label: 'monSystemAlarmNotifyTemplate',
    name: 'monSystemAlarmNotifyTemplate'
  },
  {
    label: 'monSystemEmail',
    name: 'monSystemEmail'
  }
])