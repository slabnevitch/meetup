<template>
	<div class="row">
		<div class="col s12">
			<div class="card single-card">
				<div class="edit-wrap">
					
					<MeetupEditDialog :meetup="meetup"></MeetupEditDialog>
				</div>
				<div class="card-image _fit">
					<img :src="meetup.img">
					<span class="card-title">{{meetup.title}}</span>
				</div>
				<div class="card-content">
					<p class="meet-date">Дата: <b>{{meetup.date | dateFilter}}</b></p>
					<p class="meet-date">Место: <b>{{meetup.location}}</b></p>
					<p>{{meetup.description}}</p>
				</div>
				<div class="card-action right-align">
					<a class="waves-effect waves-light btn-large red lighten-1">Зарегистрироваться</a>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import MeetupEditDialog from '@/components/MeetupEditDialog'
	export default {
		components: {
			MeetupEditDialog
		},
		computed: {
			meetup(){
				return this.$store.getters.getLoadedMeetup(this.$route.params.id)
			}
		},
		created(){
			this.$store.dispatch('fetchMeetups')
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