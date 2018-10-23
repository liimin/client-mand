<template>
    <div class="choose-text card">
        <p class="choose-title">您已选择在</p>
        <p class="choose-name">【{{model.tampleName}}】</p>
        <p class="choose-describe">供奉{{model.tabs}}各{{model.count}}盏,{{model.time}}天</p>
    </div>
</template>

<script>
export default {
  name: 'PayHeader',
  props: {
    model: Object
  }
}
</script>
<style scoped lang="stylus">
.choose-text
    position relative
    color color-primary
    box-shadow #d4 2px 4px 16px
    .choose-title
        font-size 30px
        // color #6
    .choose-name
        margin-top 5px
        font-size 48px
        // color color-primary
    .choose-describe
        margin-top 5px
        font-size 30px
        // color #6
.choose-text p
    float left
    width 100%
    text-align center
.choose-text::after
    content ''
    display block
    clear both
</style>