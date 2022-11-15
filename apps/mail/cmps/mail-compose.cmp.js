import { eventBus, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    template: `
            <section class="mail-compose">
                <div class="header">
                    <span class="new-msg">New Message</span>
                    <button @click="mailSavedDraft" class="close" title="Close and save">x</button>
                </div>
                <form>
                    <input v-model.trim="mail.to" ref="recipient" type="text" class="mail-to" placeholder="To"/>
                    <input v-model.trim="mail.subject" type="text" class="mail-subject" placeholder="Subject"/>
                    <textarea v-model="mail.body" class="mail-body" cols="30" rows="10"></textarea>
                    <div class="actions">
                        <button @click.prevent="mailSent" class="mail-send blue-mail-btn" title="Send">Send</button>
                        <i 
                        @click.prevent="mailDiscard"
                        class="fa-solid fa-trash-can clk" title="Discard"></i>
                    </div>
                </form>
            </section>
    `,
    data() {
        return {
            mail: {
                id: null,
                subject: '',
                from: 'user@appsus.com',
                to: '',
                sentTimeStamp: Date.now()/1000,
                body: '',
                isStarred: false,
                isDiscarded: false,
                isRead: false,
                isDraft: true,
                labels: ['','']
            },
            autoSaveinterval: null,
            autoSaveTimeout: null,
            draftTimeOut: null
        }
    },
    created(){
        const { note: isNote, subject, body } = this.$route.query
        if (isNote) {
            this.mail.subject = subject
            this.mail.body = body
        }

        this.unmountedAutoSaveEmail = eventBus.on('emailAutoSaved', this.updateDraftId)

        this.autoSaveTimeout = setTimeout(()=>{
            showSuccessMsg('Your email will be autosaved every 5 seconds')
        },5000)

        this.autoSaveinterval = setInterval(()=>{
            this.$emit('autosave', {...this.mail})
        }, 5000)
    },
    mounted() {
        this.$refs.recipient.focus()
    },
    methods: {
        clearTimeoutAndInterval(){
            clearInterval(this.autoSaveinterval)
            clearTimeout(this.autoSaveTimeout)
        },
        mailSent(){
            this.clearTimeoutAndInterval()
            showSuccessMsg('Your email has been sent')
            this.mail.isDraft = false
            this.$emit('sent', {...this.mail})
        },
        mailDiscard() {
            showSuccessMsg('Your email has been discarded')
            this.clearTimeoutAndInterval()
            this.$emit('discard', {...this.mail})            
        },
        mailSavedDraft() {
            showSuccessMsg('Your email will be saved in the drafts folder')
            this.clearTimeoutAndInterval()
            this.$emit('close', {...this.mail})
        },
        updateDraftId(mail) {
            if (!this.mail.id) this.mail.id = mail.id
        }
    },
    umounted() {
        this.clearTimeoutAndInterval()
        this.unmountedAutoSaveEmail()
    },
}