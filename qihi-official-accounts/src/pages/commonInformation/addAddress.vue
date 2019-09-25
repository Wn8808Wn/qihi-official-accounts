<template>
    <div class="addLinkmanPage">
         <div class="formTable">
            <p><span>收件人</span> <input type="text" v-model="linkman"  placeholder="请输入收件人姓名"></p>
            <p><span>手机号码 +86</span> <input type="text" v-model="phone"  placeholder="请输入手机号"></p>
            <x-address  title=" " v-model="addressList" :list="addressData" @on-shadow-change="onShadowChange" placeholder="请选择省/市/区" inline-desc="所在地区" :show.sync="showAddress"></x-address>
            <p><span>详细地址</span> <input type="text" v-model="address"  placeholder="如小区、楼号、单元号、门牌号" ></p>
            <p><span>设置为默认地址</span><inline-x-switch v-model="isDefault"></inline-x-switch></p>
        </div>
       <button class="saveBtn" @click="saveDate">保存</button>
    </div>
</template>

<script>
import qs from "qs";
import {InlineXSwitch,XAddress,ChinaAddressV4Data,Group,Value2nameFilter as value2name} from "vux";
export default {
  components: {
    InlineXSwitch,
    XAddress,
    Group
  },
  data() {
    return {
      linkman: "",
      phone: "",
      isDef: 0,
      address: "",
      addressList: [],
      addressData: ChinaAddressV4Data,
      isDefault: false,
      showAddress: false,
      province:'',
      city:'',
      distric:'',
    };
  },
  methods: {
    checkPlayerPhone() {},
    saveDate() {
      if (this.isDefault) {
        this.isDef = 0;  //是 
      } else {
        this.isDef = 1;  //否
      }
      let params = {
        linkman: this.linkman,
        phone: this.phone,
        isDef: this.isDef,
        province:this.province,
        city:this.city,
        distric:this.distric,
        address:this.address
      };
      // console.log(params,'params')
      this.$axios.post("/api/address/address_add", qs.stringify(params)).then(res => {
        if (res.data.code == 0) {
            console.log(res)
            this.$router.push({ name: "commonInformation" });
        }
      });
    },
    onShadowChange (ids,names) {
      console.log(names)
      this.province = names[0];
      this.city = names[1];
      this.distric = names[2];

    },
    cancleBtn() {
      this.$router.push({ name: "commonInformation" });
    }
  }
};
</script>

<style lang='scss' scoped>
.addLinkmanPage {
  width: 100%;
  height: calc(100% - 12px);
  padding-top: 12px;
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > .formTable {
    width: 359px;
    height: 260px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
    border-radius: 14px;
    & > p {
      height: 19px;
      padding: 16px;
      font-size: 14px;
      width: calc(100% - 32px);
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e5e5e5;
      & > span {
        color: #666666;
      }
      & > input {
        border: none;
        width: 200px;
        color: #000;
        font-size: 14px;
        text-align: right;
        padding-right: 2px;
        background: #ffffff;
      }
      &:last-child {
        border-bottom: 0;
      }
      // switch按钮样式
      & /deep/ .weui-switch,
      .weui-switch-cp__box {
        height: 14px;
        width: 40px;
      }
      & /deep/ .weui-switch-cp__input:checked ~ .weui-switch-cp__box,
      .weui-switch:checked {
        background-color: #2069e5;
        border: none;
        height: 14px;
        width: 40px;
      }

      & /deep/ .weui-switch-cp__box:before,
      .weui-switch:before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 14px;
        border-radius: 14px;
        background-color: #b0b0b0;
      }
      & /deep/ .weui-switch-cp__box:after,
      .weui-switch:after {
        width: 24px;
        height: 24px;
        top: -6px;
        left: -2px;
        content: "";
      }
    }
    & /deep/ .vux-cell-box {
      height: 51px;
      width: 100%;
      border-bottom: 1px solid #e5e5e5;
      & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > .weui-cell__hd {
          height: 51px;
          line-height: 51px;
          padding-left: 16px;
        }
        & /deep/ .vux-cell-primary {
          padding-right: 16px;
        }
        & /deep/ .vux-popup-picker-placeholder {
          font-size: 14px;
          color: #666;
        }
      }
    }
    & /deep/ .vux-cell-box:not(:first-child):before {
      border-top: none;
    }
  }
  .saveBtn {
    width: 280px;
    margin-top: 36px;
    height: 44px;
    font-size: 16px;
    color: #2069e5;
    font-weight: 600;
    background: #f4f4f4;
    border-radius: 22px;
    border: 1px solid #2069e5;
  }
}
// .vux-popup-header-right{
//     color:#000;
// }
</style>

