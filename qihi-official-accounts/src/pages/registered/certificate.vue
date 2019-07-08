<template>
    <div class="certificatePage">
        <div class="headerTop" @click="showPopupPage">
            <i class="iconfont icon-zhushi"></i><span>申领说明</span>
        </div>
        <div v-transfer-dom>
            <popup v-model="showPopup" @on-hide="log('hide')" @on-show="log('show')">
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
        <!-- 列表渲染 -->
        <div class="listBox">
            <div v-for="(item,index) in certificateList" :key="index">
              <p>
                <span class="firstSpan">{{item.playerName}}</span>
                <span>{{item.certificateNo}}</span>
                <span class="playCheckBox">
                    <input type="checkbox" :id='item.id' :value="item" v-model="checkList" @change="selectCurrentPlayer(item,index)">
                    <label  :for='item.id'></label>
                </span>
              </p>
               <p class="commonTagP">
                <span>电话号码</span>
                <span>{{item.phone}}</span>
              </p>
              <p class="commonTagP">
                <span>考试级别</span>
                <span>{{item.leveNames}}</span>
              </p>
              <p class="commonTagP">
                <span>考试结果</span>
                <span v-if="item.examResult === 0">考试通过</span>
                <span v-if="item.examResult === 1">考试未通过</span>
              </p>
              <p class="commonTagP">
                <span>认证服务费</span><span>¥ {{item.examFee}}</span>
              </p>
             
          </div>
          <p class="bottomBar">
              已加载全部
          </p>
        </div>
        <div class="bottomBar">
          <div class="tips">
            <i class="iconfont icon-zhushi"></i>
            <p>通过考试的棋手请在2019年02月06日23:59:00前完成证 书申领，否则认证资格将作废。</p>
          </div>
          <div class="payBtns">
              <p class="firstP">
                <span class="playCheckBox">
                    <input type="checkbox" id='checkAll' v-model="allChoose"  @click="selectAll">
                    <label  for='checkAll'></label>
                </span>
                <span>全选</span><span style="color:#ED1A23;margin-left:4px;font-weight:600;font-size:18px;">¥ {{totalPrice}}</span>
              </p>
              <button class="submitP" :disabled ="disabled" :class="{'deactiveBtn':disabled === true}" @click="hanleApply">证书申领</button>
          </div>
        </div>

    </div>
</template>

<script>
import { TransferDom, Popup, CheckIcon } from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    CheckIcon
  },
  data() {
    return {
      showPopup: false,
      currentIndex:0,
      checkList:[],
      allChoose:false,
      disabled:true,
      certificateList: [],
    }
  },
  computed:{
      totalPrice(){
        let total = 0;
        this.checkList.forEach( item => {
            total+=item.examFee
        });
        return total;
      }
  },
  methods: {
    showPopupPage() {
      this.showPopup = true;
    },
    log() {},
    cancleBtn() {
      this.showPopup = false;
    },
    selectCurrentPlayer(item,index){
      this.disabled = false;
      if(this.checkList.length === this.certificateList.length){
          this.allChoose = true;
      }else{
        this.allChoose = false;
      }
    },
    //全选按钮
    selectAll(){
      this.allChoose = !this.allChoose;
      if(this.allChoose){
        this.checkList = this.certificateList;
        this.disabled = false;
      }else{
        this.checkList =[];
        this.disabled = true;
      }
    },
    hanleApply(){
      console.log(this.checkList,'list1111')
      this.$router.push({name:'certificateDetails',query:{"checkList":JSON.stringify(this.checkList)}})
    }
  },
  created() {
    let examPlanId = this.$route.query.examPlanId;
    let examLevel = this.$route.query.examLevel;
    let orderNo = this.$route.query.orderNo;
    // console.log(examPlanId,'adsasd')
    let params = {
      examPlanId,
      examLevel,
      orderNo
    };
    this.$axios.get("/api/enroll/certificateApply", { params }).then(res => {
      if (res.data.code === 0) {
        console.log(res.data.data,'???')
        this.certificateList = res.data.data;
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

  & > .listBox {
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    align-items: center;
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
        &>.playCheckBox{
            float: right;
        }
      }
      & > p:nth-of-type(2) {
        margin-top: 16px;
      }
      &>.commonTagP {
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
          &>span:nth-of-type(1) {
            margin-right: 8px;
          }
          &>span:nth-of-type(2) {
            color: #ED1A23;
          }
        }
      }
    }
    .bottomBar {
      display: flex;
      justify-content: center;
      font-size: 12px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(176, 176, 176, 1);
      line-height: 17px;
      margin-top: 8px;
    }
  }

  &>.bottomBar{
    position: fixed;
    width: 100%;
    height: 105px;
    left: 0;
    bottom: 0;
    background: salmon;
    &>.tips{
      height: 36px;
      width: calc(100% - 54px);
      background: #FFF8E6;
      padding: 8px 31px 8px  24px;
      &>i{
        font-size: 13px;
        float: left;
        margin-right: 8px;
        margin-top: 4px;
      }
      &>p{
        width:300px;
        height:18px;
        float: left;
        font-size:12px;
        color:rgba(51,51,51,1);
        line-height:18px;
      }
    }
    &>.payBtns{
      display: flex;
      align-items: center;
      &>.firstP{
        width:171px;
        padding-left: 24px;
        height:53px;
        display: flex;
        align-items: center;
        background:rgba(255,255,255,1);
        box-shadow:0px -1px 0px 0px rgba(240,240,240,1);
        &>.playCheckBox{
          margin-right: 8px;
        }
        &>span{
          font-size: 14px;
        }
      }
      &>.submitP{
        border: none;
        width:180px;
        height:53px;
        text-align: center;
        line-height: 52px;
        font-weight: 600;
        color: #ffffff;
        font-size:16px;
        background:linear-gradient(135deg,rgba(243,93,46,1) 0%,rgba(237,26,35,1) 100%);
      }
      &>.deactiveBtn{
        background: #B0B0B0;
      }
    }

  }
}
//check 按钮样式
 .playCheckBox {
        width: 20px;
        height: 20px;
        overflow: hidden;
        position: relative;
        input[type="checkbox"] {
          display: none;
        }
        input[type="checkbox"] + label::before {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 8px;
          background: url("../../assets/imgs/noSelect.svg");
          background-size: cover;
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
          background-size: cover;
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
