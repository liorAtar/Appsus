export default {
    props: ['selectedTab'],
    template: `
        <section class="menu-filter">
            <div class="menu-header" @click="modalCloseOpen">
                <i class="fa fa-bars" aria-hidden="true"></i>
                <img class="gmail-logo" src="../../../assets/imgs/gmail-logo.png" />
                <p>Gmail</p>
            </div>
        </section>
    `,
    data() {
        return {
            menuIsOpen: true,
        }
    },
    created() {
       
    },
    methods: {
        modalCloseOpen() {
            this.menuIsOpen = !this.menuIsOpen
        }
    },
}
