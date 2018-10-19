<template>
<div class="order-choose">
  <md-field>
    <md-field-item name="choose" title="选灯：" @click="showPopUp('scroll')"  align="right" arrow="arrow-right" />
  </md-field>
  <md-popup
      v-model="isPopupShow.scroll"
      position="bottom"
      prevent-scroll
      prevent-scroll-exclude=".md-example-popup-bottom"
    >
      <md-popup-title-bar
        title="Popup Prevent Scroll"
        ok-text="ok"
        cancel-text="cancel"
        @confirm="hidePopUp('scroll')"
        @cancel="hidePopUp('scroll')"
      ></md-popup-title-bar>
      <div class="md-example-popup md-example-popup-bottom">
        <OrderTower title="设备" :sns="sns" />
      </div>
    </md-popup>
</div>
</template>
<script>
import { Field, FieldItem, Popup, PopupTitleBar, Icon } from 'mand-mobile'
import OrderTower from './OrderTower'
export default {
  name: 'OrderChoose',
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Icon.name]: Icon,
    [OrderTower.name]: OrderTower
  },
  props: {
    eventBus: Object,
    title: String,
    sns: Array
  },
  data() {
    return {
      isInline: true,
      isPopupShow: {}
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
    },
    showPopUp(type) {
      this.$set(this.isPopupShow, type, true)
    },
    hidePopUp(type) {
      this.$set(this.isPopupShow, type, false)
    }
  }
}
</script>
<style lang="stylus">
.order-choose
  .md-example-popup
    // width 100%
    height calc(100% - 1rem) !important    
  .md-popup-title-bar
    height 1rem
  .md-popup-box
    background-color color-bg-base
    font-size font-minor-large
    // width 100%
    height calc(100% - 1rem) !important    
  .md-field-item
    color #999999
    padding-left: 16px !important 
    .md-field-item-title
      font-size: 26px !important
      // line-height: 20px;
</style>


