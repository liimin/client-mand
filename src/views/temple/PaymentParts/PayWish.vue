<template>
    <div>
        <PayWishTop />
        <PayWishWords />
        <PayAgree />
    </div>
</template>
<script>
import PayWishWords from './PayWishWords'
import PayWishTop from './PayWishTop'
import PayAgree from './PayAgree'
export default {
  name: 'PayWish',
  components: {
    [PayWishWords.name]: PayWishWords,
    [PayWishTop.name]: PayWishTop,
    [PayAgree.name]: PayAgree
  }
}
</script>