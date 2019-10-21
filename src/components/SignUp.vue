<template>
  <div class="hello">
    <b-container class="text-dark text-center" style="margin-left:40%">
      <b-row>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="input-group-1">
            <b-form-input
              id="input-1"
              v-model="form.user.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
            <div v-if="errored">
              <div v-if="errors.errors.email">
                <b-alert
                  variant="danger"
                  v-model="errors.errors.email"
                >email {{errors.errors.email[0]}}</b-alert>
              </div>
            </div>
          </b-form-group>

          <b-form-group id="input-group-2">
            <b-form-input
              id="input-2"
              v-model="form.user.username"
              required
              placeholder="Enter username"
            ></b-form-input>
            <div v-if="errored">
              <div v-if="errors.errors.username">
                <b-alert
                  variant="danger"
                  v-model="errors.errors.username"
                >username {{errors.errors.username[0]}}</b-alert>
              </div>
            </div>
          </b-form-group>

          <b-form-group id="input-group-3">
            <b-form-input
              id="input-3"
              v-model="form.user.password"
              required
              placeholder="Enter password"
            ></b-form-input>
            <div v-if="errored">
              <div v-if="errors.errors.password">
                <b-alert
                  variant="danger"
                  v-model="errors.errors.password"
                >password {{errors.errors.password[0]}}</b-alert>
              </div>
            </div>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>&nbsp; &nbsp;
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-row>
      <b-row>
        <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
        </b-card>
        <div v-if="info">
          <b-alert show variant="success">
            <h4>{{info}}</h4>
          </b-alert>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import store, { MUTATIONS } from "../store";

@Component
export default class SignUp extends Vue {
  form = {
    user: {
      email: "",
      username: "",
      password: null
    }
  };
  show: boolean = true;
  info: any = null;
  errors: string[] = [];
  errored: boolean = false;
  loading: boolean = false;

  setSession(token: any, username: any) {
    //store.state.count++; //works, but with strict true we have an error
    store.commit(MUTATIONS.SET_USER_JWT, token);
    store.commit(MUTATIONS.SET_USER, username);
  }
  onSubmit(evt: any) {
    evt.preventDefault();
    this.errored = false;
    this.info = "";
    this.loading = true;
    axios
      .post("https://conduit.productionready.io/api/users", this.form)
      .then(response => {
        this.info = "You have successfully registered";
        console.log("success*****" + this.info);
        this.errored = false;
        this.form.user.email = "";
        this.form.user.username = "";
        this.form.user.password = null;
        //alert(response);
        this.setSession(response.data.user.token, response.data.user.username);
        this.errored = false;
        this.form.user.email = "";
        this.form.user.password = null;
        //alert(response);
        this.$router.push({ name: "home" });
      })
      .catch(error => {
        console.log("error******" + error);
        this.errored = true;
        this.errors = error.response.data;
      })
      .finally(() => (this.loading = false));

    alert(JSON.stringify(this.form));
  }
  onReset(evt: any) {
    evt.preventDefault();
    // Reset our form values
    this.form.user.email = "";
    this.form.user.username = "";
    this.form.user.password = null;
    // Trick to reset/clear native browser form validation state
    this.show = false;
    this.$nextTick(() => {
      this.show = true;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
