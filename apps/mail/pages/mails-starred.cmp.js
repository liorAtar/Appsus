import { mailService } from "../services/mail-service.js"

import mailList from '../cmps/mail-list.cmp.js'

export default {
    template: `
    <section class="mail-app">
        <section>
            <h1>Mails App</h1>
            <h1>Unread</h1>
            <mail-list 
                v-if="mails"
                :mails="mailsUnread"
                @selected="selectMail" 
                @updateStarred="updateStarStatus"
                @remove="removeMail" />
            <h1>Everything else </h1>
            <mail-list 
                v-if="mails"
                :mails="allMails"
                @selected="selectMail" 
                @updateStarred="updateStarStatus"
                @remove="removeMail" />
        </section>
    </section>
    `,
    data() {
        return {
            mails: null,
            selectedMail: null,
        }
    },
    created() {
        mailService.query()
            .then(mails => {
                this.mails = mails
                console.log('mails', mails)
            })
    },
    methods: {
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
    },
    computed: {
        mailsUnread() {
            return this.mails.filter(mail => mail.isRead === false && mail.isStarred === true)
        },
        allMails() {
            return this.mails.filter(mail => mail.isRead === true && mail.isStarred === true)
        },
    },
    components: {
        mailList,
    }
}
