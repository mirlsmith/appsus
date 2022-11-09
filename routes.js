import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'
import keepPage from './views/app-keep.cmp.js'
import mailPage from './views/app-mail.cmp.js'

import noteDetailsPage from './apps/keep/pages/note-details.cmp.js'
import mailDetailsPage from './apps/mail/pages/mail-details.cmp.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: homePage,
		},
		{
			path: '/keep',
			component: keepPage,
			children: [
				// { path: '', component: noteIndexPage }, WHAT'S THIS???????
				{ path: '/keep/details/:id', component: noteDetailsPage }
			]
		},
		{
			path: '/mail',
			component: mailPage,
			children: [
				// { path: '', component: '' }, WHAT'S THIS?????
				{ path: '/mail/details/:id', component: mailDetailsPage }
			]
		},
		{
			path: '/about',
			component: aboutPage,
		},
	],
}

export const router = createRouter(routerOptions)
