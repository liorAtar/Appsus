import mailList from '../cmps/mail-list.cmp.js'

export default {
    props: ['currMails', 'selectedMail'], 
    template: `
    <section class="mails starred">
        <h1 class="mails-type">Unread</h1>
        <mail-list 
            v-if="starredMails"
            :mails="mailsUnread"
            @selected="selectMail" 
            @updateStarred="updateStarStatus"
            @updateRead="updateReadStatus"
            @remove="removeMail" />
        <h1 class="mails-type">Everything else </h1>
        <mail-list 
            v-if="starredMails"
            :mails="allMails"
            @selected="selectMail" 
            @updateStarred="updateStarStatus"
            @updateRead="updateReadStatus"
            @remove="removeMail" />
    </section>
    `,
     data() {
        return {
            starredMails: null,
            currSelectedMail: null,
        }
    },
    created() {
        this.starredMails = this.currMails
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
            return this.starredMails.filter(mail => mail.isRead === false && mail.isStarred === true)
        },
        allMails() {
            return this.starredMails.filter(mail => mail.isRead === true && mail.isStarred === true)
        },
    },
    components: {
        mailList,
    }
}
