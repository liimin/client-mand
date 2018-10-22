<template>
  <div class="order-choose-stat card" slot="item">
    <div class="weui-grids">
      <a href="javascript:;" class="weui-grid">
        <div class="weui-grid__icon">
          <img :src="on" alt="">
        </div>
        <p class="weui-grid__label count">{{oStatic.total}}</p>
        <p class="weui-grid__label title">总共</p>
      </a>
      <a href="javascript:;" class="weui-grid">
        <div class="weui-grid__icon">
          <img :src="checked" alt="">
        </div>
        <p class="weui-grid__label count">{{oStatic.checked}}</p>
        <p class="weui-grid__label title">已选</p>
      </a>
      <a href="javascript:;" class="weui-grid">
        <div class="weui-grid__icon">
          <img :src="off" alt="">
        </div>
        <p class="weui-grid__label count">{{oStatic.off}}</p>
        <p class="weui-grid__label title">剩余</p>
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
    statics: Object,
    eventBus: Object
  },
  // computed: {

  // },
  data() {
    return {
      on: require('@/assets/images/on.png'),
      off: require('@/assets/images/off.png'),
      checked: require('@/assets/images/checked.png'),
      isInline: false,
      autoplay: 1000,
      trans: 'slide',
      oStatic: {
        total: 0,
        off: 0,
        checked: 0
      }
    }
  },
  watch: {
    statics: {
      immediate: true,
      handler(val) {
        this.oStatic = val
      }
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
      margin-top 0
    .weui-grid__icon
      width 120px
      height 80px
</style>


