<template>
  <div class="row">
  	<div class="col s12">
    	<h3 class="center-align">Создайте новое мероприятие!</h3>
  		<!-- <p>{{isPreload}}</p> -->
  	</div>

  	<Preloader v-if="isPreload"></Preloader>

  	<form v-else class="col s12 l6 offset-l3" @submit.prevent="formSubmit">
  		<!-- <div>isValid {{isValid}}</div> -->
  		<div class="input-field">
  			<input 
	  			id="title" 
	  			type="text" 
	  			class="validate"
	  			required
	  			v-model="title">
  			<label for="title">Название*</label>
  		</div>
  		<div class="input-field">
  			<input 
	  			id="location" 
	  			type="text" 
	  			class="validate"
	  			required
	  			v-model="location">
  			<label for="location">Месторасположение*</label>
  		</div>
  		<div class="input-field">
  			<input 
  				ref="datepicker"
	  			id="datepick" 
	  			type="text" 
	  			class="datepicker"
	  			required
	  			v-model="date">
  			<label for="datepick"">Дата мероприятия*</label>
  		</div>
  		<div class="input-field">
  			<input
  				ref="timepicker" 
	  			type="text"
	  			id="timeepick" 
	  			class="timepicker"
	  			required
	  			v-model="time">
  			<label for="timeepick"">Время начала мероприятия*</label>
  		</div>
  		<div class="input-field">
  			<input 
	  			id="img-url" 
	  			type="text" 
	  			class="validate"
	  			required
	  			v-model="img">
  			<label for="img-url">url-адрес изображения*</label>
  		</div>
  		<div 
  			v-show="img != ''"
  			class="loaded-img _fit">
  			<img :src="img" alt="alt">
  		</div>
  		<div class="input-field col s12">
          <textarea 
          		v-model="description"
	          id="textarea1" 
	          class="materialize-textarea"></textarea>
          <label for="textarea1">Описание</label>
        </div>
        <button 
	        type="submit" 
	        :disabled="!isValid" 
	        class="waves-effect waves-light btn-large"
	        >Создать</button>
    </form>
  </div>
</template>

<script>
	import Preloader from '@/components/Preloader.vue'

	export default {
		data(){
			return{
				title: '',
				location: '',
				img: '',
				description: '',
				// datePick: "",
				date: '',
				time: '',
				hoursAndMinutes: {
					hours: '00',
					minutes: '00'
				},
				datePicker: null,
				timePicker: null
			}
		},
		components: {
			Preloader
		},
		computed: {
			error(){
				return this.$store.getters.getError
			},
			isPreload(){
				return this.$store.getters.getPreloader
			},
			isValid(){
				return this.title != '' &&
					this.location != '' &&
					this.img != '' &&
					this.date != '' &&
					this.time != ''
					// this.description != ''
			},
			getHoursAndMinutes(){
				return
			},
			dateTimeSumm(){
				console.log('dateTimeSumm() hours ' + typeof this.hoursAndMinutes.hours)
				console.log('dateTimeSumm() minutes ' + typeof this.hoursAndMinutes.minutes)
				let dateFull = new Date(this.date)
				dateFull.setHours(this.hoursAndMinutes.hours)
				dateFull.setMinutes(this.hoursAndMinutes.minutes)
				return dateFull
			}
		},
		watch: {
			user(value){
				console.log(value)
				if(value){
					this.$router.push('/')
				}
			},
			error(value){
				if(value){
					this.$error(value)
				}
				console.log(value)
			}
		},
		methods: {
			async formSubmit(){
				const meetup = {
					title: this.title,
					location: this.location,
					img: this.img, 
					description: this.description,
					date: this.dateTimeSumm.toISOString(),
					creatorId: this.$store.getters.getUser.id
				}
				if(this.isValid){
					console.log('isValid!')
					const created = await this.$store.dispatch('createMeetup', meetup)
					console.log('await created' + created)
					if(created){
						this.$store.commit('setPreloader', false)
						this.$router.push('/meetups')
					}
				}
			}
		},
		mounted(){
			this.datePicker = M.Datepicker.init(this.$refs.datepicker, {
				onSelect: (date) => {
					this.date = date
				}
			});

			this.timePicker = M.Timepicker.init(this.$refs.timepicker, {
				twelveHour:false,
				onSelect: (hour, minute) => {
					this.hoursAndMinutes.hours = hour
					this.hoursAndMinutes.minutes = minute
					this.time = hour + ':' + minute
				}
			})
		},
		destroyed(){
			if(this.datePicker){
				this.datePicker.destroy()
			}
			if(this.timePicker){
				this.timePicker.destroy()
			}
		}
	}
</script>
<style>
	.loaded-img{
		padding-bottom: 52.26%;
	}
</style>