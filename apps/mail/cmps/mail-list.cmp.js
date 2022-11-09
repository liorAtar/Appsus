import mailPreview from './mail-preview.cmp.js'

export default {
    props: ['mails'],
    template: `
        <section class="mails-list">
            <ul>
                <li v-for="mail in mails" :key="mail.id">
                    <span class="mail-star" v-if="mail.isStarred" @click="updateIsStarred(mail)">&starf;</span>
                    <span class="mail-star" v-else @click="updateIsStarred(mail)">&star;</span>
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
        remove(mailId) {
            this.$emit('remove', mailId)
            console.log('delete mail', mailId)
        },
        updateIsStarred(mailId) {
            this.$emit('updateIsStarred', mailId)
            console.log('is starred mail', mailId)
        },
        showDetails(mail){
            this.$emit('selected', mail)
        }
    },
    components: {
        mailPreview,
    }
}
