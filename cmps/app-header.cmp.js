const navLinks = [
    { to: '/', label: 'Home', src: 'assets/img/home.png' },
    { to: '/mail/index/inbox', label: 'Mail', src: 'assets/img/gmail.png' },
    { to: '/keep', label: 'Keep', src: 'assets/img/keep.png' },
    // { to: '/books', label: 'Books' },
    { to: '/about', label: 'About', src: 'assets/img/about.png' }
]

export default {
	template: `
        <header class="app-header full">
            <nav class="main-nav">
                <router-link to="/">
                    <img src="assets/img/home.png" alt="App Icon">
                </router-link>
                <div class="main-links">
                    <svg @click="isMenuOpen = !isMenuOpen" focusable="false" viewBox="0 0 24 24"><path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path></svg>

                    <Transition name="custom-classes"
                        enter-active-class="animate__animated animate__fadeInDown animate__faster"
                        leave-active-class="animate__animated animate__fadeOut animate__faster">
                        <nav v-if="isMenuOpen" @click="isMenuOpen = false">
                            <router-link v-for="link in getLinks" :to="link.to" :key="link.label">
                                <p>{{ link.label }}</p>
                                <img :src="link.src" :alt="link.label">
                            </router-link>
                        </nav>
                    </Transition>
                </div>
            </nav>
        </header>
    `,
    computed: {
        getLinks() {
            return navLinks
        }
    },
    data() {
        return {
            isMenuOpen: false
        }
    }
}
