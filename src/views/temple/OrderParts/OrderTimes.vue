<template>
  <OrderItem :title="title" :isInline="isInline" >
    <md-check-box v-model="CheckedTime" :options="times" :cols="5" slot="item">
      <div slot="content" slot-scope="{ option }" class="payment-gateway">
        <p v-text="option.label"></p>
        <!-- <p class="muted" v-text="option.desc"></p> -->
      </div>
    </md-check-box>
  </OrderItem>
</template>
<script>
import { CheckBox } from 'mand-mobile'
import OrderItem from './OrderItem'
export default {
  name: 'OrderTimes',
  components: {
    [CheckBox.name]: CheckBox,
    [OrderItem.name]: OrderItem
  },
  props: {
    times: Array,
    checked: Number,
    eventBus: Object,
    title: String
  },
  data() {
    return {
      isInline: false
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
  mounted() {

  },
  methods: {
    handleTabClick(item) {
      item.checked = !item.checked
    }
  }
}
</script>
<style lang="stylus">
  .md-check-box .md-check-box-col{
    padding 0 0.08rem 0.08rem  
  }
</style>

<style lang="stylus" scoped>
  .payment-gateway
    text-align center
    font-size 0.2rem
  .muted
    color #888
    font-size 0.24rem
</style>


