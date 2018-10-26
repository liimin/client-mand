<template>
    <div class="weui-flex">
        <div class="weui-flex__item">
          <div class="weui-cells">
            <div class="weui-cell weui-cell_select weui-cell_select-before">
              <div class="weui-cell__hd">
                <select class="weui-select" name="select2">
                  <option value="1">全部</option>
                  <option value="2">供灯中</option>
                  <option value="3">过期</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="weui-flex__item"><a href="javascript:;" class="weui-btn weui-btn_plain-primary">时间</a></div>
        <div class="weui-flex__item"><a href="javascript:;" class="weui-btn weui-btn_plain-primary">金额</a></div>
      </div>
</template>

<script>
export default {
  name: 'PerOps',
  data() {
    return {
    }
  },
  mounted() {
  }
}
</script>
<style scoped lang="stylus">
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
</style>