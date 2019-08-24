<template>
  <div class="container">
    <div class="columns">
      <div class="column is-two-fifths">
        <article v-if="accentColor == false" class="message is-danger">
          <div class="message-body">
            Et catrine t'es pas login là ⤵️
          </div>
        </article>
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input v-model="username" v-on:click="warnAnonymous()" class="input"
              id="username-choice-input" type="text" placeholder="Text input" />
          </div>
          <p id="warn-message" class="help is-danger is-hidden">If you chose noting you are a
            Anonymous</p>
        </div>
        <div class="field">
          <label class="label has-text-grey-light">Room ID</label>
          <div class="control">
            <div class="select">
              <select disabled>
                <option>Patio</option>
                <option>Terasse</option>
                <option>BarPMU</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">

            <router-link tag="button" :to="{ name: 'chat', params: {userId: username } }"
              class="button is-link">Submit</router-link>
            {{username}}
          </div>
          <div class="control">
            <button class="button is-dark">Continue as Anonymous</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const randomItem = require('random-item');
const prenomRandom = ["André","René","Jacques","Jeannine","Robert","Marcel","Jeanne","Claude","Maurice","Yvette","Henri","Louis","Paulette","Bernard","Thérèse","Gisèle","Raymonde"]
const nomRandom = ["De la street","De la région parisienne","Du 86","Du 93","le bg"]
  export default {
    data() {
      return {
        username: randomItem(prenomRandom) + ' ' + randomItem(nomRandom)
      }
    },
    props: ['accentColor'],
    methods: {
      warnAnonymous() {
        if (!this.username) {
          console.log(this.username)
          let input = document.querySelector("#username-choice-input");
          let warn = document.querySelector("#warn-message");
          input.classList.add('is-danger');
          warn.classList.remove('is-hidden');
        }

        setTimeout(() => {
          let input = document.querySelector("#username-choice-input");
          let warn = document.querySelector("#warn-message");
          input.classList.remove('is-danger');
          warn.classList.add('is-hidden');
        }, 5000);

        console.log("cc")


      }
    },
  };

</script>

<style lang="scss" scoped>
</style>
