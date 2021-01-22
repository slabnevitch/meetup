<template>
	<div>
		<a class="waves-effect waves-light btn modal-trigger" href="#modal-edit">Редактировать</a>
		<div id="modal-edit" class="modal" ref="modal">
			<Preloader v-if="isLoading"></Preloader>
	    <form v-else class="modal-content" @submit.prevent="formSubmit">
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
			      <button type="submit" class="waves-effect waves-green btn-flat">Да</button>
			      <a href="#" class="modal-close waves-effect waves-green btn-flat">Отмена</a>
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
		computed: {
			isLoading(){
				return this.$store.getters.getPreloader

			}
		},
		methods: {
				formSubmit(){
					const dkoenik = {
						title: this.editedTitle, 
						description: this.editedDescription,
						creatorId: this.meetup.creatorId,
						id: this.meetup.id
					}
					console.log(dkoenik)

					this.$store.dispatch('editMeetup', {
						title: this.editedTitle, 
						description: this.editedDescription,
						creatorId: this.meetup.creatorId,
						id: this.meetup.id
					})
					this.modal.close()
				}
		},
		mounted(){
			this.modal = M.Modal.init(this.$refs.modal, {})

			setTimeout(() => {
				M.updateTextFields();
			}, 0)

			this.editedTitle = this.meetup.title
			this.editedDescription = this.meetup.description
		},
		destroyed(){
			if(this.modal && this.modal.destroy){
				this.modal.destroy()
			}
		}

	}
</script>