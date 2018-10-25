<template>
  <div class="payment">
    <PayHeader :model="model"/>
    <PayInfo :model.sync="model" :eventBus="eventBus"/>
    <PayWish :eventBus="eventBus" :agree="agree" :wish="wish" :agreement="agreement" :intro="intro"/>
    <md-action-bar :actions="actions" class="footer"></md-action-bar>
  </div>
</template>
<script>
import { ActionBar } from 'mand-mobile'
import { PayHeader, PayInfo, PayWish } from './PaymentParts'
import Vue from 'vue'
// import TempleMixin from '@/mixins/temple'
import wxpay from '@/mixins/wxpay'
import detail from '@/mixins/detail'
export default {
  name: 'Payment',
  components: {
    [ActionBar.name]: ActionBar,
    [PayHeader.name]: PayHeader,
    [PayInfo.name]: PayInfo,
    [PayWish.name]: PayWish
  },
  mixins: [detail, wxpay],
  data() {
    return {
      actions: [
        {
          text: '返回',
          onClick: this.handleReturn
        },
        {
          text: '我要供灯',
          onClick: this.handleNext
        }
      ],
      eventBus: null,
      model: {
        tampleName: '',
        tabs: '',
        count: '',
        time: '',
        amount: '',
        sn: '',
        lights: [],
        dimcode: '',
        to_phone: '',
        to_addr: '',
        to: '',
        words: '',
        sex: 1,
        temple_id: 0,
        openid: 'a1'
      },
      agree: true,
      agreement: '',
      intro: '',
      name: '',
      wish: '',
      wx_user_info: null,
      tower: null,
      lampText: ''
    }
  },
  methods: {
    getLights(lights, tabs) {
      if (lights) {
        return lights.map(light => { return { 'index': light.index, 'type': tabs } })
      } else {
        return []
      }
    },
    handleReturn() {
      this.$router.goBack()
      // this.lightOff()
    },
    handleNext() { // 发起微信支付
      // this.GetWXSign().then()
      // this.goNext()
      // this.lightOn()
      this.payment()
    },
    goNext() {
      var now = new Date()
      now.setDate(now.getDate() + this.model.time)
      const time = dateFtt('yyyy-MM-dd', now)
      alert(this.wx_user_info.nickname)
      const query = {
        'name': this.wx_user_info.nickname,
        'to': this.model.to,
        time, // 截止时间
        'pos': this.tower.text, // 灯塔位置
        'pos1': this.lampText // 选灯位置
      }
      alert(this.wx_user_info.nickname)
      this.$router.push({ path: '/temple/certificate', query })
    },
    lightOn() {
      const params = this.model // Object.assign({}, this.model, this.infoModel)
      this.$http.post('/temple/lighton', params).then(res => {

      })
    },
    lightOff() {
      const params = this.model // Object.assign({}, this.model, this.infoModel)
      this.$http.post('/temple/lightoff', params).then(res => {
      })
    },
    handleWishWordChanged(words) {
      this.model.words = words
    },
    handleAgreeChanged(checked) {
      this.agree = checked
    },
    initEventBus() {
      this.eventBus = new Vue()
      this.eventBus.$on('wishWordChanged', this.handleWishWordChanged)
      this.eventBus.$on('agreeChanged', this.handleAgreeChanged)
      this.eventBus.$on('nameChanged', name => {
        this.name = name
      })
    },
    payment() {
      const params = {
        body: `${this.tower.text}${this.lampText}`,
        attach: `sn:${this.model.sn}`,
        out_trade_no: `remote_light_${this.model.temple_id}_${Date.now()}`,
        total_fee: this.model.amount,
        openid: this.wx_user_info.openid
      }
      this.$http.post('/wx/payparams', params).then(res => {
        const { data } = res
        this.wexinPay(data, result => {
          try {
            alert(this.wx_user_info.nickname)
            this.goNext()
            this.lightOn()
          } catch (error) {
            alert('内部==========错误' + error)
          }
        }, err => {
          alert('==========错误' + err)
        })
      })
      // this.WxPay(openid)
    },
    detail() {
      this.getDetail().then(detail => {
        this.wish = detail.wish.join('')
        this.agreement = detail.agreement.join('')
        this.intro = detail.intro
        this.model.temple_id = detail.id
      })
    },
    init() {
      const userinfo = JSON.parse(this.$get_storage('wx-user-info'))
      if (!userinfo) {
        this.$router.push({ path: '/temple/index' })
        return
      }
      this.wx_user_info = userinfo
      const { tampleName, tabs, count, time, amount, tower, lights, lampText } = this.$route.params
      if (!tampleName) {
        this.$router.push({ path: '/temple/order' })
        return
      }
      this.model.tampleName = tampleName
      this.model.tabs = tabs
      this.model.count = count
      this.model.time = time
      this.model.amount = amount
      this.model.sn = tower.id
      this.model.lights = this.getLights(lights, tabs)
      this.tower = tower
      this.lampText = lampText
    }
  },

  mounted() {
    this.init()
    this.detail()
    this.initEventBus()
  }
}
function dateFtt(fmt, date) { // author: meizz
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}
</script>

