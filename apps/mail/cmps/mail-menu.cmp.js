export default {
    props: ['selectedTab'],
    template: `
        <section class="mail-menu">
            <button @click="openNewMail">Compose</button>
            <ul>
                <router-link to="/mail/inbox">
                    <li :class="tab === 'Inbox' ? 'is-selected' : ''" @click="updateSelectedTab">Inbox</li>
                </router-link>
                <li :class="tab === 'Starred' ? 'is-selected' : ''" @click="updateSelectedTab">Starred</li>
                <li :class="tab === 'Sent' ? 'is-selected' : ''" @click="updateSelectedTab">Sent</li>
                <li :class="tab === 'Drafts' ? 'is-selected' : ''" @click="updateSelectedTab">Drafts</li>
            </ul>
        </section>
    `,
    data() {
        return {
            tab: 'Inbox',
        }
    },
    created() {
        this.tab = this.selectedTab
        console.log('tab', this.tab)
    },
    methods: {
        updateSelectedTab(ev){
            this.tab = ev.target.innerText
            this.$router.push(`/mail/${ev.target.innerText.toLowerCase()}`)
            this.$emit('updateTab', this.tab)
        },
        openNewMail() {
            this.$emit('openNewMail')
        },
    },
    computed: {
    },
}
