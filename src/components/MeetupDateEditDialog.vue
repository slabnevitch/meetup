<template>
	<div class="picker-wrapper">
		<div class="input-field">
			<input 
			ref="datepicker"
			id="datepick" 
			type="text" 
			class="datepicker"
			required
			v-model="editedDate">

			<label for="datepicker">
				<a class="waves-effect waves-light btn-small" href="#modal-date-edit"
					@click.prevent="datePicker.open()">{{$t('buttons.edit-date')}} {{editedDate}}</a>
			</label>
		
		</div>
		
	</div>
</template>

<script>
	export default {
		props: ['meetup'],
		name: 'MeetupDateEditDialog',
		data(){
			return{
				datePicker: null,
				editedDate: ''
			}
		},
		computed: {
			isLoading(){
				return this.$store.getters.getPreloader
			},
			currentLocale(){
				return this.$store.getters.getLocale
			}
		},
		methods: {
			initializeDatepicker(){
				this.datePicker = M.Datepicker.init(this.$refs.datepicker, {
				defaultDate: new Date(this.editedDate),
				setDefaultDate: true,
				yearRange: 100,
				i18n: {
					cancel: this.$root.$t('datepicker.cancel'),
					done: this.$root.$t('datepicker.done'),
					months: this.$root.$t('datepicker.months'),
					monthsShort: this.$root.$t('datepicker.monthsShort'),
					weekdays: this.$root.$t('datepicker.weekdays'),
					weekdaysShort: this.$root.$t('datepicker.weekdaysShort'),
					weekdaysAbbrev: this.$root.$t('datepicker.weekdaysAbbrev')
				},
				onSelect: (date) => {
					this.editedDate = date
				},
				onClose: () => {
					// const newDate = new Date(this.meetup.date)
					const newDate = new Date(this.editedDate)
					// const newDay = new Date(this.editedDate).getUTCDate()
					// const newMonth = new Date(this.editedDate).getUTCMonth()
					// const newYear = new Date(this.editedDate).getUTCFullYear()

					// newDate.setUTCDate(newDay) 
					// newDate.setUTCMonth(newMonth)
					// newDate.setUTCFullYear(newYear)
					
					newDate.setHours(new Date(this.meetup.date).getHours())
					newDate.setMinutes(new Date(this.meetup.date).getMinutes())

						this.$store.dispatch('editMeetup', {
							date: newDate,
							id: this.meetup.id,
						})
					}
				});
			},
			destroyDatepicker(){
				if(this.datePicker){
					this.datePicker.destroy()
				}
			}
		},
		created(){
			this.editedDate = this.meetup.date
		},
		watch: {
			currentLocale(value){
				console.log('change locale!')
				this.destroyDatepicker()
				this.initializeDatepicker()
			}
		},
		mounted(){
			this.initializeDatepicker()
		},
		destroyed(){
			this.destroyDatepicker()
		}

	}
</script>

<style scoped>
	.modal-edit-date{
		overflow: visible;
	}
	.datepicker{
		position: absolute;
		left: -9999px;
	}
</style>