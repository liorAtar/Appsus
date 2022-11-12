import { mailService } from "../apps/mail/services/mail-service.js"
import { eventBus } from "../services/event-bus.service.js"

export default {
  template: `
        <header class="app-header">
        <router-link to="/"> <img :src="imgUrl" /> </router-link> 
            <nav>
                <router-link to="/keep">Keep </router-link>
                <router-link :to="mailLink">Mail </router-link>
                <router-link to="/about">About </router-link>
            </nav>
        </header>
    `,
  data() {
    return {
      selectedTab: ''
    }
  },
  created() {
    eventBus.on('tab-changed', this.updateCurrTab)
    this.selectedTab = mailService.getSelectedTab();
  },
  methods: {
    updateCurrTab(tab){
      this.selectedTab = tab
    }
  },
  computed: {
    imgUrl() {
      return 'assets/imgs/appSus-logo.png'
    },
    mailLink (){
      return `/mail/${this.selectedTab}`
    }
  },
}
