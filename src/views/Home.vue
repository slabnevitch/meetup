<template>
    <div class="row">

    	<div class="col s12 center-align">
        <div class="col s12 center-align meetups-buttons">
        	<router-link to="/meetups" tag="a" class="waves-effect waves-light btn">{{$t('buttons.view-meetups')}}</router-link>
        	<router-link to="/create-meetup" tag="a" class="waves-effect waves-light btn">{{$t('buttons.create-meetup')}}</router-link>
      	</div>
    		<h4>{{$t('page-headers.carousel-header')}}!</h4>
    		
    		<Preloader v-show="isPreload"></Preloader>
    		
    		<div v-show="!isPreload" class="carousel" ref="carousel">
    			<router-link 
    				tag="a"
    				v-for="(meet, ind) in meetups"
    				:to="/meetups/+meet.id"
    				:key="meet.id"
	    			class="carousel-item _fit" 
	    			href="#one!">
	    				<img :src="meet.img">
	    				<span class="carousel-item__title">{{meet.title}}</span>
    			</router-link>
    		</div>
    	</div>
    </div>

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Preloader from '@/components/Preloader.vue'
export default {
  name: 'Home',
  data(){
  	return{
  		instances: null
  	}
  },
  components: {
    Preloader
  },
  computed: {
  	isPreload(){
  		return this.$store.getters.getPreloader
  	},
    meetups(){
      return this.$store.getters.getFeaturedMeetups
    }
  },
  created(){
  },
  async mounted(){
  	await this.$store.dispatch('fetchMeetups')
  	console.log('fetchMeetups loaded ')
  	// setTimeout(() => {
		this.instances = M.Carousel.init(this.$refs.carousel, {
	    	dist: 0,
	    	indicators: true,
	    	fullWidth: true,
	    	numVisible: 1
	    });
    // }, 0)
    
  },
  destroyed(){
    if(this.instances != null){
      this.instances.destroy();
    }
  }
}
</script>

<style lang="scss">
	.meetups-buttons{
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		margin: 30px 0;
		a{
			margin: 5px 15px;
		}
	}
	.carousel .carousel-item{
		height: 0;
		width: 100%;
		display: block;
		padding-bottom: 52.26%;
	}
	.carousel .carousel-item img{
		position: absolute;
		left: 0;
	}
	.carousel-item__title{
		position: relative;
		padding: 15px 30px;
		font-weight: bold;
		left: 0;
		// bottom: 50px;
		display: block;	
		// border-bottom: 1px solid #fff;
		width: 100%;
		// @include adaptive-font(40px, 18px);
		color: #fff;
		background-color: rgba(#000, .6);
		z-index: 1;	
	}
	.carousel .indicators{

		background-color: rgba(#000, .7);
	}
	.carousel .indicators .indicator-item{
		height: 15px;
		width: 15px;
		margin: 15px;
	}
</style>
