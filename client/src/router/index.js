import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Library from '../views/Library.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        next('/library');
      } else {
        next();
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        next('/library');
      } else {
        next();
      }
    },
  },
  {
    path: '/library',
    name: 'Library',
    component: Library,
    beforeEnter: (to, from, next) => {
      if (!localStorage.token) {
        next('/login');
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes,
});

export default router;
