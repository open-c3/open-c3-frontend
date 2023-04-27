<template>
  <header class="header-main">
    <div class="header-main-left">
      <div class="logo" >
        <img src="@/assets/img/logo.png"/>
        <span>{{ $t('jy') }}</span>
      </div>
      <div class="product-center">
        <div class="produce-center-title df ai_c hand" @mouseenter.stop="setNavClass">{{$t('productCenter')}}<el-icon><ArrowDownBold /></el-icon></div>
        <div class="produce-center-content">
          <div class="nav df">
            <div class="nav-left flex1">
              <div v-for="(item, index) in menuList" :key="index" :class="item.title.class" @mouseenter.stop="currentIndex = index">
                <svg-icon :iconClass="item.title.icon" :name="item.title.icon"/>
                {{item.title.name}}</div>
              </div>
            <div class="nav-right df">
              <div v-for="item in menuList[currentIndex].list" @click.stop="jumpPage(item)" :class="fullPath === item.url ? 'df jc_sb ai_c active' : 'df jc_sb ai_c' ">
                <span class="ml5">{{ item.name }}</span>
                <svg-icon v-if="item.star" iconClass="star" name="star" class="mr5" @click.stop="saveMenu(item)"/>
                <svg-icon v-else iconClass="starLine" name="starLine" class="mr5" @click.stop="saveMenu(item)"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="menu-list">
        <span v-for="(item, index) in collectMenu" :key="index" @click="jumpPage(item)" class="hand">{{ item.name }}</span>
      </div>
    </div>
    <div class="header-main-right">
      <Language class="ml24 mr10" />
      <div class="user-center">
        <div class="user-center-title df ai_c hand">{{userInfo?.name}}</div>
        <div class="user-center-content">
          <ul>
            <li>
              <p>{{$t('user')}} ：{{userInfo?.name}} {{$t('origination')}} : {{ userInfo?.company }}</p>
              <div></div>
            </li>
            <li v-for="(item, index) in centerList" :key="index">
              <p>{{item.title.name}}</p>
              <div v-if="item.list && item.list.length">
                <template v-for="child in item.list">
                  <Theme v-if="child.name === 'theme'"/>
                  <span v-else @click="jumpPage(child)" class="hand">{{child.name}}</span>
                </template>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, watch, inject, getCurrentInstance, onMounted } from 'vue'
import router from '@/router'
import { useStore } from 'vuex'
import Language from '@/components/language/index.vue'
import Theme from '@/components/theme/index.vue'
import { getCookie, setCookies } from '@/utils/cookie'
import { t } from '@/utils/language'
export default defineComponent({
  components: { Language, Theme },
  setup() {
    const { proxy } = getCurrentInstance()
    
    const centerList = [
      {
        title: {
          name: '文档',
          url: ''
        }
      },
      {
        title: {
          name: '执行历史',
          url: '/history/jobx'
        },
        list: [
          {
            name: '分组任务',
            url: '/history/jobx'
          },
          {
            name: '作业任务',
            url: '/history/job'
          },
          {
            name: 'BPM任务',
            url: ''
          }
        ]
      },
      {
        title: {
          name: '报告',
          url: ''
        },
        list: [
          {
            name: 'GIT',
            url: ''
          },
          {
            name: '流水线',
            url: ''
          },
          {
            name: '监控告警',
            url: ''
          }
        ]
      },
      {
        title: {
          name: '全局信息',
          url: ''
        },
        list: [
          {
            name: proxy.$t('notifyManage'),
            url: '/global/notify',
            meta: { title: '通知管理'}
          },
          {
            name: proxy.$t('templateManage'),
            url: '/global/template',
            meta: { title: '模版管理' }
          },
          {
            name: proxy.$t('sysctl'),
            url: '/global/sysctl',
            meta: { title: '系统参数'}
          },
          {
            name: proxy.$t('systemMonitor'),
            url: '/global/monitor',
            meta: { title: '监控信息'}
          },
          {
            name: proxy.$t('auditLog'),
            url: '/global/auditLog',
            meta: { title: '审计日志'}
          },
          {
            name: proxy.$t('lightApplicationConfig'),
            url: '/global/smallapplication',
            meta: { title: '轻应用配置'}
          },
          {
            name: proxy.$t('addressBookManage'),
            url: '/global/userAddr',
            meta: { title: '地址簿管理'}
          },
          {
            name: proxy.$t('ackManage'),
            url: '/global/allACK',
            meta: { title: 'ACK管理'}
          },
          {
            name: proxy.$t('monTreeUnInheritance'),
            url: '/global/monTreeUnbind',
            meta: { title: '监控系统-服务树继承解除'}
          },
          {
            name: proxy.$t('userDepartment'),
            url: '/global/userDepartment',
            meta: { title: '用户部门关系绑定'}
          },
          {
            name: proxy.$t('privateNodeManage'),
            url: '/global/private',
            meta: { title: '私有节点管理'}
          },
          {
            name: proxy.$t('CITaskMonitor'),
            url: '/global/ciWatcher',
            meta: { title: 'CI任务监视器'}
          },
          {
            name: proxy.$t('networkMonitor'),
            url: '/global/networkMonitor',
            meta: { title: '网络监视器'}
          },
          {
            name: proxy.$t('approvalManage'),
            url: '/global/approvalManage',
            meta: { title: '管理员审批管理'}
          },
          {
            name: proxy.$t('cloudMon'),
            url: '/global/cloudMon',
            meta: { title: '云监控'}
          },
          {
            name: 'CMDB',
            url: '/global/cmdbManage',
            meta: { title: '云监控'}
          }
        ]
      },
      {
        title: {
          name: proxy.$t('connector'),
          url: '',
          meta: { title: '连接器'}
        },
        list: [
          {
            name: proxy.$t('setConnector'),
            url: '/connector/config',
            meta: { title: '设置连接器'}
          },
          {
            name: proxy.$t('userManage'),
            url: '/connector/userManage',
            meta: { title: '用户管理'}
          },
          {
            name: proxy.$t('userPermission'),
            url: '/connector/userPermission',
            meta: { title: '权限管理'}
          },
          {
            name: proxy.$t('editTreeNode'),
            url: '/connector/tree',
            meta: { title: '编辑服务树节点'}
          },
          {
            name: proxy.$t('editTreeResource'),
            url: '/connector/resource',
            meta: { title: '编辑服务树资源'}
          },
          {
            name: proxy.$t('mailToMe'),
            url: '/connector/mail',
            meta: { title: '给我的邮件'}
          },
          {
            name: proxy.$t('messageToMe'),
            url: '/connector/message',
            meta: { title: '给我的短信'}
          }
        ]
      },
      {
        title: {
          name: '个人中心',
          url: ''
        },
        list: [
          {
            name: '我的收藏夹',
            url: '/userCenter/favorites'
          },
          {
            name: proxy.$t('myApproval'),
            url: '/userCenter/approval',
            meta: { title: '我的审批' }
          },
          {
            name: proxy.$t('myAck'),
            url: '/userCenter/myACK',
            meta: { title: '我的ACK'}
          },
          {
            name: proxy.$t('alarmEvent'),
            url: '/userCenter/myCase',
            meta: { title: '告警事件' }
          },
          {
            name: proxy.$t('operationAssistance'),
            url: '/userCenter/assignment',
            meta: { title: '操作协助' }
          },
          {
            name: proxy.$t('myCredentials'),
            url: '/userCenter/ticket',
            meta: { title: '我的凭据' }
          },
          {
            name: proxy.$t('myImages'),
            url: '/userCenter/images',
            meta: { title: '我的镜像'}
          },
          {
            name: proxy.$t('versionInfo'),
            url: '/userCenter/versionLog',
            meta: { title: '版本信息'}
          },
          {
            name: proxy.$t('changePassword'),
            url: '/userCenter/modifyPassword',
            meta: { title: '修改密码'}
          },
          {
            name: 'theme'
          },
          {
            name: '登出',
            url: '',
            fun: 'logOut'
          }
        ]
      }
    ]
    const reload: Function = inject('reload')
    const store = useStore()
    
    const state = reactive({
      menuList: [
        {
          title: {
            name: proxy.$t('DashBoard'),
            icon: 'dashboard',
            url: '/dashboard',
            class: ''
          },
          list:[
            {
              name: proxy.$t('DashBoard'),
              url: '/dashboard/index',
              star: false
            }
          ]
        },
        {
          title: {
            name: 'CMDB',
            icon: 'basic',
            url: '/device',
            class: ''
          },
          list:[
            {
              name: 'CMDB',
              url: '/device/index',
              star: false
            }
          ]
        },
        {
          title: {
            name: '监控',
            icon: 'system',
            url: '/monitor',
            class: ''
          },
          list: [
            {
              name: proxy.$t('monDashBoard'),
              url: '/monitor/kanban',
              meta: { title: '监控看板' },
              star: false
            },
            {
              name: proxy.$t('currentAlarm'),
              url: '/monitor/currentAlarm',
              meta: { title: '当前告警' },
              star: false
            },
            {
              name: proxy.$t('monEvent'),
              url: '/monitor/allCase',
              meta: { title: '监控事件' },
              star: false
            },
            {
              name: proxy.$t('monConfig'),
              url: '/monitor/config',
              meta: { title: '监控配置'},
              star: false
            },
            {
              name: proxy.$t('alarmGroupManagement'),
              url: '/monitor/group',
              meta: { title: '报警组管理'},
              star: false
            },
            {
              name: proxy.$t('onCallConfig'),
              url: '/monitor/onCall',
              meta: { title: '值班管理'},
              star: false
            },
            {
              name: proxy.$t('monAlarmReport'),
              url: '/monitor/report',
              meta: { title: '监控告警报告'},
              star: false
            },
            {
              name: proxy.$t('hostLowUtilization'),
              url: '/monitor/utilization',
              meta: { title: '主机低利用率'},
              star: false
            },
            {
              name: proxy.$t('emailMonitor'),
              url: '/monitor/email',
              meta: { title: '邮件监控'},
              star: false
            },
            {
              name: proxy.$t('故障自愈'),
              url: '/monitor/selfHealing',
              meta: { title: '故障自愈'},
              star: false
            }
          ]
        },
        {
          title: {
            name: proxy.$t('assembly_line'),
            icon: 'flowline-switch',
            url: '/quickentry',
            class: ''
          },
          list:[
          {
            name: proxy.$t('assembly_line'),
            url: '/quickentry/flowline',
            meta: { title: '流水线' },
            star: false
          }
        ]
        },
        {
          title: {
            name: proxy.$t('fastExecution'),
            icon: 'basic',
            url: '/implement',
            class: ''
          },
          list: [
            {
              name: proxy.$t('startTask'),
              url: '/implement/runtask',
              meta: { title: '启动任务' },
              star: false

            },
            {
              name: proxy.$t('scriptExecution'),
              url: '/implement/cmd',
              meta: { title: '脚本执行' },
              star: false
            },
            {
              name: proxy.$t('distributionFile'),
              url: '/implement/scp',
              meta: { title: '分发文件' },
              star: false
            },
            {
              name: proxy.$t('initiateApproval'),
              url: '/implement/approval',
              meta: { title: '发起审批' },
              star: false
            },
            {
              name: proxy.$t('virtualTerminal'),
              url: '/implement/terminal',
              meta: { title: '虚拟终端' },
              star: false
            },
            {
              name: proxy.$t('fileSending'),
              url: '/implement/sendfile',
              meta: { title: '文件发送' },
              star: false
            }
          ]
        },
        {
          title: {
            name: '业务管理',
            icon: 'quickly',
            url: '/business',
            class: ''
          },
          list: [
            {
              name: proxy.$t('jobManagement'),
              url: '/business/job',
              meta: { title: '作业管理'},
              star: false
            },
            {
              name: proxy.$t('accountManagement'),
              url: '/business/user',
              meta: { title: '账户管理'},
              star: false
            },
            {
              name: proxy.$t('fileManagement'),
              url: '/business/file',
              meta: { title: '文件管理'},
              star: false
            },
            {
              name: proxy.$t('scriptManagement'),
              url: '/business/scripts',
              meta: { title: '脚本管理'},
              star: false
            },
            {
              name: proxy.$t('nodeGroup'),
              url: '/business/nodeGroup',
              meta: { title: '机器分组'},
              star: false
            },
            {
              name: proxy.$t('nodeBatch'),
              url: '/business/nodeBatch',
              meta: { title: '机器分批'},
              star: false
            },
            {
              name: proxy.$t('nodeManagement'),
              url: '/business/machine',
              meta: { title: '机器管理' },
              star: false
            },
            {
              name: proxy.$t('alarmNotification'),
              url: '/business/notify',
              meta: { title: '报警通知' },
              star: false
            },
            {
              name: '定时作业',
              url: ''
            },
            {
              name: proxy.$t('proxySettings'),
              url: '/business/agent',
              meta: { title: '代理设置(AGENT安装)'},
              star: false
            },
            {
              name: proxy.$t('variableView'),
              url: '/business/variable',
              meta: { title: '变量查看'},
              star: false
            }
          ]
        },
        {
          title: {
            name: proxy.$t('lightApplication'),
            icon: 'small-app',
            url: '/smallapplication',
            class: ''
          },
          list:[
            {
              name: proxy.$t('lightApplicationConfig'),
              url: '/smallapplication/index',
              star: false
            }
          ]
        },
      ],
      currentIndex: 0,
      collectMenu: []
    })
    const userInfo = computed(() => {
      return store.getters.userInfo
    })
    const logOut = () => {
      setCookies('treeId', '')
      setCookies('treeData', '')
      setCookies('sid', '')
      setCookies('userName', '')
      setCookies('userInfo', '')
      store.dispatch('setTreeId', '')
      store.dispatch('setTreeData', '')
      store.dispatch('setToken', '')
      store.dispatch('setUserInfo', '')
      store.dispatch('setUserName', '')
      proxy.$jumpPage('/login')
      proxy.$notification('logOutSuccess')
    }
    const jumpPage = (data) => {
      const apiFun = {
        logOut: logOut
      }
      if (data.fun) {
        apiFun[data.fun]()
      } else if (data.url) {
        router.push(data.url)
      }
    }

    const saveCollectMenu = () => {
      const star = localStorage.getItem('star')
      if (star) {
        state.collectMenu = (JSON.parse(star) as any).menu || []
      } else {
        state.collectMenu = []
      }
    }
    // 保存收藏 取消收藏
    const saveMenu = (item) => {
      item.star = !item.star
      let star = localStorage.getItem('star')
      if (star) {
        star = JSON.parse(star)
        const index = (star as any).menu.findIndex(menuItem => menuItem.url === item.url)
        if (index === -1) {
          // (star as any).menu.unshift(item)
          (star as any).menu.push(item)
        } else {
          (star as any).menu.splice(index, 1)
        }
        localStorage.setItem('star', JSON.stringify(star))
      } else {
        localStorage.setItem('star', JSON.stringify({ account: userInfo.value.name, menu: [item] }))
      }
      saveCollectMenu()
    }
    // 检查是否有收藏的menu 点亮展示
    const checkMenu = () => {
      const star = localStorage.getItem('star')
      let menu = []
      if (star) {
        menu = (JSON.parse(star) as any).menu
      }
      state.menuList.forEach(item => {
        item.list.forEach(child => {
          child.star = menu.findIndex(menuChild => menuChild.url === child.url) > -1
        })
      })
    }
    const setNavClass = () => {
      state.menuList.forEach((item, index) => {
        const flag = item.title.url === router.currentRoute.value.matched[0].path
        item.title.class = flag  ? 'active' : ''
        if (flag) {
          state.currentIndex = index
        }
      })
    }
    const fullPath = computed(() => {
      return router.currentRoute.value.fullPath
    })
    
    onMounted(() => {
      checkMenu()
      saveCollectMenu()
    })
    watch(() => router.currentRoute.value, val => {
      setNavClass()
    }, {
      immediate: true
    })
    return {
      ...toRefs(state),
      userInfo,
      centerList,
      jumpPage,
      setNavClass,
      fullPath,
      saveMenu
    }
  }
})

</script>

<style lang="scss" scoped>
.header-main {
  height: 64px;
  width: calc(100% - 40px);
  min-width: 1240px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:0 20px;
  background-color: var(--color_menu_1_bg);
  color: #fff !important;
  .header-main-left {
    height: 64px;
    min-width: 1000px;
    width: calc(100% - 240px);
    display: flex;
    justify-content: flex-start;
    .logo{
      display: flex;
      align-items: center;
      span{
        margin: 0 15px 0 5px;
      }
      img{
        width: 30px;
      }
    }
    .product-center{
      position: relative;
      &:hover{
        .produce-center-content{
          display: block;
          z-index: 10;
        }
      }
      .produce-center-title{
        height: 64px;
      }
      .produce-center-content{
        display: none;
        position: absolute;
        top:60px;
        left: 0;
        width: 730px;
        z-index: 20;
        background-color: var(--color_menu_1_bg);
        border-radius: 0px 0px 12px 12px;
        border-top: 1px solid #2B2E43;
        .nav{
          .nav-left{
            width: 145px;
            padding: 10px 0;
            font-size: 14px;
            border-right: 1px solid #2B2E43;
            color: #ACB3CB;
            div{
              margin-left: 20px;
              height: 30px;
              line-height: 30px;
              margin-bottom: 10px;
              &:hover, &.active{
                border-right: 1px solid var(--color_primary);
                color:#fff;
              }
            }
          }
          .nav-right{
            width: 585px;
            flex-wrap: wrap;
            align-content: flex-start;
            padding: 15px 10px;
            div{
              width: 120px;
              height: 30px;
              line-height: 30px;
              background: rgba(220,220,220,.1);
              color: #ACB3CB;
              border-radius: 4px;
              font-size: 12px;
              margin: 10px;
              &:hover, &.active{
                background: #4E54AF;
                color: #fff;
              }
            }
          }
        }
      }
    }
    .menu-list{
      line-height: 64px;
      max-width: calc(100% - 300px);
      margin-left: 10px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      overflow: hidden;
      span{
        // line-height: 64px;
        flex-shrink: 0; 
        margin: 0 5px;
        font-size: 14px;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
      }
    }
  }
  .header-main-right{
    min-width: 240px;
    display: flex;
    justify-content: flex-end;
    .user-center{
      position: relative;
      &:hover{
        .user-center-content{
          display: block;
          z-index: 10;
        }
      }
      .user-center-title{
        height: 64px;
        padding-right: 24px;
      }
      .user-center-content{
        display: none;
        background-color: var(--color_menu_2_bg);
        width: 500px;
        position: absolute;
        top:60px;
        right: 24px;
        z-index: 2;
        border-radius: 8px;
        padding-bottom: 16px;
        ul{
          li{
            p{
              color: var(--color_primary);
              font-size: 14px;
            }
            div{
              display: flex;
              flex-wrap: wrap;
              margin-bottom: -10px;
            }
            span{
              font-size: 12px;
              margin-right: 15px;
              color: var(--color_input_text);
              margin-bottom: 10px;
              &:hover{
                color: var(--color_primary);
              }
            }
          }
        }
      }
    }
  }
 
  
}
</style>