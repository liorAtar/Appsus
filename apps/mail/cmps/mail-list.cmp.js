import mailPreview from './mail-preview.cmp.js'

export default {
    props: ['mails'],
    template: `
        <section class="mails-list">
            <ul>
                <li v-for="mail in mails" :key="mail.id" :class="mail.isRead? 'mail-read' : ''" >
                    <div class="mail-checkbox" @click="updateRead(mail)"><input type="checkbox" :checked="mail.isRead"/></div>
                    <span class="mail-star" v-if="mail.isStarred" @click="updateStarred(mail)">&starf;</span>
                    <span class="mail-star" v-else @click="updateStarred(mail)">&star;</span>
                    <mail-preview :mail="mail"/>
                    <section class="actions">
                        <i class="fa fa-trash-o" aria-hidden="true" @click="remove(mail.id)"></i>
                        <router-link :to="mail.id"><i class="fa fa-envelope-open-o" aria-hidden="true"></i></router-link>
                        <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
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
        updateRead(mailId) {
            this.$emit('updateRead', mailId)
            console.log('is read mail', mailId)
        },
        selectMail(mail){
            this.$emit('selected', mail)
        },
    },
    components: {
        mailPreview,
    }
}
