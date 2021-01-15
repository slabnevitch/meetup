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

</style>
