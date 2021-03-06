'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import routerMap from './routers'
// import App from './App'
let App = Vue.extend({})
Vue.use(VueRouter)
Vue.use(VueResource)

let router = new VueRouter({
  hashbang: false,
  history: true,
  saveScrollPosition: false,
  transitionOnLoad: true
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

routerMap(router)

router.start(App, '#app')
