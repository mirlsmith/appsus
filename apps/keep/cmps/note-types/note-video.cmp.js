export default {
  props: ['info'],
  template: `
    <iframe :src="info.url" width="100%"></iframe>
  `
}