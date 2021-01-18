export default{
	install(Vue, options){
		Vue.prototype.$message = function(html){//метод доступен во всех компонентах
			M.toast({html})//метод для создания туллтипа (из подключенного фреймворка Materialize)
		}
		Vue.prototype.$error = function(html){//метод доступен во всех компонентах
			M.toast({html: `[ошибка]: ${html}`})//метод для создания туллтипа (из подключенного фреймворка Materialize)
		}
	}

}