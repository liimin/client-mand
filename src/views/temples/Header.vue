<template>
  <div>
    <div class="content">
      <div class="md-example-child md-example-child-drop-menu md-example-child-drop-menu-0">
        <md-drop-menu ref="dropMenu" :data="data" :default-value="defaultValue" @change="handleDropMenuChanged" @show="showTabPicker()" :key="key">
          <template slot-scope="{ option }">
            <div class="md-drop-menu-custom-title" v-if="!option.disabled" v-text="option.text"></div>
            <v-distpicker v-if="option.disabled" type="mobile" hide-area :placeholder='true' @selected="handleSelected"></v-distpicker>
          </template>
        </md-drop-menu>
      </div>
    </div>
  </div>
</template>
<script>
import { DropMenu } from 'mand-mobile'
import VDistpicker from 'v-distpicker'
export default {
  name: 'TempleHeader',
  components: {
    [DropMenu.name]: DropMenu,
    [VDistpicker.name]: VDistpicker
  },
  props: {
    eventBus: Object
  },
  data() {
    return {
      isPickerShow: false,
      key: Date.now(),
      title: '选择title',
      defaultValue: ['全国', '智能排序', '宗教'],
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
              text: '智能排序',
              value: 'order-1'
            },
            {
              text: '离我最近',
              value: 'order-2'
            },
            {
              text: '最新开通',
              value: 'order-3'
            },
            {
              text: '供奉过的',
              value: 'order-4'
            },
            {
              text: '推荐寺观',
              value: 'order-5'
            }
          ]
        },
        {
          text: '宗教',
          options: [
            {
              text: '宗教',
              value: 'type-0'
            },
            {
              text: '佛教',
              value: 'type-1'
            },
            {
              text: '道教',
              value: 'type-2'
            },
            {
              text: '其他',
              value: 'type-3'
            }
          ]
        },
        {
          text: '搜索',
          options: []
        }
      ]
    }
  },
  methods: {
    showTabPicker() {
      var index = [].indexOf.call(
        document.querySelectorAll('.md-drop-menu-bar .bar-item'),
        document.querySelector('.md-drop-menu-bar .bar-item.active')
      )
      this.isPickerShow = index === 0
    },
    handleSelected(data) {
      const { city } = data
      this.$set(this.data[0].options, 0, { text: city.value, disabled: true })
      this.$set(this.defaultValue, 0, city.value)
      this.key = Date.now()
      this.$refs.dropMenu.isPopupShow = false
      this.eventBus.$emit('conditionChanged', `city-${city.code}`)
    },
    handleDropMenuChanged(barItem, listItem) {
      this.eventBus.$emit('conditionChanged', listItem.value)
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

.content .distpicker-address-wrapper .address-container ul {
  height: 400px;
}

.content .distpicker-address-wrapper {
  transform: translateY(-0.32rem);
}

.md-field-item-content {
  opacity: 1 !important;
}
.md-drop-menu .md-drop-menu-bar .bar-item.selected{
  color:color-primary
}
.md-drop-menu .md-drop-menu-bar .bar-item.selected span:after{
  border-top-color:color-primary
}
.md-icon-right{
  display none
}
</style>

<style lang="stylus" scoped>
.md-radio-content {
  width: 100% !important;
  text-align: left !important;
}

.content .distpicker-address-wrapper .address-container ul {
  height: 400px;
}

.content .distpicker-address-wrapper {
  transform: translateY(-0.32rem);
}

.md-field-item-content {
  opacity: 1 !important;
}
</style>
