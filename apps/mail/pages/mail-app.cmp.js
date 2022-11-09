import mailMenu from '../cmps/mail-menu.cmp.js'

export default {
    template: `
    <section class="mail-app">
        <mail-menu />
        <router-view />
    </section>
    `,
    components: {
        mailMenu,
    }
}
