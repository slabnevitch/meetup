<template>
	<div class="picker-wrapper">
		<!-- {{this.editedDate}} -->
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
					@click.prevent="datePicker.open()">Изменить дату</a>
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
			}
		},
		methods: {

		},
		created(){
			this.editedDate = this.meetup.date
		},
		mounted(){
			console.log(this.meetup)
			this.datePicker = M.Datepicker.init(this.$refs.datepicker, {
				defaultDate: new Date(this.editedDate),
				setDefaultDate: true,
				// autoClose: true,
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
			console.log(this.datePicker)

		},
		destroyed(){
			if(this.datePicker){
				this.datePicker.destroy()
			}
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