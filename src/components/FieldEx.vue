<template>
    <div data-v-4e15f3b9="" class="md-input-item is-clear is-ios left normal">
        <div class="md-input-item-container">
            <div class="md-input-item-title fixed">{{title}}</div>
            <div class="md-input-item-control">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'FieldEx',
  props: {
    title: String
  }
}
</script>

