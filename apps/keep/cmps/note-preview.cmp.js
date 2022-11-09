export default {
  props: ['note'],
  template: `

  <section v-if="note" v-on:click.self="this.$emit('edit')">
      <div v-on:click.self="this.$emit('edit')" :style="{backgroundColor: setBg()}" >
          <img v-on:click.self="this.$emit('edit')" v-if="getUrl()" :src='getUrl()' alt="img not found">
          <h3 v-on:click.self="this.$emit('edit')">{{getTitle()}}</h3>
          <p v-on:click.self="this.$emit('edit')" v-if="getNoteTxt()" class="keep-note-info"> {{getNoteTxt()}}</p>
          <iframe v-if="getVUrl()" :src='getVUrl()'></iframe>
          <ul v-if="getsTodos()" v-for="todo in getsTodos()">
              <li>
                  <span class="keep-span-todo"> 
                      <button title="delete todo" v-on:click="deleteTodo(todo,note)">🗙</button>
                      <p @click="toggleToDo(todo,note)" v-if="todo.txt" v-bind:style= "[todo.doneAt ? {'text-decoration': 'line-through'} : {'text-decoration': none}]">{{todo.txt}}</p>
                  </span>
                  <p v-if="todo.doneAt">at: {{getDateDisplay(todo.doneAt)}}</p>
              </li>
          </ul>
          <p v-if="noteLabe">label</p>
      </div>
      <br><br>
  </section>
`,
  components: {},
  data() {
    return {}
  },
  methods: {
    getTitle() {
      var title = this.note.info.title
        ? this.note.info.title
        : 'Title not defined'
      return title
    },
    setBg() {
      if ('style' in this.note) {
        if ('backgroundColor' in this.note.style)
          return this.note.style.backgroundColor
      }
      return '#F7F0F5'
    },
    isPinned() {
      let isPin = this.note.isPinned ? true : false
      return isPin
    },
    getNoteTxt() {
      let txt = this.note.info.txt ? this.note.info.txt : false
      return txt
    },
    getUrl() {
      let url = this.note.info.url ? this.note.info.url : false
      return url
    },
    getVUrl() {
      var vUrl = this.note.info.vUrl
      if (vUrl) vUrl = vUrl.replace('/watch?v=', '/embed/')
      return vUrl
    },
    getsTodos() {
      if ('todos' in this.note.info) {
        console.log(this.note.info.todos, 'todoooo')
        let todoInfo = []
        for (let todo in this.note.info.todos) {
          let txt = this.note.info.todos[todo].txt || null
          var doneAt = this.note.info.todos[todo].doneAt || null
          let index = todo

          todoInfo.push({ txt, doneAt, index })
        }
        return todoInfo
      }
      return false
    },
    getStyle() {
      return {
        bgColor: this.noteBG,
      }
    },
    toggleToDo(todo, note) {
      if (todo.doneAt) {
        todo.doneAt = null
      } else {
        todo.doneAt = Date.now()
      }
      this.$emit('todoChange', note, todo)
    },
    deleteTodo(todo, note) {
      this.$emit('todoDel', note, todo)
    },
    getDateDisplay(timeStamp) {
      var newDate = new Date(timeStamp)

      var month = newDate.getUTCMonth() + 1
      if (+month < 10) month = '0' + month
      var day = newDate.getUTCDate()
      if (+day < 10) day = '0' + day
      var year = newDate.getUTCFullYear()
      var hours = newDate.getHours()
      if (+hours < 10) hours = '0' + hours
      var mins = newDate.getMinutes()
      if (+mins < 10) mins = '0' + mins

      newDate = `${day}/${month}/${year} ${hours}:${mins}`

      return newDate
    },
    getLables() {
      let labls = this.note.info.label ? this.note.info.label : false
      return labls
    },
  },
  computed: {},
}
