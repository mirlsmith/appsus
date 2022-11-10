// import { mailService } from "../apps/mail/services/mail.service.js"

// import mailList from '../apps/mail/cmps/mail-list.cmp.js'
import mailCompose from '../apps/mail/cmps/mail-compose.cmp.js'

export default {
    template: `
        <section class="mail-page">
            <nav class="side-nav">
                <button @click="isMailCompose=true" class="compose-btn blue-mail-btn">Compose</button>
                <router-link to="/mail/index/inbox">Inbox</router-link>
                <router-link to="/mail/index/starred">Starred</router-link>
                <router-link to="/mail/index/sent">Sent</router-link>
                <router-link to="/mail/index/drafts">Drafts</router-link>
                <router-link to="/mail/index/trash">Trash</router-link>
            </nav>
            <!-- <header class="mail-header">
                <input type="search" placeholder="Search" />
            </header> -->

            <router-view></router-view>

            
            <Transition name="custom-classes"
                enter-active-class="animate__animated animate__fadeInUp animate__faster"
                leave-active-class="animate__animated animate__fadeOutDown animate__faster">
            <mail-compose v-if="isMailCompose"
                @sent="mailSent"
                @discard="mailDiscard"/>
            </Transition>
        </section>
    `,
    data(){
        return {
            isMailCompose: false,

        }

    },
    methods: {
        mailSent(mailDetails){
            this.isMailCompose = false
            console.log('mail sent');
        },
        mailDiscard(){
            this.isMailCompose = false
            console.log('mail discarded');
        }

    },
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

    components: {
        mailCompose
    }
}

