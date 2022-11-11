import { notesService } from '../apps/keep/services/note.service.js'
import { eventBus, showSuccessMsg } from '../services/event-bus.service.js'

import searchBar from '../cmps/search-bar.cmp.js'
import noteList from '../apps/keep/cmps/note-list.cmp.js'
import noteModal from '../apps/keep/cmps/note-modal.cmp.js'
import noteAdd from '../apps/keep/cmps/note.add.cmp.js'

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
                <note-add @onSubmit="handleNoteAdded" />
                
                <p v-if="getPinnedNotes.length > 0">PINNED</p>
                <note-list :notes="getPinnedNotes"
                    enter-class="animate__bounceIn"
                    leave-class="animate__bounceOut"
                    @onNoteClick="handleNoteSelection"
                    @onNotePinned="handleNotePinned"
                    @onNoteRemove="handleNoteRemove"
                    @onNoteDuplicate="handleNoteDuplicate" />

                <p v-if="getUnpinnedNotes.length > 0">OTHERS</p>
                <note-list :notes="getUnpinnedNotes"
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
        this.todoChangeListener = eventBus.on('onTodoChange', this.handleTodoChange)
        this.txtChangeListener = eventBus.on('onTxtChange', this.handleTxtChange)
    },
    unmounted() {
        this.todoChangeListener && this.todoChangeListener()
        this.txtChangeListener && this.txtChangeListener()
    },
    data() {
        return {
            notes: [],
            selectedNote: null,
            isNoteModalOpen: false,
            filter: {
                type: '',
                txt: ''
            },
            todoChangeListener: null,
            txtChangeListener: null
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
                .then(notes => this.notes = notes)
        },
        handleNoteSelection(note) {
            this.selectedNote = note
            this.isNoteModalOpen = true
        },
        handleNoteAdded(note) {
            notesService.save(note, false)
                .then(newNote => {
                    this.notes.unshift(newNote)
                    showSuccessMsg('The note has been added!')
                })
        },
        handleNotePinned(note) {
            note.isPinned = !note.isPinned
            notesService.updateNote(note)
        },
        handleNoteRemove(noteId) {
            notesService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)
                    showSuccessMsg('The note has been removed!')
                })
        },
        handleNoteDuplicate(note) {
            const dupNote = JSON.parse(JSON.stringify(note))
            dupNote.info.title += ' (Duplicated)'
            notesService.save(dupNote, false)
                .then(newNote => {
                    this.notes.unshift(newNote)
                    showSuccessMsg('The note has been duplicated!')
                })
        },
        handleTodoChange({ noteId, todo }) {
            const note = this.notes.find(n => n.id === noteId)
            if (todo.isDone) todo.doneAt = Date.now()
            notesService.updateNote(note)
        },
        handleTxtChange({ noteId, info }) {
            const note = this.notes.find(note => note.id === noteId)
            note.info = info
            notesService.updateNote(note)
        }
    },
    computed: {
        getPinnedNotes() {
            const pinnedNotes = this.notes.filter(note => note.isPinned)
            const regex = new RegExp(this.filter.txt, 'i')
            return (this.filter.type ?
                pinnedNotes.filter(note => note.type === this.filter.type) :
                pinnedNotes)
                .filter(note => regex.test(note.info.title))
        },
        getUnpinnedNotes() {
            const unpinnedNotes = this.notes.filter(note => !note.isPinned)
            const regex = new RegExp(this.filter.txt, 'i')
            return (this.filter.type ?
                unpinnedNotes.filter(note => note.type === this.filter.type) :
                unpinnedNotes)
                .filter(note => regex.test(note.info.title))
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
        searchBar,
        noteAdd
    }
}
