import { mailService } from "../services/mail.service.js"

export default {
    props: ['mail'],
    template: `
        <article class="mail-preview clk"
            :class="{starred: mail.isStarred, read: mail.isRead}">
            <div @click.stop="toggleStar" class="star clk">
                <i class="fa-regular fa-star star clk"></i>
            </div>
            <h3 class="from">{{ mail.from }}</h3>
            <h3 class="subject">{{ mail.subject }} - </h3>
            <p class="body">{{mail.body}}</p>
            <span class="date">{{ formattedDate }}</span>
            <div class="actions">
                <i v-show="mail.isRead"
                    @click.stop="toggleRead"
                    class="fa-solid fa-envelope clk" title="Mark as unread"></i>
                <i v-show="!mail.isRead" 
                    @click.stop="toggleRead"
                    class="fa-solid fa-envelope-open clk" title="Mark as read"></i>
                <i @click.stop="discardMail" class="fa-solid fa-trash-can clk" title="Discard"></i>
            </div>
        </article>
    `,
    methods:{
        toggleStar(){
            this.mail.isStarred = !this.mail.isStarred
            // this.$emit('statusChange', this.mail)
            mailService.save(this.mail)
        },
        toggleRead(){
            this.mail.isRead = !this.mail.isRead
            // this.$emit('statusChange', this.mail)
            mailService.save(this.mail)
        },
        discardMail(){
            //TODO what happens here???
            if (this.mail.isDiscarded){
                
            }
        }
    },
    computed: {
        formattedDate() {
            const date = new Date(this.mail.sentTimeStamp*1000)
            const options = { day: '2-digit', month: 'short' }
            return date.toLocaleDateString('en-GB', options)
        }
    },
}