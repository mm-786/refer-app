import { createStore } from 'vuex'

export default createStore({
  state: {
    offer:[],
    claim:false,
  },
  mutations: {
    offer(state,o){
      state.offer=o;
    },
    claim(state,b){
      state.claim=b;
    }
  },
  actions: {
  },
  modules: {
  }
})
