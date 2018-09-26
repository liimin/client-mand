<template>
  <div class="payment">
    <PayHeader :model="model"/>
    <PayInfo :model.sync="infoModel"/>
    <PayWish />
  </div>
</template>
<script>
import { PayHeader, PayInfo, PayWish } from './PaymentParts'
// import TempleMixin from '@/mixins/temple'
export default {
  name: 'Payment',
  components: {
    [PayHeader.name]: PayHeader,
    [PayInfo.name]: PayInfo,
    [PayWish.name]: PayWish
  },
  // mixins: [TempleMixin],
  data() {
    return {
      model: {
        tampleName: this.$route.params.tampleName,
        tabs: this.$route.params.tabs,
        count: this.$route.params.count,
        time: this.$route.params.time,
        amount: this.$route.params.amount
      },
      infoModel: {
        amount: this.$route.params.amount,
        sex: 1
      }
    }
  },
  watch: {
    infoModel: {
      handler(val) {
      }
    }
  },
  methods: {}
}
</script>

