<template>
    <div class="personal-header">
      <div class="weui-msg__icon-area">
        <img class="personal-header-avatar" :src="wx_user_info.headimgurl" alt="" />
      </div>
      <div class="weui-msg__text-area">
        <h2 class="weui-msg__title">{{wx_user_info.nickname}}</h2>
        <p class="weui-msg__desc">供灯得功德，福禄安康等你享！</p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'PerHeader',
  data() {
    return {
      wx_user_info: {}
    }
  },
  mounted() {
    this.wx_user_info = JSON.parse(this.$get_storage('wx-user-info'))
  }
}
</script>
<style scoped lang="stylus">
.personal-header
  background-color color-primary //rgb(50, 50, 50);
  padding-bottom 32px
  &-avatar
    height 160px
    width 160px
    border-radius 160px
    margin-top 20px
.weui-msg__text-area
  margin-bottom 0 !important
</style>