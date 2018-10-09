<template>
  <div class="body-item">
    <md-field-item name="item0" arrow="arrow-right" @click="handleBodyItemClick" align="left">
      <div class="weui-panel__bd">
        <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" :src="temple.pic" alt="">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">{{temple.name+temple.id}}</h4>
            <p class="weui-media-box__desc">{{temple.description}}</p>
            <ul class="weui-media-box__info">
              <md-icon name="location" />
              <li class="weui-media-box__info__meta">{{temple.province+temple.city}}</li>
            </ul>
          </div>
        </a>
      </div>
    </md-field-item>
  </div>
</template>
<script>
import { Field, FieldItem, Icon } from 'mand-mobile'
import '@/assets/images/svg/location.svg'
export default {
  name: 'TempleBodyItem',
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Icon.name]: Icon
  },
  props: {
    temple: Object
  },
  methods: {
    handleBodyItemClick() {
      this.$router.push('/temple/index')
    }
  }
}
</script>
<style lang="stylus">
  .body-item{
    border-bottom: 2px dotted #ccc;
    .weui-media-box__info{
      margin-top: 16px;
      padding-bottom 0;
    }
    .md-field-item{
      .md-field-item-inner{
        padding : 0;
      }
      .md-field-item-content.left{
        margin-left:0;
        text-align: left;
      }
      .weui-media-box_appmsg .weui-media-box__hd {
          height :auto;
          width: 232px;
      }
    }
    .md-field-arrow{
      right: .6rem;
    }
    .md-icon.md {
      float: left;
      margin: -4px 4px 0 0;
    }
  }
</style>

<style lang="stylus" scoped>
</style>
