import { utilService } from '../services/util.service.js'

export default {
    template: `

        <section class="search-bar right-of-sidenav">
            <div class="search-container">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input
                    @input="handleSearchChange"
                    type="search" placeholder="Search" />
            </div>
        </section>
    `,
    data() {
        return {
            handleSearchChange: () => {}
        }
    },
    created() {
        this.handleSearchChange = utilService.debounce(this.doSearch, 500)
    },
    methods: {
        doSearch(ev) {
            const value = ev.target.value.trim()
            this.$emit('searched', value)
        }
    }
}