<template>
  <OrderItem :title="title" :isInline="isInline">
    <div class="md-example-child md-example-child-stepper md-example-child-stepper-4" slot="item">
      <md-field>
        <md-field-item name="arrow4" title="" customized align="left">
          <div class="normal-tip">
            <md-stepper :min="1" @change="handleCountChange"></md-stepper>
          </div>
        </md-field-item>
      </md-field>
    </div>
  </OrderItem>
</template>
<script>
import { Stepper, Field, FieldItem } from 'mand-mobile'
import OrderItem from './OrderItem'
export default {
  name: 'OrderCounts',
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Stepper.name]: Stepper,
    [OrderItem.name]: OrderItem
  },
  props: {
    eventBus: Object,
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


