import { mailService } from "../apps/mail/services/mail-service.js"

export default {
  template: `
        <header class="app-header">
        <router-link to="/"> <img :src="imgUrl" /> </router-link> 
            <nav>
                <router-link to="/keep">Keep </router-link>
                <router-link :to="mailLink" @click="updateCurrTab">Mail </router-link>
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
    this.updateCurrTab()
  },
  methods: {
    updateCurrTab(){
      this.selectedTab = mailService.getSelectedTab();
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
