<template>
  <div class="payment">
    <PayHeader :model="model"/>
    <PayInfo :model.sync="model" :eventBus="eventBus"/>
    <PayWish :eventBus="eventBus" :agree="agree"/>
    <md-action-bar :actions="actions"></md-action-bar>
  </div>
</template>
<script>
import { ActionBar } from 'mand-mobile'
import { PayHeader, PayInfo, PayWish } from './PaymentParts'
import Vue from 'vue'
// import TempleMixin from '@/mixins/temple'
import wepay from '@/mixins/wepay'
export default {
  name: 'Payment',
  components: {
    [ActionBar.name]: ActionBar,
    [PayHeader.name]: PayHeader,
    [PayInfo.name]: PayInfo,
    [PayWish.name]: PayWish
  },
  mixins: [wepay],
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
      name: ''
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
      const openid = this.GetStorage('wxopenid')
      this.WxPay(openid)
    }
  },
  mounted() {
    this.initEventBus()
  }
}
</script>

