<template>
    <div class="ticketsPdfPage">
        <div class="ticketBox ticketWarpper" ref="ticketWarpper">
            <div class="titleTop"><span>报考级别</span><span>{{examLevels}}</span></div>
            <ul class="content">
                <li v-for="(item,index) in ticketList" :key="index">
                    <input type="checkbox" :id='item.chessPlayerId' :value="item" v-model="checkList" @change="selectCurrentTicket(item,index)">
                    <label  :for='item.chessPlayerId'></label>
                    <span>{{item.playerName}}的准考证.pdf</span>
                    <button @click="downTickets(item)">打开</button>
                </li>    
            </ul>
        </div>
        <div class="ssss">
        <div id="pdfDom">
            <div  class="ticketDetails">
                <div class="titleTop">
                    <div>准考证</div>
                    <p>2019年中国围棋协会段级位标准化考试</p>
                </div>
                <div class="examerInfo">
                    <div class="lf">
                        <p>姓　　名:<span>{{playerName}}</span></p>
                        <p>性　　别:<span>{{gender === 0?'男':'女'}}</span> 证件类型:<span  v-if="certificateType===1" style="color:#000;margin-left:20px;">身份证</span></p>
                        <p><i class="threeLetter">证件号</i>:<span>{{certificateNo}}</span></p>
                        <p>报考等级:<span>{{leveNames}}</span></p>
                        <p>准考证号:<span>{{examPermitNo}}</span></p>
                        <p>考试时间:<span>{{examTime}}</span></p>
                        <p>考试地点:<span>{{address}}</span></p>
                    </div>
                    <div id="qrcode">

                    </div>
                </div>
                <div class="testInstructions">
                    <h3>考试须知:</h3>
                    <p>1、 考试可提前15分钟到场；迟到10分，考试资格作废，需重新报名。</p>
                    <p>2、 考试座位:无固定座位号，无人座位均可使用。</p>
                    <p>3、 考试流程</p>
                        <li>(1) 找到座位</li>
                        <li>(2) 确定考试设备开机</li>
                        <li>(3) 准考证二维码对准镜头，进行身份认证</li>
                        <li>(4) 扫码成功，开始答题</li>
                        <!-- <div id="examSteps">
                            <el-steps align-center>
                            <el-step   description="找到座位"></el-step>
                            <el-step   description="确认设备开机"></el-step>
                            <el-step   description="准考证二维码扫描"></el-step>
                            <el-step   description="答题"></el-step>
                            </el-steps>
                        </div> -->
                    <p>4、 现场除考试题相关问题，均可咨询监考老师。</p>
                </div>
            </div>
        </div>
        </div>
        <!-- 底部btn -->
        <div class="pageBottom">
            <p class="checkBtn">
               <input type="checkbox" id="selectAll"  v-model="allChoose" @click="selectCurrentAll">
               <label class="lab" for='selectAll'></label>
               <span>全选</span>
            </p>
            <p class="emailBtn" @click="emailBtn">
              发送到邮箱
            </p>
        </div>  
    </div>
</template>

<script>
import Bscroll from "better-scroll";
import QRcode from "qrcodejs2";
export default {
  data() {
    return {
      ticketList: [],
      checkList: [],
      allChoose: false,
      examLevels: "",
      htmlTitle: "",
      playerName: "",
      gender: "",
      certificateType: "",
      certificateNo: "",
      examTime: "",
      leveNames: "",
      address: "",
      examPermitNo: ""
    };
  },
  methods: {
    selectCurrentTicket(item, index) {
      if (this.checkList.length === this.ticketList.length) {
        this.allChoose = true;
      } else {
        this.allChoose = false;
      }
    },
    selectCurrentAll() {
      this.allChoose = !this.allChoose;
      if (this.allChoose) {
        this.checkList = this.ticketList;
      } else {
        this.checkList = [];
      }
    },
    //生成二维码
    getQrCode(val) {
      let qrcode = new QRcode("qrcode", {
        width: 180,
        height: 180, // 高度
        text: val // 二维码内容
      });
    },
    downTickets(item) {
      console.log(item, "item");
      // alert('aaa')
      this.htmlTitle = item.playerName + "的准考证";
      this.playerName = item.playerName;
      this.gender = item.gender;
      this.certificateType = item.certificateType;
      this.certificateNo = item.certificateNo;
      this.leveNames = item.leveNames;
      this.address = item.address;
      this.examPermitNo = item.examPermitNo;
      this.getQrCode(item.examPermitNo);
      this.examTime = this.formatDate(item.examTime, "YYYY-MM-DD hh:mm");
      setTimeout(() => {
        this.getPdf("#pdfDom");
      }, 2000);
    },
    emailBtn() {
      alert("功能开发中");
    },
    initScrollBox() {
      if (
        this.ticketList !== undefined &&
        this.ticketList !== null &&
        this.ticketList.length > 0
      ) {
        let totalHeight = 52 * this.ticketList.lenght;
        // console.log(totalHeight,'00')
        if (totalHeight <= 539) {
          this.$refs.ticketWarpper.style.heigth = totalHeight + "px";
          // console.log(this.$refs.ticketWarpper.style.heigth,'123')
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new Bscroll(this.$refs.ticketWarpper, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        } else {
          this.$refs.ticketWarpper.style.heigth = "539px";
          console.log(this.$refs.ticketWarpper.style.heigth, "321");
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new Bscroll(this.$refs.ticketWarpper, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
      }
    }
  },
  created() {
    this.examLevels = JSON.parse(
      sessionStorage.getItem("ticketsDetails")
    ).examLevels;
    this.ticketList = JSON.parse(
      sessionStorage.getItem("ticketsDetails")
    ).playerList;
    this.$nextTick(() => {
      this.initScrollBox();
    });
  }
};
</script>

<style lang='scss' scoped>
@import "../../style/mixin.scss";
.ticketsPdfPage {
  width: 100%;
  height: calc(100% -12px);
  padding-top: 12px;
  background: $bg-color;
  .ticketWarpper {
  }
  & > .ticketBox {
    width: 359px;
    overflow: hidden;
    // height: 539px;
    margin: 0 auto;
    background: $bg-color;
    // background: red;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
    border-radius: 14px;
    & > .titleTop {
      height: 54px;
      width: 100%;
      line-height: 54px;
      background: #ffffff;
      & > span {
        font-size: 16px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        &:first-child {
          margin-left: 16px;
          margin-right: 12px;
        }
      }
    }
    & > .content {
      width: 100%;
      & > li {
        width: 327px;
        background: rgba(255, 255, 255, 1);
        height: 19px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        border-top: 1px solid #e5e5e5;
        & > span {
          font-size: 14px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
          margin-left: -99px;
        }
        & > button {
          outline: none;
          border: none;
          background: #ffffff;
          border-radius: 14px;
          font-size: 14px;
          line-height: 20px;
          padding: 4px 16px;
          color: rgba(32, 105, 229, 1);
          border: 1px solid rgba(32, 105, 229, 1);
        }
        input[type="checkbox"] {
          display: none;
        }
        input[type="checkbox"] + label::before {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: url("../../assets/imgs/noSelect.svg");
          background-size: 100% 100%;
          content: "";
          left: 16px;
          top: 16px;
          position: absolute;
        }
        input[type="checkbox"]:checked + label::before {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          content: "";
          left: 16px;
          top: 16px;
          position: absolute;
          background: url("../../assets/imgs/selected.svg");
          background-size: 100% 100%;
        }
      }
    }
  }
  .ssss {
    width: 100%;
    height: 0;
    overflow: hidden;
    & > #pdfDom {
      width: 820px;
      height: 1150px;
    }
  }
  //   /* 布局纵向 */
  //   .a4-endwise{
  //       width: 1150px;
  //       height: 1627px;
  //       border: 1px #000 solid;
  //   }
  //   /* 布局横向 */
  //   .a4-broadwise{
  //       width: 1627px;
  //       height: 1149px;
  //       border: 1px #000 solid;
  //   }
  .ticketDetails {
    width: 800px;
    height: 1148px;
    margin: 0 auto;
    border: 1px solid #000;
    background: #ffffff;
    .titleTop {
      width: 100%;
      height: calc(14.4% - 55px);
      padding: 17px 0 38px;
      & > div {
        width: 20%;
        height: 80px;
        line-height: 80px;
        background: #000;
        font-size: 34px;
        color: #ffffff;
        text-align: center;
        float: left;
        margin-left: 4.5%;
      }
      & > p {
        font-size: 29px;
        width: 34%;
        float: left;
        margin-left: 2%;
        line-height: 41px;
      }
    }
    .examerInfo {
      width: 100%;
      height: 38.5%;
      background: #e5e5e5;
      & > .lf {
        width: 55.3%;
        height: calc(100% -40px);
        margin-left: 5.15%;
        padding: 20px 0;
        float: left;
        & > p {
          width: 100%;
          font-size: 20px;
          height: 48px;
          color: #666;
          line-height: 48px;
          & > span:nth-of-type(1) {
            color: #000000;
            margin-left: 26px;
          }
          .threeLetter {
            font-style: normal;
            letter-spacing: 9px;
            margin-right: -9px;
          }

          &:nth-of-type(2) {
            & > span:nth-of-type(1) {
              margin-right: 20px;
            }
          }
        }
      }
        #qrcode{
            width: 180px;
            height: 180px;
            float: left;
            margin-top: 14%;
            &>img{
                width: 100%;
                height: 100%;
                border: none;
            }
        }
    }
    .testInstructions {
      width: calc(100% -82px);
      height: calc(45.6% - 44px);
      padding: 22px 41px;
      & > h3 {
        width: 100%;
        height: 44px;
        line-height: 44px;
        font-size: 20px;
      }
      & > p {
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #838383;
      }
      li {
        width: calc(100% - 20px);
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #838383;
        list-style: none;
        padding-left: 20px;
        &:nth-of-type(4) {
          margin-bottom: 20px;
        }
      }
      #examSteps {
        width: calc(100% -20px);
        padding-left: 20px;
        & /deep/ .el-step__line {
          background-color: #838383;
        }
        & /deep/ .el-step__head.is-wait {
          color: #838383;
          border-color: #838383;
        }
        & /deep/ .el-step.is-center .el-step__description {
          padding-top: 15px;
          color: #838383;
        }
      }
    }
  }

  //底部按钮
  & > .pageBottom {
    width: 100%;
    height: 52px;
    position: fixed;
    left: 0;
    bottom: 0;
    & > .checkBtn {
      width: 195px;
      height: 52px;
      line-height: 1;
      float: left;
      position: relative;
      background: #ffffff;
      & > span {
        position: absolute;
        left: 40px;
        top: 21px;
      }
      input[type="checkbox"] + label::before {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: url("../../assets/imgs/noSelect.svg");
        background-size: cover;
        content: "";
        left: 16px;
        top: 16px;
        position: absolute;
      }
      input[type="checkbox"]:checked + label::before {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        content: "";
        left: 16px;
        top: 16px;
        position: absolute;
        background: url("../../assets/imgs/selected.svg");
        background-size: cover;
      }
    }

    & > .emailBtn {
      width: 180px;
      height: 52px;
      font-size: 16px;
      float: left;
      text-align: center;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 52px;
      background: linear-gradient(
        135deg,
        rgba(243, 93, 46, 1) 0%,
        rgba(237, 26, 35, 1) 100%
      );
    }
  }
}
</style>
