const wx = require('weixin-js-sdk')
export default {
  name: 'wxlogin',
  mounted() {
    this.GetCode()
  },
  data() {
    return {
      // JsApiData: ''
    }
  },
  methods: {
    // 获取地址栏code参数
    GetQueryString(name) {
      var url = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var newUrl = window.location.search.substr(1).match(url)
      if (newUrl != null) {
        return unescape(newUrl[2])
      } else {
        return false
      }
    },
    // 获取code
    GetCode() {
      // 如果有code参数，那么GetOpenId获取openid
      if (this.GetQueryString('code')) {
        this.GetOpenId(this.GetQueryString('code'))
        // 没有那么重定向去获取
      } else {
        /**
         * 具体参考微信获取code文档 ：http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html
         * 官方接口：
         * https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
         */
        // 重定向去微信来获取code
        const config = {
          // 公众号的唯一标识
          AppId: 'wx967c55b4200dd601',
          // 授权后重定向的回调链接地址(填当前页)
          redirect_uri: 'http://www.gpspas.com/',
          // 返回类型，请填写code
          Response_type: 'code',
          // 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid）
          Scope: 'snsapi_userinfo',
          // 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
          State: 'STATE',
          // 必须带此参数
          Wechat_Redirect: '#wechat_redirect'
        }
        const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.AppId}&redirect_uri=${config.redirect_uri}&response_type=code&scope=${config.Scope}&state=${config.State}${config.Wechat_Redirect}`
        window.location = url
      }
    },
    // 通过上面的GetCode()取得code，然后通过code取openid
    GetOpenId(code) {
      console.log('GetOpenId获得的code为：' + code)
      // 判断本地localStorag是否已经有openid，有则不获取，没有就去获取
      if (!this.$get_storage('wx-user-info')) {
        this.$http.post('/wx/userinfo', { code })
          .then(success => {
            console.log('success' + success)
            console.log('wx-user-info：' + success.data)
            this.$set_storage('wx-user-info', JSON.stringify(success.data))
            // this.WxPayBtn(this.GetStorage('wxopenid'))
          }, error => {
            console.log(error)
          })
      }
    },

    wexinPay(data, cb, errorCb) {
      const appId = data.appId
      const timestamp = data.timeStamp
      const nonceStr = data.nonceStr
      const signature = data.signature
      const packages = data.package
      const paySign = data.paySign
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      wx.ready(function() {
        wx.chooseWXPay({
          timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
          package: packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: paySign, // 支付签名
          success: function(res) {
            // 支付成功后的回调函数
            cb(res)
          },
          fail: function(res) {
            errorCb(res)
          }
        })
      })
      wx.error(function(res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        alert('config信息验证失败')
      })
    }
    // 从服务器去拿最终的jsapi支付参数
    // WxPay(openid, callback) {
    //   alert('WxPayBtn' + openid)
    //   var order = {
    //     body: '吮指原味鸡 * 1',
    //     attach: '{"部位":"三角"}',
    //     out_trade_no: 'kfc' + (+new Date()),
    //     total_fee: 10 * 100,
    //     openid: openid,
    //     trade_type: 'JSAPI'
    //   }
    //   this.$http.get('temple/getBrandWCPayRequestParams', { params: order })
    //     .then(function(success) {
    //       // 打印最终获得的jsapi支付参数
    //       alert(JSON.stringify(success.body))
    //       // 将jsapi参数存到JsApiData中
    //       this.JsApiData = JSON.stringify(success.body)
    //       // 调用jsApiCall传入jsapi参数，发起支付
    //       this.jsApiCall(this.JsApiData)
    //     }, function(error) {
    //       alert(JSON.stringify(error))
    //     })
    // },
    // // 正式发起微信支付
    // jsApiCall(jsapi, callback) {
    //   window.WeixinJSBridge.invoke(
    //     'getBrandWCPayRequest',
    //     jsapi,
    //     function(res) {
    //       if (res.err_msg === 'get_brand_wcpay_request:ok') {
    //         alert('支付成功')
    //         // 你的业务逻辑
    //       } else {
    //         alert('支付失败')
    //         alert(JSON.stringify(res.err_msg))
    //       }
    //     }
    //   )
    // }
  }
}
