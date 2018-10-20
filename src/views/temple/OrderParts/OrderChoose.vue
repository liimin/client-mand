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
      ref="pop"
    >
      <md-popup-title-bar
        title="供灯选择"
        ok-text="确定"
        cancel-text="取消"
        @confirm="hidePopUp()"
        @cancel="hidePopUp()"
      ></md-popup-title-bar>
      <div class="md-example-popup md-example-popup-bottom">
        <OrderChooseStat/>
        <OrderChooseTower title="塔" :sns="aSns" />
        <OrderChooseFloor title="层"  :floors="aSns"/>
        <OrderChooseSquare title="面" :sns="aSns"/>
        <OrderChooseLamp title="灯" :lamps="aSns"/>
      </div>
    </md-popup>
</div>
</template>
<script>
import { Field, FieldItem, Popup, PopupTitleBar, Icon } from 'mand-mobile'
import { OrderChooseTower, OrderChooseStat, OrderChooseSquare, OrderChooseFloor, OrderChooseLamp } from './ChooseParts'
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
    [OrderChooseSquare.name]: OrderChooseSquare,
    [OrderChooseFloor.name]: OrderChooseFloor,
    [OrderChooseLamp.name]: OrderChooseLamp
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
  .swiper-pagination-bullets
    bottom: -10px;
    .swiper-pagination-bullet-active
      background-color color-primary
  .md-example-popup
    // width 100%
    height calc(100% - 0.7rem) !important
    padding 0 10px  
    overflow hidden
  .md-popup-title-bar
    height .7rem
    line-height 0.7rem
    box-shadow: 0 0px 8px 8px #f0f0f0;
  .md-popup-box
    background-color color-bg-base
    font-size font-minor-large
    background-color #f0f0f0
    height calc(100% - 0.7rem) !important    
  .md-field-item
    color #9
    padding-left: 16px !important 
    .md-field-item-title
      font-size: 26px !important
      // line-height: 20px;
</style>


