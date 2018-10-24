<template>
<div class="wrapper">
  <div class="header">
    <TempleHeader :eventBus="eventBus" />
  </div>
  <div class="body">
    <TempleBody :bodyStyle="bodyStyle" :eventBus="eventBus" :templeList="templeList" :isFinished="isFinished"/>
  </div>
</div>
</template>
<script>
import TempleHeader from './Header'
import TempleBody from './Body'
// import wepay from '@/mixins/wepay'
import Vue from 'vue'
export default {
  name: 'TempleList',
  components: {
    [TempleHeader.name]: TempleHeader,
    [TempleBody.name]: TempleBody
  },
  // mixins: [wepay],
  data() {
    return {
      eventBus: null,
      templeList: [],
      isFinished: false,
      params: {
        citycode: '',
        order: '',
        type: '',
        page: 0,
        pageSize: 10
      }
    }
  },
  computed: {
    bodyStyle() {
      return {
        height: `${window.innerHeight - 40}px`
      }
    }
  },
  methods: {
    getTemplesList(call, isResetData) {
      this.params.page++
      return new Promise(resolve => {
        console.log(this.params)
        this.$http.get('/temples/list', { params: this.params }).then(res => {
          if (res.data && res.data.length) {
            this.templeList = isResetData ? res.data : this.templeList.concat(res.data)
          } else {
            if (isResetData) {
              this.templeList = []
            }
            this.isFinished = true
          }
          this.isResetData = false
          call && call()
          resolve()
        }).catch(e => {
          console.log(e)
        })
      })
    },
    handleCityChanged(condition) {
      const arr = condition.split('-')
      this.params[arr[0]] = arr[1]
      this.resetData()
    },
    initBus() {
      const e = this.eventBus = new Vue()
      e.$on('conditionChanged', this.handleCityChanged)
      e.$on('loadMore', this.getTemplesList)
      e.$on('refresh', this.handleRefresh)
    },
    handleRefresh(call) {
      this.resetData(call)
    },
    resetData(call) {
      this.params.page = 0
      // this.isFinished = false
      this.getTemplesList(call, true)
    }
  },
  mounted() {
    this.getTemplesList()
    this.initBus()
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
