import { createStore } from 'vuex'

export default createStore({
  state: {
    offer:[]
  },
  mutations: {
    offer(state,o){
      state.offer=o;
    }
  },
  actions: {
  },
  modules: {
  }
})
