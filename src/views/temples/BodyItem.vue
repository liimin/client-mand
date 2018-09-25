<template>
  <div class="body-item">
    <md-field-item name="item0" arrow="arrow-right" @click="handleBodyItemClick" align="left">
      <div class="weui-panel__bd">
        <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537450455439&di=c66244d033f08e19a435810165f70456&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3D15f0371bc3fcc3cea0cdc173fb3db3e4%2F43a7d933c895d143ffab5f1a78f082025aaf072d.jpg" alt="">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">飞来寺</h4>
            <p class="weui-media-box__desc">飞来寺坐落于绵阳市涪城区石塘镇东岳村四组,绵阳火车站对面.</p>
            <ul class="weui-media-box__info">
              <md-icon name="location" />
              <li class="weui-media-box__info__meta">四川省绵阳市</li>
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
