import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'

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
	],
}

export const router = createRouter(routerOptions)
