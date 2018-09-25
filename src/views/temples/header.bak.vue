<template>
  <div>
    <div class="content">
      <div class="md-example-child md-example-child-drop-menu md-example-child-drop-menu-0">
        <md-drop-menu ref="dropMenu" :data="data" :default-value="['全国', '智能排序','宗教']" @show="showTabPicker($event)">
           <template slot-scope="{ option }">
            <div class="md-drop-menu-custom-title" v-show="option.text!=='全国'" v-text="option.text"></div>
            <v-distpicker
                v-show="option.text==='全国'"
                type="mobile"
                hide-area
                :placeholder='true'
                @selected="handleSelected"></v-distpicker>
              <!-- <md-picker
                ref="picker1"
                v-show="option.text==='全国'"
                v-model="isPickerShow"
                :data="pickerData"
                :cols="3"
                is-cascade
                title="选择省市区/县"
                @confirm="onPickerConfirm(1)"
                @hide="handlePickerHide()"
              ></md-picker> -->
            <!-- <div class="md-drop-menu-custom-brief">{{ option.text }}【可使用slot-scope进行自定义描述】</div> -->
          </template>
        </md-drop-menu>
      </div>
      <!-- <transition name="list" mode="out-in"> -->
        <div class="content-city-wrapper">
            <!-- <md-tab-picker
              v-model="isTabPickerShow"
              :title="title"
              :data="pickerData"
              data-struct="cascade"
              ok-text="确认"
              cancel-text="取消"
              :option-render="optionRenders"
              @confirm="onTabPickerConfirm"
              @change="onTabPickerChange"
            ></md-tab-picker> -->
              <!-- <md-picker
                ref="picker1"
                v-model="isPickerShow"
                :data="pickerData"
                :cols="3"
                is-cascade
                title="选择省市区/县"
                @confirm="onPickerConfirm(1)"
                @hide="handlePickerHide()"
              ></md-picker> -->
          <!-- <md-popup
            v-model="isPopupShow.bottom"
            :hasMask="false"
            position="bottom"
          >
          <v-distpicker type="mobile" hide-area :placeholder='true' @selected="handleSelected"></v-distpicker>
          </md-popup> -->
        </div>
      <!-- </transition> -->
      <main id="home" class="view">
        <div class="heading">
          <h1>
            <span>Mand Mobile</span>
          </h1>
          <p>一个基于Vue的移动端UI组件库，丰富、灵活、实用，快速搭建优质的金融类产品，让复杂的金融场景变简单。</p>
        </div>
        <md-button @click="handleClick">点我</md-button>
        <a href="javascript:;" class="weui-btn weui-btn_primary">绿色按钮</a>
      </main>
    </div>
  </div>
</template>

<script>
import { Button, Toast, DropMenu, Picker, Field, FieldItem } from 'mand-mobile'
import VDistpicker from 'v-distpicker'
const NOOP = () => {}
export default {
  name: 'AppHeader',
  components: {
    [Button.name]: Button,
    [DropMenu.name]: DropMenu,
    [VDistpicker.name]: VDistpicker,
    // [Popup.name]: Popup,
    // [PopupTitleBar.name]:PopupTitleBar,
    // [TabPicker.name]:TabPicker
    [Picker.name]: Picker,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem
  },
  data() {
    return {
      isPickerShow: false,
      title: '选择title',
      optionRenders: [NOOP, NOOP, this.optionRender],
      pickerData: [
        [
          {
            // 选项展示文案
            'text': '1',
            // 第二列对应数据
            'children': [
              {
                'text': '1'
              },
              {
                'text': '2'
              },
              {
                'text': '3'
              },
              {
                'text': '4'
              },
              {
                'text': '5'
              }
              // ...
            ]
          },
          {
            // 选项展示文案
            'text': '2',
            // 第二列对应数据
            'children': [
              {
                'text': '2-1'
              },
              {
                'text': '2-2'
              },
              {
                'text': '2-3'
              },
              {
                'text': '2-4'
              },
              {
                'text': '2-5'
              }
              // ...
            ]
          }
          // ...
        ]
      ],
      data: [
        {
          text: '全国',
          options: [
            {
              text: '全国',
              disabled: true
            }
          ]
        },
        {
          text: '智能排序',
          options: [
            {
              text: '智能排序'
            },
            {
              text: '离我最近'
            },
            {
              text: '最新开通'
            },
            {
              text: '供奉过的'
            },
            {
              text: '推荐寺观'
            }
          ]
        },
        {
          text: '宗教',
          options: [
            {
              text: '宗教'
            },
            {
              text: '佛教'
            },
            {
              text: '道教'
            },
            {
              text: '其他'
            }
          ]
        },
        {
          text: '搜索',
          options: [
          ]
        }
      ]
    }
  },
  methods: {
    handleClick() {
      Toast.info('不错哟~')
    },
    optionRender(item) {
      return `<div class="md-field-item-custom-title">${item.label}</div><div class="md-field-item-custom-brief">十年前你说生如夏花般灿烂，十年后你说平凡才是唯一的答案</div>`
    },
    showTabPicker() {
      var index = [].indexOf.call(document.querySelectorAll('.md-drop-menu-bar .bar-item'), document.querySelector('.md-drop-menu-bar .bar-item.active'))
      if (index === 0) { this.isPickerShow = true }
    },
    onTabPickerConfirm(selected) {
      if (selected) {
        console.log(`[Mand Mobile] TabPicker 确认选择项: ${JSON.stringify(selected)}`)
      } else {
        console.warn('[Mand Mobile] TabPicker 点击确认按钮时未选择到任何确定项')
      }
    },
    onTabPickerChange(select) {
      console.log(
        `[Mand Mobile] TabPicker 第${select.selectTab}列, 第${select.selectIndex}项: label: ${select.selectItem
          .label}, value: ${select.selectItem.value}`
      )
    },
    onPickerConfirm(index) {
      const values = this.$refs[`picker${index}`].getColumnValues()

      let res = ''
      values.forEach(value => {
        value && (res += `${value.text || value.label} `)
      })
      this[`pickerValue${index}`] = res
      // const bar =document.querySelectorAll('.md-drop-menu-bar .bar-item')[0]
      // bar.click()
      // bar.click()
    },
    handlePickerHide() {
      console.log(222)
      const bar = document.querySelectorAll('.md-drop-menu-bar .bar-item')[0]
      bar.click()
      bar.click()
    }
  },
  mounted() {
    window.DropMenuTrigger = () => {
      this.getSelectedValue('dropMenu0', 1)
    }
  }
}
</script>
<style lang="stylus">
.md-radio-content {
  width: 100% !important;
  text-align: left !important;
}
.content .distpicker-address-wrapper .address-container ul{
  height 400px
}
.content .distpicker-address-wrapper{
    transform: translateY(-0.32rem);
}
.md-field-item-content{
  opacity:1 !important;
}
</style>

<style lang="stylus" scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all .1s linear;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px) ;
  opacity :1;
  //  transform-origin: 50px 50px;
}
.content {
    font-size: 0.3rem;
    text-align: left;
    .content-city-wrapper{
      z-index:9991;
      position: absolute;
      width: 100%;
    }
}
.view
  padding 0 20px
  .heading
    text-align center
    margin-bottom 48px
    .md-icon
      width 100px
      height 80px
    h1
      color #333
      line-height 1.15
      font-size 64px
      margin-bottom 32px
      span
        position relative
        &::after
          content ""
          position absolute
          z-index -1
          left 0
          bottom 8px
          width 100%
          height 20px
          background #ecf6ff
    p
      font-size 32px
      color #666
      line-height 56px
</style>
