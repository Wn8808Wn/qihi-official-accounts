webpackJsonp([27],{fbsv:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("/QXl"),i=(a("CtzY"),a("0+Q0")),r=a("Q/W4"),n=a("oast"),o=(i.a,r.a,n.a,{components:{Cell:i.a,Group:r.a,XButton:n.a},data:function(){return{leveNames:"",totalPerson:null,linkman:"",phone:"",orderNo:"",createdTime:"",totalPrice:"",unitPrice:"",payOffTime:"",disabled:!1,showCofirm:!1,certificateList:[]}},created:function(){var t=this;this.$nextTick(function(){t.scroll=new e.a(t.$refs.orderDetailsPageWrapper,{click:!0})}),console.log(JSON.parse(sessionStorage.getItem("detailsObj")));var s=JSON.parse(sessionStorage.getItem("detailsObj"));this.orderNo=s.orderNo,this.createdTime=s.createdTime,this.certificateList=s.certificateList,this.totalPrice=s.totalPrice,this.unitPrice=s.unitPrice,this.totalPerson=this.certificateList.length,this.leveNames=this.certificateList[0].leveNames,this.payOffTime=sessionStorage.getItem("certificatePayOffTime")}}),c={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"orderDetailsPage"},[a("div",{ref:"orderDetailsPageWrapper",staticClass:"orderDetailsPageWrapper"},[a("div",{staticClass:"content"},[a("div",{staticClass:"topPart"},[a("div",{staticClass:"waitPayTop"},[t._m(0),t._v(" "),a("div",{staticClass:"infoBox"},[a("div",{staticClass:"bottomBorderBox"},[a("p",{staticClass:"orderNumberP"},[a("span",[t._v("运单编号")]),t._v(" "),a("span",[t._v("1010201233123")]),t._v(" "),a("x-button",{staticStyle:{"border-radius":"14px"},attrs:{plain:"",type:"primary"}},[t._v("复制")])],1),t._v(" "),t._m(1)]),t._v(" "),t._m(2),t._v(" "),a("div",{staticClass:"bottomBorderBox"},[a("p",{staticClass:"orderNumberP"},[a("span",[t._v("订单编号")]),t._v(" "),a("span",[t._v(t._s(t.orderNo))]),t._v(" "),a("x-button",{staticStyle:{"border-radius":"14px"},attrs:{plain:"",type:"primary"}},[t._v("复制")])],1),t._v(" "),a("p",[a("span",[t._v("下单时间")]),t._v(" "),a("span",[t._v(t._s(t.createdTime))])]),t._v(" "),a("p",[a("span",[t._v("付款时间")]),t._v(" "),a("span",[t._v(t._s(t.payOffTime))])])]),t._v(" "),t._m(3)])])]),t._v(" "),a("div",{staticClass:"infoTop"},[a("p",[t._v("中国围棋协会段级位认证服务")]),a("span",[t._v("认证级别:"+t._s(t.leveNames))]),t._v(" "),a("span",[t._v(t._s(t.totalPerson)+"人")])]),t._v(" "),a("div",{staticClass:"applyPlayerList"},t._l(t.certificateList,function(s,e){return a("div",{key:e,staticClass:"commonBox"},[a("p",[a("span",{staticClass:"firstSpan"},[t._v(t._s(s.playerName))]),t._v(" "),a("span",[t._v(t._s(s.certificateNo))])]),t._v(" "),a("p",{staticClass:"commonTagP"},[a("span",[t._v("电话号码")]),t._v(" "),a("span",[t._v(t._s(s.phone))])]),t._v(" "),a("p",{staticClass:"commonTagP"},[a("span",[t._v("认证服务费")]),t._v(" "),a("span",{staticStyle:{color:"#ED1A23"}},[a("i",{staticStyle:{"font-style":"normal",color:"#ED1A23","font-size":"14px"}},[t._v("¥")]),t._v(" "+t._s(t.unitPrice))])])])}),0),t._v(" "),a("div",{staticClass:"totalBox"},[a("span",[t._v("费用合计")]),t._v(" "),a("span",[t._v("¥"+t._s(t.totalPrice))])])])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"waitPay"},[s("img",{attrs:{src:a("fkUd")}}),this._v(" "),s("div",[s("p",[this._v("已付款")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("span",[this._v("收件信息")]),this._v(" "),s("span",[s("span",{staticClass:"defaultSpan"},[this._v("默认")]),this._v("小智15613119863")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"bottomBorderBox"},[s("p",[s("span",[this._v("发票信息")]),this._v(" "),s("span",[this._v("[企业]棋智科技有限公司")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"bottomBar"},[s("p",[s("i",{staticClass:"iconfont icon-lianxikefu"}),s("span",[this._v("联系客服")])])])}]};var v=a("C7Lr")(o,c,!1,function(t){a("zNTv")},"data-v-1e9df379",null);s.default=v.exports},zNTv:function(t,s){}});
//# sourceMappingURL=27.21fcffa4f481d9d24a36.js.map