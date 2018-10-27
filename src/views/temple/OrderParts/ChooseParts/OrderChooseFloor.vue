<template>
<OrderItem :title="title" :isInline="isInline" >
  <div class="order-choose-floor card"  slot="item" >
     <AWSwiper :items="aFloors"  :swiperOption="swiperOption" :val.sync="val"/>
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
    title: String,
    eventBus: Object,
    floorId: [String, Number]
  },
  computed: {
    val: {
      set(v) {
        this.eventBus.$emit('update:floorId', v)
      },
      get() {
        return this.floorId
      }
    }
  },
  data() {
    return {
      aFloors: [],
      isInline: false,
      swiperOption: {
        height: 25,
        slidesPerView: 3,
        spaceBetween: 50,
        slideToClickedSlide: true,
        // centeredSlides: true,
        // init: false,
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true
        // },
        breakpoints: {
          1024: {
            slidesPerView: 8,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 20
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 10
          }
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
  }
}
</script>
<style lang="stylus">
// .order-choose-tower

</style>


