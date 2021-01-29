export default{
	data(){
		return{
			datePicker: null
		}
	},
	methods: {
		initializeDatepicker(){
			this.datePicker = M.Datepicker.init(this.$refs.datepicker, {
				yearRange: 100,
				i18n: {
					cancel: this.$t('datepicker.cancel'),
					done: this.$t('datepicker.done'),
					months: this.$t('datepicker.months'),
					monthsShort: this.$t('datepicker.monthsShort'),
					weekdays: this.$t('datepicker.weekdays'),
					weekdaysShort: this.$t('datepicker.weekdaysShort'),
					weekdaysAbbrev: this.$t('datepicker.weekdaysAbbrev')
				},
				onSelect: (date) => {
					this.date = date
					console.log('onSelect ' + date)
					// this.datePickerOnSelect(date)
				}
			});
		},
		destroyDatepicker(){
			if(this.datePicker){
				this.datePicker.destroy()
			}

		}
	}

}