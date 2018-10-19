<template>
  <div class="wrapper">
    <TempleHeader :items="items" :height="header_height" />
    <div class="body">
      <OrderTabs :tabs.sync="tabs" title="祈福类型" />
      <OrderTimes :times="times" :checked="timeValue" :eventBus="eventBus" title="时长" />
      <OrderChoose :sns="sns" :eventBus="eventBus" />
      <OrderCounts :eventBus="eventBus" title="数量" />
      <!-- <OrderAmount :amount="amount" title="金额" /> -->
      <md-notice-bar :closable="false">
        {{tip}}
      </md-notice-bar>
    </div>
    <md-action-bar :actions="data" v-show="actionShow">
      &yen;&nbsp;<md-amount :value="amount" :duration="200" is-animated has-separator></md-amount>
    </md-action-bar>
  </div>
</template><script>
import { Button, ActionBar, NoticeBar, Amount } from 'mand-mobile'
import { FormTitle } from '@/components'
import TempleHeader from './Header'
import { OrderTabs, OrderTimes, OrderCounts, OrderAmount, OrderChoose, OrderTower } from './OrderParts'
import Vue from 'vue'
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
    [OrderChoose.name]: OrderChoose,
    [OrderTower.name]: OrderTower
  },
  mixins: [detail],
  data() {
    return {
      items: [],
      header_height: '3rem',
      actionShow: false,
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
      timeValue: 3,
      eventBus: null,
      count: 0,
      tip: '',
      templeName: '',
      sns: [
        {
          color: '#4390EE',
          text: '引力波'
        },
        {
          color: '#CA4040',
          text: '智子'
        },
        {
          color: '#FF8604',
          text: '水滴'
        },
        {
          color: '#00CC00',
          text: '二向箔'
        },
        {
          color: '#0066CC',
          text: '飞刃'
        },
        {
          color: '#99CCCC',
          text: '碎星'
        }
      ]
    }
  },

  computed: {
    amount() {
      let total = 0
      this.aTabs.map(tab => {
        total += tab.price
      })
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
      this.actionShow = false
      this.$router.goBack()
    },
    handleTimeChecked(value) {
      this.timeValue = value || 0
    },
    handleCountChanged(value) {
      this.count = value
    },
    handleNext() {
      this.actionShow = false
      const params = {
        tampleName: this.templeName,
        tabs: this.checkedTabNames,
        count: this.count,
        time: this.timeValue,
        amount: this.amount,
        lights: this.aTabs
      }
      this.$router.push({
        name: 'Payment',
        params
      })
    },
    detail() {
      this.getDetail().then(detail => {
        this.tabs = detail.lights
        this.times = detail.times
        this.tip = detail.tip
        this.items = detail.swiper_items
        this.header_height = detail.header_height
        this.templeName = detail.name
      })
    }
  },
  mounted() {
    this.detail()
    this.eventBus = new Vue()
    this.eventBus.$on('timeChanged', this.handleTimeChecked)
    this.eventBus.$on('countChanged', this.handleCountChanged)
    this.$nextTick(_ => {
      this.actionShow = true
    })
  }
}
</script>
<style lang="stylus"scoped>
.wrapper
  .body
    padding 0 2px
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