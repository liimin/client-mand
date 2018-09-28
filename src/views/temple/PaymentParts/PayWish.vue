<template>
    <div>
      <PayWishTop :eventBus="eventBus"/>
      <PayWishWords :eventBus="eventBus"/>
      <PayAgree :eventBus="eventBus" :agree="agree"/>
    </div>
</template>
<script>
import PayWishWords from './PayWishWords'
import PayWishTop from './PayWishTop'
import PayAgree from './PayAgree'
export default {
  name: 'PayWish',
  props: {
    eventBus: Object,
    agree: Boolean
  },
  components: {
    [PayWishWords.name]: PayWishWords,
    [PayWishTop.name]: PayWishTop,
    [PayAgree.name]: PayAgree
  }
}
</script>