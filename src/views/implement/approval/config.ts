import { t } from "@/utils/language";

export const APPROVAL_FORM_CONFIG = {
  width: '1000px',
  title: 'targetFile',
  noDefaultFooter: true,
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 150,
    config: [
      {
        label: 'JobName',  // 作业名称
        prop: 'name',
        type: 'text',
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') },
        ],
        span: 24
      },
      {
        label: 'approvalContent', // 审批内容
        prop: 'cont',
        type: 'slot',
        class: 'w450',
        data: [],
        span: 24
      },
      {
        label: 'approver',  // 审批人
        prop: 'approver',
        type: 'text',
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') },
        ],
        span: 24
      },
      {
        label: 'effectiveEnv', // 生效环境
        prop: 'deployenv',
        type: 'radio',
        data: [
          { name: t('alwaysExecute'), id: 'always'},
          { name: t('testEnv'), id: 'test'},
          { name: t('onlineEnv'), id: 'online'}
        ],
        rules: [
          { required: true, trigger: 'change', message: t('requiredText') }
        ],
        span: 24
      },
      {
        label: 'effectiveAction', // 生效动作
        prop: 'action',
        type: 'radio',
        data: [
          { name: t('alwaysExecute'), id: 'always'},
          { name: t('executeDeploy'), id: 'deploy'},
          { name: t('executeRollback'), id: 'rollback'}
        ],
        rules: [
          { required: true, trigger: 'change', message: t('requiredText') }
        ],
        span: 24
      },
      {
        label: 'Batch', // 分批
        prop: 'batches',
        type: 'radio',
        data: [
          { name: t('alwaysExecute'), id: 'always'},
          { name: t('firstGroupOnly'), id: 'firsttime'},
          { name: t('lastGroupOnly'), id: 'thelasttime'},
          { name: t('notFirstGroup'), id: 'notfirsttime'},
          { name: t('notLastGroup'), id: 'notthelasttime'}
        ],
        rules: [
          { required: true, trigger: 'change', message: t('requiredText') }
        ],
        span: 24
      },
      {
        label: 'allApproval', // 所有审批人都要审批
        prop: 'everyone',
        type: 'radio',
        data: [
          { name: t('yes'), id: 'on'},
          { name: t('onlyApprover'), id: 'off'},
        ],
        rules: [
          { required: true, trigger: 'change', message: t('requiredText') }
        ],
        span: 24
      },
      {
        label: 'strategy', // 策略
        prop: 'relaxed',
        type: 'radio',
        data: [
          { name: t('samePersonJumpOver'), id: 'on'},
          { name: t('samePersionUpgradeLeader'), id: 'off'},
          { name: t('mustApprover'), id: 'nervous'},
        ],
        rules: [
          { required: true, trigger: 'change', message: t('requiredText') }
        ],
        span: 24
      },
      {
        label: 'Timeout', // 超时时间
        prop: 'timeout',
        type: 'text',
        class: 'w450',
        placeholder: 'timeoutPlaceholder',
        span: 24
      },
    ]
  }
}
