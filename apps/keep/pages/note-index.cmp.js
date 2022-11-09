import { noteService } from '../services/note.service.js'
import addNote from '../cmps/add-note.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import editNote from '../cmps/edit-note.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'

export default {
  template: `
    <div class="keep-app-main">
        <span class="keep-header"><img src=""><h1 class="keep-header-color">KEEP APP</h1></span>
        <note-filter @filtered="filterNote"/>
        <add-note  @add="saveNewNote"/>
        <note-list @remove="removeNote" @todo="saveToDo" @delTodo="deleteTodo" @togglePin="changeNotePin" @dup="dupNote" :notes='notesToDisplay'/>
        <!-- <edit-note :noteEdit="noteToEdit"/> -->
    </div>
    `,
  components: {
    addNote,
    noteList,
    editNote,
    noteFilter,
  },
  data() {
    return {
      notes: null,
      noteToEdit: null,
      filterBy: null,
    }
  },
  created() {
    noteService.query().then((notes) => (this.notes = notes))
  },
  methods: {
    saveToDo(note, todo) {
      noteService.updateTodo(note, todo)
    },
    deleteTodo(note, todo) {
      noteService.deleteTodo(note, todo)
    },
    saveNewNote(newNote) {
      noteService.addNewNote(newNote)
      this.notes.push(newNote)
    },
    removeNote(noteId) {
      noteService.remove(noteId)
      const idx = this.notes.findIndex((note) => note.id === noteId)
      this.notes.splice(idx, 1)
      // eventBus.emit('show-msg', { txt: 'Book has been deleted', type: 'success' });
    },
    sendToEdit(note) {
      this.noteToEdit = note
    },
    updateNote(editNote) {
      const idx = this.notes.findIndex((note) => note.id === editNote.id)
      this.notes.splice(idx, 1, editNote)
      noteService.updateNote(editNote)
      this.noteToEdit = null
    },
    filterNote(filterBy) {
      this.filterBy = filterBy
    },
    changeNotePin(note) {
      note.isPinned = !note.isPinned
      this.updateNote(note)
    },
    dupNote(note) {
      let noteCopy = JSON.parse(JSON.stringify(note))
      noteCopy.id = Date.now()
      this, this.saveNewNote(noteCopy)
    },
  },
  computed: {
    notesToDisplay() {
      if (
        !this.filterBy ||
        (this.filterBy.type === '' && this.filterBy.title === '')
      )
        return this.notes

      var filterNotes = []
      console.log(this.filterBy.title, this.filterBy.type)

      if (this.filterBy.title && this.filterBy.title !== '') {
        console.log(this.notes[0], 'notes')
        const regex = new RegExp(this.filterBy.title, 'i')
        filterNotes = this.notes.filter((note) => regex.test(note.info.title))
      }

      if (this.filterBy.type && this.filterBy.type !== '') {
        if (filterNotes.length)
          filterNotes = filterNotes.filter(
            (note) => note.type === this.filterBy.type
          )
        else if (!this.filterBy.title || this.filterBy.title === '')
          filterNotes = this.notes.filter(
            (note) => note.type === this.filterBy.type
          )
      }
      console.log(filterNotes, 'filtered notes')

      return filterNotes
    },
  },
}
