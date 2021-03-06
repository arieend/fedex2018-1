// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material']);

app.run(function($ionicPlatform, $rootScope) {

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    console.log('State Resolve on ' + toState.name + ' -> Error: ', error);
    console.log({
      toState: toState,
      toParams: toParams,
      fromState: fromState,
      fromParams: fromParams
    });
  });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.lists', {
      url: '/lists',
      views: {
        'menuContent': {
          templateUrl: 'templates/lists.html',
          controller: 'ListsCtrl'
        }
      }
    })

    .state('app.ink', {
      url: '/ink',
      views: {
        'menuContent': {
          templateUrl: 'templates/ink.html',
          controller: 'InkCtrl'
        }
      }
    })

    .state('app.motion', {
      url: '/motion',
      views: {
        'menuContent': {
          templateUrl: 'templates/motion.html',
          controller: 'MotionCtrl'
        }
      }
    })

    .state('app.components', {
      url: '/components',
      views: {
        'menuContent': {
          templateUrl: 'templates/components.html',
          controller: 'ComponentsCtrl'
        }
      }
    })

    .state('app.extensions', {
      url: '/extensions',
      views: {
        'menuContent': {
          templateUrl: 'templates/extensions.html',
          controller: 'ExtensionsCtrl'
        }
      }
    })

    .state('app.intro', {
      url: '/intro',
      views: {
        'menuContent': {
          templateUrl: 'templates/intro.html',
          controller: 'ExtensionsCtrl'
        }
      }
    })

    .state('app.png', {
      url: '/png',
      views: {
        'menuContent': {
          templateUrl: 'templates/png/main.html',
          controller: 'PngCtrl'
        }
      }
    })

    .state('app.png.servers', {
      url: '/servers',
      views: {
        'menuContent@app': {
          templateUrl: 'templates/png/servers.html',
          controller: 'PngCtrl'
        }
      }
    })

    .state('app.png.categories', {
      url: '/categories/:serverId',
      views: {
        'menuContent@app': {
          templateUrl: 'templates/png/categories.html',
          controller: 'PngCtrl'
        }
      }
    })

    .state('app.png.details', {
      url: '/details/:serverId/:categoryId',
      views: {
        'menuContent@app': {
          templateUrl: 'templates/png/details.html',
          controller: 'PngCtrl'
        }
      }
    })

    .state('app.png.alerts', {
      url: '/details/:alertNo',
      views: {
        'menuContent@app': {
          templateUrl: 'templates/png/alerts.html',
          controller: 'PngCtrl'
        }
      }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/png/servers');
});
