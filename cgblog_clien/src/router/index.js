import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import userCenter from '@/components/UserCenter'
import openingVIP from '@/components/OpeningVIP'
import beforeLogin from '@/components/beforeLogin/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[
          {path:'beforeLogin',name:'beforeLogin',component:beforeLogin},
          {path: 'userCenter',name: 'userCenter',component: userCenter},
          {path: 'openingVIP',name: 'openingVIP',component: openingVIP}
        ]
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: userCenter
    },
    {
      path: '/openingVIP',
      name: 'openingVIP',
      component: openingVIP
    }
  ]
})
