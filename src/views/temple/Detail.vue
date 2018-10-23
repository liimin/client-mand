<template>
<div class="wrapper">
  <TempleHeader :items="items" :height="header_height" />
  <article class="weui-article" v-html="content">
  </article>
  <!-- <div class="body" v-html="content">
    <TempleBody :bodyStyle="bodyStyle"/> 
  </div> -->
<md-action-bar :actions="data"></md-action-bar>
</div>
</template>
<script>
// import TempleHeader from "./Header";
// import TempleBody from "./Body";
import { Button, ActionBar } from 'mand-mobile'
import TempleHeader from './Header'
import detail from '@/mixins/detail'
// import simple from 'mand-mobile/components/swiper/demo/data/simple'
export default {
  name: 'Temple',
  components: {
    [TempleHeader.name]: TempleHeader,
    [Button.name]: Button,
    [ActionBar.name]: ActionBar
  },
  mixins: [detail],
  data() {
    return {
      items: [],
      header_height: '3rem',
      data: [
        {
          text: '返回',
          onClick: this.handleBack
        },
        {
          text: '我要供灯',
          onClick: this.handleClick
        }
      ],
      content: ''
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
    handleClick() {
      this.$router.push('/temple/order')
    },
    handleBack() {
      this.$router.goBack()
    }
  },
  mounted() {
    this.getDetail().then(detail => {
      this.content = (detail.content).join('')
      this.items = detail.swiper_items
      this.header_height = detail.header_height
    })
  }
}
</script>
<style lang="stylus">
.wrapper
  img
    width 100%
  .content
    font-size 200
</style>

<style lang="stylus" scoped>
.wrapper
  text-align left 
  // .body
  //   float left
  //   width 100%
  //   padding 10px 20px 20px
  //   color color-text-base
  //   font-size .3rem
  //   text-align left
  //   // background color-bg-base
  //   box-sizing border-box
  //   line-height 1.5
  //   text-indent 2em
  //   margin-bottom 1rem
  //   .md-button
  //     float left

</style>
