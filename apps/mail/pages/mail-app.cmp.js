import { mailService } from "../services/mail-service.js";
import mailFilter from "../cmps/mail-filter.cmp.js";
import mailMenu from "../cmps/mail-menu.cmp.js";
import addMail from "../cmps/add-mail.cmp.js";

export default {
  template: `
    <section class="main-mail-app">
        <mail-filter 
            :selectedTab="selectedTab"
            @updateModal="updateMenuModal" 
            @filterBySearch="filterBySearch"
        />
        <div class="mail-app">
            <mail-menu @openNewMail="openModal" :selectedTab="selectedTab" @updateTab="setTab" :isModalOpen="isModalOpen"/>
            <section class="mail-view">
                <div class="filter-actions">
                    <select class="btn-unread" @change="updateFilterByDate">
                        <i class="fa fa-check" aria-hidden="true"></i>
                        <option>Any Time</option>
                        <option>New To Old</option>
                        <option>Old To New</option>
                    </select>
                    <select class="btn-unread" @change="updateFilterByTitle">
                        <i class="fa fa-check" aria-hidden="true"></i>
                        <option>ABC...</option>
                        <option>A - Z</option>
                        <option>Z - A</option>
                    </select>
                    <button v-if="selectedTab === 'Sent'" :class="getBtnUnreadClass" class="btn-unread" @click="updateFilteredBy">
                        <i v-if="this.filteredBy.isUnread" class="fa fa-check" aria-hidden="true"></i>Is unread
                    </button>
                </div>
                <router-view  
                    v-if="mails"
                    :currMails="getMails"
                    @selected="selectMail" 
                    @updateStarred="updateStarStatus"
                    @updateRead="updateReadStatus"
                    @remove="removeMail"
                    @load="loadMails"
                    @add="addMail"
                />
            </section>
            <add-mail :class="isMenuModalOpen" :isOpen="isNewMailOpen" @closeNewMail="closeModal"/>
        </div>
    </section>
    `,
  data() {
    return {
      isNewMailOpen: false,
      isModalOpen: false,
      selectedTab: "Inbox",
      mails: null,
      allMails: null,
      selectedMail: null,
      filteredBy: {
        isUnread: false,
        date: "",
        title: "",
      },
      isUnreadOn: false,
    };
  },
  created() {
    mailService.query().then((resMails) => {
      this.allMails = resMails;
    });
    this.loadMails();
    this.selectedTab = mailService.getSelectedTab();
  },
  methods: {
    loadMails() {
      mailService.query().then((resMails) => {
        this.mails = resMails;
      });
    },
    openModal() {
      this.isNewMailOpen = true;
    },
    closeModal() {
      this.isNewMailOpen = false;
    },
    setTab(tab) {
      this.mails = this.allMails;
      mailService.setSelectedTab(tab);
      this.selectedTab = tab;
      this.filterMailsByDate();
    },
    updateMenuModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    updateFilteredBy() {
      this.filteredBy.isUnread = !this.filteredBy.isUnread;
      if (this.selectedTab === "Sent" && this.filteredBy.isUnread) {
        this.mails = this.mails.filter(
          (mail) => !mail.isRead && mail.status === "sent"
        );
      } else {
        this.loadMails();
      }
    },
    updateFilterByDate(ev) {
      this.filteredBy.date = ev.target.value;
      this.filterMailsByDate();
    },
    updateFilterByTitle(ev) {
      this.filteredBy.title = ev.target.value;
      this.filterMailsByTitle();
    },
    filterMailsByDate() {
      this.mails = this.allMails;
      if (this.filteredBy.date === "New To Old") {
        this.mails = this.mails.sort(
          (mail1, mail2) => +new Date(mail1.sentAt) - +new Date(mail2.sentAt)
        );
      } else if (this.filteredBy.date === "Old To New") {
        this.mails = this.mails.sort(
          (mail1, mail2) => +new Date(mail2.sentAt) - +new Date(mail1.sentAt)
        );
      }
    },
    filterMailsByTitle() {
      this.mails = this.allMails;
      if (this.filteredBy.title === "A - Z") {
        this.mails = this.mails.sort((mail1, mail2) =>
          mail2.subject.localeCompare(mail1.subject)
        );
      } else if (this.filteredBy.title === "Z - A") {
        this.mails = this.mails.sort((mail1, mail2) =>
          mail1.subject.localeCompare(mail2.subject)
        );
      }
    },
    filterBySearch(searchValue) {
      this.mails = this.allMails;
      this.mails = this.mails.filter(
        (mail) =>
          mail.subject.includes(searchValue) ||
          mail.from.email.includes(searchValue) ||
          mail.from.fullname.includes(searchValue) ||
          mail.to.email.includes(searchValue) ||
          mail.to.fullname.includes(searchValue)
      );
    },
    addMail(payload) {
      mailService.addNewMail(payload).then((mail) => {
        this.mails.push(mail);
        this.loadMails();
      });
    },
    removeMail(mailId) {
      mailService.remove(mailId).then(() => {
        const idx = this.mails.findIndex((mails) => mails.id === mailId);
        this.mails.splice(idx, 1);
        this.loadMails();
      });
    },
    selectMail(mail) {
      this.selectedMail = mail;
    },
    updateStarStatus(mail) {
      mailService
        .updateIsStarred(mail)
        .then((mail) => (this.selectedMail = mail));
    },
    updateReadStatus(mail) {
      mailService.updateIsRead(mail).then((mail) => (this.selectedMail = mail));
    },
  },
  computed: {
    getBtnUnreadClass() {
        return this.filteredBy.isUnread ? 'btn-unread-on' : ''
    },
    getMails() {
      return this.mails;
    },
    isMenuModalOpen() {
      return this.isNewMailOpen ? "modal-open" : "modal-close";
    },
  },
  components: {
    mailFilter,
    mailMenu,
    addMail,
  },
};
