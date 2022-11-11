import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

import mailData from '../data/mails.json' assert {type: 'json'}


const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Merah Geshi'
}

const MAILS_KEY = 'mailsDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getUser
}

function query() {
    return storageService.query(MAILS_KEY)
}

function get(mailId){
    return storageService.get(MAILS_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAILS_KEY,mailId)
}

function save(mail) {
    if (mail.id) return storageService.put(MAILS_KEY, mail) 
    else 
    return storageService.post(MAILS_KEY, mail)
}

function getUser() {
    return loggedInUser
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAILS_KEY)
    if (!mails || !mails.length) {
        mails = mailData

        utilService.saveToStorage(MAILS_KEY, mails)
    }
    return mails
}