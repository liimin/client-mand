<template>
    <div class="wish-words">
        <textarea 
            class="words" 
            rows='10' 
            cols='30'
            @input="computeCounts"  
            v-bind:maxlength="total"
            v-model="words" ></textarea>
        <p class="limit">{{wordsCount}}/{{total}}</p>
    </div>
</template>
<script>
export default {
  name: 'PayWishWords',
  props: {
    model: Object
  },
  data() {
    return {
      words: 'a\nb__',
      wordsCount: 0,
      total: 200
    }
  },
  methods: {
    computeCounts() {
      this.wordsCount = this.total - this.words.length
    }
  },
  mounted() {
    this.$nextTick(_ => {
      this.computeCounts()
    })
  }
}
</script>
<style scoped lang="stylus">
.wish-words 
    width 100%
    padding 10px
    position relative
    .words
        margin-top 21px
        padding-top 5px
        width 100%
        font-size 30px
        height 1.8rem
        text-align center
        border-color color-primary
        color color-primary
        overflow-x hidden
        border-radius 10px
        resize none
        outline none
    .limit
        position absolute
        font-size 20px
        color #333
        bottom 60px
        right 20px
</style>