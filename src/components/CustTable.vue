<template>
  <div class="feed">
    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
      <div style="margin:auto;text-align: left;">
        <ul class="pagination">
          <li class="page-item active">
            <a class="page-link">Total {{rows}}</a>
          </li>
        </ul>
      </div>

      <p class="mt-3">Current Page: {{ currentPage }}</p>

      <b-table
        id="my-table"
        :items="feeds"
        :per-page="perPage"
        :current-page="currentPage"
        small
      >
        <!-- <template v-for="feed in feeds"  slot-scope="data">
        {{data}}-->
        <!-- <template slot-scope="row">
                <slot name="tableTemplates" :tbl-props="row">
                  <Feed feed="row"/>
                </slot>
        </template>-->
        <!-- <template slot-scope="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right">
                <b>Age:</b>
              </b-col>
              <b-col>{{ row.title }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right">
                <b>Is Active:</b>
              </b-col>
              <b-col>{{ row.author.username }}</b-col>
            </b-row>

            <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
          </b-card>
        </template>-->
        <!-- <Feed :feed="feed"/></template> -->
        <!-- <template v-for="(field, index) in fields" :slot="field.key" slot-scope="data">
          
          <div v-if="field.colType === 'button'">
            <h5>{{data.title}}</h5>
            <b-button>Am Button</b-button>
          </div>
          <div v-else-if="field.colType === 'span'">
            <h5>{{data.item.title}}</h5>
            <span>Am Span</span>
          </div>
          <div v-else>
            <h5>{{data.articles[0].name}}</h5>Am Confused
          </div>
        </template> -->
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FeedItem } from "@/models/FeedItem";
import Feed from "@/components/Feed.vue";

@Component({
  components: {
    Feed,
    CustTable
  }
})
export default class CustTable extends Vue {
  @Prop() private readonly perPage!: number;
  @Prop() private readonly currentPage!: number;
  @Prop() private readonly rows!: number;
  @Prop() private readonly feeds!: FeedItem[];

  constructor() {
    super();
  }

  fields: any[] = [
    {
      key: "id",
      label: "Id",
      colType: "span"
    },
    {
      key: "name",
      label: "Name",
      colType: "button"
    },
    {
      key: "uhh",
      label: "uhh..",
      colType: "idk"
    }
  ];
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
