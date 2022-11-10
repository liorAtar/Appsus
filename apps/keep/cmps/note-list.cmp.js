import notePreview from './note-preview.cmp.js'
export default {
  props: ['notes'],
  template: `
   <section class="notes-list-container">
   <div v-for="note in notes" :key="note.id" class="keep-app-notes-list"
       :class="{'keep-note-pin': note.isPinned, 'keep-note-not-pin': !note.isPinned}"
       :style="{backgroundColor: setBackGround(note)}">
        <!-- <h1>{{ note.info.title }}</h1> -->
        <!-- <h4>ID: {{ note.id }}</h4> -->
            <!-- <div v-if="note.isPinned" class="pinned-icon">Pinned Note!</div> -->
            <note-preview @todoChange="updateTodo" @todoDel="deleteTodo" :note="note" @edit="editNote(note)"/>
            <span class="keep-list-note-options">
                <button title="Delete note" @click="remove(note.id)">❌</button>
                <button title="Edit note" @click="editNote(note)">🖊️</button>
                <button title="Duplicate note" @click="dupNote(note)">✌️</button>
                <button :title="getTitle(note)" @click="togglePin(note)">📌</button>
            </span>
        </div>
    </section>
  `,
  components: {
    notePreview,
  },

  methods: {
    updateTodo(note, todo) {
      this.$emit('todo', note, todo)
    },
    deleteTodo(note, todo) {
      this.$emit('delTodo', note, todo)
    },
    remove(noteId) {
      console.log(noteId)
      this.$emit('remove', noteId)
    },
    editNote(note) {
      console.log('EDIT noteID', note)
      this.$emit('edit', note)
    },
    togglePin(note) {
      this.$emit('togglePin', note)
    },
    getTitle(note) {
      if ('isPinned' in note === undefined) return 'pin'
      else {
        if (note.isPinned) return 'unpin'
        else return 'pin'
      }
    },
    setBackGround(note) {
      if ('style' in note) {
        if ('backgroundColor' in note.style) return note.style.backgroundColor
      }
      return '#F7F0F5'
    },
    dupNote(note) {
      this.$emit('dup', note)
    },
  },
  computed: {},
  created() {},
}
