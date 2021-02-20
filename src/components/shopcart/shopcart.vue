<template>
  <div class="shopcart">
    <div class="cartContent" @click="toggleList">
      <div class="cartContent-left">
        <div class="logo-wrapper">
          <div class="cartLogo" :class="{ highLight: totalCount > 0 }">
            <i
              class="iconfont icon-ai66"
              :class="{ highLight: totalCount > 0 }"
            ></i>
          </div>
          <div class="foodCount" v-show="totalCount > 0">
            {{ totalCount }}
          </div>
        </div>
        <div class="allPrice" :class="{ highLight: totalCount > 0 }">
          ￥{{ totalPrice }}
        </div>
        <div class="allCartDesc">另需配送费￥{{ deliveryPrice }}元</div>
      </div>
      <div class="cartContent-right">
        <div class="mainDelivery" :class="payClass">{{ payDesc }}</div>
      </div>
    </div>
    <div class="shopCart-list" v-show="listShow">
      <div class="list-header">
        <h1 class="list-title">购物车</h1>
        <span class="empty-cart">清空</span>
      </div>
      <div class="list-content">
        <transition-group name="fold">
          <li
            class="list-food"
            v-for="(food, index) in selectFoods"
            :key="index"
          >
            <span class="list-name">{{ food.name }}</span>
            <div class="listPrice">
              <span>￥{{ food.price * food.count }}</span>
            </div>
            <!-- <div class="cartcontrol-wrapper">
              <add-cart :food="food"></add-cart>
            </div> -->
          </li>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>
// import addCart from "../addCart/addCart";
export default {
  props: {
    deliveryPrice: {
      type: Number,
      default: 0,
    },
    minPrice: {
      type: Number,
      default: 0,
    },
    selectFoods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      fold: true,
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}起送`;
      } else {
        return "去结算";
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "not-enough";
      } else {
        return "enough";
      }
    },
    listShow() {
      if (!this.totalCount) {
        // this.fold = true;
        return false;
      }
      let show = !this.fold;
      return show;
    },
  },
  // components: {
  //   "add-cart": addCart,
  // },
  methods: {
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
  },
};
</script>
<style>
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  height: 48px;
  width: 100%;
  background: #666;
}
.cartContent {
  display: flex;
  font-size: 0;
  color: rgba(255, 255, 255, 0.4);
}
.cartContent-left {
  flex: 1;
  background: #141d27;
}
.logo-wrapper {
  display: inline-block;
  position: relative;
  top: -10px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #141d27;
  margin: 0 6px;
  padding: 6px;
  box-sizing: border-box;
}
.cartLogo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  text-align: center;
  background: #2b343c;
}
.cartLogo.highLight {
  background: rgb(0, 160, 220);
}
.foodCount {
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 16px;
  line-height: 16px;
  font-size: 9px;
  color: #fff;
  font-weight: 700;
  text-align: center;
  border-radius: 24px;
  background: rgb(240, 20, 20);
}
.icon-ai66 {
  font-size: 32px !important;
}
.icon-ai66:before {
  color: #80858a;
  line-height: 42px;
}
.icon-ai66.highLight:before {
  color: rgb(255, 255, 255);
}
.allPrice {
  display: inline-block;
  vertical-align: top;
  font-size: 16px;
  font-weight: 700;
  padding-right: 12px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  line-height: 24px;
  margin: 12px 0;
  box-sizing: border-box;
}
.allPrice.highLight {
  color: rgb(255, 255, 255);
}
.allCartDesc {
  display: inline-block;
  vertical-align: top;
  font-size: 10px;
  font-weight: 700;
  line-height: 24px;
  margin: 12px 0 0 12px;
}
.cartContent-right {
  flex: 0 0 105px;
  height: 48px;
  line-height: 48px;
  font-weight: 700;
  text-align: center;
  font-size: 12px;
  background: #2b333b;
}
.mainDelivery.not-enough {
  background: #2b333b;
}
.mainDelivery.enough {
  background: #00b43c;
  color: #fff;
}
/* 购物车上浮列表 */
/* .shopCart-list {
  position: absolute;
  left: 0;
  top: -100%;
  width: 100%;
  z-index: -1;
} */
/* .fold-enter-active,
.fold-leave-active {
  transition: all 0.5s ease;
} */
/* .fade-leave-active below version 2.1.8 */
/* .fade-enter, .fade-leave-to {
  transition: all 0.5s ease;
  transform: translate3d(0, -100%, 0);
} */
/* .list-header {
  height: 40px;
  background: #f3f5f7;
  line-height: 40px;
  transition: all 0.5s;
  transform: translate3d(0, -100%, 0);
} */
/* .list-header .list-title {
  float: left;
  height: 40px;
  padding: 0 18px;
  font-size: 14px;
  color: rgb(7, 17, 27);
  font-weight: 200;
}
.list-header .empty-cart {
  float: right;
  padding: 0 18px;
  font-size: 12px;
  color: rgb(0, 160, 220);
} */
/* .clearfix::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
} */
/* .clearfix { */
/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
/* *zoom: 1;  */
/* } */
</style>
