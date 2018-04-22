<template>
  <header class="navbar header is-primary is-transparent is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item is-hoverable" to="/">
          <h2 class="button is-primary is-inverted">cevas</h2>
        </router-link>
        <div class="navbar-burger burger" @click="toggleMenu" :class="{'is-active': navIsActive}" data-target="mainNav">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="mainNav" class="navbar-menu" :class="{'is-active': navIsActive}">
        <div class="navbar-start">
          <!-- <router-link class="navbar-item is-hoverable" to="/breweries">cervejarias</router-link> -->
          <router-link class="navbar-item has-text-white-ter is-hoverable" to="/beers">cervejas</router-link>
          <router-link class="navbar-item has-text-white-ter is-hoverable" to="/reviews">reviews</router-link>
        </div>

        <div class="navbar-end">
          <!-- <router-link class="navbar-item is-hoverable" to="/breweries">cervejarias</router-link> -->
            <div v-if="user != null" class="navbar-item has-dropdown is-hoverable">
              <router-link class="navbar-item has-text-white-ter is-hoverable" to="/home">usuário</router-link>
              <div class="navbar-dropdown is-boxed">
                <a class="navbar-item" v-on:click="signOut">sair</a>
              </div>
            </div>
            <router-link v-else class="navbar-item is-hoverable" to="/login">entrar</router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import firebase from '../firebase/';
export default {
  name: 'navbar',
  data() {
    console.log(firebase.auth().currentUser);
    return {
      navIsActive: false,
      user: firebase.auth().currentUser
    };
  },
  mounted: function() {
    var nav = this;

    firebase.auth().onAuthStateChanged(function(user) {
      nav.refresh(user);
    });
  },
  methods: {
    refresh: function(user) {
      this.user = user;
    },
    toggleMenu: function() {
      this.navIsActive = !this.navIsActive;
    },
    signOut: function() {
      firebase
        .auth()
        .signOut()
        .then(
          () => {
            console.log('logout');
            this.$router.replace('login');
          },
          err => {
            this.$toast('Oops. ' + err.message);
          }
        );
    }
  }
};
</script>
