<template>
  <OrderItem :title="title" :isInline="isInline" >
    <div class="card" slot="item">
      <md-field>
        <md-field-item name="arrow4" title="" customized align="left">
          <div class="normal-tip">
            <md-amount :value="amount" :duration="200" is-animated has-separator></md-amount>
          </div>
        </md-field-item>
      </md-field>
    </div>
  </OrderItem>
</template>
<script>
import { Amount, Field, FieldItem } from 'mand-mobile'
import OrderItem from './OrderItem'
export default {
  name: 'OrderAmount',
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Amount.name]: Amount,
    [OrderItem.name]: OrderItem
  },
  props: {
    eventBus: Object,
    amount: Number,
    title: String
  },
  data() {
    return {
      isInline: true
      // CheckedTime: ''
    }
  },
  computed: {
    CheckedTime: {
      set(val) {
        this.eventBus.$emit('timeChanged', val)
      },
      get() {
        return this.checked
      }
    }
  },
  mounted() {},
  methods: {
    handleCountChange(value) {
      this.eventBus.$emit('countChanged', value)
    }
  }
}
</script>
<style lang="stylus" scoped>
.payment-gateway {
  text-align: center;
  font-size: 0.2rem;
}

.muted {
  color: #888;
  font-size: 0.24rem;
}
</style>


