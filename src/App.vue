<template>
  <div id="app">
    <div>
      <Header/>
      <br>
    </div>
    <div>
      <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
        <template v-slot:header>Conduit</template>

        <template v-slot:lead>Add your views anytime, anywhere.</template>
        <div v-if="computed_session">
          <!-- <hr class="my-4"> -->

          <!-- <p>
            It uses utility classes for typography and spacing to space content out within the larger
            container.
          </p>

          <b-button variant="primary" href="#">Add Articles</b-button>
          <b-button variant="success" href="#">Do Something Else</b-button>-->
        </div>
        <div v-else></div>
      </b-jumbotron>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import Header from "./components/Header.vue";
import store, { MUTATIONS } from "./store";

@Component({
  components: {
    HelloWorld,
    Header
  }
})
export default class App extends Vue {
  get computed_session() {
    let todos = this.$store.state.session_jwt;
    return todos;
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  text-decoration-color: white;
  /* margin-top: 0.5px; */
}
</style>
