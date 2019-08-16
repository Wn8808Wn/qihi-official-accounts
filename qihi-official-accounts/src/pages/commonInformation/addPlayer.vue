<template>
    <div class="addPlayerPage">
        <!-- 选择联系人发票信息 -->
        <div class="linkManPart">
            <div class="seletLinkman bottomBorder">
                <p>证件类型</p>  
                <p> <span>{{cardType}}</span> <i class="iconfont icon-youjiantou" @click="showTypePage"></i> </p>
            </div>
            <div class="seletLinkman">
                <p>证件号码</p> 
                <p><input  type="text" class="ipt" v-model.trim="cardNum"  placeholder="请输入有效的证件号码"></p> 
            </div>
        </div>  
        <button class="nextBtn" :class="{'deactive':disabled}" @click="checkIsMember">下一步</button>
        <div v-transfer-dom>
              <popup v-model="showType">
                <div class="popup0">
                    <ul>
                      <li v-for="(item,index) in typeList" :key="index" @click="changeType(item)">
                        {{item.type}}
                      </li>
                    </ul>
                </div>
              </popup>
        </div>

        <div v-transfer-dom class="alertBox">
            <alert v-model="showAlert" >请输入合法的身份证号码</alert>
        </div>

         <div v-transfer-dom>
          <confirm v-model="showCofirmTitle"
          title="提示"
          @on-cancel="onCancel"
          @on-confirm="onConfirm"
          confirm-text='去注册'
          >
            <p style="font-size:16px;font-weight:400;color:rgba(102,102,102,1);line-height:22px;">未识别到棋手会员信息，请先去会员系统完成注册再报名</p>
          </confirm>
        </div>
    </div>
</template>

<script>
import { TransferDom, Popup, Alert,Confirm } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Alert,
    Confirm
  },
  data() {
    return {
      showType: false,
      disabled:false,
      cardType:'身份证',
      cardTypeId:1,
      cardNum:'',
      showAlert:false,
      showCofirmTitle:false,
      typeList:[
        {
            id:1,
            type:'身份证'
        },
        {
          id:1,
          type:'港澳居民身份证'
        },
        {
          id:1,
          type:'台胞证'
        },
        {
          id:1,
          type:'护照'
        },
        ]
    };
  },
  methods:{
     showTypePage(){
       this.showType = true;
     },
     //身份证正则
     isCardNo(card){
          let  reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
          if(reg.test(card) === false){  
            this.showAlert = true;
            this.disabled = true;
            return  false;
          }else{
            this.disabled = false;
            let params = {
                cardType:this.cardTypeId,
                cardNo:this.cardNum
            }
            this.$axios.get('/api/player/get_player',{params}).then( res =>{
              console.log(res,'sss')
              if(res.data.code == 1){
                this.showCofirmTitle = true;
                this.disabled = true;
              }
              if(res.data.code == 0){
                sessionStorage.setItem('chessInfo',JSON.stringify(res.data.data))
                this.$router.push({name:'addPlayerInfo'})
              }
            })
          }
     },
     changeType(item){
        this.cardType = item.type;
        this.cardTypeId = item.id;
        setTimeout(() =>{
            this.cardType = item.type;
            this.cardTypeId = item.id;
            this.showType = false;
        },500)
     },
     checkIsMember(){
       this.isCardNo(this.cardNum)
     },
     onConfirm(){
        alert('功能开发中')
     },
     onCancel(){

     }
  }
};
</script>

<style lang='scss' scoped>
.addPlayerPage {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0  auto;
  height: calc(100% - 12px);
  padding-top: 12px;
  background: #F4F4F4;
  & > .linkManPart {
    width: 359px;
    height: 104px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
    border-radius: 14px;
    overflow: hidden;
    margin: 0 auto;
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
        .icon-youjiantou{
            font-size: 14px;
        }
        & > span {
          font-size: 14px;
          color: #333333;
        }
        .ipt{
            border: none;
            float: right;
            width: 140px;
            margin-right: 3px;
            // background: salmon;
            font-size: 14px;
        }
      }
    }
  }
  .nextBtn {
    width: 280px;
    margin-top: 68px;
    height: 44px;
    font-size: 16px;
    line-height: 22px;
    color: #2069E5;
    background: #F4F4F4;
    border-radius: 22px;
    border: 1px solid #2069e5;
  }
  .deactive{
      background: #E5E5E5;
      color: #ffffff;
      border:none;
  }
}
.popup0{
  // background: #e5e5e5;
  &>ul{
    padding-top: 12px;
    li{
      width: calc(100% - 20px);
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      color: #000;
      // background: salmon;
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 10px;
      padding-left: 20px;
    }
  }
}
.alertBox{
  border-radius: 14px;
    & /deep/ .weui-dialog__bd{
      font-size: 14px;
      color: #000;
    }
    & /deep/.weui-dialog__btn_primary{
      color: #2069E5;
    }
}

</style>
