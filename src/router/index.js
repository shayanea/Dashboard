import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Logo from '@/components/Logo'
import Menu from '@/components/Menu'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Menu 
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
