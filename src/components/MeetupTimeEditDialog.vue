<template>
	<div class="picker-wrapper">
			<label>
				<input
  				ref="timepicker" 
	  			type="text"
	  			id="timeepick" 
	  			class="timepicker"
	  			required
	  			v-model="EditedTime">

				<a class="waves-effect waves-light btn-small" href="#modal-date-edit"
					@click.prevent="timePicker.open()">Изменить время</a>
			</label>
		
	</div>
</template>

<script>
	export default {
		props: ['meetup'],
		name: 'MeetupTimeEditDialog',
		data(){
			return{
				timePicker: null,
				EditedTime: ''
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
			this.timePicker = M.Timepicker.init(this.$refs.timepicker, {
				twelveHour:false,
				autoClose: false,
				onSelect: (hour, minute) => {
					// const date = new Date(this.meetup.date)
					// console.log(date)
					// date.toUTCString().setHours(hour)
					// date.toUTCString().setMinutes(minute)

					// this.hoursAndMinutes.hours = hour
					// this.hoursAndMinutes.minutes = minute
					// this.time = hour + ':' + minute
				}
			})
		},
		destroyed(){
			if(this.timePicker){
				this.timePicker.destroy()
			}
		}

	}
</script>

<style>
	.modal-edit-date{
		overflow: visible;
	}
	/*.timepicker{
		position: absolute;
		left: -9999px;
	}*/
</style>