<template>
    <div class="orderDetailsPage">
        <div class="waitPayTop">
            <div class="waitPay">
                <img src="../../assets/imgs/timer.svg">
                <div>
                    <p>等待付款</p>
                    <p>座位已成功锁定,请在<clocker :time="time1" format='%M 分 %S 秒' @on-finish = "showTitle"></clocker>内完成支付</p>
                </div>
            </div>
            <div class="infoBox">
                <h3>{{examRoomName}}</h3>
                <div class="bottomBorderBox">
                    <p>
                        <span>考试地点</span>
                        <span>{{address}}</span>
                     </p>
                    <p>
                        <span>考试级别</span>
                        <span>{{examLevelTitle}}</span>
                    </p>
                    <p>
                        <span>考试时间</span>
                        <span>{{time}}</span>
                    </p>

                </div>

                <div class="bottomBorderBox">
                    <p>
                        <span>联&nbsp;&nbsp;系&nbsp;&nbsp;人</span>
                        <span>小智15613119863</span>
                     </p>
                    <p>
                        <span>发票信息</span>
                        <span>[企业]棋智科技有限公司</span>
                    </p>
                </div>

                <div class="bottomBorderBox">
                    <p>
                        <span>订单编号</span>
                        <span>E2018120514203100900</span>
                     </p>
                    <p>
                        <span>下单时间</span>
                        <span>2018-12-05 14:20:31</span>
                    </p>
                </div>
                <div class="bottomBar">
                    <p><i class="iconfont icon-lianxikefu"></i><span>联系客服</span></p>
                    <p><i class="iconfont icon-chakandingdan"></i><span>取消订单</span></p>
                </div>
            </div>
            <div class="applyPlayerList">
                    <div v-for="(item,index) in list" :key="index" class="commonBox">
                        <p>
                        <span>{{item.name}}</span>
                        <span>{{item.id}}}</span>
                        </p>
                        <p>
                            <span>电话号码</span>
                            <span>{{item.phone}}</span>
                        </p>
                        <p>
                            <span>报名费用</span>
                            <span>¥{{item.cost}}</span>
                        </p>

                    </div>

            </div>
        </div>

         <div class="fixedBox">
            <p><span>合计:</span> <i>¥</i><span>{{totalPrice}}</span></p>
            <button @click="submitExamTime" :class="{'allowClick':disabled === false}" :disabled="disabled" >
                提交订单
            </button>
        </div>     
    </div>

</template>

<script>
import { Clocker, Cell, Group } from 'vux'
export default {
    components: {
            Clocker,
            Cell,
            Group
    },
    data(){
        return{
            time1: this.formatDate(new Date(), "YYYY-MM-DD hh:mm:ss"),
            examRoomName:'龙岗区考场',
            examLevelTitle:'10级',
            address:'黑龙江省哈尔滨市围棋协会二楼黑龙江省哈尔滨市围',
            time:'12-20 09:00至09:30',
            disabled:false,
            totalPrice:660,
            list:[
                {
                    name:'浓哥',
                    id:'12321321321313',
                    phone:'1231231313213',
                    cost:150
                },
                {
                    name:'浓哥',
                    id:'11112312321321321313',
                    phone:'123123131321',
                    cost:150
                },
                ]
        }
    },
    methods:{
        showTitle(){
            alert('请重新下单')
        },
        submitExamTime(){

        }
    },
    mounted(){
        let t = new Date().getTime()+30*1000*60;
        this.time1 = this.formatDate(t, "YYYY-MM-DD hh:mm:ss")
    }
}
</script>


<style lang='scss' scoped>
@import "../../style/mixin.scss";
.orderDetailsPage{
    width: 375px;
    height: 100%;
    background: $bg-color;
    &>.waitPayTop{
        position: relative;
        height: 104px;
        width: 375px;
        background:url('../../assets/imgs/waitPay.svg') no-repeat;
        &>.waitPay{
            width: 100%;
            height: 73px;
            display: flex;
            align-items: center;
                &>img{
                    width: 32px;
                    height: 32px;
                    margin-left: 23px;
                    margin-right: 7px;
                }
                &>div{
                    &>p:first-child{
                        font-size:16px;
                        font-weight:600;
                        line-height:22px;
                    }
                    &>p{
                        font-size:14px;
                        color:rgba(255,255,255,1);
                        line-height:20px;
                    }
                }
        }
    
        &>.infoBox{
            width: 359px;
            font-family: PingFangSC-Semibold;
            background:rgba(255,255,255,1);
            box-shadow:0px 0px 6px 0px rgba(0,0,0,0.05);
            border-radius:14px;
            position: absolute;
            top: 73px;
            left: 8px;
            padding: 0;
            &>h3{
                width: 327px;
                padding: 16px;
                border-bottom: 1px solid #E5E5E5;
                font-size: 16px;
                font-weight: 600;
                color: rgba(51, 51, 51, 1);
                line-height: 22px;
            }
            &>.bottomBorderBox{
                padding: 16px;
                border-bottom: 1px solid #E5E5E5;
                &>p{
                    margin-bottom:8px;
                    & > span {
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 20px;
                        font-size:14px;
                    }
                    & > span:nth-of-type(1) {
                        color: #666666;
                        float: left;
                        margin-right: 16px;
                    }
                    & > span:nth-of-type(2) {
                        color: #333333;
                        width: 249px;
                        display: inline-block;
                    }
                    &:last-child{
                        margin-bottom: 0px;
                    }
                }
            }
            &>.bottomBar{
                display: flex;
                align-items: center;
                &>p{
                    flex: 1;
                    height: 52px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &>span{
                        font-size:14px;
                        font-family:PingFang-SC-Medium;
                        font-weight:500;
                        color:rgba(32,105,229,1);
                        line-height:20px;
                    }
                    &>i{
                        color:rgba(32,105,229,1);
                        font-size: 16px;
                        margin-right: 2px;
                    }
                }
            }
        }
        &>.applyPlayerList{
            width:359px;
            background:rgba(255,255,255,1);
            box-shadow:0px 0px 6px 0px rgba(0,0,0,0.05);
            border-radius:14px;
            // background: skyblue;
            position: absolute;
            left: 8px;
            top: 480px;
        }
    }    
}
</style>
