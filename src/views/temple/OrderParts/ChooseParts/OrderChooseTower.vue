<template>
<OrderItem :title="title" :isInline="isInline" >
  <div class="order-choose-tower card"  slot="item" >
     <AWSwiper :items="aSns"  :swiperOption="swiperOption"/>
  </div>
</OrderItem>
</template>
<script>
import OrderItem from '../OrderItem'
import { AWSwiper } from '@/components'
export default {
  name: 'OrderChooseTower',
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
        height: 80,
        slidesPerView: 5,
        spaceBetween: 50,
        // init: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1024: {
            slidesPerView: 10,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 8,
            spaceBetween: 20
          },
          640: {
            slidesPerView: 6,
            spaceBetween: 10
          },
          320: {
            slidesPerView: 3,
            spaceBetween: 10
          }
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
// .order-choose-tower

</style>


