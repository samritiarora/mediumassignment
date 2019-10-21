<template>
  <div class="feed">
    <!-- <b-card :title="feedItem.title" sub-title="Card subtitle">
      <b-col md="3">
          <b-card-img :src="feedItem.author.image" class="rounded-0"></b-card-img>
        </b-col>
      <b-card-text>
        Some quick example text to build on the
        <em>card title</em> and make up the bulk of the card's
        content.
      </b-card-text>

      <b-card-text>A second paragraph of text in the card.</b-card-text>

      <a href="#" class="card-link">Card link</a>
      <b-link href="#" class="card-link">Another link</b-link>
    </b-card>-->
    <b-card no-body class="overflow-hidden" style="max-width: 100%;">
      <b-row no-gutters>
        <b-col md="3">
          <b-card-img :src="feedItem.author.image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="9">
          <b-card-body :title="feedItem.title" :sub-title="feedItem.author.username">
            <b-card-text>
              <b-button variant="link" @click="viewArticle">{{feedItem.body}}</b-button>
            </b-card-text>
            <a href="#" class="card-link">
              {{feedItem.favoritesCount}}
              <font-awesome-icon icon="coffee"/>
            </a>
          </b-card-body>
          <b-card-footer>
            <div v-if="!computed_slug">
            <b-button variant="link" @click="viewArticle">Read more</b-button>
            </div>
            <div v-if="feedItem.author.username === sessionUser">
              <b-button variant="link" @click="editOwnArticle">Edit</b-button>
              <b-button variant="link" @click="deleteOwnArticle">Delete</b-button>
            </div>
          </b-card-footer>
        </b-col>
      </b-row>
    </b-card>
    <br>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FeedItem } from "@/models/FeedItem";
import axios from "axios";

@Component
export default class Feed extends Vue {
  @Prop() private readonly feedItem!: FeedItem;

  private myFeed!: FeedItem;
  get sessionUser() {
    let todos = this.$store.state.session_username;
    return todos;
  }

  get token() {
    let todos = this.$store.state.session_jwt;
    return todos;
  }
  get computed_slug() {
    let todo = this.$route.params.slug;
    return todo;
  }

  viewArticle() {
    this.$router.push("/article/" + this.feedItem.slug);
  }

  editOwnArticle() {
    this.$router.push("/editor/" + this.feedItem.slug);
  }

  deleteOwnArticle() {
    axios
      .delete(
        "https://conduit.productionready.io/api/articles/" + this.feedItem.slug,
        {
          headers: {
            Authorization: "Token " + this.token
          }
        }
      )
      .then(response => {
        console.log(response);
        console.log("Info: In Feed Component --  got feed response", response);
        this.$emit("deleteOwnArticle");
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
