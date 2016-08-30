'use strict'

import 'lib-flexible'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import FastClick from 'fastclick'

import routerMap from './routers/index'
import filters from './filters'
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]))

// import App from './App'
let App = Vue.extend({})
Vue.use(VueRouter)
Vue.use(VueResource)

FastClick.attach(window.document.body)

let router = new VueRouter({
  hashbang: false,
  history: true
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

routerMap(router)

router.start(App, '#app')
