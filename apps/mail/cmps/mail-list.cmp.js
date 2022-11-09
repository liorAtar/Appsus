import mailPreview from './mail-preview.cmp.js'

export default {
    props: ['mails'],
    template: `
        <section class="mails-list">
            <ul>
                <li v-for="mail in mails" :key="mail.id" :class="mail.isRead? 'mail-read' : ''" >
                    <span class="mail-star" v-if="mail.isStarred" @click="updateStarred(mail)">&starf;</span>
                    <span class="mail-star" v-else @click="updateStarred(mail)">&star;</span>
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
        updateStarred(mailId) {
            this.$emit('updateStarred', mailId)
            console.log('is starred mail', mailId)
        },
        showDetails(mail){
            this.$emit('selected', mail)
        },
    },
    components: {
        mailPreview,
    }
}
