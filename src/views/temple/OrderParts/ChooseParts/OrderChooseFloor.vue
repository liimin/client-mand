<template>
<OrderItem :title="title" :isInline="isInline" >
  <div class="order-choose-floor card"  slot="item" >
     <AWSwiper :items="aFloors"  :swiperOption="swiperOption"/>
  </div>
</OrderItem>
</template>
<script>
import OrderItem from '../OrderItem'
import { AWSwiper } from '@/components'
export default {
  name: 'OrderChooseFloor',
  components: {
    [OrderItem.name]: OrderItem,
    [AWSwiper.name]: AWSwiper
  },
  props: {
    floors: Array,
    title: String
  },
  data() {
    return {
      aFloors: [],
      isInline: false,
      swiperOption: {
        height: 40,
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: true,
        slideToClickedSlide: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  watch: {
    floors: {
      immediate: true,
      handler(val) {
        this.aFloors = val
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
// .order-choose-tower

</style>


