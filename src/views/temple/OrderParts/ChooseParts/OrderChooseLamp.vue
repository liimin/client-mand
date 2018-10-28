<template>
<!-- 'overflowY':'auto' -->
<OrderItem :title="title" :isInline="isInline" >,
  <div class="order-choose-lamp card"  slot="item" :style="{'height':`${height}rem`,'overflowY':'auto'} ">
      <!-- <md-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      @scroll="$_onScroll"
    > -->
      <div class="weui-grids scroll-view-category" v-for="(rows,index) in aLamps" :key="index">
         <p class="scroll-view-category-title">{{ rows[0].row }}</p>
        <a href="javascript:;" class="weui-grid scroll-view-list" v-for="(item,idx) in rows" :key="idx">
          <div class="weui-grid__icon" @click="handleLampSelect(item)">
            <img :src="off" alt="" v-show="!item.checked && item.status=='0'">
            <img :src="on" alt="" v-show="item.status=='1'">
            <img :src="checked" alt="" v-show="item.checked && item.status !='1'">
            <p class="weui-grid__label title">{{item.row+'-'+item.col}}</p>
          </div>
        </a>
      </div>
      <!-- </md-scroll-view> -->
    <!-- <p v-if="activeBlockIndex > 0" class="scroll-view-striky-title">{{ activeBlockIndex }}</p> -->
  </div>
</OrderItem>
</template>
<script>
import OrderItem from '../OrderItem'
import { ScrollView } from 'mand-mobile'
export default {
  name: 'OrderChooseLamp',
  components: {
    [OrderItem.name]: OrderItem,
    [ScrollView.name]: ScrollView
  },
  props: {
    lamps: Array,
    title: String,
    eventBus: Object
  },
  computed: {
    activeBlockIndex() {
      let activeIndex = -1
      this.dimensions.forEach((dimension, index) => {
        if (this.scrollY >= dimension[0] && this.scrollY <= dimension[1]) {
          activeIndex = index + 1
        }
      })
      return activeIndex
    }
  },
  data() {
    return {
      aLamps: [],
      isInline: false,
      height: 200,
      dimensions: [],
      scrollY: 0,
      on: require('@/assets/images/on.png'),
      off: require('@/assets/images/off.png'),
      checked: require('@/assets/images/checked.png')
    }
  },
  watch: {
    lamps: {
      immediate: true,
      handler(val) {
        this.aLamps = val
      }
    }
  },
  mounted() {
    // const font = parseInt(document.documentElement.style.fontSize)
    // const clientHeight = document.documentElement.clientHeight
    // this.height = clientHeight - 41 * 2 - 20 * 3 - 46 - font * 2 * 0.7 - 97.8 - 16 - 26
    this.height = 5.3// 13.34 - 2 * 0.7 - (1.956) - (1.2) - (0.82 * 2) - (0.92) - (0.84)
    this.$_initScrollBlock()
  },
  methods: {
    handleLampSelect(item) {
      if (+item.status === 1) return
      item.checked = !item.checked
      this.eventBus.$emit('update:lampcheck')
    },
    $_initScrollBlock() {
      const blocks = this.$el.querySelectorAll('.scroll-view-category')
      let offset = 0
      Array.prototype.slice.call(blocks).forEach((block, index) => {
        const innerHeight = block.clientHeight
        this.$set(this.dimensions, index, [offset, offset + innerHeight])
        offset += innerHeight
      })
    },
    $_onScroll({ scrollTop }) {
      console.log(scrollTop)
      this.scrollY = scrollTop
    }
  }
}
</script>
<style lang="stylus">
.order-choose-lamp
  position relative
  .weui-grids::before,
  .weui-grids::after,
  .weui-grid::before,
  .weui-grid::after
    border none
  .weui-grid
    width 14.285714285714%
    padding 10px 0 30px
    margin-bottom 10px
    &__icon
      width 100px
      height 76px
      .title
        margin-top 4px
        font-size 14px
        color #6
  .scroll-view-striky-title
    position absolute
    top 0
    left 0
    right 0
  .scroll-view-category-title, .scroll-view-striky-title
    text-align center
    font-size 32px
    font-weight bold 
    font-family DINAlternate-Bold
  .scroll-view-item
    padding 10px 0
    text-align center
    font-size 32px
    border-bottom .5px solid #efefef
  .scroll-view-striky-title
    margin-top 12px
</style>


