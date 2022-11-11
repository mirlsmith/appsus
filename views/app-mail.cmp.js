import { eventBus } from '../services/event-bus.service.js'
import { mailService } from '../apps/mail/services/mail.service.js';

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

            <router-view></router-view>
            
            <Transition name="custom-classes"
                enter-active-class="animate__animated animate__fadeInUp animate__faster"
                leave-active-class="animate__animated animate__fadeOutDown animate__faster">
            <mail-compose v-if="isMailCompose"
                @sent="mailSent"
                @close="mailSaveDraft"
                @autosave="mailAutoSave"
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
        closeCompose() {
            this.isMailCompose = false
        },
        mailSent(mail){
            this.closeCompose()
            mailService.save(mail)
                .then(mail=> eventBus.emit('emailSent', {...mail}))
        },
        mailDiscard(mail){
            this.closeCompose()
            if (!mail.id) { 
                return
            }
            mailService.remove(mail.id)
                .then(mailId => eventBus.emit('emailRemoved', mail.id))
        },
        mailAutoSave(mail){
            mailService.save(mail)
                    .then(mail => eventBus.emit('emailAutoSaved', {...mail}))
        },
        mailSaveDraft(mail){
            this.closeCompose()
            if (!mail.id) {
                return
            }
            mailService.save(mail)
                .then(mail => eventBus.emit('emailSaved', {...mail}))
        }
    },
    components: {
        mailCompose
    }
}

