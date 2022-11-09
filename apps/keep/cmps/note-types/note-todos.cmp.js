export default {
  props: ['info'],
  template: `
    <div>
      <h6>{{ info.title }}</h6>
      <ul class="clean-list">
        <li v-for="todo in info.todos">
          <input type="checkbox"> {{todo.txt}}
        </li>
      </ul>
    </div>
  `
}