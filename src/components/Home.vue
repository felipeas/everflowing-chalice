<template>
  <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <p class="title">{{msg}}</p> 
          <p class="subtitle">{{user}}</p>
          <a class="button is-primary is-inverted" v-on:click="signOut">sair</a>
        </div>
      </div>
  </section>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'home',
  data() {
    return {
      msg:
        '"Some miners would have 20 pints after a hard day in the mine. Now that we sit behind computers all day, this is down to 18 or 19 pints."',
      user: firebase.auth().currentUser.email
    };
  },

  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login');
        });
    }
  }
};
</script>

