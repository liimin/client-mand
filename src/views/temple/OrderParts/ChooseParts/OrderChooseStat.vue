<template>
  <div class="order-choose-stat card" slot="item">
    <div class="weui-grids">
      <a href="javascript:;" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="http://www.gpspas.com:3000/10000/images/guanyin.png" alt="">
        </div>
        <p class="weui-grid__label">Grid</p>
      </a>
      <a href="javascript:;" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="http://www.gpspas.com:3000/10000/images/guanyin.png" alt="">
        </div>
        <p class="weui-grid__label">Grid</p>
      </a>
      <a href="javascript:;" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="http://www.gpspas.com:3000/10000/images/guanyin.png" alt="">
        </div>
        <p class="weui-grid__label">Grid</p>
      </a>
    </div>
  </div>
</template>
<script>
import OrderItem from '../OrderItem'
import { AWSwiper } from '@/components'
export default {
  name: 'OrderChooseStat',
  components: {
    [OrderItem.name]: OrderItem,
    [AWSwiper.name]: AWSwiper
  },
  props: {
    sns: Array,
    title: String
  },
  data() {
    return {
      aSns: [],
      isInline: false,
      autoplay: 1000,
      trans: 'slide'
    }
  },
  watch: {
    sns: {
      immediate: true,
      handler(val) {
        this.aSns = val
      }
    }
  },
  mounted() {},
  methods: {
    handleTabClick(item) {
      item.checked = !item.checked
    }
  }
}
</script>
<style lang="stylus">
// .order-choose-stat
//   background-color #fff
//   margin-bottom 10px
</style>


