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
        { value: 360, label: '360天' }
      ],
      timeValue: 3,
      eventBus: null,
      count: 0
    }
  },

  computed: {
    bodyStyle() {
      return {
        height: `${window.innerHeight / 37.5 - 80 / 2 / 37.5}rem`
      }
    },
    amount() {
      const aTabs = this.tabs.filter(tab => tab.checked)
      return aTabs.length * this.count * this.timeValue * 100
    }
  },

  methods: {
    beforeChange(from, to) {},
    afterChange(from, to) {},
    handleTabClick() {},
    handleReturn() {
      console.log(this.checkedValue)
    },
    handleTimeChecked(value) {
      this.timeValue = value
    },
    handleCountChanged(value) {
      this.count = value
    }
  },
  mounted() {
    for (let index = 0; index < 9; index++) {
      this.tabs.push({
        id: index + 1,
        title: '婚姻',
        src: require('@/assets/images/guanyin.png'),
        checked: false
      })
    }
    this.eventBus = new Vue()
    this.eventBus.$on('timeChanged', this.handleTimeChecked)
    this.eventBus.$on('countChanged', this.handleCountChanged)
  }
}
</script><style lang="stylus"scoped>
.wrapper {
  .header {
    height: 300px;
  }
  .body {
    padding: 0 2px;
    .weui-flex {
      align-items: center;
    }
    .md-amount {
      font-size: 0.4rem;
    }
    .md-notice-bar{
      background-color transparent;
      color:#ccc;
    }
  }
  .footer {
    position: fixed;
  }
}
</style>