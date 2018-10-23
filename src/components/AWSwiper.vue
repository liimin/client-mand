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
  methods: {
    handleSwiperItemClick(item) {
      if (this.val === item.id) return
      this.$emit('update:val', item.id)
    }
  }
}
</script>
<style>
  .awe-swiper .active{
    /* background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAFK0lEQVRoQ93ZaWwUZRgH8P+zR2lLWrfuzC5sO9Nq5ZCKSvH6YDVaibYSLcRIDRExxlrFEhJjRGNI/KLWhEMRbDQgCdWEfhBJDdBjt63iB48IYgqUpCQelYSWhmKAtN2dx7zv9qbHlO5ud3a+bGb3vX77vMdkHsLA1aTqmw1wxeC9FT4JCDHhMhjdBJwEcaDrwj+HngVCg+OnkZCAR6tixitWwE0yxnYbaP0jnX8dE2VGARmggKrtBbDe4sheGEZx4cWOwCigQNUAdreqVQMotTKSGX/bu+wLrwMKVBPgMFStBsAqKyOJee24wIFIJrlV/SDAxZZFElVPCAxHMieZPaFaZjxmTSQdnxQoUL/6fKk9/fajAAosiOyYEihQxxQlrY9S6hl4wEpIAi6ZAsrp6spxGc6QH0C+VZAE+s80UKAa0zLdlGxrArB0tpCODBeW7P4YrvvuRfv7H6Fjz74JhzJtoER6PF4bJzUzaHGskXMyfbjrwH7MXXCb7Lqvqws/5i2PLDC8JjVfL+F7ALmxQqYuXCBxyb75Q11eOXMWPz+8IvJA0aLfNT8bDnsLiLJvBOlw3QS16AlcPn4CV860TdpE+j35uLP6SzgzXMO4trP4vXQdev89Hx2gRHq0XDBaAGROF7n86CGkL7sbRl8/Wss2oOtI3bhNuFc8irwvdsOekjL0+6WffsEfz7+EYE/PpN3e0Boc22JAuWURU1AgvdNBPnj6BJw3Z8gq3B9E66sV6Kw9PKqJeWueweJtlSCHY+j7zsN1OFVeAaO3d8ruIgKUR4hXu8MwxCMslCl7HSjgWfUUluzaAbLbw8hgEKc2bMKFb2vlvf56OXLf3QzQ8EbfsW8/zr69BTAMU91EDCinq5KdDxh+EIYXyhTD8K4uwe2fbhtGhkI4vfENpC3Ng1b+8nBtZpyr3Io/t+80BRssFFGgaDTgzbqfDTQAlGZ2JJ6nV8pzbeQ0HFlXRLbtzXdw/usDZpscKhdxoGi5WdUKQsARAHPNjkhdWYy8qp0g5/BaE3VDV6+htew1XGwImG1qVLmoAGUk3Xoh2/g7AMlmR6YUPY68z3fBluSUVfq7u3Fy7Yu4/NsJs01cVy5qQIlUs4oNpoNESDI7QnEkLNpaKc82seFcaz9ntuq45aIKFD02ebQSNlDDhHBYYnxFHSg8jYpWSsTVAIXPgxheMQHKSKr6CyHwXgJsMfQhZkC5JhW9jImrxr6qjCY4psDwxqNvBHiHeP8aTdhg2zEHio79qv4WwB8mLDC88WRtIaL3oo2clQgOovxq1gcAbY4mclaB4emqbQewKVrIWQdKpKJ9BkJ5NJBxAYxmRisugCJyDNiaPFo1M56LZCTjBiifdgAHq9oBBlZHChlXQIGqAZIUVf+GwU9GAhl3wHAkc5JZCdUyzTyjFZdAgaz1+VJT++3ircBDM4lk3AIF6pCipM2llHqaQUYrroFyurpyXOwMNTIwcQJikhDHPVA+t84go2UJoEDWeb0eh+FswTQzWpYBCmS9ovkchBYGwrkzE5elgMLTkOHTbSKjBeSY8MX2lYWZAZkp84NXv7XPYJGbnDKjZbkIDv4BIqMFCjYzMG+yP8WyQHmEmMhoWRoo16TqW2Znu58J4UTjmMvyQOEJZ7SoHkB6QgLlw4CqFdA4Ga2EiODQxuPWC2HjWgaGkvkJBRRQv5pVBNBBAHPEfcIB5e7q0UoMAzUgOBMSOLAm1xD4K4LtakxyBGaeUCJdJuDR1zHjk4QFyumqaKX/AxfcjYq957xIAAAAAElFTkSuQmCC) no-repeat !important;
   background-size: 10px 10px */
  }
</style>
<style lang="stylus" scoped>
.awe-swiper
  height 100%
  .active
    background-color rgba(183,0,0,.5) !important
    border 2px solid color-primary !important
    color #f
    background-size .4rem auto
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


