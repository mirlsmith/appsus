export default {
    props: ['mail'],
    template: `
        <article class="mail-preview">
            <h3>{{ mail.from }}</h3>
            <h3>{{ mail.subject }}</h3>
            <h3>{{ mail.sentTimeStamp }}</h3>
        </article>
    `,
    data() {
        return {
        }
    },

    computed: {
        
    },

    components: {

    },
}