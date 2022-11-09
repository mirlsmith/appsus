export default {
    props: ['mail'],
    template: `
        <article class="mail-preview">
            <h3 class="from">{{ mail.from }}</h3>
            <h3 class="subject">{{ mail.subject }}</h3>
            <h3 class="date">{{ date }}</h3>
        </article>
    `,
    data() {
        return {
        }
    },

    computed: {
        date() {
            const options = {weekday: 'short', month: 'short'}
            const date = new Date(this.mail.sentTimeStamp)
            return date.toLocaleDateString('en-US', options)
        }
    },

    components: {

    },
}