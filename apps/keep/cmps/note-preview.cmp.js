import noteTxt from './note-types/note-txt.cmp.js'
import noteImg from './note-types/note-img.cmp.js'
import noteTodos from './note-types/note-todos.cmp.js'
import noteVideo from './note-types/note-video.cmp.js'
import noteActions from './note-actions.cmp.js'

export default {
  props: ['note'],
  template: `
    <article class="note-preview"
      :style="note.style"
      @click="$emit('onClick', note)">
      <i class="fa-solid fa-thumbtack pinned"
        :class="rotatePinned"
        :title="getPinnedTitle"
        @click.stop="$emit('onPinned', note)"></i>

      <component
        :is="note.type"
        :info="note.info" />

      <note-actions @click.stop=""
        @onBgClick="toggleColors"
        @onRemove="$emit('onRemove', note.id)"
        @onDuplicate="$emit('onDuplicate', note)"
        @onSendMail="sendToMail" />
    </article>
  `,
  data() {
    return {
    }
  },
  methods: {
    toggleColors() {
      console.log('TODO: Open color picker');
    },
    sendToMail() {
      console.log('TODO: Send to mail');
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