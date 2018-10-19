<template>
    <md-swiper @before-change="beforeChange" @after-change="afterChange"  :transition="trans" :autoplay="autoplay" ref="swiper">
        <md-swiper-item :key="$index" v-for="(item, $index) in items">
            <a href="javascript:void(0)" class="banner-item" :style="{'background': `${item.color}`}" v-if="!isMulit">
                <img :src="item.src" v-if="item.src"/>
                {{item.text}}
            </a>
            <ul v-else >
              <li :key="$index1" v-for="(sub, $index1) in item" >
                <a href="javascript:void(0)" class="banner-item" :style="{'background': `${sub.color}`}">
                  <img :src="sub.src" v-if="sub.src"/>
                  {{sub.text}}
                </a>
              </li>
            </ul>
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
    this.$refs.swiper.stop()
  }
}
</script>
<style lang="stylus" scoped>
    .banner-item {
      float: left;
      width: 100%;
      height: 100%;
      line-height: 100%;
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


