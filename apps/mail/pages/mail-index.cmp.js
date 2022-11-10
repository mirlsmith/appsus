import { mailService } from "../services/mail.service.js"

import searchBar from "../../../cmps/search-bar.cmp.js"
import mailList from '../../mail/cmps/mail-list.cmp.js'

export default {
    template: `
            <!-- <header class="mail-header"> -->
                <!-- <input type="search" placeholder="Search" /> -->
                <search-bar @searched="setTextFilter"/>
            <!-- </header> -->
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
                // if (filterType === 'inbox') return (mail.to === mailService.getUser().email && !mail.isRemoved)
                if (filterType === 'inbox') return (mail.to === mailService.getUser().email)
                if (filterType === 'starred') return mail.isStarred
                // if (filterType === 'sent') return (mail.from === mailService.getUser().email && !mail.isRemoved)
                if (filterType === 'sent') return (mail.from === mailService.getUser().email)
                if (filterType === 'drafts') return mail.isDraft
            }
        },
        setTextFilter(searchText) {
            //TO DO 
        }
    },
    computed: {
        filterType() {
            return this.$route.params.filterBy
        },
        mailsToShow(){
            // console.log('all mails', this.mails);
            var mails //TODO filter by text 
            mails = this.mails.filter(this.filterByType)
            
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