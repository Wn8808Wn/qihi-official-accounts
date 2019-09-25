<template>
    <div class="myOrderPage">
        <tab :line-width="2" custom-bar-width="44px" default-color='#333333' active-color='#2069E5' v-model="index">
          <tab-item selected @on-item-click='selectedCurrent'>全部</tab-item>
          <tab-item  @on-item-click='selectedCurrent'>待付款</tab-item>
          <tab-item  @on-item-click='selectedCurrent'>已付款</tab-item>
        </tab>
    
        <div class="orderList orderListWrapper" ref="orderListWrapper">
            <ul class="content">
            <div v-for="(item,index) in list" :key="index" @click.stop="goDetails(item)">
              <p>
                <span class="firstSpan" v-if="item.orderType === 0">中国围棋协会段级位考试</span>
                <span class="firstSpan" v-if="item.orderType === 1">中国围棋协会段级位认证服务</span>
                <span v-if="item.payStatus === 0">等待付款</span>
                <span v-if="item.payStatus === 1" style="color:#666666;">已付款</span>
                <span v-if="item.payStatus === 2" style="color:#666666;">已关闭</span>
              </p>
              <p class="commonTagP">
                <span>考试级别</span>
                <span>{{item.examLevels}}</span>
              </p>
              <p class="commonTagP">
                <span>考试时间</span>
                <span>{{item.examTime}}</span>
              </p>
              <p class="commonTagP">
                <span>报名棋手</span>
                <span v-if="item.playerList.length === 1">{{item.playerList[0].playerName}}</span>
                <span v-if="item.playerList.length >= 2">{{item.playerList[0].playerName}} 等{{item.playerList.length}}人</span>
              </p>
              <p class="commonTagP">
                <span>需付费用</span>
                <span style="color:#ED1A23;">¥{{item.totalFee}}</span>
              </p>

              <div class="btnGrps">
                  <button v-if="item.payStatus === 0"  @click.stop="handlePay(item)" class="bgBtn">去支付</button>
              </div>
              <div class="btnGrps">
                   <button v-if="item.payStatus === 1"  @click.stop="refundBtn">申请发票</button>
                   <!-- <button v-if="item.payStatus === 1" @click="checkTicket">申请发票</button> -->
              </div>
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
import commonTabbar from "../../components/commonTabbar";
export default {
  components: {
    Tab,
    TabItem,
    commonTabbar
  },
  data() {
    return {
      index: 0,
      list:[],
    };
  },
  methods: {
      longTimeAgo(dateStr, timeStr, long) {
        let s = dateStr.split(" ")[0] + " " + timeStr;
        var new_time_str = s.replace(/-/g, "/");
        var now = new Date(new_time_str);
        var time = now.getTime() + 1000 * 60 * long;
        return this.formatDate(time, "hh:mm");
      },
      goDetails(item){
        if(item.payStatus === 0 && item.orderType === 0){
            let dataObj = {
              examPlanId:item.playerList[0].examPlanId,
              linkMan:item.playerList[0].linkman,
              phone:item.playerList[0].phone,
              totalPrice:item.totalFee,
              playerslist:item.playerList,
              examRoomName:item.roomName,
              examLevelTitle:item.examLevels,
              address:item.address,
              examTime:item.examTime,
              orderNo:item.orderNo,
              createdTime:item.createdTime,
              orderId:item.orderId,
              unitPrice:item.playerList[0].examFee
            };
            sessionStorage.setItem('routerObj',JSON.stringify(dataObj))
            this.$router.push({ name:'orderDetails'});
        }
        if(item.payStatus === 0 && item.orderType === 1){
            let params = {
                examPlanId:item.playerList[0].examPlanId,
                linkMan:item.playerList[0].linkman,
                phone:item.playerList[0].phone,
                totalFee:item.totalFee,
                certificateList:item.playerList,
                examLevel:item.examLevel,
                orderNo:item.orderNo,
                createdTime:item.createdTime,
                orderId:item.orderId
            }
            sessionStorage.setItem('detailsObj',JSON.stringify(params))
            this.$router.push({name:'certificatePay'})
        }
        //已支付考试
        if(item.payStatus === 1 && item.orderType === 0){
            console.log(item,'已支付考试')
            let routerObj = {
                examRoomName: item.roomName,
                address: item.address,
                examLevelTitle: item.examLevels,
                examTime: item.examTime,
                linkMan: item.playerList[0].linkman,
                totalPrice: item.totalFee,
                linkmanPhone: item.playerList[0].phone,
                playerList:item.playerList,
                unitPrice: item.totalFee/(item.playerList.length),
                createdTime: item.createdTime,
                orderNo: item.orderNo,
                orderId: item.orderId,
                timeStr:item.timeStr
            };
            //进入详情页先查看是否存在发票信息 
            let params = {
                orderId:item.orderId
            }
            this.$axios.get('/api/receipt/get_by_order_id',{params}).then( res =>{
                if(res.data.code === 0){
                  console.log(res,'res')
                  var dataObject = res.data.data
                  let  conbineObj= { 
                    receiptTitleType:dataObject.receiptTitleType,
                    receiptTitle : dataObject.receiptTitle,
                    taxFileNo : dataObject.taxFileNo,
                    email : dataObject.email
                  }
                  Object.assign(routerObj,conbineObj)
                  sessionStorage.setItem('payOffTime',JSON.stringify(item.playerList[0].payTime))
                  sessionStorage.setItem("routerObj", JSON.stringify(routerObj));
                  this.$router.push({name:'checkOrder'})
                }else{
                    sessionStorage.setItem('payOffTime',JSON.stringify(item.playerList[0].payTime))
                    sessionStorage.setItem("routerObj", JSON.stringify(routerObj));
                    this.$router.push({name:'checkOrder'})
                }
            })
        }
        //已支付认证
        if(item.payStatus === 1 && item.orderType === 1){
            console.log(item)
            let detailsObj ={
                examLevelTitle:item.examLevels,
                totalPrice:item.totalFee,
                certificateList:item.playerList,
                unitPrice:item.totalFee/(item.playerList.length),
                createdTime:item.createdTime,
                orderNo:item.orderNo,
                orderId:item.orderId
            }
            sessionStorage.setItem('certificatePayOffTime',item.playerList[0].payTime);
            sessionStorage.setItem('detailsObj',JSON.stringify(detailsObj)) 
            this.$router.push({name:'checkCertificateOrder'})
        }
      },
      getList(params){
          this.list =[];
          this.$axios.get('/api/order/orderAll_list',{params}).then( res =>{
              if(res.data.code ===0 ){
                  this.list =res.data.data.info;
                  this.list.map( item =>{
                    item.examTime = item.examTime.split(' ')[0].replace(/-/g,'.') +' '+this.formatDate(item.examTime, "hh:mm")+'-'+this.longTimeAgo(item.examTime,item.examTime.split(' ')[1],parseInt(item.timeStr))
                  })
                  // console.log(res.data.data.info,'订单列表')
                  this.$nextTick(() => {
                      this.scroll = new Bscroll(this.$refs.orderListWrapper, {})
                  })
              }
          })
      },
      selectedCurrent(index) {
        this.index = index;
        if(index == 0){
          let params = {
            
          }
          this.getList(params);
        }
        if(index == 1){
          let params = {
             
              payStatus:0   //0 代付款
          }
          this.getList(params);
        }
        if(index == 2){
          let params = {
            
              payStatus:1   //1 已付款
          }
          this.getList(params);
        }
      },
      refundBtn(){
        console.log('1')
        // alert('功能开发中')
      },
      handlePay(item){
        console.log(item,'item')
        if(item.orderType === 0){
          let dataObj = {
              examPlanId:item.playerList[0].examPlanId,
              linkMan:item.playerList[0].linkman,
              linkmanPhone:item.playerList[0].phone,
              totalPrice:item.totalFee,
              playerList: item.playerList,
              examRoomName:item.roomName,
              examLevelTitle:item.examLevels,
              address:item.address,
              examTime:item.examTime,
              orderNo:item.orderNo,
              createdTime:item.createdTime,
              orderId:item.orderId,
              unitPrice:item.totalFee/(item.playerList.length)
          };
          sessionStorage.setItem('routerObj',JSON.stringify(dataObj))
          this.$router.push({ name:'orderDetails'});
        }else{
          let params = {
              examPlanId:item.playerList[0].examPlanId,
              linkMan:item.playerList[0].linkman,
              linkmanPhone:item.playerList[0].phone,
              totalFee:item.totalFee,
              certificateList:item.playerList,
              examLevel:item.examLevel,
              orderNo:item.orderNo,
              createdTime:item.createdTime,
              orderId:item.orderId
          }
          sessionStorage.setItem('detailsObj',JSON.stringify(params))
          this.$router.push({name:'certificatePay'})
        }
      },
      checkTicket(){
          alert('功能开发中')
      }
  },
  created(){
      let params = {
      }
      this.getList(params);
  },
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
  .orderListWrapper{
     width: 100%;
     height:612px;
     overflow: hidden;
   } 
  &> .orderList {
    display: flex;
    width: 100%;
    margin-top: 1px;
    flex-direction: column;
    align-items: center;
    &>.content{
      & > div {
      width: 327px;
      overflow: hidden;
      padding: 16px;
      margin-top: 12px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
      border-radius: 14px;
      &:nth-of-type(1){
          margin-top:12px;
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
          .bgBtn{
            width:76px;
            height:28px;
            border-radius:14px;
            padding: 0;
            border:none;
            font-size: 14px;
            margin-top: 16px;
            float: right;
            color: #ffffff;
            background: $bg-blue;
          }
        }
    }

    }
    
    .bottomBar{
      display: flex;
      justify-content: center;
      font-size:12px;
      font-weight:500;
      color:rgba(176,176,176,1);
      line-height:17px;
      margin-top:8px;
      padding-bottom: 50px;
    }
  }

}
</style>
