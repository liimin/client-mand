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
          text: '我要关灯',
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
        words: '',
        sex: 1,
        lights: this.getLights()
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
        return this.$route.params.lights.map(light => { return { 'id': light.id, 'type': light.title } })
      } else {
        return []
      }
    },
    handleReturn() {
      // this.$router.goBack()
      this.lightOff()
    },
    handleNext() { // 发起微信支付
      // this.GetWXSign().then()
      // this.$router.push({ path: '/temple/certificate', query: { name: this.name }})
      // this.lightOn()
      this.payment()
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
      })
    }
  },
  mounted() {
    this.detail()
    this.initEventBus()
  }
}
</script>

