webpackJsonp([24],{"7xIN":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("xd7I"),r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var i=n("C7Lr")({name:"App"},r,!1,function(e){n("Opny")},null,null).exports,o=n("e1F6");a.a.use(o.a);var l=new o.a({mode:"history",routes:[{path:"/",name:"loading",component:function(){return Promise.all([n.e(0),n.e(16)]).then(n.bind(null,"CmAY"))}},{path:"/examCenter",name:"examCenter",meta:{title:"考试中心"},component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"6DG6"))}},{path:"/examCenter/examinationLevel/examCenterTab",name:"examinationLevel",meta:{title:"段级位考试"},component:function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"Pl4v"))}},{path:"/examCenter/examinationLevel/examRoomDetails",name:"examRoomDetails",meta:{title:"段级位考试"},component:function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"j1EZ"))}},{path:"/examCenter/examinationLevel/examRoomDetails/submitOrder",name:"submitOrder",meta:{title:"考试预约"},component:function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"aRaL"))}},{path:"/examCenter/examinationLevel/orderDetails",name:"orderDetails",meta:{title:"订单详情"},component:function(){return Promise.all([n.e(0),n.e(12)]).then(n.bind(null,"UPZ6"))}},{path:"/examCenter/examinationLevel/orderDetails/successApply",name:"successApply",meta:{title:"订单详情"},component:function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,"mwbH"))}},{path:"/examCenter/examinationLevel/orderDetails/checkOrder",name:"checkOrder",meta:{title:"订单详情"},component:function(){return Promise.all([n.e(0),n.e(19)]).then(n.bind(null,"P/SF"))}},{path:"/examCenter/examinationLevel/registered",name:"registered",meta:{title:"已报名"},component:function(){return Promise.all([n.e(0),n.e(13)]).then(n.bind(null,"1tAe"))}},{path:"/examCenter/examinationLevel/registered/chessplayerScores",name:"chessplayerScores",meta:{title:"棋手成绩"},component:function(){return Promise.all([n.e(0),n.e(22)]).then(n.bind(null,"xIqI"))}},{path:"/examCenter/examinationLevel/registered/certificate",name:"certificate",meta:{title:"证书申领"},component:function(){return Promise.all([n.e(0),n.e(9)]).then(n.bind(null,"L8Ho"))}},{path:"/examCenter/examinationLevel/registered/certificateDetails",name:"certificateDetails",meta:{title:"证书申领"},component:function(){return Promise.all([n.e(0),n.e(15)]).then(n.bind(null,"0oVj"))}},{path:"/examCenter/examinationLevel/registered/certificatePay",name:"certificatePay",meta:{title:"订单详情"},component:function(){return Promise.all([n.e(0),n.e(11)]).then(n.bind(null,"K3nA"))}},{path:"/examCenter/examinationLevel/registered/successPay",name:"successPay",meta:{title:"订单详情"},component:function(){return Promise.all([n.e(0),n.e(8)]).then(n.bind(null,"YDij"))}},{path:"/examCenter/examinationLevel/registered/certificatePerson",name:"certificatePerson",meta:{title:"证书申领"},component:function(){return Promise.all([n.e(0),n.e(10)]).then(n.bind(null,"0bxf"))}},{path:"/examCenter/examinationLevel/registered/checkCertificateOrder",name:"checkCertificateOrder",meta:{title:"订单详情"},component:function(){return Promise.all([n.e(0),n.e(20)]).then(n.bind(null,"fbsv"))}},{path:"/examCenter/examinationLevel/registered/ticketsPdf",name:"ticketsPdf",meta:{title:"准考证"},component:function(){return Promise.all([n.e(0),n.e(14)]).then(n.bind(null,"Vd9O"))}},{path:"/examCenter/examinationLevel/myOrder",name:"myOrder",meta:{title:"我的订单"},component:function(){return Promise.all([n.e(0),n.e(6)]).then(n.bind(null,"D7sX"))}},{path:"/examCenter/examinationLevel/commonInformation",name:"commonInformation",meta:{title:"常用信息"},component:function(){return Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"Ke/K"))}},{path:"/examCenter/coachTest",name:"coachTest",meta:{title:"教练员考试"},component:function(){return n.e(21).then(n.bind(null,"CB5M"))}},{path:"/examCenter/umpireTest",name:"umpireTest",meta:{title:"裁判员考试"},component:function(){return n.e(18).then(n.bind(null,"JhK4"))}},{path:"/examCenter/testSimulating",name:"testSimulating",meta:{title:"考试模拟"},component:function(){return n.e(17).then(n.bind(null,"N1p5"))}}]}),m=n("2bvH"),c={nameSpace:!0,state:{currentItem:{examRoomName1:"",adress1:""}},mutations:{setCurrentItem:function(e,t){e.currentItem=t}},getters:{},actions:{setCurrentItem:function(e,t){e.commit("setCurrentItem",t)}}};a.a.use(m.a);var s=new m.a.Store({modules:{examRoomDetails:c},state:{},mutations:{},getters:{},actions:{}}),u=n("rG/O"),p=n.n(u),d=n("TD+U"),h=n.n(d),f={install:function(e,t){e.prototype.getPdf=function(e,t){t=this.htmlTitle;var n=document.createElement("canvas"),a={scale:2,canvas:n,logging:!0,width:document.querySelector(e).clientWidth,height:document.querySelector(e).clientHeight};console.log(a,"options"),n.width=2*document.querySelector(e).clientWidth,n.height=2*document.querySelector(e).clientHeight,n.getContext("2d").scale(2,2),p()(document.querySelector(e),a).then(function(e){var n=e.width,a=e.height,r=n/592.28*841.89,i=a,o=0,l=592.28/n*a,m=e.toDataURL("image/jpeg",1),c=new h.a("","pt","a4");if(i<r)c.addImage(m,"JPEG",0,0,595.28,l);else for(;i>0;)c.addImage(m,"JPEG",0,o,595.28,l),o-=841.89,(i-=r)>0&&c.addPage();c.save(t+".pdf")})}}},x=(n("7xIN"),n("iDdd")),g=n.n(x),v=n("rVsN"),b=n.n(v),P=n("84iU"),C=n.n(P);C.a.defaults.timeout=3e4,C.a.defaults.withCredentials=!0;C.a.interceptors.request.use(function(e){return sessionStorage.getItem("dsToken")&&(e.headers.Token=sessionStorage.getItem("dsToken")),e},function(e){return b.a.reject(e)}),C.a.interceptors.response.use(function(e){return 401===e.data.data&&(console.log("token过期啦"),l.replace("/")),e},function(e){return b.a.reject(new Error(e))});var y=C.a;n("lK/w");a.a.use(f),a.a.prototype.format=function(e){var t=new Date(e),n=t.getMonth()+1,a=t.getDate();return(n<10?"0"+n:n)+"/"+(a<10?"0"+a:a)},a.a.prototype.formatDate=function(e,t){var n={"M+":(e=new Date(e)).getMonth()+1,"D+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),c:e.getMilliseconds(),w:["一","二","三","四","五","六","日"][e.getDay()-1]};for(var a in/(Y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),n)new RegExp("("+a+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?n[a]:("00"+n[a]).substr((""+n[a]).length)));return t},g.a.attach(document.body),a.a.prototype.$axios=y,l.beforeEach(function(e,t,n){window.document.title=e.meta.title||"默认",n()}),a.a.config.productionTip=!1,new a.a({el:"#app",router:l,store:s,components:{App:i},template:"<App/>"})},Opny:function(e,t){},"lK/w":function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.a7fbfa093ce0d2a35d69.js.map