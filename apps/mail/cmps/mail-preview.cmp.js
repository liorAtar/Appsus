export default {
    props: ['mail'],
    template: `
        <section :title="mail.subject" class="mail-preview">
            <router-link :to="'/mail/' + mail.id">
            <h2 class="mail-subject" :class="isRead">{{ mail.subject }}</h2>
            </router-link>
        </section>
    `,
     created() {
        console.log('mail', this.mail)
    },
    computed: {
        isRead() {
            return this.mail.isRead ? 'mail-read' : 'mail-not-read'
        },
    },
}
