import mailPreview from './mail-preview.cmp.js'

export default {
    props:['mails'],
    template: `
        <section class="mails-list">
            <ul>
                <li v-for="mail in mails" :key="mail.id">
                    <mail-preview :mail="mail"/>
                    <section class="actions">
                        <button @click="remove(mail.id)">x</button>
                    </section>
                </li>
            </ul>
        </section>
    `,
    created() {
        console.log('mails in list', this.mails)
    },
    methods: {
        remove(mailId){
            this.$emit('remove', mailId)
            console.log('delete mail', mailId)
        },
    },
    components: {
        mailPreview,
    }
}
