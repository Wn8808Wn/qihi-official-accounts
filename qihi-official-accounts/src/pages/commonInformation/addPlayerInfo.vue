<template>
    <div class="addPlayerInfo">
        <div class="formTable">
            <p><span>棋手姓名</span><span>{{playerName}}</span></p>
            <p><span>证件类型</span><span v-if="certificateType === 1">身份证</span></p>
            <p><span>证件号码</span><span>{{certificateNo}}</span></p>
            <p><span>段级位</span><span>{{chessLevelName}}</span></p>
            <p><span>归属单位</span><span>{{unitName}}</span></p>
            <p><span>电话号码 +86</span><span>{{phone}}</span></p>
        </div>
         <div v-transfer-dom class="alertBox">
            <alert v-model="showAlert" >{{titleTips}}</alert>
        </div>
        <h1 class="h1Tips">此手机号用于报名棋手接收考试相关信息，可修改</h1>
        <button class="nextBtn"  @click="checkIsLegal">下一步</button>
    </div>
</template>

<script>
import { Group, PopupRadio, TransferDom,Alert } from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    PopupRadio,
    Alert
  },
  data() {
    return {
      playerName:'',
      certificateType:'',
      certificateNo:'',
      unitName:'',
      phone:'',
      chessLevel:'',
      chessLevelName:'',
      examLevelList:[],
      titleTips:'',
      showAlert:false,
    };
  },
  methods: {
    // checkName() {
    //   let regName = /^[\u4e00-\u9fa5]{2,4}$/;
    //   if (!regName.test(this.playerName)) {
    //     this.showAlert = true;
    //     this.titleTips='请输入合法的名字';
    //     return false;
    //   } else {
    //     // this.disabled = false;
    //     return true;
    //   }
    // },
    // checkCardNum(){
    //     let  reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
    //       if(!reg.test(this.cardNum)){  
    //         this.showAlert = true;
    //         this.titleTips='请输入合法的身份证号码';
    //         return  false;
    //       }else{
    //         // this.disabled = false;
    //         return true;
    //       }
    // },
    // checkPlayerPhone(){
    //     let  reg = /^1[3|4|5|8][0-9]\d{4,8}$/;  
    //       if(!reg.test(this.playerPhone)){  
    //         this.showAlert = true;
    //         this.titleTips='请输入正确的电话号码';
    //         return  false;
    //       }else{
    //         return true;
    //       }
    // },
    checkIsLegal() {
      this.$router.push({name:'playerUnitCode'})
    }
  },
  created(){
     let obj = JSON.parse(sessionStorage.getItem('chessInfo'));
     this.playerName = obj.playerName;
     this.certificateType = obj.certificateType;
     this.certificateNo = obj.certificateNo;
     this.unitName = obj.unitName;
     this.phone = obj.phone;
     this.chessLevelName = obj.chessLevelName;
     this.playerName = obj.playerName;
     this.playerName = obj.playerName;
   
  }
};
</script>


<style lang='scss' scoped>
.addPlayerInfo {
  width: 100%;
  height: calc(100% - 12px);
  padding-top: 12px;
  background: #f4f4f4;
  & > .formTable {
    width: 359px;
    height: 312px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
    border-radius: 14px;
    & > p {
      height: 19px;
      padding: 16px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e5e5e5;
      & > span {
        color: #666666;
      }
      // & > input {
      //   border: none;
      //   width: 100px;
      //   float: right;
      //   color: #000;
      //   font-size: 14px;
      //   text-align: right;
      //   padding-right: 2px;
      //   background: #ffffff;
      // }
      &:last-child {
        border-bottom: 0;
      }
    }
    .weui-cell::before {
      border-top: 0;
    }
    // .popupRadio {
    //   height: 20px;
    //   padding: 16px;
    //   border-bottom: 1px solid #e5e5e5;

    //   & /deep/ .vux-label {
    //     height: 20px;
    //     color: #666666;
    //     font-size: 14px;
    //   }
    //   & /deep/ .weui-cell__ft {
    //     span {
    //       font-size: 14px;
    //       color: #000;
    //     }
    //   }
    // }
  }
  .h1Tips {
    font-size: 14px;
    color: #ff9201;
    width: 100%;
    height: 20px;
    margin-top: 12px;
    margin-bottom: 36px;
    line-height: 20px;
    text-align: center;
  }
  .nextBtn {
    width: 280px;
    height: 44px;
    display: block;
    margin: 0 auto;
    font-size: 16px;
    line-height: 22px;
    color: #2069e5;
    background: #f4f4f4;
    border-radius: 22px;
    border: 1px solid #2069e5;
  }
  .deactive {
    background: #e5e5e5;
    color: #ffffff;
    border: none;
  }
}
</style>
