import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'
//import keepPage from './views/keep-mainpage.cmp.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: homePage,
		},
		{
			path: '/about',
			component: aboutPage,
		},
		/*{
			path: '/keep',
			component: keepPage,
		},*/
	],
}

export const router = createRouter(routerOptions)
