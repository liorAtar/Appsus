import { mailService } from '../services/mail-service.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import mailMenu from '../cmps/mail-menu.cmp.js'
import addMail from '../cmps/add-mail.cmp.js'

export default {
    template: `
    <section class="main-mail-app">
        <mail-filter @updateModal="updateMenuModal"/>
        <div class="mail-app">
            <mail-menu @openNewMail="openModal" :selectedTab="selectedTab" @updateTab="setTab" :isModalOpen="isModalOpen"/>
            <section class="mail-view">
                <router-view  
                    v-if="mails"
                    :currMails="getMails"
                    @selected="selectMail" 
                    @updateStarred="updateStarStatus"
                    @updateRead="updateReadStatus"
                    @remove="removeMail"
                    @load="loadMails"
                    @add="addMail"
                />
            </section>
            <add-mail :class="isMenuModalOpen" :isOpen="isNewMailOpen" @closeNewMail="closeModal"/>
        </div>
    </section>
    `,
    data() {
        return {
            isNewMailOpen: false,
            isModalOpen: false,
            selectedTab: 'Inbox',
            mails: null,
            selectedMail: null,
        }
    },
    created() {
        this.loadMails()
        this.selectedTab = mailService.getSelectedTab()
        console.log('this.selectedTab', this.selectedTab)
    },
    methods: {
        loadMails() {
            mailService.query()
            .then(allMails => {
                this.mails = allMails
                console.log('mails', this.mails)
            })
        },
        openModal() {
            this.isNewMailOpen = true
        },
        closeModal() {
            this.isNewMailOpen = false
        },
        setTab(tab) {
            mailService.setSelectedTab(tab)
        },
        updateMenuModal() {
            this.isModalOpen = !this.isModalOpen
        },

        // NEW INBOX
        addMail(payload){
            mailService.addNewMail(payload)
            .then( mail => {
                this.mails.push(mail)
                this.loadMails()
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
        getMails(){
            return this.mails
        },
        isMenuModalOpen() {
            return this.isNewMailOpen ? 'modal-open' : 'modal-close'
        }
    },
    components: {
        mailFilter,
        mailMenu,
        addMail,
    }
}
