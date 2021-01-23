<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
  @import '~materialize-css/dist/css/materialize.min.css';
  @import './assets/scss/_mixins';
  @import './assets/scss/_media-mixins';

  body{
    overflow: auto !important;
  }
  ._fit{
    width: 100%;
    position: relative;
  }
  ._fit img{//_fit - class for object-fit
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover; 
    object-position: center center;
  }
  .picker-wrapper{
    display: inline-block;
    margin-right: 5px;
    vertical-align: top;

    .input-field{
      margin-top: 0;
      margin-bottom: 0;
    }

    .input-field>label,
    .input-field>label:not(.label-icon).active {
      position: relative;
      transform:none;
    }

    @include max-screen(600px){
      margin-bottom: 10px;
    }
  }
  @media screen and (max-width: 768px) {
    
  }
  .card.horizontal{
    @include max-screen(768px){
      flex-direction: column;
    }
  }

</style>
