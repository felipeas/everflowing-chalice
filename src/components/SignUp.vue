<template>
  

    <section class="hero is-primary is-fluid">
    <h2 class="title">Criar conta</h2>
    <h2 class="subtitle">Preencha os dados abaixo</h2>
    <form class="hero-body" ref="form">
      <b-field>
        <b-input type="text" v-model="email" placeholder="email"/>
      </b-field>
      <b-field>
        <b-input type="password" v-model="password" placeholder="senha"/>
      </b-field>
      <b-field>
        <b-input type="password" v-model="cpassword" placeholder="confirme senha"/>
      </b-field>
      <button class="button is-primary is-inverted is-medium" type="submit" v-on:click="signUp">Criar</button>
      <br>
      <br>
      <p>Outras opções: </p>
      <router-link class="button is-success" to="/login">Voltar para o login </router-link>
      <router-link class="button is-info" to="/sign-up">Esqueci minha senha </router-link>
    </form>
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
    submit: function() {
      this.$refs.form.submit();
    },
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.replace('reviews');
          },
          err => {
            this.$toast('Oops. ' + err.message);
          }
        );
    }
  }
};
</script>
