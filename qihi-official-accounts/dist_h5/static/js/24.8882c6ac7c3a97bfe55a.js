webpackJsonp([24],{NRHA:function(e,n){},YG9b:function(e,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=a("CtzY"),i=a.n(t),o=a("Mk6x"),s=a("uiKT"),l=a("zM9A"),r=(s.a,o.a,l.a,{directives:{TransferDom:s.a},components:{InlineXSwitch:o.a,Confirm:l.a},data:function(){return{linkmanName:"",phone:"",email:"",isDef:0,isDefault:!1,id:"",showCofirm:!1}},methods:{checkPlayerPhone:function(){},saveDate:function(){var e=this;this.isDefault?this.isDef=0:this.isDef=1;var n={id:this.id,linkman:this.linkmanName,phone:this.phone,email:this.email,isDef:this.isDef};this.$axios.post("/api/linkman/edit",i.a.stringify(n)).then(function(n){0==n.data.code&&e.$router.push({name:"commonInformation"})})},onConfirm:function(){var e=this,n={id:this.id};this.$axios.get("/api/linkman/del",{params:n}).then(function(n){0==n.data.code&&e.$router.push({name:"commonInformation"})})},delBtn:function(){this.showCofirm=!0},onCancel:function(){this.showCofirm=!1},cancleBtn:function(){this.$router.push({name:"commonInformation"})}},created:function(){var e=this,n={id:JSON.parse(sessionStorage.getItem("editCurrentLinkmanInfo")).id};this.$axios.get("/api/linkman/get_by_id",{params:n}).then(function(n){if(console.log(n),0==n.data.code){var a=n.data.data;e.linkmanName=a.linkman,e.phone=a.phone,e.email=a.email,e.isDef=a.isDef,e.id=a.id,0==a.isDef?e.isDefault=!0:e.isDefault=!1}})}}),c={render:function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{staticClass:"addLinkmanPage"},[a("div",{staticClass:"formTable"},[a("p",[a("span",[e._v("姓名")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.linkmanName,expression:"linkmanName"}],attrs:{type:"text",placeholder:"请输入姓名"},domProps:{value:e.linkmanName},on:{blur:e.checkPlayerPhone,input:function(n){n.target.composing||(e.linkmanName=n.target.value)}}})]),e._v(" "),a("p",[a("span",[e._v("电话号码 +86")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],attrs:{type:"text",placeholder:"请输入手机号"},domProps:{value:e.phone},on:{blur:e.checkPlayerPhone,input:function(n){n.target.composing||(e.phone=n.target.value)}}})]),e._v(" "),a("p",[a("span",[e._v("邮箱")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],attrs:{type:"text",placeholder:"请输入邮箱"},domProps:{value:e.email},on:{blur:e.checkPlayerPhone,input:function(n){n.target.composing||(e.email=n.target.value)}}})]),e._v(" "),a("p",[a("span",[e._v("设置为默认联系人")]),a("inline-x-switch",{model:{value:e.isDefault,callback:function(n){e.isDefault=n},expression:"isDefault"}})],1)]),e._v(" "),a("div",{staticClass:"twoBtns"},[a("button",{staticClass:"saveBtn",on:{click:e.saveDate}},[e._v("保存")]),e._v(" "),a("button",{staticClass:"saveBtn2",on:{click:e.delBtn}},[e._v("删除")]),e._v(" "),a("button",{on:{click:e.cancleBtn}},[e._v("取消")])]),e._v(" "),a("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}],staticClass:"delPlayers"},[a("confirm",{on:{"on-cancel":e.onCancel,"on-confirm":e.onConfirm},model:{value:e.showCofirm,callback:function(n){e.showCofirm=n},expression:"showCofirm"}},[a("p",{staticStyle:{"text-align":"center"}},[e._v("确认删除该棋手吗？")])])],1)])},staticRenderFns:[]};var m=a("C7Lr")(r,c,!1,function(e){a("NRHA")},"data-v-2c2e5eba",null);n.default=m.exports}});
//# sourceMappingURL=24.8882c6ac7c3a97bfe55a.js.map