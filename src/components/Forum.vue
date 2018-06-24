<template>
<div>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <p class="title">Vamos falar sobre cerveja?</p> <p class="subtitle">Prost!</p>
      </div>
    </div>
  </section>
  <section class="container is-centered">
    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Mensagem</th>
          <th>Respostas</th>
          <th>Visualizações</th>
        </tr>
      </thead>
      <tbody>
          <tr 
            v-for="message in sortedList" 
            v-bind:key="message['.key']"
          >
            <td>
              <router-link :to="{ name: 'Thread', params: { id: message['.key'] }}">
                {{ message.subject }}
              </router-link>
            </td>
            <td>{{message.replies}}</td>
            <td>{{message.views}}</td>
          </tr>
      </tbody>
    </table>
    
  </section>

  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <p class="title"></p>
        <p class="subtitle"></p>
        <router-link class="button is-primary is-inverted" to="/new-post">Adicionar postagem</router-link>
      </div>
    </div>    
  </section>
</div>
</template>

<style scoped>
</style>

<script>
import { db } from '../firebase/';

export default {
  name: 'forum',
  data() {
    return {
      isModalOpen: false,
      message: {}
    };
  },
  firebase: {
    messages: {
      source: db.ref('messages'),
      // Optional, allows you to handle any errors.
      cancelCallback(err) {
        console.error(err);
      }
    }
  },
  computed: {
    // a computed getter
    sortedList: function() {
      // `this` points to the vm instance
      return this.messages.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    }
  },
  methods: {}
};
</script>

