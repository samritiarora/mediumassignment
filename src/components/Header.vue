<template>
  <div class="header">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>
        <router-link to="/">Conduit</router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>-->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>-->
          <!-- Using 'button-content' slot -->
          <!--<template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>-->

          <b-nav-item right>
            <router-link to="/">Home</router-link>
          </b-nav-item>
          <div v-if="computed_session">
            <b-nav-item right>
              <router-link to="/editor/">New Article</router-link>
            </b-nav-item>
            <b-nav-item right>Hi {{computed_session}}!</b-nav-item>
            <b-nav-item right>
              <b-button variant="link" @click="logout">Logout</b-button>
            </b-nav-item>
          </div>
          <div v-else>
            <b-nav-item right>
              <router-link to="/login">Login</router-link>
            </b-nav-item>
            <b-nav-item right>
              <router-link to="/register">Sign Up</router-link>
            </b-nav-item>
          </div>
          <b-nav-item right>
            <router-link to="/about">About</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- <div>
      <div class="badge badge-primary" style="text-align: start; float:left">
        <router-link to="/">conduit</router-link>
      </div>
      <div id="nav">
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>|
        <router-link to="/register">Sign Up</router-link>|
        <div v-if="computed_session">
          <router-link to="/editor">New Article</router-link>
          Hi {{computed_session}}! |
          <b-button variant="link" @click="logout">Logout</b-button>
        </div>
        <div v-else>
          <router-link to="/login">Login</router-link>
        </div>
      </div>
    </div> -->
  </div> 
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store, { MUTATIONS } from "../store";

@Component
export default class Header extends Vue {
  get computed_session() {
    let todos = this.$store.state.session_username;
    return todos;
  }
  logout() {
    store.commit(MUTATIONS.SET_USER_JWT, "");
    store.commit(MUTATIONS.SET_USER, "");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  font-weight: 5.5 !important;
  margin: 0.5%;
  margin-top: 0%;
}
#nav {
  text-align: end;
  float: right;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
