import { getToken } from '@/utils/cookie'

const implement = {
  state: {
    scpSourceFile: {name: '', address:'', ci: '', version: ''},
  },

  mutations: {
    SET_SCP_SOURCE_FILE: (state, scpSourceFile) => {
      state.scpSourceFile = scpSourceFile
    },

  },
  actions: {
    setScpSourceFile: ({ commit }, scpSourceFile) => {
      commit('SET_SCP_SOURCE_FILE', scpSourceFile)
    }
  }
}

export default implement
