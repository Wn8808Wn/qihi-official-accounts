<template>
    <div class="addLinkmanPage">
        <div class="formTable">
            <p><span class="ispan">类型 <i class="iconfont icon-wenhao" @click="showtips1Page"></i></span> <span>{{curType}}<i class="iconfont icon-youjiantou" @click="showTypePage"></i></span></p>
            <p><span>抬头</span> <input type="text" v-model="receiptTitle"  placeholder="必填"></p>
            <p><span class="ispan">税号<i class="iconfont icon-wenhao" @click="showtips2Page"></i></span><input type="text" v-model="receiptNo"  placeholder="必填"></p>
        </div>
        <div class="twoBtns">
            <button class="saveBtn" @click="saveDate">保存</button>
            <button  class="saveBtn2" @click="delBtn" >删除</button>
        </div>
        <div v-transfer-dom class="delPlayers">
          <confirm v-model="showCofirm"
          @on-cancel="onCancel"
          @on-confirm="onConfirm"
          >
            <p style="text-align:center;">确认删除该抬头吗？</p>
          </confirm>
        </div>

        <!-- 点击抬头类型弹层 -->
        <div v-transfer-dom>
            <popup v-model="showType"  position='bottom'>
              <div class="popupPage">
                <div class="PopupTop">
                    <p>类型</p>
                    <span @click="cancleLinkmanBtn">取消</span>
                </div>
                <!-- 抬头类型 -->
                <div class="typeBox" >
                    <ul class="content">
                        <li v-for="(item,index) in typeList" :key="index"
                        :class="{activeStyle:currentLinkManId === index}"
                          @click="selectCurrentType(item,index)">
                               {{item.label}}
                        </li>
                    </ul>
                </div>
              </div>
            </popup>
        </div>

        <div v-transfer-dom>
            <popup v-model="showtips1">
                <div class="popupPage">
                    <div class="PopupTop">
                        <p>类型说明</p>
                        <span @click="cancleBtn1">取消</span>
                    </div>
                <ul class="popupContent">
                    <li>
                        <h3>企业</h3>
                        <p>在境内注册的企业，必须填写税号。</p>
                        <p>若为境外注册企业，无税号，请在“个人”中填写。</p>
                    </li>
                    <li>
                        <h3>政府机关事业单位</h3>
                        <p>政府机关，无需填写税号。</p>
                        <p>事业单位，若单位有税号则必须填写。</p>
                    </li>
                </ul>
                </div>
            </popup>
        </div>

        <div v-transfer-dom>
            <popup v-model="showtips2">
                <div class="popupPage">
                    <div class="PopupTop">
                        <p>税号说明</p>
                        <span @click="cancleBtn2">取消</span>
                    </div>
                <ul class="popupContent">
                    <li>
                        <h3>纳税人识别号</h3>
                        <p>纳税人识别是税务登记证上唯一识别企业的税号，由15-20位字符组成。</p>
                        <p>按照国税总局公告，自2017年7月1日起，企业索取的增值税普通发票需填写纳税人识别号，不符合规定的发票，不得作为合法税收凭证。</p>
                    </li>
                </ul>
                </div>
            </popup>
        </div>
    </div>
</template>

<script>
import qs from "qs";
import {TransferDom,Popup,Confirm} from "vux";
export default { 
  directives: {
    TransferDom
  },
  components:{
      Popup,
      Confirm
  },
  data() {
    return {
      curType:'',
      receiptType: "",
      receiptTitle: "",
      receiptNo:'',
      showType:false,
      typeList:[
          {
            id:1,
            label:'企业'
          },
          {
            id:2,
            label:'政府机关事业单位'
          },
          {
            id:3,
            label:'个人'
          },

      ],
      currentLinkManId:'',
      curType:'选择报销凭证抬头类型',
      showtips1:false,
      showtips2:false,

    };
  },
  methods: {
    showTypePage(){
        this.showType =true;
    },
    cancleLinkmanBtn(){
        this.showType =false;
        this.currentLinkManId = '';
    },
    selectCurrentType(item,index){
        this.currentLinkManId = index;
        this.curType = item.label;
        this.receiptType = item.id;
        setTimeout( ()=>{
            this.showType =false;
            this.currentLinkManId = '';
        },400)
    },
    showtips1Page(){
        this.showtips1 = true;
    },
    cancleBtn1(){
         this.showtips1 = false;
    },
    showtips2Page(){
         this.showtips2 = true;
    },
    cancleBtn2(){
         this.showtips2 = false;
    },
    saveDate() {
      
    },
    onShadowChange (ids, names) {
      console.log(ids, names)
    },
    cancleBtn() {
      this.$router.push({ name: "commonInformation" });
    },
    delBtn(){

    },
    onCancel(){

    },
    onConfirm(){
        
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../../style/mixin.scss";
.addLinkmanPage {
  width: 100%;
  height: calc(100% - 12px);
  padding-top: 12px;
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > .formTable {
    width: 359px;
    height: 156;
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
    border-radius: 14px;
    & > p {
      height: 19px;
      padding: 16px;
      font-size: 14px;
      width: calc(100% - 32px);
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e5e5e5;
      .ispan{
          &>.icon-wenhao{
              color: #FF9400;
              font-size: 12px;
          }
      }
      & > span {
        color: #666666;
        &>.icon-youjiantou{
            font-size: 12px;
        }
      }
      & > input {
        border: none;
        width: 200px;
        color: #000;
        font-size: 14px;
        text-align: right;
        padding-right: 2px;
        background: #ffffff;
      }
      &:last-child {
        border-bottom: 0;
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
    & /deep/ .vux-cell-box {
      height: 51px;
      width: 100%;
      border-bottom: 1px solid #e5e5e5;
      & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > .weui-cell__hd {
          height: 51px;
          line-height: 51px;
          padding-left: 16px;
        }
        & /deep/ .vux-cell-primary {
          padding-right: 16px;
        }
        & /deep/ .vux-popup-picker-placeholder {
          font-size: 14px;
          color: #666;
        }
      }
    }
    & /deep/ .vux-cell-box:not(:first-child):before {
      border-top: none;
    }
  }
   .twoBtns {
    width: calc(100% - 48px);
    margin-top: 36px;
    height: 44px;
    padding: 0 24px;
    & > button {
      padding: 11px 59px;
      font-size: 16px;
      color: #2069e5;
      font-weight: 600;
      background: #f4f4f4;
      border-radius: 22px;
      border: 1px solid #2069e5;
    }
    .saveBtn {
      margin-right: 17px;
    }
  }
}
.typeBox{
    width: 100%;
    .content{
        width: 100%;        
        li{
            width: calc(100% - 24px);
            height: 20px;
            padding: 12px;
            font-size: 16px;
            border-bottom: 1px solid #e5e5e5;
        }
        .activeStyle{
            color: #2069e5;
        }
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

