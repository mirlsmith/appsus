export default {
    template: `

        <section class="search-bar">
            <div class="search-container">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input
                    @change="onSearched" 
                    v-model.trim.lazy="searchText"
                    type="search" placeholder="Search" />
            </div>
        </section>
    `,
    data() {
        return {
            searchText: ''
        }
    },
    methods: {
        onSearched(){
            this.$emit('searched', this.searchText)
        }
    },
}