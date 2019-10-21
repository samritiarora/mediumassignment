<template>
  <div class="container">
    Article {{ $route.params.slug }}
    <div class="col-5"></div>
    <Feed :feedItem="article"/>
    <h4>
      <div v-if="!token">
        <router-link to="/login">Login</router-link>or
        <router-link to="/register">Sign Up</router-link>to add comments on this article.
      </div>
    </h4>
    <hr class="my-4"/>
    <h2>Comments:</h2>
    <br>
    <div v-for="com in comments" :key="com.id">
      <CommentCt :comment="com" v-on:deleteOwnComment="loadArticleComments(computed_slug);"/>
    </div>
    <div v-if="token">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1">
          <b-form-textarea
            id="input-1"
            v-model="commentForm.comment.body"
            type="text"
            required
            placeholder="Enter Comment"
          ></b-form-textarea>
          <!-- <div v-if="errored">
          <div v-if="errors.errors.title">
            <b-alert variant="danger" v-model="errors.errors.title">title {{errors.errors.title[0]}}</b-alert>
          </div>
          </div>-->
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>&nbsp; &nbsp;
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import axios from "axios";
import store, { MUTATIONS } from "../store";
import { FormArticle } from "@/models/FormArticle.ts";
import { Article } from "@/models/Article";
import Feed from "@/components/Feed.vue";
import CommentCt from "@/components/CommentCt.vue";
import moment from "moment";

@Component({
  components: { Feed, CommentCt }
})
export default class Home extends Vue {
  article: Article = {
    title: "",
    description: "",
    body: "",
    tags: "",
    tagList: []
  };
  commentForm: any = {
    comment: {
      body: ""
    }
  };
  comments: Comment[] = [];
  info: any = null;
  errors: string[] = [];
  errored: boolean = false;
  loading: boolean = false;

  get token() {
    let todos = this.$store.state.session_jwt;
    return todos;
  }

  get computed_slug() {
    let todo = this.$route.params.slug;
    return todo;
  }
  
  @Watch('info')
  onPropertyChanged(value: string, oldValue: string) {
    // Do stuff with the watcher here.
    this.loadArticleComments(this.computed_slug);
  }

  loadArticle(param: string) {
    axios
      .get("https://conduit.productionready.io/api/articles/" + param)
      .then(response => {
        console.log(response);
        console.log("Info: In Hello World --  got articles response", response);
        this.article = response.data.article;
      })
      .catch(e => {
        this.errors.push(e);
        console.log("error******" + e);
        this.errored = true;
        //       this.errors = error.response.data;
      });
  }

  loadArticleComments(param: string) {
    axios
      .get(
        "https://conduit.productionready.io/api/articles/" + param + "/comments"
      )
      .then(response => {
        console.log(response);
        console.log("Info: In Hello World --  got articles response", response);
        this.comments = response.data.comments;
      })
      .catch(e => {
        this.errors.push(e);
        console.log("error******" + e);
        this.errored = true;
        //       this.errors = error.response.data;
      });
  }
  mounted() {
    this.loadArticle(this.$route.params.slug);
    this.loadArticleComments(this.$route.params.slug);
  }

  onSubmit(evt: any) {
    evt.preventDefault();
    this.errored = false;
    this.info = "";
    console.log("posting form", this.commentForm);
    axios
      .post(
        "https://conduit.productionready.io/api/articles/" +
          this.computed_slug +
          "/comments",
        this.commentForm,
        {
          headers: {
            Authorization: "Token " + this.token
          }
        }
      )
      .then(response => {
        this.info = "You have successfully posted a comment";
        console.log("success*****", this.info);
        console.log("success*****response=", response);
        this.errored = false;
        this.commentForm.comment.body = "";
        //alert(response);
      })
      .catch(error => {
        console.log("error******" + error);
        this.errored = true;
        this.errors = error.response.data;
      })
      .finally(() => (this.loading = false));

    //alert(JSON.stringify(this.commentForm));
  }
  onReset(evt: any) {
    evt.preventDefault();
    // Reset our form values
    this.errored = false;
    this.info = "";
    this.commentForm.comment.body = "";
    // Trick to reset/clear native browser form validation state
    // this.show = false;
    // this.$nextTick(() => {
    //   this.show = true;
    // });
  }
}
</script>
