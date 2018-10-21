<template>
<OrderItem :title="title" :isInline="isInline" >
  <div class="order-choose-lamp card"  slot="item" >
    <div class="weui-grids" :style="{'height':`${height}px`,'overflowY':'auto'} ">
      <a href="javascript:;" class="weui-grid" v-for="(item,index) in aLamps" :key="index">
        <div class="weui-grid__icon">
          <img :src="item.src" alt="">
          <p class="weui-grid__label title">{{item.title}}</p>
        </div>
      </a>
    </div>
  </div>
</OrderItem>
</template>
<script>
import OrderItem from '../OrderItem'
export default {
  name: 'OrderChooseLamp',
  components: {
    [OrderItem.name]: OrderItem
  },
  props: {
    lamps: Array,
    title: String,
    eventBus: Object
  },
  data() {
    return {
      aLamps: [],
      isInline: false,
      height: 200
    }
  },
  watch: {
    // lamps: {
    //   immediate: true,
    //   handler(val) {
    //     this.aLamps = val
    //   }
    // }
  },
  mounted() {
    const font = parseInt(document.documentElement.style.fontSize)
    const clientHeight = document.documentElement.clientHeight
    this.height = clientHeight - 74 * 3 - font * 2 * 0.7 - 90.8 - 20 - 16
    setTimeout(() => {
      for (let index = 0; index < 108; index++) {
        this.aLamps.push({
          src: 'http://www.gpspas.com:3000/10000/images/guanyin.png',
          title: 'A' + (index + 1)
        })
      }
    }, 1000)
  },
  methods: {
  }
}
</script>
<style lang="stylus">
.order-choose-lamp
  .weui-grid
    width 14.285714285714%
    padding 10px 0 30px
    margin-bottom 10px
    .weui-grid__icon
      width 76px
      height 76px
      .title
        margin-top 4px
        font-size 14px
        color #6
</style>


