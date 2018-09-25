<template>
<div class="wrapper">
  <div class="header">
    <swiper :items="simple" />
  </div>
  <div class="body">
    <div class="md-example-box-content">每个人都有属于自己的一片森林，也许我们从来不曾去过，但它一直在那里，总会在那里。迷失的人迷失了，相逢的人会再相逢。</div>
    <md-button type="link" @click="handleDetailClick">查看详情</md-button>
  </div>
</div>
</template>
<script>
import { Button } from 'mand-mobile'
import { Swiper } from '@/components'
import simple from 'mand-mobile/components/swiper/demo/data/simple'
export default {
  name: 'Temple',
  components: {
    [Swiper.name]: Swiper,
    [Button.name]: Button
  },
  data() {
    return {
      simple
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
    handleDetailClick() {
      this.$router.push('/temple/detail')
    }
  }
}
</script>
<style lang="stylus" scoped>
// @import '~@/assets/style/mand-mobile.1.6.0-theme.styl'
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
    font-size .4rem
    text-align left
    background color-bg-base
    box-sizing border-box
    line-height 1.5
    text-indent 2em
    .md-button
      float left
</style>
