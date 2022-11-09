export default {
  template: `
        <section class="home-page">

       <div class="home-intro">
        <h1>Appsus!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quasi quae ex rerum reiciendis,
             veniam ullam consectetur, quisquam cumque placeat quia natus officiis maiores soluta ipsum nisi! Reiciendis, aut quisquam?
             isquam cumque placeat quia natus officiis maiores soluta ipsum nisi! Reiciendis, aut quisquam?
             orem ipsum dolor sit amet consectetur adipisicing elit</p>
        <img src="../assets/imgs/appsus.png" alt="">
         <hr>
         </div>

        </section>
    `,
  methods: {
    moveToKeep() {
      this.$router.push('/keep')
    },
  },
}
