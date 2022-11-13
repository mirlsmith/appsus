import { eventBus } from '../../../../services/event-bus.service.js'

export default {
  props: ['info', 'noteId'],
  template: `
    <div class="note-todos">
      <h6>{{ info.title }}</h6>
      <ul class="clean-list todos-list" @click.stop="">
        <li v-for="(todo, idx) in info.todos" class="flex">
          <input type="checkbox" @change="onTodoChange(todo)" v-model="todo.isDone" :id="getUniqeTodoId(idx)">
          <label :style="getIsDoneStyle(todo.isDone)" :for="getUniqeTodoId(idx)">{{ todo.txt }}</label>
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
    },
    getUniqeTodoId(idx) {
      return this.noteId + '-' + idx
    }
  }
}