import { notesService } from '../apps/keep/services/note.service.js'

import noteList from '../apps/keep/cmps/note-list.cmp.js'
import noteModal from '../apps/keep/cmps/note-modal.cmp.js'

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
                <note-list :notes="notes"
                    @onNoteClick="handleNoteSelection"
                    @onNotePinned="handleNotePinned"
                    @onNoteRemove="handleNoteRemove"
                    @onNoteDuplicate="handleNoteDuplicate" />
            </div>

            <div v-if="isNoteModalOpen" class="backdrop" @click.self="this.isNoteModalOpen = false"></div>
            <Transition name="custom-classes"
                enter-active-class="animate__animated animate__zoomIn"
                leave-active-class="animate__animated animate__zoomOut">
                <note-modal v-if="isNoteModalOpen"
                    :note="selectedNote"
                    :open="isNoteModalOpen"
                    @onClose="this.isNoteModalOpen = false" />
            </Transition>
        </section>
    `,
    created() {
        this.loadNotes()
    },
    data() {
        return {
            notes: [],
            selectedNote: null,
            isNoteModalOpen: false
        }
    },
    methods: {
        loadNotes() {
            notesService.query()
                .then(notes => this.notes = notes)
        },
        handleNoteSelection(note) {
            this.selectedNote = note
            this.isNoteModalOpen = true
        },
        handleNotePinned(note) {
            console.log('TO-DO: Pinned', note);
        },
        handleNoteRemove(noteId) {
            console.log('TO-DO: Remove', noteId);
        },
        handleNoteDuplicate(note) {
            console.log('TO-DO: Duplicate', note);
        }
    },
    computed: {
        getLinks() {
            return asideLinks
        }
    },
    components: {
        noteList,
        noteModal
    }
}
