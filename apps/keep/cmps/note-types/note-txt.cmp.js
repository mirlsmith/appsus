import { eventBus } from '../../../../services/event-bus.service.js'

export default {
  props: ['info', 'noteId'],
  template: `
    <div @click.stop="">
      <h4 contenteditable="true" @input="onTxtChange($event, 'title')" class="outline-none">{{ info.title }}</h4>
      <p contenteditable="true" @input="onTxtChange($event, 'txt')" class="outline-none" style="white-space: normal">{{ info.txt }}</p>
    </div>
  `,
  methods: {
    onTxtChange(ev, key) {
      eventBus.emit('onTxtChange', {
        noteId: this.noteId,
        info: {
          ...this.info,
          [key]: ev.target.innerText
        }
      })
    }
  }
}