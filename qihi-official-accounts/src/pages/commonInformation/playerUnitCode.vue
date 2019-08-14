<template>
    <div class="playerUnitCodePage">
        <div class="codeBox">
            <div class="seletCode">
                <p>机构码</p>  
                <p><span>{{code}}</span> <i class="iconfont icon-youjiantou" @click="showUnitCodePage"></i> </p>
            </div>
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

        <button class="nextBtn" :class="{'deactive':disabled}" @click="checkOver">完成</button>
    </div>
</template>

<script>
import qs from "qs";
import { TransferDom, Popup } from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup
  },
  data() {
    return {
      disabled: true,
      showUnitCode: false,
      code: "棋手所属机构码",
      codeList: [],
      currentIndex: ""
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
    checkOver() {
      let obj = JSON.parse(sessionStorage.getItem("chessInfo"));
      let params = {
        certificateNo: obj.certificateNo,
        certificateType: obj.certificateType,
        chessLevel: obj.chessLevel,
        chessLevelName: obj.chessLevelName,
        gender:obj.gender,
        phone:obj.phone,
        playerName: obj.playerName,
        unitId: obj.unitId,
        unitName:obj.unitName,
        unitCode: this.code
      };
      console.log(params,'params')
      this.$axios.post("/api/player/player_add", qs.stringify(params)).then(res => {
          if(res.data.code == 0){
            this.$router.push({name:'commonInformation'})
          }
      });
    },
    canclePlayerBtn() {
      this.showUnitCode = false;
    },
    selctedCode(item, index) {
      this.code = item.unitCode;
      this.currentIndex = index;
      this.disabled = false;
      setTimeout(() => {
        this.currentIndex = "";
        this.showUnitCode = false;
      }, 500);
    }
  }
};
</script>


<style lang='scss' scoped>
@import "../../style/mixin.scss";
.playerUnitCodePage {
  width: 100%;
  height: calc(100% - 12px);
  padding-top: 12px;
  background: #f4f4f4;
  & > .codeBox {
    width: 359px;
    height: 52px;
    margin: 0 auto;
    margin-bottom: 68px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
    border-radius: 14px;
    .seletCode {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      & > p {
        font-size: 14px;
        font-weight: 500;
        color: #666666;
        line-height: 20px;
        .icon-youjiantou {
          font-size: 14px;
        }
        & > span {
          font-size: 14px;
          color: #333333;
          width: 100px;
          text-align: right;
          vertical-align: middle;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
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
