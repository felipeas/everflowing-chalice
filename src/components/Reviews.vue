<template>
<div>
  <section class="hero">
      <div class="hero-body">
        <div class="container">
          
          <router-link class="button is-primary" to="/new-review">adicionar avaliação</router-link>
        </div>
      </div>
      
    </section>
  <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <p class="title">todas avaliações</p> <p class="subtitle">cervejas de todo brasil</p>
        </div>
      </div>
      
    </section>
    <section class="container is-fluid">
      <div class="columns is-multiline">
        <div class="column is-one-quarter-desktop review" v-for="review in reviews" v-bind:key="review['.key']">
          <div class="beer-img" :style="{ backgroundImage: `url('${review.image}')` }"></div>
          
          <p class="subtitle">{{review.beer}}</p>
          <p class="subtitle">{{review.coment}}</p>
          <star-rating :inline="true" :star-size="20" :read-only="true" :show-rating="false" v-model="review.rating"></star-rating> {{review.rating}}
        </div>



        <!-- <div class="column is-one-third" >

          <article class="tile is-child notification">
          <p class="title">{{review.beer}}</p>
          <p class="subtitle">{{review.coment}}</p>
          <figure class="image is-4by3">
           <img :src="review.image" alt="Placeholder image">
          </figure>
        </article> -->
          
        
      </div>
    </section>
    
  </div>
</template>



<style scoped>
.review {
  margin-top: 30px;
  background-color: hsl(0, 0%, 98%);
}

.beer-img {
  height: 400px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>


<script>
import { db } from '../firebase/';
import StarRating from 'vue-star-rating';

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
  },
  components: {
    StarRating
  }
};
</script>

