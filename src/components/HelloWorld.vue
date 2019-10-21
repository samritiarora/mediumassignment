<template>
  <div class="hello">
    <div class="container">
      <b-tabs content-class="mt-3">
        <b-tab title="Global Feed" active>
          <h1 class="display-4">Global Feed</h1>
          <!-- <div class="row"> -->
            <!-- <div class="col-md-12"> -->
              <li v-for="item in globalFeed" style="width: 100%; height:50px">
                <Feed :feedItem="item" v-on:deleteOwnArticle="getGlobalFeedData"/>
              </li>
            <!-- </div> -->
          <!-- </div> -->
          <b-pagination
            size="md"
            :total-rows="100"
            v-model="currentPage"
            :per-page="10"
            @input="getGlobalFeedData(currentPage)"
          ></b-pagination>

          <div>Current Page: {{currentPage}}</div>
          <!-- <CustTable :feeds="globalFeed" :rows="rows" perPage="5" currentPage="1"/> -->
        </b-tab>
        <div v-if="token">
          <b-tab title="Your Feed">
            <h1 class="display-4">Your Feed</h1>
           
                <li v-for="item in myFeed"  style="width: 100%; height:50%">
                  <Feed :feedItem="item" v-on:deleteOwnArticle="getMyFeedData"/>
                </li>
            <b-pagination
              size="md"
              :total-rows="100"
              v-model="myCurrentPage"
              :per-page="10"
              @input="getMyFeedData(myCurrentPage)"
            ></b-pagination>

            <div>Current Page: {{myCurrentPage}}</div>
          </b-tab>
        </div>
      </b-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import { FeedItem } from "../models/FeedItem";
import Feed from "@/components/Feed.vue";
import CustTable from "@/components/CustTable.vue";

@Component({
  components: {
    Feed,
    CustTable
  }
})
export default class HelloWorld extends Vue {
  globalFeed: FeedItem[] = [];
  myFeed: FeedItem[] = [];
  errored: boolean = false;
  errors: any;
  loading: boolean = false;

  //perPage: number = 3;
  //global feed parameters
  currentPage: number = 1;
  limit: number = 2;
  rows: number = 0;

  //my feed parameters
  myCurrentPage: number = 1;
  myLimit: number = 4;
  myRows: number = 0;

  get token() {
    let todos = this.$store.state.session_jwt;
    return todos;
  }
  // mounted() {
  //   console.log("Trace: In Hello World --  mounting");
  //   this.loading = true;
  //   axios
  //     .get("https://conduit.productionready.io/api/articles")
  //     .then(response => {
  //       console.log("Info: In Hello World --  got articles response", response);
  //       this.globalFeed = response.data.articles;
  //       this.rows = response.data.articlesCount;
  //     })
  //     .catch(error => {
  //       console.log("error******" + error);
  //       this.errored = true;
  //       this.errors = error.response.data;
  //     })
  //     .finally(() => (this.loading = false));
  // }

  getGlobalFeedData(currentPage: number) {
    axios
      .get(
        "https://conduit.productionready.io/api/articles?offset=" +
          (this.currentPage - 1) * this.limit +
          "&limit=" +
          this.limit
      )
      .then(response => {
        console.log(response);
        console.log("Info: In Hello World --  got articles response", response);
        this.globalFeed = response.data.articles;
        this.rows = response.data.articlesCount;
      })
      .catch(e => {
        this.errors.push(e);
        console.log("error******" + e);
        this.errored = true;
        //       this.errors = error.response.data;
      });
  }

  getMyFeedData(currentPage: number) {
    axios
      .get(
        "https://conduit.productionready.io/api/articles/feed?offset=" +
          (this.myCurrentPage - 1) * this.myLimit +
          "&limit=" +
          this.myLimit,
        {
          headers: {
            Authorization: ('Token ' + this.token)
          }
        }
      )
      .then(response => {
        console.log(response);
        console.log("Info: In Hello World --  got articles response", response);
        this.myFeed = response.data.articles;
        this.myRows = response.data.articlesCount;
      })
      .catch(e => {
        this.errors.push(e);
        console.log("error******" + e);
        this.errored = true;
        //       this.errors = error.response.data;
      });
  }

  //Called when page rendered
  mounted(currentPage: number, myCurrentPage: number) {
    this.getGlobalFeedData(currentPage);
    this.getMyFeedData(myCurrentPage);
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
