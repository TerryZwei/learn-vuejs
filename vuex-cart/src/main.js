import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import { currency } from './currency'
import store from './store'

Vue.filter('currency', currency)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
