<template>
  <section>
    <section class="hero">
        <div class="hero-body">
          <div class="container">
            <p class="title">cervejas</p> <p class="subtitle">cadastro de cervejas</p>
          </div>
        </div>
    </section>
    <section class="container">
      <b-field label="nome">
        <b-input type="text" v-model="beer.name" placeholder="nova cerveja"/>
      </b-field>
      <b-field label="cervejaria">
        <b-input type="text" v-model="beer.brewery" placeholder="cervejaria"/>
      </b-field>
      <b-field>
        <button class="button is-primary" v-on:click="addBeer">adicionar</button>
      </b-field>
      
      <table class="table is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>nome</th>
            <th>cervejaria</th>
            <th>ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="beer in beers" v-bind:key="beer['.key']">
            <td>{{ beer.name }}</td>
            <td>{{ beer.brewery }}</td>
            <td>
              <a v-on:click="removeBeer(beer)" class="delete is-medium"></a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>
<script>
import firebase, { db } from '../firebase/';

export default {
  name: 'beers',
  data: function() {
    console.log(this);
    return { beer: { name: '', brewery: '', uid: '' } };
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

