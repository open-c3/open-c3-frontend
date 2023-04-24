import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import layout from '@/components/layout/index.vue'
import layout1 from '@/components/layout/index1.vue'
import layout2 from '@/components/layout/index2.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: layout2,
    children: [
      {
        path: 'monitor/allCase/ack/:id',
        component: () => import('@/views/monitor/allCase/ack.vue'),
        meta: { title: '监控事件' }
      }
    ]
  },
  {
    path: '/',
    component: layout1,
    children: [
      {
        path: 'login',
        component: () => import('@/views/account/login.vue'),
      }
    ]
  }, {
    path: '/test',
    component: layout,
    children: [{
      path: '',
      component: () => import('@/views/test.vue')
    }]
  },
  {
    path: '/dashboard',
    component: layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard/index.vue')
      }
    ]
  },
  {
    path: '/device',
    component: layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/device/index.vue')
      },
      {
        path: 'data/:treeId/:timemachine/:type/:subtype',
        component: () => import('@/views/device/data/index.vue')
      },
    ]
  }, {
    path: '/monitor',
    component: layout,
    children: [{
      path: 'kanban',
      component: () => import('@/views/monitor/kanban/index.vue'),
      meta: { title: '监控看板' }
    }, {
      path: 'currentAlarm',
      component: () => import('@/views/monitor/alarm/index.vue'),
      meta: { title: '当前告警' }
    }, {
      path: 'allCase',
      component: () => import('@/views/monitor/allCase/index.vue'),
      meta: { title: '监控事件' }
    }, {
      path: 'config',
      component: () => import('@/views/monitor/config/index.vue'),
      meta: { title: '监控配置' }
    }, {
      path: 'group',
      component: () => import('@/views/monitor/group/index.vue'),
      meta: { title: '报警组管理' }
    }, {
      path: 'onCall',
      component: () => import('@/views/monitor/onCall/index.vue'),
      meta: { title: '值班管理' }
    }, {
      path: 'report',
      component: () => import('@/views/monitor/report/index.vue'),
      meta: { title: '监控告警报告' }
    }, {
      path: 'utilization',
      component: () => import('@/views/monitor/utilization/index.vue'),
      meta: { title: '主机低利用率' }
    }, {
      path: 'email',
      component: () => import('@/views/monitor/email/index.vue'),
      meta: { title: '邮件监控' }
    }, {
      path: 'selfHealing',
      component: () => import('@/views/monitor/selfHealing/index.vue'),
      meta: { title: '故障自愈' }
    }]
  }, {
    path: '/quickentry',
    component: layout,
    children: [
      {
        path: 'flowline',
        component: () => import('@/views/quickentry/flowline/index.vue'),
        meta: { title: '流水线列表' }
      },
      {
        path: 'flowlinedetail/:treeId/:sourceId',
        component: () => import('@/views/quickentry/flowline/detail/index.vue'),
        meta: { title: '流水线详情' }
      },
      {
        // flowlineeditor/:treeId/:sourceId
        path: 'flowlineEditor/:treeId/:sourceId',
        component: () => import('@/views/quickentry/flowline/editor/index.vue'),
        meta: { title: '流水线编辑' }
      }
    ]
  }, {
    path: '/implement',
    component: layout,
    children: [
      {
        path: 'runtask',
        component: () => import('@/views/implement/runtask/index.vue'),
        meta: { title: '启动任务' }
      },
      {
        path: 'cmd',
        component: () => import('@/views/implement/cmd/index.vue'),
        meta: { title: '脚本执行' }
      },
      {
        path: 'scp',
        component: () => import('@/views/implement/scp/index.vue'),
        meta: { title: '分发文件' }
      },
      {
        path: 'approval',
        component: () => import('@/views/implement/approval/index.vue'),
        meta: { title: '发起审批' }
      },
      {
        path: 'terminal',
        component: () => import('@/views/implement/terminal/index.vue'),
        meta: { title: '虚拟终端' }
      },
      {
        path: 'sendfile',
        component: () => import('@/views/implement/sendfile/index.vue'),
        meta: { title: '文件发送' }
      },
    ]
  },

  {
    path: '/business',
    component: layout,
    children: [{
      path: 'job',
      component: () => import('@/views/business/job/index.vue'),
      meta: { title: '作业管理' }
    }, {
      path: 'user',
      component: () => import('@/views/business/user/index.vue'),
      meta: { title: '账户管理' }
    }, {
      path: 'file',
      component: () => import('@/views/business/file/index.vue'),
      meta: { title: '文件管理' }
    }, {
      path: 'scripts',
      component: () => import('@/views/business/scripts/index.vue'),
      meta: { title: '脚本管理' }
    }, {
      path: 'nodeGroup',
      component: () => import('@/views/business/nodeGroup/index.vue'),
      meta: { title: '机器分组' }
    }, {
      path: 'nodeBatch',
      component: () => import('@/views/business/nodeBatch/index.vue'),
      meta: { title: '机器分批' }
    }, {
      path: 'machine',
      component: () => import('@/views/business/machine/index.vue'),
      meta: { title: '机器管理' }
    }, {
      path: 'notify',
      component: () => import('@/views/business/notify/index.vue'),
      meta: { title: '报警通知' }
    }, {
      path: 'variable',
      component: () => import('@/views/business/variate/index.vue'),
      meta: { title: '变量查看' }
    }, {
      path: 'agent',
      component: () => import('@/views/business/agent/index.vue'),
      meta: { title: '代理设置(AGENT安装)' }
    }]
  }, {
    path: '/userCenter',
    component: layout,
    meta: { title: '客户中心' },
    children: [{
      path: 'modifyPassword',
      component: () => import('@/views/userCenter/modifyPassword/index.vue'),
      meta: { title: '修改密码' }
    }, {
      path: 'versionLog',
      component: () => import('@/views/userCenter/versionLog/index.vue'),
      meta: { title: '版本信息' }
    }, {
      path: 'myACK',
      component: () => import('@/views/userCenter/myACK/index.vue'),
      meta: { title: '我的ACK' }
    }, {
      path: 'myCase',
      component: () => import('@/views/userCenter/myCase/index.vue'),
      meta: { title: '告警事件' }
    }, {

      path: 'favorites',
      component: () => import('@/views/userCenter/myFavorites/index.vue'),
      meta: { title: '修改密码' }
    }, {
      path: 'images',
      component: () => import('@/views/userCenter/images/index.vue'),
      meta: { title: '我的镜像' }
    }, {
      path: 'ticket',
      component: () => import('@/views/userCenter/ticket/index.vue'),
      meta: { title: '我的凭据' }
    }, {
      path: 'assignment',
      component: () => import('@/views/userCenter/assignment/index.vue'),
      meta: { title: '操作协助' }
    }, {
      path: 'approval',
      component: () => import('@/views/userCenter/approval/index.vue'),
      meta: { title: '我的审批' }
    }]

  }, {
    path: '/history',
    component: layout,
    meta: { title: '执行历史' },
    children: [
      {
        path: 'jobx',
        component: () => import('@/views/history/jobx/index.vue'),
        meta: { title: '分组任务' }
      },
      {
        path: 'jobxdetail/:treeId/:projectid/:taskuuid',
        component: () => import('@/views/history/jobx/jobxDetail/index.vue'),
        meta: { title: '分组任务详情' }
      },
      {
        path: 'job',
        component: () => import('@/views/history/job/index.vue'),
        meta: { title: '作业任务' }
      },
      {
        // /history/jobdetail/
        path: 'jobdetail/:treeId/:projectid/:taskuuid',
        component: () => import('@/views/history/job/jobDetail/index.vue'),
        meta: { title: '作业任务详情' }
      },
    ]
  }, {
    path: '/global',
    component: layout,
    meta: { title: '全局信息' },
    children: [
      {
        path: 'notify',
        component: () => import('@/views/global/notify/index.vue'),
        meta: { title: '通知管理' }
      },
      {
        path: 'template',
        component: () => import('@/views/global/template/index.vue'),
        meta: { title: '模版管理' }
      },
      {
        path: 'monitor',
        component: () => import('@/views/global/monitor/index.vue'),
        meta: { title: '监控信息' }
      },
      {
        path: 'auditLog',
        component: () => import('@/views/global/auditLog/index.vue'),
        meta: { title: '审计日志' }
      },
      {
        path: 'userAddr',
        component: () => import('@/views/global/userAddr/index.vue'),
        meta: { title: '地址簿管理' }
      },
      {
        path: 'allACK',
        component: () => import('@/views/global/allACK/index.vue'),
        meta: { title: 'ACK管理' }
      },
      {
        path: 'cloudMon',
        component: () => import('@/views/global/cloudMon/index.vue'),
        meta: { title: '云监控' }
      },
      {
        path: 'userDepartment',
        component: () => import('@/views/global/userDepartment/index.vue'),
        meta: { title: '用户部门关系绑定' }
      },
      {
        path: 'private',
        component: () => import('@/views/global/private/index.vue'),
        meta: { title: '私有节点管理' }
      },
      {
        path: 'cmdbManage',
        component: () => import('@/views/global/cmdbManage/index.vue'),
        meta: { title: 'CMDB' }
      },
      {
        path: 'approvalManage',
        component: () => import('@/views/global/approvalManage/index.vue'),
        meta: { title: '管理员审批管理' }
      },
      {
        path: 'ciWatcher',
        component: () => import('@/views/global/ciWatcher/index.vue'),
        meta: { title: 'CI任务监视器' }
      },
      {
        path: 'monTreeUnbind',
        component: () => import('@/views/global/monTreeUnbind/index.vue'),
        meta: { title: '监控系统-服务树继承解除' }
      },
      {
        path: 'networkMonitor',
        component: () => import('@/views/global/networkMonitor/index.vue'),
        meta: { title: '网络监视器' }
      },
      {
        path: 'sysctl',
        component: () => import('@/views/global/sysctl/index.vue'),
        meta: { title: '系统参数' }
      }
    ]
  }, {
    path: '/connector',
    component: layout,
    meta: { title: '连接器' },
    children: [
      {
        path: 'config',
        component: () => import('@/views/connector/config/index.vue'),
        meta: { title: '设置连接器' }
      }, {
        path: 'userManage',
        component: () => import('@/views/connector/userManage/index.vue'),
        meta: { title: '用户管理' }
      }, {
        path: 'userPermission',
        component: () => import('@/views/connector/userPermission/index.vue'),
        meta: { title: '权限管理' }
      }, {
        path: 'tree',
        component: () => import('@/views/connector/tree/index.vue'),
        meta: { title: '编辑服务树节点' }
      }, {
        path: 'resource',
        component: () => import('@/views/connector/resource/index.vue'),
        meta: { title: '编辑服务树资源' }
      }, {
        path: 'mail',
        component: () => import('@/views/connector/mail/index.vue'),
        meta: { title: '给我的邮件' }
      }, {
        path: 'message',
        component: () => import('@/views/connector/message/index.vue'),
        meta: { title: '给我的短信' }
      }
    ]
  }, {
    path: '/404',
    meta: { title: '404' },
    component: layout,
    children: [{
      path: '',
      component: () => import('@/views/others/404.vue'),
      meta: { title: '404' }
    }]
  }, {
    path: '/403',
    meta: { title: '403' },
    component: layout,
    children: [{
      path: '',
      component: () => import('@/views/others/403.vue'),
      meta: { title: '403' }
    }]
  }, {
    path: '/:pathMatch(.*)*',
    meta: { title: '404页' },
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
