<template>
	<div>
		<a class="waves-effect waves-light btn modal-trigger" href="#modal-edit">Редактировать</a>
		<div id="modal-edit" class="modal" ref="modal">
	    <form class="modal-content" @submit.prevent="formSubmit">
	    		<div class="input-field">
	    			<input 
	    			id="title" 
	    			type="text" 
	    			class="validate"
	    			required
	    			v-model.trim="editedTitle">
	    			<label for="title">Название</label>
	    			<!-- <span class="helper-text" data-error="Пожалуйста, введите корректный e-mail"></span> -->
	    		</div>

	    		<div class="input-field col s12">
	    			<textarea 
	    			v-model.trim="editedDescription"
	    			id="textarea1" 
	    			class="materialize-textarea"></textarea>
	    			<label for="textarea1">Описание</label>
	    		</div>

	    		<!-- <button 
	    		type="submit" 
	    		class="waves-effect waves-light btn-large"
	    		>Войти</button> -->
			    <div class="input-field col s12 modal-footer">
			      <a href="#!" class="modal-close waves-effect waves-green btn">Да</a>
			      <a href="#!" class="modal-close waves-effect waves-green btn">Отмена</a>
			    </div>
	    	</form>

	  </div>	
		
	</div>
</template>

<script>
	export default {
		props: ['meetup'],
		name: 'MeetupEditDialog',
		data(){
			return{
				modal: null,
				editedTitle: '',
				editedDescription: ''
			}
		},
		methods: {
				formSubmit(){

				}
		},
		mounted(){
			this.modal = M.Modal.init(this.$refs.modal, {})
		},
		destroyed(){
			if(this.modal){
				this.modal.destroy()
			}
		}

	}
</script>

