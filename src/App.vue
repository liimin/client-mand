<template>
  <div id="app">
    <!-- <HelloWorld/> -->
    <transition :name="transitionRoute">
      <router-view />
    </transition>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld
  },
  data() {
    return {
      transitionRoute: ''
    }
  },
  watch: {
    $route(to, from) {
      const isBack = this.$router.isBack //  监听路由变化时的状态为前进还是后退
      this.transitionRoute =`slide-${isBack?'right':'left'}`
      this.$router.isBack = false
    }
  }
}
</script>

<style lang="stylus">
#app
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  // margin-top 60px
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
