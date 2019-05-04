import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import Talk from '@/components/Talk'
import userCenter from '@/components/UserCenter'
import openingVIP from '@/components/OpeningVIP'
import beforeLogin from '@/components/beforeLogin/index'
import interesting from '@/components/beforeLogin/interesting'
import learning from '@/components/beforeLogin/learning'
import messageBoard from '@/components/beforeLogin/message-board'
import reading from '@/components/beforeLogin/reading'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/blog/',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[
          {
						path:'beforeLogin',
						name:'beforeLogin',
						component:beforeLogin,
						children:[
							{
								path: 'learning',
								name: 'learning',
								component: learning,
							},
							{
								path: 'messageBoard',
								name: 'messageBoard',
								component: messageBoard,
							},
							{
								path: 'interesting',
								name: 'interesting',
								component: interesting,
							},
							{
								path: 'reading',
								name: 'reading',
								component: reading,
							}
						]
					},
          {path: 'userCenter',name: 'userCenter',component: userCenter},
          {path: 'openingVIP',name: 'openingVIP',component: openingVIP},
          {path: 'talk',name: 'Talk',component: Talk}
        ]
    },
//     {
//       path: '/userCenter',
//       name: 'userCenter',
//       component: userCenter
//     },
//     {
//       path: '/openingVIP',
//       name: 'openingVIP',
//       component: openingVIP
//     },
//     {
//       path: '/talk',
//       name: 'Talk',
//       component: Talk
//     }
  ]
})
