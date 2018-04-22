<template>
  <section class="container">
    <h2 class="subtitle has-text-primary">entrar no cevas</h2>
    <form v-on:submit.prevent="onSubmit">
      <b-field>
        <b-input type="text" v-model="email" placeholder="email"/>
      </b-field>
      <b-field>
        <b-input type="password" v-model="password" placeholder="senha"/>
      </b-field>
      <button class="button is-primary" type="submit" v-on:click="signIn">entrar</button>
      <br>
      <br>
      <p>você pode <router-link to="/sign-up">criar uma conta</router-link></p>
      <p>esqueci minha senha</p>
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
    signIn: function() {
      const comp = this;
      debugger;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            console.log(user);
            this.$router.replace('beers');
          },
          err => {
            comp.$toast('Oops. ' + err.message);
          }
        );
    }
  }
};
</script>

