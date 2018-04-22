import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Home from '@/components/Home';
import Beers from '@/components/Beers';
import Reviews from '@/components/Reviews';
import AddReview from '@/components/AddReview';
import SignUp from '@/components/SignUp';
import firebase from '../firebase/';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/beers',
      name: 'Beers',
      component: Beers,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/reviews',
      name: 'Reviews',
      component: Reviews,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new-review',
      name: 'Review',
      component: AddReview,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  console.log('beforeEach-router');

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('beers');
  else next();
});

export default router;
