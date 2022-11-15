import { eventBus } from '../../../services/event-bus.service.js'

const platteColors = [
  '#f1f3f4',
  '#3B3486',
  '#497174',
  '#FEBE8C',
  '#50577A',
  '#FF8787',
  '#2192FF',
  '#EB1D36'
]

export default {
  props: ['note'],
  template: `
    <div class="note-actions" @mouseleave="isPlatteOpen = false">
      <i class="fa-solid fa-palette" title="Background color" @click="platteOpen"></i>
      <i class="fa-solid fa-trash-can" title="Remove note" @click="$emit('onRemove')"></i>
      <i class="fa-solid fa-clone" title="Duplicate" @click="$emit('onDuplicate')"></i>
      <i class="fa-solid fa-envelope" title="Send to mail" @click="onSendToMail"></i>
      <Transition name="custom-classes"
        enter-active-class="animate__animated animate__fadeInUp animate__faster"
        leave-active-class="animate__animated animate__fadeOutDown animate__fast">
        <div class="note-platte" v-if="isPlatteOpen">
          <div v-for="color in getPlatteColors"
            class="platte-color"
            :class="{ active: note?.style?.backgroundColor === color }"
            @click="onBgClick(color)"
            :style="{ 'background-color': color }"></div>
          </div>
      </Transition>
    </div>
  `,
  data() {
    return {
      bgColor: this.note?.style?.backgroundColor || 'grey',
      isPlatteOpen: false
    }
  },
  methods: {
    platteOpen() {
      this.isPlatteOpen = !this.isPlatteOpen
    },
    onBgClick(bgColor) {
      const payload = {
        note: this.note,
        bgColor
      }

      this.$emit('onBgChange', payload)
      eventBus.emit('onBgChange', payload)
    },
    onSendToMail() {
      this.$emit('onSendToMail', this.note)
      eventBus.emit('onSendToMail', this.note)
    }
  },
  computed: {
    getPlatteColors() {
      return platteColors
    }
  }
}