<template>
  <section class="hero is-primary is-fluid">
    <h2 class="title">Entrar no cevas</h2>
    <h2 class="subtitle">May the hops be with you</h2>
    <form class="hero-body container" ref="form">
      <b-field>
        <b-input type="text" v-model="email" placeholder="email"/>
      </b-field>
      <b-field>
        <b-input type="password" v-model="password" placeholder="senha"/>
      </b-field>
      <button class="button is-primary is-inverted is-medium" type="submit" v-on:click="signIn">Entrar</button>
      <br>
      <br>
      <button class="button is-inverted" v-on:click="googleSignIn">
          <b-icon icon="google"></b-icon>
          <span>Entrar com o Google</span>
      </button>
      <br>
      <br>      
     
      <br>
      <p>Outras opções: </p>
      <router-link class="button is-success" to="/sign-up">Criar uma conta agora </router-link>
      <router-link class="button is-infos" to="/reset-password">Esqueci minha senha </router-link>
    </form>
  </section>
</template>

<script>
import firebase from '../firebase/';
export default {
  name: 'login',
  data: function() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    submit: function() {
      this.$refs.form.submit();
    },
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            console.log(user);
            this.$toast.open('Entrou');
            this.$router.replace('reviews');
          },
          err => {
            this.$toast.open('Oops. ' + err.message);
          }
        );
    },
    googleSignIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(result => {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);
        this.$toast.open('Entrou');
        console.log(user);
        this.$router.replace('reviews');
        // ...
      }).catch( err => {
        // Handle Errors here.
        this.$toast.open('Oops. ' + err.message);
        var errorCode = err.code;
        var errorMessage = err.message;
        // The email of the user's account used.
        var email = err.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = err.credential;
        // ...
      });
    }
  }
};
</script>

