<template>
    <div class="popupPage">
        <div class="information" @click="showPopupPage">
            <i class="iconfont icon-zhushi"></i><span>预约说明</span>
        </div>
     <!-- 点击预约说明弹层 -->
        <div v-transfer-dom>
            <popup v-model="showPopup" @on-hide="log('hide')" @on-show="log('show')">
                <div class="popupPage">
                    <div class="PopupTop">
                        <p>预约说明</p>
                        <span @click="cancleBtn">取消</span>
                    </div>
                <ul class="popupContent">
                    <li>
                        <h3>考试说明</h3>
                        <p>会员棋手才能报名考试，若还不是会员请先在会员系统注册成为会员；</p>
                        <p>所选地区不支持18岁以下棋手跨级别考试。需要跨级考试，可以在会员系统进行申请； </p>
                        <p>不支持跨地区考试，棋手目前只能选择会员归属地报名考试。</p>
                    </li>
                    <li>
                        <h3>退款说明</h3>
                        <p>距考试开始时间大于48小时可申请退款，不足48小时将不支持退款；</p>
                    </li>
                    <li>
                        <h3>退款手续费</h3>
                        <p>申请退款成功后，将收取30%的手续费。</p>
                    </li>
                    
                </ul>
                </div>
            </popup>
        </div>
    </div>    
</template>

<script>
import { TransferDom, Popup} from "vux";
export default {
    directives: {
        TransferDom
    },
    components: {
        Popup,
    },
    data(){
        return{
            showPopup:false,
        }
    },
    methods:{
        showPopupPage(){
            this.showPopup =true;
        },
        log(){

        },
        cancleBtn(){
            this.showPopup =false;
        }
    }
    
}
</script>


<style lang='scss' scoped>
.information{
    width:375px;
    height:34px;
    display: flex;
    align-items: center;
    background:rgba(255,248,230,1);
    margin-bottom: 12px;
    &>i{
        font-size: 14px;
        margin-left: 24px;
        margin-right: 8px;
    }
    &>span{
        font-size:12px;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:17px;
    }
}

//弹窗样式
.vux-popup-dialog {
  width: 100%;
  height: 426px;
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
    list-style-image: url("../../../assets/imgs/point.png");
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
