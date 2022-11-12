import { eventBus } from '../services/event-bus.service.js'

export default {
	template: `
				<Transition name="custom-classes"
					enter-active-class="animate__animated animate__fadeInUp animate__fast"
					leave-active-class="animate__animated animate__fadeOutDown animate__faster">
					<section :class="msg.type" v-if="msg.txt" class="user-msg">
							{{ msg.txt }}
					</section>
				</Transition>
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
