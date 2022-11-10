import noteActions from './note-actions.cmp.js'

export default {
  props: ['note', 'open'],
  template: `
    <div class="note-modal">
      <section class="modal-title">
        <h3 >{{ note?.title || 'untitled' }}</h3>
        <div class="title-actions">
          <i class="fa-solid fa-xmark" @click="$emit('onClose')"></i>
          <i class="fa-solid fa-thumbtack" :class="rotatePinned" @click="togglePinned"></i>
        </div>
      </section>

      <section class="modal-content">
        <pre>
          {{ note }}
        </pre>
      </section>

      <section class="flex justify-between">
        <note-actions />
        <button type="button">Save</button>
      </section>
    </div>
  `,
  data() {
    return {
      selectedNote: this.note
    }
  },
  methods: {
    togglePinned() {
      this.selectedNote.isPinned = !this.selectedNote.isPinned
    }
  },
  computed: {
    rotatePinned() {
      return { 'rotate-90': !this.selectedNote.isPinned }
    }
  },
  components: {
    noteActions
  }
}