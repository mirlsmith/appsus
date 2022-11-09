
import notePreview from './note-preview.cmp.js'

import noteText from './note-types/note-text.cmp.js'

export default {
  props: ['notes'],
  template: `
    <note-preview
      v-for="note in notes"
      :note="note"
      :key="note.id" />
  `,
  components: {
    notePreview,
    noteText
  }
}