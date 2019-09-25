<template>
    <div class="submitOrderPage">
        <appointmentInfo></appointmentInfo>
        <!-- 考场信息部分 -->
        <div class="commonBox" v-if="showExamInfo" style="margin-bottom:12px;">
            <h3>{{examRoomName}}</h3>
            <p>
                <span>考试级别</span>
                <span>{{examLevelTitle}}</span>
            </p>
            <p>
                <span>考试地点</span>
                <span>{{address}}</span>
            </p>
            <p>
                <span>考试时间</span>
                <span>{{time}}</span>
            </p>
            <p>
                <span>报名费用</span>
                <span class="redPrice">¥{{price}}/人</span>
            </p>
        </div>
        <!-- 选择联系人信息 -->
        <div class="linkManPart">
            <div class="seletLinkman bottomBorder">
                <p>联系人</p>  
                <p><span v-if="showDefLinkmanSpan" class="defaultSpan">默认</span> <span>{{linkManInfo}}</span> <i class="iconfont icon-youjiantou" @click="showLinkManPopupsPage"></i> </p>
            </div>
            <div class="seletLinkman">
                <p>发票信息</p> 
                <p><span v-if="false">[企业]</span> 
                <span v-if="receiptTitleType === 0">不开发票</span>
                <span v-if="receiptTitleType === 1">个人</span>
                <span v-if="receiptTitleType === 2">企业</span>
                <i class="iconfont icon-youjiantou" @click="showInvoicePage"></i></p> 
            </div>
        </div>  
        <!-- 选择棋手 -->
        <div class="showSelectPlayerList">
            <div class="selectChessPlayer commonBox">
                <span>已选择{{this.checkList.length}}人</span>
                <p @click="showPlayerPopups">选择棋手</p>
            </div>    
            <!-- 报名棋手选择列表 -->
            <div class="swipeBoxWarper" ref="swipeWarper">
                <swipeout class="content" >
                    <div  class="swipeBox"  v-for="(item,index) in checkList" :key="index">
                        <div class="iBox"><i class="iconfont icon-shanchu" :class="index === activeId && btnActive === 1?'activeTs':'deactiveTs'"></i></div>
                            <swipeout-item @on-close="handleOpen(index)" @on-open="handleClose(index)" transition-mode="follow"  >
                                <div slot="right-menu">
                                    <swipeout-button @click.native="onButtonClick(item)" type="primary">删除</swipeout-button>
                                </div>
                                <div slot="content">
                                    <div class="infoBox">
                                        <p><span>棋手姓名</span> <span>{{item.playerName}}</span></p>
                                        <p><span>段位等级</span>
                                        <span>{{examLevelList.filter( item1 => item1.id == item.chessLevel)[0].levelName}}</span>
                                        </p>
                                        <p><span>证件号码</span> <span>{{item.certificateNo}}</span></p>
                                    </div>
                                </div>
                            </swipeout-item>
                    </div>
                </swipeout>
              
            </div>
        </div>

        <!-- 底部bar -->
        <div class="fixedBox" style="z-index:1">
            <p><span>报名费:</span> <i>¥</i><span>{{totalPrice}}</span></p>
            <button @click="submitOrder" :class="{'allowClick':disabled === false}" :disabled="disabled" >
                提交订单
            </button>
        </div>
        <!-- 发票弹层部分 -->
         <div v-transfer-dom class="invoicePop">
            <popup v-model="showInvoice"   position='bottom'>
              <div class="popupPage">
                <div class="PopupTop">
                    <p>发票</p>
                    <span @click="cancleInvoicBtn">取消</span>
                </div>
                <p class="tipsPush">发票须知</p>
                <!-- 发票内容部分 -->
                <div class="invoiceContent">
                    <div class="invoicetype">
                      <h3>发票类型</h3>
                      <span>电子普通发票</span>
                    </div>
                    <div class="invoicetype">
                      <h3>发票抬头</h3>
                      <p>
                      <span @click="noOpen" :class="{'activeBtn':activeIndex == 0}">不开发票</span>
                      <span @click="showPerson" :class="{'activeBtn':activeIndex == 1}">个人</span>
                      <span @click="showCompany" :class="{'activeBtn':activeIndex == 2}">企业</span>
                      </p>
                    </div>
                    <div class="invoicetype" v-if="showCompanyInfo">
                      <div><span style="display:inline-block;width:84px;">单位名称</span><input type="text" v-model="receiptTitle" placeholder='请填写单位名称'></div>
                      <div><span>纳税人识别号</span><input type="text" v-model="taxFileNo" placeholder='请填写纳税人识别号'></div>
                    </div>
                    <div class="invoicetype">
                      <h3>收票人信息</h3>
                      <div><span>收票人邮箱</span><input type="text" v-model="email" placeholder='请填写收票人邮箱'></div>
                    </div>
                    <div class="invoiceBtn">
                      <button @click="sureBtn">确定</button>
                    </div>
                </div>
              </div>
            </popup>
        </div>
        <!-- 点击联系人弹层 -->
        <div v-transfer-dom>
            <popup v-model="showLinkMan"  height='100%' position='bottom'>
              <div class="popupPage">
                <div class="PopupTop">
                    <p>选择联系人</p>
                    <span @click="cancleLinkmanBtn">取消</span>
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
        <!-- 点击选择棋手弹层 -->
        <div v-transfer-dom>
            <popup v-model="showPlayer" height='100%' position='bottom'>
                <div class="popupPage">
                    <div class="PopupTop">
                        <p>选择棋手</p>
                        <span @click="canclePlayerBtn">取消</span>
                    </div>
                    <!-- 有棋手展示 -->
                    <scroll class="playerWrapper linkManListBox chessPlayerBox"  v-if='!noPlayer'>
                        <ul class="content">
                            <li v-for="(item,index) in playerList" :key="index">
                            <p :class="{activeLinkManStyle:currentPlayerId === index}">
                                <span>{{item.playerName}}</span>
                                <span class="mtop4px">{{item.certificateNo}}</span>
                                <span class="mtop4px">{{item.phone}}</span>
                                <span class="mtop4px">{{item.unitName}}</span>
                            </p>
                            <div>
                                <div class="playCheckBox">
                                    <input type="checkbox" :id='item.id' :value="item" v-model="checkList" @change="selectCurrentPlayer(item,index)">
                                    <label  :for='item.id'></label>
                                </div>
                            </div>
                        </li>
                        </ul>
                      
                    </scroll> 
                    <!-- 还没有棋手情况 -->
                    <div v-if="noPlayer" class="noLinkManBox">
                        <p>还没有创建棋手</p>
                    </div>
                    <div class="information commonQuestion" @click="showCommonQuestionPage">
                        <i class="iconfont icon-zhushi"></i><span>常见问题说明</span>
                    </div>
                    <div class="btmBar playerBar">
                        <button @click="addChessPlayer">新增棋手</button>
                        <button @click="confirmBtn">确定</button>
                    </div>
              </div>
            </popup>
        </div>
        <!-- 点击常见问题弹层 -->
        <div v-transfer-dom>
            <popup v-model="showCommonQuestion">
                <div class="popupPage">
                    <div class="PopupTop">
                        <p>常见问题说明</p>
                        <span @click="cancleCommonQuestionBtn">取消</span>
                    </div>
                    <ul class="popupContentImg">
                        <li>
                            <h3>常见问题一</h3>
                            <p><i></i>棋手会员注册地区与报名所选地区不符,如何在其他地区报名考试？</p>
                            <p><i class="imgA"></i>棋手可以在会员系统申请变更归属地，每年只能变更一次；</p>
                        </li>
                        <li>
                            <h3>常见问题二</h3>
                            <p><i></i>棋手不符合当前考试级别，如何才能跨级别考试？</p>
                            <p><i class="imgA"></i>棋手可以在会员系统申请跨级别考试；</p>
                        </li>

                        <li style="list-style:none">
                            <p style="color:#FF9201"><i class="imgB"></i>请到首页-会员系统根据信息提示完成申请操作</p>
                        </li>
                    </ul>
                    <div>

                    </div>
                </div>
            </popup>
        </div>
        <!-- 确认删除吗 -->
        <div v-transfer-dom class="delPlayers">
          <confirm v-model="showCofirm"
          @on-cancel="onCancel"
          @on-confirm="onConfirm"
          >
            <p style="text-align:center;">确认删除该棋手吗？</p>
          </confirm>
        </div>

    </div>
</template>

<script>
import Bscroll from "better-scroll";
import {
  PopupPicker,
  Group,
  TransferDom,
  Popup,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  Confirm
} from "vux";
import qs from "qs";
import appointmentInfo from "./popups/appointmentInfo.vue";
export default {
  directives: {
    TransferDom
  },
  components: {
    appointmentInfo,
    PopupPicker,
    Group,
    Popup,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Confirm
  },
  data() {
    return {
      showExamInfo: true,
      examRoomName: "",
      examLevelTitle: "",
      address: "",
      time: "",
      price: "",
      showPopup: false,
      showCommonQuestion: false,
      currentLinkManId: "",
      linkManInfo: "",
      currentPlayerId: "",
      showLinkMan: false,
      showPlayer: false,
      disabled: true,
      playerNum: 0,
      examLevelList: [],
      checkList: [],
      linkManList: [],
      playerList: [],
      activeId: null,
      btnActive: 1,
      showCofirm: false,
      linkManPhone: "",
      delCurrentplayerId: null,
      noLinkMan: false,
      noPlayer: false,
      receiptTitleType:0, //发票类型
      taxFileNo: "", //纳税人识别号，
      receiptTitle: "", // 发票抬头
      showInvoice: false, //展示发票，
      email: "", //收票人邮箱
      activeIndex: 0, // 控制按钮背景颜色
      showCompanyInfo: false,
      showDefLinkmanSpan: false
    };
  },
  computed: {
    totalPrice() {
      return this.checkList.length * this.price || "";
    }
  },
  methods: {
    //获取联系人列表
    getLinkManList() {
      let params = {};
      this.$axios.get("/api/linkman/list", { params }).then(res => {
        if (res.data.code === 0) {
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
    },
    addLinkMan() {
      this.$router.push({ name: "addLinkman" });
    },
    //获取棋手列表
    getPlayerList() {
      let provinceCode = JSON.parse(sessionStorage.getItem("currentItem")).provinceCode;
      let chessLevel = sessionStorage.getItem("examLevelId");
      let params = {
        provinceCode,
        chessLevel
      };
      this.$axios.get("/api/enter/choosePlayer", { params }).then(res => {
        if (res.data.code === 0) {
          this.playerList = res.data.data;
          if (this.playerList.length > 0) {
            this.noPlayer = false;
          } else {
            this.noPlayer = true;
          }
        }
      });
    },
    addChessPlayer() {
      this.$router.push({ name: "addPlayer" });
    },
    submitOrder() {
      // //提交前先看座位数够不够
      let params = {
        examPlanId: sessionStorage.getItem("examPlanId"),
        playerNum: this.playerNum
      };
      this.$axios.get("/api/enter/searchSeats", { params }).then(res => {
        // console.log(res.data);
        let that = this;
        if (res.data.code === 3) {
          //剩余座位数充足
          this.checkList.forEach((item, index) => {
            this.$set(item, "examFee", Number(this.price));
          });
          // console.log(that.checkList, "加上价格");
          //提交订单获取订单编号
          let params = {
            examPlanId: sessionStorage.getItem("examPlanId"),
            linkMan: this.linkManInfo,
            phone: this.linkManPhone,
            examLeve: sessionStorage.getItem("examLevelId"),
            totalFee: this.totalPrice,
            chessPlay: JSON.stringify(this.checkList),
            taxFileNo:this.taxFileNo,
            receiptTitle:this.receiptTitle,
            email:this.email,
            receiptTitleType:this.receiptTitleType === 0 ? '' :this.receiptTitleType
          };
          this.$axios.post("/api/enter/signUpOrder", qs.stringify(params)).then(res => {
              console.log(res, "获取订单编号");
              if (res.data.code === 0) {
                let obj = res.data.data;
                let routerObj = {
                  examRoomName:this.examRoomName,
                  address: this.address,
                  examLevelTitle: this.examLevelTitle,
                  examTime: this.time,
                  linkMan: this.linkManInfo,
                  totalPrice: this.totalPrice,
                  linkmanPhone: this.linkManPhone,
                  playerList:this.checkList,
                  unitPrice:this.totalPrice / this.checkList.length,
                  createdTime: obj.createdTime,
                  orderNo: obj.orderNo,
                  orderId: obj.id,
                  taxFileNo:this.taxFileNo,
                  receiptTitle:this.receiptTitle,
                  email:this.email,
                  receiptTitleType:this.receiptTitleType === 0 ? '' :this.receiptTitleType
                };
                sessionStorage.setItem("routerObj", JSON.stringify(routerObj));
                this.$router.push({ name: "orderDetails" });
              }
            });
        } else if (res.data.code === 2) {
          alert(res.data.msg); //剩余座位数不足
        } else {
          alert(res.data.msg); // 无剩余座位数
        }
      });
    },
    handleOpen(index) {
      this.btnActive = 0;
    },
    handleClose(index) {
      this.btnActive = 1;
      this.activeId = index;
    },
    onButtonClick(item) {
      // console.log(item);
      this.showCofirm = true;
      this.delCurrentplayerId = item.id;
    },
    //取消开发票
    cancleInvoicBtn() {
      this.showInvoice = false;
      this.clearOldDate();
      this.receiptTitleType = 0;
      this.activeIndex = 0;
    },
    showInvoicePage() {
      this.showInvoice = true;
    },
    clearOldDate() {
      if (this.email !== "") {
        this.email = "";
      }
      if (this.receiptTitle !== "") {
        this.receiptTitle = "";
      }
      if (this.taxFileNo !== "") {
        this.taxFileNo = "";
      }
    },
    sureBtn() {
      if(this.receiptTitleType === 0){
          this.cancleInvoicBtn();
      }
      if(this.receiptTitleType === 1){
          //正则判断
          
      }
      if(this.receiptTitleType === 2){
          //正则判断
          
      }
      this.showInvoice = false;
    },
    noOpen(){
      this.activeIndex = 0;
      this.showCompanyInfo = false;
      this.receiptTitleType = 0 ;
      this.clearOldDate()
    },
    showPerson() {
      this.showCompanyInfo = false;
      this.activeIndex = 1;
      this.receiptTitleType = 1;
      this.clearOldDate();
    },
    showCompany() {
      this.showCompanyInfo = true;
      this.activeIndex = 2;
      this.receiptTitleType = 2;
      this.clearOldDate();
    },
    showLinkManPopupsPage() {
      this.showLinkMan = true;
    },
    cancleCommonQuestionBtn() {
      this.showCommonQuestion = false;
    },
    cancleLinkmanBtn() {
      this.showLinkMan = false;
    },
    canclePlayerBtn() {
      this.showPlayer = false;
      this.checkList = [];
    },
    selectCurrentLinkMan(item, index) {
      this.currentLinkManId = index;
      this.linkManInfo = item.linkman;
      this.linkManPhone = item.phone;
      if (item.isDef == 0) {
        this.showDefLinkmanSpan = true;
      } else {
        this.showDefLinkmanSpan = false;
      }
      // console.log(this.linkManPhone, 11);
      setTimeout(() => {
        this.showLinkMan = false;
        this.currentLinkManId = "";
      }, 400);
    },
    showPlayerPopups() {
      this.showPlayer = true;
      this.getPlayerList();
    },
    selectCurrentPlayer(item) {
      console.log(this.checkList, "cheasd");
    },
    showCommonQuestionPage() {
      this.showCommonQuestion = true;
    },
    confirmBtn() {
      this.showPlayer = false;
      this.showExamInfo = false;
      this.playerNum = this.checkList.length;
      if (this.checkList.length == 0) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      // console.log(this.checkList,'checkList')
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new Bscroll(this.$refs.swipeWarper, { click: true });
        } else {
          this.scroll.refresh();
        }
      });
    },
    onCancel() {
      this.showCofirm = false;
    },
    onConfirm() {
      // console.log(this.checkList,'000')
      this.checkList = this.checkList.filter(
        (item, index) => item.id !== this.delCurrentplayerId
      );
      if (this.checkList.length === 0) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new Bscroll(this.$refs.swipeWarper, { click: true });
        } else {
          this.scroll.refresh();
        }
      });
    }
  },
  mounted() {
    //缓存方式
    this.examLevelTitle = sessionStorage.getItem("examLevelTitle");
    this.examRoomName = JSON.parse(sessionStorage.getItem("currentItem")).examRoomName;
    this.address = JSON.parse(sessionStorage.getItem("currentItem")).address;
    this.time = sessionStorage.getItem("examTime");
    this.price = sessionStorage.getItem("price");
    this.examLevelList = JSON.parse(sessionStorage.getItem("examLevelList"));
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.swipeWarper, { click: true });
    });
  },
  created() {
    this.getLinkManList();
  }
};
</script>

<style lang='scss' scoped>
@import "../../style/mixin.scss";
.submitOrderPage {
  width: 375px;
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: column;
  background: #f4f4f4;
  & > .commonBox {
    & > p {
      height: 20px;
      .redPrice {
        font-weight: 600;
        color: #ed1a23;
      }
    }
  }
  & > .linkManPart {
    width: 359px;
    height: 104px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
    border-radius: 14px;
    // overflow: hidden;
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
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
        & > span {
          color: #333333;
        }
        .defaultSpan {
          font-size: 12px;
          padding: 0px 6px;
          color: rgba(255, 255, 255, 1);
          line-height: 20px;
          display: inline-block;
          height: 100%;
          vertical-align: middle;
          background: rgba(32, 105, 229, 1);
          border-radius: 10px;
        }
      }
    }
  }
  & > .showSelectPlayerList {
    width: 359px;
    margin-top: 12px;
    border: none;
    border-radius: 14px;
    overflow: hidden;
    & > .selectChessPlayer {
      height: 20px;
      display: flex;
      border-radius: 14px 14px 0 0;
      justify-content: space-between;
      & > span {
        font-size: 14px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
      }
      & > p {
        font-size: 16px;
        color: rgba(32, 105, 229, 1);
        line-height: 22px;
      }
    }
    .swipeBoxWarper {
      width: 100%;
      height: 410px;
      overflow: hidden;
      & > .content {
        & /deep/.swipeBox {
          width: 100%;
          height: 104px;
          overflow: hidden;
          position: relative;
          border-top: 1px solid #e5e5e5;
          & > .iBox {
            display: block;
            width: 48px;
            height: 104px;
            background: #ffffff;
            position: absolute;
            left: 0px;
            top: 0px;
            text-align: center;
            line-height: 104px;
            z-index: 2;
            & > i {
              font-size: 20px;
              color: rgba(32, 105, 229, 1);
            }
            .activeTs {
              display: block;
              transform: rotateZ(0deg);
              transition: all 500ms;
            }
            .deactiveTs {
              display: block;
              transform: rotateZ(90deg);
              transition: all 500ms;
            }
          }
        }
        // swiperOut 样式
        & /deep/.vux-swipeout-content {
          & > div {
            display: flex;
            align-items: center;
            padding: 16px;
            & > .infoBox {
              // background: #2069e5;
              padding-left: 34px;
              & > p {
                margin-bottom: 8px;
                &:last-child {
                  margin-bottom: 0px;
                }
                & > span {
                  font-size: 14px;
                  font-family: PingFang-SC-Medium;
                  font-weight: 500;
                  color: #666666;
                  line-height: 20px;
                  &:nth-of-type(1) {
                    color: #333333;
                    margin-right: 12px;
                  }
                }
              }
            }
          }
        }
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

.linkmanWrapper {
  width: 100%;
  height: 550px;
  overflow: hidden;
}
.playerWrapper {
  width: 100%;
  height: 518px;
  overflow: hidden;
}
.linkManListBox {
  width: 375px;
  & > ul {
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
      & > div {
        display: flex;
        align-items: center;
        & > .playCheckBox {
          width: 20px;
          height: 20px;
          overflow: hidden;
          position: relative;
          margin-right: 10px; // 删除icon 调整偏移量
          input[type="checkbox"] {
            display: none;
          }
          input[type="checkbox"] + label::before {
            width: 20px;
            height: 20px;
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
            width: 20px;
            height: 20px;
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
    }
    .activeLinkManStyle {
      & > span {
        color: #2069e5 !important;
      }
    }
  }
}
.chessPlayerBox {
  width: 375px;
  & > li {
    padding: 0 24px 0px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // border-bottom: 1px solid #e5e5e5;
    & > div {
      & > i {
        margin-right: 22px;
      }
    }
  }
}

.information {
  width: 375px;
  height: 34px;
  display: flex;
  align-items: center;
  background: rgba(255, 248, 230, 1);
  margin-bottom: 12px;
  & > i {
    font-size: 14px;
    margin-left: 24px;
    margin-right: 8px;
  }
  & > span {
    font-size: 12px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 17px;
  }
}

// 弹层的Q A 图标样式
.commonQuestion {
  margin-bottom: 0;
  position: fixed;
  bottom: 76px;
}
.popupContentImg {
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
      position: relative;
      padding-left: 6px;
      color: rgba(102, 102, 102, 1);
      line-height: 22px;
      & > i {
        width: 14px;
        height: 14px;
        position: absolute;
        left: -17px;
        top: 4px;
        background: url("../../assets/imgs/Q.svg") no-repeat;
      }
      .imgA {
        background: url("../../assets/imgs/A.svg") no-repeat;
      }
      .imgB {
        background: url("../../assets/imgs/ling.svg") no-repeat;
      }
    }
    & > p:nth-of-type(2) {
      margin-top: 4px;
    }
  }
  & > li:nth-child(1) {
    margin-top: 20px;
  }
  & > li:nth-child(2) {
    margin-bottom: 20px;
  }
}
.tipsPush {
  width: calc(100% -16px);
  height: 30px;
  font-size: 12px;
  color: #333;
  padding-left: 16px;
  line-height: 30px;
  background: #fff8e6;
}
.invoiceContent {
  width: calc(100% - 32px);
  height: calc(100% - 32px);
  padding: 16px;
  .invoicetype {
    // background: salmon;
    width: 100%;
    height: 100%;
    margin-bottom: 12px;
    & > h3 {
      font-size: 16px;
      color: #000;
      height: 20px;
      line-height: 20px;
      margin-bottom: 12px;
    }
    & > span {
      padding: 4px 12px;
      text-align: center;
      border: 1px solid #2069e5;
      font-size: 14px;
      display: inline-block;
      color: #2069e5;
      margin-left: 12px;
      border-radius: 14px;
    }
    & > p {
      width: 100%;
      display: flex;
      justify-content: space-around;
      & > span {
        padding: 4px 25px;
        text-align: center;
        border: 1px solid #2069e5;
        // background: #F4F4F4;
        font-size: 14px;
        color: #2069e5;
        border-radius: 14px;
      }
      .activeBtn {
        background: #2069e5;
        color: #ffffff;
      }
    }
    & > div {
      width: 100%;
      height: 22px;
      line-height: 22px;
      margin-top: 8px;
      display: flex;
      align-items: center;
      & > span {
        font-size: 14px;
        color: #333;
        margin-right: 10px;
      }
      & > input {
        border: none;
        font-size: 14px;
        color: #666;
        padding: 0;
        // vertical-align: middle;
      }
    }
  }
  .invoiceBtn {
    width: 100%;
    height: 44px;
    margin-top: 20px;
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
}
</style>
