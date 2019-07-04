<template>
    <div class="myOrderPage">
        <commonInfo></commonInfo>
        <tab :line-width="2" custom-bar-width="44px" default-color='#333333' active-color='#2069E5' v-model="index">
          <tab-item selected @on-item-click='selectedCurrent'>棋手</tab-item>
          <tab-item  @on-item-click='selectedCurrent'>地址</tab-item>
          <tab-item  @on-item-click='selectedCurrent'>联系人</tab-item>
          <tab-item  @on-item-click='selectedCurrent'>报销凭证</tab-item>
        </tab>
        <div class="list listWrapper" ref="listWrapper">
            <ul class="content">
            <div v-for="(item,index) in list" :key="index">

              <p class="commonTagP">
                <span>电话号码</span>
                <span>{{item.examLevels}}</span>
              </p>
              <p class="commonTagP">
                <span>所属机构</span>
                <span>{{item.examTime}}</span>
              </p>
            </div>
            <p class="bottomBar">
                已加载全部
            </p>
            </ul>
        </div>
        <commonTabbar></commonTabbar>
    </div>
</template>

<script>
import Bscroll from 'better-scroll';
import { Tab, TabItem } from "vux";
import commonInfo from "./popups/commonInfo";
import commonTabbar from "../../components/commonTabbar";
export default {
  components: {
    Tab,
    TabItem,
    commonTabbar,
    commonInfo
  },
  data() {
    return {
      index: 0,
      list:[
        // {
        //   roomName:'龙岗区考场',
        //   examStatus:0,
        //   examLevels:'10级',
        //   address:'黑龙江省哈尔滨市围棋协会二楼130',
        //   examTime:'2019.02.18 9:00',
        //   playerName:'网三',
        //   price:1600,
        //   state:0,
        //   playerList:[{},{}]
        // },
      ],

    };
  },
  methods: {
    getList(params){
        this.$axios.get('/api/order/orderAll_list',{params}).then( res =>{
        if(res.data.code ===0 ){
          this.list =res.data.data.info;
          console.log(res.data.data.info,'DNF')
        }
        this.$nextTick(() => {
          this.scroll = new Bscroll(this.$refs.listWrapper, {click:true})
        })
     })
    },
    selectedCurrent(index) {
      this.index = index;
      if(index === 0){
        let params = {
            userId:1,
        }
        //  this.getList(params);
      }
      if(index === 1){
        let params = {
            userId:1,
            payStatus:0   //0 代付款
        }
        //  this.getList(params);
      }
      if(index === 2){
        let params = {
            userId:1,
            payStatus:1   //0 已付款
        }
        //  this.getList(params);
      }
    },
    refundBtn(){
      alert('功能开发中')
    },
    checkTicket(){
        alert('功能开发中')
    }
  },
  created(){

  }
};
</script>


<style lang='scss' scoped>
@import "../../style/mixin.scss";
.myOrderPage {
  width: 100%;
  height: 100%;
  background: $bg-color;
  & /deep/ .vux-tab .vux-tab-item {
    background: none;
    font-size: 16px;
    color: #333333;
  }
  .listWrapper{
     width: 100%;
     height:100%;
   } 
  &> .list {
    display: flex;
    width: 100%;
    height: 618px;
    overflow: hidden;
    margin-top: 12px;
    flex-direction: column;
    align-items: center;
    &>.content{
      & > div {
      width: 327px;
      // height: 186px;
      overflow: hidden;
      padding: 16px;
      margin-top: 12px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
      border-radius: 14px;
      &:nth-of-type(1){
          margin-top:0;
      }
      & > p:nth-of-type(1) {
          width:100%;
          height: 22px;
          & >.firstSpan{
            font-size: 16px;
            height: 22px;
            float: left;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 22px;
          }
          & > span {
            font-size:16px;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            float: right;
            color:rgba(237,26,35,1);
            line-height:22px;
          }
        }
        & > p:nth-of-type(2) {
          margin-top: 16px;
          
        }
        .commonTagP {
          margin-top: 8px;
          & > span {
            height: 20px;
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
          }
          & > span:nth-of-type(1) {
            color: #666666;
            height: 20px;
            margin-right: 16px;
            float: left;
          }
          & > span:nth-of-type(2) {
            color: #333333;
            width: 249px;
            height: 20px;
            display: inline-block;
          }
        }
        &>button{
            width:76px;
            height:28px;
            border-radius:14px;
            padding: 0;
            border:1px solid rgba(32,105,229,1);
            font-size: 14px;
            margin-top: 16px;
            float: right;
            color: #ffffff;
            background: $bg-blue;
        }
        .btnGrps{
          &>button{
              width: 76px;
              height:28px;
              border: none;
              outline: none;
              background: #ffffff;
              border-radius:14px;
              border:1px solid rgba(32,105,229,1);
              font-size: 14px;
              color:rgba(32,105,229,1);
              margin-top: 16px;
              float: right;
              margin-left: 8px;
            }
        }
    }

    }
    
    .bottomBar{
      display: flex;
      justify-content: center;
      font-size:12px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(176,176,176,1);
      line-height:17px;
      margin-top:8px;
    }
  }

}
</style>
