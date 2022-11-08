import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import common from './modules/common'
import dict from './modules/dict'
import logs from './modules/logs'
import tags from './modules/tags'
import user from './modules/user'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    common,
    logs,
    tags,
    dict,
  },
  getters,
})

export default store
