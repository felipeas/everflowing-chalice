 
<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <p class="title">avaliação</p> <p class="subtitle">nova avaliação</p>
        </div>
      </div>
      
    </section>
    <section class="container">
     
      <b-field label="escolha a cerveja que deseja avaliar">
          <b-autocomplete
          field="name"
              v-model="review.beer"
              :data="filteredDataArray"
              placeholder="pesquise pelo nome da cerveja"
              icon="magnify"
              @select="option => selected = option">
              <template slot="empty">cerveja não encontrada</template>
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

      <b-field label="comentário">
        <b-input type="text" v-model="review.comment" placeholder="escreva seu comentário"/>
      </b-field>
      <b-field>
        <button class="button is-primary" v-on:click="addReview">adicionar</button>
      </b-field>
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
        image: null
      },
      beer: '',
      selected: null,
      image: null
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
        return { name: b.name, key: b['.key'], author: '' };
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
        uid: firebase.auth().currentUser.uid
      };

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
          this.$router.replace('reviews');
        });

      this.review.name = '';
      this.review.comment = '';
      this.review.uid = 0;
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

