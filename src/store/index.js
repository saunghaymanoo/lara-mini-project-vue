
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl:'http://127.0.0.1:8000/api',
    auth : null,
    token : null,
  },
  getters: {
    getUrl : (state)=>(uri)=> state.apiUrl+uri,
  },
  mutations: {
  },
  actions: {
    setAuth:({state},auth)=>{state.auth=auth},
    setToken({state},token){
      return state.token = token;
    },
    logout({state}){
      state.auth = null,
      state.token = null,
      localStorage.setItem('auth',null);
      localStorage.setItem('token',null);
    },
    
  },
  modules: {
  }
})
