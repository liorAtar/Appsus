import { mailService } from '../services/mail-service.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import mailMenu from '../cmps/mail-menu.cmp.js'
import addMail from '../cmps/add-mail.cmp.js'

export default {
    template: `
    <section class="main-mail-app">
        <mail-filter />
        <div class="mail-app">
            <mail-menu @openNewMail="addMail" :selectedTab="selectedTab" @updateTab="setTab"/>
            <section class="mail-view">
                <router-view />
            </section>
            <add-mail :class="isModalOpen" :isOpen="isNewMailOpen" @closeNewMail="closeModal"/>
        </div>
    </section>
    `,
    data() {
        return {
            isNewMailOpen: false,
            selectedTab: 'Inbox'
        }
    },
    created() {
        this.selectedTab = mailService.getSelectedTab()
        console.log('this.selectedTab', this.selectedTab)
    },
    methods: {
        addMail() {
            this.isNewMailOpen = true
        },
        closeModal() {
            this.isNewMailOpen = false
        },
        setTab(tab) {
            mailService.setSelectedTab(tab)
        },
    },
    computed: {
        isModalOpen() {
            return this.isNewMailOpen ? 'modal-open' : 'modal-close'
        }
    },
    components: {
        mailFilter,
        mailMenu,
        addMail,
    }
}
