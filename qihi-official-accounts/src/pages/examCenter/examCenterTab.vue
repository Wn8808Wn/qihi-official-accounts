<template>
    <div class="examinationLevelPage">
        <div class="wrap pageTop">
            <div class="contentLf" @click="showPopupPage">
              <img src="../../assets/imgs/kaoshixuzhi.png" alt="报名须知">
              <span>报名须知</span>
            </div>
            <div class="contentRg">
              <img src="../../assets/imgs/kuajibie.png" alt="跨级别考试">
              <span>跨级别考试申请</span>
            </div>
        </div>
          <!-- 点击考试须知弹层 -->
        <div v-transfer-dom>
            <popup v-model="showPopup" @on-hide="log('hide')" @on-show="log('show')">
                <div class="popupPage">
                    <div class="PopupTop">
                        <p>报名须知</p>
                        <span @click="cancleBtn">取消</span>
                    </div>
                <ul class="popupContent">
                    <li>
                      <h3>会员报名</h3>
                      <p>报名前,请先<span>成为会员</span>,如果已经是会员，请忽略。</p>
                    </li>
                    <li>
                      <h3>跨级考试</h3>
                      <p>所选地区不支持18岁以下棋手跨级别考试。需要跨级考试，需提交<span>跨级别考试申请</span>。</p>
                    </li>
                    <li>
                      <h3>请选择会员所属地区报名</h3>
                      <p>不支持跨地区考试，棋手目前只能选择会员归属地报名考试。</p>
                    </li>
                    <li>
                      <h3>提前14天开放报名</h3>
                      <p>14天前的早8:00开始报名。</p>
                    </li>
                </ul>
              </div>
            </popup>
        </div>
        <!-- 考试地区、考试级别 -->
        <div class="wrap pageMid">
            <group>
                <cell
                :title="examAreaTitle"
                is-link
                :border-intent="false"
                :arrow-direction="showExamArea ? 'up' : 'down'"
                @click.native="showExamAreaPage">
                </cell>
            </group>
            <group>
                <cell
                :title="examLevelTitle"
                is-link
                :border-intent="false"
                :arrow-direction="showExamLevel ? 'up' : 'down'"
                @click.native="showExamLevelPage">
                </cell>
            </group>
        </div>
        <!-- 点击考试地区弹层 -->
        <div v-transfer-dom>
            <popup v-model="showExamArea" @on-hide="log('hide')" @on-show="log('show')" height='100%'>
                <div class="popupPage">
                    <div class="PopupTop">
                        <p>考试地区</p>
                        <span @click="cancleBtnArea">取消</span>
                    </div>
                <div class="historicalAccess">
                    <span>历史访问</span>
                    <div>  
                        <button  v-if="historyAreaList.length>0"   
                        v-for="(item,index) in historyAreaList" :key="index" 
                        @click="selectCurrent(item,index)" 
                        :class="{'activeBtn':index===currentHistoryProvinceID}">
                              {{item.areaName}}
                        </button>
                    </div>
                </div>
                <!-- 获取考试地区列表 -->
                <div class="examListPart">
                    <li   v-if="examAreaList.length>0"
                          v-for="(item,index) in examAreaList" :key="index" 
                          @click="selectCurrentProvince(item,index)" 
                          :class="{'activeProvince':index===currentProvinceID}">
                                {{item.areaName}}
                          </li>
                </div>
              </div>
            </popup>
        </div>
         <!-- 点击考试级别弹层 -->
        <div v-transfer-dom>
            <popup v-model="showExamLevel" @on-hide="log('hide')" @on-show="log('show')" height='100%' position='bottom'>
              <div class="popupPage">
                <div class="PopupTop">
                    <p>考试级别</p>
                    <span @click="cancleBtnLevel">取消</span>
                </div>
                <!-- 获取考试级别列表 -->
                <div class="examListPart">
                    <li v-for="(item,index) in examLevelList" :key="index"
                    @click="selectCurrentLevel(item,index)" 
                    :class="{'activeProvince':index===currentLevelID}">
                        {{item.levelName}}
                    </li>
                </div>
              </div>
            </popup>
        </div>

        <div class="examRoomList">
            <div  v-for="(item,index) in examRoomList" :key="index">
                <p>
                  <span>{{item.examRoomName}}</span>
                  <button v-if="item.examStatus === 0" @click="handleSignUp(item)">报名</button>
                  <b v-if="item.examStatus === 1" :class="{'fullBtn':item.examStatus === 1}">已约满</b>
                </p>
                <p class="commonTagP">
                  <span>考试地点</span>
                  <span>{{item.address}}</span>
                </p>
                <p class="commonTagP">
                  <span>考试时间</span>
                  <span>{{item.examBeginDate}}-{{item.examEndDate}}</span>
                </p>
            </div>
            <p class="bottomBar">
                已加载全部
            </p>

        </div>
        <!-- 底部公共组件 -->
        <commonTabbar></commonTabbar>
    </div>
</template>

<script>
import { location } from "../../utils/map.js";
import commonTabbar from "../../components/commonTabbar";
import { TransferDom, Popup, Cell, CellBox, Group, XButton } from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    commonTabbar,
    Popup,
    Group,
    Cell,
    CellBox,
    XButton
  },
  data() {
    return {
      showPopup: false,
      showExamArea: false,
      showExamLevel: false,
      examAreaTitle: "北京市",
      examLevelTitle: "5级",
      currentHistoryProvinceID: null,
      currentProvinceID: null,
      currentLevelID: null,
      historyAreaList: [],
      examAreaList: [],
      examLevelList: [],
      examRoomList: [
        // {
        //   examRoomId: 1,
        //   examRoomName: "龙岗区考场",
        //   examStatus: 0,
        //   address: "黑龙江省哈尔滨市围棋协会二楼130",
        //   examBeginDate: "2019.02.18",
        //   examEndDate:"2019.03.04"
        // },
      ]
    }
  },
  methods: {
    // 判断关键字是否存在，存在就移除添加在首位
    setHistoryItems(row) {
      let historyItem = localStorage.getItem("historyItem");
      if (historyItem === null) {
        localStorage.historyItem = JSON.stringify(row);
      } else {
          let historyItemArr = historyItem.split("|")
          let historyItemArrs = historyItemArr.map( e => JSON.parse(e));
          // console.log(historyItemArrs)
          let isExists = historyItemArrs.filter( item => item.id === row.id).length
          if (isExists) {
            // historyItem = JSON.stringify(row) + "|" + historyItemArrs.filter(e => e.id !== row.id).join("|");
          } else {
            historyItem += "|" + JSON.stringify(row);
          }
          localStorage.historyItem = historyItem;
          this.historyAreaList = window.localStorage.getItem('historyItem').split('|').map( item => JSON.parse(item));
          if(this.historyAreaList.length>6){
            this.historyAreaList = this.historyAreaList.slice(-6)
          }
      }
    },
    //获取地理定位
    getLocation() {
      let geolocation = location.initMap("map-container"); //定位
      AMap.event.addListener(geolocation, "complete", result => {
        this.examAreaTitle = result.addressComponent.province;
        console.log('定位结果为'+result.addressComponent.province)
        this.getList().then( () =>{
          // console.log('123')
          let defualtProvince = this.examAreaList.filter( e => e.areaName == this.examAreaTitle)[0].id
          let defualtLevel = this.examLevelList.filter( e => e.levelName == this.examLevelTitle)[0].id
          let params = {
              provinceCode:defualtProvince,
              examLevel:defualtLevel
          }
          this.getRoomList(params)
        })
      })
    },
    //获取考试地区和级别列表
    getList() {
      return this.$axios.get("/api/enter/get_examArea").then(res => {
            // console.log(res, "获取列表");
            if (res.data.code === 0) {
              this.examAreaList = res.data.data.areaList;
              this.examLevelList = res.data.data.levelType;
            }
          });
    },
    getRoomList(params){
        return  this.$axios.get('/api/enter/get_examRoom',{params}).then( res => {
            this.examRoomList =[];
            if(res.data.code === 0){
               this.examRoomList = res.data.data
            }else{
              console.log(res.data.msg)
            }
        })
    },
    // 点击图标显示弹层
    showPopupPage() {
      this.showPopup = true;
    },
    // 弹层取消
    cancleBtn() {
      this.showPopup = false;
    },
    log(aa) {
      // console.log(aa);
    },
    //点击考试地区显示弹层
    showExamAreaPage() {
      this.showExamArea = !this.showExamArea;
    },
    cancleBtnArea() {
      this.showExamArea = false;
    },
    //点击考试级别显示弹层
    showExamLevelPage() {
      this.showExamLevel = !this.showExamLevel;
    },
    cancleBtnLevel() {
      this.showExamLevel = false;
    },
    selectCurrent(row, index) {
      this.currentHistoryProvinceID = index;
      this.examAreaTitle =row.areaName;
      let params = {
          provinceCode:row.id,
          examLevel: this.examLevelList.filter( e => e.levelName === this.examLevelTitle)[0].id
      }
      setTimeout( () =>{
        this.showExamArea = false;
        this.getRoomList(params);
      },1000 )
    },
     selectCurrentProvince(row, index) {
      this.setHistoryItems(row);
      this.examAreaTitle =row.areaName;
      this.currentProvinceID = index;
      let params = {
          provinceCode:row.id,
          examLevel: this.examLevelList.filter( e => e.levelName === this.examLevelTitle)[0].id
      }
      setTimeout( () =>{
        this.showExamArea = false;
        this.getRoomList(params);
      },1000 )
     },
    selectCurrentLevel(row, index) {
      this.examLevelTitle = row.levelName;
      this.currentLevelID = index;
      let params = {
          examLevel:row.id,
          provinceCode: this.examAreaList.filter( e => e.areaName === this.examAreaTitle)[0].id
      }
      setTimeout(() => {
        this.showExamLevel = false;
        this.getRoomList(params);
      }, 2000)
    },
    handleSignUp(item){
      let examLevelId = this.examLevelList.filter( e => e.levelName == this.examLevelTitle)[0].id
      this.$router.push({name:'examRoomDetails',query:{currentItem:JSON.stringify(item),level:this.examLevelTitle,examLevelId}})
    }
  },
  mounted() {
      this.getList();
      this.getLocation();
      if(window.localStorage.getItem('historyItem') !== null){
          this.historyAreaList = window.localStorage.getItem('historyItem').split('|').map( item => JSON.parse(item));
          if(this.historyAreaList.length>6){
              this.historyAreaList = this.historyAreaList.slice(-6)
          }
      }
  }
}
</script>

<style lang='scss'>
@import "../../style/mixin.scss";
.examinationLevelPage {
  width: 100%;
  height: 100%;
  background: $bg-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  .pageTop {
    width: 359px;
    height: 87px;
    background: #ffffff;
    display: flex;
    & > div {
      height: 51px;
      width: 50%;
      margin-top: 16px;
      margin-bottom: 16px;
      display: flex;
      // align-content: center;
      & > img {
        width: 34px;
        height: 34px;
        border-radius: 14px;
      }
      & > span {
        height: 20px;
        font-size: 14px;
        font-weight: 500;
        margin-top: 20px;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
      }
    }
    .contentLf {
      box-sizing: border-box;
      border-right: 1px solid #e5e5e5;
      & > img {
        margin-left: 39px;
        margin-top: 12px;
        margin-right: 12px;
        background: linear-gradient(
          135deg,
          rgba(77, 232, 208, 1) 0%,
          rgba(31, 211, 189, 1) 100%
        );
        box-shadow: 0px 3px 5px 0px rgba(0, 233, 204, 0.5);
      }
    }
    .contentRg {
      & > img {
        margin-left: 18px;
        margin-top: 12px;
        margin-right: 12px;
        background: linear-gradient(
          138deg,
          rgba(251, 207, 6, 1) 0%,
          rgba(255, 166, 9, 1) 100%
        );
        box-shadow: 0px 3px 4px 0px rgba(255, 180, 0, 0.5);
      }
    }
  }
  .pageMid {
    width: 359px;
    height: 60px;
    background: #ffffff;
    display: flex;
    align-items: center;
    & > div:nth-child(1) {
      margin: 12px 7px 12px 12px;
    }
    .weui-cells {
      width: 164px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0px;
      border: none;
      background: rgba(250, 250, 250, 1);
      border-radius: 13px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(32, 105, 229, 1);
      line-height: 22px;
    }
    .weui-cells:before {
      border: none;
    }
    .weui-cells:after {
      border: none;
    }
    .weui-cell_access .weui-cell__ft:after {
      content: " ";
      border-color: #2069e5;
      display: inline-block;
      border-width: 1px 1px 0 0;
      width: 8px;
      height: 8px;
      margin-top: -6px;
      right: -10px;
    }
  }
  // 考场列表样式
  .examRoomList {
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-top: 12px;
    & > div {
      width: 327px;
      padding: 16px;
      margin-top: 12px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
      border-radius: 14px;
      &:nth-of-type(1){
        margin-top:0;
      }
      & > p:nth-of-type(1) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & > span {
          font-size: 16px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
        }
        & > button {
          background: $bg-blue;
          border: none;
          // width: 54px;
          height: 28px;
          border-radius: 14px;
          padding: 4px 13px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
        }
        & > .fullBtn {
          border-radius: 14px;
          font-size: 14px;
          font-weight: 500;
          line-height: 22px;
          color: rgba(51, 51, 51, 1);
        }
      }
      & > p:nth-of-type(2) {
        margin-top: 13px;
        margin-bottom: 8px;
      }
      .commonTagP {
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
          width: 249px;
          display: inline-block;
        }
      }
    }
    .bottomBar{
      display: flex;
      justify-content: center;
      font-size:12px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(176,176,176,1);
      line-height:17px;
      margin-top:8px;
    }
  }
}

.historicalAccess {
  width: 375px;
  display: flex;
  flex-direction: column;
  background: #fafafa;
  & > span {
    display: block;
    padding: 15px 0 12px 12px;
    font-size: 14px;
    font-weight: 500;
    color: #666666;
    line-height: 20px;
    height: 20px;
  }
  & > div {
    width: calc(100% -24px);
    padding: 0 12px 10px 12px;
    & > button {
      font-size: 13px;
      outline: none;
      float: left;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
      height: 30px;
      width: 110px;
      padding: 0;
      margin-right: 10px;
      text-align: center;
      background: #ffffff;
      margin-bottom: 8px;
      border: 1px solid rgba(229, 229, 229, 1);
      border-radius: 15px;
      &:nth-of-type(3n) {
        margin-right: 0px;
      }
    }
  }
  .activeBtn {
    background: $bg-blue;
  }
}

.examListPart {
  width: 100%;
  & > li {
    padding: 12px 0 10px 12px;
    font-size: 16px;
    border-bottom: 1px solid #e5e5e5;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
  }
  .activeProvince {
    color: $blue;
  }
}

.popupContent {
  & > li {
    margin-left: 34px;
    margin-right: 16px;
    list-style-image: url("../../assets/imgs/point.png");
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

