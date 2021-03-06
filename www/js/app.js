angular.module("ropa", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","ropa.controllers", "ropa.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "ropa" ;
		$rootScope.appLogo = "data/images/avatar/pic6.jpg" ;
		$rootScope.appVersion = "1" ;
		$rootScope.headerShrink = true ;

		$ionicPlatform.ready(function() {
			if(window.cordova){
				$rootScope.exist_cordova = true ;
			}else{
				$rootScope.exist_cordova = false ;
			}
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "ropa",
				storeName : "ropa",
				description : "The offline datastore for ropa app"
			});



		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("ropa.form_login");
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("objLabel", function(){
		return function (obj) {
			var new_item = [];
			angular.forEach(obj, function(child) {
				new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v,l) {
					if (indeks !== 0) {
					new_item.push(l);
				}
				indeks++;
				});
			});
			return new_item;
		}
	})
	.filter("objArray", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks !== 0){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})


.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("en-us");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("en-us");
})


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("ropa",{
		url: "/ropa",
			abstract: true,
			templateUrl: "templates/ropa-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("ropa.about_us", {
		url: "/about_us",
		views: {
			"ropa-side_menus" : {
						templateUrl:"templates/ropa-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ropa.dashboard", {
		url: "/dashboard",
		views: {
			"ropa-side_menus" : {
						templateUrl:"templates/ropa-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ropa.faqs", {
		url: "/faqs",
		views: {
			"ropa-side_menus" : {
						templateUrl:"templates/ropa-faqs.html",
						controller: "faqsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ropa.form_login", {
		url: "/form_login",
		views: {
			"ropa-side_menus" : {
						templateUrl:"templates/ropa-form_login.html",
						controller: "form_loginCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ropa.form_order", {
		url: "/form_order",
		views: {
			"ropa-side_menus" : {
						templateUrl:"templates/ropa-form_order.html",
						controller: "form_orderCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ropa.form_user", {
		url: "/form_user",
		views: {
			"ropa-side_menus" : {
						templateUrl:"templates/ropa-form_user.html",
						controller: "form_userCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ropa.menu_1", {
		url: "/menu_1",
		views: {
			"ropa-side_menus" : {
						templateUrl:"templates/ropa-menu_1.html",
						controller: "menu_1Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ropa.menu_2", {
		url: "/menu_2",
		views: {
			"ropa-side_menus" : {
						templateUrl:"templates/ropa-menu_2.html",
						controller: "menu_2Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ropa.order", {
		url: "/order",
		views: {
			"ropa-side_menus" : {
						templateUrl:"templates/ropa-order.html",
						controller: "orderCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ropa.profile", {
		url: "/profile",
		views: {
			"ropa-side_menus" : {
						templateUrl:"templates/ropa-profile.html",
						controller: "profileCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ropa.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"ropa-side_menus" : {
						templateUrl:"templates/ropa-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/ropa/form_login");
});
