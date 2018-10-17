<template>
<div class="wrapper">
  <TempleHeader :items="items" :height="header_height" />
  <div class="body">
    <div class="md-example-box-content">{{summary}}</div>
    <md-button type="link" size="small" @click="handleDetailClick">查看详情</md-button>
  </div>
</div>
</template>
<script>
import { Button } from 'mand-mobile'
import detail from '@/mixins/detail'
import TempleHeader from './Header'
export default {
  name: 'Temple',
  components: {
    [TempleHeader.name]: TempleHeader,
    [Button.name]: Button
  },
  mixins: [detail],
  data() {
    return {
      items: [],
      summary: '',
      header_height: '3rem'
    }
  },
  mounted() {
    this.getDetail().then(detail => {
      this.summary = detail.summary
      this.items = detail.swiper_items
      this.header_height = detail.header_height
    })
  },
  computed: {
    bodyStyle() {
      return {
        height: `${window.innerHeight / 37.5 - (80 / 2 / 37.5)}rem`
      }
    }
  },
  methods: {
    handleDetailClick() {
      this.$router.push('/temple/detail')
    }
  }
}
</script>
<style lang="stylus" scoped>
.wrapper
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
    .md-button
      float left
    .md-button.link
      background-color transparent
      color: color-primary
      border 1px solid color-primary
      height .5rem
      margin-top 20px
</style>
