import noteTxt from './note-types/note-txt.cmp.js'
import noteImg from './note-types/note-img.cmp.js'
import noteTodos from './note-types/note-todos.cmp.js'
import noteVideo from './note-types/note-video.cmp.js'
import noteActions from './note-actions.cmp.js'

export default {
  props: ['note'],
  template: `
    <article class="note-preview"
      draggable="true"
      @dragstart="$emit('onDragStart', $event, note.id)"
      @drop="$emit('onDrop', $event, note.id)"
      @dragover.prevent
      @dragenter.prevent
      :style="note.style"
      @click="$emit('onClick', note)">
      <i class="fa-solid fa-thumbtack pinned"
        :class="rotatePinned"
        :title="getPinnedTitle"
        @click.stop="$emit('onPinned', note)"></i>

      <component
        :is="note.type"
        :info="note.info"
        :noteId="note.id" />

      <note-actions @click.stop=""
        :note="note"
        @onRemove="$emit('onRemove', note.id)"
        @onDuplicate="$emit('onDuplicate', note)" />
    </article>
  `,
  data() {
    return {
    }
  },
  computed: {
    rotatePinned() {
      return { 'rotate-90': !this.note.isPinned }
    },
    getPinnedTitle() {
      return this.note.isPinned ? 'Unpin' : 'Pin'
    }
  },
  components: {
    noteTxt,
    noteImg,
    noteTodos,
    noteVideo,
    noteActions
  }
}