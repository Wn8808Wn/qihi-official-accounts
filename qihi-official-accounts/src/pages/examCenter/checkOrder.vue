<template>
    <div class="orderDetailsPage">
        <div class="orderDetailsPageWrapper"  ref="orderDetailsPageWrapper">
            <div class="content">
                <div class="topPart">
                    <div class="waitPayTop">
                        <div class="waitPay">
                            <img src="../../assets/imgs/duigou.svg">
                            <div>
                                <p>已付款</p>
                                <p v-if="noRefundStatus">超过退款时限，此订单报名费不再支持退款</p>
                            </div>
                        </div>
                    </div>        
                    <div class="infoBox">
                        <h3>{{examRoomName}}</h3>
                        <div class="bottomBorderBox">
                            <p>
                                <span>考试地点</span>
                                <span>{{address}}</span>
                            </p>
                            <p>
                                <span>考试级别</span>
                                <span>{{examLevelTitle}}</span>
                            </p>
                            <p>
                                <span>考试时间</span>
                                <span>{{examTime.split(' ')[0].replace(/-/g,'.')}} {{examTime.split(' ')[1]}}</span>
                            </p>

                        </div>

                        <div class="bottomBorderBox middleDownTips">
                            <p>
                                <span>联系人</span>
                                <span>{{linkMan}}  {{linkmanPhone}}</span>
                            </p>
                            <p>
                                <span>发票信息</span>
                                <span v-if="receiptTitleType === ''">不开发票</span>
                                <span v-if="receiptTitleType === 1">[个人]</span>
                                <span v-if="receiptTitleType === 2">[企业] {{receiptTitle}}</span>
                            </p>
                            <i  :class="{up:showInvoiceInfo === true}" v-if="receiptTitleType !== ''"  @click="showInvoiceInfo=!showInvoiceInfo"></i>
                            <p class="onlyP" v-if="showInvoiceInfo && receiptTitleType === 2">
                            <span >统一社会信用代码</span>
                            <span  class="onlySpan">{{taxFileNo}}</span>
                            </p>
                            <p v-if="showInvoiceInfo">
                            <span>接收邮箱</span>
                            <span>{{email}}</span>
                            </p>
                        </div>

                        <div class="bottomBorderBox">
                            <p class="orderNumberP">
                                <span>订单编号</span>
                                <span>{{orderNo}}</span>
                                <x-button plain type="primary" style="border-radius:14px;">复制</x-button>
                            </p>
                            <p>
                                <span>下单时间</span>
                                <span>{{createdTime}}</span>
                            </p>
                            <p>
                                <span>付款时间</span>
                                <span>{{payOffTime}}</span>
                            </p>
                        </div>
                        <div class="bottomBar">
                            <p><i class="iconfont icon-lianxikefu"></i><span>联系客服</span></p>
                        </div>
                    </div>
                </div>    
                <div class="applyPlayerList">
                        <div v-for="(item,index) in playerslist" :key="index" class="commonBox">
                            <p>
                            <span class="firstSpan">{{item.playerName}}</span>
                            <span>{{item.certificateNo}}</span>
                            </p>
                            <p class="commonTagP">
                                <span>电话号码</span>
                                <span>{{item.phone}}</span>
                            </p>
                            <p class="commonTagP">
                                <span>报名费用</span>
                                <span style="color:#ED1A23;"><i style="font-style:normal; color:#ED1A23;font-size:14px;">¥</i> {{unitPrice}}</span>
                            </p>

                        </div>

                </div>
                <div class="totalBox">
                    <span>费用合计</span> <span>¥{{totalPrice}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bscroll from "better-scroll";
import { Cell, Group, XButton } from "vux";
export default {
  components: {
    Cell,
    Group,
    XButton
  },
  data() {
    return {
      noRefundStatus: true,
      examRoomName: "",
      examLevelTitle: "",
      examTime: "",
      address: "",
      linkMan: "",
      linkmanPhone:"",
      orderNo: "",
      unitPrice: "",
      createdTime: "",
      payOffTime: "",
      totalPrice: "",
      playerslist: [],
      showInvoiceInfo: false,
      receiptTitleType:'',
      receiptTitle: "",
      taxFileNo: "",
      email: ""
    };
  },
  methods: {
    longTimeAgo(dateStr, timeStr, long) {
      let s = dateStr.split(" ")[0] + " " + timeStr;
      var new_time_str = s.replace(/-/g, "/");
      var now = new Date(new_time_str);
      var time = now.getTime() + 1000 * 60 * long;
      return this.formatDate(time, "hh:mm");
    }
  },
  created() {
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.orderDetailsPageWrapper, {
        click: true
      });
    });
  },
  mounted() {
    //  缓存数据
    // console.log(JSON.parse(sessionStorage.getItem('routerObj')),'000');
    let routerObj = JSON.parse(sessionStorage.getItem("routerObj"));
    this.examRoomName = routerObj.examRoomName;
    this.address = routerObj.address;
    this.examLevelTitle = routerObj.examLevelTitle;
    this.examTime = routerObj.examTime;
    this.linkMan = routerObj.linkMan;
    this.totalPrice = routerObj.totalPrice;
    this.linkmanPhone = routerObj.linkmanPhone;
    this.playerslist = routerObj.playerList;
    this.orderNo = routerObj.orderNo;
    this.receiptTitleType = routerObj.receiptTitleType?routerObj.receiptTitleType:'';
    this.taxFileNo = routerObj.taxFileNo;
    this.receiptTitle = routerObj.receiptTitle;
    this.email = routerObj.email;
    this.createdTime = routerObj.createdTime;
    this.unitPrice = routerObj.unitPrice;
    this.payOffTime = JSON.parse(sessionStorage.getItem("payOffTime"));
 

  }
};
</script>

<style lang='scss' scoped>
@import "../../style/mixin.scss";
.orderDetailsPage {
  width: 375px;
  height: 100%;
  background: $bg-color;
  overflow: hidden;
  .orderDetailsPageWrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    & > .content {
      padding-bottom: 50px;
      & > .topPart {
        width: 100%;
        & > .waitPayTop {
          height: 104px;
          width: 375px;
          background: url("../../assets/imgs/waitPay.svg") no-repeat;
          background-size: 100% 100%;
          & > .waitPay {
            width: 100%;
            height: 73px;
            display: flex;
            align-items: center;
            & > img {
              width: 32px;
              height: 32px;
              margin-left: 23px;
              margin-right: 7px;
            }
            & > div {
              & > p:first-child {
                font-size: 16px;
                font-weight: 600;
                line-height: 22px;
              }
              & > p {
                font-size: 14px;
                color: rgba(255, 255, 255, 1);
                line-height: 20px;
              }
            }
          }
        }
        & > .infoBox {
          width: 359px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
          border-radius: 14px;
          margin: -31px 8px 0 8px; // 调整样式
          padding: 0;
          & > h3 {
            width: 327px;
            padding: 16px;
            border-bottom: 1px solid #e5e5e5;
            font-size: 16px;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 22px;
          }
          & > .bottomBorderBox {
            padding: 16px;
            border-bottom: 1px solid #e5e5e5;
            & > p {
              margin-bottom: 8px;
              position: relative;
              & > span {
                font-weight: 500;
                line-height: 20px;
                font-size: 14px;
              }
              & > span:nth-of-type(1) {
                color: #666666;
                float: left;
                width: 60px;
                margin-right: 16px;
              }
              & > span:nth-of-type(2) {
                color: #333333;
                display: inline-block;
              }

              &:last-child {
                margin-bottom: 0px;
              }
              .weui-btn_plain-primary {
                color: #2069e5;
                font-size: 14px;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                line-height: 20px;
                border: 1px solid #2069e5;
              }
              button.weui-btn,
              input.weui-btn {
                height: 28px;
                width: 78px;
                padding: 0;
                position: absolute;
                right: 0;
                top: -5px;
              }
            }
            .onlyP {
              height: 40px;
              .onlySpan {
                height: 40px;
                line-height: 40px;
              }
            }
            .orderNumberP {
              position: relative;
              .weui-btn_plain-primary {
                color: #2069e5;
                font-size: 14px;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                line-height: 20px;
                border: 1px solid #2069e5;
              }
              button.weui-btn,
              input.weui-btn {
                height: 28px;
                width: 60px;
                position: absolute;
                right: 0;
                top: -5px;
              }
            }
          }
          .middleDownTips {
            position: relative;
            & > i {
              width: 20px;
              height: 20px;
              position: absolute;
              bottom: -10px;
              left: 50%;
              transform: translate(-10px, 0);
              display: block;
              background: url("../../assets/imgs/down.svg") no-repeat;
              background-size: 100% 100%;
            }
            .up {
              width: 20px;
              height: 20px;
              position: absolute;
              bottom: -10px;
              left: 50%;
              transform: translate(-10px, 0);
              display: block;
              background: url("../../assets/imgs/up.svg") no-repeat;
              background-size: 100% 100%;
            }
          }
          & > .bottomBar {
            display: flex;
            align-items: center;
            & > p {
              flex: 1;
              height: 52px;
              display: flex;
              justify-content: center;
              align-items: center;
              & > span {
                font-size: 14px;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(32, 105, 229, 1);
                line-height: 20px;
              }
              & > .icon-lianxikefu {
                color: rgba(32, 105, 229, 1);
                font-size: 18px;
                margin-right: 2px;
              }
            }
          }
        }
      }
      & > .applyPlayerList {
        width: 359px;
        margin: 0 auto;
        overflow: hidden;
        margin-top: 12px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
        border-radius: 14px;
        & > .commonBox {
          border-radius: 0;
          border-bottom: 1px solid #e5e5e5;
          & > p:nth-of-type(1) {
            width: 100%;
            height: 22px;
            margin-bottom: 16px;
            & > span {
              font-size: 16px;
              font-family: PingFangSC-Semibold;
              font-weight: 600;
              float: left;
              color: rgba(51, 51, 51, 1);
              line-height: 22px;
            }
            & > .firstSpan {
              width: 64px;
              height: 22px;
              overflow: hidden;
              margin-right: 8px;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .commonTagP {
            height: 20px;
            margin-bottom: 8px;
            & > span {
              font-size: 14px;
              font-weight: 500;
              line-height: 20px;
            }
            & > span:nth-of-type(1) {
              color: #666666;
              margin-right: 16px;
              float: left;
            }
            & > span:nth-of-type(2) {
              color: #333333;
              width: 249px;
              display: inline-block;
            }
            &:nth-last-of-type(1) {
              margin-bottom: 0px;
            }
          }
        }
      }
      & > .totalBox {
        width: 327px;
        height: 20px;
        margin: 0 auto;
        padding: 16px;
        margin-top: 12px;
        background: rgba(255, 255, 255, 1);
        // background: skyblue;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
        border-radius: 14px;
        & > span {
          height: 20px;
          font-size: 14px;
          color: #666666;
          margin-right: 16px;
          &:nth-of-type(2) {
            font-size: 14px;
            font-family: PingFang-SC-Medium;
            color: rgba(237, 26, 35, 1);
          }
        }
      }
    }
  }
}
</style>
