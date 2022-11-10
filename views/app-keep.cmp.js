import { notesService } from '../apps/keep/services/note.service.js'

import noteList from '../apps/keep/cmps/note-list.cmp.js'
import noteModal from '../apps/keep/cmps/note-modal.cmp.js'
import searchBar from '../cmps/search-bar.cmp.js'

const asideLinks = [
    { to: '/keep', faClass: 'fa fa-sticky-note-o', title: 'Keep' },
    { to: '/keep/text', faClass: 'fa fa-font', title: 'Texts' },
    { to: '/keep/video', faClass: 'fa fa-video-camera', title: 'Videos' },
    { to: '/keep/image', faClass: 'fa fa-picture-o', title: 'Images' },
    { to: '/keep/todos', faClass: 'fa fa-list', title: 'Todos' }
]

const gFilterMapKey = {
    '': '',
    'text': 'note-txt',
    'video': 'note-video',
    'image': 'note-img',
    'todos': 'note-todos'
}

export default {
    template: `
        <section class="keep-page">

            <search-bar @searched="setFilterByTxt" />

            <aside class="side-nav">
                <router-link v-for="link in getLinks" :to="link.to" :key="link.title">
                    <i :class="link.faClass" :title="link.title"></i>
                </router-link>
            </aside>

            <div class="notes-container">

                <p v-if="pinnedNotesToShow.length > 0">PINNED</p>
                <note-list :notes="pinnedNotesToShow"
                    enter-class="animate__bounceIn"
                    leave-class="animate__bounceOut"
                    @onNoteClick="handleNoteSelection"
                    @onNotePinned="handleNotePinned"
                    @onNoteRemove="handleNoteRemove"
                    @onNoteDuplicate="handleNoteDuplicate" />

                <p v-if="notesToShow.length > 0">OTHERS</p>
                <note-list :notes="notesToShow"
                    enter-class="animate__fadeInDown"
                    leave-class="animate__backOutDown"
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
            pinnedNotes: [],
            selectedNote: null,
            isNoteModalOpen: false,
            filter: {
                type: '',
                txt: ''
            }
        }
    },
    watch: {
        getFilter(filter) {
            this.filter.type = gFilterMapKey[filter] || ''
        }
    },
    methods: {
        setFilterByTxt(txt) {
            this.filter.txt = txt
        },
        loadNotes() {
            notesService.query()
                .then(notes => {
                    this.pinnedNotes = notes.filter(note => note.isPinned) // Pinned notes
                    this.notes = notes.filter(note => !note.isPinned) // Others
                })
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
        notesToShow() {
            if (!this.filter.type) return this.notes
            const regex = new RegExp(this.filter.txt, 'i')
            return this.notes.filter(note => note.type === this.filter.type && regex.test(note.info.title))
        },
        pinnedNotesToShow() {
            const regex = new RegExp(this.filter.txt, 'i')

            return this.pinnedNotes.filter(note => note.type === this.filter.type)
        },
        getFilter() {
            return this.$route.params.filterBy
        },
        getLinks() {
            return asideLinks
        }
    },
    components: {
        noteList,
        noteModal,
        searchBar
    }
}
