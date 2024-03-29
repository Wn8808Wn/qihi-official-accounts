import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'loading', 
      component: () => import('../pages/loading.vue') 
    },
    {
      path: '/examCenter',
      name: 'examCenter', 
      meta: {
        title: '考试中心'
      },
      component: () => import('../pages/examCenter.vue')   //首页面
    },
    {
      path: '/examCenter/examinationLevel/examCenterTab',
      name: 'examinationLevel',
      meta: {
        title: '段级位考试'
      },
      component: () => import('../pages/examCenter/examCenterTab.vue'),  // 段级位考试=>考试中心
    },
    {
      path: '/examCenter/examinationLevel/examRoomDetails',
      name: 'examRoomDetails',
      meta: {
        title: '段级位考试'
      },
      component: () => import('../pages/examCenter/examRoomDetails.vue'),  // 段级位考试=>考试中心=>考场详情页
    },
    {
      path: '/examCenter/examinationLevel/examRoomDetails/submitOrder',
      name: 'submitOrder',
      meta: {
        title: '考试预约'
      },
      component: () => import('../pages/examCenter/submitOrder.vue'),  // 段级位考试=>考试中心=>提交订单页
    },
    {
      path: '/examCenter/examinationLevel/orderDetails',
      name: 'orderDetails',
      meta: {
        title: '订单详情'
      },
      component: () => import('../pages/examCenter/orderDetails.vue'),  // 段级位考试=>考试中心=>订单详情页
    },
    {
      path: '/examCenter/examinationLevel/orderDetails/successApply',
      name: 'successApply',
      meta: {
        title: '订单详情'
      },
      component: () => import('../pages/examCenter/successApply.vue'),  // 段级位考试=>考试中心=>订单详情页=>支付成功页面
    },
    {
      path: '/examCenter/examinationLevel/orderDetails/checkOrder',
      name: 'checkOrder',
      meta: {
        title: '订单详情'
      },
      component: () => import('../pages/examCenter/checkOrder.vue'),  // 段级位考试=>考试中心=>订单详情页=>支付成功页面=>查看订单页面
    },
    {
      path: '/examCenter/examinationLevel/registered',
      name: 'registered',
      meta: {
        title: '已报名'
      },
      component: () => import('../pages/registered/registered.vue'), // 段级位考试=>已报名
    },
    {
      path: '/examCenter/examinationLevel/registered/chessplayerScores',
      name: 'chessplayerScores',
      meta: {
        title: '棋手成绩'
      },
      component: () => import('../pages/registered/chessplayerScores.vue'), // 段级位考试=>已报名=>棋手成绩
    },
    {
      path: '/examCenter/examinationLevel/registered/certificate',
      name: 'certificate',
      meta: {
        title: '证书申领'
      },
      component: () => import('../pages/registered/certificate.vue'), // 段级位考试=>已报名=>证书申领
    },
    {
      path: '/examCenter/examinationLevel/registered/certificateDetails',
      name: 'certificateDetails',
      meta: {
        title: '证书申领'
      },
      component: () => import('../pages/registered/certificateDetails.vue'), // 段级位考试=>已报名=>证书申领详情页
    },
    {
      path: '/examCenter/examinationLevel/registered/certificatePay',
      name: 'certificatePay',
      meta: {
        title: '订单详情'
      },
      component: () => import('../pages/registered/certificatePay.vue'), // 段级位考试=>已报名=>证书申领=>证书申领支付页面
    },
    {
      path: '/examCenter/examinationLevel/registered/successPay',
      name: 'successPay',
      meta: {
        title: '订单详情'
      },
      component: () => import('../pages/registered/successPay.vue'), // 段级位考试=>已报名=>证书申领=>证书申领支付成功页面
    },
    {
      path: '/examCenter/examinationLevel/registered/certificatePerson',
      name: 'certificatePerson',
      meta: {
        title: '证书申领'
      },
      component: () => import('../pages/registered/certificatePerson.vue'), // 段级位考试=>已报名=>个人证书申领
    },
    {
      path: '/examCenter/examinationLevel/registered/checkCertificateOrder',
      name: 'checkCertificateOrder',
      meta: {
        title: '订单详情'
      },
      component: () => import('../pages/registered/checkCertificateOrder.vue'), // 段级位考试=>已报名=>证书订单详情
    },
    {
      path: '/examCenter/examinationLevel/registered/ticketsPdf',
      name: 'ticketsPdf',
      meta: {
        title: '准考证'
      },
      component: () => import('../pages/registered/ticketsPdf.vue'), // 段级位考试=>已报名=>准考证PDF页面
    },
    {
      path: '/examCenter/examinationLevel/registered/showTicket',
      name: 'showTicket',
      meta: {
        title: '准考证'
      },
      component: () => import('../pages/registered/showTicket.vue'), // 段级位考试=>已报名=>准考证img页面
    },
    {
      path: '/examCenter/examinationLevel/myOrder',
      name: 'myOrder',
      meta: {
        title: '我的订单'
      },
      component: () => import('../pages/myOrder/myOrder.vue'),  // 段级位考试=>我的订单
    },
    {
      path: '/examCenter/examinationLevel/commonInformation',
      name: 'commonInformation',
      meta: {
        title: '常用信息'
      },
      component: () => import('../pages/commonInformation/commonInformation.vue'), // 段级位考试=>常用棋手
    },
    {
      path: '/examCenter/examinationLevel/addPlayer',
      name: 'addPlayer',
      meta: {
        title: '新增棋手'
      },
      component: () => import('../pages/commonInformation/addPlayer.vue'), // 段级位考试=>新增棋手
    },
    {
      path: '/examCenter/examinationLevel/addPlayerInfo',
      name: 'addPlayerInfo',
      meta: {
        title: '新增棋手'
      },
      component: () => import('../pages/commonInformation/addPlayerInfo.vue'), // 段级位考试=>新增棋手=>棋手详细信息
    },
    {
      path: '/examCenter/examinationLevel/editPlayerInfo',
      name: 'editPlayerInfo',
      meta: {
        title: '编辑棋手'
      },
      component: () => import('../pages/commonInformation/editPlayerInfo.vue'), // 段级位考试=>新增棋手=>编辑棋手
    },
    {
      path: '/examCenter/examinationLevel/playerUnitCode',
      name: 'playerUnitCode',
      meta: {
        title: '新增棋手'
      },
      component: () => import('../pages/commonInformation/playerUnitCode.vue'), // 段级位考试=>新增棋手=>棋手机构代码
    },
    {
      path: '/examCenter/examinationLevel/addAddress',
      name: 'addAddress',
      meta: {
        title: '新增常用地址'
      },
      component: () => import('../pages/commonInformation/addAddress.vue'), // 段级位考试=>新增地址
    },
    {
      path: '/examCenter/examinationLevel/editAddress',
      name: 'editAddress',
      meta: {
        title: '编辑常用地址'
      },
      component: () => import('../pages/commonInformation/editAddress.vue'), // 段级位考试=>编辑常用地址
    },
    {
      path: '/examCenter/examinationLevel/addLinkman',
      name: 'addLinkman',
      meta: {
        title: '新增常用联系人'
      },
      component: () => import('../pages/commonInformation/addLinkman.vue'), // 段级位考试=>新增联系人
    },
    {
      path: '/examCenter/examinationLevel/editLinkmanInfo',
      name: 'editLinkmanInfo',
      meta: {
        title: '编辑常用联系人'
      },
      component: () => import('../pages/commonInformation/editLinkmanInfo.vue'), // 段级位考试=>编辑联系人
    },
    // {
    //   path: '/examCenter/examinationLevel/addCheque',
    //   name: 'addCheque',
    //   meta: {
    //     title: '新增报销凭证'
    //   },
    //   component: () => import('../pages/commonInformation/addCheque.vue'), // 段级位考试=>新增报销凭证
    // },
    // {
    //   path: '/examCenter/examinationLevel/editCheque',
    //   name: 'editCheque',
    //   meta: {
    //     title: '编辑报销凭证'
    //   },
    //   component: () => import('../pages/commonInformation/editCheque.vue'), // 段级位考试=>编辑报销凭证
    // },
    {
      path: '/examCenter/coachTest',
      name: 'coachTest',
      meta: {
        title: '教练员考试'
      },
      component: () => import('../pages/coachTest.vue'),  // 未开发模块 => 教练员考试
    },
    {
      path: '/examCenter/umpireTest',
      name: 'umpireTest',
      meta: {
        title: '裁判员考试'
      },
      component: () => import('../pages/umpireTest.vue'), // 未开发模块 => 教练员考试
    },
    {
      path: '/examCenter/testSimulating',
      name: 'testSimulating',
      meta: {
        title: '考试模拟'
      },
      component: () => import('../pages/testSimulating.vue'),   // 未开发模块 => 考试模拟
    },
    // {
    //   path: '/examCenter/examinationLevel/examCenterTab',
    //   name: 'examCenterTab',
    //   meta: {
    //     title: '考试中心'
    //   },
    //   component: () => import('../pages/examCenter/examCenterTab.vue'),
    // },
    
  ]
})
