var app = angular.module("myApp", ['firebase', 'ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/add', {
      templateUrl: 'add.html',
      controller: 'addCtrl',
    })
    .when('/admin', {
      templateUrl: 'admin.html',
      controller: 'adminCtrl'
    })
    .otherwise({ redirectTo: '/add' });


  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
});

app.controller("addCtrl", function ($scope, $firebaseArray) {
  var ref = firebase.database().ref().child("feedback");
  $scope.feedback = $firebaseArray(ref);
  $scope.status = 'Submit'

  $scope.formdata = {
    email: '',
    feedback: ''
  }

  $scope.sendForm = function () {
    $scope.formdata.datetime = Date.now()
    $scope.feedback.$add($scope.formdata);
    $scope.formdata = {
      email: '',
      feedback: ''
    }

    $scope.status = "Sending"

    var sendInterval = setInterval(function () {
      if ($scope.status !== "Sending...") {
        $scope.status += '.'
      } else {
        clearInterval(sendInterval)
        $scope.status = 'Submit'
      }
    }, 1200)
  }
});

app.controller('adminCtrl', function ($scope, $firebaseArray) {
  $scope.user = null
  $scope.userdata = {
    username: '',
    password: ''
  }

  $scope.login = function () {
    if ($scope.userdata.username == 'admin' && $scope.userdata.password == 'password') {
      $scope.user = 'admin'
      setTimeout(function () {
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, {});

        var ref = firebase.database().ref().child("feedback");
        $scope.feedback = $firebaseArray(ref);


      }, 100)
    } else {
      alert('Incorrect username / password')
    }
  }
});

var config = {
  apiKey: "AIzaSyAzwtlzyDpVqVs9ZDLSdSAbubVUZ1TKCEQ",
  authDomain: "angularjs-crud-2e7f5.firebaseapp.com",
  databaseURL: "https://angularjs-crud-2e7f5.firebaseio.com",
  projectId: "angularjs-crud-2e7f5",
  storageBucket: "angularjs-crud-2e7f5.appspot.com",
  messagingSenderId: "1086736434399"
};
firebase.initializeApp(config);