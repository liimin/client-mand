<template>
    <div class="wish">
        <label class="wish-title">祈愿文：</label>
        <p class="wish-text">供灯偈</p>
        <p class="wish-text">燃起祈福灯，灭除心头火。</p>
        <p class="wish-text">愿以大智慧，照破众无明。</p>
    </div>
</template>
<script>
export default {
  name: 'PayWishTop'
}
</script>
<style scoped lang="stylus">
.wish {
    padding: 25px 0;
    position: relative;
    .wish-text {
        font-size: 30px;
        color: color-primary;
        float: left;
        width: 100%;
        text-align: center;
    }
    .wish-title{
        position absolute;
        top 20px;
        left 10px;
        font-size 30px;
    }
}
</style>