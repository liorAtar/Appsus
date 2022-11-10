import mailList from '../cmps/mail-list.cmp.js'

export default {
    props: ['currMails', 'selectedMail'], 
    template: `
    <section class="mails" v-if="inboxMails">
        <h1 class="mails-type">Unread</h1>
        <mail-list 
            v-if="inboxMails"
            :mails="mailsUnread"
            @selected="currSelectedMail" 
            @updateStarred="updateStarStatus"
            @updateRead="updateReadStatus"
            @remove="removeMail" />
        <h1 class="mails-type">Everything else </h1>
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
            console.log(this.inboxMails)
            return this.inboxMails.filter(mail => mail.isRead === true && mail.status === "inbox")
        },
    },
    components: {
        mailList,
    }
}
