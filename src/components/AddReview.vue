 
<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <p class="title">Avaliação</p> <p class="subtitle">Nova avaliação</p>
        </div>
      </div>
    </section>

    <section class="hero">
      <div class="hero-body">
        <b-field label="">
        </b-field>
        <b-field label="">
            <b-autocomplete
            field="name"
                v-model="review.beer"
                :data="filteredDataArray"
                placeholder="Pesquise pela cervejaria ou pelo nome da cerveja"
                icon="magnify"
                @select="option => selected = option">
                <template slot="empty">Cerveja não encontrada</template>
            </b-autocomplete>
        </b-field>

        <b-field>
          <star-rating class="has-text-centered" v-model="review.rating"></star-rating>
        </b-field>

        <b-field>
          <button class="button is-primary" @click="onPickFile">selecionar foto</button>
          <input 
            type="file" 
            style="display:none" 
            ref="fileInput" 
            accept="image/*"
            @change="onFilePicked"
          />
        </b-field>

        <b-field>
          <img :src="review.image" style="height:200px">
        </b-field>

        <b-field>
          <b-input type="textarea" v-model="review.comment" placeholder="Escreva seu comentário"/>
        </b-field>

        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <button class="button is-info" v-on:click="addReview">Adicionar</button>
            </div>
            <div class="level-item">
              <router-link class="button is-danger" to="/reviews">Cancelar</router-link>
            </div>
          </div>
        </nav>
          
        <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :canCancel="false"></b-loading>
      </div>
    </section>
  </div>
</template>
<script>
import StarRating from 'vue-star-rating';
import firebase, { db } from '../firebase/';

/*\
pastas firebase
  brewery >
    reviews  >
      user  >
        reviews
*/

export default {
  name: 'reviews',
  data: function() {
    return {
      review: {
        beer: '',
        comment: '',
        rating: 0,
        uid: '',
        image: null,
        date: new Date().getTime()
      },
      beer: '',
      selected: null,
      image: null,
      isLoading: false
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
    beers: db.ref('beers')
  },
  computed: {
    filteredDataArray: function() {
      const names = this.beers.map(b => {
        console.log(b);
        return { name: b.brewery + ' - ' + b.name, key: b['.key'], author: '' };
      });

      return names.filter(option => {
        console.log(option);
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.review.beer.toLowerCase()) >= 0
        );
      });
    }
  },
  methods: {
    ///breweries
    addReview: function() {
      // https://firebase.google.com/docs/reference/js/firebase.database.Reference#push
      const review = {
        rating: this.review.rating,
        comment: this.review.comment,
        beer: this.review.beer,
        bid: this.selected.key,
        uid: firebase.auth().currentUser.uid,
        date: new Date().getTime(),
        comments: []
      };
      const self = this;
      self.isLoading = true;

      const img = this.image;
      const reviewsRef = this.$firebaseRefs.reviews;
      const beerKey = this.selected.key;
      let key;

      this.$firebaseRefs.reviews
        .push(review)
        .then(snap => {
          const filename = img.name;
          const ext = filename.slice(filename.lastIndexOf('.'));
          key = snap.key;
          return firebase
            .storage()
            .ref(`reviews/${key}${ext}`)
            .put(img);
        })
        .then(imageUp => {
          const image = imageUp.metadata.downloadURLs[0];
          reviewsRef.child(key).update({ image: image });
          self.isLoading = false;
          this.$router.replace('reviews');
        });
    },
    removeReview: function(review) {
      // https://firebase.google.com/docs/reference/js/firebase.database.Reference#remove
      this.$firebaseRefs.reviews.child(review['.key']).remove();
    },
    onPickFile: function() {
      this.$refs.fileInput.click();
    },
    onFilePicked: function(event) {
      const files = event.target.files;
      let filename = files[0].name;

      if (filename.lastIndexOf('.') <= 0) {
        return alert('imagem invalida');
      }

      const fileR = new FileReader();
      fileR.addEventListener('load', () => {
        this.review.image = fileR.result;
      });
      fileR.readAsDataURL(files[0]);
      this.image = files[0];
    }
  },
  components: {
    StarRating
  }
};
</script>

