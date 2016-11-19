var url= 'http://marathon.panic.moe';
//var url= '127.0.0.1:8000';
angular.module('starter.services', ['ngResource'])
.factory('RecruitMessage', function($resource) {
  // Might use a resource here that returns a JSON array
    return $resource(url+'/api/recruit/:pk', {}, {
		getAll: {method:'GET', isArray:true},
		getOne: {method:'GET', params: {pk: "pk"},  isArray:false} ,
		output: {method:'PUT',  isArray:false},
		del: {method:'DELETE',  isArray:false},
		modify: {method:'POST',params: {pk: "pk"},  isArray:false},
		getAfter: {method:'GET', params: {last_id:"",type:""} ,isArray:true}
	});
})
.factory('Reply', function($resource) {
  // Might use a resource here that returns a JSON array
    return $resource(url+'/api/:type/:pk/reply', {}, {
		recruitReply: {method:'POST', params: {type:"recruit",pk: "pk"},  isArray:false} ,
		gameReply: {method:'POST', params: {type:"game",pk: "pk"},  isArray:false} ,
	});
})
.factory('Comment', function($resource) {
  // Might use a resource here that returns a JSON array
    return $resource(url+'/api/comment', {}, {
		getAll:  {method:'GET', isArray:true},
		getAfter: {method:'GET', params: {last_id:""},  isArray:true},
		output:  {method:'PUT', isArray:false} 
	});
})
.factory('SayGood', function($resource) {
  // Might use a resource here that returns a JSON array
    return $resource(url+'/api/:type/:pk/join', {}, {
		recruitSayGood: {method:'POST', params: {type:"recruit",pk: "pk"},  isArray:false} ,
		gameSayGood: {method:'POST', params: {type:"game",pk: "pk"},  isArray:false} ,
	});
})
.factory('User', function($resource) {
  // Might use a resource here that returns a JSON array
    return $resource(url+'/api/user/:statue', {}, {
		login: {method:'POST',params: {statue: "login"}},
		logout: {method:'GET',params: {statue: "logout"}},
		register: {method:'POST',params: {statue: "register"}}
	});
})
.factory('Games', function($resource) {
  // Might use a resource here that returns a JSON array
    return $resource(url+'/api/game/:pk', {}, {
		getOne: {method:'GET',params: {pk: "pk"}},
		getAll: {method:'GET',isArray:true},
		output: {method:'PUT'},		
		del: {method:'DELETE',  isArray:false},
		modify: {method:'POST',params: {pk: "pk"},  isArray:false},
		getAfter: {method:'GET', params: {last_id:"",type:""} ,isArray:true},
	});
})
.factory('UserMessage', function($resource) {
  // Might use a resource here that returns a JSON array  , headers:{'X-CSRFToken'cookies'csrftoken'}
    return $resource(url+'/api/user/detail/:username', {}, {
		get: {method:'GET',params: {username: ""}, isArray:false},
		modify: {method:'POST', params: {username: ""}, isArray:false //, headers:{"x-csrftoken":"F76C2RdaEWlis89NFwqk3OJECuD9J5Pu"}
		}
	});
});