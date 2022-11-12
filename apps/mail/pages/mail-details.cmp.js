import { mailService } from "../services/mail.service.js";

export default {
    template: `
        <section v-if="mail" class="mail-details right-of-sidenav">
          <div class="mail-actions">
            <i 
              @click="goBack()"
              class="fa-solid fa-arrow-left clk"
              title="Go back"></i>
            <i
              @click="removeMail()" 
              class="fa-solid fa-trash-can clk"
              title="Discard"></i>
          </div>
          <div class="mail-body">
              <h1>{{mail.subject}}</h1>
              <div class="sender-date">
                <h4 class="sender">{{mail.from}}</h4>
                <h4 class="date">{{formattedDate}}</h4>
              </div>
              <p>{{mail.body}}</p>
          </div>
        </section>
      `,
    created() {
      const id = this.$route.params.id
      mailService.get(id)
        .then((mail) => {
          this.mail = mail
          this.mail.isRead = true
          mailService.save(this.mail)
        })
      

    },
    data() {
      return {
        mail: null
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      removeMail() {
        if (this.mail.isDiscarded) mailService.remove(this.mail.id).then(()=> {
          this.goBack()
        })
        else {
          this.mail.isDiscarded = true
          mailService.save(this.mail).then(()=>{
            this.goBack()
          })
          
        }
      }
    },
    computed: {
      formattedDate() {
        const date = new Date(this.mail.sentTimeStamp*1000)
        const options = { month: 'long', day: '2-digit', year: 'numeric' }
        return date.toLocaleDateString('en-GB', options)
    }

    }
}