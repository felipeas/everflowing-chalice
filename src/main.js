// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App';
import router from './router';
import VueFire from 'vuefire';
import firebase from './firebase';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

Vue.config.productionTip = false;
Vue.use(VueFire);
Vue.use(Buefy);

console.log(process.env);
let app;
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: {
        App
      },
      router
    });
  }
});
