<template>
    <md-swiper @before-change="beforeChange" @after-change="afterChange" transition="slideY" ref="swiper">
        <md-swiper-item :key="$index" v-for="(item, $index) in items">
            <a href="javascript:void(0)" class="banner-item" :style="{'background': `${item.color}`}">
                {{ item.text }}
            </a>
        </md-swiper-item>
    </md-swiper>
</template>
<script>
import { Swiper, SwiperItem } from 'mand-mobile'
export default {
  name: 'Swiper',
  components: {
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem
  },
  props: {
    items: Array
  },
  methods: {
    beforeChange(from, to) {},
    afterChange(from, to) {}
  }
}
</script>
<style lang="stylus" scoped>
    .banner-item {
      float: left;
      width: 100%;
      height: 100%;
      line-height: 250px;
      text-align: center;
      font-size: 28px;
      color: #FFF;
      box-align: center;
      align-items: center;
      box-pack: center;
      justify-content: center;
      text-decoration-line: none;
    }
</style>


