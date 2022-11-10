export default {
    props: ['mail'],
    template: `
        <article  class="mail-preview">
            <div>
            <i class="fa-regular fa-star"></i>
            </div>
            <h3 class="from">{{ mail.from }}</h3>
            <div class="subject-body">
                <h3 class="subject">{{ mail.subject }} - </h3>
                <span class="body">{{mail.body}}</span>
            </div>
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