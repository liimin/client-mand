<template>
  <div>
    <div class="content">
      <div class="md-example-child md-example-child-drop-menu md-example-child-drop-menu-0">
        <md-drop-menu ref="dropMenu" :data="data" :default-value="defaultValue" @show="showTabPicker()" :key="key">
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
  data() {
    return {
      isPickerShow: false,
      key: Date.now(),
      title: '选择title',
      defaultValue: ['全国', '智能排序', '其他'],
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
      if (index === 0) this.isPickerShow = true
    },
    handleSelected(data) {
      const { city } = data
      this.$set(this.data[0].options, 0, { text: city.value, disabled: true })
      this.$set(this.defaultValue, 0, city.value)
      this.key = Date.now()
      this.$refs.dropMenu.isPopupShow = false
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
