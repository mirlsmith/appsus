import mailPreview from './mail-preview.cmp.js'

export default {
    props:['mails'],
    template: `
        <section class="mail-list">
            <ul>
                <li v-for="mail in mails" :key="mail.id">
                    <mail-preview :mail="mail"/>
                    <section class="actions">

                    </section>

                </li>
            </ul>

        </section>
    `,
    data() {
        return {
        }
    },
    methods: {

    },

    computed: {

    },

    components: {
        mailPreview
    },
}