<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu-wrapper">
      <ul class="menu-left content">
        <li
          v-for="(menuItem, index) in goods"
          :key="index"
          class="menuItem"
          :class="{ current: currentIndex === index }"
          @click="selectMenu(index)"
        >
          <span class="menuText">
            <span
              v-show="menuItem.type > 0"
              class="icon"
              :class="classMap[menuItem.type]"
            ></span
            >{{ menuItem.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods-wrapper">
      <ul>
        <li
          v-for="(item, index) in goods"
          :key="index"
          class="food-list food-list-hook"
        >
          <h1 class="foods-name">{{ item.name }}</h1>
          <ul class="foodsList">
            <li
              class="food-item"
              v-for="(food, index) in item.foods"
              :key="index"
            >
              <div class="food-img">
                <img width="57" height="57" :src="food.icon" />
              </div>
              <div class="food-content">
                <h2 class="foodName">{{ food.name }}</h2>
                <p class="food-desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="monthSell">月售{{ food.sellCount }}份</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="sellPrice">
                  <span class="nowPrice">￥{{ food.price }}</span>
                  <span class="oldPrice" v-show="food.oldPrice"
                    >￥{{ food.oldPrice }}</span
                  >
                </div>
                <add-cart :food="food"></add-cart>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart
      :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"
      :select-foods="selectFoods"
    ></shop-cart>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import shopcart from "../shopcart/shopcart";
import addCart from "../addCart/addCart";
export default {
  created: function() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.axios
      .get("../../data.json")
      .then((res) => {
        let AppGoods = res.data;
        this.goods = AppGoods.goods;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  props: {
    seller: {
      type: Object,
    },
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    },
  },
  methods: {
    _initScroll() {
      this.bs = new BScroll(".menu-wrapper", {
        movable: true,
        zoom: true,
        click: true,
      });
      this.bsFoodsWrapper = new BScroll(".foods-wrapper", {
        movable: true,
        zoom: true,
        probeType: 3,
        click: true,
      });
      this.bsFoodsWrapper.on("scroll", (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    selectMenu(index) {
      let foodListLen = document
        .querySelector(".foods-wrapper")
        .getElementsByClassName("food-list-hook");
      let el = foodListLen[index];
      this.bsFoodsWrapper.scrollToElement(el, 300);
    },
    _calculateHeight() {
      let foodListLen = document
        .querySelector(".foods-wrapper")
        .getElementsByClassName("food-list-hook");
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodListLen.length; i++) {
        let item = foodListLen[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
  },
  components: {
    "shop-cart": shopcart,
    "add-cart": addCart,
  },
};
</script>
<style>
/* 设置前面的小折扣图片 */
.menuItem .menuText .icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
  vertical-align: top;
  margin-right: 2px;
}
.menuItem .menuText .icon.decrease {
  display: inline-block;
  background-size: 12px 12px;
  background-image: url(decrease_3@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(decrease_3@3x.png);
  }
}
.menuItem .menuText .icon.discount {
  display: inline-block;
  background-image: url(discount_3@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(discount_3@3x.png);
  }
}
.menuItem .menuText .icon.guarantee {
  display: inline-block;
  background-image: url(guarantee_3@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(guarantee_3@3x.png);
  }
}
.menuItem .menuText .icon.invoice {
  display: inline-block;
  background-image: url(invoice_3@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(invoice_3@3x.png);
  }
}
.menuItem .menuText .icon.special {
  display: inline-block;
  background-image: url(special_3@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(special_3@3x.png);
  }
}
/* 设置前面的小折扣图片 */
.goods {
  display: flex;
  position: absolute;
  width: 100%;
  top: 177px;
  bottom: 58px;
  overflow: hidden;
}
.goods .menu-wrapper {
  flex: 0 0 80px;
  background-color: #f3f5f7;
}
.goods .foods-wrapper {
  flex: 1;
}
.menuItem {
  display: table;
  height: 54px;
  width: 56px;
  padding: 0 12px;
  line-height: 14px;
}
.menuItem.current {
  position: relative;
  margin-top: -1px;
  z-index: 10;
  background: #fff;
  font-weight: 700;
}
.menuItem .menuText {
  display: table-cell;
  vertical-align: middle;
  font-size: 12px;
  font-weight: 200;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
/* 隐藏左侧最后一个下划线使用 */
/* .menuItem:last-child .menuText {
  border-bottom: none;
} */
.current .menuText {
  border-bottom: none;
}
.foods-name {
  height: 26px;
  line-height: 26px;
  border-left: 2px solid #d9dde1;
  font-size: 12px;
  color: rgb(147, 153, 159);
  padding-left: 14px;
  background-color: #f3f5f7;
}
.food-item {
  display: flex;
  margin: 18px 18px 0 18px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  padding-bottom: 18px;
}
.food-item:last-child {
  border-bottom: none;
}
.food-img {
  flex: 0 0 57px;
  margin-right: 10px;
}
.food-content {
  flex: 1;
  position: relative;
}
.foodName {
  margin: 2px 0 8px;
  font-size: 14px;
  line-height: 14px;
  color: rgb(7, 17, 27);
}
.food-desc {
  font-size: 10px;
  line-height: 10px;
  color: rgb(147, 153, 159);
  margin-bottom: 8px;
}
.extra {
  font-size: 14px;
  color: rgb(147, 153, 159);
  line-height: 14px;
}
.monthSell {
  margin-right: 12px;
}
.sellPrice {
  font-weight: 700;
  line-height: 24px;
}
.sellPrice .nowPrice {
  font-size: 14px;
  color: rgb(240, 20, 20);
}
.sellPrice .oldPrice {
  font-size: 10px;
  text-decoration: line-through;
}
</style>
