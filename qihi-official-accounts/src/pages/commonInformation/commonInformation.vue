<template>
    <div class="myOrderPage">
        <commonInfo></commonInfo>
        <tab :line-width="2"  custom-bar-width="44px" default-color='#333333' active-color='#2069E5' v-model="index">
          <tab-item seletced  @on-item-click='selectedCurrent'>棋手</tab-item>
          <tab-item  @on-item-click='selectedCurrent'>地址</tab-item>
          <tab-item  @on-item-click='selectedCurrent'>联系人</tab-item>
          <tab-item  @on-item-click='selectedCurrent'>报销凭证</tab-item>
        </tab>
        <!-- 棋手列表 -->
        <div class="list listWrapper" ref="listWrapper" v-if="index === 0">
            <ul class="content">  
            <div v-for="(item,index) in playerList" :key="index" class="commonBox">
              <div class="lfloat">
                  <p>
                      <span>{{item.playerName}}</span>
                  </p>
                  <p class="commonTagP">
                    <span>段位等级</span>
                    <span>{{item.chessLevelName}}</span>
                  </p>
                  <p class="commonTagP">
                    <span>证件号码</span>
                    <span>{{item.certificateNo}}</span>
                  </p>
              </div>
              <div class="rfloat"><i class="iconfont icon-xiugai" @click="editPlayerInfo(item)"></i></div>
            </div>
            <p class="bottomBar">
                已加载全部
            </p>
            </ul>
        </div>
         <!-- 地址列表 -->
       
         <!-- 联系人列表 -->
        <div class="list listWrapper" ref="listWrapper" v-if="index === 2">
            <ul class="content">  
            <div v-for="(item,index) in linkmanList" :key="index" class="commonBox">
              <div class="lfloat">
                  <p>
                      <span>{{item.linkman}}</span>
                  </p>
                  <p class="commonTagP">
                    <span>电话号码</span>
                    <span>{{item.phone}}</span>
                  </p>
                  <p class="commonTagP">
                    <span>邮箱地址</span>
                    <span>{{item.email}}</span>
                  </p>
              </div>
              <div class="rfloat"><i class="iconfont icon-xiugai" @click="editlinkmanInfo(item)"></i></div>
            </div>
            <p class="bottomBar">
                已加载全部
            </p>
            </ul>
        </div>
         <!-- 报销凭证列表 -->

        <div class="addBtn" @click="addBtn"></div>
        <commonTabbar></commonTabbar>
    </div>
</template>

<script>
import Bscroll from "better-scroll";
import { Tab, TabItem } from "vux";
import commonInfo from "./popups/commonInfo";
import commonTabbar from "../../components/commonTabbar";
export default {
  components: {
    Tab,
    TabItem,
    commonTabbar,
    commonInfo
  },
  data() {
    return {
      index: 0,
      playerList: [],
      adressList: [],
      linkmanList: [],
      reimbursementList:[]
    };
  },
  methods: {
    addBtn() {
      if (this.index === 0) {
        this.$router.push({ name: "addPlayer" });
      }
      if (this.index === 1) {
        // alert("新增地址");
      }
      if (this.index === 2) {
         this.$router.push({ name: "addLinkman" });
      }
      if (this.index === 3) {
        // alert("新增报销");
      }
    },
    getPlayerList(params) {
      this.$axios.get("/api/player/list", { params }).then(res => {
        if (res.data.code === 0) {
          console.log(res)
          this.playerList = res.data.data;
          // let examLevelList = JSON.parse(sessionStorage.getItem('examLevelList'));
          // this.playerList.map( e =>{
          //   e.chessLevelName = examLevelList.filter( item => item.id == e.chessLevel)[0].levelName;
          // })
          this.$nextTick(() => {
              this.scroll = new Bscroll(this.$refs.listWrapper, { click: true });
          });
        }
      });
    },
    getLinkmanList(params){
      this.$axios.get("/api/linkman/list ", { params }).then(res => {
        if (res.data.code === 0) {
          console.log(res)
          this.linkmanList = res.data.data;
          // let examLevelList = JSON.parse(sessionStorage.getItem('examLevelList'));
          // this.playerList.map( e =>{
          //   e.chessLevelName = examLevelList.filter( item => item.id == e.chessLevel)[0].levelName;
          // })
          // this.$nextTick(() => {
          //     this.scroll = new Bscroll(this.$refs.listWrapper, { click: true });
          // });
        }
      });
    },
    editPlayerInfo(item){
      sessionStorage.setItem('editCurrentPlayerInfo',JSON.stringify(item))
      this.$router.push({name:'editPlayerInfo'})
    },
     editlinkmanInfo(item){
      console.log(item)
      sessionStorage.setItem('editCurrentLinkmanInfo',JSON.stringify(item))
      this.$router.push({name:'editLinkmanInfo'})
    },
    selectedCurrent(index) {
      this.index = index;
      if (index === 0) {
        this.getPlayerList();
      }
      if (index === 1) {
        //  this.$router.push({name:'addressInfo'})
      }
      if (index === 2) {
        this.getLinkmanList();
        //  this.$router.push({name:'linkmanInfo'})
      }
      if (index === 3) {
        //  this.$router.push({name:'reimbursementInfo'})
      }
    }
  },
  created() {
    this.getPlayerList();
  }
};
</script>


<style lang='scss' scoped>
@import "../../style/mixin.scss";
.myOrderPage {
  width: 100%;
  height: 100%;
  display: flex; //.....
  flex-direction: column; //.....
  background: $bg-color;
  & /deep/ .vux-tab .vux-tab-item {
    background: none;
    font-size: 16px;
    color: #333333;
    .aa {
      font-size: 18px;
    }
  }
  .listWrapper {
    width: 100%; //.....
  }
  & > .list {
    display: flex;
    flex: 1;
    width: 100%;
    height: calc(100% - 60px); //.....
    overflow: hidden;
    padding-bottom: 60px; //.....
    flex-direction: column;
    align-items: center;
    & > .content {
      padding-top: 12px; //.....
      & > .commonBox {
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 14px;
        margin-bottom: 12px;
        &:last-child {
          margin-bottom: 0px;
        }
        .lfloat {
          width: 80%;
          height: 86px;
          & > p:nth-of-type(1) {
            width: 100%;
            height: 22px;
            margin-bottom: 16px;
            & > span {
              font-size: 16px;
              font-weight: 600;
              float: left;
              color: rgba(51, 51, 51, 1);
              line-height: 22px;
            }
            // & > .firstSpan {
            //   width: 64px;
            //   height: 22px;
            //   overflow: hidden;
            //   margin-right: 8px;
            //   text-overflow: ellipsis;
            //   white-space: nowrap;
            // }
          }
          .commonTagP {
            height: 20px;
            width: 100%;
            margin-bottom: 8px;
            & > span {
              font-size: 14px;
              font-weight: 500;
              line-height: 20px;
            }
            & > span:nth-of-type(1) {
              color: #666666;
              margin-right: 16px;
              float: left;
            }
            & > span:nth-of-type(2) {
              color: #333333;
              display: inline-block;
            }
            &:nth-last-of-type(1) {
              margin-bottom: 0px;
            }
          }
        }
        .rfloat {
          width: 20%;
          display: flex;
          justify-content: flex-end;
          & > i {
            font-size: 36px;
            color: #C8C8C8;
          }
        }
      }
    }
    .bottomBar {
      display: flex;
      justify-content: center;
      font-size: 12px;
      font-weight: 500;
      color: rgba(176, 176, 176, 1);
      line-height: 17px;
      margin-top: 8px;
      margin-bottom: 60px; //....
    }
  }
  .addBtn {
    position: fixed;
    left: 24px;
    bottom: 111px;
    width: 54px;
    height: 54px;
    background: url("../../assets/imgs/addBtn.svg") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
