<template>
  <div class="header" :style="{ height }">
     <swiper :items="items" />
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
  }
}
</script>
<style lang="stylus" scoped>
.body {
}
</style>
