<template>
    <div class="examCenterPage">
        <div class="topPage">
            <swiper loop auto  dots-class="custom-bottom" dots-position="center" :interval='5000'>
                <swiper-item class="swiper-demo-img" v-for="(item, index) in demo04_list" :key="index"><img :src="item.src"></swiper-item>
            </swiper>
        </div>
        <div class="bottomPage">
            <dl v-for="(item,index) in navList" :key="index" @click="handleToPage(index)">
                <dt><img :src='item.src'></dt>
                <dd>{{item.title}}</dd>
            </dl>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperItem, XButton, Alert } from "vux";
export default {
  components: {
    Swiper,
    SwiperItem,
    XButton,
    Alert
  },
  data() {
    return {
      demo04_list: [
        {
          src: require("@/assets/imgs/banner1.jpg"),
          title: "图片1"
        },
        {
          src: require("@/assets/imgs/banner2.jpg"),
          title: "图片2"
        },
        {
          src: require("@/assets/imgs/banner3.jpg"),
          title: "图片3"
        }
      ],
      navList: [
        {
          src: require("@/assets/imgs/img1.svg"),
          title: "段级位考试"
        },
        {
          src: require("@/assets/imgs/img2.svg"),
          title: "教练员考试"
        },
        {
          src: require("@/assets/imgs/img3.svg"),
          title: "裁判长|员考试"
        },
        {
          src: require("@/assets/imgs/img4.svg"),
          title: "考试模拟"
        }
      ]
    };
  },
  methods: {
    handleToPage(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.$router.push({ name: "examinationLevel" });
          break;

        case 1:
          this.$router.push({ name: "coachTest" });
          break;

        case 2:
          this.$router.push({ name: "umpireTest" });
          break;

        case 3:
          this.$router.push({ name: "testSimulating" });
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.examCenterPage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
}
.topPage {
  width: 100%;
  height: 246px;
  background: #ffffff;
  margin-bottom: 8px;
  & > .vux-slider {
    width: 351px;
    height: 197px;
    margin-top: 13px;
    margin-left: 12px;
    // border-radius: 14px;
    overflow: visible;
    & /deep/ .vux-swiper {
        width: 351px;
        height: 197px !important;
        border-radius: 14px;
        overflow: hidden;
        //解决 移动端ios border-radius 不显示圆角问题
        transform:rotate(0deg);
        & /deep/ .vux-swiper-item{
            width: 100%;
            height: 100%;
            border-radius: 14px;
            overflow: hidden;
        & /deep/ img{
            width: 351px;
            height: 197px !important;
            border-radius: 14px;
            overflow: hidden;
          }
        }
    }
    & /deep/.vux-indicator-center {
      bottom: -30px;
    }
    & /deep/ .vux-icon-dot {
      width: 16px;
      height: 4px;
      opacity: 1;
      background: rgba(228, 228, 228, 1);
      border-radius: 2px;
    }
    & /deep/ .vux-icon-dot.active {
      width: 16px;
      height: 4px;
      opacity: 1;
      background: linear-gradient(135deg, rgba(69, 156, 255, 1) 0%, rgba(32, 105, 229, 1) 100%);
      border-radius: 2px;
    }
  }
}
.bottomPage {
  flex: 1;
  width: 375px;
  background: #ffffff;
  display: flex;
  justify-content: flex-start;
  & > dl {
    display: flex;
    height: 78px;
    flex-direction: column;
    margin-top: 20px;
    & > dt {
      margin: 0 auto;
      margin-bottom: 12px;
    }
    & > dd {                                                                                                                   
      margin: 0 auto;
      font-size: 14px;
      font-weight: 500;
      font-family: PingFang-SC-Medium;
      color: #333333;
      line-height: 1;
    }
    &:nth-of-type(1){
      margin-left: 16px;
    }
    &:nth-of-type(2){
      margin-left: 21px;
    }
    &:nth-of-type(3){
      margin-left: 13px;
    }
    &:nth-of-type(4){
      margin-left: 19px;
    }
    
  }
}
</style>
