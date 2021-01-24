import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import dateFilter from './filters/dateFilter'
import toastMessages from './utils/messagesPlugin'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import Preloader from '@/components/Preloader.vue'
import VueI18n from 'vue-i18n'
import enLocale from '@/assets/locales/en-locales.json'
import ruLocale from '@/assets/locales/ru-locales.json'


Vue.config.productionTip = false
Vue.filter('dateFilter', dateFilter)
Vue.use(toastMessages)
Vue.component('Preloader', Preloader)
Vue.use(VueI18n)

var firebaseConfig = {
    apiKey: "AIzaSyBW1GZGjDHHmOCSvzMZ_wBQAIlc5FCKcZY",
    authDomain: "meetups-a4a7e.firebaseapp.com",
    projectId: "meetups-a4a7e",
    storageBucket: "meetups-a4a7e.appspot.com",
    messagingSenderId: "450359406638",
    appId: "1:450359406638:web:b2b6735c86fcb973ef6fbf"
  };
  // Initialize Firebase

const messages = {
  en: enLocale,
  ru: ruLocale 
}

const i18n = new VueI18n({
  locale: 'ru', // устанавливаем локализацию по умолчанию,
  messages
})


new Vue({
  router,
  store,
  i18n,
  created(){
  	firebase.initializeApp(firebaseConfig);
    console.log('created in main.js!')
    firebase.auth().onAuthStateChanged(user => {
    	if(user){
    		this.$store.commit('setUserAuto', user)
        this.$store.dispatch('fetchRegisteredMeetups')
    	}
    })
  },
  render: h => h(App)
}).$mount('#app')
