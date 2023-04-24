import { createStore } from 'vuex'

import app from './modules/app'
import quickentry from './modules/quickentry'
import getters from './getters'
import implement from './modules/implement'
export default createStore({
  modules: {
    app,
    quickentry,
    implement
  },
  getters
})
