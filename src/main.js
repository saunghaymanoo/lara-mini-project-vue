import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/material-dashboard.css';
import { Bar } from 'vue-chartjs'

Vue.config.productionTip = false

// require('./assets/pages/waves/css/waves.min.css');
// require('./assets/css/jquery.mCustomScrollbar.css');
// require('./assets/css/style.css');


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
