<template>
    <div>
        <PayWishTop />
        <PayWishWords />
    </div>
</template>
<script>
import PayWishWords from './PayWishWords'
import PayWishTop from './PayWishTop'
export default {
  name: 'PayWish',
  components: {
    [PayWishWords.name]: PayWishWords,
    [PayWishTop.name]: PayWishTop
  }
}
</script>