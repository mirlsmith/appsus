export default {
  props: ['info'],
  template: `
    <div>
      <h6 :text="info.title"></h6>
      <ul>
        <li v-for="todo in info.todos"></li>
      </ul>
    </div>
  `
}