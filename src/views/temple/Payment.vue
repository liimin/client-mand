<template>
  <div class="payment">
    <PayHeader :model="model"/>
    <PayInfo :model.sync="infoModel" :eventBus="eventBus"/>
    <PayWish :eventBus="eventBus" :agree="agree"/>
    <md-action-bar :actions="actions"></md-action-bar>
  </div>
</template>
<script>
import { ActionBar } from 'mand-mobile'
import { PayHeader, PayInfo, PayWish } from './PaymentParts'
import Vue from 'vue'
// import TempleMixin from '@/mixins/temple'
import wxPay from '@/mixins/wxPay'
export default {
  name: 'Payment',
  components: {
    [ActionBar.name]: ActionBar,
    [PayHeader.name]: PayHeader,
    [PayInfo.name]: PayInfo,
    [PayWish.name]: PayWish
  },
  mixins: [wxPay],
  data() {
    return {
      actions: [
        {
          text: '返回',
          onClick: this.handleReturn
        },
        {
          text: '下一步',
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
        words: ''
      },
      infoModel: {
        amount: this.$route.params.amount,
        sex: 1
      },
      agree: true
    }
  },
  methods: {
    handleReturn() {
      this.$router.goBack()
    },
    handleNext() { // 发起微信支付
      this.GetWXSign()
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
    }
  },
  mounted() {
    this.initEventBus()
  }
}
</script>

