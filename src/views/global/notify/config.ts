import { t } from '@/utils/language'
// 表头
export const THEAD_CONFIG = Object.freeze([
  { prop: 'name', label: 'classify', align: 'center' },
  { prop: 'txt', label: 'status', align: 'center' },
  { prop: 'email', type: 'slotTable', label: 'email', align: 'center' },
  { prop: 'sms', type: 'slotTable', label: 'sms', align: 'center' },
  { prop: 'voice', type: 'slotTable', label: 'voice', align: 'voice' }
])

export const LIST_CONFIG = [
  // 页面执行作业
  {id: 'page1',name: t('pageExecutionJob'),txt: t('executionSucceeded'), type: 'success', email: false, sms: false, voice: false, spanAry: [3, 1], emailId: 'isPageSuccessEmail', smsId: 'isPageSuccessSms', voiceId: ''  },
  {id: 'page2',name: '',txt: t('executionFailed'),  type: 'fail', email: false, sms: false , emailId: 'isPageFailEmail', smsId: 'isPageFailSms', voiceId: '' },
  {id: 'page3',name: '',txt: t('waitingForUsers'),  type: 'wait', email: false, sms: false, voice: false, emailId: 'isPageWaitingEmail', smsId: 'isPageWaitingSms', voiceId: ''  },
  // 分组启动作业
  {id: 'api1',name: t('groupJob'),txt: t('executionSucceeded'),  type: 'success', email: false, sms: false, voice: false, spanAry: [3, 1], emailId: 'isApiSuccessEmail', smsId: 'isApiSuccessSms', voiceId: ''   },
  {id: 'api2',name: '',txt: t('executionFailed'),  type: 'fail', email: false, sms: false, voice: false, emailId: 'isApiFailEmail', smsId: 'isApiFailSms', voiceId: ''  },
  {id: 'api3',name: '',txt: t('waitingForUsers'),  type: 'wait', email: false, sms: false, voice: false, emailId: 'isApiWaitingEmail', smsId: 'isApiWaitingSms', voiceId: ''  },
  // 定时启动作业
  {id: 'crontab1',name: t('crontabJob'),txt: t('executionSucceeded'),  type: 'success', email: false, sms: false, voice: false, spanAry: [3, 1], emailId: 'isCrontabSuccessEmail', smsId: 'isCrontabSuccessSms', voiceId: '' },
  {id: 'crontab2',name: '18',txt: t('executionFailed'),  type: 'fail', email: false, sms: false, voice: false, emailId: 'isCrontabFailEmail', smsId: 'isCrontabFailSms', voiceId: ''  },
  {id: 'crontab3',name: '19',txt: t('waitingForUsers'),  type: 'wait', email: false, sms: false, voice: false, emailId: 'isCrontabWaitingEmail', smsId: 'isCrontabWaitingSms',  voiceId: ''  },
  // 构建任务
  {id: 'ci1',name: t('CITask'),txt: t('executionSucceeded'),  type: 'success', email: false, sms: false, voice: false, spanAry: [2, 1],emailId: 'isCiSuccessEmail', smsId: 'isCiSuccessSms', voiceId: ''   },
  {id: 'ci2',name: '',txt: t('executionFailed'),  type: 'fail', email: false, sms: false, voice: false,  emailId: 'isCiFailEmail', smsId: 'isCiFailSms', voiceId: ''  },
  // 发布任务
  {id: 'flow1',name: t('flowTask'),txt: t('executionSucceeded'),  type: 'success', email: false, sms: false, voice: false, spanAry: [2, 1], emailId: 'isFlowSuccessEmail', smsId: 'isFlowSuccessSms',  voiceId: ''   },
  {id: 'flow2',name: '',txt: t('executionFailed'),  type: 'fail', email: false, sms: false, voice: false, emailId: 'isFlowFailEmail', smsId: 'isFlowFailSms', voiceId: ''  },
  // 审批事件
  {id: 'approval',name: t('approval'),txt: t('approvalEvent'),  type: 'wait', email: false, sms: false, voice: false, spanAry: [1, 1],  emailId: 'isApprovalSuccessEmail', smsId: 'isApprovalSuccessSms', voiceId: '' },
  // 监控系统
  {id: 'mon',name: t('monSystem'),txt: t('alarmNotify'),  type: 'success', email: false, sms: false, voice: false, spanAry: [2, 1],emailId: 'isMonitorSuccessEmail', smsId: 'isMonitorSuccessSms',  voiceId: 'isMonitorSuccessCall'   },
  // 邮件内容监控
  {id: 'mail',name: '',txt: t('emailContentMon'),  type: 'fail', email: false, sms: false, voice: false, emailId: 'isMailmonSuccessEmail', smsId: 'isMailmonSuccessSms', voiceId: 'isMailmonSuccessCall'  },
]
