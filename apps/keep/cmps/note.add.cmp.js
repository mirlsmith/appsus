const noteTypes = [
  { faClass: 'fa fa-font', title: 'Texts', type: 'note-txt' },
  { faClass: 'fa fa-video-camera', title: 'Videos', type: 'note-video' },
  { faClass: 'fa fa-picture-o', title: 'Image', type: 'note-img' },
  { faClass: 'fa fa-list', title: 'Todos', type: 'note-todos' }
]

export default {
  template: `
    <div class="note-add">
      <form class="note-form" @submit.prevent="handleSubmit">
        <input type="text" :placeholder="getTitlePlaceholder" v-model="note.title"
          @click="isOnFocus = true">
        <div class="note-types">
          <i v-for="noteType in getNoteTypes"
            :class="noteType.faClass"
            :class="setActiveClass(noteType.type)"
            :title="noteType.title"
            @click="note.type = noteType.type">
          </i>
        </div>
        <input type="text" v-if="isOnFocus" :placeholder="getNoteTypePlaceholder">
        <button type="submit" v-if="isOnFocus"><i class="fa-solid fa-plus"></i>Create note</button>
      </form>
    </div>
  `,
  data() {
    return {
      note: {
        type: 'note-txt',
        title: '',
      },
      isOnFocus: false
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('onSubmit', this.note)
    },
    setActiveClass(noteType) {
      return { active: this.note.type === noteType }
    }
  },
  computed: {
    getTitlePlaceholder() {
      return this.isOnFocus ? 'Title' : 'Take a note..'
    },
    getNoteTypePlaceholder() {
      let placeholder = 'Take a note..'
      switch (this.note.type) {
        case 'note-video':
          placeholder = 'Type a youtube video url..'
          break;
        case 'note-img':
          placeholder = 'Type a image url..'
          break;
        case 'note-todos':
          placeholder = 'Type a todo-list separated by commas..'
          break;
      }
      return placeholder
    },
    getNoteTypes() {
      return noteTypes
    }
  }
}