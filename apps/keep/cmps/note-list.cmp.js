export default {
    props: ['notes'],
    template: `
   <section class="-notes-list-container">
       <div v-for="note in notes" :key="note.id" class="notes-list">
            <span class="keep-list-note-options">
                <button title="Delete note" @click="remove(note.id)">x</button>
                <button title="Edit note" @click="editNote(note)">x</button>
                <button title="Duplicate note" @click="dupNote(note)">x</button>
            </span>
        </div>
    </section>
  `,
    components: {
    },
  
    data() {
      return {
        
      };
    },
    methods: {
    },
}   