<template>
  <div class="row">
  	<div class="col s12">
    	<h3 class="center-align">Вход</h3>
  	</div>
  	<form class="col s12 l6 offset-l3" @submit.prevent="formSubmit">
  		<!-- <div>isValid {{isValid}}</div> -->
  		<div class="input-field">
  			<input 
	  			id="e-mail" 
	  			type="email" 
	  			class="validate"
	  			required
	  			v-model="email">
  			<label for="e-mail">Электронная почта*</label>
  			<span class="helper-text" data-error="Пожалуйста, введите корректный e-mail"></span>
  		</div>

  		<div class="input-field">
  			<input 
	  			id="passsword" 
	  			type="password" 
	  			class="validate"
	  			required
	  			v-model="password">
  			<label for="password">Пароль*</label>
  			<span 
  				v-show="!isPasswordLength"
  				class="helper-text red-text">Пароль должен содерджать не менее 6-ти символов</span>
  		</div>

  		<button 
	  		type="submit" 
	  		:disabled="!isValid" 
	  		class="waves-effect waves-light btn-large"
	  		>Войти</button>
    </form>
  </div>
</template>

<script>
	export default {
		data(){
			return{
				email: '',
				password: ''
			}
		},
		computed: {
			isValid(){
				return this.email!= '' &&
					this.validateEmail(this.email) &&
					this.password != '' &&
					this.isPasswordLength
			},
			isEmailValid(){
				return this.validateEmail(this.email)
			},
			isPasswordLength(){
				return this.password.length > 0 ? this.password.length >= 6 : true
			},
			user(){
				return this.$store.getters.getUser
			}
		},
		watch: {
			user(value){
				console.log(value)
				if(value){
					this.$router.push('/')
				}
			}
		},
		methods: {
				validateEmail(email) {
				    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				    return re.test(String(email).toLowerCase());
				},
				formSubmit(){
					const user = {
						email:this.email,
						password: this.password
					}
					if(this.isValid){
						console.log('isValid!')
						console.log(user)

						this.$store.dispatch('signin', user)
						
					}
				}
		}
}
</script>
