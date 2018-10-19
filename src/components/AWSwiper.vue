<template>
<div class="aw-swiper">
   <md-card>
  <md-card-media class="swiper-inner">
  <swiper :options="swiperOption">
    <swiper-slide v-for="(item, index) in items" :key="index">
       <img :src="item.src" v-if="item.src"/>
      {{item.text}}
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
  </md-card-media>
   </md-card>
</div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'AWSwiper',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    items: Array,
    isMulit: Boolean,
    trans: String,
    autoplay: [Number]
  },
  methods: {
    beforeChange(from, to) {},
    afterChange(from, to) {}
  },
  mounted() {
  },
  data() {
    return {
      swiperOption: {
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
  }
}
</script>
<style lang="stylus" scoped>
.aw-swiper
  height 100%
  .swiper-container
    height 100%
  .swiper-inner 
    width 100%
    height 400px
    padding-top 50px
    padding-bottom 50px
  .swiper-slide 
    background-position center
    background-size cover
    width 300px
    height 300px
</style>


