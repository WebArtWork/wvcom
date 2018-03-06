const Mongo = {
  install(Vue, options) {
    Vue.prototype.$mongoMethod = function (methodOptions) {
    console.log("Wo Wo Wo what is this? Plugin Mongo?")
  },
  Vue.prototype.$newMongoMethod = function (methodOptions) {
    console.log("Oh yeah!!:)")
  }
  }
};

export default Mongo;