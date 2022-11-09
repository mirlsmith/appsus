
import notePreview from './note-preview.cmp.js'

export default {
  props: ['notes'],
  template: `
    <section class="note-list">
      <note-preview
        v-for="note in notes"
        :note="note"
        :key="note.id" />
    </section>
  `,
  components: {
    notePreview
  }
}