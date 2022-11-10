import { mailService } from "../services/mail.service.js"

import searchBar from "../../../cmps/search-bar.cmp.js"
import mailList from '../../mail/cmps/mail-list.cmp.js'

export default {
    template: `
            <search-bar @searched="setTextFilter"/>
            <section class="mail-container">
                <mail-list :mails="mailsToShow"/>
            </section>
  `,
    data(){
        return {
            mails: [],
            filterBy: {
                type: this.filterType,
                text: ''
            },
        }
    },
    methods: {
        filterByType(mail) {
            const filterType = this.filterBy.type || this.filterType
           
            if (mail.isRemoved) return (filterType === 'trash')
            else {
                if (filterType === 'inbox') return (mail.to === mailService.getUser().email)
                if (filterType === 'starred') return mail.isStarred
                if (filterType === 'sent') return (mail.from === mailService.getUser().email)
                if (filterType === 'drafts') return mail.isDraft
            }
        },
        setTextFilter(searchText) {
            this.filterBy.text = searchText
        }
    },
    computed: {
        filterType() {
            return this.$route.params.filterBy
        },
        mailsToShow(){
            const regex = new RegExp(this.filterBy.text, 'i')
            let mails = this.mails.filter(this.filterByType)
            mails = mails.filter((mail) => {
                return regex.test(mail.subject)
            }) 
            return mails
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
            this.filterBy.type = this.filterType
        }
    },

    components: {
        mailService,
        mailList,
        searchBar
    }
}