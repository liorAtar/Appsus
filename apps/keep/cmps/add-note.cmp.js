import { utilService } from '../../../services/util.service.js'

export default {
  template: `
    <div class="keep-app-add-note">
        <input @click="isEdit=true" v-if="!isToDo" type="text" v-model="userInput" ref="ph" v-bind:placeholder="placeHolderMsg">
        <textarea @click="isEdit=true" v-else v-bind:placeholder="placeHolderMsg" ref="ph" type="text" v-model="userInput"></textarea>
        <span>
            <button title="Add a note" @click="isNote = true, isImage=false,isVideo=false,isToDo=false,placeHolderMsg='Note content...'" :class="{'keep-button-choice': isNote}">➕</button>
            <button title="Add a image note" @click="isNote = false, isImage=true,isVideo=false,isToDo=false,placeHolderMsg='Image URL'" :class="{'keep-button-choice': isImage}">🖼️</button>
            <button title="Add a video note" @click="isNote = false, isImage=false,isVideo=true,isToDo=false,placeHolderMsg='Youtube link'" :class="{'keep-button-choice': isVideo}">🎞️</button>
            <button title="Add a todo list" @click="isNote = false, isImage=false,isVideo=false,isToDo=true,placeHolderMsg='Enter to submit'" :class="{'keep-button-choice': isToDo}">🕥</button>
        </span>
    </div>
    
    <div v-if="isEdit" id="div-modal-tmpl" class="keep-modal" v-on:click.self="saveNote">
        <div class="keep-modal-wrapper-keep" v-on:click.self="saveNote">
            <div class="keep-modal-container" :style="{backgroundColor: noteBgColor}">
                <button title="close" class="keep-modal-cancel-btn" v-on:click="saveNote(false)">🗙</button>
                <h3>Create New Note</h3>
                <input v-model="noteTitle" placeholder="Note title...">
                <textarea v-if="!isToDo" type="text" v-model="userInput" v-bind:placeholder="placeHolderMsg"></textarea>
                <div v-else class="keep-add-todo-container">
                    <textarea v-on:keyup.enter="addTodo" v-bind:placeholder="placeHolderMsg" type="text" v-model="userInput"></textarea>
                    <button @click="addTodo">enter</button>
                </div>
                <span :class="{'todos-btns':isToDo}">
                    <button title="Change note color" class="pallete-btn" v-on:click="openPallete=!openPallete">🎨</button>
                    <button title="Save a note" class="save-btn" v-on:click="saveNote">✅</button>
                </span>
                <div v-if="openPallete" class="pallete-container">
                  <span @click="noteBgColor='#ff9100'" class="keep-orange-dot"></span>
                  <span @click="noteBgColor='#ff0000'" class="keep-red-dot"></span>
                  <span @click="noteBgColor='#90ee90'" class="keep-green-dot"></span>
                  <span @click="noteBgColor='#ffc0cb'" class="keep-pink-dot"></span>
                  <span @click="noteBgColor='#e0ffff'" class="keep-lightBlue-dot"></span>
                  <span @click="noteBgColor='#ffffe0'" class="keep-yellow-dot"></span>
                  <span @click="noteBgColor='#dda0dd'"class="keep-purple-dot"></span>
                </div>
            </div>
        </div>
    </div>
    `,
  components: {},
  data() {
    return {
      userInput: null,
      isNote: true,
      isImage: null,
      isVideo: null,
      isToDo: null,
      placeHolderMsg: 'Note content...',
      isEdit: null,
      newNoteDetails: null,
      noteTitle: null,
      openPallete: false,
      noteBgColor: '#222222d1',
      todosList: [],
    }
  },
  methods: {
    saveNote(isSave = true) {
      this.isEdit = false

      this.newNoteDetails = {
        title: this.noteTitle || 'Undefined title',
        style: { backgroundColor: this.noteBgColor },
      }

      if (this.isNote) this.newNoteDetails.txt = this.userInput
      else if (this.isImage) this.newNoteDetails.url = this.userInput
      else if (this.isVideo) this.newNoteDetails.vUrl = this.userInput
      else this.newNoteDetails.todos = this.todosList

      this.userInput = ''
      this.noteTitle = ''
      this.noteBgColor = '#9107e7'
      this.openPallete = false
      if (isSave) this.createNote()
    },
    createNote() {
      var noteType = this.isNote
        ? 'note-txt'
        : this.isImage
        ? 'note-img'
        : this.isVideo
        ? 'note-video'
        : 'note-todos'
      var newNote = {
        id: utilService.makeId(),
        type: noteType,
        isPinned: false,
        info: {
          title: this.newNoteDetails.title,
        },
        style: { backgroundColor: this.newNoteDetails.style.backgroundColor },
      }

      if (this.isNote) newNote.info.txt = this.newNoteDetails.txt
      else if (this.isImage) newNote.info.url = this.newNoteDetails.url
      else if (this.isVideo) newNote.info.vUrl = this.newNoteDetails.vUrl
      else newNote.info.todos = this.newNoteDetails.todos

      this.$emit('add', newNote)
    },
    addTodo() {
      this.todosList.push({ txt: this.userInput })
      this.userInput = ''
    },
  },
  created() {},
  computed: {},
}
