<template>
  <div class="t-header" :style="{ height }">
     <swiper :items="items" :trans="trans" :autoplay="autoplay"/>
  </div>
</template>
<script>
import { Swiper } from '@/components'
export default {
  name: 'TempleHeader',
  components: {
    [Swiper.name]: Swiper
  },
  props: {
    items: Array,
    height: String
  },
  data() {
    return {
      autoplay: 5000,
      trans: 'slideY'
    }
  }
}
</script>
<style lang="stylus">
.t-header
  img
    width 100%
</style>
