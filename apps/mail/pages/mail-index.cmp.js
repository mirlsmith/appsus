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
            //TO DO 
            this.filterBy.text = searchText
        }
    },
    computed: {
        filterType() {
            return this.$route.params.filterBy
        },
        mailsToShow(){
            // console.log('searching by text', this.filterBy.text);
            const regex = new RegExp(this.filterBy.text, 'i')
            // console.log('all mails', this.mails);
            let mails = this.mails.filter(this.filterByType)
            mails = mails.filter((mail) => {
                // console.log('subject:', mail.subject )
                return regex.test(mail.subject)
            }) 
            //TODO filter by text 
            
            // console.log('mails to show', mails);
            return mails
        }
    },
    created() {
        mailService.query()
            .then(mails => {
                this.mails = mails
                // console.log('i was created', 'filter type is', this.filterType);
            })
    
    },
    watch: {
        filterType() {
            // console.log('filter is now', this.filterType);
            this.filterBy.type = this.filterType
            // console.log('filter for mails is now', this.filterBy);
        }
    },

    components: {
        mailService,
        mailList,
        searchBar
    }
}