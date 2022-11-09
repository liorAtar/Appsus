import notePreview from './note-preview.cmp.js'
export default {
  props: ['notes'],
  template: `
   <section class="notes-list-container">
       <div v-for="note in notes" :key="note.id" class="notes-list">
        
            <span class="keep-list-note-options">
                <button title="Delete note" @click="remove(note.id)">Delete</button>
                <button title="Edit note" @click="editNote(note)">Edit</button>
                <button title="Duplicate note" @click="dupNote(note)">Duplicate</button>
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
    dupNote(note) {
      this.$emit('dup', note)
    },
  },
  computed: {},
  created() {},
}
