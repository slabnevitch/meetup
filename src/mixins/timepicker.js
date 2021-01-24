export default{
	data(){
		return{
			timePicker: null
		}
	},
	methods: {
		initializeTimepicker(){
			this.timePicker = M.Timepicker.init(this.$refs.timepicker, {
				twelveHour:false,
				i18n:{
					done: this.$t('timepicker.done'),
					cancel: this.$t('timepicker.cancel')
				},
				onSelect: (hour, minute) => {
					this.hoursAndMinutes.hours = hour
					this.hoursAndMinutes.minutes = minute
					this.time = hour + ':' + minute
				}
			})
		},
		destroyTimepicker(){
			if(this.timePicker){
				this.timePicker.destroy()
			}
		}
	}

}