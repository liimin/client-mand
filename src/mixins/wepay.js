export default {
  name: 'wepay',
  mounted() {
    this.GetCode()
  },
  data: {
    JsApiData: ''
  },
  methods: {
    // 取localStorage数据
    GetStorage(name) {
      return sessionStorage.getItem(name)
    },
    // 写localStorage数据
    SetStorage(name, value) {
      return sessionStorage.setItem(name, value)
    },
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
        console.log('有code')
        this.GetOpenId(this.GetQueryString('code'))
        // 没有那么重定向去获取
      } else {
        console.log('没有code')
        /**
         * 具体参考微信获取code文档 ：http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html
         * 官方接口：
         * https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
         */
        // 重定向去微信来获取code
        const config = {
          // 公众号的唯一标识
          AppId: 'wxd602cfb35118a94b',
          // 授权后重定向的回调链接地址(填当前页)
          redirect_uri: 'http://weechat.free.idcfengye.com',
          // 返回类型，请填写code
          Response_type: 'code',
          // 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid）
          Scope: 'snsapi_userinfo',
          // 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
          State: 'STATE',
          // 必须带此参数
          Wechat_Redirect: '#wechat_redirect'
        }
        const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.AppId}&redirect_uri=${config.redirect_uri}&response_type=${config.Response_type}&scope=${config.Scope}&state=${config.State}${config.Wechat_Redirect}`
        window.location = url
      }
    },
    // 通过上面的GetCode()取得code，然后通过code取openid
    GetOpenId(code) {
      alert('GetOpenId获得的code为：' + code)
      // 判断本地localStorag是否已经有openid，有则不获取，没有就去获取
      if (!this.GetStorage('wxopenid')) {
        this.$http.get('temple/wx/sign', { params: { code }})
          .then(function(success) {
            alert('success中的openid：' + success.data)
            this.SetStorage('wxopenid', JSON.stringify(success.data))
            // this.WxPayBtn(this.GetStorage('wxopenid'))
          }, function(error) {
            alert(JSON.stringify(error))
          })
      }
    },
    // 从服务器去拿最终的jsapi支付参数
    WxPay(openid, callback) {
      alert('WxPayBtn' + openid)
      var order = {
        body: '吮指原味鸡 * 1',
        attach: '{"部位":"三角"}',
        out_trade_no: 'kfc' + (+new Date()),
        total_fee: 10 * 100,
        openid: openid,
        trade_type: 'JSAPI'
      }
      this.$http.get('temple/getBrandWCPayRequestParams', { params: order })
        .then(function(success) {
          // 打印最终获得的jsapi支付参数
          alert(JSON.stringify(success.body))
          // 将jsapi参数存到JsApiData中
          this.JsApiData = JSON.stringify(success.body)
          // 调用jsApiCall传入jsapi参数，发起支付
          this.jsApiCall(this.JsApiData)
        }, function(error) {
          alert(JSON.stringify(error))
        })
    },
    // 正式发起微信支付
    jsApiCall(jsapi, callback) {
      window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        jsapi,
        function(res) {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            alert('支付成功')
            // 你的业务逻辑
          } else {
            alert('支付失败')
            alert(JSON.stringify(res.err_msg))
          }
        }
      )
    }
  }
}
