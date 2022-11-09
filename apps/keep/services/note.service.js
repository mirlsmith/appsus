import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

import notesData from '../data/notes.json' assert { type: 'json' }

export const notesService = {
    query,
    getNoteById,
    remove,
    save
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

function save(note) {
    note.id = utilService.makeId()
    return storageService.post(NOTES_STORAGE_KEY, note)
}

// PRIVATE

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_STORAGE_KEY)
    if (!notes || !notes.length) {
        notes = notesData
        utilService.saveToStorage(NOTES_STORAGE_KEY, notes)
    }
    return notes
}
