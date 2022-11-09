export default {
    props: ['mail'],
    template: `
        <router-link :to="mail.id">
            <section :title="mail.subject" class="mail-preview">
                <p class="mail-subject" :class="isRead">{{ mail.subject }}</p>
                <p class="mail-subject" :class="isRead">{{ mail.subject }}</p>
                <p class="mail-date" :class="isRead">{{ sentAt }}</p>
            </section>
        </router-link>
    `,
    created() {
        console.log('mail', this.mail)
    },
    computed: {
        getRoute(){
            return this.$route.fullPath + '/'
        },
        isRead() {
            return this.mail.isRead ? 'mail-read' : 'mail-not-read'
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
