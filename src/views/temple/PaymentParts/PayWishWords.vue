<template>
    <div class="wish-words card">
        <textarea 
            class="words" 
            rows='10' 
            cols='30'
            v-bind:maxlength="total"
            v-model="words" ></textarea>
        <i class="limit">{{wordsCount}}/{{total}}</i>
        <a class="change" @click="changeWords">换一换</a>
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
      keyWord: nameKey,
      name: '',
      blessions: {
        total: 0,
        list: []
      }
    }
  },
  methods: {
    computeCounts() {
      this.wordsCount = this.total - this.words.length
    },
    get_blessions_list() {
      if (this.blessions.total) {
        this.setWords()
        return
      }
      this.getData().then(() => {
        this.setWords()
      })
    },
    setWords() {
      const { total, list } = this.blessions
      const randNum = randomNum(0, total - 1)
      this.words = list[randNum].text
      this.keyWord = nameKey
      this.handleNameChanged(this.name)
    },
    getData() {
      const params = {
        page: 1,
        pageSize: 100
      }
      return new Promise(resolve => {
        this.$http.get('/blessions/list', { params }).then(res => {
          const { total } = res.page
          this.blessions.list = res.data
          this.blessions.total = total
          resolve()
        }).catch(e => {
          console.log(e)
        })
      })
    },
    handleNameChanged(name) {
      this.name = name
      const newKey = name ? `【${name}】` : nameKey
      this.words = this.words.replace(this.keyWord, newKey)
      this.keyWord = newKey
    },
    changeWords() {
      this.get_blessions_list()
    }
  },
  mounted() {
    this.$nextTick(_ => {
      this.get_blessions_list()
    })
  },
  watch: {
    words: {
      handler(val) {
        this.eventBus.$emit('wishWordChanged', val)
        this.computeCounts()
      }
    },
    eventBus: {
      handler(val) {
        val.$on('nameChanged', this.handleNameChanged)
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
    position relative
    box-sizing border-box
    .words
        margin-top 21px
        padding 15px
        width 100%
        font-size 32px
        height 2rem
        // text-align center
        border-color color-primary
        color color-primary
        overflow-x hidden
        border-radius 10px
        resize none
        outline none
        // font-weight bold
        background-color transparent
        box-sizing border-box
    .limit,.change
        position absolute
        font-size 20px
        bottom 60px
    .limit
        color color-primary
        right 20px
    .change
        color blue
        left 20px
</style>