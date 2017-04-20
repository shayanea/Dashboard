import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/about',
      name: 'About',
      component: About 
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
