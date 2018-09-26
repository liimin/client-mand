<template>
  <div class="payment">
    <PayHeader :model="model"/>
    <PayInfo :model.sync="infoModel"/>
  </div>
</template>
<script>
import { PayHeader, PayInfo } from './PaymentParts'
// import TempleMixin from '@/mixins/temple'
export default {
  name: 'Payment',
  components: {
    [PayHeader.name]: PayHeader,
    [PayInfo.name]: PayInfo
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
        amount: this.$route.params.amount
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

