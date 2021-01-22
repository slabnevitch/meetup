<template>
	<div class="picker-wrapper">
			<label>
				<input 
				ref="datepicker"
				id="datepick" 
				type="text" 
				class="datepicker"
				required
				v-model="editedDate">

				<a class="waves-effect waves-light btn-small" href="#modal-date-edit"
					@click.prevent="datePicker.open()">Изменить дату</a>
			</label>
		
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
				defaultDate: new Date(this.meetup.date),
				setDefaultDate: true,
				autoClose: true,
				onSelect: (date) => {
					this.editedDate = date
					this.$store.dispatch('editMeetup', {
						date: this.editedDate,
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

<style>
	.modal-edit-date{
		overflow: visible;
	}
	.datepicker{
		position: absolute;
		left: -9999px;
	}
</style>