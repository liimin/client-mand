<template>
  <div id="app">
    <!-- <HelloWorld/> -->
    <router-view />
  </div>
</template>

<script>
// import Rem from "@/assets/rem.js";
// new Rem()
// import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'app',
  components: {
    // HelloWorld
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Roboto' ,'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  // margin-top 60px
</style>
