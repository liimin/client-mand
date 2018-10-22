<template>
<div :class="{ 'order-choose': isPopShow, 'pop-hide': !isPopShow}">
  <md-field>
    <md-field-item name="choose" title="选灯：" @click="showPopUp('scroll')"  align="right" arrow="arrow-right" />
  </md-field>
  <md-popup
      v-model="popup.show"
      position="bottom"
      prevent-scroll
      prevent-scroll-exclude=".md-example-popup-bottom"
      transition="fade"
      ref="pop"
      :has-mask="false"
    >
      <md-popup-title-bar
        title="供灯选择"
        ok-text="确定"
        cancel-text="取消"
        @confirm="hidePopUp()"
        @cancel="hidePopUp()"
      ></md-popup-title-bar>
      <div class="md-example-popup md-example-popup-bottom">
        <OrderChooseStat :statics="oStatic"/>
        <OrderChooseTower title="塔" :sns="oTower.list"  :eventBus="eventBus" :towerId="oTower.active.id"/>
        <OrderChooseFloor title="层"  :floors="oFloor.list" :eventBus="eventBus" :floorId="oFloor.active.id"/>
        <OrderChooseSquare title="面" :sns="oSquare.list" :eventBus="eventBus" :squareId="oSquare.active.id"/>
        <OrderChooseLamp title="灯" :lamps.sync="oLamp.list" :eventBus="eventBus"/>
      </div>
    </md-popup>
</div>
</template>
<script>
import { Field, FieldItem, Popup, PopupTitleBar, Icon } from 'mand-mobile'
import { OrderChooseTower, OrderChooseStat, OrderChooseSquare, OrderChooseFloor, OrderChooseLamp } from './ChooseParts'
export default {
  name: 'OrderChoose',
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Icon.name]: Icon,
    [OrderChooseTower.name]: OrderChooseTower,
    [OrderChooseStat.name]: OrderChooseStat,
    [OrderChooseSquare.name]: OrderChooseSquare,
    [OrderChooseFloor.name]: OrderChooseFloor,
    [OrderChooseLamp.name]: OrderChooseLamp
  },
  props: {
    eventBus: Object,
    title: String,
    sns: Array,
    towers: Array,
    popShow: Boolean
  },
  data() {
    return {
      isInline: true,
      popup: {
        show: true
      },
      oTower: {
        list: [],
        active: {}
      },
      oFloor: {
        list: [],
        active: {}
      },
      oSquare: {
        list: [],
        active: {}
      },
      oLamp: {
        list: []
      },
      oStatic: {
        total: 0,
        off: 0,
        checked: 0
      },
      isPopShow: false
    }
  },
  watch: {
    eventBus: {
      handler(val) {
        val.$on('update:floorId', this.setFloorId)
        val.$on('update:squareId', this.setSquareId)
        val.$on('update:towerId', this.setTowerId)
        val.$on('update:lampcheck', this.lampcheck)
        // val.$on('update:lamps', this.setLampStatus)
      }
    },
    towers: {
      handler(val) {
        this.$nextTick(_ => {
          this.getTower().then(_ => { return this.setTowerId() }).then(_ => {
            this.lampcheck()
          })
        })
      }
    }
  },
  computed: {
    CheckedTime: {
      set(val) {
        this.eventBus.$emit('timeChanged', val)
      },
      get() {
        return this.checked
      }
    }
  },
  mounted() {
  },
  methods: {
    lampcheck() {
      return new Promise((resolve, reject) => {
        const checked = this.oLamp.list.filter(l => l.checked).length
        this.$set(this.oStatic, 'checked', checked)
        resolve()
      })
    },
    showPopUp() {
      this.isPopShow = true
    },
    hidePopUp() {
      this.isPopShow = false
    },
    setTowerId(towerId) {
      return new Promise((resolve, reject) => {
        this.setTower(towerId)
          .then(_ => { return this.setFloor() })
          .then(() => { return this.setSquare() })
          .then(() => { return this.setLamp() })
          .then(() => { return this.lampcheck() })
          .then(_ => resolve())
          .catch(err => {
            console.log(err)
          })
      })
    },
    setFloorId(floorId) {
      return new Promise((resolve, reject) => {
        this.setFloor(floorId)
          .then(() => { return this.setSquare() })
          .then(() => { return this.setLamp() })
          .then(_ => resolve())
          .catch(err => {
            console.log(err)
          })
      })
    },
    setSquareId(squareId) {
      this.setSquare(squareId)
        .then(() => { return this.setLamp() })
    },
    setTower(id) {
      return new Promise((resolve, reject) => {
        try {
          const active = id ? this.oTower.list.filter(f => f.sn === id)[0] : this.oTower.list[0]
          this.$set(this.oTower, 'active', active)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    setSquare(id) {
      return new Promise((resolve, reject) => {
        try {
          const sides = this.oFloor.active.sides.map(side => {
            const { name } = side
            return Object.assign({}, { 'text': name, 'id': name }, side)
          })
          const s_id = id || sides[0].id
          const active = sides.filter(f => f.name === s_id)[0]
          this.$set(this.oSquare, 'list', sides)
          this.$set(this.oSquare, 'active', active)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    setFloor(id) {
      return new Promise((resolve, reject) => {
        try {
          const floors = this.oTower.active.layers.map(floor => {
            const { name } = floor
            return Object.assign({}, { 'text': name, 'id': name }, floor)
          })
          const f_id = id || floors[0].id
          const active = floors.filter(f => f.name === f_id)[0]
          this.$set(this.oFloor, 'list', floors)
          this.$set(this.oFloor, 'active', active)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    setLamp() {
      return new Promise((resolve, reject) => {
        try {
          const lamps = this.oSquare.active.lights.map(l => {
            return Object.assign({}, { 'checked': false }, l)
          })
          this.$set(this.oLamp, 'list', lamps)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    getTower() {
      return new Promise((resolve, reject) => {
        var on = 0
        var off = 0
        const aTower = this.towers.map(tower => {
          on += +tower.on
          off += +tower.off
          return Object.assign({}, { 'text': tower.addr, 'id': tower.sn }, tower)
        })
        this.$set(this.oTower, 'list', aTower)
        this.$set(this.oTower, 'active', aTower[0])
        this.$set(this.oStatic, 'total', on + off)
        this.$set(this.oStatic, 'off', off)
        resolve()
      })
    }
  }
}
</script>
<style lang="stylus">
.pop-hide .md-popup-box
  transform translate3d(0,3333px,0)
.order-choose
  margin 12px 0
  .swiper-pagination-bullets
    bottom: -10px;
    .swiper-pagination-bullet-active
      background-color color-primary
  .md-example-popup
    // width 100%
    height calc(100% - 0.7rem) !important
    padding 0 10px  
    overflow hidden
  .md-popup-title-bar
    height .7rem
    line-height 0.7rem
    box-shadow: 0 0px 8px 8px #f0f0f0;
  .md-popup-box
    background-color color-bg-base
    font-size font-minor-large
    background-color #f0f0f0
    height calc(100% - 0.7rem) !important
    transition all 2s
    transform translate3d(0,0,0)
    // background url('~@/assets/images/bg.jpg')
  .md-field-item
    color #9
    padding-left: 16px !important 
    .md-field-item-title
      font-size: 26px !important
      // line-height: 20px;
</style>


