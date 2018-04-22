<template>
  <section class="container">
    <h2 class="subtitle has-text-primary">criar conta</h2>
      <!-- <b-field>
        <b-input type="text" v-model="name" placeholder="nome"/>
      </b-field>   -->
      <b-field>
        <b-input type="text" v-model="email" placeholder="email"/>
      </b-field>  
      <b-field>
        <b-input type="password" v-model="password" placeholder="senha"/>
      </b-field>
      <b-field>
        <b-input type="password" v-model="cpassword" placeholder="confirme senha"/>
      </b-field>
    <button class="button is-primary" type="submit" v-on:click="signUp">entrar</button>
    <p>você pode <router-link to="/login">voltar para o login</router-link></p>
  </section>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'signUp',
  data: function() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.replace('home');
          },
          err => {
            this.$toast('Oops. ' + err.message);
          }
        );
    }
  }
};
</script>
