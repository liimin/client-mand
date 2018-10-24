<template>
  <div class="weui-msg">
    <div class="personal-header">
      <div class="weui-msg__icon-area">
          <img class="personal-header-avatar" src="http://localhost:80/1/images/guanyin.png" alt=""/>
      </div>
      <div class="weui-msg__text-area">
        <h2 class="weui-msg__title">穆子大叔</h2>
        <p class="weui-msg__desc">供灯得功德，福禄安康等你享！</p>
      </div>
    </div>
    <div class="weui-msg__opr-area">
      <div class="weui-flex">
          <div class="weui-flex__item"><div class="weui-cells">
          <div class="weui-cell weui-cell_select weui-cell_select-before">
            <div class="weui-cell__hd">
              <select class="weui-select" name="select2">
                <option value="1">全部</option>
                <option value="2">供灯中</option>
                <option value="3">过期</option>
              </select>
            </div>
          </div>
        </div></div>
          <div class="weui-flex__item"><a href="javascript:;" class="weui-btn weui-btn_plain-primary">时间</a></div>
          <div class="weui-flex__item"><a href="javascript:;" class="weui-btn weui-btn_plain-primary">金额</a></div>
      </div>
    </div>
    <div class="weui-msg__extra-area">
      <div class="weui-footer">
        <p class="weui-footer__links">
          <a href="javascript:void(0);" class="weui-footer__link">底部链接文本</a>
        </p>
        <p class="weui-footer__text">Copyright &copy; 2008-2016 weui.io</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Personal',
  components: {},
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="stylus" scoped>
.weui-msg 
  padding-top 0
  &__text-area
    margin-bottom 0
    margin-top -40px
  &__icon-area
    margin-bottom 0
  &__title 
    margin-bottom 0
    color #f
  &__desc 
    padding-bottom 20px
  &__opr-area
    background #f
    .weui-btn-area
      margin 0
      background-color #f
  .weui-cells
    margin-top 0
    background-color transparent
    .weui-cell_select-before
      padding-right 0
      height 82px
      // border: 2px solid green;
      border-radius: 10px
  .weui-btn_plain-primary
    border none
.personal-header
  background-color color-primary //rgb(50, 50, 50);
  &-avatar
    height 160px
    width 160px
    border-radius 160px
    margin-top 20px
</style>
