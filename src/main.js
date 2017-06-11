/**
 * @Author: steve
 * @Date:   2017-Jun-10 11:45:13
 * @Last modified by:   steve
 * @Last modified time: 2017-Jun-10 12:10:58
 */

import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
