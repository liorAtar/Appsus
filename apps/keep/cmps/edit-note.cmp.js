export default {
  props: ['noteEdit'],
  template: `
   <div v-if="isEdit" id="div-modal-tmpl" class="keep-modal" v-on:click.self="saveNote">
       <div class="keep-modal-wrapper-keep" v-on:click.self="saveNote">
           <div class="keep-modal-container" :style="{backgroundColor: noteBgColor}">
               <button title="close" class="keep-modal-cancel-btn" v-on:click="saveNote(false)">🗙</button>
               <h3>Edit Your Note</h3>
               <input v-model="noteTitle" placeholder="Note title...">
               
               <textarea v-if="!isEditTodo()" type="text" v-model="userInput" v-bind:placeholder="placeHolderMsg"></textarea>
               <div v-else class="keep-add-todo-container">
                   <textarea v-on:keyup.enter="addTodo" placeholder="press enter to add todo" type="text" v-model="userInput" ref="todoInpt"></textarea>
                   <button @click="addTodo">Enter</button>
               </div>
               <span>
                   <button title="change note color" class="pallete-btn" v-on:click="openPallete=!openPallete">🎨</button>
                   <button title="save note" class="save-btn" v-on:click="saveNote">💾</button>
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
      userInput: this.getNoteInfo(),
      isEdit: false,
      placeHolderMsg: 'edit note',
      newDetails: null,
      noteTitle: this.noteEdit.info.title,
      openPallete: false,
      noteBgColor: this.setBackground(),
      isTodo: false,
      todosList: [],
    }
  },
  methods: {
    getNoteInfo() {
      if (this.noteEdit.type === 'note-txt')
        this.userInput = this.noteEdit.info.txt
      else if (this.noteEdit.type === 'note-img')
        this.userInput = this.noteEdit.info.url
      else if (this.noteEdit.type === 'note-video')
        this.userInput = this.noteEdit.info.vUrl
      else {
        this.isTodo = true
        this.userInput = ''
      }

      return this.userInput
    },
    saveNote(isSave = true) {
      this.isEdit = false

      this.newDetails = {
        title: this.noteTitle,
        style: { backgroundColor: this.noteBgColor },
        newInput: this.userInput,
      }

      this.userInput = ''
      this.noteTitle = ''
      this.noteBgColor = '#F7F0F5'
      this.openPallete = false
      this.isTodo = false
      if (isSave) this.updateNote()
      else this.$emit('noSave')
    },
    updateNote() {
      var noteType = this.noteEdit.type
      this.noteEdit.style = {}
      this.noteEdit.style.backgroundColor = this.noteEdit.style.backgroundColor
      this.noteEdit.style.backgroundColor =
        this.newDetails.style.backgroundColor
      this.noteEdit.info.title = this.newDetails.title

      if (noteType === 'note-txt')
        this.noteEdit.info.txt = this.newDetails.newInput
      else if (noteType === 'note-img')
        this.noteEdit.info.url = this.newDetails.newInput
      else if (noteType === 'note-video')
        this.noteEdit.info.vUrl = this.newDetails.newInput
      else this.noteEdit.info.todos = this.todosList

      this.todoList = null

      this.$emit('saveEdit', this.noteEdit)
    },
    setBackground() {
      if ('style' in this.noteEdit) {
        if ('backgroundColor' in this.noteEdit.style)
          return this.noteEdit.style.backgroundColor
      }
      return '#F7F0F5'
    },
    addTodo() {
      this.todosList.push({ txt: this.userInput })
      this.$refs['todoInpt'].value = ''
      this.userInput = null
    },
    isEditTodo() {
      if (this.noteEdit.type === 'note-todos') return true
      return false
    },
  },
  created() {},
  computed: {},
}
