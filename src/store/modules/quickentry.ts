import { getToken } from '@/utils/cookie'

const quickentry = {
  state: {
    selectName: '', // 流水线选中的名称
    selectIpArray: [], // 机器ip选择的数据
    selectGroupArray: [], // 机器分组选择的数据
    variableArray: '', // 选择变量数据
    customArray: '', // 手写IP数据

    
  },
  mutations: {
    SET_SELECT_NAME: (state, name) => {
      state.selectName = name
    },
    SET_SELECT_IP_ARRAY: (state, array) => {
      state.selectIpArray = array
    },
    SET_SELECT_GROUP_ARRAY: (state, group) => {
      state.selectGroupArray = group
    },
    SET_VARIABLE_ARRAY: (state, variable) => {
      state.variableArray = variable
    },
    SET_CUSTOM_ARRAY: (state, variable) => {
      state.customArray = variable
    }

  },
  actions: {
    setSelectName: ({ commit }, name) => {
      commit('SET_SELECT_NAME', name)
    },
    setSelectIpArray: ({commit}, array) => {
      commit('SET_SELECT_IP_ARRAY', array)
    },
    setSelectGroupArray: ({commit}, array) => {
      commit('SET_SELECT_GROUP_ARRAY', array)
    },
    setVariableArray: ({commit}, value) => {
      commit('SET_VARIABLE_ARRAY', value)
    },
    setCustomArray: ({commit}, value) => {
      commit('SET_CUSTOM_ARRAY', value)

    }
  }
}

export default quickentry
