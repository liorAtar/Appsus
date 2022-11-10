import { storageService } from "../../../services/async-storage.service.js";
import { utilService } from "../../../services/util.service.js";

const MAIL_KEY = "mailDB";
const MENU_SELECTED_TAB_KEY = "selectedTabDB"

const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
};

_createMails();

export const mailService = {
  query,
  remove,
  get,
  updateIsRead,
  updateIsStarred,
  addNewMail,
  getSelectedTab,
  setSelectedTab,
};

function query() {
  return storageService.query(MAIL_KEY);
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId);
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId);
}

function update(mail) {
  return storageService.put(MAIL_KEY, mail);
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY);
  let selectedTab = utilService.loadFromStorage(MENU_SELECTED_TAB_KEY);
  if (!mails || !mails.length) {
    mails = getMails();
    utilService.saveToStorage(MAIL_KEY, mails);
  }

  if(!selectedTab) {
    selectedTab = 'Inbox'
    utilService.saveToStorage(MENU_SELECTED_TAB_KEY, selectedTab);
  }

  return mails;
}

function getSelectedTab() {
    return utilService.loadFromStorage(MENU_SELECTED_TAB_KEY);
}

function setSelectedTab(selectedTab) {
    utilService.saveToStorage(MENU_SELECTED_TAB_KEY, selectedTab);
}

function getMails() {
  const mails = [
    {
      id: "e101",
      status: "inbox",
      subject: "Miss you!",
      body: "Would love to catch up sometimes",
      isRead: true,
      isStarred: false,
      sentAt: 1667636246,
      from: {
        email: "nono@momo.com",
        fullname: "Nono",
      },
      to: loggedinUser
    },
    {
      id: "e102",
      status: "inbox",
      subject: "NEW DROP W SHOPPINGIL SALE",
      body: "SHOPPING IL | 48 HOURS\n HERE WE GO\n TAX FREE | 17% OFF",
      isRead: true,
      isStarred: false,
      sentAt: 1667722646,
      from: {
        email: "lolo@momo.com",
        fullname: "LoLo Nu",
      },
      to: loggedinUser
    },
    {
      id: "e103",
      status: "inbox",
      subject: "Don`t miss our biggest annual sale.",
      body: "Don't let the best offer of the year pass you by. Starting a program now means career advancement in 2023—perfect timing for saving 75% on all programs. Use coupon code ng fdbfd to apply your discount. Offer ends Nove‍mber 1‍0, 20‍22 at 10:‍00am PT.",
      isRead: false,
      isStarred: true,
      sentAt: 1668000438,
      from: {
        email: "lili@momo.com",
        fullname: "Lili Lu",
      },
      to: loggedinUser
    },
    {
      id: "e104",
      status: "inbox",
      subject: "Ditch the 40-minute limit - become a Zoom Pro",
      body: "Ditch the 40-minute limit when you upgrade to Pro. For a limited-time save 30% off your first year.",
      isRead: false,
      isStarred: false,
      sentAt: 1667549846,
      from: {
        email: "nuki@momo.com",
        fullname: "Nuki Luki",
      },
      to: loggedinUser
    },
    {
      id: "e105",
      status: "sent",
      subject: "Hello you!",
      body: "Would love to catch up sometimes",
      isRead: true,
      isStarred: false,
      sentAt: 1667636246,
      from: loggedinUser,
      to: {
        email: "puki@momo.com",
        fullname: "Puki Muki",
      }
    },
    {
      id: "e106",
      status: "sent",
      subject: "Shopping",
      body: "SHOPPING IL | 48 HOURS\n HERE WE GO\n TAX FREE | 17% OFF",
      isRead: true,
      isStarred: false,
      sentAt: 1667722646,
      from: loggedinUser,
      to: {
        email: "muki@momo.com",
        fullname: "Muki Bo",
      }
    },
    {
      id: "e107",
      status: "sent",
      subject: "Don`t miss our biggest annual sale.",
      body: "Don't let the best offer of the year pass you by. Starting a program now means career advancement in 2023—perfect timing for saving 75% on all programs. Use coupon code --- to apply your discount. Offer ends Nove‍mber 1‍0, 20‍22 at 10:‍00am PT.",
      isRead: false,
      isStarred: true,
      sentAt: 1668000438,
      from: loggedinUser,
      to: {
        email: "shuki@momo.com",
        fullname: "Shuki Sho",
      }
    },
    {
      id: "e108",
      status: "draft",
      subject: "Hello youc dvds!",
      body: "Would love to catch up sometimes",
      isRead: true,
      isStarred: false,
      sentAt: 1667636246,
      from: loggedinUser,
      to: {
        email: "puki@momo.com",
        fullname: "Puki Muki",
      }
    },
    {
      id: "e109",
      status: "draft",
      subject: "Shoppi fddfbng",
      body: "SHOPPING IL | 48 HOURS\n HERE WE GO\n TAX FREE | 17% OFF",
      isRead: true,
      isStarred: false,
      sentAt: 1667722646,
      from: loggedinUser,
      to: {
        email: "muki@momo.com",
        fullname: "Muki Bo",
      }
    },
    {
      id: "e110",
      status: "draft",
      subject: "Draft",
      body: "Don't let the best offer of the year pass you by. Starting a program now means career advancement in 2023—perfect timing for saving 75% on all programs. Use coupon code BESTDEAL75 to apply your discount. Offer ends Nove‍mber 1‍0, 20‍22 at 10:‍00am PT.",
      isRead: false,
      isStarred: true,
      sentAt: 1668000438,
      from: loggedinUser,
      to: {
        email: "shuki@momo.com",
        fullname: "Shuki Sho",
      }
    },
    {
        id: "e111",
        status: "trash",
        subject: "Trash",
        body: "Don't lbfbgf a program now means cargfbfg timing foyj.",
        isRead: false,
        isStarred: true,
        sentAt: 1668000438,
        from: loggedinUser,
        to: {
          email: "shuki@momo.com",
          fullname: "Shuki Sho",
        }
      },
  ];
  return mails;
}

function addNewMail(mail) {
  mail.id = utilService.makeId()
  mail.from = loggedinUser
  return storageService.post(MAIL_KEY, mail)
}

function updateIsStarred(mail) {
  mail.isStarred = !mail.isStarred;
  return update(mail);
}

function updateIsRead(mail) {
  mail.isRead = !mail.isRead;
  return update(mail);
}

