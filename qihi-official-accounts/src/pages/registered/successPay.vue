<template>
    <div class="sucessApplyPage">
        <div class="innerBox">
            <div class="bannderBox">
                <div class="imgBox"><img src="../../assets/imgs/duigou.svg" alt="" ></div>
                <span>付款成功</span>
            </div>
            <div class="stepLine">
                <timeline>
                    <timeline-item class="one">
                        <h4>支付成功，提交认证</h4>
                    </timeline-item>
                    <timeline-item class="two">
                        <h4>认证通过，证书发放</h4>
                    </timeline-item>
                    <timeline-item class="three">
                        <h4>证书查收</h4>
                    </timeline-item>
                </timeline>
            </div>
            <div class="btnGroup">
                  <button  class="seeOrder">查看订单</button>
                  <button  class="seeTicket">证书查询</button>
            </div>
        </div>


    </div>
</template>

<script>
import { Timeline, TimelineItem} from 'vux'
export default {
    components: {
        Timeline,
        TimelineItem,
    },
    data(){
        return{

        }
    },
    methods:{

    }
}
</script>

<style lang='scss' scoped>
.sucessApplyPage{
    width: calc(100% -40px);
    height: calc(100% -40px);
    padding: 20px;
    background:rgba(244,244,244,1);
    &>.innerBox{
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 6px 0px rgba(0,0,0,0.05);
        border-radius:14px;
        &>.bannderBox{
            width: 336px;
            height:30px;
            // height: 124px;
            padding-top: 40px;
            padding-bottom: 54px;
            background-color: red; 
            background: url('../../assets/imgs/success.svg') no-repeat;
            background-size: 100% 100%;
            &>.imgBox{
                width: 30px;
                height: 30px;
                float: left;
                margin-left: 107px;
                margin-right: 11px;
                &>img{
                    width: 100%;
                    height: 100%;
                }
            }
            &>span{
                font-size:20px;
                float: left;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(255,255,255,1);
                line-height:28px;
            }
        }
        //步骤线样式
        &>.stepLine{
            width: 100%;
            &>.vux-timeline{
                padding: 47px 24px 0px 24px;
                & /deep/  .vux-timeline-item-checked.weui-icon-success-no-circle:before{
                    content: ''!important;
                    // color: blue;
                }
                .one /deep/ .vux-timeline-item-color, .vux-timeline-item-head{
                    width: 20px;
                    height: 20px;
                    left: -4px;
                    top: 0px;
                    background:url('../../assets/imgs/1.svg') no-repeat -0px -0px;
                    background-size: cover;
                }
                .two /deep/ .vux-timeline-item-color, .vux-timeline-item-head{
                    width: 20px;
                    height: 20px;
                    left: -4px;
                    top: 0px;
                    background:url('../../assets/imgs/bule2.svg') no-repeat -0px -0px;
                    background-size: cover;
                }
                .three /deep/ .vux-timeline-item-color, .vux-timeline-item-head{
                    width: 20px;
                    height: 20px;
                    left: -4px;
                    top: 0px;
                    background:url('../../assets/imgs/bule3.svg') no-repeat -0px -0px;
                    background-size: cover;
                }
                & /deep/ .vux-timeline-item-content{
                    padding-left: 26px;
                    padding-bottom: 10px;
                    h4{
                        font-size:16px;
                        font-family:PingFangSC-Semibold;
                        font-weight:600;
                        color:rgba(51,51,51,1);
                        line-height:22px;
                        margin-bottom: 28px;
                    }
                   
                }
            }
            & /deep/ .vux-timeline-item-tail{
                width: 1px;
                background-color: #2069E5;
            }
        }
        .btnGroup{
            width: calc(100% - 56px);
            padding: 0 28px;
            flex: 1;
            // padding: 44px 28px 40px 28px;
            display: flex;
            align-items: center;
            button{
                width: 128px;
                height: 42px;
                font-size:16px;
                padding: 0;
                background: #ffffff;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                line-height:22px;
                color: #2069E5;
                border-radius:22px;
                text-align: center;
                border:1px solid rgba(32,105,229,1);
            }
            .seeTicket{
                margin-left: 23px;
            }
        }
    }
}

</style>
