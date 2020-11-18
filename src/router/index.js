import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/Login.vue'
import Home from '../views/home/Home.vue'
import Welcome from '../views/home/Welcome.vue'
import UserInfo from '../views/user/UserInfo.vue'
import MyClass from '../views/class/MyClass.vue'
import ClassItem from '../views/class/Classitem.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/home',
		component: Home,
		redirect: '/welcome',
		children: [{
				path: '/welcome',
				component: Welcome
			},
			{
				path: '/userinfo',
				component: UserInfo
			},
			{
				path: '/myclass',
				component: MyClass
			},
			{
				path: '/classitem',
				component: ClassItem
			}
		]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	//to 表示即将跳转的路径
	//from 表示从那个路径跳转过来
	//next 表示一个函数，放行
	//next() 放行 next('/login') 强制跳转
	//从sessionStorage 获取token
	const loginToken = window.sessionStorage.getItem('token')
	if (to.path === '/login') {
		if (!loginToken) return next()
		return next('/home')
	}
	if (!loginToken) return next('/login')
	next()
})

export default router
