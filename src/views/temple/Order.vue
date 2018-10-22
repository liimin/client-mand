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
    <md-action-bar :actions="data" v-show="actionShow">
      &yen;&nbsp;<md-amount :value="amount" :duration="200" is-animated has-separator></md-amount>
    </md-action-bar>
  </div>
</template><script>
import { Button, ActionBar, NoticeBar, Amount } from 'mand-mobile'
import { FormTitle } from '@/components'
import TempleHeader from './Header'
import { OrderTabs, OrderTimes, OrderCounts, OrderAmount, OrderChoose } from './OrderParts'
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
    [OrderChoose.name]: OrderChoose
  },
  mixins: [detail],
  data() {
    return {
      towers: [],
      items: [],
      header_height: '3.5rem',
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
      templeId: 0,
      sns: [
        {
          text: '引力波',
          id: 1
        },
        {
          text: '智子',
          id: 2
        },
        {
          text: '水滴',
          id: 3
        },
        {
          text: '二向箔',
          id: 4
        },
        {
          text: '飞刃',
          id: 5
        },
        {
          text: '碎星',
          id: 6
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
      setTimeout(_ => {
        this.towers = [
          {
            'sn': 'abcd1',
            'addr': 'palace1',
            'layer': '7',
            'side': '8',
            'on': '10',
            'off': '1',
            'layers': [
              {
                'side': '8',
                'name': '层1',
                'sides': [
                  {
                    'row': '12',
                    'col': '10',
                    'name': '面1',
                    'lights': [
                      {
                        'index': '0A01',
                        'status': '1',
                        'layer': '7',
                        'side': '1',
                        'row': '12',
                        'col': '2'
                      },
                      {
                        'index': '0A02',
                        'status': '0',
                        'layer': '7',
                        'row': '10',
                        'col': '2'
                      },
                      {
                        'index': '0A03',
                        'status': '1',
                        'layer': '7',
                        'row': '10',
                        'col': '2'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            'sn': 'abcd2',
            'addr': 'palace2',
            'layer': '7',
            'side': '8',
            'on': '10',
            'off': '1',
            'layers': [
              {
                'side': '8',
                'name': '层2',
                'sides': [
                  {
                    'row': '12',
                    'col': '10',
                    'name': '面1',
                    'lights': [
                      {
                        'index': '0A01',
                        'status': '0',
                        'layer': '7',
                        'side': '1',
                        'row': '12',
                        'col': '2'
                      },
                      {
                        'index': '0A02',
                        'status': '0',
                        'layer': '7',
                        'row': '10',
                        'col': '2'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            'sn': 'abcd3',
            'addr': 'palace',
            'layer': '7',
            'side': '8',
            'on': '10',
            'off': '1',
            'layers': [
              {
                'side': '8',
                'name': '层1',
                'sides': [
                  {
                    'row': '12',
                    'col': '10',
                    'name': '面1',
                    'lights': [
                      {
                        'index': '0A01',
                        'status': '0',
                        'layer': '7',
                        'side': '1',
                        'row': '12',
                        'col': '2'
                      },
                      {
                        'index': '0A02',
                        'status': '0',
                        'layer': '7',
                        'row': '10',
                        'col': '2'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            'sn': 'abcd4',
            'addr': 'palace',
            'layer': '7',
            'side': '8',
            'on': '10',
            'off': '1',
            'layers': [
              {
                'side': '8',
                'name': '层1',
                'sides': [
                  {
                    'row': '12',
                    'col': '10',
                    'name': '面1',
                    'lights': [
                      {
                        'index': '0A01',
                        'status': '0',
                        'layer': '7',
                        'side': '1',
                        'row': '12',
                        'col': '2'
                      },
                      {
                        'index': '0A02',
                        'status': '0',
                        'layer': '7',
                        'row': '10',
                        'col': '2'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            'sn': 'abcd5',
            'addr': 'palace',
            'layer': '7',
            'side': '8',
            'on': '10',
            'off': '1',
            'layers': [
              {
                'side': '8',
                'name': '层1',
                'sides': [
                  {
                    'row': '12',
                    'col': '10',
                    'name': '面1',
                    'lights': [
                      {
                        'index': '0A01',
                        'status': '0',
                        'layer': '7',
                        'side': '1',
                        'row': '12',
                        'col': '2'
                      },
                      {
                        'index': '0A02',
                        'status': '0',
                        'layer': '7',
                        'row': '10',
                        'col': '2'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            'sn': 'abcd6',
            'addr': 'palace',
            'layer': '7',
            'side': '8',
            'on': '10',
            'off': '1',
            'layers': [
              {
                'side': '8',
                'name': '层1111',
                'sides': [
                  {
                    'row': '12',
                    'col': '10',
                    'name': '面1234',
                    'lights': [
                      {
                        'index': '0A01',
                        'status': '0',
                        'layer': '7',
                        'side': '1',
                        'row': '12',
                        'col': '2'
                      },
                      {
                        'index': '0A02',
                        'status': '0',
                        'layer': '7',
                        'row': '10',
                        'col': '2'
                      }
                    ]
                  }
                ]
              },
              {
                'side': '8',
                'name': '层2',
                'sides': [
                  {
                    'row': '12',
                    'col': '10',
                    'name': '面1',
                    'lights': [
                      {
                        'index': '0A01',
                        'status': '0',
                        'layer': '7',
                        'side': '1',
                        'row': '12',
                        'col': '2'
                      },
                      {
                        'index': '0A02',
                        'status': '0',
                        'layer': '7',
                        'row': '10',
                        'col': '2'
                      }
                    ]
                  },
                  {
                    'row': '12',
                    'col': '10',
                    'name': '面11111',
                    'lights': [
                      {
                        'index': '0A01',
                        'status': '0',
                        'layer': '7',
                        'side': '1',
                        'row': '12',
                        'col': '2'
                      },
                      {
                        'index': '0A02',
                        'status': '0',
                        'layer': '7',
                        'row': '10',
                        'col': '2'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }, 3000)

      // this.$http.get('/device/list', { params: { 'temple_id': this.templeId }}).then(res => {
      //   this.towers = res.data
      // }).catch(err => {
      //   console.log(err)
      // })
    }
  },
  mounted() {
    this.detail().then(() => {
      this.getDevices()
    })
    this.eventBus = new Vue()
    this.eventBus.$on('timeChanged', this.handleTimeChecked)
    this.eventBus.$on('countChanged', this.handleCountChanged)
    this.$nextTick(_ => {
      this.actionShow = true
    })
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