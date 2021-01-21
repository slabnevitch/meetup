<template>
  <div>
    <nav>
      <div class="nav-wrapper">
        <router-link to="/" tag="a" class="brand-logo">Мероприятия</router-link>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down main-menu">
          <li v-for="(link, ind) in menuItems" :key="ind">
            <router-link :to="link.to" tag="a">
             <i class="material-icons left">{{link.icon}}</i>
              {{link.text}}
          </router-link>
          </li>
          <li v-show="isAuthenticated">
            <a 
              href="#" 
              @click.prevent="$store.dispatch('signout')"
              >
                 <i class="material-icons left">exit_to_app</i>
                 Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <ul class="sidenav main-menu" ref="sidenav" id="mobile-demo">
       <li v-for="(link, ind) in menuItems" :key="ind">
        <router-link :to="link.to" tag="a" class="sidenav-close">
         <i class="material-icons left">{{link.icon}}</i>
         {{link.text}}
       </router-link>
     </li>
     <li v-show="isAuthenticated">
      <a 
        href="#" 
        @click.prevent="$store.dispatch('signout')"
        >
          <i class="material-icons left">exit_to_app</i>
          Выйти
    </a>
  </li>
   </ul>  
    
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return{
      sidenav: null
    }
  },
  computed:{
    menuItems(){
      if(this.isAuthenticated){
        return [
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
            to: '/profile'
          }
        ]

      }else{
        return [
        
          {
            text: 'Зарегистрироваться',
            icon: 'face',
            to: '/signup'
          },
          {
            text: 'Войти',
            icon: 'lock_open',
            to: '/signin'
          }
        ]

      }
    },
    isAuthenticated(){
      return this.$store.getters.getUser
    }
  },
  mounted(){
    // var elems = document.querySelectorAll('.sidenav');
    this.sidenav = M.Sidenav.init(this.$refs.sidenav, {});
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
