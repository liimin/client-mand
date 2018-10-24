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
      // const store = this.$get_storage(this.storeName)
      return new Promise((resolve, reject) => {
        // if (!store) {
        this.$http.get('/temple/detail', { params: { id: config.id }}).then(res => {
          resolve(res.data)
          // this.$set_storage(this.storeName, JSON.stringify(res.data))
        }).catch(err => {
          Toast.failed('读取详情出错，请稍后再试')
          console.log(err)
        })
        // } else {
        // resolve(JSON.parse(store))
        // }
      })
    }
  }
}
