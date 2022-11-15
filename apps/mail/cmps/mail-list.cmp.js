import mailPreview from './mail-preview.cmp.js'

export default {
    props:['mails'],
    template: `
        <section class="mail-list">
            <ul class="clean-list">
                <li v-for="mail in mails" :key="mail.id"
                    @click="showMailDetails(mail.id)">
                    <mail-preview :mail="mail" />
                </li>
            </ul>

        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        showMailDetails(mailId) {
            this.$router.push(`/mail/details/${mailId}`)
        }

    },

    computed: {

    },

    components: {
        mailPreview
    },
}