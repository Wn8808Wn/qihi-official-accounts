<template>
    <div class="chessplayerScoresPages">
        <div class="chessplayerScoresListBox">
          <div v-for="(item,index) in playerList" :key="index">
              <p>
                <span class="firstSpan">{{item.playerName}}</span>
                <span v-if="item.examResult === 0" style="color:#19A91A;font-weight:600">通过 ({{item.score}}分)</span>
                 <span v-if="item.examResult === 1" style="color:#ED1A23;font-weight:600">未通过 ({{item.score}}分)</span>
                <span v-if="item.certificationType === 0 &&item.examResult === 0" style="color:#ED1A23;font-weight:500;float:right">未认证</span>
                <span v-if="item.certificationType === 1 &&item.examResult === 0" style="color:#666666;font-weight:500;float:right">已认证</span>
                <!-- <span v-if="item.examStatus === 2" style="float:right"></span> -->
              </p>
              <p class="commonTagP">
                <span>证件号码</span>
                <span>{{item.certificateNo}}</span>
              </p>
              <p class="commonTagP">
                <span>电话号码</span>
                <span>{{item.phone}}</span>
              </p>
              <p class="commonTagP">
                <span>考试级别</span>
                <span>{{item.leveNames}}</span>
              </p>

              <div class="btnGrps" v-if="item.examResult === 0 && item.certificationType === 0">
                  <button @click="handleScores">对弈报告</button>
                  <button class="bgBtn">证书申领</button>
              </div>   
              <div class="btnGrps" v-if="item.examResult === 0 && item.certificationType === 1 ">
                  <button>对弈报告</button>
                  <button style="margin-right:8px;">电子证书</button>
              </div>
          </div>
          <p class="bottomBar">
              已加载全部
          </p>
      </div>


    </div>
</template>

<script>
export default {
  data() {
    return {
      playerList: [
            // {
            //     playerName:'张三',
            //     examResult:0,
            //     orderNo:1123131232131231123,
            //     phone:123123123213,
            //     leveNames:'25级',
            //     score:70,
            //     certificationType:1
            // },
            // {
            //     playerName:'张三疯呀',
            //     examResult:0,
            //     phone:12321321321,
            //     orderNo:1123131232131231123,
            //     leveNames:'25级',
            //     score:90,
            //     certificationType:0
            // },
            // {
            //     playerName:'李思康敲试试',
            //     examResult:1,
            //     score:50,
            //     orderNo:1123131232131231123,
            //     phone:123123123213,
            //     leveNames:'25级'
            // }
          ]
    }
  },
   methods:{
      handleScores(){
        
      }
  },
  created(){
    let examPlanId = this.$route.query.examPlanId;
    let  params= {
        examPlanId:examPlanId
    }
    this.$axios.get('/api/enroll/grade_list',{params}).then( (res) => {
        if( res.data.code === 0){
          this.playerList = res.data.data;
          console.log(res.data.data)
        }
     })
  }
};
</script>

<style lang='scss' scoped>
@import "../../style/mixin.scss";
.chessplayerScoresPages {
  width: 100%;
  height: calc( 100% - 12px);
  background: #f4f4f4;
  padding-top: 12px;
  .chessplayerScoresListBox {
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
        width:100%;
        height: 22px;
        & > .firstSpan {
          font-size: 16px;
          width: 64px;
          height: 22px;
          float: left;
          overflow: hidden;
          text-overflow:ellipsis;
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
          color: rgba(237, 26, 35, 1);
          line-height: 22px;
        }
      }
      & > p:nth-of-type(2) {
        margin-top: 16px;
      }
      .commonTagP {
        height: 20px;
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
          width: 249px;
          display: inline-block;
        }
        &:nth-last-of-type(1){
          margin-bottom: 0px;
        }
      }
      & > button {
        width: 76px;
        height: 28px;
        background: #ffffff;
        border-radius: 14px;
        border: 1px solid rgba(32, 105, 229, 1);
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(32, 105, 229, 1);
        line-height: 20px;
        margin-top: 16px;
        float: right;
      }
      .btnGrps {
        & > button {
          width: 76px;
          height: 28px;
          background: #ffffff;
          border-radius: 14px;
          border: 1px solid rgba(32, 105, 229, 1);
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(32, 105, 229, 1);
          line-height: 20px;
          margin-top: 16px;
          float: right;
        }
        .bgBtn {
          margin-right: 8px;
          color: #ffffff;
          background: $bg-blue;
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
}
</style>
