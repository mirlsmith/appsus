import { notesService } from '../apps/keep/services/note.service.js'

import noteList from '../apps/keep/cmps/note-list.cmp.js'

const asideLinks = [
    { to: '/keep', faClass: 'fa fa-sticky-note-o' },
    { to: '/keep/text', faClass: 'fa fa-font' },
    { to: '/keep/video', faClass: 'fa fa-video-camera' },
    { to: '/keep/image', faClass: 'fa fa-picture-o' },
    { to: '/keep/list', faClass: 'fa fa-list' }
]

export default {
    template: `
        <section class="keep-page">

            <aside class="note-filters">
                <router-link v-for="link in getLinks" :to="link.to" :key="link.label">
                    <i :class="link.faClass"></i>
                </router-link>
            </aside>

            <div class="container">
                <note-list :notes="notes" />
            </div>
        </section>
    `,
    created() {
        this.loadNotes()
    },
    data() {
        return {
            notes: []
        }
    },
    methods: {
        loadNotes() {
            notesService.query()
                .then(notes => this.notes = notes)
        }
    },
    computed: {
        getLinks() {
            return asideLinks
        }
    },
    components: {
        noteList
    }
}
