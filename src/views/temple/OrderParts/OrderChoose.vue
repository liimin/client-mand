<template>
<div class="order-choose">
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
    >
      <md-popup-title-bar
        title="供灯选择"
        ok-text="确定"
        cancel-text="取消"
        @confirm="hidePopUp()"
        @cancel="hidePopUp()"
      ></md-popup-title-bar>
      <div class="md-example-popup md-example-popup-bottom">
        <OrderChooseStat />
        <OrderChooseTower title="塔" :sns="aSns"  :eventBus="eventBus" :towerId="oTower.activeId"/>
        <OrderChooseFloor title="层"  :floors="aFloor" :eventBus="eventBus" :floorId="oFloor.activeId"/>
        <OrderChooseSquare title="面" :sns="aSquare" :eventBus="eventBus" :squareId="oSquare.activeId"/>
        <OrderChooseLamp title="灯" :lamps="aSns" :eventBus="eventBus"/>
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
        show: false
      },
      aSns: [],
      aFloor: [],
      aSquare: [],
      aTower: [],
      oFloor: {
        activeId: 2,
        list: []
      },
      oSquare: {
        activeId: 1,
        list: []
      },
      oTower: {
        activeId: '',
        list: this.tower
      },
      isDataReady: false
      // CheckedTime: ''
    }
  },
  watch: {
    eventBus: {
      handler(val) {
        val.$on('update:floorId', this.setFloorId)
        val.$on('update:squareId', this.setSquareId)
        val.$on('update:towerId', this.setTowerId)
      }
    },
    towers: {
      handler(val) {
        this.setTower().then(_ => this.setTowerId().then(_ => {
          this.isDataReady = true
        }))
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
    // tower() {
    //   return this.towers.map(tower => {
    //     return { 'text': tower.addr, 'id': tower.sn }
    //   })
    // }
  },
  mounted() {

  },
  methods: {
    handleCountChange(value) {
      this.eventBus.$emit('countChanged', value)
    },
    showPopUp() {
      this.$set(this.popup, 'show', true)
      const i = setInterval(() => {
        if (this.isDataReady) {
          setTimeout(_ => {
            clearInterval(i)
            this.aSns = this.aTower
            this.aFloor = this.oFloor.list
            this.aSquare = this.oSquare.list
          }, 1500)
        }
      }, 500)
    },
    hidePopUp() {
      this.$set(this.popup, 'show', false)
    },
    setTowerId(towerId) {
      return new Promise((resolve, reject) => {
        this.oTower.activeId = towerId || this.aTower[0].id
        this.setFloor()
          .then(() => { return this.setSquare() })
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
          .then(_ => resolve())
          .catch(err => {
            console.log(err)
          })
      })
    },
    setSquareId(squareId) {
      this.setSquare(squareId)
    },
    setSquare(id) {
      return new Promise((resolve, reject) => {
        try {
          var sn = this.oTower.activeId || this.aTower[0].id
          const sides = this.towers
            .filter(t => t.sn === sn)[0].layers
            .filter(t1 => t1.name === this.oFloor.activeId)[0].sides
            .map(t2 => {
              return { 'text': t2.name, 'id': t2.name }
            })
          // if (!towers || !towers.length) reject('')
          // const floors = towers[0].layers.filter(t1 => t1.name === this.oFloor.activeId)
          // if (!floors || !floors.length) reject('')
          // const sides = floors[0].sides.map(t2 => {
          //   return { 'text': t2.name, 'id': t2.name }
          // })
          // if (!sides || !sides.length) reject('')
          this.$set(this.oSquare, 'activeId', id || sides[0].id)
          this.$set(this.oSquare, 'list', sides)
          // this.aSquare = sides
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    setFloor(id) {
      return new Promise((resolve, reject) => {
        // const sn = this.oTower.activeId || this.tower[0].id
        // const towers = this.towers.filter(t => t.sn === sn)
        // if (!towers || !towers.length) reject('')
        // const floors = towers[0].layers.map(t1 => {
        //   return { 'text': t1.name, 'id': t1.name }
        // })
        // if (!floors || !floors.length) reject('')
        try {
          var sn = this.oTower.activeId || this.aTower[0].id
          const floors = this.towers.filter(t => t.sn === sn)[0].layers.map(t1 => {
            return { 'text': t1.name, 'id': t1.name }
          })
          this.$set(this.oFloor, 'activeId', id || floors[0].id)
          this.$set(this.oFloor, 'list', floors)
          // this.aFloor = floors
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    setTower() {
      return new Promise((resolve, reject) => {
        this.aTower = this.towers.map(tower => {
          return { 'text': tower.addr, 'id': tower.sn }
        })
        resolve()
      })
    }
  }
}
</script>
<style lang="stylus">
// .choose
//   background-color #fff
//   margin-bottom 2px
//   padding 20px 10px
//   border 1px solid #f0f0f0
//   border-radius 10px
  // box-shadow 0 0 5px 5px #ccc
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
  .md-field-item
    color #9
    padding-left: 16px !important 
    .md-field-item-title
      font-size: 26px !important
      // line-height: 20px;
</style>


