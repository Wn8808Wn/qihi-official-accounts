<template>
    <div class="sucessApplyPage">
        <div class="innerBox">
            <div class="bannderBox">
                <img src="../../assets/imgs/duigou.svg" alt="">
                <span>报名成功</span>
            </div>
            
            <div class="stepLine">
                <timeline>
                    <timeline-item>
                        <h4>支付成功，完成报名</h4>
                    </timeline-item>
                    <timeline-item>
                        <h4> 下载、打印准考证</h4>
                        <p>请下载、打印报考棋手的准考证，棋手 将凭借准考证入场考试</p>
                    </timeline-item>
                    <timeline-item>
                        <h4> 入场考试</h4>
                        <p>根据报考信息到指定考场完成考试</p>
                    </timeline-item>
                    <timeline-item>
                        <h4> 成绩通知</h4>
                        <p>若考试通过将收到段位证书认证通知</p>
                    </timeline-item>
                </timeline>
            </div>
            <div class="btnGroup">
                  <button  class="seeOrder">查看订单</button>
                  <button  class="seeTicket">查看准考证</button>
            </div>
        </div>


    </div>
</template>

<script>
import { Timeline, TimelineItem } from 'vux'
export default {
    components: {
        Timeline,
        TimelineItem
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
    background: #F4F4F4;
    .innerBox{
        width: 100%;
        height: 100%;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 6px 0px rgba(0,0,0,0.05);
        border-radius:14px;
        .bannderBox{
            height: 124px;
            width: 100%;
            background: url('../../assets/imgs/success.svg') no-repeat;
            background-size: cover;
            &>img{
                width: 30px;
                height: 30px;
                float: left;
                margin-top: 40px;
                margin-left: 107px;
                margin-right: 11px;
                object-fit: cover;
            }
            &>span{
                font-size:20px;
                float: left;
                margin-top: 40px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(255,255,255,1);
                line-height:28px;
            }
        }
        //步骤线样式
        .stepLine{
            .vux-timeline{
                padding: 47px 24px 44px 24px;
                & /deep/ .vux-timeline-item-color, .vux-timeline-item-head{
                    width: 20px;
                    height: 20px;
                    left: -4px;
                    top: 0px;
                    background:url('../../assets/imgs/2.svg') no-repeat -0px -0px;
                    background-size: cover;
                }

                & /deep/ .vux-timeline-item-head-first{
                    width: 20px;
                    height: 20px;
                    background: #2069E5;
                    top: 0px;
                    & /deep/ i:before{
                        content: '';
                        width: 20px;
                        height: 20px;
                        display: inline-block;
                        background:url('../../assets/imgs/1.svg') no-repeat -3px -3px;
                        background-size: cover;
                    }
                }
                & /deep/  .vux-timeline-item-checked.weui-icon-success-no-circle:before{
                    content: ''!important;
                    color: blue;
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
                        margin-bottom: 4px;
                    }
                    p{
                        font-size:14px;
                        font-family:PingFang-SC-Medium;
                        font-weight:500;
                        color:rgba(102,102,102,1);
                        line-height:20px;
                        margin-bottom: 28px;
                    }
                }
            }
            
        }
        .btnGroup{
            width: calc(100% - 56px);
            margin-top: 16px;
            padding: 0 28px;
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
