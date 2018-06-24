 
<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <p class="title">Forum</p> <p class="subtitle">Nova postagem</p>
        </div>
      </div>
    </section>

    <section class="hero">
      <div class="hero-body">
    
        <b-field>
          <b-input type="text" v-model="message.subject" placeholder="Assunto"/>
        </b-field>

        <b-field>
          <b-input type="textarea" v-model="message.text" placeholder="Texto"/>
        </b-field>

        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <button class="button is-info" v-on:click="addMessage">Adicionar</button>
            </div>
            <div class="level-item">
              <router-link class="button is-danger" to="/forum">Cancelar</router-link>
            </div>
          </div>
        </nav>
          
        
      </div>
    </section>
  </div>
</template>
<script>
import firebase, { db } from '../firebase/';

export default {
  name: 'messages',
  data: function() {
    return {
      message: {
        subject: '',
        text: '',
        user: '',
        uid: '',
        views: 0,
        replies: 0,
        date: new Date().getTime()
      }
    };
  },

  firebase: {
    messages: {
      source: db.ref('messages'),
      // Optional, allows you to handle any errors.
      cancelCallback(err) {
        console.error(err);
      }
    }
  },

  methods: {
    ///breweries
    addMessage: function() {
      // https://firebase.google.com/docs/reference/js/firebase.database.Reference#push
      const message = {
        subject: this.message.subject,
        text: this.message.text,
        user: firebase.auth().currentUser.email,
        uid: firebase.auth().currentUser.uid,
        views: this.message.views,
        replies: this.message.replies,
        date: new Date().getTime()
      };

      this.$firebaseRefs.messages.push(message);

      this.$router.replace('forum');
    }
  }
};
</script>

