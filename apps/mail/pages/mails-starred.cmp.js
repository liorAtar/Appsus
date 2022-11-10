import mailList from '../cmps/mail-list.cmp.js'

export default {
    props: ['currMails', 'selectedMail'], 
    template: `
    <section class="mails starred mail-starred">
        <h1 v-if="mailsUnread.length" class="mails-type">Unread</h1>
        <mail-list 
            v-if="starredMails"
            :mails="mailsUnread"
            @selected="selectMail" 
            @updateStarred="updateStarStatus"
            @updateRead="updateReadStatus"
            @remove="removeMail" />
        <h1 v-if="allMails.length" class="mails-type">Everything else </h1>
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
            return this.starredMails.filter(mail => mail.isRead === false && mail.isStarred === true).reverse()
        },
        allMails() {
            return this.starredMails.filter(mail => mail.isRead === true && mail.isStarred === true).reverse()
        },
    },
    watch: {
        currMails:{
            handler(){
                this.starredMails = this.currMails
            },
            deep: true
        }
    },
    components: {
        mailList,
    }
}
