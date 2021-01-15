import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  		meetups: [
  			{
  				title: "Киев. Праздник на октябрьской площади",
  				img: 'https://pbs.twimg.com/media/CMeZ32uUAAAIEja.jpg',
  				id: 'iddqd-1',
  				date: '16-01-2021'
  			},
  			{
  				title: "Кев. Выставка в павильонах ВДНД",
  				img: 'https://pbs.twimg.com/media/DdPOureX4AAlL1R.jpg',
  				id: 'iddqd-2',
  				date: '17-01-2021'
  			}
  		],
  		user: {
  			id: 'user-1',
  			registerdMeetups: ['iddqd-1']
  		}
  },
  mutations: {
    setNewMeetup(state, payload){
      state.meetups.push(payload)
    }
  },
  actions: {
    createMeetup({commit}, payload){
      const newMeetup = {...payload}
      console.log(newMeetup)
      commit('setNewMeetup', newMeetup)
    }
  },
  getters: {
  	getMeetups: (state) => state.meetups.sort((a, b) => a.date - b.date),
  	getFeaturedMeetups: (state, getters) => getters.getMeetups.slice(0, 5),
  	getLoadedMeetup: (state) => (meetupId) => state.meetups.find(meetup => meetup.id.toString() === meetupId) //идет обращение к геттеру не как к к свойству, а как к ф-ции.
  },
  modules: {
  }
})
