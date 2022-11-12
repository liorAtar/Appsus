export default {
  template: `
        <header class="app-header">
        <router-link to="/"> <img :src="imgUrl" /> </router-link> 
            <nav>
                <router-link to="/keep">Keep </router-link>
                <router-link to="/mail/inbox">Mail </router-link>
                <router-link to="/about">About </router-link>
            </nav>
        </header>
    `,
  computed: {
    imgUrl() {
      return 'assets/imgs/appSus-logo.png'
    },
  },
}
