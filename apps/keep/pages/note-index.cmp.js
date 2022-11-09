import { noteService } from '../services/note.service.js'
import noteList from '../cmps/note-list.cmp.js'

export default {
  template: `
    <div class="keep-app-main-page">
        <span class="keep-header"><img src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png">
    <h1 class="keep-header-color">Notes App</h1>
    </span>
    <note-list :notes='notesToDisplay'/>
    
    </div>
    `,

  components: {
    noteList,
  },
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
    notesToDisplay(){
     console.log(this.notes);
    }
  },
}
