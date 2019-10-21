import '@babel/polyfill'
import 'mutationobserver-shim'  
import Vue from 'vue';
import './plugins/bootstrap-vue'
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faGrinHearts } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import moment from 'moment'




library.add(faCoffee)

library.add(faGrinHearts)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.filter('formatDate', function(value: string) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});

const base = axios.create({
  baseURL: 'https://conduit.productionready.io'
})
Vue.config.productionTip = false;

//Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
Vue.prototype.$http = base;

