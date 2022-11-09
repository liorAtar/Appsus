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
    updateIsStarred,
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

function update(mail) {
    return storageService.put(MAIL_KEY, mail)
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
            isRead: true,
            isStarred: false,
            sentAt: 1667636246,
            to: 'momo@momo.com'
        },
        {
            id: 'e102',
            subject: 'NEW DROP W SHOPPINGIL SALE',
            body: 'SHOPPING IL | 48 HOURS\n HERE WE GO\n TAX FREE | 17% OFF',
            isRead: true,
            isStarred: false,
            sentAt: 1667722646,
            to: 'momo@momo.com'
        },
        {
            id: 'e103',
            subject: 'Don`t miss our biggest annual sale.',
            body: "Don't let the best offer of the year pass you by. Starting a program now means career advancement in 2023—perfect timing for saving 75% on all programs. Use coupon code BESTDEAL75 to apply your discount. Offer ends Nove‍mber 1‍0, 20‍22 at 10:‍00am PT.",
            isRead: false,
            isStarred: true,
            sentAt: 1668000438,
            to: 'momo@momo.com'
        },
        {
            id: 'e104',
            subject: 'Ditch the 40-minute limit - become a Zoom Pro',
            body: "Ditch the 40-minute limit when you upgrade to Pro. For a limited-time save 30% off your first year.",
            isRead: false,
            isStarred: false,
            sentAt: 1667549846,
            to: 'momo@momo.com'
        },
    ]
    return mails
}

function addNewMail(mail) {
    storageService.post(MAIL_KEY, mail)
}

function updateIsStarred(mail) {
    mail.isStarred = !mail.isStarred
    return update(mail)
}
