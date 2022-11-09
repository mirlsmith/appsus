import { mailService } from "../services/mail.service.js"

import mailList from '../../mail/cmps/mail-list.cmp.js'

export default {
    template: `
            <section class="mail-container">
                <mail-list :mails="mailsToShow"/>
            </section>
  `,
    data(){
        return {
            mails: [],
            filterBy: {

            },

        }
    },
    computed: {
        mailsToShow(){
            return this.mails
        }
    },
    created() {
        mailService.query()
            .then(mails => {
                this.mails = mails
            })
    },

    components: {
        mailService,
        mailList
    }
}