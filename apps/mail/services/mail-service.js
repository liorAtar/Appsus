import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createMails()

export const mailService = {
    query,
    remove,
    get,
}

function query() {
    return storageService.query(MAIL_KEY)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}
function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = getMails()
        utilService.saveToStorage(MAIL_KEY, mails)
    }
    return mails
}

function getMails() {
    const mails = [
        {
            id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551133930594,
            to: 'momo@momo.com'
        },
        {
            id: 'e102',
            subject: 'NEW DROP W SHOPPINGIL SALE',
            body: 'SHOPPING IL | 48 HOURS\n HERE WE GO\n TAX FREE | 17% OFF',
            isRead: false,
            sentAt: 1551133930595,
            to: 'momo@momo.com'
        },
        {
            id: 'e103',
            subject: 'Don`t miss our biggest annual sale.',
            body: "Don't let the best offer of the year pass you by. Starting a program now means career advancement in 2023—perfect timing for saving 75% on all programs. Use coupon code BESTDEAL75 to apply your discount. Offer ends Nove‍mber 1‍0, 20‍22 at 10:‍00am PT.",
            isRead: false,
            sentAt: 1551133930596,
            to: 'momo@momo.com'
        },
        {
            id: 'e104',
            subject: 'Ditch the 40-minute limit - become a Zoom Pro',
            body: "Ditch the 40-minute limit when you upgrade to Pro. For a limited-time save 30% off your first year.",
            isRead: false,
            sentAt: 1551133930597,
            to: 'momo@momo.com'
        },
    ]
    return mails
}

function addNewMail(mail) {
    storageService.post(MAIL_KEY, mail)
}
