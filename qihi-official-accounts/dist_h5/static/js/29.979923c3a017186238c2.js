webpackJsonp([29],{cB3I:function(t,e){},xIqI:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("3cXf"),n=a.n(s),i=a("/QXl"),r={data:function(){return{playerList:[]}},methods:{handleScores:function(){},handleApplyCard:function(t){console.log(t,"oo"),sessionStorage.setItem("singleApply",n()(t)),this.$router.push({name:"certificatePerson"})}},created:function(){var t=this,e={examPlanId:this.$route.query.examPlanId,orderNo:this.$route.query.orderNo};this.$axios.get("/api/enroll/grade_list",{params:e}).then(function(e){0===e.data.code&&(t.playerList=e.data.data,t.$nextTick(function(){t.scroll=new i.a(t.$refs.wrapper,{})}))})}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"chessplayerScoresPages"},[a("div",{ref:"wrapper",staticClass:"chessplayerScoresListBox wrapper"},[a("ul",{staticClass:"content"},t._l(t.playerList,function(e,s){return a("div",{key:s},[a("p",[a("span",{staticClass:"firstSpan"},[t._v(t._s(e.playerName))]),t._v(" "),0===e.examResult?a("span",{staticStyle:{color:"#19A91A","font-weight":"600"}},[t._v("通过 ("+t._s(e.score)+"分)")]):t._e(),t._v(" "),1===e.examResult?a("span",{staticStyle:{color:"#ED1A23","font-weight":"600"}},[t._v("未通过 ("+t._s(e.score)+"分)")]):t._e(),t._v(" "),0===e.certificationType&&0===e.examResult?a("span",{staticStyle:{color:"#ED1A23","font-weight":"500",float:"right"}},[t._v("未认证")]):t._e(),t._v(" "),1===e.certificationType&&0===e.examResult?a("span",{staticStyle:{color:"#666666","font-weight":"500",float:"right"}},[t._v("已认证")]):t._e()]),t._v(" "),a("p",{staticClass:"commonTagP"},[a("span",[t._v("证件号码")]),t._v(" "),a("span",[t._v(t._s(e.certificateNo))])]),t._v(" "),a("p",{staticClass:"commonTagP"},[a("span",[t._v("电话号码")]),t._v(" "),a("span",[t._v(t._s(e.phone))])]),t._v(" "),a("p",{staticClass:"commonTagP"},[a("span",[t._v("考试级别")]),t._v(" "),a("span",[t._v(t._s(e.leveNames))])]),t._v(" "),0===e.examResult&&0===e.certificationType?a("div",{staticClass:"btnGrps"},[t._e(),t._v(" "),a("button",{staticClass:"bgBtn",on:{click:function(a){return t.handleApplyCard(e)}}},[t._v("证书申领")])]):t._e(),t._v(" "),0===e.examResult&&1===e.certificationType?a("div",{staticClass:"btnGrps"},[a("button",[t._v("对弈报告")]),t._v(" "),a("button",{staticStyle:{"margin-right":"8px"}},[t._v("电子证书")])]):t._e()])}),0),t._v(" "),a("p",{staticClass:"bottomBar"},[t._v("\n          已加载全部\n      ")])])])},staticRenderFns:[]};var c=a("C7Lr")(r,o,!1,function(t){a("cB3I")},"data-v-0d2f82f2",null);e.default=c.exports}});
//# sourceMappingURL=29.979923c3a017186238c2.js.map