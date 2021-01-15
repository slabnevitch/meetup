<template>
  <div class="row">
  	<div class="col s12">
    	<h3>Создайте новое мероприятие!</h3>	
  	</div>
  	<form class="col s12 m6 offset-m3" @submit.prevent="formSubmit">
  		<div>isValid {{isValid}}</div>
  		<div class="input-field">
  			<input 
	  			id="title" 
	  			type="text" 
	  			class="validate"
	  			v-model="title">
  			<label for="title">Название*</label>
  		</div>
  		<div class="input-field">
  			<input 
	  			id="location" 
	  			type="text" 
	  			class="validate"
	  			v-model="location">
  			<label for="location">Месторасположение*</label>
  		</div>
  		<div class="input-field">
  			<input 
	  			id="img-url" 
	  			type="text" 
	  			class="validate"
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
          <label for="textarea1">Описание*</label>
        </div>
        <button 
	        type="submit" 
	        :disabled="!isValid" 
	        class="waves-effect waves-light btn-large"
	        @click="sbmitClick">Создать</button>
    </form>
  </div>
</template>

<script>
	export default {
		data(){
			return{
				title: '',
				location: '',
				img: '',
				description: ''
			}
		},
		computed: {
			isValid(){
				return this.title != '' &&
					this.location != '' &&
					this.img != '' &&
					this.description != ''
			}
		},
		methods: {
			formSubmit(){
				const meetup = {
					title: this.title,
					location: this.location,
					img: this.img, 
					description: this.description,
					date: new Date(),
					id: +new Date()
				}
				if(this.isValid){
					console.log('isValid!')
					this.$store.dispatch('createMeetup', meetup)
					this.$router.push('/meetups')
				}
			},
			sbmitClick(){

			}
		}
	}
</script>
<style>
	.loaded-img{
		padding-bottom: 52.26%;
	}
</style>