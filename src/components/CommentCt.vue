<template>
  <div class="Comment">
    <b-card style="height: 50%" no-body>
      <b-card-text>
        <h2>{{myComment.body}}</h2>
      </b-card-text>
      
      <b-card-footer>
        <small class="text-muted">
          <b-row no-gutters>
            <b-col md="3">
              <b-card-img
                :src="myComment.author.image"
                class="rounded-0"
                style="padding-top:2%; width:66px; height:66px"
              ></b-card-img>
            </b-col>
            <b-col md="5">
              <b-card-body :title="myComment.author.username"></b-card-body>
            </b-col>
            <b-col md="2">
              <b-card-body :sub-title="myComment.createdAt|formatDate"></b-card-body>
            </b-col>
            <b-col md="2">
              <div v-if="myComment.author.username === sessionUser">
                <b-card-text>
                  <b-button @click="deleteOwnComment" class="card-link">Delete</b-button>
                </b-card-text>
                <br>
              </div>
            </b-col>
          </b-row>
        </small>
      </b-card-footer>
    </b-card>
    <br>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Comment } from "@/models/Comment";
import axios from "axios";

@Component
export default class CommentCt extends Vue {
  @Prop() private readonly comment!: Comment;

  constructor() {
    super();
    this.myComment = this.comment;
  }
  get sessionUser() {
    let todos = this.$store.state.session_username;
    return todos;
  }

  get computed_slug() {
    let todo = this.$route.params.slug;
    return todo;
  }

  private myComment: Comment = {
    id: 0,
    createdAt: "",
    body: "",
    author: {
      username: "",
      email: "",
      password: "",
      token: "",
      image: "",
      following: ""
    }
  };

  get token() {
    let todos = this.$store.state.session_jwt;
    return todos;
  }

  deleteOwnComment() {
    axios
      .delete(
        "https://conduit.productionready.io/api/articles/" +
          this.computed_slug +
          "/comments/" +
          this.myComment.id,
        {
          headers: {
            Authorization: "Token " + this.token
          }
        }
      )
      .then(response => {
        console.log(response);
        console.log("Info: In Hello World --  got articles response", response);
        //this.$forceUpdate();
        this.$emit("deleteOwnComment");
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
}