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
      state.user = {id: payload.uid,  registeredMeetups: []}
      console.log('setUserAuto!')
    },
    setRegisteredMeetup(state, payload){
      // console.log(payload)
      if(state.user.registeredMeetups.indexOf(payload.id) > 0){
        return
      }
      state.user.registeredMeetups.push(payload.id)

      if(!state.user.fbKeys){
        state.user.fbKeys = {}
      }
      state.user.fbKeys[payload.id] = payload.fbKey
    },
    setUnregisteredMeetup(state, payload){
      state.user.registeredMeetups.splice(state.user.registeredMeetups.indexOf(payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload);
      // state.user.fbKeys[payload.id] = payload.fbKey
    },
    setFetchedMeetup(state, payload){
      // console.log(payload)
      state.user.registeredMeetups = Object.values(payload)
      
      if(!state.user.fbKeys){
        state.user.fbKeys = {}
      }
      for(var key in payload){
        state.user.fbKeys[payload[key]] = key
      }
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
    registrationForMeetup({commit, getters}, payload){
      commit('setPreloader', true)

      if(getters.getUser.registeredMeetups.indexOf(payload) > -1 ){
        commit('setPreloader', false)
        return
      }

      firebase.database().ref('users/' + getters.getUser.id + '/registeredMeetups/').push(payload)
        .then( response => {
          console.log(response )
          const newRegisterdeMeetup = {
            id: payload,
            fbKey: response.key
          }
          commit('setRegisteredMeetup', newRegisterdeMeetup)
          commit('setPreloader', false)
        })
        .catch(e => {
          console.error(e)
          commit('setError', e.message)
        })
    },
    unregistrationFromMeetup({commit, getters}, payload){
      commit('setPreloader', true)

      if(getters.getUser.registeredMeetups.indexOf(payload) == -1 ){
        commit('setPreloader', false)
        return
      }

      const target = getters.getUser.fbKeys[payload]
      // console.log(target)

       firebase.database().ref(`users/${getters.getUser.id}/registeredMeetups/`).child(target).remove()
        .then(response => {
          commit('setUnregisteredMeetup', payload)
          commit('setPreloader', false)
        })
        .catch(e => {
          console.error(e)
          commit('setError', e.message)
        })
    },
    fetchRegisteredMeetups({commit, getters}, payload){
      commit('setPreloader', true)

      firebase.database().ref('/users/' + getters.getUser.id + '/registeredMeetups/').once('value')
        .then( responce => {
          const meetupsObj =  responce.val() || {}

          console.log(meetupsObj)

          commit('setFetchedMeetup', meetupsObj)
          commit('setPreloader', false)
        })
        .catch(e => {
          console.error(e)
          commit('setError', e.message)
        })
    },
    createMeetup({commit}, payload){
      commit('setPreloader', true)
      const newMeetup = {
          title: payload.title,
          location: payload.location,
          description: payload.description,
          date: payload.date,
          creatorId: payload.creatorId
        }
      let imageUrl
      let key
      
      const pushResult = firebase.database().ref(`meetups/`).push(newMeetup)
        .then(data => {
          
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.img.name
          const ext = filename.slice(filename.lastIndexOf('.'))

          return firebase.storage().ref('meetups/' + key + ext).put(payload.img)
        })
        .then(fileData => {
          return fileData.ref.getDownloadURL()
        })
        .then((pathToImg) => {
          return firebase.database().ref('meetups/').child(key).update({img: pathToImg, id: key})
        })
        .then(() => {
          return true
        })
        .catch(e => {
          console.error(e)
          commit('setError', e.message)
          commit('setPreloader', false)
        })

      return pushResult
    },
    editMeetup({commit, dispatch}, payload){
      commit('setPreloader', true)
      const maximilian = {
        title: payload.title,
        description: payload.description
      }

      firebase.database().ref('meetups').child(payload.id).update(maximilian)
        .then(response => {
          dispatch('fetchMeetups')
          commit('setPreloader', false)
        })
        .catch(e => {
          commit('setError', e.message)
        })
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

      commit('clearError')
      commit('setPreloader', true)

      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then( user => { 
          
          const newUser = {
            id: user.user.uid,
            registeredMeetups: []
          }
          
          commit('setNewUser', newUser)
          commit('setPreloader', false)
        })
        .catch(function(error) {
          commit('setError', error.message)
          commit('setPreloader', false)
        });
    },
    signin({commit}, payload){

      commit('clearError')
      commit('setPreloader', true)

      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then( user => { 

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
    getRegisteredMeetups: (state, getters) => {
      return getters.getMeetups.filter(meetup => {
          let id = meetup.id
          return getters.getUser.registeredMeetups.indexOf(id) > -1 ? true : false
        })
    },   
    getUser: (state) => state.user,
    
    getPreloader: (state) => state.preloader,
    getError: (state) => state.error
  },
  modules: {
  }
})
