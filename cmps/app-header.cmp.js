const navLinks = [
    { to: '/mail', label: 'Mail' },
    { to: '/keep', label: 'Keep' },
    // { to: '/books', label: 'Books' },
    { to: '/about', label: 'About' }
]

export default {
	template: `
        <header class="app-header main-layout full">
            <nav class="main-nav">
                <router-link to="/">
                    <h1>AppSus</h1>
                </router-link>
                <ul class="clean-list flex">
                    <router-link v-for="link in getLinks" :to="link.to" :key="link.label">
                        <li>{{ link.label }}</li>
                    </router-link>
                </ul>
            </nav>
        </header>
    `,
    computed: {
        getLinks() {
            return navLinks
        }
    }
}
