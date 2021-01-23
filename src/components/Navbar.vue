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
          <li v-show="isAuthenticated">
            <a class='dropdown-trigger' href='#' data-target='dropdown1' ref="dropdownToggle"><img src="../assets/img/ru.svg"></a>
            <ul id='dropdown1' class='dropdown-content'>
              <li><a href="#!"><img src="../assets/img/ru.svg"></a></li>
              <li><a href="#!"><img src="../assets/img/gb.svg"></a></li>

            </ul>
          </li>
        </ul>
      </div>
    </nav>

    <!-- SIDENAV -->
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
      sidenav: null,
      dropdown: null
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

    this.dropdown= M.Dropdown.init(this.$refs.dropdownToggle, {
      onCloseEnd: function() {
        console.log(this)
      }
    });
  },
  destroyed(){
    if(this.sidenav){
      this.sidenav.destroy()
    }
    if(this.dropdow){
      this.dropdow.destroy()
    }
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
