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
        <section class="keep-page right-of-sidenav">

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
                    :class="{ 'drag-active': isPinnedDrag }"
                    enter-class="animate__bounceIn"
                    leave-class="animate__bounceOut"
                    @onNoteClick="handleNoteSelection"
                    @onNotePinned="handleNotePinned"
                    @onNoteRemove="handleNoteRemove"
                    @onNoteDuplicate="handleNoteDuplicate"
                    @onDragStart="handleNoteDrag"
                    @onDrop="handleNoteDrop"
                />

                <p v-if="getUnpinnedNotes.length > 0" style="margin-top: 32px">OTHERS</p>
                <note-list :notes="getUnpinnedNotes"
                    :class="{ 'drag-active': isUnpinnedDrag }"
                    enter-class="animate__fadeInDown"
                    leave-class="animate__backOutDown"
                    @onNoteClick="handleNoteSelection"
                    @onNotePinned="handleNotePinned"
                    @onNoteRemove="handleNoteRemove"
                    @onNoteDuplicate="handleNoteDuplicate"
                    @onDragStart="handleNoteDrag"
                    @onDrop="handleNoteDrop"
                />

            </div>

            <div v-if="isNoteModalOpen" class="backdrop" @click.self="isNoteModalOpen = false"></div>
            <Transition name="custom-classes"
                enter-active-class="animate__animated animate__fadeInDown animate__fast"
                leave-active-class="animate__animated animate__fadeOutDown animate__faster">
                <note-modal v-if="isNoteModalOpen"
                    :note="selectedNote"
                    :open="isNoteModalOpen"
                    @onClose="isNoteModalOpen = false"
                    @onNoteRemove="noteId => { handleNoteRemove(noteId); isNoteModalOpen = false }"
                    @onNoteDuplicate="note => { handleNoteDuplicate(note); isNoteModalOpen = false }"
                    @onSaveNote="handleNoteSave"
                    @onSendToMail="handleMailSend"
                    @onTodoChange="handleTodoChange" />
            </Transition>
        </section>
    `,
    created() {
        this.loadNotes()
        this.todoChangeListener = eventBus.on('onTodoChange', this.handleTodoChange)
        this.txtChangeListener = eventBus.on('onTxtChange', this.handleTxtChange)
        this.bgColorChangeListener = eventBus.on('onBgChange', payload => this.handleBgChangeChange(payload, true))
        this.mailSendListener = eventBus.on('onSendToMail', this.handleMailSend)

        window.addEventListener('dragend', () => {
            this.isPinnedDrag = false
            this.isUnpinnedDrag = false
        })
    },
    unmounted() {
        this.todoChangeListener && this.todoChangeListener()
        this.txtChangeListener && this.txtChangeListener()
        this.bgColorChangeListener && this.bgColorChangeListener()
        this.mailSendListener && this.mailSendListener()
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
            txtChangeListener: null,
            bgColorChangeListener: null,
            mailSendListener: null,
            isPinnedDrag: false,
            isUnpinnedDrag: false
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
            else todo.doneAt = null
            notesService.updateNote(note)
        },
        handleTxtChange({ noteId, info }) {
            const note = this.notes.find(note => note.id === noteId)
            note.info = info
            notesService.updateNote(note)
        },
        handleBgChangeChange({ note, bgColor }, quickSave = false) {
            note.style = {} // just for the demo data (because, some don't have .style obj, can be remove on app-ready)
            note.style.backgroundColor = bgColor
            if (quickSave) notesService.updateNote(note)
        },
        handleNoteSave(note) {
            let matchedIdx = this.notes.findIndex(n => n.id === note.id)
            this.notes[matchedIdx] = note
            notesService.updateNote(note)
                .then(() => {
                    showSuccessMsg('Changes to the note has been updated successfully!')
                    this.isNoteModalOpen = false
                })
        },
        handleNoteDrag(ev, noteId) {
            ev.dataTransfer.dropEffect = 'move'
            ev.dataTransfer.effectAllowed = 'move'
            ev.dataTransfer.setData('noteId', noteId)
            console.log('this.getPinnedNotes.includes(noteId)', this.getPinnedNotes)
            this.getPinnedNotes.find(pinnedNote => pinnedNote.id === noteId)
                ? this.isPinnedDrag = true
                : this.isUnpinnedDrag = true
        },
        handleNoteDrop(ev, droppedOnNnoteId) {
            const noteId = ev.dataTransfer.getData('noteId')

            const fromIdx = this.notes.findIndex(n => n.id === noteId)
            const fromNote = this.notes[fromIdx]
            const toIdx = this.notes.findIndex(n => n.id === droppedOnNnoteId)
            const toNote = this.notes[toIdx]

            this.notes.splice(fromIdx, 1, toNote)
            this.notes.splice(toIdx, 1, fromNote)

            notesService.saveNotesOrder(this.notes)
        },
        handleMailSend(note) {
            const { info } = note
            const subject = info.title
            const todoTexts = info?.todos?.map(todo => todo.txt)
            const body = info?.txt || info?.url || JSON.stringify(todoTexts.toString() || '')
            this.$router.push(`/mail/index/inbox?subject=${subject}&body=${body}`)
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
