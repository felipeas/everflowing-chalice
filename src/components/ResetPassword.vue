<template>
  <section class="hero is-primary is-fluid">
    <h2 class="title">Resetar Senha</h2>
    <h2 class="subtitle"></h2>
    <form class="hero-body container" ref="form">
      <b-field>
        <b-input type="text" v-model="email" placeholder="email"/>
      </b-field>
  
      <button class="button is-primary is-inverted is-medium" type="submit" v-on:click="resetPass">Resetar minha senha</button>
      <br>
      <br>
      <p>Outras opções: </p>
      <router-link class="button is-success" to="/sign-up">Criar uma conta agora</router-link>
      
    </form>
  </section>
</template>

<script>
import firebase from '../firebase/';
export default {
  name: 'ResetPassword',
  data: function() {
    return {
      email: ''
    };
  },
  methods: {
    submit: function() {
      this.$refs.form.submit();
    },
    resetPass() {
      firebase.auth().languageCode = 'pt-BR';

      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(
          user => {
            console.log(user);
            this.$toast.open('Acessa seu email lá ;)');
            this.$router.replace('login');
          },
          err => {
            this.$toast.open('Oops. ' + err.message);
          }
        );
    }
  }
};
</script>

