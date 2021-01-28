<template>
	<div class="picker-wrapper">
		<!-- <p>{{this.fullTime.hours}}</p> -->
		
		<div class="input-field">
				<input
  				ref="timepicker" 
	  			type="text"
	  			id="timeepick" 
	  			class="timepicker"
	  			required
	  			v-model="EditedTime">

			<label for="timeepick">
				<a class="waves-effect waves-light btn-small" href="#modal-date-edit"
					@click.prevent="timePicker.open()">{{$t('buttons.edit-time')}}</a>
			</label>
		
		</div>
		
	</div>
</template>

<script>
	export default {
		props: ['meetup'],
		name: 'MeetupTimeEditDialog',
		data(){
			return{
				timePicker: null,
				EditedTime: '',
				fullTime: {
					hours: '',
					minutes: ''
				},
				hasBeenChange: false
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
		watch: {
			currentLocale(value){
				console.log('change locale!')
				this.destroyTimepicker()
				this.initializeTimepicker()
			}
		},
		methods: {
			initializeTimepicker(){
				this.timePicker = M.Timepicker.init(this.$refs.timepicker, {
					twelveHour:false,
					autoClose: false,
					i18n:{
						done: this.$t('timepicker.done'),
						cancel: this.$t('timepicker.cancel')
					},
					defaultTime: this.fullTime.hours +':'+ this.fullTime.minutes,
					onSelect: (hour, minute) => {
						this.fullTime.hours = hour
						this.fullTime.minutes = minute

						this.hasBeenChange = true
					},
					onCloseEnd: () => {
						if(this.hasBeenChange == true){
							const date = new Date(this.meetup.date)
							date.setHours(this.fullTime.hours)
							date.setMinutes(this.fullTime.minutes)

							this.$store.dispatch('editMeetup', {
								date: date,
								id: this.meetup.id,
							})

						}
						this.hasBeenChange = false
					}
				})
			},
			destroyTimepicker(){
				if(this.timePicker){
					this.timePicker.destroy()
				}
			}
		},
		created(){
			this.fullTime.hours = new Date(this.meetup.date).getHours()
			this.fullTime.minutes = new Date(this.meetup.date).getMinutes()
		},
		mounted(){
			this.initializeTimepicker()
		},
		destroyed(){
			this.destroyTimepicker()
		}

	}
</script>

<style lang="scss" scoped>
	.modal-edit-date{
		overflow: visible;
	}
	.timepicker{
		position: absolute;
		left: -9999px;

	}
</style>