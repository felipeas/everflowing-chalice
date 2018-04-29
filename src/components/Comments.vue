<template>
<section class="comment-section">
  <div
    class="comment"
    v-for="c in comments" 
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
            <strong>{{c.user}}</strong>
            <br>
            {{c.comment}}
            <br>
            <small><a>Like</a> · <a>Reply</a> · {{c.date? new Date(c.date).toLocaleString('pt-BR'): ''}} </small>
          </p>
        </div>
      </div>
    </article>
  </div>

  <article class="media is-white">
    <figure class="media-left">
      <b-icon
        icon="account"
        size="is-large"
      >
      </b-icon>
    </figure>
    <div class="media-content">
      <b-field >
        <b-input type="textarea" v-model="comment.comment" placeholder="Escreva seu comentário"/>
      </b-field>
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <button class="button is-info" @click="addComment(review)">Comentar</button>
          </div>
        </div>
      </nav>
    </div>
  </article>
</section>
</template>
<style>
.comment-section {
  background-color: white;
  padding: 32px;
}

.comment {
  padding-bottom: 15px;
}
</style>

<script>
import firebase, { db } from '../firebase/';
const commentsRef = db.ref('comments');

export default {
  name: 'comments',
  props: ['review', 'className'],
  data: function() {
    console.log(this);
    return { comment: {} };
  },
  firebase: {
    comments: {
      source: commentsRef,
      // Optional, allows you to handle any errors.
      cancelCallback(err) {
        console.error(err);
      }
    }
  },

  methods: {
    ///breweries
    addComment: function(reviewKey) {
      console.log(firebase.auth().currentUser);

      // https://firebase.google.com/docs/reference/js/firebase.database.Reference#push
      const comment = {
        comment: this.comment.comment,
        user: firebase.auth().currentUser.email,
        uid: firebase.auth().currentUser.uid,
        date: new Date().getTime()
      };

      db.ref('comments/' + this.review).push(comment);

      this.comment.comment = '';
    }
  },
  // Explicitly set binding data to firebase as an array.
  created() {
    console.log(this.review);
    this.$bindAsArray('comments', db.ref('comments/' + this.review + '/'));
  }
};
</script>

