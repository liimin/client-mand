<template>
<div class="wrapper">
  <div class="header">
    <TempleHeader />
  </div>
  <div class="body">
    <TempleBody :bodyStyle="bodyStyle"/>
  </div>
</div>
</template>
<script>
import TempleHeader from './Header'
import TempleBody from './Body'
export default {
  name: 'TempleList',
  components: {
    [TempleHeader.name]: TempleHeader,
    [TempleBody.name]: TempleBody
  },
  computed: {
    bodyStyle() {
      return {
        height: `${window.innerHeight - 40}px`
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.wrapper{
  .header{
    height : 80px
  }
  .body{
    height:100%
  }
}
</style>
