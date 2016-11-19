angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope,$state,$ionicPopup, $ionicSlideBoxDelegate,$ionicNavBarDelegate,$ionicNavBarDelegate,$timeout,User) {
	//$ionicNavBarDelegate.showBackButton(false);
	function showAlert(err) {
		var alertPopup = $ionicPopup.alert({
			title: err,
		});
		$timeout(function() { alertPopup.close(); }, 3000);
	};
	$scope.slideHasChanged = function($index) {
		if($index==0)
			$ionicNavBarDelegate.title("登陆");
		else if($index==1)
			$ionicNavBarDelegate.title("注册");
	};
	$scope.regInLogin = function(){
		$ionicSlideBoxDelegate.next();
	}
	$scope.loginInLogin = function() {
		User.login({}, {username: $scope.loginBox.username, password: $scope.loginBox.password }, function(){
			$state.go('tab.user',{});
		//UserMessage.get({},function(){},function(){ $state.go('tab.tab-login',{}); });
		},function(e){
			if(e.status==400)
				showAlert("密码错误");
			else if(e.status==412)
				showAlert("用户名不存在");
		});
	};
  $scope.loginInReg = function(){
	$ionicSlideBoxDelegate.previous();
  }
  $scope.regInReg = function(){
	User.register({},{
		username:$scope.reg.usernameInReg,
		password:$scope.reg.passwordInReg,
		true_name:$scope.reg.true_nameInReg,
		qq_number:$scope.reg.qq_numberInReg,
		gender:$scope.gender,
		phone_number:"",
		ability:"",
		school:"UESTC"
	}, function(){
		showAlert("注册成功");
		User.login({}, {username: $scope.reg.usernameInReg, password: $scope.reg.passwordInReg}, function(){
			$state.go('tab.user',{});
		})
		//UserMessage.get({},function(){},function(){ $state.go('tab.tab-login',{}); });
	}, function(e){
		if(e.status==409)
			showAlert("用户名已存在");
		else if(e.status==406)
			showAlert("信息写不完整");
	});
  }

})
.controller('UserCtrl', function($scope,$state,$ionicPopup,$timeout,$ionicNavBarDelegate,UserMessage,User, $ionicLoading) {
	function showAlert(err) {
		var alertPopup = $ionicPopup.alert({
			title: err,
		});
		$timeout(function() { alertPopup.close(); }, 3000);
	};
	$scope.$on('$ionicView.enter', function(e) {
		$ionicLoading.show({
			template: '载入中'
		})
		$scope.UserMessage=UserMessage.get({},function(){
			$ionicLoading.hide();
		},function(e){
			$state.go('tab.tab-login',{});
			$ionicLoading.hide();
		});
	});
	//$ionicNavBarDelegate.showBackButton(false);
	$scope.logout = function() {
		User.logout();
		$state.go('tab.tab-login',{});
	};
	$scope.modify = function() {
		if($scope.UserMessage.username!=null)
			UserMessage.modify( {username:$scope.UserMessage.username},
			                {
							gender:$scope.UserMessage.gender,
							username:$scope.UserMessage.username,
							true_name:$scope.UserMessage.true_name,
							qq_number:$scope.UserMessage.qq_number,
							phone_number:$scope.UserMessage.phone_number,
							ability:$scope.UserMessage.ability },
							function(){showAlert("修改成功");},function(e){showAlert("修改失败");} );
	};
})
.controller('OrtherUserCtrl', function($scope,$ionicHistory,$stateParams,UserMessage) {
	//$scope.backView = function(){$ionicHistory.goBack();}
	$scope.$on('$ionicView.enter', function() {
		$scope.UserMessage = UserMessage.get ( {username:  $stateParams.author_username},
												function(detail){
													//console.log(detail.gender)
													if(detail.gender==1)
														$scope.gender='女'
													else if(detail.gender==2)
														$scope.gender='男'
													else if(detail.gender==3)
														$scope.gender='不明'
												});
	});	
})
.controller('CommentCtrl', function($scope,Comment) {
	$scope.moreDataCanBeLoaded=false;
	$scope.comments = Comment.getAll();
	$scope.outputComment = function(){
		Comment.output({},{detail:$scope.commentThings},function(){
			$scope.commentThings="";
			Comment.getAll({},function(refreshData){
				for(i=refreshData.length-1;i>=0;i--){
					if(refreshData[i].pk>$scope.comments[0].pk)
						$scope.comments.unshift(refreshData[i]);
				}
			});			
		})
	}
	$scope.doRefresh = function(){
		Comment.getAll({},function(refreshData){
			for(i=refreshData.length-1;i>=0;i--){
				if(refreshData[i].pk>$scope.comments[0].pk)
					$scope.comments.unshift(refreshData[i]);
			}
			$scope.$broadcast('scroll.refreshComplete');
		});		
	}
	/*$scope.loadMore = function() {
		Comment.getAfter({last_id:$scope.comments[$scope.comments.length-1].pk},function(childcomments){	
			if(childcomments.length>1 ){
				for(i=0;i<childcomments.length;i++)
					$scope.comments.push(childcomments[i]);
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}else{
				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.moreDataCanBeLoaded=false;
			}
		});
	};*/
	
})
.controller('RecruitMessagesCtrl', function($scope, $state ,RecruitMessage,$ionicPopup,$timeout,UserMessage) {
	$scope.recruitSelelctPlaceHolder=true;
	$scope.moreDataCanBeLoaded=false;
	$scope.changePlaceHolder = function(){
		if($scope.typeQuery!="")
			$scope.recruitSelelctPlaceHolder=false;
		else 
			$scope.recruitSelelctPlaceHolder=true;
	}
	function showAlert(err) {
		var alertPopup = $ionicPopup.alert({
			title: err,
		});
		$timeout(function() { alertPopup.close(); }, 3000);
	}; 
	$scope.doRefresh = function() {
		RecruitMessage.getAll({},{},function(refreshData){
			$scope.RecruitMessages=refreshData;
			$scope.$broadcast('scroll.refreshComplete');
		},function(){
			$scope.$broadcast('scroll.refreshComplete');
		});
		/*RecruitMessage.getAll({},{},function(refreshData){
			for(i=refreshData.length-1;i>=0;i--){
				if(refreshData[i].pk>$scope.RecruitMessages[0].pk)
					$scope.RecruitMessages.unshift(refreshData[i]);	
			}
			for(i=refreshData.length-1;i>=0;i--){
				for(j=$scope.RecruitMessages.length-1;j>=0;j--)
					if(refreshData[i].pk==$scope.RecruitMessages[j])
						$scope.RecruitMessages[j].time=refreshData[i].time;
			}
			$scope.$broadcast('scroll.refreshComplete');
		});*/
		/*$scope.RecruitMessages = RecruitMessage.getAll({},{},function(){
			$scope.$broadcast('scroll.refreshComplete');
		});*/
	};
	$scope.RecruitMessages = RecruitMessage.getAll({},{},function(){
		$scope.moreDataCanBeLoaded=true;
		$scope.$broadcast('scroll.infiniteScrollComplete');
		
	});
	$scope.toRecuitOutput = function() {
		UserMessage.get({},{},function(){
			$state.go('tab.recruit-output',{});
		},function(){
			showAlert("请先登录");
			$state.go('tab.tab-login',{});
		});
	};
	$scope.$on('$ionicView.enter', function() {
		$scope.moreDataCanBeLoaded=false;
		RecruitMessage.getAll({},{},function(refreshData){
			$scope.RecruitMessages=refreshData;
			$scope.moreDataCanBeLoaded=true;
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
			/*if($scope.RecruitMessages.length>0){
				RecruitMessage.getAll({},{},function(refreshData){
					for(i=refreshData.length-1;i>=0;i--){
						if(refreshData[i].pk>$scope.RecruitMessages[0].pk)
							$scope.RecruitMessages.unshift(refreshData[i]);
					}
					for(i=0;i<refreshData.length-1;i++){
						$scope.RecruitMessages[i].title=refreshData[i].title;
						$scope.RecruitMessages[i].time=refreshData[i].time;
					}
					//$scope.$broadcast('scroll.refreshComplete');
				});
			}*/
	});
	$scope.loadMore = function() {
		RecruitMessage.getAfter({last_id:$scope.RecruitMessages[$scope.RecruitMessages.length-1].pk , type:$scope.typeQuery},function(childRecruitMessages){	
			if(childRecruitMessages.length>1 ){
				for(i=0;i<childRecruitMessages.length;i++)
					$scope.RecruitMessages.push(childRecruitMessages[i]);
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}else{
				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.moreDataCanBeLoaded=false;
			}
		});
	};
})
.controller('RecruitOutputCtrl', function($scope,$ionicPopup,$state,$timeout, UserMessage , RecruitMessage) {
	function showAlert(err) {
		var alertPopup = $ionicPopup.alert({
			title: err,
		});
		$timeout(function() { alertPopup.close(); }, 3000);
	};
	$scope.Recruit=UserMessage.get();
	$scope.output =function(){RecruitMessage.output({},
							{type:$scope.Recruit.type,
							title:$scope.Recruit.title,
							detail:$scope.Recruit.detail,
							},function(){showAlert("已发布");$state.go('tab.recruits',{});});
				}
	$scope.recruitSelelctPlaceHolder=true;
	$scope.changePlaceHolder = function(){
		if($scope.Recruit.type!="")
			$scope.recruitSelelctPlaceHolder=false;
		else 
			$scope.recruitSelelctPlaceHolder=true;
	}
})
.controller('RecruitDetailCtrl', function($scope,$stateParams,RecruitMessage,UserMessage,Reply,SayGood,$state) {
	RecruitMessage.getOne({pk:  $stateParams.pk},function(getData){
		$scope.chat=getData;
		$scope.number=getData.joins.length;
		UserMessage.get({},function(userdata){
			if(userdata.username==$scope.chat.author_username)
				$scope.modifyButtonShow=true;
			else
				$scope.modifyButtonShow=false;
		})
	});
	$scope.toRecruitModify = function(){
		$state.go('tab.recruit-modify',{pk:$stateParams.pk});
	}
	$scope.saygood = function(){
				SayGood.recruitSayGood({pk:$stateParams.pk},{details:""},function(){
					RecruitMessage.getOne({pk:  $stateParams.pk},function(getData){
						$scope.number=getData.joins.length;
					});
				});
	};
	$scope.comment = function(){
		Reply.recruitReply({pk:$stateParams.pk},{detail:$scope.commentThings},function(){
			$scope.commentThings="";
			RecruitMessage.getOne({pk:  $stateParams.pk},function(refreshData){
				for(i=0;i<refreshData.replies.length-$scope.chat.replies.length;i++)
					$scope.chat.replies.unshift(refreshData.replies[i]);
			});
		})
	}
})
.controller('RecruitModifyCtrl', function($scope,$ionicPopup,$state,$timeout ,$stateParams,$ionicHistory, RecruitMessage) {
	function showAlert(err) {
		var alertPopup = $ionicPopup.alert({
			title: err,
		});
		$timeout(function() { alertPopup.close(); }, 3000);
	};
	$scope.Recruit = RecruitMessage.getOne({pk:$stateParams.pk});
	$scope.modify = function(){RecruitMessage.modify({pk:$stateParams.pk},
							{type:$scope.Recruit.type,
							title:$scope.Recruit.title,
							detail:$scope.Recruit.detail,
							},function(){showAlert("修改成功");$ionicHistory.goBack();});
	}
	$scope.del = function(){RecruitMessage.del({pk:$stateParams.pk},
							function(){showAlert("删除成功");$ionicHistory.goBack(-2);});
	}
	$scope.recruitSelelctPlaceHolder=false;
	$scope.changePlaceHolder = function(){
		if($scope.Recruit.type!="")
			$scope.recruitSelelctPlaceHolder=false;
		else 
			$scope.recruitSelelctPlaceHolder=true;
	}
})
.controller('GamesCtrl', function($scope,Games,$state,$ionicPopup,$timeout,UserMessage) {
	$scope.moreDataCanBeLoaded=false;
	$scope.gameSelelctPlaceHolder=true;
	$scope.changePlaceHolder = function(){
		if($scope.typeQuery!="")
			$scope.gameSelelctPlaceHolder=false;
		else 
			$scope.gameSelelctPlaceHolder=true;
	}
	function showAlert(err) {
		var alertPopup = $ionicPopup.alert({
			title: err,
		});
		$timeout(function() { alertPopup.close(); }, 3000);
	};
	$scope.Games = Games.getAll({},{},function(){
		$scope.moreDataCanBeLoaded=true;
		//console.log($scope.moreDataCanBeLoaded);
		$scope.$broadcast('scroll.infiniteScrollComplete');
	});
	
	
	$scope.doRefresh = function() {
		Games.getAll({},{},function(refreshData){
			/*for(i=refreshData.length-1;i>=0;i--){
				if(refreshData[i].pk>$scope.Games[0].pk)
					$scope.Games.unshift(refreshData[i]);
			}*/
			$scope.Games = refreshData;
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	
	$scope.$on('$ionicView.enter', function() {
		//console.log($scope.moreDataCanBeLoaded);
		/*if($scope.Games.length>0){
			Games.getAll({},{},function(refreshData){
				for(i=refreshData.length-1;i>=0;i--){
					if(refreshData[i].pk>$scope.Games[0].pk)
						$scope.Games.unshift(refreshData[i]);
				}
				for(i=0;i<refreshData.length-1;i++){
					$scope.Games[i].title=refreshData[i].title;
					$scope.Games[i].time=refreshData[i].time;
				}
				//$scope.$broadcast('scroll.refreshComplete');
			});
		}*/
		$scope.moreDataCanBeLoaded=false;
		Games.getAll({},{},function(refreshData){
			$scope.moreDataCanBeLoaded=true;
			$scope.Games = refreshData;
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	});
	
	$scope.toGameOutput = function() {
		UserMessage.get({},{},function(){
			$state.go('tab.game-output',{});
		},function(){
			showAlert("请先登录");
			$state.go('tab.tab-login',{});
		});
	};
	
	$scope.loadMore = function() {
		Games.getAfter({last_id:$scope.Games[$scope.Games.length-1].pk , type:$scope.typeQuery},function(childRecruitMessages){	
			if(childRecruitMessages.length>1 ){
				for(i=0;i<childRecruitMessages.length;i++)
					$scope.Games.push(childRecruitMessages[i]);
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}else{
				$scope.$broadcast('scroll.infiniteScrollComplete');
				//alert("fuck")
				$scope.moreDataCanBeLoaded=false;
			}
		});
	};
})
.controller('GameOutputCtrl', function($scope,Games,$ionicPopup,$state,$timeout) {
	function showAlert(err) {
			var alertPopup = $ionicPopup.alert({
			title: err,
		});
		$timeout(function() { alertPopup.close(); }, 3000);
	};
	$scope.output = function () {Games.output({},
								{type:$scope.Game.type,
								title:$scope.Game.title,
								detail:$scope.Game.detail ,
								sponsor:$scope.Game.sponsor,
								about_qq_group:$scope.Game.about_qq_group,
								school:"UESTC",
								},function(){showAlert("已发布");$state.go('tab.games',{});});
	}
	$scope.gameSelelctPlaceHolder=true;
	$scope.changePlaceHolder = function(){
		if($scope.Game.type!="")
			$scope.gameSelelctPlaceHolder=false;
		else 
			$scope.gameSelelctPlaceHolder=true;
	}
})
.controller('GameDetailCtrl', function($scope, $stateParams,Reply,$state,SayGood, UserMessage,Games) {
	Games.getOne({pk:  $stateParams.pk},function(getData){
		$scope.game=getData;
		$scope.number=getData.joins.length;
		UserMessage.get({},function(userdata){
			if(userdata.username==$scope.game.author_username)
				$scope.modifyButtonShow=true;
			else
				$scope.modifyButtonShow=false;
		})
	});
	$scope.toRecruitModify = function(){
		$state.go('tab.game-modify',{pk:$stateParams.pk});
	}
	$scope.saygood = function(){
				SayGood.gameSayGood({pk:$stateParams.pk},{details:""},function(){
					Games.getOne({pk:  $stateParams.pk},function(getData){
						$scope.number=getData.joins.length;
					});
				});
			};
	$scope.comment = function(){
		Reply.gameReply({pk:$stateParams.pk},{detail:$scope.commentThings},function(){
			$scope.commentThings="";
			Games.getOne({pk:  $stateParams.pk},function(refreshData){
				for(i=0;i<refreshData.replies.length-$scope.game.replies.length;i++)
					$scope.game.replies.unshift(refreshData.replies[i]);
			});		
		})
	}
})
.controller('GameModifyCtrl', function($scope,Games,$ionicPopup,$state,$timeout,$stateParams,$ionicHistory) {
	function showAlert(err) {
			var alertPopup = $ionicPopup.alert({
			title: err,
		});
		$timeout(function() { alertPopup.close(); }, 3000);
	};
	$scope.Game = Games.getOne({pk:$stateParams.pk});
	$scope.modify = function () {Games.modify({pk:$stateParams.pk},
								{type:$scope.Game.type,
								title:$scope.Game.title,
								detail:$scope.Game.detail ,
								sponsor:$scope.Game.sponsor,
								about_qq_group:$scope.Game.about_qq_group,
								school:"UESTC",
								},function(){showAlert("修改成功");$ionicHistory.goBack();});
	}
	$scope.del = function(){Games.del({pk:$stateParams.pk},
							function(){showAlert("删除成功");$ionicHistory.goBack(-2);});
	}
	$scope.gameSelelctPlaceHolder=false;
	$scope.changePlaceHolder = function(){
		if($scope.Game.type!="")
			$scope.gameSelelctPlaceHolder=false;
		else 
			$scope.gameSelelctPlaceHolder=true;
	}
});
