import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import Talk from '@/components/Talk'
import userCenter from '@/components/UserCenter'
import openingVIP from '@/components/OpeningVIP'
import beforeLogin from '@/components/beforeLogin/index'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: '/blog/',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[
          {path:'beforeLogin',name:'beforeLogin',component:beforeLogin},
          {path: 'userCenter',name: 'userCenter',component: userCenter},
          {path: 'openingVIP',name: 'openingVIP',component: openingVIP},
          {path: 'talk',name: 'Talk',component: Talk}
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
    },
    {
      path: '/talk',
      name: 'Talk',
      component: Talk
    }
  ]
})
