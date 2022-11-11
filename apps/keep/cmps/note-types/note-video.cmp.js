export default {
  props: ['info'],
  template: `
    <div>
      <h4 style="text-align: center; margin-bottom: 3px">{{ info.title }}</h4>
      <iframe :src="info.url" width="100%"></iframe>
    </div>
  `
}