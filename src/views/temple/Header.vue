<template>
  <div class="header" :style="{ height }">
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
<style lang="stylus" scoped>
.body {
}
</style>
