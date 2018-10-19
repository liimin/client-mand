<template>
  <div class="awe-swiper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in items" :key="index" :style="{'background': `${item.color}`,'height':`${swiperOption.height}px`,'lineHeight':`${swiperOption.height}px`}" >
        <img :src="item.src" v-if="item.src" />
        {{item.text}}
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
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
    autoplay: [Number],
    swiperOption: Object
  },
  methods: {
    beforeChange(from, to) {},
    afterChange(from, to) {}
  },
  mounted() {},
  data() {
    return {

    }
  }
}
</script>
<style lang="stylus" scoped>
.awe-swiper {
  height: 100%;

  .swiper-container {
    height: 100%;
  }
  .swiper-inner {
    width: 100%;
    height: 400px;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
  }
}
</style>


