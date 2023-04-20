import { t } from '@/utils/language'
export const CACHE_ARY = Object.freeze([
  {id: '0'},
  {id: '30'},
  {id: '60'},
  {id: '120'},
  {id: '300'},
  {id: '3600'},
  {id: '86400'},
  {id: '604800'},
  {id: '31536000'}
])
export const ALERTMANAGER_ARY = Object.freeze([
  {id: '1'},
  {id: '2'},
  {id: '3'},
  {id: '4'}
])
export const INTERVAL_ARY = Object.freeze([
  {id: '0'},
  {id: '60'},
  {id: '120'},
  {id: '300'},
  {id: '600'},
  {id: '1800'},
  {id: '3600'},
  {id: '7200'},
  {id: '86400'}
])
export const SYNC_ARY = Object.freeze([
  {id: '0'},
  {id: '1'},
])
export const SYSCTL_CONFIG = {
  ci: {
    tabs: [
      {
        label: 'CIcontinuousBuild',
        name: 'ci'
      }
    ],
    activeName: 'ci',
    form: {
      position: 'right',
      gutter: 20,
      labelWidth: 200,
      config: [
        {
          label: 'autoBuild',
          prop: 'ci_autobuild',
          type: 'slot'
        },
        {
          label: 'defaultTagger',
          prop: 'cidefaulttagger',
          type: 'text',
          class: 'w230',
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'findTagsConcurrencyNumber',
          prop: 'ci_findtags_concurrency',
          type: 'select',
          class: 'w230',
          value: 'id', // value 对应的参数值 默认为 id
          name: 'id', 
          data: [
            { id: '1' },
            { id: '2' },
            { id: '3' },
            { id: '4' },
            { id: '5' },
            { id: '6' },
            { id: '7' },
            { id: '8' },
            { id: '9' },
            { id: '10' },
            { id: '15' },
            { id: '20' },
            { id: '30' },
            { id: '40' },
            { id: '50' },
            { id: '60' },
            { id: '70' },
            { id: '80' },
            { id: '90' },
            { id: '100' }
          ]
        },
        {
          label: 'findTagsIntervalSecond',
          prop: 'ci_findtags_interval',
          type: 'slot'
        },
        {
          label: 'cpuSingleBuild',
          prop: 'ci_default_cpulimit',
          type: 'slot',
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'memorySingleBuild',
          prop: 'ci_default_memlimit',
          type: 'slot',
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'allMemorySingleBuild',
          prop: 'ci_available_mem',
          type: 'slot',
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'flowDefaultNumber',
          prop: 'ci_default_showcount',
          type: 'slot',
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        }
      ]
    }
  },
  sys: {
    tabs: [
      {
        label: 'sysBackup',
        name: 'sys'
      }
    ],
    activeName: 'sys',
    form: {
      position: 'right',
      gutter: 20,
      labelWidth: 200,
      config: [
        {
          label: 'name',
          prop: 'sys_backup_name',
          type: 'text',
          class: 'w230',
          // span: 12,
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'uploadAddressUrl',
          prop: 'sys_backup_url',
          type: 'text',
          class: 'w600',
          // span: 12,
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'uploadAddressToken',
          prop: 'sys_backup_token',
          type: 'text',
          class: 'w600',
          // span: 12,
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        }
      ]
    }
  },
  qa: {
    tabs: [
      {
        label: 'QASystemLinkag',
        name: 'qa'
      }
    ],
    activeName: 'qa',
    form: {
      position: 'right',
      gutter: 20,
      labelWidth: 200,
      config: [
        {
          label: 'callbackUrl',
          prop: 'external_qa_sys_callback_url',
          type: 'text',
          class: 'w600',
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'returnResultMatchingContent',
          prop: 'external_qa_sys_callback_match',
          type: 'text',
          class: 'w600',
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
      ]
    }
  },
  cluster: {
    tabs: [
      {
        label: 'clusterSettings',
        name: 'cluster'
      }
    ],
    activeName: 'cluster',
    form: {
      position: 'right',
      gutter: 20,
      labelWidth: 200,
      config: [
        {
          label: 'domain',
          prop: 'sys_cluster_domain',
          type: 'text',
          class: 'w600',
          // span: 12
        },
        {
          label: 'slaveList',
          prop: 'sys_cluster_slave',
          type: 'text',
          class: 'w600',
          // span: 12
        },
      ]
    }
  },
  sso: {
    tabs: [
      {
        label: 'SSO',
        name: 'sso'
      }
    ],
    activeName: 'sso',
    form: {
      position: 'right',
      gutter: 20,
      labelWidth: 200,
      config: [
        {
          label: 'cookie',
          prop: 'sys_sso_cookie',
          type: 'text',
          class: 'w230'
        }
      ]
    }
  },
  login: {
    tabs: [
      {
        label: 'login',
        name: 'login'
      }
    ],
    activeName: 'login',
    form: {
      position: 'right',
      gutter: 20,
      labelWidth: 200,
      config: [
        {
          label: 'loginAuthenticationMethod',
          prop: 'sys_login_type',
          type: 'select',
          class: 'w230',
          value: 'id', // value 对应的参数值 默认为 id
          name: 'id', 
          data: [
            { id: 'mysql' },
            { id: 'ldap' },
          ],
          span: 12
        },
        {
          label: 'ldapHostname',
          prop: 'sys_login_ldap_host',
          type: 'text',
          hidden: true,
          class: 'w230',
          span: 12,
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'ldapPort',
          prop: 'sys_login_ldap_port',
          type: 'text',
          hidden: true,
          class: 'w230',
          span: 12,
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'adminUser',
          prop: 'sys_login_ldap_admin_user',
          type: 'text',
          hidden: true,
          class: 'w230',
          span: 12,
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'adminPassword',
          prop: 'sys_login_ldap_admin_pass',
          type: 'text',
          hidden: true,
          class: 'w230',
          span: 12,
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'baseDN',
          prop: 'sys_login_ldap_dn',
          type: 'text',
          hidden: true,
          class: 'w230',
          span: 12,
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'groupRoleIdAdmin',
          prop: 'sys_login_ldap_role_admin',
          type: 'text',
          hidden: true,
          class: 'w230',
          span: 12,
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'groupRoleIdOM',
          prop: 'sys_login_ldap_role_ops',
          type: 'text',
          hidden: true,
          class: 'w230',
          span: 12,
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'groupRoleIdRD',
          prop: 'sys_login_ldap_role_dev',
          type: 'text',
          hidden: true,
          class: 'w230',
          span: 12,
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'keepLocalUser',
          prop: 'sys_login_ldap_mysqlon',
          type: 'select',
          class: 'w230',
          hidden: true,
          value: 'id',
          name: 'id', 
          data: [
            { id: '0' },
            { id: '1' },
          ],
          span: 12,
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        }
      ]
    }
  },
  cache: {
    tabs: [
      {
        label: 'connectorCache',
        name: 'cache'
      }
    ],
    activeName: 'cache',
    form: {
      position: 'right',
      gutter: 20,
      labelWidth: 200,
      config: [
        {
          label: 'nodeInfoCacheTimeout',
          prop: 'sys_cache_nodeinfo_timeout',
          type: 'select',
          class: 'w230',
          value: 'id', // value 对应的参数值 默认为 id
          name: 'id', 
          data: CACHE_ARY,
          span: 12
        },
        {
          label: 'treeMapCacheTimeout',
          prop: 'sys_cache_treemap_timeout',
          type: 'select',
          class: 'w230',
          value: 'id', // value 对应的参数值 默认为 id
          name: 'id', 
          data: CACHE_ARY,
          span: 12
        },
        {
          label: 'userInfoCacheTimeout',
          prop: 'sys_cache_userinfo_timeout',
          type: 'select',
          class: 'w230',
          value: 'id', // value 对应的参数值 默认为 id
          name: 'id', 
          data: CACHE_ARY,
          span: 12
        },
        {
          label: 'pointCacheTimeout',
          prop: 'sys_cache_point_timeout',
          type: 'select',
          class: 'w230',
          value: 'id', // value 对应的参数值 默认为 id
          name: 'id', 
          data: CACHE_ARY,
          span: 12
        },
        {
          label: 'userTreeCacheTimeout',
          prop: 'sys_cache_usertree_timeout',
          type: 'select',
          class: 'w230',
          value: 'id', // value 对应的参数值 默认为 id
          name: 'id', 
          data: CACHE_ARY,
          span: 12
        }
      ]
    }
  },
  monitor: {
    tabs: [
      {
        label: 'monSystemConfig',
        name: 'monitor'
      }
    ],
    activeName: 'monitor',
    form: {
      position: 'right',
      gutter: 20,
      labelWidth: 200,
      config: [
        {
          label: 'monitorModel',
          prop: 'sys_monitor_mode',
          type: 'select',
          class: 'w230',
          value: 'id', // value 对应的参数值 默认为 id
          name: 'name', 
          data: [
            {id: 'off', name: '禁用'},
            {id: 'single', name: '单机版模式'},
            {id: 'prometheus', name: 'prometheus'},
            {id: 'thanos', name: 'thanos'}
          ],
          span: 12
        },
        {
          label: 'treeFilter',
          prop: 'sys_monitor_grep_tree',
          type: 'text',
          hidden: true,
          class: 'w230',
          span: 12,
          // rules: [
          //   { required: true, trigger: 'blur', message: t('requiredText') }
          // ]
        },
        {
          label: 'hostIpFilter',
          prop: 'sys_monitor_grep_node',
          type: 'text',
          hidden: true,
          class: 'w230',
          span: 12,
          // rules: [
          //   { required: true, trigger: 'blur', message: t('requiredText') }
          // ]
        },
        {
          label: 'monUsPublicIp',
          prop: 'sys_monitor_uexip',
          type: 'text',
          hidden: true,
          class: 'w230',
          span: 12,
          // rules: [
          //   { required: true, trigger: 'blur', message: t('requiredText') }
          // ]
        },
        {
          label: 'prometheusNumberOfCopies',
          prop: 'sys_monitor_prometheus_prometheus_replica',
          type: 'text',
          hidden: true,
          data: ALERTMANAGER_ARY,
          value: 'id', // value 对应的参数值 默认为 id
          name: 'id', 
          class: 'w230',
          span: 12
        },
        {
          label: 'alertmanagerNumberOfCopies',
          prop: 'sys_monitor_prometheus_alertmanager_replica',
          type: 'select',
          hidden: true,
          data: ALERTMANAGER_ARY,
          value: 'id', // value 对应的参数值 默认为 id
          name: 'id', 
          class: 'w230',
          span: 12
        },
        {
          label: 'thanosWebAddress',
          prop: 'sys_monitor_thanos_thanos_web_addr',
          type: 'text',
          hidden: true,
          class: 'w230',
          span: 12,
          // rules: [
          //   { required: true, trigger: 'blur', message: t('requiredText') }
          // ]
        },
        {
          label: 'objectStorageType',
          prop: 'sys_monitor_thanos_objstore_mode',
          type: 'select',
          hidden: true,
          value: 'id', // value 对应的参数值 默认为 id
          name: 'name', 
          data: [
            {id: 'S3', name: 'S3'},
            {id: 'null', name: 'null'}
          ],
          class: 'w230',
          span: 12
        },
        {
          label: 'bucket',
          prop: 'sys_monitor_thanos_objstore_S3_bucket',
          type: 'text',
          hidden: true,
          class: 'w230',
          span: 12,
          // rules: [
          //   { required: true, trigger: 'blur', message: t('requiredText') }
          // ]
        },
        {
          label: 'access_key',
          prop: 'sys_monitor_thanos_objstore_S3_access_key',
          type: 'text',
          hidden: true,
          class: 'w230',
          span: 12,
          // rules: [
          //   { required: true, trigger: 'blur', message: t('requiredText') }
          // ]
        },
        {
          label: 'secret_key',
          prop: 'sys_monitor_thanos_objstore_S3_secret_key',
          type: 'text',
          hidden: true,
          class: 'w230',
          span: 12,
          // rules: [
          //   { required: true, trigger: 'blur', message: t('requiredText') }
          // ]
        },
        {
          label: 'thanosWebAddress',
          prop: 'sys_monitor_thanos_objstore_S3_endpoint',
          type: 'text',
          hidden: true,
          class: 'w230',
          span: 12,
          // rules: [
          //   { required: true, trigger: 'blur', message: t('requiredText') }
          // ]
        },
        {
          label: 'alertmanagerNumberOfCopies',
          prop: 'sys_monitor_thanos_alertmanager_replica',
          type: 'select',
          hidden: true,
          data: ALERTMANAGER_ARY,
          value: 'id', // value 对应的参数值 默认为 id
          name: 'id', 
          class: 'w230',
          span: 12
        },
      ]
    }
  },
  tt: {
    tabs: [
      {
        label: 'externalTTSystem',
        name: 'tt'
      }
    ],
    activeName: 'tt',
    form: {
      position: 'right',
      gutter: 20,
      labelWidth: 200,
      config: [
        {
          label: 'TTAddress',
          prop: 'sys_tt_external_api_endpoint',
          type: 'text',
          class: 'w230',
          span: 12,
          // rules: [
          //   { required: true, trigger: 'blur', message: t('requiredText') }
          // ]
        },
        {
          label: 'appname',
          prop: 'sys_tt_external_api_endpoint_env_appname',
          type: 'text',
          class: 'w230',
          span: 12,
          // rules: [
          //   { required: true, trigger: 'blur', message: t('requiredText') }
          // ]
        },
        {
          label: 'appkey',
          prop: 'sys_tt_external_api_endpoint_env_appkey',
          type: 'text',
          class: 'w230',
          span: 12,
          // rules: [
          //   { required: true, trigger: 'blur', message: t('requiredText') }
          // ]
        },
        {
          label: 'TTView',
          prop: 'sys_monitor_tt_caseurl',
          type: 'text',
          class: 'w230',
          span: 12,
          // rules: [
          //   { required: true, trigger: 'blur', message: t('requiredText') }
          // ]
        }
      ]
    }
  },
  proxy: {
    tabs: [
      {
        label: 'monitorProxy',
        name: 'proxy'
      }
    ],
    activeName: 'proxy',
    form: {
      position: 'right',
      gutter: 20,
      labelWidth: 200,
      config: [
        {
          label: 'proxyServiceTree',
          prop: 'sys_monitor_proxy_default_treeid',
          type: 'slot',
          class: 'w230',
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
      ]
    }
  },
  monTT: {
    tabs: [
      {
        label: 'alertToCase',
        name: 'monTT'
      }
    ],
    activeName: 'monTT',
    form: {
      position: 'right',
      gutter: 20,
      labelWidth: 200,
      config: [
        {
          label: 'defaultTTSystem',
          prop: 'sys_monitor_tt_type',
          type: 'slot',
          class: 'w230'
        },
      ]
    }
  },
  cmdb: {
    tabs: [
      {
        label: 'CMDB',
        name: 'cmdb'
      }
    ],
    activeName: 'cmdb',
    form: {
      position: 'right',
      gutter: 20,
      labelWidth: 200,
      config: [
        {
          label: 'syncInterval',
          prop: 'sys_device_sync_interval',
          type: 'select',
          class: 'w230',
          data: INTERVAL_ARY,
          value: 'id', // value 对应的参数值 默认为 id
          name: 'id', 
          span: 12
        },
        {
          label: 'importServiceTree',
          prop: 'sys_device_sync_tree',
          type: 'select',
          class: 'w230',
          data: SYNC_ARY,
          value: 'id', // value 对应的参数值 默认为 id
          name: 'id', 
          span: 12
        },
        {
          label: 'importServiceTreeRelationship',
          prop: 'sys_device_sync_bind',
          type: 'select',
          class: 'w230',
          data: SYNC_ARY,
          value: 'id', // value 对应的参数值 默认为 id
          name: 'id', 
          span: 12
        },
        {
          label: 'cmdbIngestionNode',
          prop: 'sys_device_ingestion_node',
          type: 'select',
          class: 'w230',
          data: SYNC_ARY,
          value: 'id', // value 对应的参数值 默认为 id
          name: 'id', 
          span: 12
        },
        {
          label: 'cmdbPermissionStrict',
          prop: 'sys_device_auth_strict',
          type: 'slot'
        },
        {
          label: 'tagProductOwner',
          prop: 'cmdb_tags_ProductOwner',
          type: 'text',
          class: 'w230',
          span: 12,
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'tagOMOwner',
          prop: 'cmdb_tags_OpsOwner',
          type: 'text',
          class: 'w230',
          span: 12,
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'tagDepartment',
          prop: 'cmdb_tags_Department',
          type: 'text',
          class: 'w230',
          span: 12,
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'tagResourceName',
          prop: 'cmdb_tags_Name',
          type: 'text',
          class: 'w230',
          span: 12,
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        }
      ]
    }
  },
  keyCloak: {
    tabs: [
      {
        label: 'keycloak',
        name: 'keyCloak'
      }
    ],
    activeName: 'keyCloak',
    form: {
      position: 'right',
      gutter: 20,
      labelWidth: 200,
      config: [
        {
          label: 'Switch',
          prop: 'sys_thirdparty_keycloak_on',
          type: 'select',
          class: 'w230',
          data: SYNC_ARY,
          value: 'id', // value 对应的参数值 默认为 id
          name: 'id', 
          span: 12
        },
        {
          label: 'User Page URL',
          prop: 'sys_thirdparty_keycloak_url_open',
          type: 'text',
          class: 'w600',
          // span: 12,
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        },
        {
          label: 'Admin Page URL',
          prop: 'sys_thirdparty_keycloak_url_admin',
          type: 'text',
          class: 'w600',
          // span: 12,
          rules: [
            { required: true, trigger: 'blur', message: t('requiredText') }
          ]
        }
      ]
    }
  }
}
