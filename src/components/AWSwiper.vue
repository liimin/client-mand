<template>
  <div class="awe-swiper">
    <swiper :options="swiperOption">
      <swiper-slide 
        v-for="(item, index) in items" 
        :key="index"
        :class="{'active':val===item.id}"
        @click.native="handleSwiperItemClick(item)"
        :style="{'height':`${swiperOption.height}px`,'lineHeight':`${swiperOption.height}px`}" >
          <div class="conner">
            <md-icon name="circle-right" size="xs"></md-icon>
          </div>
          <img :src="item.src" v-if="item.src" />
          {{item.text}}
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { Icon } from 'mand-mobile'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'AWSwiper',
  components: {
    swiper,
    swiperSlide,
    [Icon.name]: Icon
  },
  props: {
    items: Array,
    swiperOption: Object,
    val: [String, Number]
  },
  methods: {
    handleSwiperItemClick(item) {
      if (this.val === item.id) return
      this.$emit('update:val', item.id)
    }
  }
}
</script>
<style lang="stylus">
</style>
<style lang="stylus" scoped>
.awe-swiper
  height 100%
  .active
    // background-color rgba(183,0,0,.5) !important
    background-color rgba(184,0,0,.1) !important
    border 2px solid color-primary !important
    // color #f
    background-size .4rem auto
    .conner
      display block !important
      right -0.3rem !important
      .md-icon-circle-right
        left: 0.48rem !important
        top 0 !important
  .swiper-container 
    height 100%
  .swiper-inner 
    width 100%
    height 400px
    padding-top: 50px
    padding-bottom: 50px
  .swiper-slide 
    background-position center
    background-size cover
    width: 300px
    background-color #f0
    overflow hidden
</style>


