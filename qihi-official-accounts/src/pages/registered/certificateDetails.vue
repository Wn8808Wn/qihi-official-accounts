<template>
    <div class="certificatePage">
        <div class="headerTop" @click="showPopupPage">
            <i class="iconfont icon-zhushi"></i><span>申领说明</span>
        </div>
        <div v-transfer-dom>
            <popup v-model="showPopup">
                <div class="popupPage">
                    <div class="PopupTop">
                        <p>申领说明</p>
                        <span @click="cancleBtn">取消</span>
                    </div>
                <ul class="popupContent">
                    <li>
                      <h3>证书说明</h3>
                      <p>棋手通过相关段级位考试后，需在3个自然月内进行证书申领，逾期认证资格将作废。</p>
                      <p>申领成功后，将收到电子证书。</p>
                      <p>纸质证书根据认证棋手意愿支付获取。</p>
                    </li>
                    <li>
                      <h3>费用说明</h3>
                      <p>证书费支付成功后不支持退款。</p>
                      <p>考试棋手跨级别考试通过后进行段级位认证需要补齐所跨全部级别的证书费。</p>
                    </li>
                </ul>
              </div>
            </popup>
        </div>
          <!-- 选择联系人发票信息 -->
        <div class="linkManPart">
           <div class="seletLinkman bottomBorder">
                <p>是否需要纸质证书</p>  
                <p> <inline-x-switch v-model="needPaper"></inline-x-switch></p>
            </div>
            <div class="seletLinkman bottomBorder"  v-if="!needPaper">
                <p>联系人</p>  
                <p><span  v-if="showDefLinkmanSpan" class="defaultSpan">默认</span> <span>{{linkManInfo}}</span> <span v-if="false">{{linkManPhone}}</span> <i class="iconfont icon-youjiantou" @click="showLinkManPopupsPage"></i> </p>
            </div>
            <div class="seletLinkman bottomBorder">
                <p>发票信息</p> 
                <p><span v-if="false">[企业]</span> 
                <span v-if="receiptTitleType === 0">不开发票</span>
                <span v-if="receiptTitleType === 1">个人</span>
                <span v-if="receiptTitleType === 2">企业</span>
                <i class="iconfont icon-youjiantou" @click="showInvoicePage"></i></p> 
                <!-- <p> <span style="color:#B0B0B0;">非必填，可补开</span><i class="iconfont icon-youjiantou" @click="showLinkManPopupsPage"></i></p>  -->
            </div>
            <div class="seletLinkman" v-if="needPaper">
                <p>收件地址</p> 
                <p><span style="color:#B0B0B0;">请添加收件地址</span><i class="iconfont icon-youjiantou" @click="showLinkManPopupsPage"></i></p> 
            </div>
        </div>  
        <div class="infoTop">
             <p>中国围棋协会段级位认证服务</p><span>认证级别:{{leveNames}}</span> <span>{{totalPerson}}人</span>
        </div>
       
         <!-- 点击联系人弹层 -->
        <div v-transfer-dom>
            <popup v-model="showLinkMan"  height='100%' position='bottom'>
              <div class="popupPage">
                <div class="PopupTop">
                    <p>选择联系人</p>
                    <span @click="cancleBtn">取消</span>
                </div>
                <!-- 获取联系人列表 -->
                <div class="linkManListBox linkmanWrapper"  ref="linkmanWrapper" v-if='!noLinkMan'>
                    <ul class="content">
                        <li v-for="(item,index) in linkManList" :key="index"
                          @click="selectCurrentLinkMan(item,index)">
                            <p :class="{activeLinkManStyle:currentLinkManId === index}">
                                <span>{{item.linkman}}</span>
                                <span class="mtop4px">{{item.phone}}</span>
                                <span v-if="item.email" class="mtop4px">{{item.email}}</span>
                            </p>
                        </li>
                    </ul>
                </div>
                <div v-if="noLinkMan" class="noLinkManBox">
                    <p>还没有创建常用联系人</p>
                </div>
                <div class="btmBar">
                    <button @click="addLinkMan">新增联系人</button>
                </div>
              </div>
            </popup>
        </div>

        <!-- 列表渲染 -->
        <scroll class="listBox"  :data="certificateList">
            <ul class="content">
                <div v-for="(item,index) in certificateList" :key="index">
                    <p>
                    <span class="firstSpan">{{item.playerName}}</span>
                    <span>{{item.certificateNo}}</span>
                    </p>
                    <p class="commonTagP">
                    <span>电话号码</span>
                    <span>{{item.phone}}</span>
                    </p>
                    <p class="commonTagP">
                    <span>认证服务费</span><span>¥ {{item.examFee}}</span>
                    </p>
                </div>
                <p class="bottomTips">
                    已加载全部
                </p>
            </ul>
        </scroll>
        <div class="bottomBar">
          <div class="tips">
              <span class="playCheckBox">
                  <input type="checkbox" id='checkAll'  @change="mustBtn">
                  <label  for='checkAll'></label>
              </span>
            <p>勾选表示已阅读并同意<a href="" style="color:#2069e5;">《服务协议》</a></p>
          </div>
          <div class="payBtns">
              <p class="firstP">
                <span>合计:</span><span style="color:#ED1A23;margin-left:4px;font-weight:600;font-size:18px;">¥ {{totalPrice}}</span>
              </p>
              <button class="submitP" :disabled ="disabled" @click="submitOrder" :class="{'darkBtn':disabled === true}">提交订单</button>
          </div>
        </div>

    </div>
</template>

<script>
import qs from "qs";
import Bscroll from "better-scroll";
import { TransferDom, Popup, InlineXSwitch } from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    InlineXSwitch
  },
  data() {
    return {
      showPopup: false,
      currentIndex: 0,
      checkList: [],
      disabled: true,
      certificateList: [],
      linkManInfo: "",
      linkManPhone: "",
      showLinkMan: false,
      linkManList: [],
      currentLinkManId: "",
      needPaper: false,
      totalPerson: "",
      leveNames: "",
      examlevel: "",
      examPlanId: "",
      showDefLinkmanSpan: false,
      noLinkMan: false,
      showInvoice:false,
      receiptTitleType:0,
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.certificateList.forEach(item => {
        total += item.examFee;
      });
      return total;
    }
  },
  methods: {
    showPopupPage() {
      this.showPopup = true;
    },
    cancleBtn() {
      this.showPopup = false;
      this.showLinkMan = false;
    },
    showLinkManPopupsPage() {
      this.showLinkMan = true;
    },
    selectCurrentLinkMan(item, index) {
      this.currentLinkManId = index;
      this.linkManInfo = item.linkman;
      this.linkManPhone = item.phone;
      // console.log(this.linkManPhone,'aaa')
      setTimeout(() => {
        this.showLinkMan = false;
        this.currentLinkManId = "";
      }, 1000);
    },
    showInvoicePage() {
      this.showInvoice = true;
    },
    submitOrder() {
      let params = {
        examPlanId: this.examPlanId,
        linkMan: this.linkManInfo,
        phone: this.linkManPhone,
        totalFee: this.totalPrice,
        chessPlay: JSON.stringify(this.certificateList),
        examLeve: this.examlevel
      };
      // console.log(params,'ppppppp')
      //提交订单获取订单编号
      this.$axios
        .post("/api/enroll/submitOrder", qs.stringify(params))
        .then(res => {
          if (res.data.code === 0) {
            console.log(res, "获取订单编号");
            let rst = res.data.data;
            //缓存信息用于详情页
            let detailsObj = {
              certificateList: this.certificateList,
              createdTime: rst.createdTime,
              orderNo: rst.orderNo,
              orderId: rst.id,
              totalPrice: this.totalPrice,
              unitPrice: this.totalPrice / this.certificateList.length
            };
            sessionStorage.setItem("detailsObj", JSON.stringify(detailsObj));
            this.$router.push({ name: "certificatePay" });
          }
        });
    },
    mustBtn() {
      this.disabled = !this.disabled;
    },
    addLinkMan() {
      this.$router.push({ name: "addLinkman" });
    }
  },
  created() {
    this.certificateList = JSON.parse(sessionStorage.getItem("checkList"));
    this.leveNames = this.certificateList[0].leveNames;
    this.examlevel = this.certificateList[0].examlevel;
    this.totalPerson = this.certificateList.length;
    this.examPlanId = this.certificateList[0].examPlanId;
    let params = {};
    this.$axios.get("/api/linkman/list", { params }).then(res => {
      if (res.data.code === 0) {
        // this.linkManList = res.data.data;
        // console.log(res,'123');
        console.log(res, "联系人列表");
        this.linkManList = res.data.data;
        if (this.linkManList.length > 0) {
          this.noLinkMan = false;
          let defLinkmanInfoArr = this.linkManList.filter(
            (item, index) => item.isDef == 0
          );
          if (defLinkmanInfoArr.length > 0) {
            this.linkManInfo = defLinkmanInfoArr[0].linkman;
            this.linkManPhone = defLinkmanInfoArr[0].phone;
            this.showDefLinkmanSpan = true;
          } else {
            this.linkManInfo = "请选择";
            this.showDefLinkmanSpan = false;
          }
        } else {
          this.noLinkMan = true;
        }
        this.$nextTick(() => {
          this.scroll = new Bscroll(this.$refs.linkmanWrapper, {
            click: true
          });
        });
      }
    });
  }
};
</script>

<style lang='scss' scoped>
@import "../../style/mixin.scss";
.certificatePage {
  width: calc(100% -16px);
  height: calc(100% -16px);
  padding: 8px;
  background: $bg-color;
  & > .headerTop {
    width: 343px;
    height: 28px;
    background: rgba(255, 255, 255, 1);
    border-radius: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    & > i {
      font-size: 13px;
      margin-right: 8px;
    }
    & > span {
      font-size: 14px;
      height: 20px;
      color: rgba(51, 51, 51, 1);
    }
  }
  & > .linkManPart {
    width: 359px;
    height: 156px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
    border-radius: 14px;
    overflow: hidden;
    .bottomBorder {
      border-bottom: 1px solid #e5e5e5;
    }
    .seletLinkman {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      & > p {
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
        & > span {
          color: #333333;
        }
        & > .defaultSpan {
          font-size: 12px;
          font-weight: 500;
          padding: 1px 6px;
          height: 16px;
          line-height: 20px;
          margin-right: 4px;
          border: 1px solid #2069e5;
          color: rgba(255, 255, 255, 1);
          background: rgba(32, 105, 229, 1);
          border-radius: 10px;
        }
        // switch按钮样式
        & /deep/ .weui-switch,
        .weui-switch-cp__box {
          height: 14px;
          width: 40px;
        }
        & /deep/ .weui-switch-cp__input:checked ~ .weui-switch-cp__box,
        .weui-switch:checked {
          background-color: #2069e5;
          border: none;
          height: 14px;
          width: 40px;
        }

        & /deep/ .weui-switch-cp__box:before,
        .weui-switch:before {
          content: " ";
          position: absolute;
          top: 0;
          left: 0;
          width: 40px;
          height: 14px;
          border-radius: 14px;
          background-color: #b0b0b0;
        }
        & /deep/ .weui-switch-cp__box:after,
        .weui-switch:after {
          width: 24px;
          height: 24px;
          top: -6px;
          left: -2px;
          content: "";
        }
      }
    }
  }
  & > .infoTop {
    width: calc(100% - 16px);
    height: 52px;
    padding-left: 16px;
    line-height: 52px;
    & > p {
      font-size: 14px;
      float: left;
      color: rgba(51, 51, 51, 1);
    }
    & > span {
      float: left;
      margin-left: 12px;
      font-size: 12px;
      color: #666666;
    }
  }
  & > .listBox {
    // display: flex;
    width: 100%;
    height: 400px;
    overflow: hidden;
    // flex-direction: column;
    // align-items: center;
    & > .content {
      & > div {
        width: 327px;
        padding: 16px;
        margin-top: 12px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
        border-radius: 14px;
        &:nth-of-type(1) {
          margin-top: 0;
        }
        & > p:nth-of-type(1) {
          width: 100%;
          height: 22px;
          & > .firstSpan {
            font-size: 16px;
            width: 70px;
            height: 22px;
            float: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            margin-right: 8px;
            color: rgba(51, 51, 51, 1);
            line-height: 22px;
          }
          & > span {
            font-size: 16px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            float: left;
            line-height: 22px;
          }
        }
        & > p:nth-of-type(2) {
          margin-top: 16px;
        }
        & > .commonTagP {
          height: 20px;
          margin-bottom: 8px;
          & > span {
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
          }
          & > span:nth-of-type(1) {
            color: #666666;
            margin-right: 22px;
            float: left;
          }
          & > span:nth-of-type(2) {
            color: #333333;
            width: 249px;
            // display: inline-block;
          }
          &:nth-last-of-type(1) {
            margin-bottom: 0px;
            & > span:nth-of-type(1) {
              margin-right: 8px;
            }
            & > span:nth-of-type(2) {
              color: #ed1a23;
            }
          }
        }
      }
      .bottomTips {
        display: flex;
        justify-content: center;
        font-size: 12px;
        font-weight: 500;
        padding-bottom: 90px;
        color: rgba(176, 176, 176, 1);
        line-height: 17px;
        margin-top: 8px;
      }
    }
  }

  & > .bottomBar {
    position: fixed;
    width: 100%;
    height: 86px;
    left: 0;
    bottom: 0;
    & > .tips {
      height: 17px;
      width: calc(100% - 24px);
      background: #fff8e6;
      padding: 8px 0px 8px 24px;
      & > p {
        width: 300px;
        height: 18px;
        float: left;
        font-size: 12px;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
      }
      & > .playCheckBox {
        width: 14px;
        height: 14px;
        float: left;
        margin-top: 1px;
        overflow: hidden;
        margin-right: 6px;
        position: relative;
        input[type="checkbox"] {
          display: none;
        }
        input[type="checkbox"] + label::before {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          margin-right: 8px;
          background: url("../../assets/imgs/noSelect.svg");
          background-size: 100% 100%;
          content: "";
          left: 0;
          top: 0;
          position: absolute;
        }
        input[type="checkbox"]:checked + label::before {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          margin-right: 8px;
          content: "";
          left: 0;
          top: 0;
          position: absolute;
          background: url("../../assets/imgs/selected.svg");
          background-size: 100% 100%;
        }
      }
    }

    & > .payBtns {
      display: flex;
      align-items: center;
      & > .firstP {
        width: 171px;
        padding-left: 24px;
        height: 53px;
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px -1px 0px 0px rgba(240, 240, 240, 1);
        & > .playCheckBox {
          margin-right: 8px;
        }
        & > span {
          font-size: 16px;
        }
      }
      & > .submitP {
        border: none;
        width: 180px;
        height: 53px;
        text-align: center;
        line-height: 53px;
        font-weight: 600;
        color: #ffffff;
        font-size: 16px;
        background: linear-gradient(
          135deg,
          rgba(243, 93, 46, 1) 0%,
          rgba(237, 26, 35, 1) 100%
        );
      }
      .darkBtn {
        background: #b0b0b0;
      }
    }
  }
}
//联系人列表样式
.linkManListBox {
  width: 375px;
  height: 550px;
  overflow: hidden;
  & > .content {
    & > li {
      padding: 0 17px 0px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;
      & > p {
        padding: 12px 0;
        & > span {
          display: block;
          height: 20px;
          font-size: 14px;
          color: #333333;
          line-height: 20px;
        }
        .mtop4px {
          margin-top: 4px;
          color: #666666;
        }
      }
      .icon-xiugai {
        font-size: 30px;
      }
    }
    .activeLinkManStyle {
      & > span {
        color: #2069e5 !important;
      }
    }
  }
}
.popupPage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .noLinkManBox {
    margin-top: 30%;
    & > p {
      font-size: 14px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
    }
  }
  .btmBar {
    width: 100%;
    height: 44px;
    position: fixed;
    bottom: 0;
    padding: 16px 0;
    background: #ffffff;
    text-align: center;
    & > button {
      border: none;
      padding: 11px 100px;
      border-radius: 22px;
      border: 1px solid rgba(32, 105, 229, 1);
      background: #ffffff;
      font-size: 16px;
      font-weight: 600;
      color: rgba(32, 105, 229, 1);
      line-height: 22px;
    }
  }
  .playerBar {
    & > button {
      border: none;
      width: 156px;
      height: 42px;
      padding: 0;
      border-radius: 22px;
      border: 1px solid rgba(32, 105, 229, 1);
      background: #ffffff;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      color: rgba(32, 105, 229, 1);
      line-height: 22px;
      &:nth-of-type(1) {
        margin-right: 15px;
      }
    }
  }
}

//弹窗样式
.vux-popup-dialog {
  height: 386px;
  width: 100%;
  background: #ffffff !important;
  border-radius: 12px 12px 0px 0px;
}
.PopupTop {
  width: 375px;
  height: 46px;
  border-bottom: 1px solid #e5e5e5;
  background: rgba(250, 250, 250, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > p {
    font-size: 16px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
    margin-left: 12px;
  }
  & > span {
    font-size: 14px;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
    margin-right: 12px;
  }
}
.popupContent {
  & > li {
    margin-left: 34px;
    margin-right: 16px;
    list-style-image: url("../../assets/imgs/point.svg");
    margin-bottom: 16px;
    & > h3 {
      height: 22px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
    }
    & > p {
      font-size: 14px;
      margin-top: 8px;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      line-height: 22px;
      & > span {
        font-size: 14px;
        color: #2069e5;
      }
    }
  }
  & > li:nth-child(1) {
    margin-top: 20px;
  }
}
</style>

