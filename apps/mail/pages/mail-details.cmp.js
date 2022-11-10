import { mailService } from "../services/mail.service.js";

export default {
    template: `
        <section v-if="mail" class="mail-details">
          <section class="mail-actions">
          <i 
            @click="goBack()"
            class="fa-solid fa-arrow-left clk"></i>
          <i
            @click="removeMail()" 
            class="fa-solid fa-trash-can clk"></i>
          </section>
          <h1>{{mail.subject}}</h1>
          <h4>{{mail.from}}</h4>
          <h4>{{formattedDate}}</h4>
          <p>{{mail.body}}</p>
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
      goBack() {
        // this.$router.push(`/mail/index`)
        this.$router.go(-1)
      },
      removeMail() {
        // console.log('removed status before remove', this.mail.isRemoved);
        if (this.mail.isRemoved) mailService.remove(this.mail.id).then(()=> {
          // console.log('removed status after async remove', this.mail.isRemoved)
          this.goBack()
        })
        else {
          this.mail.isRemoved = true
          // console.log('saved mail after isremoved = true', this.mail);
          mailService.save(this.mail).then(()=>{
            // console.log('removed status after sync remove', this.mail.isRemoved)
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