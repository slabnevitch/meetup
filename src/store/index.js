import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  		meetups: [
  			{
  				title: "Киев. Праздник на октябрьской площади",
  				img: 'https://pbs.twimg.com/media/CMeZ32uUAAAIEja.jpg',
          description: 'Какое-то описание мероприятия',
          location: 'Киев, Украина',
  				id: 'iddqd-1',
  				date: 'Thu Jan 14 2021 00:00:00 GMT+0500 (Екатеринбург, стандартное время)'
  			},
  			{
  				title: "Кев. Выставка в павильонах ВДНД",
  				img: 'https://pbs.twimg.com/media/DdPOureX4AAlL1R.jpg',
          description: 'Какое-то описание мероприятия',
          location: 'Киев, Украина',
  				id: 'iddqd-2',
  				date: 'Thu Jan 14 2021 00:00:00 GMT+0500 (Екатеринбург, стандартное время)'
  			}
  		],
  		user: null
  },
  mutations: {
    setNewMeetup(state, payload){
      state.meetups.push(payload)
    },
    setNewUser(state, payload){
      state.user = payload
    }
  },
  actions: {
    createMeetup({commit}, payload){
      const newMeetup = {...payload}
      console.log(newMeetup)
      commit('setNewMeetup', newMeetup)
    },
    signup({commit}, payload){
      console.log(payload)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then( user => { 
          console.log(user)
          console.log(user.user.uid)
          const newUser = {
            id: user.user.uid,
            registerdMeetups: []
          }
          
          commit('setNewUser', newUser)
        })
        .catch(function(error) {

          console.log(error);
        });
    },
    signin({commit}, payload){

      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then( user => { 
          console.log(user)
          console.log(user.user.uid)
          const newUser = {
            id: user.user.uid,
            registerdMeetups: []
          }
          
          commit('setNewUser', newUser)
        })
        .catch(function(error) {

          console.log(error);
        });
    },

  },
  getters: {
  	getMeetups: (state) => state.meetups.sort((a, b) => a.date - b.date),
  	getFeaturedMeetups: (state, getters) => getters.getMeetups.slice(0, 5),
  	getLoadedMeetup: (state) => (meetupId) => state.meetups.find(meetup => meetup.id.toString() === meetupId), //идет обращение к геттеру не как к к свойству, а как к ф-ции.
    getUser: (state) => state.user
  },
  modules: {
  }
})
