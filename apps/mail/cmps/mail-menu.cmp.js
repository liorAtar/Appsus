import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
        <section class="mail-menu">
            <button>Compose</button>
            <ul>
                <router-link to="/mail/inbox">
                    <li :class="selectedTab === 'Inbox' ? 'is-selected' : ''" @click="updateSelectedTab">Inbox</li>
                </router-link>
                <li :class="selectedTab === 'Starred' ? 'is-selected' : ''" @click="updateSelectedTab">Starred</li>
                <li :class="selectedTab === 'Sent Mail' ? 'is-selected' : ''" @click="updateSelectedTab">Sent Mail</li>
                <li :class="selectedTab === 'Drafts' ? 'is-selected' : ''" @click="updateSelectedTab">Drafts</li>
            </ul>
        </section>
    `,
    data() {
        return {
            selectedTab: 'Inbox'
        }
    },
    created() {
    },
    methods: {
        updateSelectedTab(ev){
            this.selectedTab = ev.target.innerText
            this.$router.push(`/mail/${ev.target.innerText.toLowerCase()}`)
        }
    },
    computed: {
    },
}
