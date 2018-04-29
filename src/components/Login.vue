<template>
  <section class="hero is-primary is-fluid">
    <h2 class="title">Entrar no cevas</h2>
    <h2 class="subtitle">May the hops be with you</h2>
    <form class="hero-body" ref="form">
      <b-field>
        <b-input type="text" v-model="email" placeholder="email"/>
      </b-field>
      <b-field>
        <b-input type="password" v-model="password" placeholder="senha"/>
      </b-field>
      <button class="button is-primary is-inverted is-medium" type="submit" v-on:click="signIn">Entrar</button>
      <br>
      <br>
      <p>Outras opções: </p>
      <router-link class="button is-success" to="/sign-up">Criar uma conta agora </router-link>
      <router-link class="button is-infos" to="/sign-up">Esqueci minha senha </router-link>
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
      const comp = this;

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
    }
  }
};
</script>

