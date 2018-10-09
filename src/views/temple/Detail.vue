<template>
<div class="wrapper">
  <div class="header">
    <swiper :items="simple" />
  </div>
  <div class="body">
    <div class="md-example-box-content">每个人都有属于自己的一片森林，也许我们从来不曾去过，但它一直在那里，总会在那里。迷失的人迷失了，相逢的人会再相逢。</div>
    <div class="md-example-box-content">每个人都有属于自己的一片森林，也许我们从来不曾去过，但它一直在那里，总会在那里。迷失的人迷失了，相逢的人会再相逢。</div>
    <div class="md-example-box-content">每个人都有属于自己的一片森林，也许我们从来不曾去过，但它一直在那里，总会在那里。迷失的人迷失了，相逢的人会再相逢。</div>
    <div class="md-example-box-content">每个人都有属于自己的一片森林，也许我们从来不曾去过，但它一直在那里，总会在那里。迷失的人迷失了，相逢的人会再相逢。</div>
    <div class="md-example-box-content">每个人都有属于自己的一片森林，也许我们从来不曾去过，但它一直在那里，总会在那里。迷失的人迷失了，相逢的人会再相逢。</div>
    <div class="md-example-box-content">每个人都有属于自己的一片森林，也许我们从来不曾去过，但它一直在那里，总会在那里。迷失的人迷失了，相逢的人会再相逢。</div>
    <div class="md-example-box-content">每个人都有属于自己的一片森林，也许我们从来不曾去过，但它一直在那里，总会在那里。迷失的人迷失了，相逢的人会再相逢。</div>
    <div class="md-example-box-content">每个人都有属于自己的一片森林，也许我们从来不曾去过，但它一直在那里，总会在那里。迷失的人迷失了，相逢的人会再相逢。</div>
    <!-- <TempleBody :bodyStyle="bodyStyle"/> -->
  </div>
    <md-action-bar :actions="data"></md-action-bar>
</div>
</template>
<script>
// import TempleHeader from "./Header";
// import TempleBody from "./Body";
import { Button, ActionBar } from 'mand-mobile'
import { Swiper } from '@/components'
import simple from 'mand-mobile/components/swiper/demo/data/simple'
export default {
  name: 'Temple',
  components: {
    [Swiper.name]: Swiper,
    [Button.name]: Button,
    [ActionBar.name]: ActionBar
  },
  data() {
    return {
      simple,
      data: [
        {
          text: '返回',
          onClick: this.handleBack
        },
        {
          text: '我要供灯',
          onClick: this.handleClick
        }
      ]
    }
  },
  computed: {
    bodyStyle() {
      return {
        height: `${window.innerHeight / 37.5 - (80 / 2 / 37.5)}rem`
      }
    }
  },
  methods: {
    beforeChange(from, to) {
    },
    afterChange(from, to) {
    },
    handleClick() {
      this.$router.push('/temple/order')
    },
    handleBack() {
      this.$router.goBack()
    }
  }
}
</script>
<style lang="stylus" scoped>
.wrapper
  .header
    height:300px
    .banner-item
      float left
      width 100%
      height 100%
      line-height 250px
      text-align center
      font-size 28px
      color #FFF
      box-align center
      align-items center
      box-pack center
      justify-content center
      text-decoration-line none
  .body
    float left
    width 100%
    padding 10px 20px 20px
    color color-text-base
    font-size .3rem
    text-align left
    // background color-bg-base
    box-sizing border-box
    line-height 1.5
    text-indent 2em
    margin-bottom 1rem
    .md-button
      float left
</style>
