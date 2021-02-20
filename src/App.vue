<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>
<script>
import Header from "./components/header/v-header";
import Vue from "vue";
import axios from "axios";
Vue.prototype.$http = axios;
const ERR_OK = 0;

export default {
  data() {
    return {
      seller: {},
    };
  },
  methods: {
    GetMsg() {
      this.axios
        .get("../../data.json")
        .then((res) => {
          let AppData = res.data;
          this.seller = AppData.seller;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created: function() {
    this.GetMsg();
  },
  components: {
    "v-header": Header,
  },
};
</script>

<style>
.tab {
  display: flex;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.tab-item {
  flex: 1;
  text-align: center;
}
.tab-item > a {
  display: block;
  width: 100%;
  font-size: 14px;
  color: rgb(77, 85, 93);
}
.tab-item > a.router-link-active {
  color: rgb(240, 20, 20);
}
</style>
