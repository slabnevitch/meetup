<template>
  <div>
    <nav>
      <div class="nav-wrapper">
        <router-link to="/" tag="a" class="brand-logo">Мероприятия</router-link>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down main-menu">
          <li v-for="(link, ind) in menu" :key="ind">
            <router-link :to="link.to" tag="a">
             <i class="material-icons left">{{link.icon}}</i>
              {{link.text}}
          </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <ul class="sidenav main-menu" ref="sidenav" id="mobile-demo">
       <li v-for="(link, ind) in menu" :key="ind">
        <router-link :to="link.to" tag="a">
         <i class="material-icons left">{{link.icon}}</i>
         {{link.text}}
       </router-link>
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
          text: 'Список Мероприятий',
          icon: 'supervisor_account',
          to: '/meetups'
        },
        {
          text: 'Организовать',
          icon: 'location_on',
          to: '/create-meetup'
        },
        {
          text: 'Профиль',
          icon: 'person',
          to: 'profile'
        },
        {
          text: 'Зарегистрироваться',
          icon: 'face',
          to: 'signup'
        },
        {
          text: 'Войти',
          icon: 'lock_open',
          to: '/signin'
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
  .main-menu .router-link-active{
    background-color: rgba(0,0,0,0.1);
  }
</style>
