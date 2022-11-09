import { mailService } from "../services/mail.service.js";

export default {
    template: `
        <section class="mail-details">
          <section class="mail-actions"></section>
          <p>{{mail}}</p>
          <!-- <h1>{{mail.subject}}</h1> -->
          <!-- <h4>{{mail.from}}</h4> -->
          <!-- <h4>{{formattedDate}}</h4> -->
          <!-- <p>{{mail.body}}</p> -->


        </section>
            
      `,
    created() {
      console.log('hello');
      const id = this.$route.params.id
      mailService.get(id)
        .then(mail => this.mail = mail)

    },
    data() {
      return {
        mail: null
      }
    },
    methods: {
    },
    computed: {
      formattedDate() {
        const date = new Date(+this.mail.sentTimeStamp*1000)
        const options = { month: 'long', day: '2-digit', year: 'numeric' }
        return date.toLocaleDateString('en-GB', options)
    }

    }
}