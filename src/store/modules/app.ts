// 全局的变量

// import { getUserMenus, userPerm } from '@/api'

import { getToken } from '@/utils/cookie'

// import { dealMenus } from '@/utils/index'
// import staticMenu from '@/utils/menuStatic'


const app = {
  state: {
    locale: 'zhCn', // 当前语言
    loading: false, // 全局loading
    theme: 'light',
    token: getToken(),
    userInfo: null, // 当前用户信息
    userName: '', // 当前用户的名称
    treeId: 4000000000, // 默认选中的服务树
    treeData: { id: 4000000000, name: 'private' },
    treeArray: [],
  },
  mutations: {
    SET_LOCALE: (state, locale) => {
      state.locale = locale
    },
    SET_LOADING: (state, loading) => {
      state.loading = loading
    },
    SET_THEME: (state, theme) => {
      state.theme = theme
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_INFO: (state, info) => {
      state.userInfo = info
    },
    SET_USER_NAME: (state, name) => {
      state.userName = name
    },
    SET_TREEID: (state, treeId) => {
      state.treeId = treeId
    },
    SET_TREEDATA: (state, data) => {
      state.treeData = data
    },
    SET_TREEARRAY: (state, data) => {
      state.treeArray = data
    },

  },
  actions: {
    setLocale: ({ commit }, locale) => {
      commit('SET_LOCALE', locale)
    },
    setLoading: ({ commit }, loading) => {
      commit('SET_LOADING', loading)
    },
    setTheme: ({ commit }, theme) => {
      commit('SET_THEME', theme)
    },
    setToken: ({ commit }, token) => {
      commit('SET_TOKEN', token)
    },
    setUserInfo: ({ commit }, info) => {
      commit('SET_USER_INFO', info)
    },
    setUserName: ({ commit }, name) => {
      commit('SET_USER_NAME', name)
    },
    setTreeId: ({ commit }, treeId) => {
      commit('SET_TREEID', treeId)
    },
    setTreeData: ({ commit }, data) => {
      commit('SET_TREEDATA', data)
    },
    setTreeArray: ({ commit }, data) => {
      commit('SET_TREEARRAY', data)
    }

  }
}

export default app
