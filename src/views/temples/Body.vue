<template>
  <main class="body" :style="bodyStyle">
    <md-scroll-view ref="scrollView" :scrolling-x="false" @endReached="$_onEndReached"  @refreshing="$_onRefresh">
      <md-scroll-view-refresh slot="refresh" slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"  :is-refreshing="isRefreshing" />
      <TempleBodyItem v-for="item in list" :key="item"></TempleBodyItem>
      <md-scroll-view-more slot="more" :is-finished="isFinished" />
    </md-scroll-view>
  </main>
</template>
<script>
import { ScrollView, ScrollViewRefresh, ScrollViewMore } from 'mand-mobile'
import TempleBodyItem from './BodyItem'
export default {
  name: 'TempleBody',
  components: {
    [TempleBodyItem.name]: TempleBodyItem,
    [ScrollView.name]: ScrollView,
    [ScrollViewRefresh.name]: ScrollViewRefresh,
    [ScrollViewMore.name]: ScrollViewMore
  },
  props: {
    bodyStyle: Object
  },
  data() {
    return {
      list: 10,
      isFinished: false
    }
  },
  methods: {
    $_onRefresh() {
      setTimeout(() => {
        this.list = 5
        this.$refs.scrollView.finishRefresh()
      }, 2000)
    },
    $_onEndReached() {
      if (this.isFinished) {
        return
      }
      setTimeout(() => {
        this.list += 5
        if (this.list >= 20) {
          this.isFinished = true
        }
        this.$refs.scrollView.finishLoadMore()
      }, 1000)
    }
  }
}
</script>
<style lang="stylus" scoped>
.body {
}
</style>
