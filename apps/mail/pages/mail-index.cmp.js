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
                type: 'inbox',
                word: ''
            },

        }
    },
    computed: {
        filterType() {
            return this.$route.params.filterBy
        },
        mailsToShow(){
            //I AM HERE
            return this.mails
        }
    },
    created() {
        mailService.query()
            .then(mails => {
                this.mails = mails
            })
    },
    watch: {
        filterType() {
            console.log('filter is now', this.filterType);
            this.filterBy.type = this.filterType
            console.log('filter for mails is now', this.filterBy);
        }
    },

    components: {
        mailService,
        mailList
    }
}