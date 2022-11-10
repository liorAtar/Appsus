import mailList from '../cmps/mail-list.cmp.js'

export default {
    props: ['currMails', 'selectedMail'], 
    template: `
    <section class="mails" v-if="inboxMails">
        <h1 v-if="mailsUnread.length" class="mails-type">Unread</h1>
        <mail-list 
            v-if="inboxMails"
            :mails="mailsUnread"
            @selected="currSelectedMail" 
            @updateStarred="updateStarStatus"
            @updateRead="updateReadStatus"
            @remove="removeMail" />
        <h1 v-if="allMails.length" class="mails-type">Everything else </h1>
        <mail-list 
            v-if="inboxMails"
            :mails="allMails"
            @selected="currSelectedMail" 
            @updateStarred="updateStarStatus"
            @updateRead="updateReadStatus"
            @remove="removeMail" />
    </section>
    `,
    data() {
        return {
            inboxMails: null,
            currSelectedMail: null,
        }
    },
    created() {
        this.inboxMails = this.currMails
        this.currSelectedMail = this.selectMail
    },
    methods: {
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
        mailsUnread() {
            return this.inboxMails.filter(mail => mail.isRead === false && mail.status === "inbox")
        },
        allMails() {
            return this.inboxMails.filter(mail => mail.isRead === true && mail.status === "inbox").reverse()
        },
    },
    watch: {
        currMails:{
            handler(){
                this.inboxMails = this.currMails
            },
            deep: true
        }
    },
    components: {
        mailList,
    }
}
