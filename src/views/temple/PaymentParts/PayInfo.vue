<template>
<div class="payment">
    <div class="info card">
        <md-field >
            <md-input-item ref="amount" title="金额：" v-model="infoModel.amount" disabled clearable></md-input-item>
            <md-input-item ref="name" title="姓名：" v-model="infoModel.to" placeholder="请输入被祝福人姓名(5个汉字以内)" clearable></md-input-item>
            <md-input-item ref="tel" v-model="infoModel.to_phone" type="phone" title="电话：" placeholder="请输入被祝福人联系电话" clearable></md-input-item>
            <transition name="fade">
                <div class="more" v-show="isMore">
                    <FieldEx title="性别："><md-check-box  v-model="infoModel.sex"  :options="options" /></FieldEx>
                    <md-field-item name="birthday" title="生辰：" arrow="arrow-right" align="right" :value="datePickerValue" @click.native="isDatePickerShow = true" />
                    <md-input-item ref="add" v-model="infoModel.to_addr" title="地址：" placeholder="请输入回向地址" clearable></md-input-item>
                </div>
            </transition>
        </md-field>
        <md-date-picker
            ref="datePicker"
            v-model="isDatePickerShow"
            type="custom"
            today-text="&(今天)"
            title="请选择生辰日期"
            is-twelve-hours
            :text-render="textRender"
            :custom-types="['yyyy', 'MM','dd']"
            :default-date="currentDate"
            @change="onDatePickerChange"
            @confirm="onDatePickerConfirm"
        ></md-date-picker>
    </div>
     <div :class="isMore?'close':'showMore'" @click="isMore=!isMore">
            {{isMore?'收起':'更多'}}
            <!-- <a>{{isMore?'收起':'更多'}}</a>
            <md-icon :name="isMore?'arrow-up':'arrow-down'" size="lg"></md-icon> -->
        </div>
        </div>
</template>

<script>
import { InputItem, Field, Icon, DatePicker, FieldItem, CheckBox } from 'mand-mobile'
import { FieldEx } from '@/components'
export default {
  name: 'PayInfo',
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [DatePicker.name]: DatePicker,
    [FieldItem.name]: FieldItem,
    [CheckBox.name]: CheckBox,
    [FieldEx.name]: FieldEx
  },
  props: {
    model: Object,
    eventBus: Object
  },
  data() {
    return {
      currentDate: new Date(),
      datePickerValue: '',
      isDatePickerShow: false,
      isMore: false,
      infoModel: {
      },
      options: [{ value: 1, label: '男' }, { value: 0, label: '女' }]
    }
  },
  watch: {
    model: {
      immediate: true,
      handler(val) {
        this.infoModel = val
      }
    },
    'infoModel.to': {
      handler(val) {
        this.eventBus.$emit('nameChanged', val)
      }
    }
  },
  methods: {
    textRender() {
      const args = Array.prototype.slice.call(arguments)
      const typeFormat = args[0] // 类型
      const column0Value = args[1] // 第1列选中值
      const column1Value = args[2] // 第2列选中值
      const column2Value = args[3] // 第3列选中值
      if (typeFormat === 'dd') {
        return `${column0Value}/${column1Value}/${column2Value}`
      }
    },
    onDatePickerChange(columnIndex, itemIndex, value) {
      // console.log(
      //   `[Mand Mobile] DatePicker Change\ncolumnIndex: ${columnIndex},\nitemIndex:${itemIndex},\nvalue: ${JSON.stringify(
      //     value,
      //   )}`,
      // )
    },
    onDatePickerConfirm(columnsValue) {
      // console.log(`[Mand Mobile] DatePicker Confirm\nvalue: ${JSON.stringify(columnsValue)}`)
      this.infoModel.to_birth = this.datePickerValue = this.$refs.datePicker.getFormatDate('yyyy/MM/dd')
    }
  },
  mounted() {
    this.$emit('update:model', this.infoModel)
  }
}
</script>
<style lang="stylus">
  .info
    margin-top 10px
    .md-field
      background-color transparent
      .md-field-content
        width 100%
      .md-input-item-input,.md-input-item-title,.md-input-item,.md-input-item-control,.md-input-item-clear
        min-height .8rem 
        height .8rem !important
        // line-height .8rem
      .md-field-item .md-field-item-inner
        padding .08rem 0  
      .md-check-box
        .md-check-box-item
          padding 0
      .md-input-item-title,.md-field-item-title
        font-size .32rem !important
        // font-weight bold
        color color-primary
      .md-check-box .md-check-box-col
        // padding 0
        margin-top 10px
      .md-check-box .md-check-box-item.is-selected
        color color-primary
        border-color color-primary
</style>
<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active 
  transition opacity .5s
.fade-enter, .fade-leave-to
  opacity: 0
  font-size .28rem
.payment
  .showMore,.close
    margin-top 1px
    font-size .30rem
    color color-primary
    text-align center
    // background-color #ccc
  .showMore::after,.close::after
    content ""
    position relative
    width 0
    height 0
    margin-left 10px
    border-left 8px solid transparent
    border-right 8px solid transparent
  .close::after
    bottom 20px
    border-bottom 8px solid color-primary
  .showMore::after
    top 20px
    border-top 8px solid color-primary
</style>