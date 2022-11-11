import { eventBus } from '../../../../services/event-bus.service.js'

export default {
  props: ['info', 'noteId'],
  template: `
    <div style="width: max-content">
      <h6>{{ info.title }}</h6>
      <ul class="clean-list" @click.stop="">
        <li v-for="todo in info.todos">
          <label :style="getIsDoneStyle(todo.isDone)">
            <input type="checkbox" @change="onTodoChange(todo)" v-model="todo.isDone">
            {{todo.txt}}
          </label>
        </li>
      </ul>
    </div>
  `,
  methods: {
    onTodoChange(todo) {
      eventBus.emit('onTodoChange', {
        noteId: this.noteId,
        todo
      })
    },
    getIsDoneStyle(isDone) {
      return isDone ? 'text-decoration: line-through' : ''
    }
  }
}