import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  		meetups: [
  			// {
  			// 	title: "Киев. Праздник на октябрьской площади",
  			// 	img: 'https://pbs.twimg.com/media/CMeZ32uUAAAIEja.jpg',
     //      description: 'Какое-то описание мероприятия',
     //      location: 'Киев, Украина',
  			// 	id: 'iddqd-1',
  			// 	date: 'Thu Jan 14 2021 00:00:00 GMT+0500 (Екатеринбург, стандартное время)'
  			// },
  			// {
  			// 	title: "Кев. Выставка в павильонах ВДНД",
  			// 	img: 'https://pbs.twimg.com/media/DdPOureX4AAlL1R.jpg',
     //      description: 'Какое-то описание мероприятия',
     //      location: 'Киев, Украина',
  			// 	id: 'iddqd-2',
  			// 	date: 'Thu Jan 14 2021 00:00:00 GMT+0500 (Екатеринбург, стандартное время)'
  			// }
  		],
  		user: null,
      preloader: false,
      error: null
  },
  mutations: {
    setNewMeetup(state, payload){
      state.meetups.push(payload)
    },
    setFetchedMeetups(state, payload){
      state.meetups = payload
    },
    setNewUser(state, payload){
      state.user = payload
    },
    setUserAuto(state, payload){
      state.user = {id: payload.uid,  registerdMeetups: []}
    },
    clearUser(state){
      state.user = null
    },
    setPreloader(state, payload){
      state.preloader = payload
    },
    setError(state, payload){
      state.error = payload
    },
    clearError(state){
      state.error = null
    }
  },
  actions: {
    createMeetup({commit}, payload){
      commit('setPreloader', true)
      const newMeetup = {...payload}
      console.log(typeof newMeetup.date)
      // commit('setNewMeetup', newMeetup)
      
      const pushResult = firebase.database().ref(`meetups/`).push(newMeetup)
        .then(meetup => {
          console.log(meetup)
          commit('setPreloader', false)
          return true
        })
        .catch(e => {
          commit('setError', e.message)
          commit('setPreloader', false)
        })

      return pushResult
    },
    fetchMeetups({commit}){
      commit('setPreloader', true)

      const readyMeetups = firebase.database().ref(`/meetups`).once('value')
        .then(fetchedMeetups => {
          const objMeetups = fetchedMeetups.val() || {}
          const meetups = Object.keys(objMeetups).map(key => ({
            ...objMeetups[key],
            id: key
          }))

          console.log(meetups)
          commit('setFetchedMeetups', meetups)
          commit('setPreloader', false)
        })
        .catch(e => {
          commit('setError', e.message)
          commit('setPreloader', false)
        })

      return readyMeetups
    },
    signup({commit}, payload){
      console.log(payload)

      commit('clearError')
      commit('setPreloader', true)

      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then( user => { 
          console.log(user)
          console.log(user.user.uid)
          const newUser = {
            id: user.user.uid,
            registerdMeetups: []
          }
          
          commit('setNewUser', newUser)
          commit('setPreloader', false)
        })
        .catch(function(error) {
          commit('setError', error.message)
          commit('setPreloader', false)
          console.log(error);
        });
    },
    signin({commit}, payload){

      commit('clearError')
      commit('setPreloader', true)

      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then( user => { 
          console.log(user)
          console.log(user.user.uid)
          const newUser = {
            id: user.user.uid,
            registerdMeetups: []
          }
          
          commit('setNewUser', newUser)
          commit('setPreloader', false)
        })
        .catch(function(error) {
          commit('setError', error.message)
          commit('setPreloader', false)
          console.log(error);
        });
    },
    signout({commit}){
      firebase.auth().signOut()
      commit('clearUser')
    }
  },
  getters: {
  	getMeetups: (state) => state.meetups.sort((a, b) => a.date - b.date),
  	getFeaturedMeetups: (state, getters) => getters.getMeetups.slice(0, 5),
  	getLoadedMeetup: (state) => (meetupId) => state.meetups.find(meetup => meetup.id.toString() === meetupId), //идет обращение к геттеру не как к к свойству, а как к ф-ции.
    
    getUser: (state) => state.user,
    
    getPreloader: (state) => state.preloader,
    getError: (state) => state.error
  },
  modules: {
  }
})
