<template>
  <div class="editor">
    <b-container class="text-dark text-center" style="margin-left:40%">
      <b-row>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group id="input-group-1">
            <b-form-input
              id="input-1"
              v-model="form.article.title"
              type="text"
              required
              placeholder="Article Title"
            ></b-form-input>
            <div v-if="errored">
              <div v-if="errors.errors.title">
                <b-alert
                  variant="danger"
                  v-model="errors.errors.title"
                >title {{errors.errors.title[0]}}</b-alert>
              </div>
            </div>
          </b-form-group>

          <b-form-group id="input-group-2">
            <b-form-input
              id="input-2"
              v-model="form.article.description"
              type="text"
              required
              placeholder="Article Description"
            ></b-form-input>
            <div v-if="errored">
              <div v-if="errors.errors.description">
                <b-alert
                  variant="danger"
                  v-model="errors.errors.description"
                >description {{errors.errors.description[0]}}</b-alert>
              </div>
            </div>
          </b-form-group>

          <b-form-group id="input-group-3">
            <b-form-input
              id="input-3"
              v-model="form.article.body"
              type="text"
              required
              placeholder="Write your Article"
            ></b-form-input>
            <div v-if="errored">
              <div v-if="errors.errors.body">
                <b-alert
                  variant="danger"
                  v-model="errors.errors.body"
                >body {{errors.errors.body[0]}}</b-alert>
              </div>
            </div>
          </b-form-group>

          <b-form-group id="input-group-4">
            <b-form-input
              id="input-4"
              v-model="form.article.tags"
              type="text"
              required
              placeholder="Enter tags"
            ></b-form-input>
            <div v-if="errored">
              <div v-if="errors.errors.tagList">
                <b-alert
                  variant="danger"
                  v-model="errors.errors.tagList"
                >tags {{errors.errors.tagList[0]}}</b-alert>
              </div>
            </div>
          </b-form-group>
          <div v-if="computed_slug">
            <b-button type="submit" variant="primary">Update</b-button>&nbsp; &nbsp;
          </div>
          <div v-else>
            <b-button type="submit" variant="primary">Submit</b-button>&nbsp; &nbsp;
          </div>&nbsp; &nbsp;
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-row>
      <b-row>
        <div v-if="errored">
          <b-alert show variant="danger">
            <li v-for="(k,v) in errors">{{k}}</li>
          </b-alert>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import store, { MUTATIONS } from "../store";
import { FormArticle } from "@/models/FormArticle.ts";
@Component({
  components: {}
})
export default class Home extends Vue {
  form: FormArticle = {
    article: {
      title: "",
      description: "",
      body: "",
      tags: "",
      tagList: []
    }
  };
  show: boolean = true;
  info: any = null;
  errors: string[] = [];
  errored: boolean = false;
  loading: boolean = false;
  get token() {
    let todos = this.$store.state.session_jwt;
    return todos;
  }
  get listByBreaks() {
    return this.form.article.tags.split(/[ ,]+/);
  }

  get computed_slug() {
    let todo = this.$route.params.slug;
    return todo;
  }

  loadArticle(param: string) {
    axios
      .get("https://conduit.productionready.io/api/articles/" + param)
      .then(response => {
        console.log(response);
        console.log(
          "Info: In Editor --  got single article:",
          param,
          " response:",
          response
        );
        this.form = response.data;
        this.form.article.tags = this.form.article.tagList.toString();
      })
      .catch(e => {
        this.errors.push(e);
        console.log("error******" + e);
        this.errored = true;
        //       this.errors = error.response.data;
      });
  }

  mounted() {
    this.loadArticle(this.computed_slug);
  }

  onSubmit(evt: any) {
    evt.preventDefault();
    this.errored = false;
    this.info = "";
    this.loading = true;
    this.form.article.tagList = this.listByBreaks;
    console.log("posting form", this.form);
    if (this.computed_slug) {
      axios
        .put(
          "https://conduit.productionready.io/api/articles/" +
            this.computed_slug,
          this.form,
          {
            headers: {
              Authorization: "Token " + this.token
            }
          }
        )
        .then(response => {
          this.info = "You have successfully logged in";
          console.log("success*****", this.info);
          console.log("success*****response=", response);
          this.errored = false;
          this.form.article.title = "";
          this.form.article.description = "";
          this.form.article.body = "";
          this.form.article.tags = "";
          this.form.article.tagList = [];
          //alert(response);
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          console.log("error******" + error);
          this.errored = true;
          this.errors = error.response.data;
        })
        .finally(() => (this.loading = false));
    } else {
      axios
        .post("https://conduit.productionready.io/api/articles", this.form, {
          headers: {
            Authorization: "Token " + this.token
          }
        })
        .then(response => {
          this.info = "You have successfully logged in";
          console.log("success*****", this.info);
          console.log("success*****response=", response);
          this.errored = false;
          this.form.article.title = "";
          this.form.article.description = "";
          this.form.article.body = "";
          this.form.article.tags = "";
          this.form.article.tagList = [];
          //alert(response);
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          console.log("error******" + error);
          this.errored = true;
          this.errors = error.response.data;
        })
        .finally(() => (this.loading = false));

      //alert(JSON.stringify(this.form));
    }
  }
  onReset(evt: any) {
    evt.preventDefault();
    // Reset our form values
    this.errored = false;
    this.info = "";
    this.form.article.title = "";
    this.form.article.description = "";
    this.form.article.body = "";
    this.form.article.tagList = [];
    // Trick to reset/clear native browser form validation state
    this.show = false;
    this.$nextTick(() => {
      this.show = true;
    });
  }
}
</script>

  