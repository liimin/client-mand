<template>
    <section>
    <!-- <div class="operat">
        <button class="pro" @click="drawImage()">生成</button>
        <p>温馨提示：长按图片可保存到手机或直接发送给朋友！</p>
    </div> -->
    <div class="before" style="width:100%;height:100%;text-align: center">
        <img id="imgbox" :src="certificate" alt="" style="width:100%;">
    </div>
    <div class="pic">
        <canvas id="myCanvas" style="display: none;" ref="canvas">
            您的浏览器不支持canvas
        </canvas>
    </div>
     <md-action-bar :actions="actions" class="footer"></md-action-bar>
</section>
</template>
<script>
import { ActionBar } from 'mand-mobile'
const date = new Date()
const year = DX(date.getFullYear())
const month = DX(date.getMonth() + 1)
const day = DX(date.getDate())
export default {
  name: 'Certificate',
  components: {
    [ActionBar.name]: ActionBar
  },
  props: {
    name: String
  },
  data() {
    return {
      data: [
        // 将每张图片上字体的样式、大小、在图片上的位置记录下来，以便于换到不同图片时获取所需信息（移动端字体样式并不能这样设置，字体样式只适合PC端）
        { 'text': '', 'family': '微软雅黑', 'size': '0.046', 'x': '0.756', 'y': '0.52', 'color': '#fa112e' },
        { 'text': '', 'family': '微软雅黑', 'size': '0.046', 'x': '0.756', 'y': '0.693', 'color': '#fa112e' },
        { 'text': '', 'family': '微软雅黑', 'size': '0.046', 'x': '0.756', 'y': '0.82', 'color': '#fa112e' },
        { 'text': '', 'family': '微软雅黑', 'size': '0.046', 'x': '0.68', 'y': '0.3', 'color': '#fa112e' },
        { 'text': '', 'family': '微软雅黑', 'size': '0.046', 'x': '0.545', 'y': '0.27', 'color': '#fa112e' },
        { 'text': '', 'family': '微软雅黑', 'size': '0.046', 'x': '0.455', 'y': '0.36', 'color': '#fa112e' },
        { 'text': '', 'family': '微软雅黑', 'size': '0.046', 'x': '0.455', 'y': '0.54', 'color': '#fa112e' },
        { 'text': '', 'family': '微软雅黑', 'size': '0.046', 'x': '0.35', 'y': '0.36', 'color': '#fa112e' },
        { 'text': '', 'family': '微软雅黑', 'size': '0.046', 'x': '0.35', 'y': '0.54', 'color': '#fa112e' },

        { 'text': '', 'family': '微软雅黑', 'size': '0.036', 'x': '0.25', 'y': '0.35', 'color': '#333' },
        { 'text': '', 'family': '微软雅黑', 'size': '0.036', 'x': '0.19', 'y': '0.35', 'color': '#333' },
        { 'text': '', 'family': '微软雅黑', 'size': '0.036', 'x': '0.132', 'y': '0.35', 'color': '#333' }
      ],
      texts: [
      ],
      certificate: require('@/assets/images/certificate.jpg'),
      size: 760 / 457,
      actions: [
        {
          text: '返回',
          onClick: this.handleReturn
        },
        {
          text: '再供一盏',
          onClick: this.handleNext
        }
      ]
    }
  },
  methods: {
    handleNext() {
      this.$router.push('/temple/order')
    },
    drawImage() {
      const canvas = this.$refs.canvas
      var clientWidth = this.getWidth()// 获取屏幕宽度用于canvas宽度自适应移动端屏幕
      canvas.width = 2 * clientWidth// 由于手机屏幕时retina屏，都会多倍渲染，在此只设置2倍，如果直接设置等于手机屏幕，会导致生成的图片分辨率不够而模糊
      canvas.height = 2 * clientWidth * this.size
      var context = canvas.getContext('2d')
      var imgbox = document.getElementById('imgbox')
      var img = new Image()// 创建图片对象，用于在canvas中渲染
      img.crossOrigin = 'Anonymous'
      img.src = this.certificate
      var w = 2 * clientWidth
      img.onload = function() { // 当图片加载成功以后再进行下一步动作，如果不加这句，会生成黑图
        context.drawImage(img, 0, 0, w, w * this.size)// 按设计稿图片比例渲染图片高度
        // var font = '600 ' + this.data[0].size * w + 'px ' + this.data[0].family// 文字大小也得按照分辨率变化，类似使用rem
        // context.font = font
        // context.textAlign = 'center'
        // context.fillStyle = this.data[0].color
        // // if (index === 0) { // 竖排字体
        // const x = w * this.data[0].x
        // var oy = this.data[0].y * w * this.size
        // for (var i = 0; i < name.length; i++) {
        //   var y = oy + 44 * i
        //   context.fillText(name[i], x, y)
        // }
        for (let index = 0; index < this.texts.length; index++) {
          const { size, family, color, x, y } = this.data[index]
          const txt = this.texts[index]
          var font = '600 ' + size * w + 'px ' + family// 文字大小也得按照分辨率变化，类似使用rem
          context.font = font
          context.textAlign = 'center'
          context.fillStyle = color
          // if (index === 0) { // 竖排字体
          const x1 = w * x
          var oy = y * w * this.size
          for (var i = 0; i < txt.length; i++) {
            var y1 = oy + 44 * i
            context.fillText(txt[i], x1, y1)
          }
        }
        // } else {  横排字体
        //   context.fillText(name, w * this.data.x, this.data.y * w * this.size)
        // }
        var downloadImg = canvas.toDataURL('image/jpeg')
        imgbox.src = downloadImg
      }.bind(this)
    },
    getWidth() {
      if (window.innerWidth) {
        return window.innerWidth
      } else {
        if (document.compatMode === 'CSS1Compat') {
          return document.documentElement.clientWidth
        } else {
          return document.body.clientWidth
        }
      }
    }
  },
  mounted() {
    const { name, to, pos, pos1, time } = this.$route.query
    const aTime = time.split('-')
    var stopTime = `截至于公元${DX(aTime[0])}年${DX(aTime[1])}月${DX(aTime[2])}日`
    this.texts = [
      year,
      month,
      day,
      name,
      to || '回向众生',
      '合家安康',
      '福寿绵长',
      '所求如愿',
      '六时吉祥',
      pos,
      pos1,
      stopTime
    ]
    this.drawImage()
  }
}
// '零壹贰叁肆伍陆柒捌玖 〇一二三四五六七八九'
function DX(n) {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) { return '数据非法' }
  var str = ''
  n = n + ''
  for (var i = 0; i < n.length; i++) {
    str += '〇一二三四五六七八九'.charAt(n.charAt(i))
  }
  return str
}
</script>
<style lang="stylus" scoped>
@media only screen and (min-width: 320px){
    html {
        font-size: 42.667px!important;
    }
}
@media only screen and (min-width: 360px){
    html {
        font-size: 48px!important;
    }
}
@media only screen and (min-width: 375px){
    html {
        font-size: 50px!important;
    }
}
@media only screen and (min-width: 412px){
    html {
        font-size: 54.933px!important;
    }
}
@media only screen and (min-width: 414px){
    html {
        font-size: 55.2px!important;
    }
}
.clearfix:after{
    content:"";
    display: block;
    height:0;
    clear:both;
    overflow:hidden;
    visibility:hidden;
}

.operat{
    margin:0 0.4rem 0.4rem;
    position: fixed;
    bottom: 0;
    left: 0;
}
.operat input{
    width:3.4rem;
    height:0.4rem;
    font-size: 0.25rem;
    -webkit-border-radius:0.08rem;
    -moz-border-radius:0.08rem;
    border-radius:0.08rem;
    padding: 0 0.4rem;
    outline: none;
    border:1px solid #333;
}
.operat button{
    height:0.41rem;
    width:1rem;
    border:none;
    background: #c2110c;
    color:#fff;
    -webkit-border-radius:0.1rem;
    -moz-border-radius:0.1rem;
    border-radius:0.1rem;
}
.operat p{
    margin:0.2rem;
    text-align:right;
}
</style>
