import noteTxt from './note-types/note-txt.cmp.js'
import noteImg from './note-types/note-img.cmp.js'
import noteTodos from './note-types/note-todos.cmp.js'
import noteVideo from './note-types/note-video.cmp.js'

export default {
  props: ['note'],
  template: `
    <article class="note-preview"
      :style="note.style"
      @click="$emit('onNoteClick', note)">
      <component
        :is="note.type"
        :info="note.info" />
      <div class="note-preview-actions">
        <i class="fa-solid fa-palette" title="Background color"></i>
        <i class="fa-solid fa-trash-can" title="Remove note"></i>
        <i class="fa-solid fa-clone" title="Duplicate"></i>
        <i class="fa-solid fa-envelope" title="Send to mail"></i>
      </div>
    </article>
  `,
  data() {
    return {
    }
  },
  methods: {
  },
  components: {
    noteTxt,
    noteImg,
    noteTodos,
    noteVideo
  }
}