import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

import axios from 'axios'

//const domain = "https://apicontrol.seeders.pe"

const domain = "http://localhost:8000"

const axiosConfig = {
  baseURL: domain + '/api/',
  timeout: 30000,

};
Vue.prototype.$url_domain = domain
Vue.prototype.$axios = axios.create(axiosConfig)


Vue.prototype.$axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
    window.location = '/login';
    localStorage.clear();
  } else {
    return Promise.reject(error);
  }
});

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import VueParticlesBg from "particles-bg-vue";
 
Vue.use(VueParticlesBg);

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
