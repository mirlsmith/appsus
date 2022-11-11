import { mailService } from "../services/mail.service.js"

import searchBar from "../../../cmps/search-bar.cmp.js"
import mailList from '../../mail/cmps/mail-list.cmp.js'
import { eventBus } from "../../../services/event-bus.service.js"

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
            unmountedSentEmail: null
        }
    },
    methods: {
        filterByType(mail) {
            const filterType = this.filterBy.type || this.filterType
           
            if (mail.isDiscarded) return (filterType === 'trash')
            else {
                if (filterType === 'inbox') return (mail.to === mailService.getUser().email   && !mail.isDraft)
                if (filterType === 'starred') return mail.isStarred
                if (filterType === 'sent') return (mail.from === mailService.getUser().email  && !mail.isDraft)
                if (filterType === 'drafts') return mail.isDraft
            }
        },
        setTextFilter(searchText) {
            this.filterBy.text = searchText
        },
        saveNewMail(newMail) {
            const idx = this.mails.findIndex(mail => mail.id === newMail.id)
            if (idx === -1) this.mails.unshift(newMail)
            else this.mails.splice(idx,1,newMail)
        },
        removeMail(mailIdToRemove) {
            const idx = this.mails.findIndex(mail => mail.id === mailIdToRemove)
            this.mails.splice(idx,1)
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
        this.unmountedAutoSaveEmail = eventBus.on('emailAutoSaved', this.saveNewMail)
        this.unmountedSentEmail = eventBus.on('emailSent', this.saveNewMail)
        this.unmountedSaveEmail = eventBus.on('emailSaved', this.saveNewMail)
        this.unmountedRemoveEmail = eventBus.on('emailRemoved', this.removeMail)
        mailService.query()
            .then(mails => {
                this.mails = mails
            })
    
    },
    unmounted() {
        this.unmountedSentEmail()
        this.unmountedSaveEmail()
        this.unmountedRemoveEmail()
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