export default {
    props: ['mail'],
    template: `
        <section :title="mail.subject" class="mail-preview">
            <h2>{{ mail.subject }}</h2>
        </section>
    `,
     created() {
        console.log('mail', this.mail)
    },
}
