<template>
    <div class="wish-words">
        <textarea 
            class="words" 
            rows='10' 
            cols='30'
            v-bind:maxlength="total"
            v-model="words" ></textarea>
        <p class="limit">{{wordsCount}}/{{total}}</p>
    </div>
</template>
<script>
const nameKey = '【姓名】'
export default {
  name: 'PayWishWords',
  props: {
    model: Object,
    eventBus: Object
  },
  data() {
    return {
      words: '',
      wordsCount: 0,
      total: 200,
      wordsList: [],
      keyWord: nameKey
    }
  },
  methods: {
    computeCounts() {
      this.wordsCount = this.total - this.words.length
    },
    get_blessions_list() {
      const params = {
        page: 1,
        pageSize: 100
      }
      this.$http.get('/blessions/list', { params }).then(res => {
        const { total } = res.page
        this.wordsList = res.data
        const randNum = randomNum(0, total - 1)
        this.words = this.wordsList[randNum].text
        this.keyWord = nameKey
      })
    },
    handleNameChanged(name) {
      const newKey = name ? `【${name}】` : nameKey
      this.words = this.words.replace(this.keyWord, newKey)
      this.keyWord = newKey
    }
  },
  mounted() {
    this.$nextTick(_ => {
      this.get_blessions_list()
      this.eventBus.$on('nameChanged', this.handleNameChanged)
    })
  },
  watch: {
    words: {
      handler(val) {
        this.eventBus.$emit('wishWordChanged', val)
        this.computeCounts()
      }
    }
  }
}
// 生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10)
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
    default:
      return 0
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
        padding 15px
        width 100%
        font-size 32px
        height 1.8rem
        // text-align center
        border-color color-primary
        color color-primary
        overflow-x hidden
        border-radius 10px
        resize none
        outline none
        // font-weight bold
        background-color transparent
    .limit
        position absolute
        font-size 20px
        color color-primary
        bottom 60px
        right 20px
</style>