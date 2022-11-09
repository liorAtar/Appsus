import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'
import mailPage from './apps/mail/pages/mail-app.cmp.js'
import keepPage from './apps/keep/pages/note-index.cmp.js'
import mailDetails from './apps/mail/pages/mail-details.cmp.js'

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
		{
			path: '/mail',
			component: mailPage,
		},
		{
            path: '/mail/:id',
            component: mailDetails
        },
		{
			path: '/keep',
			component: keepPage,
		},
	],
}

export const router = createRouter(routerOptions)
