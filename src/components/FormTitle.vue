<template>
    <div class="weui-panel__hd">{{title +' ： '}}</div>
</template>

<script>
    export default {
      name: 'FormTitle',
      props: {
        title: String
      }
    }
</script>

<style scoped>
.weui-panel__hd {
    padding: 0 0 0 8px;
    color: #999999;
    font-size: 13px;
    position: relative;
    text-align: left;
    line-height: 20px;
}
.weui-panel__hd::after{
    display: none;
}
</style>
