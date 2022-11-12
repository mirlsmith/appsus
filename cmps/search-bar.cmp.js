export default {
    template: `

        <section class="search-bar right-of-sidenav">
            <div class="search-container">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input
                    @input="onSearched"
                    type="search" placeholder="Search" />
            </div>
        </section>
    `,
    methods: {
        onSearched(ev){
            const value = ev.target.value.trim()
            this.$emit('searched', value)
        }
    }
}