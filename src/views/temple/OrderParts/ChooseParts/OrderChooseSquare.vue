<template>
<OrderItem :title="title" :isInline="isInline" >
  <div class="order-choose-square card"  slot="item" >
     <AWSwiper :items="aSns" :isMulit="true" :trans="trans" :autoplay="autoplay" :swiperOption="swiperOption" />
  </div>
</OrderItem>
</template>
<script>
import OrderItem from '../OrderItem'
import { AWSwiper } from '@/components'
export default {
  name: 'OrderChooseSquare',
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
      trans: 'slide',
      swiperOption: {
        height: 100,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
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
  mounted() {
  },
  methods: {
    handleTabClick(item) {
      item.checked = !item.checked
    }
  }
}
</script>
<style lang="stylus">
// .order-choose-square
</style>


