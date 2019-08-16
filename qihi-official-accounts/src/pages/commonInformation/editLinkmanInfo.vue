<template>
    <div class="addLinkmanPage">
         <div class="formTable">
            <p><span>姓名</span> <input type="text" v-model="linkmanName"  placeholder="请输入姓名" @blur="checkPlayerPhone" ></p>
            <p><span>电话号码 +86</span> <input type="text" v-model="phone"  placeholder="请输入手机号" @blur="checkPlayerPhone" ></p>
            <p><span>邮箱</span> <input type="text" v-model="email"  placeholder="请输入邮箱" @blur="checkPlayerPhone" ></p>
            <p><span>设置为默认联系人</span><inline-x-switch v-model="isDefault"></inline-x-switch></p>
        </div>

         <div class="twoBtns">
            <button class="saveBtn" @click="saveDate">保存</button>
            <button  class="saveBtn2" @click="delBtn" >删除</button>
            <button @click="cancleBtn">取消</button>
        </div>
        <div v-transfer-dom class="delPlayers">
          <confirm v-model="showCofirm"
          @on-cancel="onCancel"
          @on-confirm="onConfirm"
          >
            <p style="text-align:center;">确认删除该棋手吗？</p>
          </confirm>
        </div>
    </div>
</template>

<script>
import qs from "qs";
import { InlineXSwitch,TransferDom,Confirm} from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    InlineXSwitch,
    Confirm
  },
  data() {
    return {
      linkmanName: "",
      phone: "",
      email: "",
      isDef: 0,
      isDefault: false,
      id: "",
      showCofirm: false,
    };
  },
  methods: {
    checkPlayerPhone() {},
    saveDate() {
      if (this.isDefault) {
        this.isDef = 0;
      } else {
        this.isDef = 1;
      }
      let params = {
        id:this.id,
        linkman: this.linkmanName,
        phone: this.phone,
        email: this.email,
        isDef: this.isDef
      };
      this.$axios.post("/api/linkman/edit", qs.stringify(params)).then(res => {
        if (res.data.code == 0) {
          //回到联系人页面
          this.$router.push({ name: "commonInformation" });
        }
      });
    },
    onConfirm() {
      let params = {
        id: this.id
      };
      this.$axios.get("/api/linkman/del", { params }).then(res => {
        if (res.data.code == 0) {
          //回到联系人页面
          this.$router.push({ name: "commonInformation" });
        }
      });
    },
    delBtn(){
      this.showCofirm = true;
    },
    onCancel() {
      this.showCofirm = false;
    },
    cancleBtn() {
      //回到联系人页面
      this.$router.push({ name: "commonInformation" });
    }
  },
  created() {
    let obj = JSON.parse(sessionStorage.getItem("editCurrentLinkmanInfo"));
    let id = obj.id;
    let params = {
      id: id
    };
    this.$axios.get("/api/linkman/get_by_id", { params }).then(res => {
      console.log(res);
      if (res.data.code == 0) {
        let rst = res.data.data;
        this.linkmanName = rst.linkman;
        this.phone = rst.phone;
        this.email = rst.email;
        this.isDef = rst.isDef;
        this.id = rst.id;
        if (rst.isDef == 0) {
          this.isDefault = true;
        } else {
          this.isDefault = false;
        }
      }
    });
  }
};
</script>

<style lang='scss' scoped>
.addLinkmanPage {
  width: 100%;
  height: calc(100% - 12px);
  padding-top: 12px;
  background: #f4f4f4;
  & > .formTable {
    width: 359px;
    height: 208px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
    border-radius: 14px;
    & > p {
      height: 19px;
      padding: 16px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e5e5e5;
      & > span {
        color: #666666;
      }
      & > input {
        border: none;
        width: 100px;
        float: right;
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
  }
  .twoBtns {
    width: calc(100% - 48px);
    margin-top: 36px;
    height: 44px;
    padding: 0 24px;
    & > button {
      padding: 11px 29px;
      font-size: 16px;
      color: #2069e5;
      font-weight: 600;
      background: #f4f4f4;
      border-radius: 22px;
      border: 1px solid #2069e5;
    }
    .saveBtn {
      margin-right: 17px;
    }
    .saveBtn2 {
      margin-right: 22px;
    }
  }
}
</style>
