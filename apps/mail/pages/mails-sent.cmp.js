import { eventBus } from "../../../services/event-bus.service.js"
import mailList from '../cmps/mail-list.cmp.js'

export default {
    props: ['currMails', 'selectedMail'], 
    template: `
    <section class="mails mail-sent">
        <!-- <span class="mail-star" v-if="mail.isStarred" @click="updateStarred(mail)">&starf;</span>
        <span class="mail-star" v-else @click="updateStarred(mail)">&star;</span> -->
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
    },
    watch: {
        currMails:{
            handler(){
                this.sentMails = this.currMails
            },
            deep: true
        }
    }
}
