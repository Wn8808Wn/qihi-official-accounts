webpackJsonp([14],{"5E4c":function(t,e,i){"use strict";var s=i("ZLEe"),r=i.n(s),a=/\s+/;function n(){}n.prototype.on=function(t,e,i){var s,r;if(!e)return this;for(s=this.__events||(this.__events={}),t=t.split(a);r=t.shift();)(s[r]||(s[r]=[])).push(e,i);return this},n.prototype.once=function(t,e,i){var s=this;return this.on(t,function r(){s.off(t,r),e.apply(i||s,arguments)},i)},n.prototype.off=function(t,e,i){var s,r,n,l;if(!(s=this.__events))return this;if(!(t||e||i))return delete this.__events,this;for(t=t?t.split(a):o(s);r=t.shift();)if(n=s[r])if(e||i)for(l=n.length-2;l>=0;l-=2)e&&n[l]!==e||i&&n[l+1]!==i||n.splice(l,2);else delete s[r];return this},n.prototype.trigger=function(t){var e,i,s,r,n,o,c=[],h=!0;if(!(e=this.__events))return this;for(t=t.split(a),n=1,o=arguments.length;n<o;n++)c[n-1]=arguments[n];for(;i=t.shift();)(s=e.all)&&(s=s.slice()),(r=e[i])&&(r=r.slice()),"all"!==i&&(h=l(r,c,this)&&h),h=l(s,[i].concat(c),this)&&h;return h},n.prototype.emit=n.prototype.trigger;var o=r.a;function l(t,e,i){var s=!0;if(t){var r=0,a=t.length,n=e[0],o=e[1],l=e[2];switch(e.length){case 0:for(;r<a;r+=2)s=!1!==t[r].call(t[r+1]||i)&&s;break;case 1:for(;r<a;r+=2)s=!1!==t[r].call(t[r+1]||i,n)&&s;break;case 2:for(;r<a;r+=2)s=!1!==t[r].call(t[r+1]||i,n,o)&&s;break;case 3:for(;r<a;r+=2)s=!1!==t[r].call(t[r+1]||i,n,o,l)&&s;break;default:for(;r<a;r+=2)s=!1!==t[r].apply(t[r+1]||i,e)&&s}}return s}o||(o=function(t){var e=[];for(var i in t)t.hasOwnProperty(i)&&e.push(i);return e}),n.mixTo=function(t){var e,i=n.prototype;if(e=t,"[object Function]"===Object.prototype.toString.call(e))for(var s in i)i.hasOwnProperty(s)&&(t.prototype[s]=i[s]);else{var r=new n;for(var a in i)i.hasOwnProperty(a)&&o(a)}function o(e){t[e]=function(){return i[e].apply(r,Array.prototype.slice.call(arguments)),this}}};var c=n,h=[],f=[];f.push(/^[0-9]*$/.source),f.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),f.push(/[0-9]{4}([/-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),f=new RegExp(f.join("|"));var p={Y:"years",m:"months",w:"weeks",D:"days",H:"hours",M:"minutes",S:"seconds"};function u(t,e){var i="s",s="";return t&&(1===(t=t.replace(/(:||\s)/gi,"").split(/,/)).length?i=t[0]:(s=t[0],i=t[1])),1===Math.abs(e)?s:i}var v=function(t,e){e=e||{},this.PRECISION=e.precision||100,this.interval=null,this.offset={},this.instanceNumber=h.length,h.push(this),this.setFinalDate(t)};c.mixTo(v);var m=v.prototype,d={start:function(){null!==this.interval&&clearInterval(this.interval);var t=this;return this.update(),this.interval=setInterval(function(){t.update()},this.PRECISION),this},stop:function(){return clearInterval(this.interval),this.interval=null,this._dispatchEvent("stoped"),this},toggle:function(){return this.interval?this.stop():this.start(),this},pause:function(){return this.stop()},resume:function(){return this.start()},remove:function(){this.stop(),h[this.instanceNumber]=null},setFinalDate:function(t){return this.finalDate=function(t){if(t instanceof Date)return t;if(String(t).match(f))return String(t).match(/^[0-9]*$/)&&(t=Number(t)),String(t).match(/-/)&&(t=String(t).replace(/-/g,"/")),new Date(t);throw new Error("Couldn't cast `"+t+"` to a date object.")}(t),this},getOffset:function(){return this.totalSecsLeft=this.finalDate.getTime()-(new Date).getTime(),this.totalSecsLeft=Math.ceil(this.totalSecsLeft/1e3),this.totalSecsLeft=this.totalSecsLeft<0?0:this.totalSecsLeft,{seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),months:Math.floor(this.totalSecsLeft/60/60/24/30),years:Math.floor(this.totalSecsLeft/60/60/24/365)}},update:function(){this.offset=this.getOffset();for(var t,e=["days","hours","minutes","seconds"],i=0;i<e.length;i++)for(var s=e[i],r=(t=this.offset[s],(t=(1===(t+="").length?"0"+t:t)+"").split("")),a=0;a<r.length;a++)this.offset[s+"_"+(a+1)]=r[a];return 0===this.totalSecsLeft?(this.stop(),this._dispatchEvent("finish")):this._dispatchEvent("update"),this},_dispatchEvent:function(t){var e,i={};i.finalDate=this.finalDate,i.offset=this.offset,i.strftime=(e=this.offset,function(t){var i,s,r=t.match(/%(-|!)?[A-Z]{1}(:[^]+)?/gi),a=!1;if(r.indexOf("%D")<0&&r.indexOf("%H")>=0&&(a=!0),r)for(var n=0,o=r.length;n<o;++n){var l=r[n].match(/%(-|!)?([a-zA-Z]{1})(:[^]+)?/),c=(i=l[0],s=i.toString().replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1"),new RegExp(s)),h=l[1]||"",f=l[3]||"",v=null,m=null;l=l[2],p.hasOwnProperty(l)&&(m=p[l],v=Number(e[m]),"hours"===m&&a&&(v+=24*Number(e.days))),null!==v&&("!"===h&&(v=u(f,v)),""===h&&v<10&&(v="0"+v.toString()),t=t.replace(c,v.toString()))}return t=(t=t.replace("%_M1",e.minutes_1).replace("%_M2",e.minutes_2).replace("%_S1",e.seconds_1).replace("%_S2",e.seconds_2).replace("%_S3",e.seconds_3).replace("%_H1",e.hours_1).replace("%_H2",e.hours_2).replace("%_H3",e.hours_3).replace("%_D1",e.days_1).replace("%_D2",e.days_2).replace("%_D3",e.days_3)).replace(/%%/,"%")}),this.emit(t,i),this.emit("tick",i)}};for(var _ in d)m[_]=d[_];var g=v,S="%D 天 %H 小时 %M 分 %S 秒";S="%D 天 %H 小时 %M 分 %S 秒";String,Number,String;var y="%D 天 %H 小时 %M 分 %S 秒";y="%D 天 %H 小时 %M 分 %S 秒";var x={name:"clocker",mounted:function(){var t=this;this.$nextTick(function(){t.slot=t.$el.querySelector(".vux-clocker-tpl"),t.slotString=t.slot.innerHTML,""!==t.slotString&&(t.showTimeString=!1),t.render()})},methods:{render:function(){var t=this;this.time&&(this.clocker=new g(this.time).on("tick",function(e){t.update(e),t.$emit("on-tick",e)}).on("finish",function(){t.timeString="00:00:00",t.$emit("on-finish")}).start())},update:function(t){if(this.showTimeString)this.timeString=t.strftime(this.format);else{var e=t.strftime(this.slotString);e!==this.cacheSlotString&&(this.slot.innerHTML=this.cacheSlotString=e)}}},props:{time:[String,Number],format:{type:String,default:y}},watch:{time:function(){this.clocker&&this.clocker.remove(),this.render()}},data:function(){return{showTimeString:!0,timeString:"",slotString:"",cacheSlotString:""}},beforeDestroy:function(){this.clocker&&(this.clocker.remove(),this.clocker=null)}},C={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{display:"inline-block"}},[this.showTimeString?e("span",[this._v(this._s(this.timeString))]):this._e(),this._v(" "),e("div",{staticClass:"vux-clocker-tpl"},[this._t("default")],2)])},staticRenderFns:[]},T=i("C7Lr")(x,C,!1,null,null,null);e.a=T.exports},UPZ6:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("3cXf"),r=i.n(s),a=i("/QXl"),n=i("CtzY"),o=i.n(n),l=i("5E4c"),c=i("0+Q0"),h=i("Q/W4"),f=i("oast"),p=i("zM9A"),u=i("uiKT"),v=(u.a,l.a,c.a,h.a,f.a,p.a,{directives:{TransferDom:u.a},components:{Clocker:l.a,Cell:c.a,Group:h.a,XButton:f.a,Confirm:p.a},data:function(){return{time1:"",time:"",examRoomName:"",examLevelTitle:"",examTime:"",address:"",linkman:"",phone:"",orderNo:"",createdTime:"",disabled:!1,showCofirmTitle:!1,orderId:"",totalPrice:"",unitPrice:"",playerslist:[]}},methods:{longTimeAgo:function(t,e,i){var s=(t.split(" ")[0]+" "+e).replace(/-/g,"/"),r=new Date(s).getTime()+6e4*i;return this.formatDate(r,"hh:mm")},showTitle:function(){var t=this,e={id:this.orderId};this.$axios.post("/api/enroll/order_time",o.a.stringify(e)).then(function(e){console.log(e),0===e.data.code&&(t.disabled=!0)})},showCofirmPage:function(){this.showCofirmTitle=!0},onCancel:function(){this.$router.push({name:"myOrder"}),sessionStorage.setItem("initializeTime",this.time)},onConfirm:function(){var t={orderId:this.orderId,payFee:this.totalPrice};this.$axios.post("/api/order/OrderPayment",o.a.stringify(t)).then(function(t){if(0===t.data.code){var e=t.data.data;sessionStorage.setItem("payOffTime",r()(e))}}),this.$router.push({name:"successApply"})}},created:function(){var t=this,e=JSON.parse(sessionStorage.getItem("routerObj"));this.examRoomName=e.examRoomName,this.address=e.address,this.orderId=e.orderId,this.orderNo=e.orderNo,this.createdTime=e.createdTime,this.examLevelTitle=e.examLevelTitle,this.examTime=e.examTime,this.linkman=e.linkMan,this.totalPrice=e.totalPrice,this.phone=e.phone,this.playerslist=e.playerslist,this.unitPrice=e.unitPrice;var i=new Date(e.createdTime).getTime()+18e5;this.time1=this.formatDate(i,"YYYY-MM-DD hh:mm:ss"),this.$nextTick(function(){t.scroll=new a.a(t.$refs.orderDetailsPageWrapper,{click:!0})})}}),m={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"orderDetailsPage"},[i("div",{ref:"orderDetailsPageWrapper",staticClass:"orderDetailsPageWrapper"},[i("div",{staticClass:"content"},[i("div",{staticClass:"topPart"},[i("div",{staticClass:"waitPayTop"},[i("div",{staticClass:"bgBox"},[t._m(0),t._v(" "),i("div",[i("p",[t._v("等待付款")]),t._v(" "),i("p",[t._v("座位已成功锁定,请在"),i("clocker",{attrs:{time:t.time1,format:"%M 分 %S 秒"},on:{"on-finish":t.showTitle}}),t._v("内完成支付")],1)])])]),t._v(" "),i("div",{staticClass:"infoBox"},[i("h3",[t._v(t._s(t.examRoomName))]),t._v(" "),i("div",{staticClass:"bottomBorderBox"},[i("p",[i("span",[t._v("考试地点")]),t._v(" "),i("span",[t._v(t._s(t.address))])]),t._v(" "),i("p",[i("span",[t._v("考试级别")]),t._v(" "),i("span",[t._v(t._s(t.examLevelTitle))])]),t._v(" "),i("p",[i("span",[t._v("考试时间")]),t._v(" "),i("span",[t._v(t._s(t.examTime))])])]),t._v(" "),i("div",{staticClass:"bottomBorderBox"},[i("p",[i("span",[t._v("联  系  人")]),t._v(" "),i("span",[t._v(t._s(t.linkman)+t._s(t.phone))])]),t._v(" "),t._m(1)]),t._v(" "),i("div",{staticClass:"bottomBorderBox"},[i("p",{staticClass:"orderNumberP"},[i("span",[t._v("订单编号")]),t._v(" "),i("span",[t._v(t._s(t.orderNo))]),t._v(" "),i("x-button",{staticStyle:{"border-radius":"14px"},attrs:{plain:"",type:"primary"}},[t._v("复制")])],1),t._v(" "),i("p",[i("span",[t._v("下单时间")]),t._v(" "),i("span",[t._v(t._s(t.createdTime))])])]),t._v(" "),t._m(2)])]),t._v(" "),i("div",{staticClass:"applyPlayerList"},t._l(t.playerslist,function(e,s){return i("div",{key:s,staticClass:"commonBox"},[i("p",[i("span",{staticClass:"firstSpan"},[t._v(t._s(e.playerName))]),t._v(" "),i("span",[t._v(t._s(e.certificateNo))])]),t._v(" "),i("p",{staticClass:"commonTagP"},[i("span",[t._v("电话号码")]),t._v(" "),i("span",[t._v(t._s(e.phone))])]),t._v(" "),i("p",{staticClass:"commonTagP"},[i("span",[t._v("报名费用")]),t._v(" "),i("span",{staticStyle:{color:"#ED1A23"}},[i("i",{staticStyle:{"font-style":"normal",color:"#ED1A23","font-size":"14px"}},[t._v("¥")]),t._v(" "+t._s(t.unitPrice))])])])}),0)])]),t._v(" "),i("div",{staticClass:"fixedBox"},[i("p",[i("span",[t._v("合计:")]),t._v(" "),i("i",[t._v("¥")]),i("span",[t._v(t._s(t.totalPrice))])]),t._v(" "),i("button",{class:{allowClick:!1===t.disabled},attrs:{disabled:t.disabled},on:{click:t.showCofirmPage}},[t._v("\n            立即支付\n        ")])]),t._v(" "),i("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[i("confirm",{attrs:{title:"提示","confirm-text":"继续支付"},on:{"on-cancel":t.onCancel,"on-confirm":t.onConfirm},model:{value:t.showCofirmTitle,callback:function(e){t.showCofirmTitle=e},expression:"showCofirmTitle"}},[i("p",{staticStyle:{"font-size":"16px","font-weight":"400",color:"rgba(102,102,102,1)","line-height":"22px"}},[t._v("报名成功后,退款将收取30%的手续费（距考试开始不足48小时将不再支持退款）。")])])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:i("fkUd")}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("span",[this._v("发票信息")]),this._v(" "),e("span",[this._v("[企业]棋智科技有限公司")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bottomBar"},[e("p",[e("i",{staticClass:"iconfont icon-lianxikefu"}),e("span",[this._v("联系客服")])]),this._v(" "),e("p",[e("i",{staticClass:"iconfont icon-chakandingdan"}),e("span",[this._v("取消订单")])])])}]};var d=i("C7Lr")(v,m,!1,function(t){i("bVHK")},"data-v-56181bee",null);e.default=d.exports},bVHK:function(t,e){}});
//# sourceMappingURL=14.c81fc9cc201e1175af07.js.map