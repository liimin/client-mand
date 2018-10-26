import detail from '@/mixins/detail'
export default {
  name: 'wxlogin',
  data() {
    return {
      // JsApiData: ''
    }
  },
  mixins: [detail],
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
      const code = this.GetQueryString('code')
      if (code) {
        this.GetOpenId(code)
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
      // 判断本地localStorag是否已经有openid，有则不获取，没有就去获取
      if (!this.$get_storage('wx-user-info')) {
        this.$http.post('/wx/userinfo', { code })
          .then(success => {
            const wx_user_info = success.data
            this.saveWXUser(wx_user_info)
            this.$set_storage('wx-user-info', JSON.stringify(wx_user_info))
            console.log('================', this.$get_storage('wx-user-info'))
          }, error => {
            console.log(error)
          })
      }
    },
    saveWXUser(wx_user_info) {
      // wx_user_info =
      // {
      //   openid: 'oGNUz1qrIMMMC_-sHy8BJBdRVlAs',
      //   nickname: '穆子大叔',
      //   sex: 1,
      //   language: 'zh_CN',
      //   city: '深圳',
      //   province: '广东',
      //   country: '中国',
      //   headimgurl:
      //     'http://thirdwx.qlogo.cn/mmopen/vi_32/qpv9RoCCWibUiaEffOBJORUgfM2ZQjwvImziapAlXRhAUjDyDGWLm53RvQflHfcTDBXVDF84nz3Zn0NeLcviaWvTKg/132',
      //   privilege: [],
      //   access_token:
      //     '15_R6DMA6Qd82W5vUkYGrnajrMwTyJ-Xx6zwyxRIscAsZ-3tg6W5EGZS_Mxsm_UtdvBd_bbHf2z5EKzcpvi9dDq5A'
      // }
      this.getDetail().then(detail => {
        const {
          openid,
          nickname,
          sex,
          language,
          city,
          province,
          country,
          headimgurl,
          access_token
        } = wx_user_info
        const params = {
          openid,
          nickname,
          sex,
          language,
          city,
          province,
          country,
          headimgurl,
          access_token,
          temple_id: detail.id
        };
        (async() => {
          const res = await this.$http.post('/wx/adduser', params, { 'silent': true })
          console.log(res)
        })()
      })
    }
  }
}
