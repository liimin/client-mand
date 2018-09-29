export default{
  name: 'WxPay',
  methods: {
    isWx() {
      const ua = navigator.userAgent.toLowerCase()
      return ua.match(/MicroMessenger/i) === 'micromessenger'
    },
    Pay(data) {
      const vm = this
      if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data))
          document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady(data))
        }
      } else {
        vm.onBridgeReady(data)
      }
    },
    onBridgeReady(data) {
      const self = this
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          'appId': data.appId,
          'timeStamp': String(data.timeStamp), // 这里必须要转换为字符串。ios跟android表现不同。后台返回的是数值，但是微信方面必须要json参数都是字符串形式，android会自动转换成字符串（当时我在这里也找了很久的博文才知道的）
          'nonceStr': data.nonceStr,
          'package': data.package,
          'signType': data.signType,
          'paySign': data.paySign
        },
        function(res) {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            self.$router.replace({ name: 'paymentend' })
          } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            self.$vux.toast.text('支付取消!', 'default')
          } else {
            self.$vux.toast.text('支付失败!', 'default')
          }
        }
      )
    }
  }
}
