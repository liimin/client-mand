<template>
  <div id="app">
    <!-- <HelloWorld/> -->
    <transition :name="transitionRoute">
      <router-view class="appView"/>
    </transition>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import '@/assets/global.styl'
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
      this.transitionRoute = `slide-${isBack ? 'right' : 'left'}`
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
  // position absolute
  // left 0
  // top 0
  // bottom 0
  // overflow-y scroll
  // width 100%;
  height 100%
.md-action-bar
  -webkit-transform: translateZ(0); 
.appView {
  position: absolute;
  width:100%;
  transition: all .8s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
 opacity: 0;
 -webkit-transform: translate(50px, 0);
 transform: translate(50px, 0);
}
.slide-left-leave-active, .slide-right-enter {
 opacity: 0;
 -webkit-transform: translate(-50px, 0);
 transform: translate(-50px, 0);
}
</style>
