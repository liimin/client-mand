<template>
  <div class="order-choose-stat card" slot="item">
    <div class="weui-grids">
      <a href="javascript:;" class="weui-grid" v-for="(item,index) in aStatis" :key="index">
        <div class="weui-grid__icon">
          <img :src="item.src" alt="">
        </div>
        <p class="weui-grid__label count">{{item.count}}</p>
        <p class="weui-grid__label title">{{item.title}}</p>
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
      aStatis: [{
        src: 'http://www.gpspas.com:3000/10000/images/guanyin.png',
        title: '总共',
        count: 1000
      },
      {
        src: 'http://www.gpspas.com:3000/10000/images/guanyin.png',
        title: '已选',
        count: 0
      },
      {
        src: 'http://www.gpspas.com:3000/10000/images/guanyin.png',
        title: '剩余',
        count: 68
      }],
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
.order-choose-stat
  border-top none
  .weui-grids::before,
  .weui-grids::after,
  .weui-grid::before,
  .weui-grid::after
    border none
  .weui-grid
    padding 0
    .title
      color #6
      font-size .24rem
    .count
      font-size .32rem
      font-weight bold
</style>


