import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

import notesData from '../data/notes.json' assert { type: 'json' }

export const notesService = {
    query,
    getNoteById,
    remove,
    save,
    updateNote,
    saveNotesOrder
}

const NOTES_STORAGE_KEY = 'notesDB'
const QUERY_DELAY = 1000

_createNotes()

function query() {
    return storageService.query(NOTES_STORAGE_KEY, QUERY_DELAY)
}

function getNoteById(noteId) {
    return storageService.get(NOTES_STORAGE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTES_STORAGE_KEY, noteId)
}

function save(note, append = true) {
    note.id = utilService.makeId()
    return storageService.post(NOTES_STORAGE_KEY, note, append)
}

function updateNote(note) {
    return storageService.put(NOTES_STORAGE_KEY, note)
}

function saveNotesOrder(notes) {
    storageService.postEntities(NOTES_STORAGE_KEY, notes)
}

// PRIVATE

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_STORAGE_KEY)
    if (!notes || !notes.length) {
        notes = notesData.sort((a, b) => 0.5 - Math.random());
        utilService.saveToStorage(NOTES_STORAGE_KEY, notes)
    }
    return notes
}
