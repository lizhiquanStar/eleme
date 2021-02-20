<template>
  <div class="addClass">
    <div class="leftDecrease" v-show="food.count > 0" @click="decreaseCount">
      <span class="iconfont icon-jianhao"></span>
    </div>
    <div class="addCount" v-show="food.count > 0">
      {{ food.count }}
    </div>
    <div class="rightAdd" @click="addCartCount">
      <span class="iconfont icon-tianjia"></span>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  props: {
    food: {
      type: Object,
    },
  },
  created() {},
  methods: {
    addCartCount() {
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
    },
    decreaseCount() {
      if (this.food.count) {
        this.food.count--;
      }
    },
  },
};
</script>
<style>
.addClass {
  position: absolute;
  right: 0;
  bottom: -10px;
}
.addCount {
  display: inline-block;
  width: 24px;
  height: 24px;
  font-size: 14px;
  line-height: 34px;
  color: rgb(147, 153, 159);
  text-align: center;
  vertical-align: top;
}
.leftDecrease {
  display: inline-block;
  margin-top: 5px;
}
.leftDecrease .icon-jianhao {
  padding: 6px;
  color: rgb(0, 160, 220);
  font-size: 24px;
  line-height: 24px;
  transform: all 0.4s liner;
}
.rightAdd {
  display: inline-block;
  padding: 6px;
  font-size: 29px;
  color: rgb(0, 160, 220);
  line-height: 24px;
  vertical-align: top;
}
</style>
