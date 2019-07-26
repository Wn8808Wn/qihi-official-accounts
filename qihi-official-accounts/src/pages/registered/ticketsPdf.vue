<template>
    <div class="ticketsPdfPage">
        <div class="ticketBox ticketWarpper" ref="ticketWarpper">
            <div class="titleTop"><span>报考级别</span><span>{{examLevels}}</span></div>
            <ul class="content">
                <li v-for="(item,index) in ticketList" :key="index">
                    <input type="checkbox" :id='item.chessPlayerId' :value="item" v-model="checkList" @change="selectCurrentTicket(item,index)">
                    <label  :for='item.chessPlayerId'></label>
                    <span>{{item.playerName}}的准考证.pdf</span>
                    <button @click="downTickets(item)">打开</button>
                </li>    
            </ul>
        </div>
        <div class="pageBottom">
            <p class="checkBtn">
               <input type="checkbox" id="selectAll"  v-model="allChoose" @click="selectCurrentAll">
               <label class="lab" for='selectAll'></label>
               <span>全选</span>
            </p>
            <p class="emailBtn" @click="emailBtn">
              发送到邮箱
            </p>
        </div>  
    </div>
</template>

<script>
import Bscroll from 'better-scroll';
export default {
  data() {
    return {
      ticketList: [],
      checkList: [],
      allChoose:false,
      examLevels:'',
      htmlTitle:''
    };
  },
  methods: {
      selectCurrentTicket(item,index) {
          if(this.checkList.length === this.ticketList.length){
              this.allChoose = true;
          }else{
            this.allChoose = false;
          }
      },
      selectCurrentAll(){
          this.allChoose = !this.allChoose;
          if(this.allChoose){
            this.checkList = this.ticketList;
            
          }else{
            this.checkList =[];
          }
      },
      downTickets(item){
        this.htmlTitle = item.playerName+'的准考证';
         alert('功能开发中')
        // this.getPdf('#pdfDom');
      },
      emailBtn(){
        alert('功能开发中')
      },
      initScrollBox(){
          if(this.ticketList!== undefined && this.ticketList!== null && this.ticketList.length>0 ){
              let totalHeight = 52*this.ticketList.lenght;
              console.log(totalHeight,'00')
              if(totalHeight <= 539){
                  this.$refs.ticketWarpper.style.heigth = totalHeight+'px';
                  console.log(this.$refs.ticketWarpper.style.heigth,'123')
                  this.$nextTick(()=>{
                      if (!this.scroll) {
                          this.scroll=new Bscroll(this.$refs.ticketWarpper, {
                          click:true,
                          });
                      }else{
                          this.scroll.refresh()
                      }
                  });
              }else{
                  this.$refs.ticketWarpper.style.heigth = '539px';
                  console.log(this.$refs.ticketWarpper.style.heigth,'321')
                  this.$nextTick(()=>{
                  if (!this.scroll) {
                      this.scroll=new Bscroll(this.$refs.ticketWarpper, {
                      click:true,
                      });
                  }else{
                      this.scroll.refresh()
                  }
                  });
              }
          }
      }
  },
  created(){
    this.examLevels = this.$route.query.examLevels;
    this.ticketList = JSON.parse(this.$route.query.playerList);
    // console.log(this.ticketList,'this.ticketList')
    this.$nextTick(() => {
        this.initScrollBox();
    });
  }
};
</script>

<style lang='scss' scoped>
@import "../../style/mixin.scss";
.ticketsPdfPage {
  width: 100%;
  height: calc(100% -12px);
  padding-top: 12px;
  background: $bg-color;
  .ticketWarpper{

  }
  &>.ticketBox {
    width: 359px;
    overflow: hidden;
    // height: 539px;
    margin: 0 auto;
    background: $bg-color; 
    // background: red;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
    border-radius: 14px;
    & > .titleTop {
      height: 54px;
      width: 100%;
      line-height: 54px;
      background: #ffffff;
      & > span {
        font-size: 16px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        &:first-child {
          margin-left: 16px;
          margin-right: 12px;
        }
      }
    }
    & > .content {
      width: 100%;
      & > li {
        width: 327px;
        background: rgba(255, 255, 255, 1);
        height: 19px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content:space-between;
        padding: 16px;
        border-top: 1px solid #e5e5e5;
        &>span{
            font-size:14px;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:20px;
            margin-left: -99px;
        }
        &>button{
            outline: none;
            border: none;
            background: #ffffff;
            border-radius:14px;
            font-size: 14px;
            line-height: 20px;
            padding: 4px 16px;
            color: rgba(32,105,229,1);
            border:1px solid rgba(32,105,229,1);
        }
       input[type="checkbox"] {
          display: none;
        }
        input[type="checkbox"] + label::before {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: url("../../assets/imgs/noSelect.svg");
          background-size: 100% 100%;
          content: "";
          left: 16px;
          top: 16px;
          position: absolute;
        }
        input[type="checkbox"]:checked + label::before {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          content: "";
          left: 16px;
          top: 16px;
          position: absolute;
          background: url("../../assets/imgs/selected.svg");
          background-size: 100% 100%;
        }
      }
    }
  }

  //底部按钮
  &>.pageBottom{
    width: 100%;
    height: 52px;
    position: fixed;
    left: 0;
    bottom: 0;
    &>.checkBtn{
      width: 195px;
      height: 52px;
      line-height: 1;
      float: left;
      position: relative;
      background: #ffffff;
      &>span{
        position: absolute;
        left:40px;
        top: 21px;
      }
      input[type="checkbox"] + label::before {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: url("../../assets/imgs/noSelect.svg");
        background-size: cover;
        content: "";
        left: 16px;
        top: 16px;
        position: absolute;
      }
      input[type="checkbox"]:checked + label::before {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        content: "";
        left: 16px;
        top: 16px;
        position: absolute;
        background: url("../../assets/imgs/selected.svg");
        background-size: cover;
      }
    }
    
    &>.emailBtn{
      width:180px;
      height:52px;
      font-size:16px;
      float: left;
      text-align: center;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:rgba(255,255,255,1);
      line-height:52px;
      background:linear-gradient(135deg,rgba(243,93,46,1) 0%,rgba(237,26,35,1) 100%);
    }

  }
}
</style>
