<template>
  <div class="weui-msg personal">
    <PerHeader></PerHeader>
    <div class="weui-msg__opr-area">
      <PerOps></PerOps>
      <div class="weui-form-preview">
        <PerHisItem></PerHisItem>
        <PerHisItem></PerHisItem>
      </div>
    </div>
    <div class="weui-msg__extra-area">
    </div>
  </div>
</template>
<script>
import wxlogin from '@/mixins/wxlogin'
import { PerHeader, PerOps, PerHisItem } from './PersonalParts'
export default {
  name: 'Personal',
  created() {
    // this.GetCode()
    // this.saveWXUser()
  },
  components: {
    [PerHeader.name]: PerHeader,
    [PerOps.name]: PerOps,
    [PerHisItem.name]: PerHisItem
  },
  mixins: [wxlogin],
  data() {
    return {}
  },
  methods: {},
  mounted() {}
}
</script>
<style lang="stylus" scoped>
.weui-msg 
  padding-top 0
  &__icon-area
    margin-bottom 0
  &__title 
    margin-bottom 0
    color #f
  &__desc 
    padding-bottom 20px
  &__opr-area
    background #f
.personal
  .weui-form-preview
    font-size 24px
</style>
