<template>
  <div class="wrapper">
    <TempleHeader :items="items" :height="header_height" />
    <div class="body">
      <OrderTabs :tabs.sync="tabs" title="祈福类型" />
      <OrderTimes :times="times" :checked="timeValue" :eventBus="eventBus" title="时长" />
      <OrderChoose :towers="towers" :eventBus="eventBus" />
      <OrderCounts :eventBus="eventBus" title="数量" />
      <!-- <OrderAmount :amount="amount" title="金额" /> -->
      <md-notice-bar :closable="false">
        {{tip}}
      </md-notice-bar>
    </div>
    <md-action-bar :actions="data" class="footer">
      &yen;&nbsp;<md-amount :value="amount" :duration="200" is-animated has-separator></md-amount>
    </md-action-bar>
  </div>
</template><script>
import { Button, ActionBar, NoticeBar, Amount, Toast } from 'mand-mobile'
import { FormTitle } from '@/components'
import { OrderTabs, OrderTimes, OrderCounts, OrderAmount, OrderChoose } from './OrderParts'
import Vue from 'vue'
import TempleHeader from './Header'
import detail from '@/mixins/detail'
// import mulit from 'mand-mobile/components/swiper/demo/data/mulit-item'
// import { Toast } from 'mand-mobile'
export default {
  name: 'Order',
  components: {
    [TempleHeader.name]: TempleHeader,
    [Amount.name]: Amount,
    [OrderAmount.name]: OrderAmount,
    [OrderTabs.name]: OrderTabs,
    [Button.name]: Button,
    [ActionBar.name]: ActionBar,
    [FormTitle.name]: FormTitle,
    [OrderTimes.name]: OrderTimes,
    [OrderCounts.name]: OrderCounts,
    [NoticeBar.name]: NoticeBar,
    [OrderChoose.name]: OrderChoose
  },
  mixins: [detail],
  data() {
    return {
      towers: [],
      items: [],
      header_height: '3.5rem',
      data: [
        // {
        //   text: '返回',
        //   onClick: this.handleReturn
        // },
        {
          text: '选好了，下一步',
          onClick: this.handleNext
        }
      ],
      tabs: [],
      times: [
      ],
      timeValue: 1,
      eventBus: null,
      count: 0,
      tip: '',
      templeName: '',
      templeId: 0,
      lamps: [],
      price: 0.01,
      tower: '',
      lampText: ''
    }
  },

  computed: {
    amount() {
      if (!this.lamps || this.lamps.length === 0) return 0
      const total = this.lamps.length * this.price
      // this.aTabs.map(tab => {
      //   total += tab.price
      // })
      return total * this.count * this.timeValue
    },
    aTabs() {
      return this.tabs.filter(tab => tab.checked)
    },
    checkedTabNames() {
      return this.aTabs.map(tab => tab.title + '灯').join(',')
    }
  },
  methods: {
    handleReturn() {
      this.$router.goBack()
    },
    handleTimeChecked(value) {
      this.timeValue = value || 0
    },
    handleCountChanged(value) {
      this.count = value
    },
    handleLampsChanged(value) {
      const { lamps = [], tower = {}, lampText = '' } = value
      this.lamps = lamps
      this.tower = tower
      this.lampText = lampText
    },
    checkParams() {
      return new Promise((resolve, reject) => {
        if (!this.lamps || !this.lamps.length) {
          reject('请选择供灯位置')
        }
        if (!this.aTabs || !this.aTabs.length) {
          reject('请选择祈福类型')
        }
        if (!this.amount) {
          reject('请正确选择供灯信息')
        }
        resolve()
      })
    },
    handleNext() {
      this.checkParams().then(_ => {
        const params = {
          tampleName: this.templeName,
          tabs: this.checkedTabNames,
          count: this.count,
          time: this.timeValue,
          amount: this.amount,
          tab_list: this.aTabs,
          lights: this.lamps,
          tower: this.tower,
          lampText: this.lampText
        }
        this.$router.push({
          name: 'Payment',
          params
        })
      }).catch(err => {
        Toast.failed(err)
      })
    },
    detail() {
      return new Promise(resolve => {
        this.getDetail().then(detail => {
          this.tabs = detail.lights
          this.times = detail.times
          this.tip = detail.tip
          this.items = detail.swiper_items
          // this.header_height = detail.header_height
          this.templeName = detail.name
          this.templeId = detail.id
          resolve()
        })
      })
    },
    getDevices() {
      this.$http.get('/device/list', { params: { 'temple_id': this.templeId }}).then(res => {
        this.towers = res.data.towers
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.detail().then(() => {
      this.getDevices()
    })
    this.eventBus = new Vue()
    this.eventBus.$on('timeChanged', this.handleTimeChecked)
    this.eventBus.$on('countChanged', this.handleCountChanged)
    this.eventBus.$on('update:checkedLamps', this.handleLampsChanged)
  }
}
</script>
<style lang="stylus">
</style>

<style lang="stylus"scoped>
.wrapper
  .body
    // padding 0 2px
    overflow-x hidden
    padding-bottom 1rem
    .weui-flex
      align-items center
    .md-amount
      font-size 0.4rem
    .md-notice-bar
      background-color transparent
      color #ccc
      padding-left 0
      z-index 1
      height 0.7rem
      line-height 0.7rem
</style>