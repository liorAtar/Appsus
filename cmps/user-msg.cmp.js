import { eventBus } from '../services/event-bus.service.js'

export default {
  template: `
        <section :class="msg.type" v-if="msg.txt" class="user-msg">
			<img src="https://www.pngplay.com/wp-content/uploads/7/Delete-Logo-Transparent-Background.png" alt="">
			<br>
            {{ msg.txt }}
        </section>
    `,
  data() {
    return {
      msg: { txt: '', type: 'success' },
    }
  },
  created() {
    eventBus.on('show-msg', this.showMsg)
  },
  methods: {
    showMsg(msg) {
      this.msg = msg
      setTimeout(() => (this.msg.txt = ''), this.msg.timeout || 1500)
    },
  },
}
