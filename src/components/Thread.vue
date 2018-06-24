<template>

<section class="container">

  <article class="media thread">
      <figure class="media-left">
        <b-icon
          icon="account"
          size="is-large"
        >
        </b-icon>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <span>{{message.date? new Date(message.date).toLocaleString('pt-BR'): ''}} </span>            
            <strong>{{message.subject}}</strong>
            <br>
            {{message.text}}
            <br>
          </p>
        </div>
      </div>
    </article>
  

    <div
      class="reply"
      v-for="c in replies" 
      v-bind:key="c['.key']"
    >
    <article class="media">
        <figure class="media-left">
          <b-icon
            icon="account"
            size="is-large"
          >
          </b-icon>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <span>{{c.date? new Date(c.date).toLocaleString('pt-BR'): ''}} </span>
              <strong>{{c.user}}:</strong>
              {{c.text}}
              
            </p>
          </div>
        </div>
      </article>
    </div>
    
    <article class="media is-white reply-box">
      <figure class="media-left">
        <b-icon
          icon="account"
          size="is-large"
        >
        </b-icon>
      </figure>
      <div class="media-content">
        <b-field >
          <b-input type="textarea" v-model="reply.text" placeholder="Escreva sua resposta"/>
        </b-field>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <button class="button is-info" @click="addReply(message)">Comentar</button>
            </div>
          </div>
        </nav>
      </div>
    </article>

</section>
</template>
<style>
.thread {
  margin: 32px;
}
.reply, .reply-box {
  padding-left: 64px;
}

</style>

<script>
import firebase, { db } from '../firebase/';
const repliesRef = db.ref('replies');
const messagesRef = db.ref('messages');

export default {
  name: 'thread',
  data: function() {
    console.log(this);
    return { reply: {} };
  },
  firebase: {
    replies: {
      source: repliesRef,
      // Optional, allows you to handle any errors.
      cancelCallback(err) {
        console.error(err);
      }
    },
    messages: {
      source: messagesRef,
      // Optional, allows you to handle any errors.
      cancelCallback(err) {
        console.error(err);
      }
    }
  },

  methods: {
    ///breweries
    addReply: function(message) {
      console.log(firebase.auth().currentUser);

      // https://firebase.google.com/docs/reference/js/firebase.database.Reference#push
      const reply = {
        text: this.reply.text,
        user: firebase.auth().currentUser.email,
        uid: firebase.auth().currentUser.uid,
        date: new Date().getTime()
      };

      db.ref('replies/' + this.$route.params.id).push(reply);
  
      const copy = {...message}
      copy.replies +=1;
      delete copy['.key']
      db.ref('messages/' + this.$route.params.id).set(copy);
      

      this.reply.text = '';
    }
  },
  mounted() {
    const copy = {...this.message}
    copy.views += 1;
    // remove the .key attribute
    delete copy['.key']
    this.$firebaseRefs.messages.child(this.$route.params.id).set(copy)
  },
  created() {
    console.log(this.$route.params.id)

    this.$bindAsObject('message', db.ref('messages/' + this.$route.params.id));
    
    this.$bindAsArray(
      'replies',
      db.ref('replies/' + this.$route.params.id + '/')
    );

  }
};
</script>

