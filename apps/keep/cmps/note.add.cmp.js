const NOTE_TYPES = {
  NOTE_TXT: 'note-txt',
  NOTE_VIDEO: 'note-video',
  NOTE_IMG: 'note-img',
  NOTE_TODOS: 'note-todos'
}

const noteTypes = [
  { faClass: 'fa fa-font', title: 'Texts', type: NOTE_TYPES.NOTE_TXT },
  { faClass: 'fa fa-video-camera', title: 'Videos', type: NOTE_TYPES.NOTE_VIDEO },
  { faClass: 'fa fa-picture-o', title: 'Image', type: NOTE_TYPES.NOTE_IMG },
  { faClass: 'fa fa-list', title: 'Todos', type: NOTE_TYPES.NOTE_TODOS }
]

const gMapNoteTypeToInfoKey = {
  [NOTE_TYPES.NOTE_TXT]: 'txt',
  [NOTE_TYPES.NOTE_VIDEO]: 'url',
  [NOTE_TYPES.NOTE_IMG]: 'url',
  [NOTE_TYPES.NOTE_TODOS]: 'todos'
}

export default {
  template: `
    <div class="note-add">
      <form class="note-form" @submit.prevent="handleSubmit">
        <input type="text" :placeholder="getTitlePlaceholder" v-model="note.info.title"
          @click="isOnFocus = true">
        <div class="note-types">
          <i v-for="noteType in getNoteTypes"
            :class="getNoteTypeClasses(noteType)"
            :title="noteType.title"
            @click="note.type = noteType.type">
          </i>
        </div>
        <Transition name="custom-classes"
          enter-active-class="animate__animated animate__fadeInDown animate__faster"
          leave-active-class="animate__animated animate__fadeOutUp animate__fast">
            <div v-if="isOnFocus" class="dynamic-input">
              <input type="text" :placeholder="getNoteTypePlaceholder" v-model="dynamicCmpValue">
              <button type="submit"><i class="fa-solid fa-plus"></i>Create note</button>
            </div>
        </Transition>
      </form>
    </div>
  `,
  data() {
    return {
      note: {
        type: NOTE_TYPES.NOTE_TXT,
        isPinned: false,
        info: {
          title: ''
        },
        style: {
          backgroundColor: '#f1f3f4'
        }
      },
      dynamicCmpValue: '',
      isOnFocus: false
    }
  },
  methods: {
    getDynamicValue() {
      switch (this.note.type) {
        case NOTE_TYPES.NOTE_TODOS:
          return this.dynamicCmpValue.split(',')
            .map(key => ({ txt: key.trim(), isDone: false }))
        case NOTE_TYPES.NOTE_VIDEO:
          const url = new URL(this.dynamicCmpValue)
          const videoId = new URLSearchParams(url.search).get('v')
          return 'https://www.youtube.com/embed/' + videoId
      
        default:
          return this.dynamicCmpValue
      }
    },
    handleSubmit() {
      const dynamicCmpKey = gMapNoteTypeToInfoKey[this.note.type]
      const note = {
        ...this.note,
        info: {
          title: this.note.info.title,
          [dynamicCmpKey]: this.getDynamicValue()
        }
      }

      this.note.info.title = ''
      this.dynamicCmpValue = ''
      this.$emit('onSubmit', note)
    },
    getNoteTypeClasses(noteType) {
      return {
        active: this.note.type === noteType.type,
        [noteType.faClass]: true
      }
    }
  },
  computed: {
    getTitlePlaceholder() {
      return this.isOnFocus ? 'Title' : 'Take a note..'
    },
    getNoteTypePlaceholder() {
      let placeholder = 'Take a note..'
      switch (this.note.type) {
        case NOTE_TYPES.NOTE_VIDEO:
          placeholder = 'Type a youtube video url..'
          break;
        case NOTE_TYPES.NOTE_IMG:
          placeholder = 'Type a image url..'
          break;
        case NOTE_TYPES.NOTE_TODOS:
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