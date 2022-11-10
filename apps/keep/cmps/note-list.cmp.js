
import notePreview from './note-preview.cmp.js'

export default {
  props: ['notes', 'enterClass', 'leaveClass'],
  template: `
    <section class="note-list">
      <TransitionGroup name="custom-classes"
        :enter-active-class="'animate__animated ' + enterClass"
        :leave-active-class="'animate__animated ' + leaveClass">

        <note-preview
          v-for="note in notes"
          :note="note"
          :key="note.id"
          @onClick="note => $emit('onNoteClick', note)"
          @onPinned="note => $emit('onNotePinned', note)"
          @onRemove="noteId => $emit('onNoteRemove', noteId)"
          @onDuplicate="note => $emit('onNoteDuplicate', note)" />
      </TransitionGroup>
    </section>
  `,
  components: {
    notePreview
  }
}