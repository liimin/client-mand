<template>
  <OrderItem :title="title" :isInline="isInline" >
    <md-check-box v-model="CheckedTime" :options="times" :cols="cols" slot="item" class="card">
      <div slot="content" slot-scope="{ option }" class="payment-gateway ">
        <div class="conner">
          <md-icon name="circle-right" size="xs"></md-icon>
        </div>
        <p v-text="option.label"></p>
        <!-- <p class="muted" v-text="option.desc"></p> -->
      </div>
    </md-check-box>
  </OrderItem>
</template>
<script>
import { CheckBox, Icon } from 'mand-mobile'
import OrderItem from './OrderItem'
export default {
  name: 'OrderTimes',
  components: {
    [CheckBox.name]: CheckBox,
    [OrderItem.name]: OrderItem,
    [Icon.name]: Icon
  },
  props: {
    times: Array,
    checked: Number,
    eventBus: Object,
    title: String
  },
  data() {
    return {
      isInline: false,
      cols: 4
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
  .md-check-box .md-check-box-item.is-selected
      color color-primary
      border-color color-primary
      background-color rgba(184,0,0,.1)
      position relative
      overflow hidden
      .conner 
        display block !important
      // box-shadow: 0 0 1px 1px color-primary inset;
</style>

<style lang="stylus" scoped>
  .payment-gateway
    text-align center
    font-size 0.2rem
  .muted
    color #888
    font-size 0.24rem
</style>


