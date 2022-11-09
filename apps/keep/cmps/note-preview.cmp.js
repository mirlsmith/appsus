export default {
  props: ['note'],
  template: `
    <article class="note-preview"
      :style="note.style"
      @click="$emit('onNoteClick', note)">
      <component
        :is="note.type"
        :info="note.info" />
    </article>
  `,
  data() {
    return {
    }
  },
  methods: {
  }
}