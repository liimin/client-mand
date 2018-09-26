<template>
  <div class="wrapper">
    <div class="header">
      <swiper :items="simple" />
    </div>
    <div class="body">
      <OrderTabs :tabs.sync="tabs" title="祈福类型" />
      <OrderTimes :times="times" :checked="timeValue" :eventBus="eventBus" title="时长" />
      <OrderCounts :eventBus="eventBus" title="数量" />
      <OrderAmount :amount="amount" title="金额" />
      <md-notice-bar :closable="false">
        温馨提示:供灯祈福金将转至供灯寺观帐户
      </md-notice-bar>
    </div>
    <div class="footer">
      <md-action-bar :actions="data"></md-action-bar>
    </div>
  </div>
</template><script>
import { Button, ActionBar, NoticeBar } from 'mand-mobile'
import { Swiper, FormTitle } from '@/components'
import { OrderTabs, OrderTimes, OrderCounts, OrderAmount } from './OrderParts'
import simple from 'mand-mobile/components/swiper/demo/data/simple'
import TempleMixin from '@/mixins/temple'
import Vue from 'vue'
export default {
  name: 'Order',
  components: {
    // [TempleHeader.name]: TempleHeader,
    // [Amount.name]: Amount,
    [OrderAmount.name]: OrderAmount,
    [OrderTabs.name]: OrderTabs,
    [Button.name]: Button,
    [ActionBar.name]: ActionBar,
    [Swiper.name]: Swiper,
    [FormTitle.name]: FormTitle,
    [OrderTimes.name]: OrderTimes,
    [OrderCounts.name]: OrderCounts,
    [NoticeBar.name]: NoticeBar
  },
  mixins: [TempleMixin],
  data() {
    return {
      simple,
      data: [
        {
          text: '返回',
          onClick: this.handleReturn
        },
        {
          text: '选好了，下一步',
          onClick: this.handleNext
        }
      ],
      tabs: [],
      times: [
        { value: 1, label: '1天' },
        { value: 3, label: '3天' },
        { value: 7, label: '7天' },
        { value: 49, label: '49天' },
        { value: 180, label: '180天' },
        { value: 365, label: '365天' }
      ],
      timeValue: 3,
      eventBus: null,
      count: 0
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
      this.$router.goBack()
    },
    handleTimeChecked(value) {
      this.timeValue = value || 0
    },
    handleCountChanged(value) {
      this.count = value
    },
    handleNext() {
      const params = {
        tampleName: this.$config.name,
        tabs: this.checkedTabNames,
        count: this.count,
        time: this.timeValue,
        amount: this.amount
      }
      this.$router.push({
        name: 'Payment',
        params
      })
    }
  },
  mounted() {
    for (let index = 0; index < 9; index++) {
      this.tabs.push({
        id: index + 1,
        title: '婚姻',
        src: require('@/assets/images/guanyin.png'),
        checked: false,
        price: index + 10
      })
    }
    this.eventBus = new Vue()
    this.eventBus.$on('timeChanged', this.handleTimeChecked)
    this.eventBus.$on('countChanged', this.handleCountChanged)
  }
}
</script>
<style lang="stylus"scoped>
.wrapper {
  .header {
    height: 300px;
  }
  .body {
    padding: 0 2px;
    overflow-x: hidden;
    .weui-flex {
      align-items: center;
    }
    .md-amount {
      font-size: 0.4rem;
    }
    .md-notice-bar {
      background-color: transparent;
      color: #ccc;
      padding-left: 0;
      z-index: 1;
      height: 0.7rem;
      line-height: 0.7rem;
    }
  }
  .footer {
    height: 1rem;
    margin-bottom: 10px;
    .md-action-bar {
      // position relative
    }
  }
}
</style>