<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" />
      </div>
      <div class="content">
        <div class="title">
          <div class="brand"></div>
          <div class="name">{{ seller.name }}</div>
        </div>
        <div class="description">
          {{ seller.description }} / {{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <div class="icon"></div>
          <div class="supports">{{ seller.supports[0].description }}</div>
        </div>
      </div>
      <div class="support-count" @click="showDetail">
        <span>{{ seller.supportsLength }}个</span>
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="iconfont icon-youjiantou"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="背景虚化" width="100%" height="100%" />
    </div>
    <!-- sticky-footer布局，为解决浮层超过屏幕高度，底部无法固定问题 -->
    <transition name="bounce">
      <div class="detail" v-show="showScreen" transition="fade">
        <div class="detail-wrapper">
          <div class="detail-main clearfix">
            <h1 class="detail-name">{{ seller.name }}</h1>
            <div class="showStar">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="detailTitle">
              <div class="lineOne"></div>
              <div class="textPadd">优 惠 信 息</div>
              <div class="lineOne"></div>
            </div>
            <ul class="detailSupports" v-if="seller.supports">
              <li
                class="supportItem"
                v-for="(detailItem, index) in seller.supports"
                :key="index"
              >
                <span
                  class="icon"
                  :class="classMap[seller.supports[index].type]"
                ></span>
                <span class="text">{{
                  seller.supports[index].description
                }}</span>
              </li>
            </ul>
            <div class="detailTitle">
              <div class="lineOne"></div>
              <div class="textPadd">商 家 公 告</div>
              <div class="lineOne"></div>
            </div>
            <div class="bulletinDetail">{{ seller.bulletin }}</div>
          </div>
        </div>
        <div class="detail-close" @click="closeDetail">
          <i class="iconfont icon-guanbi"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import star from "../star/star";
export default {
  data() {
    return {
      showScreen: false,
    };
  },
  props: {
    seller: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  methods: {
    showDetail() {
      this.showScreen = true;
    },
    closeDetail() {
      this.showScreen = false;
    },
  },
  component: {
    star,
  },
};
</script>
<style>
.bounce-enter-active {
  opacity: 1;
  background: rgba(7, 17, 27, 0.8);
}
.bounce-leave-active {
  opacity: 0;
  background: rgba(7, 17, 27, 0);
}
/* 设置优惠活动一一对应图标 */
.supportItem {
  padding: 0 12px;
  margin-bottom: 12px;
}
.supportItem:last-child {
  margin-bottom: 0;
}
.supportItem .icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
  vertical-align: middle;
  margin-right: 6px;
}
.supportItem .icon.decrease {
  display: inline-block;
  background-size: 16px 16px;
  background-image: url(decrease_2@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(decrease_2@3x.png);
  }
}
.supportItem .icon.discount {
  display: inline-block;
  background-image: url(discount_2@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(discount_2@3x.png);
  }
}
.supportItem .icon.guarantee {
  display: inline-block;
  background-image: url(guarantee_1@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(guarantee_1@3x.png);
  }
}
.supportItem .icon.invoice {
  display: inline-block;
  background-image: url(invoice_1@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(invoice_1@3x.png);
  }
}
.supportItem .icon.special {
  display: inline-block;
  background-image: url(special_1@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(special_1@3x.png);
  }
}
/* 清除浮动 */
.clearfix {
  display: inline-block;
}
.clearfix::after {
  display: block;
  content: ".";
  height: 0;
  line-height: 0;
  clear: both;
  visibility: hidden;
}

.header {
  position: relative;
  color: #fff;
  overflow: hidden;
  background-color: rgba(7, 17, 27, 0.5);
}
.content-wrapper {
  padding: 24px 12px 18px 24px;
}
.content-wrapper .avatar {
  display: inline-block;
  vertical-align: top;
}
.content-wrapper .avatar img {
  border-radius: 2px;
}
.content-wrapper .content {
  display: inline-block;
  margin-left: 16px;
  position: relative;
}
.content .title .brand {
  display: inline-block;
  vertical-align: top;
  width: 30px;
  height: 18px;
  background-image: url(brand@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(brand@3x.png);
  }
  background-repeat: no-repeat;
  background-size: 30px 18px;
}
.content .title .name {
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
  margin-left: 6px;
}
.content .description {
  font-size: 12px;
  font-weight: 200;
  line-height: 1;
  margin: 8px 0 10px;
}
.content .support .icon {
  display: inline-block;
  vertical-align: top;
  width: 12px;
  height: 12px;
  background-repeat: no-repeat;
  background-size: 12px 12px;
  margin-right: 4px;
  background-image: url(decrease_1@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(decrease_1@3x.png);
  }
}
.content .support .supports {
  display: inline-block;
  font-size: 10px;
  font-weight: 200;
  line-height: 12px;
  vertical-align: top;
}
.content-wrapper {
  position: relative;
}
.support-count {
  position: absolute;
  bottom: 16px;
  right: 12px;
  padding: 7px 8px;
  border-radius: 25px;
  font-size: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  font-weight: 200;
  line-height: 12px;
}
.bulletin-wrapper {
  position: relative;
  height: 28px;
  font-size: 10px;
  font-weight: 200;
  line-height: 28px;
  padding: 0 22px 0 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: top;
  background: rgba(0, 0, 0, 0.2);
}
.bulletin-wrapper .bulletin-title {
  display: inline-block;
  width: 22px;
  height: 12px;
  margin-top: 8px;
  background-image: url(bulletin@2x.png);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url(bulletin@3x.png);
  }
  background-repeat: no-repeat;
  background-size: 22px 12px;
  vertical-align: top;
}
.bulletin-wrapper .bulletin-text {
  padding-left: 4px;
}
.bulletin-wrapper .icon-youjiantou {
  position: absolute;
  right: 12px;
  top: 1px;
}
.background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  background: rgba(7, 17, 27, 0.8);
  filter: blur(5px);
}
.detail {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: all 0.5s;
  background: rgba(7, 17, 27, 0.8);
  z-index: 100;
  /* 下述代码是为了在苹果手机上实现模糊的功能 */
  backdrop-filter: blur(10px);
}
.detail-wrapper {
  min-height: 100%;
}
.detail-main {
  margin-top: 64px;
  padding-bottom: 64px;
  width: 100%;
}
.detail-name {
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
}
.detail-close {
  position: relative;
  width: 32px;
  height: 32px;

  margin: -64px auto 0;
  clear: both;
}
.detail-close .icon-guanbi {
  font-size: 32px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
}
.showStar {
  text-align: center;
  margin-top: 16px;
}
.detailTitle {
  display: flex;
  width: 80%;
  margin: 28px auto 24px auto;
}
.detailTitle .lineOne {
  flex: 1;
  position: relative;
  top: -6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.detailTitle .textPadd {
  padding: 0 12px;
}
.detailSupports {
  width: 80%;
  margin: 0 auto;
}
.supportItem .text {
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
}
.bulletinDetail {
  padding: 0 12px;
  font-size: 12px;
  font-weight: 200;
  line-height: 24px;
}
</style>
