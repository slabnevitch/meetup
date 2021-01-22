<template>
  <div class="row">
  	<div class="col s12">
    		<h3>Профиль пользователя</h3>
  	</div>
  	<div class="col s12 l6">
  		<ul class="collection with-header">
  			<li class="collection-header"><h6>Мероприятия, созданные вами:</h6></li>
  			<li class="collection-item"
  				v-for="meetup in currentUserCreatedMeetups"
  				:key="meetup.id"><div>{{meetup.title}}<router-link :to="'/meetups/' + meetup.id" tag="a" class="secondary-content"><i class="material-icons">send</i></router-link></div></li>
  		</ul>
  	</div>

  	<div class="col s12 l6">
  		<ul class="collection with-header">
  			<li class="collection-header"><h6>Вы подписаны на следующие мероприятия:</h6></li>
  			<li class="collection-item"
  				v-for="meetup in currentUserRegisteredMeetups"
  				:key="meetup.id"><div>{{meetup.title}}<router-link :to="'/meetups/' + meetup.id" tag="a" class="secondary-content"><i class="material-icons">send</i></router-link></div></li>

  		</ul>
  	</div>
  </div>
</template>

<script>
	export default {
		computed: {
			meetups(){
				return this.$store.getters.getMeetups
			},
			currentUserCreatedMeetups(){
				return this.meetups.filter( meetup => meetup.creatorId === this.isAuthorized.id)
			},
			isAuthorized(){
				return this.$store.getters.getUser
			},
			registeredMeetups(){
				return this.$store.getters.getUser.registeredMeetups
			},
			currentUserRegisteredMeetups(){
				return this.$store.getters.getRegisteredMeetups
			// 	if(this.isAuthorized){
			// 		return this.meetups.filter(meetup => {
			// 			console.log(meetup.id)
			// 			let id = meetup.id
			// 			return this.registeredMeetups.indexOf(id) > -1 ? true : false
			// 		})

			// 	}
			}
		},
		created(){
			this.$store.dispatch('fetchMeetups')
			console.log('created in singleMeetup!')
		}
	}
</script>