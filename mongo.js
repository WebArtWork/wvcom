const Mongo = {
	install(Vue, options) {
		var self = this;
		self.cl = {}; // collection
		self.clpc = {}; // complete collection pulled boolean
		self.clp = {}; // collection pulled boolean
		Vue.prototype.create = function(part, obj, cb) {
			this.$http.get('/api/'+part+'/create',obj||{}).then(function(response) {
				if (resp.data && typeof cb == 'function') {
					cb(resp.data);
				} else if (typeof cb == 'function') {
					cb(false);
				}
			}, function(error) {
				
			});
		}
		Vue.prototype.get = function(part, rpl, opts, cb) {
			if (typeof rpl == 'function') cb = rpl;
			if (typeof opts == 'function') cb = opts;
			if (!Array.isArray(self.cl[part])) self.cl[part] = [];
			if (self.clp[part]) return self.cl[part];
			self.clp[part] = true;
			let pull;
			if (opts && opts.query) {
				pull = this.$http.get('/api/' + part + '/' + opts.query);
			} else pull = this.$http.get('/api/' + part + '/get');
			pull.then(function(resp) {
				if (Array.isArray(resp.data)) {
					for (var i = 0; i < resp.data.length; i++) {
						self.cl[part].push(resp.data[i]);
						if (rpl) {
							for (var key in rpl) {
								replace(resp.data[i], key, rpl[key]);
							}
						}
					}
				}
				if (opts && opts.sort) self.cl[part].sort(opts.sort);
				self.clpc[part] = true;
				typeof cb == 'function' && cb(self.cl[part]);
			}, function(err) {
				console.log(err);
			});
			return self.cl[part];
		}
		Vue.prototype.updateAll = function(part, obj, custom, cb){
			if(typeof custom == 'function') cb = custom;
			if(typeof custom != 'string') custom = '';
			this.$http.post('/api/'+part+'/update/all'+(obj._name||''), obj).then(function(resp){
				if(resp.data&&typeof cb == 'function'){
					cb(resp.data);
				}else if(typeof cb == 'function'){
					cb(false);
				}
			});
		}
		Vue.prototype.delete = function(part, obj, custom, cb){
			if(typeof custom == 'function') cb = custom;
			if(typeof custom != 'string') custom = '';
			if(!obj) return;
			if(socket) obj.print = socket.id;
			this.$http.post('/api/'+part+'/delete'+custom, {
				_id: obj._id
			}).then(function(resp){
				if(resp.data&&Array.isArray(self.cl[part])){
					for (var i = 0; i < self.cl[part].length; i++) {
						if(self.cl[part][i]._id == obj._id){
							self.cl[part].splice(i, 1);
							break;
						}
					}
				}
				if(resp.data&&typeof cb == 'function'){
					cb(resp.data);
				}else if(typeof cb == 'function'){
					cb(false);
				}
			});
		}

	}
};

export default Mongo;