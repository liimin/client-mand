<template>
<div class="wrapper">
  <div class="header">
    <swiper :items="simple" />
  </div>
  <div class="body" v-html="content">
    <!-- <TempleBody :bodyStyle="bodyStyle"/> -->
  </div>
    <md-action-bar :actions="data"></md-action-bar>
</div>
</template>
<script>
// import TempleHeader from "./Header";
// import TempleBody from "./Body";
import { Button, ActionBar, Toast } from 'mand-mobile'
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
    beforeChange(from, to) {
    },
    afterChange(from, to) {
    },
    handleClick() {
      this.$router.push('/temple/order')
    },
    handleBack() {
      this.$router.goBack()
    },
    getDetail() {
      this.$http.get('/temple/detail', { params: { id: 10000 }}).then(res => {
        this.content = (res.data.content).join('')
      }).catch(err => {
        Toast.failed('读取详情出错，请稍后再试')
        console.log(err)
      })
    }
  },
  mounted() {
    this.getDetail()
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
