import { noteService } from '../services/note.service.js'
import addNote from '../cmps/add-note.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import editNote from '../cmps/edit-note.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
  template: `
  <div class="settings-modal" v-if="isMenu">
  <button class="close-modal-btn" @click="toggleMenu">Close ❌</button> 
  <hr>
    <div class="modal-items-ctn">
            <button @click="openSettingsPallete = !openSettingsPallete; openSettings = false;"><span>Background Color</span>🎨</button>
            <button @click="openSettingsPallete = false; openSettings = !openSettings;"><span>Settings</span>⚙️</button>
            <div v-if="openSettings" class="settings-container">
              <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
            </label>
            <span>Dark mode</span>
            </div>
            <div v-if="openSettingsPallete" class="pallete-container">
                <span @click="clientBgColor='#ff9100'" class="keep-orange-dot"></span>
                <span @click="clientBgColor='#ff0000'" class="keep-red-dot"></span>
                <span @click="clientBgColor='#90ee90'" class="keep-green-dot"></span>
                <span @click="clientBgColor='#ffc0cb'" class="keep-pink-dot"></span>
                <span @click="clientBgColor='#e0ffff'" class="keep-lightBlue-dot"></span>
                <span @click="clientBgColor='#ffffe0'" class="keep-yellow-dot"></span>
                <span @click="clientBgColor='#dda0dd'"class="keep-purple-dot"></span>
            </div>
    </div>
  </div>
    <div class="keep-app-main">
        <span class="keep-header"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Google_Keep_icon_%282020%29.svg/800px-Google_Keep_icon_%282020%29.svg.png">
        <h1 class="keep-header-color">KEEP APP</h1></span>
        <button class="menu-button" @click="toggleMenu" v-if="!hideBurger">≡</button>
        <hr class="keep-app-hr">
        <add-note  @add="saveNewNote"/>
        <note-filter @filtered="filterNote"/>
        <div class="notes-inner-ctn" :style="{backgroundColor: clientBgColor}">
        </div>
        <edit-note v-if="noteToEdit" @saveEdit="updateNote" @noSave="noteToEdit=null" :noteEdit="noteToEdit"/>
        <note-list @remove="removeNote" @todo="saveToDo" @delTodo="deleteTodo" @edit="sendToEdit" @togglePin="changeNotePin" @dup="dupNote" :notes='notesToDisplay'/>
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
      isMenu: false,
      hideBurger: false,
      openSettingsPallete: false,
      clientBgColor: null,
      openSettings: false,
    }
  },
  created() {
    noteService.query().then((notes) => (this.notes = notes))
  },
  methods: {
    toggleMenu() {
      this.isMenu = !this.isMenu
      this.hideBurger = !this.hideBurger
      console.log('status', this.isMenu)
      console.log('menu activated')
    },
    saveToDo(note, todo) {
      noteService.updateTodo(note, todo)
    },
    deleteTodo(note, todo) {
      noteService.deleteTodo(note, todo)
    },
    saveNewNote(newNote) {
      eventBus.emit('show-msg', {txt: 'Note has been saved',type: 'success',})
      noteService.addNewNote(newNote)
      this.notes.push(newNote)
    },
    removeNote(noteId) {
      noteService.remove(noteId)
      const idx = this.notes.findIndex((note) => note.id === noteId)
      this.notes.splice(idx, 1)
      eventBus.emit('show-msg', {txt: 'Note has been deleted',type: 'error',})
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
      return filterNotes
    },
  },
}
