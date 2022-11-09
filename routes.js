import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'
import mailApp from './apps/mail/pages/mail-app.cmp.js'
import mailInbox from './apps/mail/pages/mail-inbox.cmp.js'
import mailStarred from './apps/mail/pages/mails-starred.cmp.js'
import mailSent from './apps/mail/pages/mails-sent.cmp.js'
import mailDetails from './apps/mail/pages/mail-details.cmp.js'
import keepPage from './apps/keep/pages/note-index.cmp.js'

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
			component: mailApp,
			children: [
				{
					path: ':id',
					component: mailDetails,
				},
				{
					path: 'inbox',
					component: mailInbox,
				},
				{
					path: 'starred',
					component: mailStarred,
				},
				{
					path: 'sent',
					component: mailSent,
				}
			]
		},
		{
			path: '/keep',
			component: keepPage,
		},
	],
}

export const router = createRouter(routerOptions)
