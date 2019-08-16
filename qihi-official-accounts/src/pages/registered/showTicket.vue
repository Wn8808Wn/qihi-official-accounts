<template>
    <div class="showTicketPage">
        <div class="ticketImg">
            <div id="pdfDom" >
                <div  class="ticketDetails">
                    <div class="titleTop">
                        <div>准考证</div>
                        <p>2019年中国围棋协会段级位标准化考试</p>
                    </div>
                    <div class="examerInfo">
                        <div class="lf">
                            <p>姓　　名:<span>{{playerName}}</span></p>
                           <p>性　　别:<span v-if="gender == 1">男</span>
                               <span v-if="gender == 2">女</span>
                               <span v-if="gender == 9">未知</span>
                                <span v-if="gender == undefined">未知</span>
                            证件类型:<span  v-if="certificateType == 1" style="color:#000;margin-left:20px;">身份证</span></p>
                            <p><i class="threeLetter">证件号</i>:<span>{{certificateNo}}</span></p>
                            <p>报考等级:<span>{{leveNames}}</span></p>
                            <p>准考证号:<span>{{examPermitNo}}</span></p>
                            <p>考试时间:<span>{{examTime}}</span></p>
                            <p>考试地点:<span>{{address}}</span></p>
                        </div>
                        <div id="qrCode" ref="qrCode">

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
    </div>
</template>


<script>
import QRCode from 'qrcodejs2' 
export default {
  data() {
    return {
      dataURL: "",
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
    //生成二维码
    getQrCode(val) {
        this.$nextTick(()=>{  
            let qrcode = new QRCode(this.$refs.qrCode, {
            width: 180,
            height: 180, // 高度
            text: val // 二维码内容
            });
        })
    }
  },
  created() {
    console.log(this.$route, "ssss");
    let currentPdf = this.$route.query;
    this.playerName = currentPdf.playerName;
    this.htmlTitle = currentPdf.playerName + "的准考证";
    this.gender = currentPdf.gender;
    this.certificateType = currentPdf.certificateType;
    this.certificateNo = currentPdf.certificateNo;
    this.examTime = this.formatDate(currentPdf.examTime, "YYYY-MM-DD hh:mm");
    this.leveNames = currentPdf.leveNames;
    this.address = currentPdf.address;
    this.examPermitNo = currentPdf.examPermitNo;
    this.getQrCode(currentPdf.examPermitNo)
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
    } else {
        this.$nextTick(()=>{ 
            setTimeout(() => {
                this.getPdf("#pdfDom");
            }, 2000);
        })
    }
  }
};
</script>

<style  lang='scss' scoped>
.showTicketPage {
  width: 100%;
  height: 100%;
  background: url('../../assets/imgs/wxtip.jpg') no-repeat;
  background-size:  100% 100%;
  .ticketImg {
    width: 100%;
    height: 0;
    overflow: hidden;
    & > #pdfDom {
      width: 820px;
      height: 1150px;
      background: #ffffff;
    }
  }
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
      #qrCode {
        width: 180px;
        height: 180px;
        float: left;
        margin-top: 14%;
        & > img {
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
}
</style>
