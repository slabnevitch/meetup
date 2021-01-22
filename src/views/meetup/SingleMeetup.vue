<template>
	<div class="row">
		<div class="col s12">
			<!-- <p>{{meetup}}</p> -->
			<Preloader v-if="isPreload"></Preloader>
			<div class="card single-card" v-else>
				<div class="edit-wrap" v-show="isCreator">
					
					<MeetupEditDialog
						:meetup="meetup"
						></MeetupEditDialog>
				</div>
				<div class="card-image _fit">
					<img :src="meetup.img">
					<span class="card-title">{{meetup.title}}</span>
				</div>
				<div class="card-content">
					<div class="edit-wrap">
						<MeetupDateEditDialog :meetup="meetup"></MeetupDateEditDialog>
						<MeetupTimeEditDialog :meetup="meetup"></MeetupTimeEditDialog>
						<!-- <a class="waves-effect waves-light btn-small">Изменить время</a> -->
					</div>
					<p class="meet-date">Дата: <b>{{meetup.date | dateFilter}}</b></p>
					<p class="meet-date">Место: <b>{{meetup.location}}</b></p>
					<p>{{meetup.description}}</p>
				</div>
				<div class="card-action right-align" v-show="isAuthorized">
					<a class="waves-effect waves-light btn-large red lighten-1" 
						@click.prevent="unRegister"
						v-if="isRegisteredForMeetup"
						>Отменить регистрацию</a>
					<a v-else class="waves-effect waves-light btn-large red lighten-1" @click.prevent="register">Зарегистрироваться</a>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import MeetupEditDialog from '@/components/MeetupEditDialog'
	import MeetupDateEditDialog from '@/components/MeetupDateEditDialog'
	import MeetupTimeEditDialog from '@/components/MeetupTimeEditDialog'
	export default {
		data(){
			return{
				// isRegisteredForMeetup: false

			}
		},
		components: {
			MeetupEditDialog,
			MeetupTimeEditDialog,
			MeetupDateEditDialog
		},
		computed: {
			meetup(){
				return this.$store.getters.getLoadedMeetup(this.$route.params.id)
			},
			isAuthorized(){
				return this.$store.getters.getUser
			},
			isPreload(){
				return this.$store.getters.getPreloader
			},
			isRegisteredForMeetup(){
				if(this.isAuthorized){
					return this.$store.getters.getUser.registeredMeetups.indexOf(this.$route.params.id) >= 0

				}
			},
			isCreator(){
				if(this.isAuthorized){
					return this.meetup.creatorId === this.$store.getters.getUser.id
				}
			}
		},
		methods: {
			register(){
				console.log(this.meetup.id)
				console.log(this.meetup.creatorId)
				this.$store.dispatch('registrationForMeetup', this.meetup.id)
			},
			unRegister(){
				this.$store.dispatch('unregistrationFromMeetup', this.meetup.id)
			}
		},
		created(){
			this.$store.dispatch('fetchMeetups')
		},
		mounted(){

		}
	}
</script>

<style lang="scss">
	.single-card{
		margin-top: 30px;
	}
	.single-card .card-title{
		background-color: rgba(#000, .7);
	}
	.card .card-content p.meet-date{
		margin-bottom: 15px;
	}
	.single-card .card-image{
		// width: 100%;
		position: relative;
		height: 0;
		padding-bottom: 52.26%;
		img{
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
		}
	}
	.card.horizontal .card-image img{
		width: 100%;
	}
	.edit-wrap{
		padding: 15px;	
	}
</style>