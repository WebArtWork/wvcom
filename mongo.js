const Mongo = {
  install(Vue, options) {
  //   Vue.prototype.$mongoMethod = function (methodOptions) {
  //   console.log("Wo Wo Wo what is this? Plugin Mongo?")
  // },
  // Vue.prototype.$newMongoMethod = function (methodOptions) {
  //   console.log("Oh yeah!!:)")
  // },
  Vue.prototype.$server = function (methodOptions) {
      this.$http.get("/api/user/get").then(function(response){

        console.log(response)

      },function(error){
        //ошибка
      })
  }

  }
};

export default Mongo;