<template>
  <div>
    <nav>
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo">Meetups</a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
          <li v-for="(link, ind) in menu" :key="ind">
            <a href="sass.html">
             <i class="material-icons left">supervisor_account</i>
              {{link.text}}
          </a>
          </li>
        </ul>
      </div>
    </nav>

    <ul class="sidenav" ref="sidenav" id="mobile-demo">
       <li v-for="(link, ind) in menu" :key="ind">
        <a href="sass.html">
         <i class="material-icons left">supervisor_account</i>
         {{link.text}}
       </a>
     </li>
   </ul>  
    
  </div>
</template>

<script>
export default {
  name: 'Navbar',
    data(){
    return {
      menu: [
        {
          text: 'Список встреч'
        }
      ]
    }
  },
  mounted(){
    // var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(this.$refs.sidenav, {});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .nav-wrapper{
    padding: 0 15px;
  }
</style>
