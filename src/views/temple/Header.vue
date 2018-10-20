<template>
  <div class="t-header" :style="{ 'height':'3rem' }" v-if="items.length>1">
     <!-- swiper1 -->
      <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop" >
        <swiper-slide :style="{'backgroundImage':`url('${item.src}')`}"  v-for="(item,index) in items" :key="index"></swiper-slide>
      </swiper>
      <!-- swiper2 Thumbs -->
      <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
        <swiper-slide :style="{'backgroundImage':`url('${itm.src}')`}"  v-for="(itm,idx) in items" :key="idx"></swiper-slide>
      </swiper>
  </div>
</template>
<script>
// import { Swiper } from '@/components'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'TempleHeader',
  components: {
    // [Swiper.name]: Swiper
    swiper,
    swiperSlide
  },
  props: {
    items: Array,
    height: String
  },
  watch: {
    // items: {
    //   handle(val) {
    //     this.$set(this.swiperOptionTop, 'loopedSlides', val.length)
    //     this.$set(this.swiperOptionThumbs, 'loopedSlides', val.length)
    //   }
    // }
  },
  data() {
    return {
      swiperOptionTop: {
        speed: 1000,
        autoplay: true,
        // effect: 'flip',
        spaceBetween: 3,
        loop: true,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        loopedSlides: 4, // looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true

      },
      swiperOptionThumbs: {
        spaceBetween: 3,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        loop: true,
        loopedSlides: 4, // looped slides should be the same
        slideToClickedSlide: true
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$set(this.swiperOptionTop, 'loopedSlides', this.items.length)
        this.$set(this.swiperOptionThumbs, 'loopedSlides', this.items.length)
        var swiperTop = this.$refs.swiperTop.swiper
        var swiperThumbs = this.$refs.swiperThumbs.swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
      }, 3000)
    })
  }
}
</script>
<style lang="stylus" scoped>
  .swiper-container
    background-color #6
  .swiper-slide
    background-size cover
    background-position center
  .gallery-top
    height 80%!important
    width 100%
  .gallery-thumbs
    height 20%!important
    box-sizing border-box
    padding 10px 0
  .gallery-thumbs .swiper-slide
    width 25%
    height 100%
    opacity 0.4
  .gallery-thumbs .swiper-slide-active
    opacity: 1
</style>
