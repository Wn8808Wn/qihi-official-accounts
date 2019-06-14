<template>
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
</template>

<script>
export default {
    data(){
        return{
            showPopup: false,
        }
    },
    methods:{
        // 弹层取消
        cancleBtn() {
        this.showPopup = false;
        },
        log(aa) {
        // console.log(aa);
        },
    }
}
</script>


<style lang='scss' scoped>
//弹窗样式
.vux-popup-dialog {
  height: 386px;
  width: 100%;
  background: #ffffff !important;
  border-radius: 12px 12px 0px 0px;
}
.PopupTop {
  width: 375px;
  height: 46px;
  border-bottom: 1px solid #e5e5e5;
  background: rgba(250, 250, 250, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > p {
    font-size: 16px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
    margin-left: 12px;
  }
  & > span {
    font-size: 14px;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
    margin-right: 12px;
  }
}
.popupContent {
  & > li {
    margin-left: 34px;
    margin-right: 16px;
    list-style-image: url("../../../assets/imgs/point.png");
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