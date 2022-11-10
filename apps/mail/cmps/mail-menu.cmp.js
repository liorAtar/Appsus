export default {
    props: ['selectedTab', 'isModalOpen'],
    template: `
        <section class="menu">
            <div class="mail-menu" :class="isModalOpen? 'menu-open' : 'menu-close'">
                <button class="menu-compose" @click="openNewMail">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                    <p>Compose</p>
                </button>
                <ul>
                    <li class="menu-tab" :class="tab === 'Inbox' ? 'is-selected' : ''" @click="updateSelectedTab">
                        <i class="fa fa-inbox" aria-hidden="true"></i>
                        <p>Inbox</p>
                    </li>
                    <li class="menu-tab" :class="tab === 'Starred' ? 'is-selected' : ''" @click="updateSelectedTab">
                        <i class="fa fa-star-o" aria-hidden="true"></i>
                        <p>Starred</p>
                    </li>
                    <li class="menu-tab" :class="tab === 'Sent' ? 'is-selected' : ''" @click="updateSelectedTab">
                        <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                        <p>Sent</p>
                    </li>
                    <li class="menu-tab" :class="tab === 'Draft' ? 'is-selected' : ''" @click="updateSelectedTab">
                        <i class="fa fa-file-o" aria-hidden="true"></i>
                        <p>Draft</p>
                    </li>
                </ul>
            </div>
        </section>
    `,
    data() {
        return {
            tab: 'Inbox',
        }
    },
    created() {
        this.tab = this.selectedTab
    },
    methods: {
        updateSelectedTab(ev){
            this.tab = ev.target.innerText
            this.$router.push(`/mail/${ev.target.innerText.toLowerCase()}`)
            this.$emit('updateTab', this.tab)
        },
        openNewMail() {
            this.$emit('openNewMail')
        }
    },
}
