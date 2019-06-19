<template>
    <div class="chessplayerScoresPages">
        <div class="chessplayerScoresListBox">
          <div v-for="(item,index) in chessplayerScoresList" :key="index">
              <p>
                <span class="firstSpan">{{item.playerName}}</span>
                <span v-if="item.examStatus === 0">未认证</span>
                <span v-if="item.examStatus === 1" style="color:#666666;">已认证</span>
              </p>
              <p class="commonTagP">
                <span>证件号码</span>
                <span>{{item.idNum}}</span>
              </p>
              <p class="commonTagP">
                <span>电话号码</span>
                <span>{{item.phone}}</span>
              </p>
              <p class="commonTagP">
                <span>考试级别</span>
                <span>{{item.examLevel}}</span>
              </p>
            
               <div v-else class="btnGrps" v-if="item.registeredType ===0">
                  <button @click="handleScores">对弈报告</button>
                  <button class="bgBtn">证书申领</button>
              </div>   
              <div v-else-if="item.registeredType ===1" class="btnGrps">
                  <button @click="handleScores">对弈报告</button>
                  <button @click="handleScores">电子证书</button>
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
      chessplayerScoresList: [
            {
                name:'张三',
                examStatus:0,
                idNum:1123131232131231123,
                phone:123123123213,
                examLevel:'25级',
                registeredType:0
            },
            {
                name:'张三',
                examStatus:1,
                idNum:1123131232131231123,
                phone:123123123213,
                examLevel:'25级',
                registeredType:1
            }
          ]
    };
  }
};
</script>

<style lang='scss' scoped>
@import "../../style/mixin.scss";
.chessplayerScoresPages {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  .chessplayerScoresListBox {
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
      // background: skyblue;
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
      border-radius: 14px;
      &:nth-of-type(1) {
        margin-top: 0;
      }
      & > p:nth-of-type(1) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & > .firstSpan {
          font-size: 16px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
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
