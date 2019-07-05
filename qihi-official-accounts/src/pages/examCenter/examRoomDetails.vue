<template>
    <div class="examRoomDetailsPage">
        <div class="examRoomInfo wrap">
            <p>
                <span>{{examRoomName}}</span>
            </p>
            <p class="commonTagP">
                <span>考试级别</span>
                <span>{{examLevelTitle}}</span>
            </p>
            <p class="commonTagP">
                <span>考试地点</span>
                <span>{{address}}</span>
            </p>
        </div>

        <div class="examTimeInfo">
            <div class="examTimeInfoTop">
                <p>考试时间</p>
            </div>
            <div class="examTimeInfoContent">
            <div class="swiperBox">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item, index) in swiperSlides" :key="index" @click.native="selectDate(item,index)" :class="{'activeSlides':index === currentIndex}">
                        <div class="dateBox">   
                            <span class="firstSpan">{{format(item.examDate.replace(/-/g,'/'))}}</span>
                            <span>
                               {{format(new Date()) === format(item.examDate.replace(/-/g,'/'))?'今天':dayList[new Date(item.examDate.replace(/-/g,'/')).getDay()]}}
                            </span>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
            <p style="margin-top:8px;margin-left:16px;font-size:14px;font-weight:500;color:#FF9201;line-height:20px;">可预定两周内的考试，考试前30分钟截止报名</p>
            <div class="examTimeList">
                <div v-for="(item,index) in timeList" :key="index">
                    <div class="examTimeListLeft">
                        <p><i class="iconfont icon-shijian"></i><span>时间</span><span>{{item.examTime}}-{{longTimeAgo(examDateCommon,item.examTime,30)}}</span></p>
                        <p><i class="iconfont icon-zuowei"></i><span>剩余</span><span>{{item.remainSeat}}</span></p>
                    </div>
                    <div class="examTimeListRight">
                        <div v-if="item.remainSeat>0 && !stopTime(item.examDate,item.examTime)" @click="selectCurrentRadio(item)">
                            <input  type="radio" name="examroom" :id='item.id'  >
                            <label  :for='item.id'></label>
                        </div>
                        <!-- item.examTime 字符串非时间对象 -->
                        <span v-if="stopTime(item.examDate,item.examTime)">截止报名</span>
                        <span v-if="item.remainSeat <= 0 && !stopTime(item.examDate,item.examTime)">已约满</span>
                    </div>
                </div>
            </div>
            </div>
        </div>

        <div class="fixedBox">
            <p><span>报名费:</span> <i>¥</i><span>{{price}}/人</span></p>
      
            <button @click="submitExamTime" :class="{'allowClick':disabled === false}" :disabled="disabled" >
                预约报名
            </button>
        </div>
    </div>
</template>

<script>
// require styles
import "../../../node_modules/vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      examRoomName: "",
      address: "",
      examLevelTitle: "",
      examDateCommon: "",
      dayList: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      currentIndex: "",
      swiperOption: {
        freeMode: true,
        longSwipersRadio: 0.9,
        stopOnLastSlide: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      swiperSlides: [],
      timeList: [],
      price: "",
      examLevelId: "",
      disabled: true,
      examtime: ""
    };
  },
  computed: {},
  methods: {
    longTimeAgo(dateStr, timeStr, long) {
      let s = dateStr.split(" ")[0] + " " + timeStr;
      var new_time_str = s.replace(/-/g, "/");
      var now = new Date(new_time_str);
      var time = now.getTime() + 1000 * 60 * long;
      return this.formatDate(time, "hh:mm");
    },
    //判断过期时间
    stopTime(examDate,examTime){
        var now = new Date();
        var time  = examDate.split(' ')[0]+' '+examTime;
        var time1 = new Date(time)
        if(now.getTime() > time1.getTime()){
          return true;
        } else {
            return false;
        }
    },
    selectDate(item, index) {
      this.examDateCommon = item.examDate;
      this.currentIndex = index;
      this.timeList = [];
      let params = {
        roomId: JSON.parse(sessionStorage.getItem("currentItem")).examRoomId,
        examDate: item.examDate
      };
      this.$axios.get("/api/enter/get_examDetal", { params }).then(res => {
        if (res.data.code === 0) {
          this.timeList = res.data.data;
          console.log(res.data.data,'00')
        }
      });
    },
    selectCurrentRadio(item) {
      //利用 sessionStorage 存储examPlanId
      sessionStorage.setItem("examPlanId", item.id);
      this.disabled = false;
      this.examTime =item.examDate.split(" ")[0].replace(/-/g, ".") +" " +item.examTime +"-" +this.longTimeAgo(this.examDateCommon, item.examTime, 30);
    },
    submitExamTime() {
      sessionStorage.setItem("examTime", this.examTime);
      // console.log(this.examTime,'this.examTime')
      sessionStorage.setItem("price", this.price);
      this.$router.push({ name: "submitOrder" });
    }
  },
  mounted() {
    //路由方式
    // this.examLevelId = this.$route.query.examLevelId;
    // this.examLevelTitle = this.$route.query.level;
    // this.examRoomName = JSON.parse(this.$route.query.currentItem).examRoomName;
    // this.address = JSON.parse(this.$route.query.currentItem).address;
    //缓存方式
    this.examLevelId = sessionStorage.getItem("examLevelId");
    this.examLevelTitle = sessionStorage.getItem("examLevelTitle");
    this.examRoomName = JSON.parse(
      sessionStorage.getItem("currentItem")
    ).examRoomName;
    this.address = JSON.parse(sessionStorage.getItem("currentItem")).address;

    //请求滑动的日期
    let params = {
      roomId: JSON.parse(sessionStorage.getItem("currentItem")).examRoomId
    };
    this.$axios.get("/api/enter/get_calendar", { params }).then(res => {
      if (res.data.code === 0) {
        this.swiperSlides = res.data.data;
      }
    });
    //请求报考价格
    this.$axios
      .get("/api/enter/get_serviceFee?examLevel=" + this.examLevelId)
      .then(res => {
        if (res.data.code === 0) {
          this.price = res.data.data;
        }
      });
  }
};
</script>


<style lang='scss' scoped>
@import "../../style/mixin.scss";
.examRoomDetailsPage {
  width: 100%;
  height: 100%;
  display: flex;
  background: #f4f4f4;
  flex-direction: column;
  align-items: center;
  & > .examRoomInfo {
    width: 327px;
    // height: 86px;
    padding: 16px;
    margin-top: 12px;
    background: #ffffff;
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
  & > .examTimeInfo {
    width: 359px;
    flex: 1;
    margin-top: 12px;
    background: $bg-color;
    display: flex;
    flex-direction: column;
    & > .examTimeInfoTop {
      width: 327px;
      height: 22px;
      padding: 16px;
      border-bottom: 1px solid #e5e5e5;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
      border-radius: 14px 14px 0 0;
      & > p {
        font-size: 16px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
      }
    }
    & > .examTimeInfoContent {
      flex: 1;
      width: 100%;
      background: #ffffff;
      & > .swiperBox {
        margin-top: 11px;
        width: 343px;
        height: 50px;
        padding: 6px 0 8px 16px;
        & > .swiper-container {
          min-width: 51px;
          height: 51px;
          // background: black;
          & > .swiper-wrapper {
            width: 50px;
            height: 50px;
            margin: 0;
            & > .swiper-slide {
              width: 50px !important;
              height: 50px !important;
              background: rgba(255, 255, 255, 1);
              border-radius: 18px;
              margin-right: 4px;
            }
            .activeSlides {
              width: 48px !important;
              height: 48px !important;
              border: 1px solid rgba(32, 105, 229, 1);
            }
            .dateBox {
              text-align: center;
              span {
                font-size: 12px;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                line-height: 17px;
              }
              .firstSpan {
                display: block;
                font-size: 14px;
                font-weight: 500;
                margin: 8px 0 1px;
                color: rgba(51, 51, 51, 1);
                line-height: 20px;
              }
            }
          }
        }
      }
      .examTimeList {
        width: 327px;
        margin-top: 12px;
        padding: 0 16px 12px 16px;
        & > div {
          width: 295px;
          height: 42px;
          display: flex;
          padding: 12px 16px 12px 14px;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          border-radius: 12px;
          border: 1px solid rgba(229, 229, 229, 1);
          & > .examTimeListLeft {
            padding: 12px 0;
            & > p {
              &:nth-of-type(1) {
                margin-bottom: 4px;
              }
              & > i {
                font-size: 13px;
              }
              & > span {
                font-size: 13px;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                line-height: 20px;
              }
              & > span:nth-of-type(1) {
                margin-left: 8px;
                color: rgba(102, 102, 102, 1);
                margin-right: 16px;
              }
            }
          }
          & > .examTimeListRight {
            & > div {
              width: 20px;
              height: 20px;
              overflow: hidden;
              position: relative;
              input[type="radio"] {
                display: none;
              }
              input[type="radio"] + label::before {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                margin-right: 8px;
                background: url("../../assets/imgs/noSelect.svg");
                background-size: cover;
                content: "";
                left: 0;
                top: 0;
                position: absolute;
              }
              input[type="radio"]:checked + label::before {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                margin-right: 8px;
                content: "";
                left: 0;
                top: 0;
                position: absolute;
                background: url("../../assets/imgs/selected.svg");
                background-size: cover;
              }
            }
            & > span {
              font-size: 14px;
              font-weight: 500;
              color: rgba(102, 102, 102, 1);
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
