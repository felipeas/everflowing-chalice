<template>
<div>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <p class="title">Todas avaliações</p> <p class="subtitle">As mais diversas cervejas de todo mundo</p>
      </div>
    </div>
  </section>
  <section class="container is-fluid is-centered">
    <div class="columns is-multiline is-centered">
        <div
          class="column is-one-quarter-desktop review" 
          v-for="review in sortedList" 
          v-bind:key="review['.key']"
          v-on:click="loadComments(review)"
        >
          <div class="review-beer-img" :style="{ backgroundImage: `url('${review.image}')` }"></div>
          <p class="subtitle">{{review.date? new Date(review.date).toLocaleString('pt-BR'): ''}}</p>
          <star-rating :inline="true" :star-size="20" :read-only="true" :show-rating="false" v-model="review.rating"></star-rating> {{review.rating}}
          <p class="subtitle">{{review.beer}}</p>
          <div class="comment">
            <p class="subtitle">{{review.comment}}</p>
          </div>
        </div>

        <b-modal :active.sync="isModalOpen" :width="960" scroll="keep">
            <div class="">
              <div class="card post">
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
              <comments className="comments" :review="review['.key']"/>
            </div>
        </b-modal>
    </div>
  </section>

  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <p class="title">Não encontrou a avaliação que procurava? </p>
        <p class="subtitle">Cadastre agora mesmo a sua!</p>
        <router-link class="button is-primary is-inverted" to="/new-review">Adicionar avaliação</router-link>
      </div>
    </div>    
  </section>
</div>
</template>

<style scoped>
.review {
  padding: 16px;
  margin: 16px;
}

.modal-review {
  padding-right: 325px;
  width: 960px;
}

.post {
  width: 640px;
}

.comments {
  width: 320px;
}
.comment {
  height: 150px;
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
import Comments from '@/components/Comments';

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
    };
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
  computed: {
    // a computed getter
    sortedList: function() {
      // `this` points to the vm instance
      return this.reviews.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    }
  },
  methods: {
    loadComments: function(review) {
      this.isModalOpen = true;
      this.review = review;
    }
  },
  components: {
    StarRating,
    Comments
  }
};
</script>

