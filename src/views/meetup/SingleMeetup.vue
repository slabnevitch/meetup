<template>
	<div class="row">
		<div class="col s12">
			<div class="card single-card">
				<div class="card-image _fit">
					<img :src="meetup.img">
					<span class="card-title">{{meetup.title}}</span>
				</div>
				<div class="card-content">
					<p class="meet-date">Дата: <b>{{meetup.date}}</b></p>
					<p>I am a very simple card. I am good at containing small bits of information.
					I am convenient because I require little markup to use effectively.</p>
				</div>
				<div class="card-action right-align">
					<a class="waves-effect waves-light btn-large red lighten-1">Зарегистрироваться</a>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		computed: {
			meetup(){
				return this.$store.getters.getLoadedMeetup(this.$route.params.id)
			}
		},
		created(){
			console.log(this.$route.params)
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
</style>