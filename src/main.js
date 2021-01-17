import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import dateFilter from './filters/dateFilter'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false
Vue.filter('dateFilter', dateFilter)

var firebaseConfig = {
    apiKey: "AIzaSyBW1GZGjDHHmOCSvzMZ_wBQAIlc5FCKcZY",
    authDomain: "meetups-a4a7e.firebaseapp.com",
    projectId: "meetups-a4a7e",
    storageBucket: "meetups-a4a7e.appspot.com",
    messagingSenderId: "450359406638",
    appId: "1:450359406638:web:b2b6735c86fcb973ef6fbf"
  };
  // Initialize Firebase

new Vue({
  router,
  store,
  created(){

  	firebase.initializeApp(firebaseConfig);
  },
  render: h => h(App)
}).$mount('#app')
