export default {
  template: `
    <section class="keep-note-filter">
        <span>
          <label for="keep-note-title">Title</label>
          <input title="x" id="keep-note-title" type="text" v-model="filterBy.title" @input="filter">
        </span>
        <span>
          <label for="keep-note-type">Note Type</label>
          <select title="search note by its type" id="keep-type-filter" @change="setType($event)">
              <option value="">Choose Note</option>
              <option value="note-txt">Text</option>
              <option value="note-img">Image</option>
              <option value="note-video">Video</option>
              <option value="note-todos">Todos</option>
          </select>      
        </span>
    </section>
    `,

  data() {
    return {
      filterBy: {
        title: '',
        type: '',
      },
    }
  },
  methods: {
    filter() {
      console.log(this.filterBy)
      this.$emit('filtered', this.filterBy)
    },
    setType(e) {
      this.filterBy.type = e.target.value
      this.filter()
    },
  },
  computed: {},
}
