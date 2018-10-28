<template>
  <div class="weui-msg personal">
    <PerHeader></PerHeader>
    <div class="weui-msg__opr-area">
      <!-- <PerOps></PerOps> -->
      <div class="weui-form-preview" v-for="(record,index) in records" :key="index" style="height:9.8rem;overflow-y:auto;">
        <PerHisItem :record="record"></PerHisItem>
      </div>
    </div>
    <div class="weui-msg__extra-area">
    </div>
  </div>
</template>
<script>
import wxlogin from '@/mixins/wxlogin'
import { PerHeader, PerOps, PerHisItem } from './PersonalParts'
export default {
  name: 'Personal',
  created() {
    // this.GetCode()
    // this.saveWXUser()
  },
  components: {
    [PerHeader.name]: PerHeader,
    [PerOps.name]: PerOps,
    [PerHisItem.name]: PerHisItem
  },
  mixins: [wxlogin],
  data() {
    return {
      wx_user_info: '',
      records: []
    }
  },
  methods: {
    get_records() {
      setTimeout(() => {
        this.records = [{
          'temple': 'name',
          'temple_id': 'id',
          'sns': [{
            'sn': '12345677',
            'addr': 'xxxxxx',
            'lights': [{
              'index': '0001',
              'status': '1',
              'layer': '1',
              'side': 'a',
              'row': '1',
              'col': '2',
              'start': '2018-11-11 11:11:11',
              'end': '2018-11-11 11:11:11'
            },
            {
              'index': '0002',
              'status': '1',
              'layer': '1',
              'side': 'a',
              'row': '1',
              'col': '2',
              'start': '2018-11-11 11:11:11',
              'end': '2018-11-11 11:11:11'
            }
            ]
          },
          {
            'sn': '1221232',
            'addr': 'xxxxxx',
            'lights': [{
              'index': '0001',
              'status': '1',
              'layer': '1',
              'side': 'a',
              'row': '1',
              'col': '2',
              'start': '2018-11-11 11:11:11',
              'end': '2018-11-11 11:11:11'
            },
            {
              'index': '0002',
              'status': '1',
              'layer': '1',
              'side': 'a',
              'row': '1',
              'col': '2',
              'start': '2018-11-11 11:11:11',
              'end': '2018-11-11 11:11:11'
            }
            ]
          }
          ]
        },
        {}
        ]
      }, 2000)
      // this.$http.post('wx/records', { 'openid': this.wx_user_info.openid }).then(result => {
      //      this.records = result
      // })
    }
  },
  mounted() {
    this.wx_user_info = JSON.parse(this.$get_storage('wx-user-info'))
    this.get_records()
  }
}
</script>
<style lang="stylus" scoped>
.weui-msg 
  padding-top 0
  &__title 
    margin-bottom 0
    color #f
  &__desc 
    padding-bottom 20px
  &__opr-area
    background #f
.personal
  overflow hidden
  .weui-form-preview
    font-size 24px
</style>
