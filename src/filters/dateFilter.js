export default function dateFilter(value) {

	const options = {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		hour: '2-digit', 
		minute: '2-digit'
	}
	// const locale = store.getters.info.locale || 'ru-RU'
	// console.log('data gilter locale ' + locale)
	return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
}