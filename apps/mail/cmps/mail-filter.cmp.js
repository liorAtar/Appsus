export default {
    props: ['selectedTab'],
    template: `
        <section class="menu-filter">
            <div class="menu-header" @click="updateModalStatus">
                <i class="fa fa-bars" aria-hidden="true"></i>
                <img class="gmail-logo" src="../../../assets/imgs/gmail-logo.png" />
                <p>Gmail</p>
            </div>
            <label class="search">
                <span class="search-icon">
                    <i class="fa fa-search" aria-hidden="true"></i>
                </span>
                <input class="search-input" type="search" placeholder="Search mail">
            </label>
        </section>
    `,
    methods: {
        updateModalStatus() {
            this.$emit('updateModal')
        }
    },
}
