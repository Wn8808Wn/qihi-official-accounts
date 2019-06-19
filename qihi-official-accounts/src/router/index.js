import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
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
      path: '/examCenter/examinationLevel/orderDetails/successPay',
      name: 'successPay',
      meta: {
        title: '订单详情'
      },
      component: () => import('../pages/examCenter/successApply.vue'),  // 段级位考试=>考试中心=>订单详情页=>支付成功页面
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
      component: () => import('../pages/commonInformation/commonInformation.vue'), // 段级位考试=>常用信息
    },
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
