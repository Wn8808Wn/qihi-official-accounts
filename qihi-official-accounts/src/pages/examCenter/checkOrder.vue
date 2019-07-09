<template>
    <div class="orderDetailsPage">
        <div class="orderDetailsPageWrapper"  ref="orderDetailsPageWrapper">
            <div class="content">
                <div class="topPart">
                    <div class="waitPayTop">
                        <div class="waitPay">
                            <img src="../../assets/imgs/duigou.svg">
                            <div>
                                <p>已付款</p>
                                <p v-if="noRefundStatus">超过退款时限，此订单报名费不再支持退款</p>
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
                                    <span>{{examTime.split(' ')[0].replace(/-/g,'.')}} {{formatDate(examTime, "hh:mm")}}-{{longTimeAgo(examTime,examTime.split(' ')[1],30)}}</span>
                                </p>

                            </div>

                            <div class="bottomBorderBox">
                                <p>
                                    <span>通知手机</span>
                                    <span>{{phone}}</span>
                                </p>
                                <p>
                                    <span>发票信息</span>
                                    <span>[企业]棋智科技有限公司</span>
                                    <x-button plain type="primary" style="border-radius:14px;">申请发票</x-button>
                                </p>
                            </div>

                            <div class="bottomBorderBox">
                                <p class="orderNumberP">
                                    <span>订单编号</span>
                                    <span>{{orderNo}}</span>
                                    <x-button plain type="primary" style="border-radius:14px;">复制</x-button>
                                </p>
                                <p>
                                    <span>下单时间</span>
                                    <span>{{createdTime}}</span>
                                </p>
                                <p>
                                    <span>付款时间</span>
                                    <span>{{payOffTime}}</span>
                                </p>
                            </div>
                            <div class="bottomBar">
                                <p><i class="iconfont icon-lianxikefu"></i><span>联系客服</span></p>
                            </div>
                        </div>
                    </div>        
                </div>    
                <div class="applyPlayerList">
                        <div v-for="(item,index) in playerslist" :key="index" class="commonBox">
                            <p>
                            <span class="firstSpan">{{item.playerName}}</span>
                            <span>{{item.certificateNo}}</span>
                            </p>
                            <p class="commonTagP">
                                <span>电话号码</span>
                                <span>{{item.phone}}</span>
                            </p>
                            <p class="commonTagP">
                                <span>报名费用</span>
                                <span style="color:#ED1A23;"><i style="font-style:normal; color:#ED1A23;font-size:14px;">¥</i> {{unitPrice}}</span>
                            </p>

                        </div>

                </div>
                <div class="totalBox">
                    <span>费用合计</span> <span>¥{{totalPrice}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bscroll from "better-scroll";
import qs from 'qs' // qs在安装axios后会自动安装，只需要组件里import一下即可
import { Cell, Group,XButton,} from 'vux'
export default {
    components: {
            Cell,
            Group,
            XButton,
    },
    data(){
        return{
            noRefundStatus:true,
            examRoomName:'',
            examLevelTitle:'',
            examTime:'',
            address:'',
            linkMan:'',
            phone:'',
            orderNo:'',
            unitPrice:'',
            orderId:'',
            createdTime:'',
            payOffTime:'',
            totalPrice:'',
            playerslist:[]
        }
    },
    methods:{
        longTimeAgo(dateStr, timeStr, long) {
            let s = dateStr.split(" ")[0] + " " + timeStr;
            var new_time_str = s.replace(/-/g, "/");
            var now = new Date(new_time_str);
            var time = now.getTime() + 1000 * 60 * long;
            return this.formatDate(time, "hh:mm");
        },
    },
    created(){
        this.$nextTick(() => {
            this.scroll = new Bscroll(this.$refs.orderDetailsPageWrapper, {click: true});
        });
    },
    mounted(){
      //  缓存数据
        console.log(JSON.parse(sessionStorage.getItem('routerObj')),'000');
        let routerObj = JSON.parse(sessionStorage.getItem('routerObj'));
        this.examRoomName = routerObj.examRoomName;
        this.address = routerObj.address;
        this.examLevelTitle = routerObj.examLevelTitle;
        this.examTime = routerObj.examTime;
        this.linkMan = routerObj.linkMan;
        this.totalPrice = routerObj.totalPrice;
        this.phone = routerObj.phone;
        this.playerslist = routerObj.playerslist;
        this.orderNo = routerObj.orderNo;
        this.createdTime = routerObj.createdTime;
        this.unitPrice =routerObj.unitPrice;
        this.orderId =routerObj.orderId;
        let params = {
            orderId:this.orderId,
            payFee:this.totalPrice,
        }
        this.$axios.post('/api/order/OrderPayment',qs.stringify(params)).then( res => {
            if(res.data.code === 0){
                this.payOffTime = res.data.data;
            }
        })
    }
}
</script>

<style lang='scss' scoped>
@import "../../style/mixin.scss";
.orderDetailsPage{
    width: 375px;
    height: 100%;
    background: $bg-color;
    overflow: hidden;
    .orderDetailsPageWrapper {
        width: 100%;
        height: 100%;  
        overflow: hidden;
        & > .content {
            padding-bottom: 50px;
            &>.topPart{
                height: 490px;
                width: 100%;
                &>.waitPayTop{
                    position: relative;
                    height: 104px;
                    width: 375px;
                    background:url('../../assets/imgs/waitPay.svg') no-repeat;
                    background-size: 100% 100%;
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
                                position: relative;
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
                                .weui-btn_plain-primary{
                                    color: #2069E5;
                                    font-size:14px;
                                    font-family:PingFang-SC-Medium;
                                    font-weight:500;
                                    line-height:20px;
                                    border:1px  solid #2069E5;
                                }
                                button.weui-btn, input.weui-btn{
                                    height: 28px;
                                    width: 78px;
                                    padding: 0;
                                    position: absolute;
                                    right: 0;
                                    top: -5px;
                                }
                            }
                            .orderNumberP{
                                position: relative;
                                .weui-btn_plain-primary{
                                    color: #2069E5;
                                    font-size:14px;
                                    font-family:PingFang-SC-Medium;
                                    font-weight:500;
                                    line-height:20px;
                                    border:1px  solid #2069E5;
                                }
                                button.weui-btn, input.weui-btn{
                                    height: 28px;
                                    width: 60px;
                                    position: absolute;
                                    right: 0;
                                    top: -5px;
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
                                &>.icon-lianxikefu{
                                    color:rgba(32,105,229,1);
                                    font-size: 18px;
                                    margin-right: 2px;
                                }
                            }
                        }
                    }
                }  
            }
            &>.applyPlayerList{
                width: 359px;
                margin: 0 auto;
                overflow: hidden;
                margin-top: 12px;
                background:rgba(255,255,255,1);
                box-shadow:0px 0px 6px 0px rgba(0,0,0,0.05);
                border-radius:14px;
                &>.commonBox{
                    border-radius: 0;
                    border-bottom: 1px solid #E5E5E5;
                    &>p:nth-of-type(1){
                        width: 100%;
                        height: 22px;
                        margin-bottom: 16px;
                        &>span{
                            font-size:16px;
                            font-family:PingFangSC-Semibold;
                            font-weight:600;
                            float: left;
                            color:rgba(51,51,51,1);
                            line-height:22px;
                        }
                        &>.firstSpan{
                            width: 64px;
                            height: 22px;
                            overflow: hidden;
                            margin-right: 8px;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
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
                }
            }
            &>.totalBox{
                width:327px;
                height:20px;
                margin: 0 auto;
                padding: 16px;
                margin-top: 12px;
                background:rgba(255,255,255,1);
                // background: skyblue;
                box-shadow:0px 0px 6px 0px rgba(0,0,0,0.05);
                border-radius:14px;
                &>span{
                    height: 20px;
                    font-size: 14px;
                    color: #666666;
                    margin-right: 16px;
                    &:nth-of-type(2){
                        font-size:14px;
                        font-family:PingFang-SC-Medium;
                        color:rgba(237,26,35,1);
                    }
                }
            }  
        }      
    }
}
</style>
