import { mailService } from "../apps/mail/services/mail.service.js"

import mailList from '../apps/mail/cmps/mail-list.cmp.js'

export default {
    template: `
        <section class="mail-page">
            <nav class="mail-sidenav">
                <button>Compose</button>
                <a href="#">Inbox</a>
                <a href="#">Starred</a>
                <a href="#">Sent Mail</a>
                <a href="#">Drafts</a>
            </nav>
            <header class="mail-header">
                <input type="search" placeholder="Search" />
            </header>

            <section class="mail-container">
                <mail-list :mails="mailsToShow"/>

            </section>
            
            <!-- <router-link to="/mail/details">details</router-link> -->
            <!-- <router-view></router-view> -->
        </section>
    `,
    data(){
        return {
            mails: [],
            filterBy: {

            }
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

