import { eventBus } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail-service.js"
import mailList from '../cmps/mail-list.cmp.js'

export default {
    template: `
    <section class="mails">
        <mail-list 
            v-if="mails"
            :mails="allMails"
            @selected="selectMail" 
            @updateStarred="updateStarStatus"
            @updateRead="updateReadStatus"
            @remove="removeMail" />
    </section>
    `,
    data() {
        return {
            mails: null,
            selectedMail: null,
        }
    },
    created() {
        this.loasMails()
        eventBus.on('add-mail', this.reloadMails)
    },
    methods: {
        loasMails(){
            mailService.query()
            .then(mails => {
                this.mails = mails
            })
        },
        reloadMails(payload){
            mailService.addNewMail(payload)
            .then( mail => {
                this.mails.push(mail)
            })
        },
        removeMail(mailId) {
            mailService.remove(mailId)
                .then(() => {
                    const idx = this.mails.findIndex(mails => mails.id === mailId)
                    this.mails.splice(idx, 1)
                })
        },
        selectMail(mail) {
            this.selectedMail = mail
        },
        updateStarStatus(mail) {
            mailService.updateIsStarred(mail).then(mail => this.selectedMail = mail)
        },
        updateReadStatus(mail) {
            mailService.updateIsRead(mail).then(mail => this.selectedMail = mail)
        },
    },
    computed: {
        allMails() {
            return this.mails && this.mails.filter(mail => mail.status === "sent").reverse()
        },
    },
    components: {
        mailList,
    }
}
