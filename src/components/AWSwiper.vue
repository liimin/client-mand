<template>
  <div class="awe-swiper">
    <swiper :options="swiperOption">
      <swiper-slide 
        v-for="(item, index) in items" 
        :key="index"
        :class="val===item.id?'active':''"
        @click.native="handleSwiperItemClick(item)"
        :style="{'height':`${swiperOption.height}px`,'lineHeight':`${swiperOption.height}px`}" >
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
    swiperOption: Object,
    val: [String, Number]
  },
  // watch: {
  //   model: {
  //     immediate: true,
  //     handler(val) {
  //       this._model = val
  //     }
  //   }
  // },
  mounted() {
    this.$nextTick(_ => {
      // console.log(this.val)
    })
    // this.$emit('update:model', this._model)
  },
  methods: {
    beforeChange(from, to) {},
    afterChange(from, to) {},
    handleSwiperItemClick(item) {
      this.$emit('update:val', item.id)
    }
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="stylus" scoped>
.awe-swiper
  height 100%
  .active
    background color-primary !important
    border 2px solid color-primary !important
    color #f
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
</style>


