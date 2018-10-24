<template>
<OrderItem :title="title" :isInline="isInline" >
  <div class="order-choose-lamp card"  slot="item" :style="{'height':`${height}px`,'overflowY':'auto'} ">
      <div class="weui-grids" v-for="(rows,index) in aLamps" :key="index">
        <a href="javascript:;" class="weui-grid" v-for="(item,idx) in rows" :key="idx">
          <div class="weui-grid__icon" @click="handleLampSelect(item)">
            <img :src="off" alt="" v-if="!item.checked && item.status=='0'">
            <img :src="on" alt="" v-if="item.status=='1'">
            <img :src="checked" alt="" v-if="item.checked && item.status !='1'">
            <p class="weui-grid__label title">{{item.row+'-'+item.col}}</p>
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
      height: 200,
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
    const font = parseInt(document.documentElement.style.fontSize)
    const clientHeight = document.documentElement.clientHeight
    this.height = clientHeight - 41.2 * 2 - 46.2 - font * 2 * 0.7 - 97.8 - 20 - 16
  },
  methods: {
    handleLampSelect(item) {
      if (+item.status === 1) return
      item.checked = !item.checked
      this.eventBus.$emit('update:lampcheck')
    }
  }
}
</script>
<style lang="stylus">
.order-choose-lamp
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
</style>


