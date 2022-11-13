import noteActions from './note-actions.cmp.js'

export default {
  props: ['note', 'open'],
  template: `
    <div class="note-modal" v-if="selectedNote">
      <section class="modal-title">
        <h3 contenteditable="true" @input="onContentChange($event, 'title')" class="outline-none">{{ selectedNote.info.title || 'Untitled' }}</h3>
        <div class="title-actions">
          <i class="fa-solid fa-thumbtack" :class="rotatePinned" @click="togglePinned" :title="getPinnedTitle"></i>
          <i class="fa-solid fa-xmark" @click="$emit('onClose')"></i>
        </div>
      </section>

      <section class="modal-content" :style="selectedNote.style">
        <p v-if="selectedNote.type === 'note-txt'" contenteditable="true"
          @input="onContentChange($event, 'txt')"
          class="outline-none">
          {{ selectedNote.info.txt || 'Enter some text to save' }}
        </p>
        <p v-else-if="selectedNote.type === 'note-video' || selectedNote.type === 'note-img'" contenteditable="true"
          @input="onContentChange($event, 'url')"
          class="outline-none">
          {{ selectedNote.info.url || 'Enter a url (YouTube or image link)' }}
        </p>
        <div v-else> <!-- Todos case -->
          <ul class="clean-list todos-list" @click.stop="">
            <li v-for="(todo, idx) in selectedNote.info.todos" class="flex">
              <input type="checkbox" v-model="todo.isDone" :id="getUniqeTodoId(idx)">
              <label class="outline-none" @click.prevent=""
                :style="getIsDoneStyle(todo.isDone)"
                :for="getUniqeTodoId(idx)"
                contenteditable="true"
                @input="onTodoTxtChange($event, todo)">
                {{ todo.txt }}
              </label>
            </li>
          </ul>
        </div>
      </section>

      <section class="modal-actions">
        <note-actions :note="selectedNote"
          @onRemove="$emit('onNoteRemove', selectedNote.id)"
          @onDuplicate="$emit('onNoteDuplicate', selectedNote)"
          @onBgChange="onBgColorChange"
          @onSendToMail="() => console.log('TODO')" />
        <button type="button" class="blue-mail-btn" @click="$emit('onSaveNote', selectedNote)">Save</button>
      </section>
    </div>
  `,
  created() {
    this.selectedNote = JSON.parse(JSON.stringify(this.note))
  },
  data() {
    return {
      selectedNote: null
    }
  },
  methods: {
    togglePinned() {
      this.selectedNote.isPinned = !this.selectedNote.isPinned
    },
    onContentChange(ev, key) {
      this.selectedNote.info[key] = ev.target.innerText
    },
    getIsDoneStyle(isDone) {
      return isDone ? 'text-decoration: line-through' : ''
    },
    onBgColorChange(color) {
      this.selectedNote.style.backgroundColor = color
    },
    onTodoTxtChange(ev, todo) {
      todo.txt = ev.target.innerText
    },
    getUniqeTodoId(idx) {
      return this.selectedNote.id + '-' + idx
    }
  },
  computed: {
    rotatePinned() {
      return { 'rotate-90': !this.selectedNote.isPinned }
    },
    getPinnedTitle() {
      return this.selectedNote.isPinned ? 'Unpin' : 'Pin'
    }
  },
  components: {
    noteActions
  }
}