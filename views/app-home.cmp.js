export default {
  template: `
        <section class="home-page">

       <div class="home-intro">
        <h1>Appsus!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.<br>
               Optio quasi quae ex rerum reiciendis,<br>
             veniam ullam consectetur, quisquam cumque <br>
             placeat quia natus officiis maiores soluta <br>
             ipsum nisi! Reiciendis, aut quisquam?<br>
             isquam cumque placeat quia natus officiis maiores soluta ipsum <br>
             nisi! Reiciendis, aut quisquam?<br>
             orem ipsum dolor sit amet consectetur adipisicing elit</p>
        <img src="../assets/imgs/appsus.png" alt="">
         <hr>
         <h2>Applications</h2>
         <div class="home-links">
          <span class="mail-app-link" @click="moveToMail">
            <p>Mail</p>
            <img src="https://seeklogo.com/images/M/mail-icon-logo-28FE0635D0-seeklogo.com.png" alt="">
          </span>
          <span class="notes-app-link" @click="moveToKeep">
            <p>Notes</p>
            <img src="https://www.pngkey.com/png/full/435-4358013_icon-note-png-notes-icon.png" alt="">
          </span>
          <span class="books-app-link" @click="moveToBooks">
            <p>Books</p>
            <img src="https://cdn-icons-png.flaticon.com/512/1903/1903162.png" alt="">
          </span>
         </div>
     </div>

        </section>
    `,
  methods: {
    moveToKeep() {
      this.$router.push('/keep')
    },
    moveToMail() {
      this.$router.push('/mail/inbox')
    },
    moveToBooks() {
      this.$router.push('/books')
    },
  },
}
