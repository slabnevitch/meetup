<template>
    <div class="row">
      <div class="col s12">
    		<div>Home page</div>
    	</div>
      <div class="col s12 center-align meetups-buttons">
      	<router-link to="/meetups" tag="a" class="waves-effect waves-light btn">просмотр мероприятий</router-link>
      	<router-link to="/create-meetup" tag="a" class="waves-effect waves-light btn">организовать мероприятие</router-link>
    	</div>

    	<div class="col s12 center-align">
    		<div class="carousel" ref="carousel">
    			<a 
    				v-for="(meet, ind) in meetups"
    				:key="meet.title"
	    			class="carousel-item _fit" 
	    			href="#one!">
	    				<img :src="meet.img">
	    				<span class="carousel-item__title">{{meet.title}}</span>
    			</a>
    			<!-- <a class="carousel-item _fit" href="#three!"><img src="https://lorempixel.com/250/250/nature/3"></a>
    			<a class="carousel-item _fit" href="#four!"><img src="https://lorempixel.com/250/250/nature/4"></a>
    			<a class="carousel-item _fit" href="#five!"><img src="https://lorempixel.com/250/250/nature/5"></a> -->
    		</div>
    		<p>Присоединяйтесь к нашим замечательным мероприятиям!</p>

    	</div>
    </div>

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data(){
  	return{
  		instances: null,
  		meetups: [
  			{
  				title: "Киев. Праздник на октябрьской площади",
  				img: 'https://pbs.twimg.com/media/CMeZ32uUAAAIEja.jpg'
  			},
  			{
  				title: "Кев. Выставка в павильонах ВДНД",
  				img: 'https://pbs.twimg.com/media/DdPOureX4AAlL1R.jpg'
  			}
  		]
  	}
  },
  components: {
    // HelloWorld
  },
  mounted(){
    this.instances = M.Carousel.init(this.$refs.carousel, {
    	dist: 0,
    	indicators: true,
    	fullWidth: true,
    	numVisible: 1
    });
  }
}
</script>

<style lang="scss">
	.meetups-buttons{
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		margin-bottom: 30px;
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
		position: absolute;
		padding: 15px 30px;
		font-weight: bold;
		left: 0;
		bottom: 50px;
		// border-bottom: 1px solid #fff;
		width: 100%;
		// @include adaptive-font(40px, 18px);
		color: #fff;
		background-color: rgba(#000, .6);
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
