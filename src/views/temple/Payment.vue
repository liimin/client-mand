<template>
  <div class="payment">
    <div class="choose-text">
      <p class="choose-title">您已选择在</p>
      <p class="choose-name">{{name}}</p>
      <p class="choose-describe">{{describe}}</p>
    </div>
  </div>
</template>
<script>
import { DropMenu } from 'mand-mobile'
import TempleMixin from '@/mixins/temple'
export default {
  name: 'Payment',
  components: {
    [DropMenu.name]: DropMenu
  },
  mixins: [TempleMixin],
  data() {
    return {
      name: `【${this.$route.params.tampleName}】`,
      describe: `供奉${this.$route.params.tabs}各${this.$route.params.count}盏,${this.$route.params.time}天`
    }
  },
  methods: {}
}
</script>
<style lang="stylus" scoped>
  .payment{
    .choose-text{
      padding: 25px 0;
      position: relative;
      .choose-title{
        font-size: 30px;
        color: #666;
      }
      .choose-name{
        margin-top: 5px;
        font-size: 40px;
        color: #333;
      }
      .choose-describe{
        margin-top: 15px;
        font-size: 30px;
        color: #666;
      }
    }
    .choose-text p{
      float: left;
      width: 100%;
      text-align: center;
    }
  }
</style>
