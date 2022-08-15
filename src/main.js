import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

import axios from 'axios'

const axiosConfig = {
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 30000,
  
};
Vue.prototype.$url_domain = 'http://localhost:8000'
Vue.prototype.$axios = axios.create(axiosConfig)


import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast, {
  // One of the options
  position: 'bottom'
})
import store from './store/index'
import router from './routes/index'

new Vue({
  vuetify,
  store: store,
  router,
  render: h => h(App)
}).$mount('#app')
