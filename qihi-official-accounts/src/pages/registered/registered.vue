<template>
    <div class="registeredPage">
      <!-- 没有数据 -->
      <div v-if="list.length === 0" class="listNull">
            <div><img src="@/assets/imgs/no-apply.svg" alt=""></div>
            <p>还没有报名考试，</p>
            <p>赶快去报名段级位考试吧！</p>
      </div>
      <!-- 有数据 -->
  
      <div  v-else-if="list.length !== 0" class="registeredList registeredWrapper" ref="registeredWrapper">
        <ul class="content">
          <div v-for="(item,index) in list" :key="index">
              <p>
                <span class="firstSpan">{{item.examRoomName}}</span>
                <span v-if="item.examStatus === 0">待考试</span>
                <span v-if="item.examStatus === 1" style="color:#666666;">考试结束</span>
              </p>
              <p class="commonTagP">
                <span>考试级别</span>
                <span>{{item.examLevel}}</span>
              </p>
              <p class="commonTagP">
                <span>考试地点</span>
                <span>{{item.address}}</span>
              </p>
              <p class="commonTagP">
                <span>考试时间</span>
                <span>{{item.examTime}}</span>
              </p>
              <p class="commonTagP">
                <span>报名棋手</span>
                <span>{{item.player}}</span>
              </p>
              <button v-if="item.registeredType ===0">准考证</button>
              <div v-else class="btnGrps">
                  <button @click="handleScores">棋手成绩</button>
                  <button class="bgBtn">证书申领</button>
              </div>
          </div>
          <p class="bottomBar">
              已加载全部
          </p>
        </ul>
        
      </div>
 
      <commonTabbar></commonTabbar>
    </div>
</template>

<script>
import Bscroll from 'better-scroll'
import commonTabbar from "../../components/commonTabbar";
export default {
  components: {
    commonTabbar
  },
  data(){
    return{
      list:[
        {
          examRoomName:'龙岗区考场',
          examStatus:0,
          examLevel:'10级',
          address:'黑龙江省哈尔滨市围棋协会二楼130',
          examTime:'2019.02.18 9:00',
          player:'网三',
          registeredType:0
        },
        {
          examRoomName:'龙岗区考场',
          examStatus:1,
          examLevel:'10级',
          address:'黑龙江省哈尔滨市围棋协会二楼130',
          examTime:'2019.02.18 9:00',
          player:'网三',
          registeredType:1
        },
         {
          examRoomName:'龙岗区考场',
          examStatus:1,
          examLevel:'10级',
          address:'黑龙江省哈尔滨市围棋协会二楼130',
          examTime:'2019.02.18 9:00',
          player:'网三',
          registeredType:1
        },
         {
          examRoomName:'龙岗区考场',
          examStatus:1,
          examLevel:'10级',
          address:'黑龙江省哈尔滨市围棋协会二楼130',
          examTime:'2019.02.18 9:00',
          player:'网三',
          registeredType:1
        },
         {
          examRoomName:'龙岗区考场',
          examStatus:1,
          examLevel:'10级',
          address:'黑龙江省哈尔滨市围棋协会二楼130',
          examTime:'2019.02.18 9:00',
          player:'网三',
          registeredType:1
        },
      ]
    }
  },
  methods:{
     handleScores(){
      this.$router.push({name:'chessplayerScores'})
    }
  },
  created(){
      let params = {
         userId:1
      }
     this.$axios.get('/api//enroll/enroll_list',{params}).then( res =>{
        console.log(res)

     })
     this.$nextTick(() => {
          this.scroll = new Bscroll(this.$refs.registeredWrapper, {click:true})
     })
  }
}
</script>


<style lang='scss' scoped>
@import "../../style/mixin.scss";
.registeredPage{
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #F4F4F4;
  &>.listNull{
    padding-top: 124px;
    padding-left: 92px;
    padding-right: 91px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &>div{
       width: 166px;
       height: 166px;
       margin: 0 auto;
       margin-bottom: 6px;
      &>img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      } 

    }
    
    &>p{
      font-size:16px;
      width: 192px;
      text-align: center;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(102,102,102,1);
      line-height:22px;
    }
  }

  .registeredWrapper{
     width: 100%;
     height:100%;
   } 
   .registeredList {
    display: flex;
    width: 100%;
    height: 480px;
    flex-direction: column;
    align-items: center;
    margin-top: 12px;
    &>.content{
      & > div {
      width: 327px;
      height: 186px;
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
          & >.firstSpan{
            font-size: 16px;
            height: 22px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 22px;
          }
          & > span {
            font-size:16px;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(237,26,35,1);
            line-height:22px;
          }
        }
        & > p:nth-of-type(2) {
          margin-top: 16px;
          
        }
        .commonTagP {
          margin-top: 8px;
          & > span {
            height: 20px;
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
          }
          & > span:nth-of-type(1) {
            color: #666666;
            height: 20px;
            margin-right: 16px;
            float: left;
          }
          & > span:nth-of-type(2) {
            color: #333333;
            width: 249px;
            height: 20px;
            display: inline-block;
          }
        }
        &>button{
            width:76px;
            height:28px;
            background: #ffffff;
            border-radius:14px;
            padding: 0;
            border:1px solid rgba(32,105,229,1);
            font-size: 14px;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(32,105,229,1);
            line-height:20px;
            margin-top: 16px;
            float: right;
        }
        .btnGrps{
          &>button{
              height:28px;
              border: none;
              outline: none;
              background: #ffffff;
              border-radius:14px;
              border:1px solid rgba(32,105,229,1);
              font-size: 14px;
              font-weight:500;
              padding: 4px 10px;
              color:rgba(32,105,229,1);
              line-height:20px;
              margin-top: 16px;
              float: right;
            }
            .bgBtn{
              margin-right: 8px;
              color: #ffffff;
              background: $bg-blue;
            }
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
</style>
