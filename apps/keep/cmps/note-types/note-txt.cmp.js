export default {
  props: ['info'],
  template: `
    <p>{{ info.txt }}</p>
  `,
  created() {
    console.log('this.info', this.info)
  }
}