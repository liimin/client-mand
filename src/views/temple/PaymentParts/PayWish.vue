<template>
    <div>
      <PayWishTop :eventBus="eventBus" :wish="wish"/>
      <PayWishWords :eventBus="eventBus"/>
      <PayAgree :eventBus="eventBus" :agree="agree" :agreement="agreement" :intro="intro"/>
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
    agree: Boolean,
    wish: String,
    intro: String,
    agreement: String
  },
  components: {
    [PayWishWords.name]: PayWishWords,
    [PayWishTop.name]: PayWishTop,
    [PayAgree.name]: PayAgree
  }
}
</script>