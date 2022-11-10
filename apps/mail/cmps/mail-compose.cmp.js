export default {
    template: `
            <section class="mail-compose">
                <div class="header">
                    <span class="new-msg">New Message</span>
                    <button class="close">x</button>
                </div>
                <form @submit.stop="mailSent">
                    <input type="text" class="mail-to" placeholder="To"/>
                    <input type="text" class="mail-subject" placeholder="Subject"/>
                    <textarea class="mail-body" cols="30" rows="10"></textarea>
                    <div class="actions">
                        <button class="mail-send blue-mail-btn">Send</button>
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                </form>
            </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        mailSent(){
            console.log('email was sent');
        }

    },

    computed: {

    },

    components: {

    },
}