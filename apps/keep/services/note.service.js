import { storageService } from '../../../services/async-storage.service.js'

const KEEP_NOTE_KEY = 'notesDB'
_createNotes()
export const noteService = {
  query,
  remove,
  get,
  updateTodo,
  deleteTodo,
  addNewNote,
  updateNote,
}
function updateNote(note) {
  storageService.put(KEEP_NOTE_KEY, note)
}

function query() {
  return storageService.query(KEEP_NOTE_KEY)
}

function remove(noteId) {
  return storageService.remove(KEEP_NOTE_KEY, noteId)
}

function updateTodo(note, todoUpdate) {
  let index = todoUpdate.index
  note.info.todos[index] = todoUpdate
  console.log('index', index);
  storageService.put(KEEP_NOTE_KEY, note)
}

function deleteTodo(note, deleteTodo) {
  let index = deleteTodo.index
  note.info.todos.splice(index, 1)
  for (var i = 0; i < note.info.todos.length; i++) {
    note.info.todos[i].index = i
  }
  updateNote(note)
}

function get(noteId) {
  return storageService.get(KEEP_NOTE_KEY, noteId)
}

function checkNotes(notes) {
  console.log(notes)
  if (!notes || !notes.length) {
    console.log('fetching notes - ', notes, notes.length)
    notes = getNotes()
    storageService._save(KEEP_NOTE_KEY, notes)
  }
  return notes
}

function _createNotes() {
  storageService.query(KEEP_NOTE_KEY).then()
}

function getNotes() {
  const notes = [
    {
      id: 'n101',
      type: 'note-txt',
      isPinned: true,
      info: {
        txt: 'Fullstack Me Baby!',
      },
    },
    {
      id: 'n102',
      type: 'note-img',
      info: {
        url: 'http://some-img/me',
        title: 'Bobi and Me',
      },
      style: {
        backgroundColor: '#00d',
      },
    },
    {
      id: 'n103',
      type: 'note-img',
      info: {
        url: 'http://some-img/me',
        title: 'Puki and Me',
      },
      style: {
        backgroundColor: '#00d',
      },
    },
    {
      id: 'n104',
      type: 'note-img',
      info: {
        url: 'http://some-img/me',
        title: 'VUE',
      },
      style: {
        backgroundColor: '#00d',
      },
    },
    {
      id: 'n105',
      type: 'note-todos',
      info: {
        label: 'Get my stuff together',
        todos: [
          { txt: 'Driving liscence', doneAt: null },
          { txt: 'Coding power', doneAt: 187111111 },
        ],
      },
    },
  ]
  return notes
}

function addNewNote(note) {
  storageService.post(KEEP_NOTE_KEY, note)
}
