<template>
<div>
  <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <p class="title">avaliações</p> <p class="subtitle">cervejas de todo brasil</p>
        </div>
      </div>
      
    </section>
    <section class="container">
      <div class="columns">
        <div class="column is-one-third" v-for="review in reviews" v-bind:key="review['.key']">

          <article class="tile is-child notification">
          <p class="title">{{review.beer}}</p>
          <p class="subtitle">{{review.coment}}</p>
          <figure class="image is-4by3">
           <img :src="review.image" alt="Placeholder image">
          </figure>
        </article>
          
        </div>
      </div>
    </section>
    <section class="container">
      <table class="table is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>nome</th>
            <th>cervejaria</th>
            <th>ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="review in reviews" v-bind:key="review['.key']">
            <td>{{ review.beer }}</td>
            <td>{{ review.rating }}</td>
            <td>
              <a v-on:click="removeReview(review)" class="delete is-medium"></a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <p class="title">avaliações</p> <p class="subtitle">avaliações</p>
          <router-link class="button is-primary is-inverted" to="/new-review">adicionar avaliação</router-link>
        </div>
      </div>
      
    </section>
  </div>
</template>
<script>
import { db } from '../firebase/';

/*\
pastas firebase
  brewery >
    reviews  >
      user  >
        reviews
*/

export default {
  name: 'reviews',
  firebase: {
    reviews: {
      source: db.ref('reviews'),
      // Optional, allows you to handle any errors.
      cancelCallback(err) {
        console.error(err);
      }
    },
    methods: {
      removeReview: function(review) {
        // https://firebase.google.com/docs/reference/js/firebase.database.Reference#remove
        this.$firebaseRefs.reviews.child(review['.key']).remove();
      }
    }
  }
};
</script>

