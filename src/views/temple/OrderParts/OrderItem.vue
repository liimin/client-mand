<template>
  <div class="weui-flex" v-if="isInline">
    <div>
      <FormTitle :title="title" />
    </div>
    <div class="weui-flex__item">
      <slot name="item"></slot>
    </div>
  </div>
  <div v-else>
    <FormTitle :title="title" />
    <slot name="item"></slot>
  </div>
</template>
<script>
import { FormTitle } from '@/components'
export default {
  name: 'OrderItem',
  components: {
    [FormTitle.name]: FormTitle
  },
  props: {
    title: String,
    isInline: Boolean
  }
}
</script>
<style lang="stylus">
.md-field-item{
    background-color transparent;
}
</style>
<style lang="stylus" scoped>
.md-field{
  background-color transparent;
}

</style>



