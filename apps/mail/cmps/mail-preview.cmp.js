export default {
    props: ['mail'],
    template: `
        <article  class="mail-preview clk">
            <i class="fa-regular fa-star clk"></i>
            <h3 class="from">{{ mail.from }}</h3>
            <h3 class="subject">{{ mail.subject }} - </h3>
            <p class="body">{{mail.body}}</p>
            <span class="date">{{ formattedDate }}</span>
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
            const date = new Date(this.mail.sentTimeStamp*1000)
            const options = { day: '2-digit', month: 'short' }
            return date.toLocaleDateString('en-GB', options)
        }
    },

    components: {

    },
}