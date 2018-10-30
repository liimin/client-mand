<template>
  <div class="per_his_item">
    <div class="weui-form-preview__hd">
      <label class="weui-form-preview__label">寺庙名称</label>
      <em class="weui-form-preview__value">{{record.temple}}</em>
    </div>
    <div class="weui-form-preview__bd" v-for="device in record.sns" :key="device.sn">
      <p>
        <label class="weui-form-preview__label">设备</label>
        <span class="weui-form-preview__value">{{device.addr}}</span>
      </p>
      <div  v-for="light in device.lights" :key="light.index" class="light-detail">
        <p>
          <label class="weui-form-preview__label">供灯位置</label>
          <span class="weui-form-preview__value">{{`${light.layer}层${light.side}面${light.row}-${light.col}`}}</span>
        </p>
        <p>
          <label class="weui-form-preview__label">供灯状态</label>
          <span class="weui-form-preview__value">
             <tag size="tiny" shape="circle" type="fill" fill-color="#FC7353" font-color="#fff" v-if="light.status==0">供灯结束</tag>
             <tag size="tiny" shape="circle" type="fill" fill-color="#50A050" font-color="#fff" v-else>进行中</tag>
          </span>
        </p>
        <p>
          <label class="weui-form-preview__label">开始时间</label>
          <span class="weui-form-preview__value">{{light.start}}</span>
        </p>
        <p>
          <label class="weui-form-preview__label">截止时间</label>
          <span class="weui-form-preview__value">{{light.end}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Tag } from 'mand-mobile'
export default {
  name: 'PerHisItem',
  props: {
    record: Object
  },
  components: {
    Tag
  },
  data() {
    return {}
  },
  mounted() {}
}
</script>
<style lang="stylus">
 .per_his_item .size-tiny
    padding 2px 12px !important
</style>

<style scoped lang="stylus">
.per_his_item
  // .weui-form-preview__label
  .light-detail
    margin 10px 0 20px 40px
    border-bottom 2px solid #f0
    padding-bottom 20px
</style>