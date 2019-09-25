<template>
    <div class="tabBars">
        <tabbar>
            <tabbar-item  link='/examCenter/examinationLevel/examCenterTab' :selected="$route.path ==='/examCenter/examinationLevel/examCenterTab'" >
                <img slot="icon" src="../assets/imgs/tabbar1.svg">
                <img slot="icon-active" src="../assets/imgs/tab1.svg">
                <span slot="label">考试中心</span>
            </tabbar-item>
            <tabbar-item link='/examCenter/examinationLevel/registered' :selected="$route.path ==='/examCenter/examinationLevel/registered'">
                <img slot="icon" src="../assets/imgs/tabbar2.svg">
                <img slot="icon-active" src="../assets/imgs/tab2.svg">
                <span slot="label">已报名</span>
            </tabbar-item>
            <tabbar-item link='/examCenter/examinationLevel/myOrder' :selected="$route.path ==='/examCenter/examinationLevel/myOrder'">
                <img slot="icon" src="../assets/imgs/tabbar3.svg">
                <img slot="icon-active" src="../assets/imgs/tab3.svg">
                <span slot="label">我的订单</span>
            </tabbar-item>
            <tabbar-item link='/examCenter/examinationLevel/commonInformation' :selected="$route.path ==='/examCenter/examinationLevel/commonInformation'" >
                <img slot="icon" src="../assets/imgs/tabbar4.svg">
                <img slot="icon-active" src="../assets/imgs/tab4.svg">
                <span slot="label">常用信息</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  // name:"commonTabbar",
  data() {
    return {
      index:null,
    };
  },
  methods:{
      changeSeleted(index){
        console.log(index)
      }
  }
};
</script>


<style lang='scss' scoped>
@import "../style/mixin.scss";
.tabBars {
  @include wh(100%, 60px);
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  .weui-tabbar {
    height: 49px;
    width: 100%;
    background: #ffffff;
    overflow: visible;
    
    .weui-tabbar__item {
      padding: 0;
      & /deep/ .weui-tabbar__icon {
        margin-top: 9px;
        width: 20px;
        height: 20px;
        margin-bottom: 5px;
      }
      & /deep/.weui-tabbar__label {
        margin-bottom: 2px;
        height: 14px;
        font-size: 10px;
        font-weight: 500;
        line-height: 14px;
      }
    }
    .weui-bar__item_on:before {
      display: block;
      width: 25%;
      height: 13px;
      position: absolute;
      top: -12px;
      background: url('../assets/imgs/active-border.svg') no-repeat;
      background-size: cover;
    }
    .weui-bar__item_on{
        & /deep/ .weui-tabbar__icon{
          margin-top: -4px;
          width: 34px;
          height: 34px;
          margin-bottom: 4px;
        }
    }
    // .weui-tabbar:before{

    // }
  }
  .weui-tabbar:before{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 2px;
    border-top: 2px solid #E5E5E5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }
}
</style>
