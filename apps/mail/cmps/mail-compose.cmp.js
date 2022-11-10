export default {
    template: `
            <section class="mail-compose">
                <div class="header">
                    <span class="new-msg">New Message</span>
                    <button class="close">x</button>
                </div>
                <form>
                    <input type="text" class="mail-to" placeholder="To"/>
                    <input type="text" class="mail-subject" placeholder="Subject"/>
                    <textarea class="mail-body" cols="30" rows="10"></textarea>
                    <div class="actions">
                        <button @click.stop="mailSent" class="mail-send blue-mail-btn">Send</button>
                        <i 
                        @click.stop="mailDiscard"
                        class="fa-solid fa-trash-can clk" title="discard"></i>
                    </div>
                </form>
            </section>
    `,
    data() {
        return {
            mailDetails: {


            }
        }
    },
    methods: {
        mailSent(){
            console.log('email was sent');
            this.$emit('sent', this.mailDetails)
        },
        mailDiscard() {
            this.$emit('discard', this.mailDetails)

        }


    },

    computed: {

    },

    components: {

    },
}