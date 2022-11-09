export default {
    props: ['mail'],
    template: `
        <article  class="mail-preview">
            <h3 class="from">{{ mail.from }}</h3>
            <h3 class="subject">{{ mail.subject }}</h3>
            <h3 class="date">{{ formattedDate }}</h3>
        </article>
    `,
    data() {
        return {
        }
    },
    methods: {

    },

    computed: {
        formattedDate() {
            const date = new Date(+this.mail.sentTimeStamp*1000)
            // const date = new Date()
            const options = { day: '2-digit', month: 'short' }
            return date.toLocaleDateString('en-GB', options)
            // return date.toLocaleDateString()
            // return this.mail.sentTimeStamp

            // return new Intl.DateTimeFormat('en-US').format(date)
        }
    },

    components: {

    },
}