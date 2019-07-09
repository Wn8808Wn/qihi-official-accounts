<template>
    <div class="orderDetailsPage">
        <div class="orderDetailsPageWrapper"  ref="orderDetailsPageWrapper">
            <div class="content">
                <div class="topPart">
                    <div class="waitPayTop">
                        <div class="waitPay">
                            <img src="../../assets/imgs/timer.svg">
                            <div>
                                <p>已付款</p>
                            </div>
                        </div>
                        <div class="infoBox">
                            <div class="bottomBorderBox">
                                <p class="orderNumberP">
                                    <span>订单编号</span>
                                    <span>1010201233123</span>
                                    <x-button plain type="primary" style="border-radius:14px;">复制</x-button>
                                </p>
                                <p>
                                    <span>收件信息</span>
                                    <span><span class="defaultSpan">默认</span>小智15613119863</span>
                                </p>
                            </div>

                            <div class="bottomBorderBox">
                                <p>
                                    <span>发票信息</span>
                                    <span>[企业]棋智科技有限公司</span>
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
                <div class="infoTop">
                    <p>中国围棋协会段级位认证服务</p><span>认证级别:{{leveNames}}</span> <span>{{totalPerson}}人</span>
                </div>
                <div class="applyPlayerList">
                        <div v-for="(item,index) in certificateList" :key="index" class="commonBox">
                            <p>
                            <span class="firstSpan">{{item.playerName}}</span>
                            <span>{{item.certificateNo}}</span>
                            </p>
                            <p class="commonTagP">
                                <span>电话号码</span>
                                <span>{{item.phone}}</span>
                            </p>
                            <p class="commonTagP">
                                <span>认证服务费</span>
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
import {  Cell, Group,XButton} from 'vux'
export default {
    components: {
        Cell,
        Group,
        XButton,
    },
    data(){
        return{
            leveNames:'',
            totalPerson:null,
            linkman:'',
            phone:'',
            orderNo:'',
            createdTime:'',
            totalPrice:'',
            unitPrice:'',
            payOffTime:'',
            disabled:false,
            showCofirm:false,
            certificateList:[]
        }
    },
    created(){
        this.$nextTick(() => {
            this.scroll = new Bscroll(this.$refs.orderDetailsPageWrapper, {click: true});
        });
        console.log(JSON.parse(sessionStorage.getItem("routerObj")))
        let routerObj = JSON.parse(sessionStorage.getItem("routerObj"))
        this.orderNo = routerObj.orderNo;
        this.createdTime = routerObj.createdTime;
        this.certificateList =routerObj.playerslist;
        this.totalPrice = routerObj.totalPrice;
        this.unitPrice = routerObj.unitPrice;
        this.totalPerson = this.certificateList.length;
        this.leveNames =  this.certificateList[0].leveNames;
        // 请求获取支付时间
        let params = {
            orderId:routerObj.orderId,
            payFee:routerObj.totalPrice,
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
                height: 363px;
                width: 100%;
                position: relative;
                &>.waitPayTop{
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
                                    .defaultSpan{
                                        font-size: 12px;
                                        font-weight: 500;
                                        height: 18px;
                                        width: 36px;
                                        float: left;
                                        text-align: center;
                                        line-height: 21px;
                                        margin-right: 4px;
                                        color: rgba(255, 255, 255, 1);
                                        background: rgba(32, 105, 229, 1);
                                        border-radius: 10px;
                                    }
                                }
                                
                                &:last-child{
                                    margin-bottom: 0px;
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
                                &>i{
                                    color:rgba(32,105,229,1);
                                    font-size: 16px;
                                    margin-right: 8px;
                                }
                            }
                        }
                    }
                } 
            } 
            &>.infoTop{
                width:calc(100% - 24px);
                height: 52px;
                padding-left: 24px;
                line-height: 52px;
                &>p{
                    font-size:14px;
                    float: left;
                    color:rgba(51,51,51,1);
                }
                &>span{
                    float: left;
                    margin-left: 12px;
                    font-size: 12px;
                    color:#666666;
                }
            }
            &>.applyPlayerList{
                width:359px;
                margin: 0 auto;
                background:rgba(255,255,255,1);
                box-shadow:0px 0px 6px 0px rgba(0,0,0,0.05);
                border-radius:14px;
                overflow: hidden;
                &>.commonBox{
                    border-radius: 0;
                    border-bottom: 1px solid #E5E5E5;
                    &>p:nth-of-type(1){
                        width: 100%;
                        height: 22px;
                        margin-bottom: 16px;
                        &>span{
                            font-size:16px;
                            font-weight:600;
                            float: left;
                            color:rgba(51,51,51,1);
                            line-height:22px;
                        }
                        &>.firstSpan{
                            width: 70px;
                            height: 22px;
                            overflow: hidden;
                            margin-right: 8px;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                    }
                    .commonTagP {
                            width: 100%;
                            height: 20px;
                            margin-bottom: 8px;
                        & > span {
                            width: 70px;
                            font-size: 14px;
                            font-weight: 500;
                            float: left;
                            line-height: 20px;
                        }
                        & > span:nth-of-type(1) {
                            color: #666666;
                            margin-right: 8px;
                        }
                        & > span:nth-of-type(2) {
                            color: #333333;
                            width: 240px;
                            float: left;
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
                padding: 16px;
                margin: 0 auto;
                margin-top: 12px;
                background:rgba(255,255,255,1);
                box-shadow:0px 0px 6px 0px rgba(0,0,0,0.05);
                border-radius:14px;
                &>span{
                    height: 20px;
                    font-size: 14px;
                    color: #666666;
                    margin-right: 16px;
                    &:nth-of-type(2){
                        font-size:14px;
                        color:rgba(237,26,35,1);
                    }
                }
            }       
        }
    }
}
</style>
