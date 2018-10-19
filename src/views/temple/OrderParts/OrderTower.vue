<template>
<OrderItem :title="title" :isInline="isInline" >
  <div class="order-tower"  slot="item" >
     <AWSwiper :items="sns" :isMulit="true" :trans="trans" :autoplay="autoplay" />
  </div>
</OrderItem>
</template>
<script>
import OrderItem from './OrderItem'
import { AWSwiper } from '@/components'
export default {
  name: 'OrderTower',
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
      // aSns: [],
      isInline: false,
      autoplay: 1000,
      trans: 'slide'
    }
  },
  watch: {
    // sns: {
    //   immediate: true,
    //   handler(val) {
    //     this.aSns = val
    //   }
    // }
  },
  mounted() {
    console.log(this.sns)
    // this.$emit('update:sns', this.aSns)
  },
  methods: {
    handleTabClick(item) {
      item.checked = !item.checked
    }
  }
}
</script>
<style lang="stylus">
.order-tower
  height 300px
  li
    list-style none
    float left
    width 20%
    height 300px
  .banner-item
    float left
    width 100%
    height 100%
    line-height 200px
    text-align center
    font-size 28px
    color #FFF
    box-align center
    align-items center
    box-pack center
    justify-content center
    text-decoration-line none
  .md-swiper-item
    width: 100% !important
    ul
      width: 100% !important
</style>


