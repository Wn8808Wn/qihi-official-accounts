<template>
    <div class="orderDetailsPage">
        <div class="orderDetailsPageWrapper"  ref="orderDetailsPageWrapper">
            <div class="content">
                <div class="topPart">
                    <div class="waitPayTop">
                        <div class="bgBox">
                            <p><img src="../../assets/imgs/timer.svg"></p>
                            <div>
                                <p>等待付款</p>
                                <p>座位已成功锁定,请在<clocker :time="time1" format='%M 分 %S 秒' @on-finish = "showTitle"></clocker>内完成支付</p>
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
                                <span>{{examTime}}</span>
                                <!-- <span>{{examTime.split(' ')[0].replace(/-/g,'.')}} {{examTime.split(' ')[1]}}</span> -->
                            </p>
                        </div>

                        <div class="bottomBorderBox middleDownTips">
                            <p>
                                <span>联&nbsp;&nbsp;系&nbsp;&nbsp;人</span>
                                <span>{{linkman}}&nbsp;{{phone}}</span>
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
                        </div>
                        <div class="bottomBar">
                            <p><i class="iconfont icon-lianxikefu"></i><span>联系客服</span></p>
                            <p><i class="iconfont icon-chakandingdan"></i><span>取消订单</span></p>
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
            </div>
        </div>
        <div class="fixedBox">
            <p><span>合计:</span> <i>¥</i><span>{{totalPrice}}</span></p>
            <button @click="showCofirmPage" :class="{'allowClick':disabled === false}" :disabled="disabled" >
                立即支付
            </button>
        </div>
        <!-- 确认支付吗 -->
        <div v-transfer-dom class="showConfirmPay">
          <confirm v-model="showCofirmTitle"
          title="提示"
          @on-cancel="onCancel"
          @on-confirm="onConfirm"
          confirm-text='继续支付'
          >
            <p style="font-size:16px;font-weight:400;color:rgba(102,102,102,1);line-height:22px;">报名成功后,退款将收取30%的手续费（距考试开始不足48小时将不再支持退款）。</p>
          </confirm>
        </div>
    </div>
</template>

<script>
import Bscroll from "better-scroll";
import qs from "qs";
import { Clocker, Cell, Group, XButton, Confirm, TransferDom } from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    Clocker,
    Cell,
    Group,
    XButton,
    Confirm
  },
  data() {
    return {
      time1: "",
      time: "",
      examRoomName: "",
      examLevelTitle: "",
      examTime: "",
      address: "",
      linkman: "",
      phone: "",
      orderNo: "",
      createdTime: "",
      disabled: false,
      showCofirmTitle: false,
      orderId: "",
      totalPrice: "",
      unitPrice: "",
      receiptTitleType: null,
      receiptTitle: "",
      taxFileNo: "",
      email: "",
      showInvoiceInfo: false,
      playerslist: []
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
    showTitle() {
      let params = {
        id: this.orderId
      };
      this.$axios
        .post("/api/enroll/order_time", qs.stringify(params))
        .then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.disabled = true;
          }
        });
    },
    showCofirmPage() {
      this.showCofirmTitle = true;
    },
    onCancel() {
      this.$router.push({ name: "myOrder" });
      //保存初始化时间在我的订单中去支付使用
      sessionStorage.setItem("initializeTime", this.time);
    },
    onConfirm() {
      //支付成功获取支付时间
      let params = {
        orderId: this.orderId,
        payFee: this.totalPrice
      };
      this.$axios
        .post("/api/order/OrderPayment", qs.stringify(params))
        .then(res => {
          if (res.data.code === 0) {
            let payOffTime = res.data.data;
            sessionStorage.setItem("payOffTime", JSON.stringify(payOffTime));
          }
        });
      this.$router.push({ name: "successApply" });
    }
  },
  created() {
    //通过缓存拿到订单号和创建时间
    let dataObj = JSON.parse(sessionStorage.getItem("routerObj"));
    if (dataObj.receiptTitleType == undefined) {
      let params = {
        orderId: dataObj.orderId
      };
      this.$axios.get("/api/receipt/get_by_order_id", { params }).then(res => {
        if (res.data.code === 0) {
          console.log(res, "res");
          var dataObject = res.data.data;
          this.receiptTitleType = dataObject.receiptTitleType;
          this.receiptTitle = dataObject.receiptTitle;
          this.taxFileNo = dataObject.taxFileNo;
          this.email = dataObject.email;
          this.examRoomName = dataObj.examRoomName;
          this.address = dataObj.address;
          this.orderId = dataObj.orderId;
          this.orderNo = dataObj.orderNo;
          this.createdTime = dataObj.createdTime;
          this.examLevelTitle = dataObj.examLevelTitle;
          this.examTime = dataObj.examTime;
          this.linkman = dataObj.linkMan;
          this.totalPrice = dataObj.totalPrice;
          this.phone = dataObj.linkmanPhone;
          this.playerslist = dataObj.playerList;
          this.unitPrice = dataObj.unitPrice;
          let TimeGo = new Date(dataObj.createdTime);
          let t = TimeGo.getTime() + 30 * 1000 * 60;
          this.time1 = this.formatDate(t, "YYYY-MM-DD hh:mm:ss");
          let conbineObj = {
            receiptTitleType: dataObject.receiptTitleType,
            receiptTitle: dataObject.receiptTitle,
            taxFileNo: dataObject.taxFileNo,
            email: dataObject.email
          };
          Object.assign(dataObj, conbineObj);
          sessionStorage.setItem("routerObj", JSON.stringify(dataObj));
          this.$nextTick(() => {
            this.scroll = new Bscroll(this.$refs.orderDetailsPageWrapper, {
              click: true
            });
          });
        } else {
          this.examRoomName = dataObj.examRoomName;
          this.address = dataObj.address;
          this.orderId = dataObj.orderId;
          this.orderNo = dataObj.orderNo;
          this.createdTime = dataObj.createdTime;
          this.examLevelTitle = dataObj.examLevelTitle;
          this.examTime = dataObj.examTime;
          this.linkman = dataObj.linkMan;
          this.totalPrice = dataObj.totalPrice;
          this.phone = dataObj.linkmanPhone;
          this.playerslist = dataObj.playerList;
          this.unitPrice = dataObj.unitPrice;
          let TimeGo = new Date(dataObj.createdTime);
          let t = TimeGo.getTime() + 30 * 1000 * 60;
          this.time1 = this.formatDate(t, "YYYY-MM-DD hh:mm:ss");
          this.$nextTick(() => {
            this.scroll = new Bscroll(this.$refs.orderDetailsPageWrapper, {
              click: true
            });
          });
        }
      });
    } else {
      this.examRoomName = dataObj.examRoomName;
      this.address = dataObj.address;
      this.orderId = dataObj.orderId;
      this.orderNo = dataObj.orderNo;
      this.createdTime = dataObj.createdTime;
      this.examLevelTitle = dataObj.examLevelTitle;
      this.examTime = dataObj.examTime;
      this.linkman = dataObj.linkMan;
      this.totalPrice = dataObj.totalPrice;
      this.phone = dataObj.linkmanPhone;
      this.receiptTitleType = dataObj.receiptTitleType;
      this.receiptTitle = dataObj.receiptTitle;
      this.taxFileNo = dataObj.taxFileNo;
      this.email = dataObj.email;
      this.playerslist = dataObj.playerList;
      this.unitPrice = dataObj.unitPrice;
      let TimeGo = new Date(dataObj.createdTime);
      let t = TimeGo.getTime() + 30 * 1000 * 60;
      this.time1 = this.formatDate(t, "YYYY-MM-DD hh:mm:ss");
      this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.orderDetailsPageWrapper, {
          click: true
        });
      });
    }
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
    height: 620px;
    overflow: hidden;
    & > .content {
      padding-bottom: 50px;
      & > .topPart {
        width: 100%;
        // position: relative;
        & > .waitPayTop {
          height: 104px;
          width: 375px;
          background: url("../../assets/imgs/waitPay.svg") no-repeat;
          background-size: 100% 100%;
          & > .bgBox {
            width: 100%;
            height: 73px;
            display: flex;
            align-items: center;
            & > p {
              width: 32px;
              height: 32px;
              margin-left: 23px;
              margin-right: 7px;
              & > img {
                width: 100%;
                height: 100%;
              }
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
          // position: absolute;
          // top: 73px;
          // left: 8px;
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
              & > i {
                color: rgba(32, 105, 229, 1);
                font-size: 14px;
                height: 14px;
                width: 14px;
                margin-right: 8px;
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
    }
  }
}
</style>
