<template>
<div class="order-choose">
  <md-field>
    <md-field-item name="choose" title="选灯：" @click="showPopUp('scroll')"  align="right" arrow="arrow-right" />
  </md-field>
  <md-popup
      v-model="popup.show"
      position="bottom"
      prevent-scroll
      prevent-scroll-exclude=".md-example-popup-bottom"
      transition="fade"
    >
      <md-popup-title-bar
        title="Popup Prevent Scroll"
        ok-text="ok"
        cancel-text="cancel"
        @confirm="hidePopUp()"
        @cancel="hidePopUp()"
      ></md-popup-title-bar>
      <div class="md-example-popup md-example-popup-bottom">
        <OrderChooseStat/>
        <OrderChooseTower title="设备" :sns="aSns" />
        <OrderChooseSquare title="面" :sns="aSns"/>
      </div>
    </md-popup>
</div>
</template>
<script>
import { Field, FieldItem, Popup, PopupTitleBar, Icon } from 'mand-mobile'
import { OrderChooseTower, OrderChooseStat, OrderChooseSquare } from './ChooseParts'
export default {
  name: 'OrderChoose',
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Icon.name]: Icon,
    [OrderChooseTower.name]: OrderChooseTower,
    [OrderChooseStat.name]: OrderChooseStat,
    [OrderChooseSquare.name]: OrderChooseSquare
  },
  props: {
    eventBus: Object,
    title: String,
    sns: Array,
    popShow: Boolean
  },
  data() {
    return {
      isInline: true,
      popup: {
        show: false
      },
      aSns: []
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
    handleCountChange(value) {
      this.eventBus.$emit('countChanged', value)
    },
    showPopUp() {
      this.$set(this.popup, 'show', true)
      setTimeout(() => {
        this.aSns = this.sns
      }, 500)
    },
    hidePopUp() {
      this.$set(this.popup, 'show', false)
    }
  }
}
</script>
<style lang="stylus">
// .choose
//   background-color #fff
//   margin-bottom 2px
//   padding 20px 10px
//   border 1px solid #f0f0f0
//   border-radius 10px
  // box-shadow 0 0 5px 5px #ccc
.order-choose
  margin 12px 0
  .md-example-popup
    // width 100%
    height calc(100% - 1rem) !important    
  .md-popup-title-bar
    height 1rem
  .md-popup-box
    background-color color-bg-base
    font-size font-minor-large
    padding 10px
    background-color #f0f0f0
    height calc(100% - 1rem) !important    
  .md-field-item
    color #999999
    padding-left: 16px !important 
    .md-field-item-title
      font-size: 26px !important
      // line-height: 20px;
</style>


