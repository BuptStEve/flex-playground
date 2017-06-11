/**
 * @Author: steve
 * @Date:   2017-Jun-10 11:45:13
 * @Last modified by:   steve
 * @Last modified time: 2017-Jun-10 12:21:27
 */

import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/components/Container'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Container',
      component: Container,
    },
  ],
})
