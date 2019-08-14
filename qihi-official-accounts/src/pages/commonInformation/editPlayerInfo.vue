<template>
    <div class="editPlayerInfo">
        <div class="formTable">
            <p><span>棋手姓名</span><span class="clo33">{{playerName}}</span></p>
            <p><span>证件类型</span><span  class="clo33" v-if="certificateType === 1">身份证</span></p>
            <p><span>证件号码</span><span class="clo33">{{certificateNo}}</span></p>
            <p><span>电话号码 +86</span> <input type="text" v-model="phone" @blur="checkPlayerPhone" ></p>
            <p><span>机构码</span><span><span class="elipsSpan">{{unitCode}}</span><i class="iconfont icon-youjiantou" @click="showUnitCodePage"></i> </span> </p>
        </div>
         <div v-transfer-dom class="alertBox">
            <alert v-model="showAlert" >{{titleTips}}</alert>
        </div>

          <div v-transfer-dom class="codeVdom">
            <popup v-model="showUnitCode" height='100%' position='bottom'>
                <div class="popupPage">
                    <div class="PopupTop">
                        <p>选择机构码</p>
                        <span @click="canclePlayerBtn">取消</span>
                    </div>
                    <!-- 展示机构码 -->
                    <ul class="ulBox">
                        <li v-for="(item,index) in codeList" :key="index"
                         :class="{'activeCode':currentIndex === index}"
                         @click="selctedCode(item,index)">
                            <p>{{item.unitName}}</p>
                            <p class="colP">{{item.unitCode}}</p>
                        </li>
                    </ul>
              </div>
            </popup>
        </div>

        <div class="twoBtns">
            <button class="saveBtn" @click="saveDate">保存</button>
            <button @click="showConfiremPart">删除</button>
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
import qs from "qs";
import { Group, PopupRadio, TransferDom, Alert, Popup, Confirm } from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    PopupRadio,
    Alert,
    Popup,
    Confirm
  },
  data() {
    return {
      playerName: "",
      certificateType: "",
      certificateNo: "",
      phone: "",
      chessLevel: "",
      chessLevelName: "",
      titleTips: "",
      unitCode: "",
      showUnitCode: false,
      showAlert: false,
      codeList: [],
      currentIndex: "",
      showCofirm: false,
      id:''
    };
  },
  methods: {
    showUnitCodePage() {
      this.showUnitCode = true;
      let params = {
        unitType: 1
      };
      this.$axios.get("/api/units/list", { params }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.codeList = res.data.data;
        }
      });
    },
    canclePlayerBtn() {
      this.showUnitCode = false;
    },
    selctedCode(item, index) {
      this.unitCode = item.unitCode;
      this.currentIndex = index;
      this.disabled = false;
      setTimeout(() => {
        this.currentIndex = "";
        this.showUnitCode = false;
      }, 500);
    },
    checkPlayerPhone() {
      let reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
      if (!reg.test(this.phone)) {
        this.showAlert = true;
        this.titleTips = "请输入正确的电话号码";
        return false;
      } else {
        return true;
      }
    },
    saveDate() {
      let params = {
        id:this.id,
        playerName:this.playerName,
        certificateType:this.certificateType,
        certificateNo:this.certificateNo,
        phone:this.phone,
        unitCode:this.unitCode
      };
      this.$axios.post("/api/player/player_edit", qs.stringify(params)).then(res => {
          if(res.data.code == 0){
            this.$router.push({ name: "commonInformation" });
          }
      });
    },
    showConfiremPart() {
      this.showCofirm = true;
    },
    onCancel() {
      this.showCofirm = false;
    },
    onConfirm() {
      let params ={
        id:this.id
      }
      this.$axios.get('/api/player/player_del',{params}).then( res =>{
           if(res.data.code == 0){
                this.$router.push({ name: "commonInformation" });
           }
      })
    }
  },
  created() {
    let obj = JSON.parse(sessionStorage.getItem("editCurrentPlayerInfo"));
    let id = obj.id;
    let params = {
      id: id
    };
    this.$axios.get("/api//player/get_by_id", { params }).then(res => {
      if (res.data.code == 0) {
        let rst = res.data.data[0];
        console.log(res, "rst");
        this.playerName = rst.playerName;
        this.certificateType = rst.certificateType;
        this.certificateNo = rst.certificateNo;
        this.unitCode = rst.unitCode;
        this.phone = rst.phone;
        this.id = rst.id
        this.chessLevelName = rst.chessLevelName;
        // let examLevelList = JSON.parse(sessionStorage.getItem('examLevelList'));
        // this.chessLevelName = examLevelList.filter( e => e.id == this.chessLevel)[0].levelName;
      }
    });
  }
};
</script>


<style lang='scss' scoped>
@import "../../style/mixin.scss";
.editPlayerInfo {
  width: 100%;
  height: calc(100% - 12px);
  padding-top: 12px;
  background: #f4f4f4;
  & > .formTable {
    width: 359px;
    height: 260px;
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
      .clo33 {
        color: #333;
      }
      .elipsSpan {
        width: 100px;
        color: #333;
        text-align: right;
        vertical-align: middle;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      & > .icon-youjiantou {
        float: right;
      }
      & > input {
        border: none;
        width: 100px;
        float: right;
        color: #000;
        font-size: 14px;
        text-align: right;
        padding-right: 2px;
        background: #ffffff;
      }
      &:last-child {
        border-bottom: 0;
      }
    }
    .weui-cell::before {
      border-top: 0;
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
      margin-right: 15px;
    }
  }
}
.codeVdom {
  .ulBox {
    & > li {
      padding: 12px;
      height: 44px;
      background: #fafafa;
      border-bottom: 1px solid #e5e5e5;
      & > p {
        font-size: 14px;
        line-height: 20px;
        color: #333333;
        .colP {
          margin-top: 4px;
          color: #666666;
        }
      }
    }
    .activeCode {
      color: #2069e5;
      & > p {
        font-size: 14px;
        line-height: 20px;
        color: #2069e5;
        .colP {
          margin-top: 4px;
          color: #2069e5;
        }
      }
    }
  }
}
</style>
