import { eventBus } from "../../../services/event-bus.service.js"
import mailList from '../cmps/mail-list.cmp.js'

export default {
    props: ['currMails', 'selectedMail'], 
    template: `
    <section class="mails">
        <div class="mails-type mail-checkbox" @click="updateRead(mail)"><input type="checkbox"/></div>
        <mail-list 
            v-if="sentMails"
            :mails="allMails"
            @selected="selectMail" 
            @updateStarred="updateStarStatus"
            @updateRead="updateReadStatus"
            @remove="removeMail" />
    </section>
    `,
    data() {
        return {
            sentMails: null,
            currSelectedMail: null,
        }
    },
    created() {
        eventBus.on('add-mail', this.addMails)
        this.sentMails = this.currMails
        this.currSelectedMail = this.selectMail
    },
    methods: {
        addMails(payload){
            this.$emit('add', payload)
        },
        removeMail(mailId) {
            this.$emit('remove', mailId)
        },
        selectMail(mail) {
            this.$emit('selected', mail)
        },
        updateStarStatus(mailId) {
            this.$emit('updateStarred', mailId)
        },
        updateReadStatus(mailId) {
            this.$emit('updateRead', mailId)
        },
    },
    computed: {
        allMails() {
            return this.sentMails && this.sentMails.filter(mail => mail.status === "sent").reverse()
        },
    },
    components: {
        mailList,
    }
}
