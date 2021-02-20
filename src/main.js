import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
import iconfont from "./common/iconfonts/iconfont.css"
import star from "../src/components/star/star.vue"

Vue.component('star', star)
import Axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, Axios);

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [{
    path: '/goods',
    component: goods
  },
  {
    path: '/seller',
    component: seller
  },
  {
    path: '/ratings',
    component: ratings
  },
  {
    path: '/',
    redirect: 'goods'
  }
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')




// let app = Vue.extend(App);
// let router = new VueRouter();
// router.map({
//   '/goods': {
//     component: goods
//   }
// });
// router.start(app, '#app');