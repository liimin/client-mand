import config from '@/config'
import { Toast } from 'mand-mobile'
export default{
  name: 'DetailMixin',
  data() {
    return {
      storeName: ''
    }
  },
  beforeMount() {
    this.storeName = `templeDetail-${config.id}`
  },
  methods: {
    getDetail() {
      const store = this.$get_storage(this.storeName)
      return new Promise((resolve, reject) => {
        if (!store) {
          this.$http.get('/temple/detail', { params: { id: config.id }}).then(res => {
            var conf = res.data
            this.format(conf)
            resolve(conf)
            this.$set_storage(this.storeName, JSON.stringify(res.data))
          }).catch(err => {
            Toast.failed('读取详情出错，请稍后再试')
            console.log(err)
          })
        } else {
          resolve(JSON.parse(store))
        }
      })
    },
    /**
     * 格式化  给图片拼接server地址
     */
    format(conf) {
      var { server, swiper_items, lights, content } = conf
      swiper_items.map(item => {
        item.src = `${server}${item.src}`
      })
      lights.map(light => {
        light.src = `${server}${light.src}`
      })
      var info = ''
      content.map(text => {
        text.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
          text = text.replace(new RegExp(capture, 'g'), `${server}${capture}`)// 这里也可以替换成需要的路径
        })
        info += text
      })
      conf.content = info
    }
  }
}
