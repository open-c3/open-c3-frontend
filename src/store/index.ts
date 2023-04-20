import { createStore } from 'vuex'

import app from './modules/app'
import quickentry from './modules/quickentry'
import getters from './getters'
export default createStore({
  modules: {
    app,
    quickentry
  },
  getters
})
