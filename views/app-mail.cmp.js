// import { mailService } from "../apps/mail/services/mail.service.js"

// import mailList from '../apps/mail/cmps/mail-list.cmp.js'

export default {
    template: `
        <section class="mail-page">
            <nav class="mail-sidenav">
                <button class="compose-btn">Compose</button>
                <router-link to="/mail/index/inbox">Inbox</router-link>
                <router-link to="/mail/index/starred">Starred</router-link>
                <router-link to="/mail/index/sent">Sent Mail</router-link>
                <router-link to="/mail/index/drafts">Drafts</router-link>
                <router-link to="/mail/index/trash">Trash</router-link>
            </nav>
            <!-- <header class="mail-header">
                <input type="search" placeholder="Search" />
            </header> -->

            <router-view></router-view>

        </section>
    `,
    // data(){
    //     return {
    //         mails: [],
    //         filterBy: {

    //         },

    //     }
    // },
    // computed: {
    //     mailsToShow(){
    //         return this.mails
    //     }
    // },
    // created() {
    //     mailService.query()
    //         .then(mails => {
    //             this.mails = mails
    //         })
    // },

    // components: {
    //     mailService,
    //     mailList
    // }
}

