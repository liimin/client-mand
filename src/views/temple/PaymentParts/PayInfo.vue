<template>
    <div class="info">
        <md-field>
            <md-input-item ref="amount" title="金额 :" v-model="infoModel.amount" disabled clearable></md-input-item>
            <md-input-item ref="name" title="姓名" v-model="infoModel.name" placeholder="请输入被祝福人姓名(5个汉字以内)" clearable></md-input-item>
            <transition name="fade">
                <div class="more" v-show="isMore">
                    <md-field-item name="birthday" title="生辰" arrow="arrow-right" align="right" :value="datePickerValue" @click.native="isDatePickerShow = true">
                    </md-field-item>
                    <md-input-item ref="tel" v-model="infoModel.tel" type="phone" title="电话" placeholder="请输入被祝福人联系电话" clearable></md-input-item>
                    <md-input-item ref="add" v-model="infoModel.add" title="地址" placeholder="请输入回向地址" clearable></md-input-item>
                </div>
            </transition>
        </md-field>
        <div :class="isMore?'close':'showMore'" @click="isMore=!isMore">
            {{isMore?'收起':'更多'}}
            <!-- <a>{{isMore?'收起':'更多'}}</a>
            <md-icon :name="isMore?'arrow-up':'arrow-down'" size="lg"></md-icon> -->
        </div>
        <md-date-picker
            ref="datePicker"
            v-model="isDatePickerShow"
            type="custom"
            today-text="&(今天)"
            title="选择出险时间"
            is-twelve-hours
            :text-render="textRender"
            :custom-types="['yyyy', 'MM','dd']"
            :default-date="currentDate"
            @change="onDatePickerChange"
            @confirm="onDatePickerConfirm"
        ></md-date-picker>
    </div>
</template>

<script>
import { InputItem, Field, Icon, DatePicker, FieldItem } from 'mand-mobile'
export default {
  name: 'PayInfo',
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [DatePicker.name]: DatePicker,
    [FieldItem.name]: FieldItem
  },
  props: {
    model: Object
  },
  data() {
    return {
      currentDate: new Date(),
      datePickerValue: '',
      isDatePickerShow: false,
      isMore: false,
      infoModel: {}
    }
  },
  watch: {
    model: {
      immediate: true,
      handler(val) {
        this.infoModel = val
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
      console.log(
        `[Mand Mobile] DatePicker Change\ncolumnIndex: ${columnIndex},\nitemIndex:${itemIndex},\nvalue: ${JSON.stringify(
          value,
        )}`,
      )
    },
    onDatePickerConfirm(columnsValue) {
      console.log(`[Mand Mobile] DatePicker Confirm\nvalue: ${JSON.stringify(columnsValue)}`)
      this.datePickerValue = this.$refs.datePicker.getFormatDate('yyyy/MM/dd')
    }
  },
  mounted() {
    this.$emit('update:model', this.infoModel)
  }
}
</script>
<style lang="stylus">
  .info{
    margin-top 10px
    .md-field-content{
      width 100%
    }
    .md-input-item-input,.md-input-item-title,.md-input-item,.md-input-item-control,.md-input-item-clear{
      min-height .7rem 
      height .7rem !important
    }
}
</style>
<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.payment {
  .showMore,.close{
    margin-top: 10px;
    font-size: 24px;
    color: #666;
    text-align: center;
    background-color #d5ded9
  }
  .showMore::after,.close::after{
    content: "";
    position: relative;
    width: 0;
    height: 0;
    margin-left: 10px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }
  .close::after{
    bottom : 20px;
    border-bottom: 8px solid #999;
  }
  .showMore::after{
    top : 20px;
    border-top: 8px solid #999;
  }
}
</style>