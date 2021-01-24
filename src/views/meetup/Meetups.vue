<template>
  <div class="row">
  	<div class="col s12">
    	<h3 class="header">{{$t('page-headers.meetups-header')}}</h3>  		
  	</div>
  	<Preloader v-if="isPreload"></Preloader>
  	<div b-else class="col s12">
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
  					<span class="badge">{{new Date(meetup.date) | dateFilter}}</span>
  				</div>
  				<div class="card-action">
  					<a href="#" @click.prevent="$router.push('/meetups/'+meetup.id)">{{$t('buttons.more')}}</a>
  				</div>
  			</div>
  		</div>  		
  	</div>

  </div>
</template>

<script>
	import Preloader from '@/components/Preloader.vue'

	export default {
		computed: {
			isPreload(){
				return this.$store.getters.getPreloader
			},
			meetups(){
				return this.$store.getters.getMeetups
			},
		},
		components: {
			Preloader
		},
		created(){
			this.$store.dispatch('fetchMeetups')
		}
	}
</script>

<style lang="scss">
	  @import '../../assets/scss/_mixins';
	@import '../../assets/scss/_media-mixins';

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
			width: 100%;
		}

		@include max-screen(768px){
			max-width: 100%;
			padding-bottom: 52.25%;
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