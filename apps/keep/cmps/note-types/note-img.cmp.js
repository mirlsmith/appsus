export default {
  props: ['info'],
  template: `
    <img :src="info.url" :alt="info.title" />
  `
}