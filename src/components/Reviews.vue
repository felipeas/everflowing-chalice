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
        <div
          class="column is-one-quarter-desktop review" 
          v-for="review in reviews" 
          v-bind:key="review['.key']"
          v-on:click="loadComments(review)"
        >
          <div class="review-beer-img" :style="{ backgroundImage: `url('${review.image}')` }"></div>
          <p class="subtitle">{{review.date? new Date(review.date).toLocaleString(): ''}}</p>
          <star-rating :inline="true" :star-size="20" :read-only="true" :show-rating="false" v-model="review.rating"></star-rating> {{review.rating}}
          <p class="subtitle">{{review.beer}}</p>
          <div class="comment">
            <p class="subtitle">{{review.comment}}</p>
          </div>
        </div>

        <b-modal :active.sync="isModalOpen" :width="640">
            <div class="card">
              <div class="review-detail-beer-img" :style="{ backgroundImage: `url('${review.image}')` }"></div>
              <div class="card-content">
                  <div class="media">
                      <div class="media-content">                      
                          <p class="title is-4">{{review.beer}}</p>
                          <p class="subtitle is-6"><star-rating :inline="true" :star-size="20" :read-only="true" :show-rating="false" v-model="review.rating"></star-rating> {{review.rating}}</p>
                      </div>
                  </div>

                  <div class="content">
                      {{review.comment}}
                  </div>
              </div>
            </div>
        </b-modal>
    </div>
  </section>
</div>
</template>



<style scoped>
.review {
  margin-top: 30px;
  background-color: hsl(0, 0%, 98%);
}

.comment {
    height: 90px; /* new */
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;    
    margin: 0; 
}

.review-beer-img {
  height: 400px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.review-detail-beer-img {
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
  data() {
    return {
      isModalOpen: false,
      review: {}
    }
  },
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
  methods: {
    loadComments: function(review) {
      this.isModalOpen = true;
      this.review = review;
    }
  },
  components: {
    StarRating
  }
};
</script>

