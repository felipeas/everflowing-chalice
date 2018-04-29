<template>
  <section>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <p class="title">Cervejas</p> <p class="subtitle">Listagem de cervejas</p>
        </div>
      </div>
    </section>
    <section class="container">
      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cervejaria</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="beer in beers" v-bind:key="beer['.key']">
            <td>{{ beer.name }}</td>
            <td>{{ beer.brewery }}</td>
            <td>
              <a 
                v-if="beer.uid == uid" 
                v-on:click="removeBeer(beer)" 
                class="delete is-medium">
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <p class="subtitle">Cadastrar uma nova cerveja</p>
          <b-field label="">
            <b-input type="text" v-model="beer.name" placeholder="nome da cerveja"/>
          </b-field>
          <b-field label="">
            <b-input type="text" v-model="beer.brewery" placeholder="nome da cervejaria"/>
          </b-field>
      
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <button class="button is-primary is-inverted" v-on:click="addBeer">Adicionar</button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
import firebase, { db } from '../firebase/';
import StarRating from 'vue-star-rating';

export default {
  name: 'beers',
  data: function() {
    console.log(this);
    return {
      beer: { name: '', brewery: '', uid: '' },
      uid: firebase.auth().currentUser.uid
    };
  },
  firebase: {
    beers: {
      source: db.ref('beers'),
      // Optional, allows you to handle any errors.
      cancelCallback(err) {
        console.error(err);
      }
    }
  },
  methods: {
    ///breweries
    addBeer: function() {
      // https://firebase.google.com/docs/reference/js/firebase.database.Reference#push
      this.$firebaseRefs.beers.push({
        name: this.beer.name,
        brewery: this.beer.brewery,
        uid: firebase.auth().currentUser.uid
      });
      this.beer.name = '';
      this.beer.brewery = '';
      this.beer.uid = '';
    },
    removeBeer: function(beer) {
      // https://firebase.google.com/docs/reference/js/firebase.database.Reference#remove
      this.$firebaseRefs.beers.child(beer['.key']).remove();
    }
  }
};
</script>

