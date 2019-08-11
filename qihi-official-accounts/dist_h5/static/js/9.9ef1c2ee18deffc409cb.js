webpackJsonp([9],{L8Ho:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("3cXf"),i=s.n(a),c=s("uiKT"),o=s("C5VE"),n=s("SwJJ"),l=(c.a,o.a,n.a,{directives:{TransferDom:c.a},components:{Popup:o.a,CheckIcon:n.a},data:function(){return{showPopup:!1,currentIndex:0,checkList:[],allChoose:!1,disabled:!0,nullDisabled:!0,certificateList:[],hasCertificationList:[]}},computed:{totalPrice:function(){var e=0;return this.checkList.forEach(function(t){e+=t.examFee}),e}},methods:{showPopupPage:function(){this.showPopup=!0},log:function(){},cancleBtn:function(){this.showPopup=!1},selectCurrentPlayer:function(e,t){this.disabled=!1,this.checkList.length===this.hasCertificationList.length?this.allChoose=!0:this.allChoose=!1},selectAll:function(){this.allChoose=!this.allChoose,this.allChoose?(this.checkList=this.hasCertificationList,this.disabled=!1):(this.checkList=[],this.disabled=!0)},hanleApply:function(){sessionStorage.setItem("checkList",i()(this.checkList)),this.$router.push({name:"certificateDetails"})}},created:function(){var e=this,t={examPlanId:this.$route.query.examPlanId,examLevel:this.$route.query.examLevel,orderNo:this.$route.query.orderNo};this.$axios.get("/api/enroll/certificateApply",{params:t}).then(function(t){0===t.data.code&&(console.log(t.data.data,"???"),e.certificateList=t.data.data,e.hasCertificationList=e.certificateList.filter(function(e){return 0==e.examResult&&0==e.certificationType}),0==e.hasCertificationList.length?e.nullDisabled=!0:e.nullDisabled=!1)})}}),r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"certificatePage"},[s("div",{staticClass:"headerTop",on:{click:e.showPopupPage}},[s("i",{staticClass:"iconfont icon-zhushi"}),s("span",[e._v("申领说明")])]),e._v(" "),s("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[s("popup",{on:{"on-hide":function(t){return e.log("hide")},"on-show":function(t){return e.log("show")}},model:{value:e.showPopup,callback:function(t){e.showPopup=t},expression:"showPopup"}},[s("div",{staticClass:"popupPage"},[s("div",{staticClass:"PopupTop"},[s("p",[e._v("申领说明")]),e._v(" "),s("span",{on:{click:e.cancleBtn}},[e._v("取消")])]),e._v(" "),s("ul",{staticClass:"popupContent"},[s("li",[s("h3",[e._v("证书说明")]),e._v(" "),s("p",[e._v("棋手通过相关段级位考试后，需在3个自然月内进行证书申领，逾期认证资格将作废。")]),e._v(" "),s("p",[e._v("申领成功后，将收到电子证书。")]),e._v(" "),s("p",[e._v("纸质证书根据认证棋手意愿支付获取。")])]),e._v(" "),s("li",[s("h3",[e._v("费用说明")]),e._v(" "),s("p",[e._v("证书费支付成功后不支持退款。")]),e._v(" "),s("p",[e._v("考试棋手跨级别考试通过后进行段级位认证需要补齐所跨全部级别的证书费。")])])])])])],1),e._v(" "),s("div",{staticClass:"listBox"},[e._l(e.certificateList,function(t,a){return s("div",{key:a},[s("p",[s("span",{staticClass:"firstSpan"},[e._v(e._s(t.playerName))]),e._v(" "),s("span",[e._v(e._s(t.certificateNo))]),e._v(" "),0===t.examResult&&0===t.certificationType?s("span",{staticClass:"playCheckBox"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.checkList,expression:"checkList"}],attrs:{type:"checkbox",id:t.id},domProps:{value:t,checked:Array.isArray(e.checkList)?e._i(e.checkList,t)>-1:e.checkList},on:{change:[function(s){var a=e.checkList,i=s.target,c=!!i.checked;if(Array.isArray(a)){var o=t,n=e._i(a,o);i.checked?n<0&&(e.checkList=a.concat([o])):n>-1&&(e.checkList=a.slice(0,n).concat(a.slice(n+1)))}else e.checkList=c},function(s){return e.selectCurrentPlayer(t,a)}]}}),e._v(" "),s("label",{attrs:{for:t.id}})]):e._e(),e._v(" "),1===t.certificationType?s("span",{staticClass:"fltR"},[e._v("已认证")]):e._e()]),e._v(" "),s("p",{staticClass:"commonTagP"},[s("span",[e._v("电话号码")]),e._v(" "),s("span",[e._v(e._s(t.phone))])]),e._v(" "),s("p",{staticClass:"commonTagP"},[s("span",[e._v("考试级别")]),e._v(" "),s("span",[e._v(e._s(t.leveNames))])]),e._v(" "),s("p",{staticClass:"commonTagP"},[s("span",[e._v("考试结果")]),e._v(" "),0===t.examResult?s("span",[e._v("考试通过")]):e._e(),e._v(" "),1===t.examResult?s("span",[e._v("考试未通过")]):e._e()]),e._v(" "),s("p",{directives:[{name:"show",rawName:"v-show",value:0===t.examResult,expression:"item.examResult === 0"}],staticClass:"commonTagP"},[s("span",[e._v("认证服务费")]),s("span",[e._v("¥ "+e._s(t.examFee))])])])}),e._v(" "),s("p",{staticClass:"bottomBar"},[e._v("\n          已加载全部\n      ")])],2),e._v(" "),s("div",{staticClass:"bottomBar"},[e._m(0),e._v(" "),s("div",{staticClass:"payBtns"},[s("p",{staticClass:"firstP"},[s("span",{staticClass:"playCheckBox"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.allChoose,expression:"allChoose"}],attrs:{type:"checkbox",id:"checkAll",disabled:e.nullDisabled},domProps:{checked:Array.isArray(e.allChoose)?e._i(e.allChoose,null)>-1:e.allChoose},on:{click:e.selectAll,change:function(t){var s=e.allChoose,a=t.target,i=!!a.checked;if(Array.isArray(s)){var c=e._i(s,null);a.checked?c<0&&(e.allChoose=s.concat([null])):c>-1&&(e.allChoose=s.slice(0,c).concat(s.slice(c+1)))}else e.allChoose=i}}}),e._v(" "),s("label",{attrs:{for:"checkAll"}})]),e._v(" "),s("span",[e._v("全选")]),s("span",{staticStyle:{color:"#ED1A23","margin-left":"4px","font-weight":"600","font-size":"18px"}},[e._v("¥ "+e._s(e.totalPrice))])]),e._v(" "),s("button",{staticClass:"submitP",class:{deactiveBtn:!0===e.disabled},attrs:{disabled:e.disabled},on:{click:e.hanleApply}},[e._v("证书申领")])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tips"},[t("i",{staticClass:"iconfont icon-zhushi"}),this._v(" "),t("p",[this._v("通过考试的棋手请在2019年12月31日23:59:00前完成证 书申领，否则认证资格将作废。")])])}]};var p=s("C7Lr")(l,r,!1,function(e){s("t1SB")},"data-v-53b8de00",null);t.default=p.exports},SwJJ:function(e,t,s){"use strict";var a=s("GRuq"),i=(a.a,Boolean,String,{name:"check-icon",components:{Icon:a.a},methods:{updateValue:function(){this.$emit("update:value",!this.value)}},props:{value:{type:Boolean,default:!1},type:{type:String,default:"default"}}}),c={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"vux-check-icon",on:{click:e.updateValue}},[s("icon",{directives:[{name:"show",rawName:"v-show",value:"default"===e.type&&e.value,expression:"type === 'default' && value"}],attrs:{type:"success"}}),e._v(" "),s("icon",{directives:[{name:"show",rawName:"v-show",value:"plain"===e.type&&e.value,expression:"type === 'plain' && value"}],attrs:{type:"success_circle"}}),e._v(" "),s("icon",{directives:[{name:"show",rawName:"v-show",value:!e.value,expression:"!value"}],attrs:{type:"circle"}}),e._v(" "),s("span",[e._t("default")],2)],1)},staticRenderFns:[]};var o=s("C7Lr")(i,c,!1,function(e){s("b4p/")},null,null);t.a=o.exports},"b4p/":function(e,t){},t1SB:function(e,t){}});
//# sourceMappingURL=9.9ef1c2ee18deffc409cb.js.map