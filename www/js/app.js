// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})
/*.provider('myCSRF',[function(){
  var headerName = 'X-CSRFToken';
  var cookieName = 'csrftoken';
  var allowedMethods = ['GET'];

  this.setHeaderName = function(n) {
    headerName = n;
  }
  this.setCookieName = function(n) {
    cookieName = n;
  }
  this.setAllowedMethods = function(n) {
    allowedMethods = n;
  }
  this.$get = ['$cookies', function($cookies){
    return {
      'request': function(config) {
        if(allowedMethods.indexOf(config.method) === -1) {
          // do something on success
          config.headers[headerName] = $cookies[cookieName];
        }
        return config;
      }
    }
  }];
}]).config(function($httpProvider) {
  $httpProvider.interceptors.push('myCSRF');
})*/
.config(function($stateProvider, $httpProvider ,$urlRouterProvider) {
  $httpProvider.defaults.withCredentials = true;
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
    .state('tab.recruits', {
      url: '/recruits',
      views: {
        'tab-recruits': {
          templateUrl: 'templates/tab-recruits.html',
          controller: 'RecruitMessagesCtrl'
        }
      }
    })
	.state('tab.game-detail', {
      url: '/games/:pk',
	  cache:'false',
      views: {
        'tab-games': {
          templateUrl: 'templates/game-detail.html',
          controller: 'GameDetailCtrl'
        }
      }
    })
	.state('tab.recruit-modify', {
      url: '/recruits/:pk/modify',
	  cache:'false',
      views: {
        'tab-recruits': {
          templateUrl: 'templates/recruit-modify.html',
          controller: 'RecruitModifyCtrl'
        }
      }
    })
	.state('tab.game-modify', {
      url: '/games/:pk/modify',
	  cache:'false',
      views: {
        'tab-games': {
          templateUrl: 'templates/game-modify.html',
          controller: 'GameModifyCtrl'
        }
      }
    })
	.state('tab.user', {
		url: '/user',
		//cache:'false', 
		views: {
		  'tab-user': {
			templateUrl: 'templates/tab-user.html',
			controller: 'UserCtrl'
		  }
		}
	})
	.state('tab.more', {
		url: '/more',
		//cache:'false', 
		views: {
		  'tab-more': {
			templateUrl: 'templates/tab-more.html'
		  }
		}
	})
	.state('tab.more-comment', {
		url: '/more/comment',
		//cache:'false', 
		views: {
		  'tab-more': {
			templateUrl: 'templates/more-comment.html',
			controller: 'CommentCtrl'
		  }
		}
	})
	.state('tab.more-us', {
		url: '/more/us',
		//cache:'false', 
		views: {
		  'tab-more': {
			templateUrl: 'templates/more-us.html'
		  }
		}
	})
	/*.state('tab.orther-user', {
		url: '/user/:author_username',
		views: {
		  'tab-user': {
			templateUrl: 'templates/orther-user.html',
			controller: 'OrtherUserCtrl'
		  }
		}
	})*/
	.state('tab.recruits-orther-user', {
		url: '/recruits/user/:author_username',
		//cache:'false', 
		views: {
		  'tab-recruits': {
			templateUrl: 'templates/orther-user.html',
			controller: 'OrtherUserCtrl'
		  }
		}
	})
	.state('tab.games-orther-user', {
		url: '/games/user/:author_username',
		//cache:'false', 
		views: {
		  'tab-games': {
			templateUrl: 'templates/orther-user.html',
			controller: 'OrtherUserCtrl'
		  }
		}
	})
    .state('tab.recruit-detail', {
      url: '/recruits/:pk',
	  cache:'false',
      views: {
        'tab-recruits': {
          templateUrl: 'templates/recruit-detail.html',
          controller: 'RecruitDetailCtrl'
        }
      }
    })
	.state('tab.recruit-output', {
      url: '/recruits/recruit-output',
      views: {
        'tab-recruits': {
          templateUrl: 'templates/recruit-output.html',
		  controller: 'RecruitOutputCtrl'
        }
      }
    })
  .state('tab.tab-login', {
      url: '/tab-login',
      views: {
        'tab-user': {
          templateUrl: 'templates/tab-login.html',
          controller:  'LoginCtrl'
        }
      }
    })
	.state('tab.game-output', {
      url: '/games/game-output',
      views: {
        'tab-games': {
          templateUrl: 'templates/game-output.html',
          controller:  'GameOutputCtrl'
        }
      }
    })
  .state('tab.games', {
    url: '/games',
    views: {
      'tab-games': {
        templateUrl: 'templates/tab-games.html',
        controller: 'GamesCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/recruits');

});
