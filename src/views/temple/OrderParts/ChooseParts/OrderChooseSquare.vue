<template>
<OrderItem :title="title" :isInline="isInline" >
  <div class="order-choose-square card"  slot="item" >
     <AWSwiper :items="aSns" :swiperOption="swiperOption" />
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
      swiperOption: {
        height: 40,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        slideToClickedSlide: true,
        coverflowEffect: {
          rotate: 70,
          stretch: 0,
          depth: 300,
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
.order-choose-square
  min-height 100px
</style>


