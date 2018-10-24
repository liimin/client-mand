<template>
  <div class="payment">
    <PayHeader :model="model"/>
    <PayInfo :model.sync="model" :eventBus="eventBus"/>
    <PayWish :eventBus="eventBus" :agree="agree" :wish="wish" :agreement="agreement" :intro="intro"/>
    <md-action-bar :actions="actions"></md-action-bar>
  </div>
</template>
<script>
import { ActionBar } from 'mand-mobile'
import { PayHeader, PayInfo, PayWish } from './PaymentParts'
import Vue from 'vue'
// import TempleMixin from '@/mixins/temple'
// import wepay from '@/mixins/wepay'
import detail from '@/mixins/detail'
export default {
  name: 'Payment',
  components: {
    [ActionBar.name]: ActionBar,
    [PayHeader.name]: PayHeader,
    [PayInfo.name]: PayInfo,
    [PayWish.name]: PayWish
  },
  mixins: [detail],
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
        tampleName: this.$route.params.tampleName,
        tabs: this.$route.params.tabs,
        count: this.$route.params.count,
        time: this.$route.params.time,
        amount: this.$route.params.amount,
        sn: this.$route.params.sn,
        lights: this.getLights(),
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
      wish: ''
    }
  },
  methods: {
    getLights() {
      if (this.$route.params.lights) {
        return this.$route.params.lights.map(light => { return { 'index': light.index, 'type': this.$route.params.tabs } })
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
      this.goNext()
      // this.lightOn()
      // this.payment()
    },
    goNext() {
      var now = new Date()
      now.setDate(now.getDate() + 3)
      const time = dateFtt('yyyy-MM-dd', now)
      const query = {
        'name': '微信名',
        'to': this.model.to,
        time,
        'pos': '大雄宝殿左',
        'pos1': '二层B面2-1'
      }
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
      const openid = this.$get_storage('wxopenid')
      const params = {
        body: '吮指原味鸡 * 1',
        attach: '{"部位":"三角"}',
        out_trade_no: 'kfc' + (+new Date()),
        total_fee: 1,
        openid
      }
      this.$http.get('/wx/payparams', { params }).then(res => {
        this.wexinPay(res, function(result) {
          console.log(result)
        }, function(err) {
          console.log(err)
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
    }
  },
  mounted() {
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

