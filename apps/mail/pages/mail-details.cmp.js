import { mailService } from '../services/mail-service.js'

export default {
    template: `
        <section v-if="mail" class="book-details">
            <h2>{{ mail.subject }}<h2>
            <hr />
            <p>{{ mail.body }}</p>
            <p>{{ sentAt }}</p>
            <router-link to="/book">Back</router-link>
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
            .then(mail => this.mail = mail)
    },
    computed: {
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

            return `${yr}/${mth}/${date} ${hrs}:${mins}:${sec}`
        },
    },
    methods: {
    },
    components: {
    }
}
