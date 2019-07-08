import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import talk from '@/components/talk'
import userCenter from '@/components/userCenter'
import openingVIP from '@/components/openingVIP'
import index from '@/components/index'
import interesting from '@/components/interesting'
import learning from '@/components/learning'
import messageBoard from '@/components/messageBoard'
import reading from '@/components/reading'

import notFound from '@/components/notFound'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  base: '/blog/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children:[
            {
				path:'index',
				name:'index',
				component:index,
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
            {path: 'talk',name: 'talk',component: talk}
        ]
    },
	{path:'*',component:notFound},//全不匹配的情况下，返回404，路由按顺序从上到下，依次匹配。最后一个*能匹配全部，
  ]
})
