<template>
  <div class="row">
  	<div class="col s12">
    	<h1 class="header">Список мероприятий</h1>  		
  	</div>
  	<div class="col s12">
  		<div 
	  		class="card horizontal"
	  		v-for="(meetup, ind) in meetups"
	  		:key="meetup.title+ind"
	  		>
	  			<div class="card-image _fit">
	  				<img :src="meetup.img">
	  			</div>
  			<div class="card-stacked">
  				<div class="card-content">
  					<div class="card-title">{{meetup.title}}</div>
  					<span class="badge">{{meetup.date | dateFilter}}</span>
  					<!-- <p>I am a very simple card. I am good at containing small bits of information.</p> -->
  				</div>
  				<div class="card-action">
  					<a href="#" @click.prevent="$router.push('/meetups/'+meetup.id)">Подробнее</a>
  				</div>
  			</div>
  		</div>  		
  	</div>

  </div>
</template>

<script>
	export default {
		computed: {
			meetups(){
				return this.$store.getters.getMeetups
			}
		}
	}
</script>

<style lang="scss">
	.card.horizontal .card-image{
		max-width: 300px;
		width: 100%;
		position: relative;
		// height: 0;
		// padding-bottom: 18.26%;
		img{
			position: absolute;
			left: 0;
			top: 0;
		}
	}
	span.badge{
		// display: block;
		float: none;
		margin-left: 0;
		background-color: #26a69a;
		color: #fff;
	}
</style>