import { mailService } from "../services/mail-service.js"

import mailList from '../cmps/mail-list.cmp.js'

export default {
    template: `
    <section class="mail-app">
        <h1>Mails App</h1>
        <mail-list 
            v-if="mails"
            :mails="mailsToShow"
            @selected="selectMail" 
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
    },
    computed: {
        mailsToShow() {
            return this.mails
        },
    },
    components: {
        mailList,
    }
}
