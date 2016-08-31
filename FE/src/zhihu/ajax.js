'use strict'

import Vue from 'vue'

module.exports = (params) => {
  Vue.http.options.heads = {
    'Content-Type': 'application/x-www-from-urlencoded;charset=UTF-8;'
  }
  Vue.http.options.emulateJSON = true
  Vue
    .http({
      url: params.url,
      method: params.method,
      data: params.data || {}
    })
    .then((response) => {
      let data = response.data
      params.callback(data)
    }, (err) => {
      console.log(err)
    })
}
