# open-c3-frontend

## 项目介绍

> open-c3-frontend是OPEN-C3运维平台的前端项目，主要是为open-c3 运维平台提供可视化操作入口。

## 项目结构

```docs
├── public                          //  静态资源目录
│   ├── index.html                  //  入口 HTML 文件
│   └── favicon.ico                 //  网站图标
├── src                             //  源代码目录
│   ├── api                         //  项目请求的Api接口
│   │   ├── interface               //  项目请求参数定义的类型
│   ├── assets                      //  图片、字体等资源文件
│   ├── components                  //  公共组件
│   ├── router                      //  路由配置
│   ├── store                       //  Vuex 状态管理器
│   ├── views                       //  视图
│   ├── App.vue                     //  根组件
│   └── main.js                     //  入口 JS 文件
├── .babelrc                        //  Babel 配置文件
├── package.json                    //  依赖包管理文件
├── tsconfig.json                   //  Typescript编译配置文件
├── tsconfig.node.json              //  Typescript变异Node配置文件
├── vite.config.json                //  Vite构建器配置项目文件
└── README.md                       //  项目说明文档
```

## 安装与运行 🔧

- npm `JS包管理工具`
- vite `构建工具`

### 安装依赖

npm install

### 运行项目

npm run dev

## 技术栈 🛠️

> open-c3-frontend项目基于 [Vite](https://cn.vitejs.dev/)搭建，框架使用的是[Vue3](https://cn.vuejs.org/)+ [TypeScript](https://www.tslang.cn/)开发。

- [Vue.js](https://cn.vuejs.org/ "Vue中文文档")
- [Vite中文文档](https://cn.vitejs.dev/ "Vite官方中文文档")
- [Vuex](https://vuex.vuejs.org/zh/ "VueJS的状态管理工具")
- [TypeScript](https://www.tslang.cn/ "TypeScript官网")
  tips: 关于Typescript的使用 更多地参考了[TypeScript入门教程](https://ts.xcatliu.com/)，文档很详细，也很容易理解。
- [Vue Router](https://router.vuejs.org/zh/ "Vue路由")
- Axios

## 已开发模块 ✅

> 由于项目重构仍在进行中，目前暂时开发完成部分功能， 后续功能会持续补充跟进～

- 用户注册与登录
- 仪表盘模块
- CMDB模块
- 监控模块
- 流水线模块
- 快速执行模块
  1. 启动任务功能
  2. 脚本执行操作
  3. 分发文件功能
  4. 发起审批功能
- 业务管理模块
  1. 账户管理模块
  2. 文件管理模块
  3. 机器分组模块
  4. 机器分批模块
  5. 机器管理模块
  6. 报警通知模块
  7. 变量查看模块
- 个人中心模块
  1. 我的收藏夹模块
  2. 我的审批模块
  3. 我的ACK模块
  4. 告警事件模块
  5. 操作协助模块
  6. 我的凭据模块
  7. 我的镜像模块
  8. 版本信息模块

## 未来开发计划 👨‍💻

> 项目持续开发中，未来我们会将功能逐步补齐完善，使得项目功能变得更加健全，提供更为完善的功能。

- 快速执行模块
  1. 发起审批功能实现
  2. 虚拟终端功能上线
  3. 文件发送功能实现
- 业务管理模块
  1. 作业管理模块功能实现
  2. 脚本管理模块功能补全
  3. 定时作业功能实现
  4. 代理设置（AGENT安装）功能实现
  5. 变量查看功能实现
- 执行历史模块
  1. 虚拟终端模块功能实现
  2. BPM任务功能实现
- 轻应用模块功能实现
- BPM模块功能实现
- 报告模块功能实现
- 其他工具模块功能实现
- 容器集群模块功能实现
- 工单模块功能实现

## 与后端对接 🔗

> 目前项目请求后端主要是通过vite.config.ts配置文件中的proxy（代理）属性来配置需要访问的后端地址进行访问。
