<template>
<OrderItem :title="title" :isInline="isInline" >
    <div class="weui-grids card" slot="item">
      <a href="javascript:;" class="weui-grid" v-for="item in tabs" :key="item.id" @click="handleTabClick(item)">
        <div class="weui-grid__icon">
          <div class="tab-wrapper">
            <div class="pic">
              <img :src="item.src" alt="">
            </div>
            <div class="rond" v-show="item.checked">
              <div class="dot"></div>
            </div>
          </div>
        </div>
        <p class="weui-grid__label" :class="{ 'active': item.checked}">{{item.title}}</p>
      </a>
    </div>
</OrderItem>
</template>
<script>
import OrderItem from './OrderItem'
export default {
  name: 'OrderTabs',
  components: {
    [OrderItem.name]: OrderItem
  },
  props: {
    tabs: Array,
    title: String
  },
  data() {
    return {
      aTabs: [],
      isInline: false
    }
  },
  watch: {
    tabs: {
      immediate: true,
      handler(val) {
        this.aTabs = val
      }
    }
  },
  mounted() {
    this.$emit('update:tabs', this.aTabs)
  },
  methods: {
    handleTabClick(item) {
      item.checked = !item.checked
    }
  }
}
</script>
<style lang="stylus" scoped>
.active 
  color color-primary
.weui-grid {
  padding: 10px 0 0 0;
  .weui-grid__icon {
    width: .8rem;
    height: .8rem;
    .tab-wrapper {
      height: 100%;
      width: 100%;
      .pic {
        color: #fff;
        font-family: calibri;
        text-align: center;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background: color-primary;
        overflow: hidden;
        border: 1px solid color-primary;
        animation: none;
        float: left;
      }

      .rond {
        height: 100%;
        width: 100%;
        border: 1px solid color-primary;
        border-radius: 50%;
        animation: rond 3s infinite;
        -webkit-animation: rond 3s infinite;
        -webkit-box-shadow: 0 0 10px color-primary;
        box-shadow: 0 0 30px 1px color-primary;

        .dot {
          height: 10px;
          width: 10px;
          position: absolute;
          background-color: color-primary;
          border-radius: 50%;
          top: 0px;
          // left: 10px;
          margin: 5px;
        }
      }
    }
  }
}

@keyframes rond {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rond {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>


