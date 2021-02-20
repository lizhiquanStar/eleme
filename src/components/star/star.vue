<template>
  <div class="star" :class="starType">
    <span
      class="star-item"
      :class="itemClass"
      v-for="(itemClass, index) in itemClasses"
      :key="index"
    ></span>
  </div>
</template>
<script>
const LENGTH = 5;
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";
export default {
  props: {
    size: {
      type: Number,
    },
    score: {
      type: Number,
    },
  },
  computed: {
    starType() {
      return "star-" + this.size;
    },
    itemClasses() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;
      let interger = Math.floor(score);
      for (let i = 0; i < interger; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    },
  },
};
</script>
<style>
.star-item {
  display: inline-block;
  background-repeat: no-repeat;
}
.star-48 .star-item {
  width: 20px;
  height: 20px;
  margin-right: 22px;
  background-size: 20px 20px;
}
.star-36 .star-item {
  width: 15px;
  height: 15px;
  margin-right: 6px;
  background-size: 15px 15px;
}
.star-24 .star-item {
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-size: 10px 10px;
}
.star-item :last-child {
  margin-right: 0;
}
/* 尺寸是48 */
.star-48 .star-item.on {
  background-image: url(star48_on@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(star48_on@3x.png);
  }
}
.star-48 .star-item.half {
  background-image: url(star48_half@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(star48_half@3x.png);
  }
}
.star-48 .star-item.off {
  background-image: url(star48_off@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(star48_off@3x.png);
  }
}
/* 尺寸是36 */
.star-36 .star-item.on {
  background-image: url(star36_on@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(star36_on@3x.png);
  }
}
.star-36 .star-item.half {
  background-image: url(star36_half@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(star36_half@3x.png);
  }
}
.star-36 .star-item.off {
  background-image: url(star36_off@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(star36_off@3x.png);
  }
}

/* 尺寸是24 */
.star-24 .star-item.on {
  background-image: url(star24_on@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(star24_on@3x.png);
  }
}
.star-24 .star-item.half {
  background-image: url(star24_half@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(star24_half@3x.png);
  }
}
.star-24 .star-item.off {
  background-image: url(star24_off@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(star24_off@3x.png);
  }
}

/* 首页需要的 */
/* .content .support .icon.decrease{
  background-image: url(decrease_1@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(decrease_1@3x.png);
  }
}
.content .support .icon.discount{
  background-image: url(discount_1@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(discount_1@3x.png);
  }
}
.content .support .icon.guarantee{
  background-image: url(guarantee_1@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(guarantee_1@3x.png);
  }
}
.content .support .icon.invoice{
  background-image: url(invoice_1@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(invoice_1@3x.png);
  }
}
.content .support .icon.special{
  background-image: url(special_1@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(special_1@3x.png);
  }
} */
</style>
