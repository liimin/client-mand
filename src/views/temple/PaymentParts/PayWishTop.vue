<template>
    <div class="wish" v-html="wish">
        <label class="wish-title">祈愿文：</label>
        <p class="wish-text">供灯偈</p>
        <p class="wish-text">燃起祈福灯，灭除心头火。</p>
        <p class="wish-text">愿以大智慧，照破众无明。</p>
    </div>
</template>
<script>
export default {
  name: 'PayWishTop',
  props: {
    wish: String
  }
}
</script>
<style lang="stylus">
.wish
    padding 25px 0
    position relative
    color color-primary
    // font-weight bold
    .wish-text
        font-size 32px
        // color color-primary
        float left
        width 100%
        text-align: center
    .wish-title
        position absolute
        top 20px
        left 10px
        font-size 30px
</style>