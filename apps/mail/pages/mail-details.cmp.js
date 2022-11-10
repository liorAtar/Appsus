import { mailService } from '../services/mail-service.js'

export default {
    template: `
        <section v-if="mail" class="mail-details">
            <router-link :to="relocateTo">
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </router-link>
            <div class="mail-details-info">
                <h2 class="mail-details-subject">{{ mail.subject }}</h2>
                <p class="mail-details-from">{{ mail.from.fullname }} &lt;{{ mail.from.email }}&gt;</p>
                <div class="mail-details-to">
                    <p class="mail-details-from">to &lt;{{ mail.to.email }}&gt;</p>
                    <p>{{ sentAt }}</p></div>
                <hr />
                <p>{{ mail.body }}</p>
            </div>
        </section>
    `,
    data() {
        return {
            mail: null,
        }
    },
    created() {
        const id = this.$route.params.id
        mailService.get(id)
            .then(mail => {
                this.mail = mail
                console.log('curr mail', mail)
            })
    },
    computed: {
        relocateTo() {
            return this.$route.fullPath.slice(0, this.$route.fullPath.length - this.$route.params.id.length - 1) +
             '/' + 
             mailService.getSelectedTab()
        },
        sentAt() {
            // unix timestamp
            var timestamp = this.mail.sentAt;
            // convert unix timestamp to milliseconds
            var timestamp_ms = timestamp * 1000;
            // initializing the Date object
            var d_obj = new Date(timestamp_ms);
            // extracting date from the date object as 2 digit
            var date = ("0" + d_obj.getDate()).slice(-2);
            // extracting hours from the date object as 2 digit
            var hrs = ("0" + d_obj.getHours()).slice(-2);
            // extracting minutes from the date object as 2 digit
            var mins = ("0" + d_obj.getMinutes()).slice(-2);
            // extracting the seconds from the date object as 2 digit
            var sec = ("0" + d_obj.getSeconds()).slice(-2);
            // extracting year from the date object as 4 digit
            var yr = d_obj.getFullYear();
            // extracting month from the date object as 2 digit
            var mth = ("0" + (d_obj.getMonth() + 1)).slice(-2);

            return `${date}/${mth}/${yr} ${hrs}:${mins}:${sec}`
        },
    },
}
