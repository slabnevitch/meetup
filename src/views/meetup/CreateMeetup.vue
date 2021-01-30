<template>
  <div class="row">
  	<div class="col s12">
    	<h3 class="center-align">{{$t('page-headers.create-meetup')}}</h3>
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
  			<label for="title">{{$t('fields.title')}}*</label>
  		</div>
  		<div class="input-field">
  			<input 
	  			id="location" 
	  			type="text" 
	  			class="validate"
	  			required
	  			v-model="location">
  			<label for="location">{{$t('fields.location')}}*</label>
  		</div>
  		<div class="input-field">
  			<input 
  				ref="datepicker"
	  			id="datepick" 
	  			type="text" 
	  			class="datepicker"
	  			required
	  			v-model="date">
  			<label for="datepick"">{{$t('fields.date')}}*</label>
  		</div>
  		<div class="input-field">
  			<input
  				ref="timepicker" 
	  			type="text"
	  			id="timeepick" 
	  			class="timepicker"
	  			required
	  			v-model="time">
  			<label for="timeepick"">{{$t('fields.time')}}*</label>
  		</div>
  		<!-- <div class="input-field">
  			<input 
	  			id="img-url" 
	  			type="text" 
	  			class="validate"
	  			required
	  			v-model="img">
  			<label for="img-url">url-адрес изображения*</label>
  		</div> -->
  		<div class="file-field input-field">
  			<div class="btn">
  				<span>{{$t('fields.file')}}</span>
  				<input type="file" accept="image/*"  @change="imgSelect">
  			</div>
  			<div class="file-path-wrapper">
  				<input class="file-path validate" type="text">
  			</div>
  		</div>
  		<div 
  			v-show="imgUrl !== ''"
  			class="loaded-img _fit">
  			<img :src="imgUrl" alt="alt">
  		</div>
  		<div class="input-field col s12">
          <textarea 
          		v-model="description"
          		@input="textareaInput"
	          id="textarea1" 
	          class="materialize-textarea"></textarea>
          <label for="textarea1">{{$t('fields.description')}}</label>
        </div>
        <button 
	        type="submit" 
	        :disabled="!isValid" 
	        class="waves-effect waves-light btn-large"
	        >{{$t('buttons.create')}}</button>
    </form>
  </div>
</template>

<script>
	import Preloader from '@/components/Preloader.vue'
	import datepicker from '@/mixins/datepicker'
	import timepicker from '@/mixins/timepicker'

	export default {
		data(){
			return{
				title: '',
				location: '',
				img: null,
				imgUrl: '',
				description: '',
				// datePick: "",
				date: '',
				time: '',
				hoursAndMinutes: {
					hours: '00',
					minutes: '00'
				}
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
					this.imgUrl != '' &&
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
			},
			currentLocale(){
				return this.$store.getters.getLocale
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
			},
			currentLocale(value){
				console.log('change locale!')
				this.destroyDatepicker()
				this.destroyTimepicker()
				this.initializeDatepicker()
				this.initializeTimepicker()
			}
		},
		methods: {
			imgSelect(e){
				console.log(e.target.files[0])
				let file = e.target.files[0],
					filename = file.name;

				if(filename.lastIndexOf('.') <= 0){
					return alert('прикрепите файл с правильным форматом')
				}

				let reader = new FileReader()
				reader.readAsDataURL(file);

				reader.onload = () => {
			   	 	this.imgUrl = reader.result
			  	};
			  	this.img = file
			},
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
			},
			textareaInput(){
				M.textareaAutoResize(document.getElementById('textarea1'));
			}
			
		},
		mixins: [datepicker, timepicker],
		mounted(){
			this.initializeDatepicker()
			this.initializeTimepicker()			
		},
		destroyed(){
			this.destroyDatepicker()
			this.destroyTimepicker()
		},
	}
</script>
<style>
	.loaded-img{
		padding-bottom: 52.26%;
	}
</style>