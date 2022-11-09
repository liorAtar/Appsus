import { noteService } from '../services/note.service.js'

export default {
  template: `
    <div class="keep-app-main-page">
        <span class="keep-header"><img src="">
    <h1 class="keep-header-color">Notes App</h1>
    </span>
    </div>
    `,

  components: {},
  data() {
    return {
      notes: null,
      filterBy: null,
    }
  },
  created() {
    noteService.query().then((notes) => (this.notes = notes))
  },
  computed:{
    notesToDisplay(){}
  },
}
