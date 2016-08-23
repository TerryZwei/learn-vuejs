'use strict'

import Vue from 'vue'
import Vue_Router from 'vue-router'
import Vue_Resource from 'vue-resource'

import routerMap from './routers'
// import App from './App'
let App = Vue.extend({});
Vue.use(Vue_Router);
Vue.use(Vue_Resource);

let router = new Vue_Router({
    hashbang: true,
    history: false,
    saveScrollPosition: false,
    transitionOnLoad: true
})

router.beforeEach(function(){
    window.scrollTl(0, 0);
})

routerMap(router);

router.start(App, '#app')