import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import About from '@/components/About'
import AddProject from '@/components/AddProject'
import EditProject from '@/components/EditProject'
import Project from '@/components/Project'
import Contact from '@/components/Contact'
import Setting from '@/components/Setting'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: About 
    },
    {
      path: '/about',
      name: 'About',
      component: About 
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/project',
      name: 'Project',
      component: Project
    },
    {
      path: '/addproject',
      name: 'AddProject',
      component: AddProject
    },
    {
      path: '/editproject/:id',
      name: 'EditProject',
      component: EditProject
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.path != '/login') {
      if(localStorage.getItem('Authorization') !== null) { 
          next();
      } else {
          next('login');
      }
  } else {
      next();
  }
});

export default router;
