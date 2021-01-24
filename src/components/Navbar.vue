<template>
  <div>
    <nav>
      <div class="nav-wrapper">
        <router-link to="/" tag="a" class="brand-logo">{{ $t('labelName') }}</router-link>
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
                 {{$t('menu.signout')}}
            </a>
          </li>
          <li>
            <a class='dropdown-trigger' href='#' data-target='dropdown1' ref="dropdownToggle">
              <i class="material-icons left">arrow_drop_down</i>
              <img v-if="locale === 'ru'" src="../assets/img/ru.svg">
              <img v-if="locale === 'en'" src="../assets/img/gb.svg">
              <!-- <span>skotnik</span> -->
            </a>
            <ul id='dropdown1' class='dropdown-content'>
              <li data-locale="ru"><a class="locale-option" @click.prevent="localeChange" href="#!"><img src="../assets/img/ru.svg"></a></li>
              <li data-locale="en"><a class="locale-option" @click.prevent="localeChange" href="#!"><img src="../assets/img/gb.svg"></a></li>

            </ul>
          </li>
        </ul>
      </div>
    </nav>
      locale:  {{$i18n.locale}}

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
        {{$t('menu.signout')}}
      </a>
    </li>
    <li>
      <a class='dropdown-trigger' href='#' data-target='dropdown2' ref="dropdownToggle">
        <i class="material-icons left">arrow_drop_down</i>
        <img v-if="locale === 'ru'" src="../assets/img/ru.svg">
        <img v-if="locale === 'en'" src="../assets/img/gb.svg">
        <!-- <span>skotnik</span> -->
      </a>
      <ul id='dropdown2' class='dropdown-content'>
        <li data-locale="ru"><a class="locale-option" @click.prevent="localeChange" href="#!"><img src="../assets/img/ru.svg"></a></li>
        <li data-locale="en"><a class="locale-option" @click.prevent="localeChange" href="#!"><img src="../assets/img/gb.svg"></a></li>

      </ul>
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
      dropdown: null,
      locale: 'ru'
    }
  },
  computed:{
    menuItems(){
      if(this.isAuthenticated){
        return [
          {
            text: this.$t('menu.list'),
            icon: 'supervisor_account',
            to: '/meetups'
          },
          {
            text: this.$t('menu.create'),
            icon: 'location_on',
            to: '/create-meetup'
          },
          {
            text: this.$t('menu.profile'),
            icon: 'person',
            to: '/profile'
          }
        ]

      }else{
        return [
        
          {
            text: this.$t('menu.signup'),
            icon: 'face',
            to: '/signup'
          },
          {
            text: this.$t('menu.signin'),
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
  methods: {
    localeChange(e){
      this.locale = e.target.closest('li').getAttribute('data-locale')
      console.log(e.target)
      this.$i18n.locale = this.locale
      this.$store.commit('setLocale', this.locale)
    }
  },
  mounted(){
    // var elems = document.querySelectorAll('.sidenav');
    this.sidenav = M.Sidenav.init(this.$refs.sidenav, {});

    var dropdowns = document.querySelectorAll('.dropdown-trigger')
    this.dropdown = M.Dropdown.init(dropdowns, {
      onCloseEnd: function() {
        // console.log(this)
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
  .dropdown-trigger{
    img{
      width: 30px;
      vertical-align: middle;
    }
  }
  .locale-option{
    img{
      max-width: 50px;
    }
  }
</style>
