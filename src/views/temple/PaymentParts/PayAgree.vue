<template>
    <div class="agree">
        <md-agree 
            v-model="agreeConf.checked" 
            :disabled="agreeConf.disabled" 
            :size="agreeConf.size" 
            @change="onChange(agreeConf.name, agreeConf.checked, $event)">
            我已阅读并接收<a @click.stop="handleAgreeClick">《用户协议》</a>
        </md-agree>
        <md-agree 
            v-model="rankingConf.checked" 
            :disabled="rankingConf.disabled" 
            :size="rankingConf.size" 
            @change="onChange(rankingConf.name, rankingConf.checked, $event)">
            参与<a @click.stop="handleRankingClick">功德榜排名</a>
        </md-agree>
        <md-landscape v-model="agreeConf.showAgree" :scroll="true">
            <div class="scroll-area">
            <h1>用户协议</h1>
            <p v-for="i in 20" :key="i">用户协议</p>
            </div>
        </md-landscape>
        <md-dialog
            icon="circle-alert"
            title="窗口标题"
            :closable="true"
            v-model="rankingConf.dialog.open"
            :btns="rankingConf.dialog.btns"
        >
        排名说明排名说明排名说明排名说明排名说明排名说明排名说明
        </md-dialog>
    </div>
</template>

<script>
import { Agree, Landscape, Dialog } from 'mand-mobile'

export default {
  name: 'PayAgree',
  components: {
    [Agree.name]: Agree,
    [Landscape.name]: Landscape,
    [Dialog.name]: Dialog
  },
  props: {
    eventBus: Object,
    agree: Boolean
  },
  data() {
    return {
      agreeConf: {
        checked: this.agree,
        name: 'agree',
        size: 'lg',
        disabled: false,
        introduction: '选中状态',
        showAgree: false
      },
      rankingConf: {
        checked: true,
        name: 'ranking',
        size: 'lg',
        disabled: false,
        introduction: '选中状态',
        dialog: {
          open: false,
          btns: [{ text: '确定' }]
        }
      }
    }
  },
  methods: {
    onChange(name, checked) {
      this.eventBus.$emit('agreeChanged', checked)
    },
    handleAgreeClick() {
      this.agreeConf.showAgree = !this.agreeConf.showAgree
    },
    handleRankingClick() {
      this.rankingConf.dialog.open = !this.rankingConf.dialog.open
    }
  }
}
</script>
<style  lang="stylus">
.md-agree-content
  line-height 40px
  a
    color blue
.content
    background #f
.scroll-area
  padding 40px
  color #6
  h1
    margin-bottom 40px
  p
    margin 20px
</style>
<style scoped lang="stylus">
.agree
  font-size 24px
  text-align left 
  line-height 30px
  display flex
  justify-content space-evenly
</style>