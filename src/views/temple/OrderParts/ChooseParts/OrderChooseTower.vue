<template>
<OrderItem :title="title" :isInline="isInline" >
  <div class="order-choose-tower card"  slot="item" >
     <AWSwiper :items="aSns"  :swiperOption="swiperOption" :val.sync="val"/>
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
    title: String,
    eventBus: Object,
    towerId: [String, Number]
  },
  computed: {
    val: {
      set(v) {
        this.eventBus.$emit('update:towerId', v)
      },
      get() {
        return this.towerId
      }
    }
  },
  data() {
    return {
      aSns: [],
      isInline: false,
      swiperOption: {
        height: 40,
        slidesPerView: 3,
        spaceBetween: 50,
        slideToClickedSlide: true,
        // centeredSlides: true,
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
        // this.$nextTick(_ => {
        //   // this.eventBus.$emit('update:towerId', this.towerId)
        // })
      }
    }
  },
  mounted() {
    // this.$nextTick(_ => {
    //   console.log(this.towerId)
    //   this.eventBus.$emit('update:towerId', this.towerId)
    // })
  },
  methods: {
  }
}
</script>
<style lang="stylus">
// .order-choose-tower

</style>


