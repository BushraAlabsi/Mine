var app =angular.module('app2',["ngRoute"]) //importing ngRoute is important for the config./routeProvider.
app.config(["$routeProvider", function($routeProvider) {
    $routeProvider // render one of these html pages inside the div of ng-view depending on route provided/fgpkodfp[]
    .when("/", {
      templateUrl : 'home.html'
    })
    .when("/Home", {
      templateUrl : 'home.html'
    })
    .when("/Videos", {
      templateUrl : 'categories.html'
    })
    .when("/Articles", {
      templateUrl : "categories.html"
    })
    .when("/Photos", {
      templateUrl : "categories.html"
    }) .when("/Music", {
      templateUrl : "categories.html"
    }) .when("/Others", {
      templateUrl : "categories.html"
    })
  }])
app.controller('myCtrl2', ['$scope','$http','$window',function($scope,$http,$window){
  $scope.defaultImage =  'https://orig00.deviantart.net/5132/f/2015/105/e/f/vegeta_facebook_profil_by_mjd360-d8ps1yx.jpg'

   $scope.photo = function(file) {
 
    var file = file[0];
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function(e) {
      
     
             var req ={  
         method: 'POST',
        url:"/photo",
       headers: {
      'Content-Type': 'application/json'
      },
    data: {
         image:e.target.result
    }            
  }      

  $http(req).then(function(){
    $window.location.reload()
  }, function(){
  });
 
 }
}

$scope.getVideos = function(){ //fetch the videos urls from the database
  var req = {
   method: 'POST',
   url: '/fetch',
   headers: {
     'Content-Type': 'application/json'
   },
   data: { category:"videos" }
 }

 $http(req).then(function(data){

  $scope.urls = data['data']
}, function(err){console.log(err);

})
}


 $scope.getArticles = function(){ //fetch the Articles urls from the database
      var req = {
     method: 'POST',
     url: '/fetch',
     headers: {
       'Content-Type': 'application/json'
     },
     data: { category:"articles" }
   }

   $http(req).then(function(data){
    console.log(data['data'])
    $scope.urls = data['data']
  }, function(err){console.log(err);

  })
 }
 $scope.getOthers = function(){ //fetch the others urls from the database
      var req = {
     method: 'POST',
     url: '/fetch',
     headers: {
       'Content-Type': 'application/json'
     },
     data: { category:"others" }
   }

   $http(req).then(function(data){
    console.log(data['data'])
    $scope.urls = data['data']
  }, function(err){console.log(err);

  })
 }

 $scope.getPhotos = function(){ //fetch the photos urls from the database
   var req = {
     method: 'POST',
     url: '/fetch',
     headers: {
       'Content-Type': 'application/json'
     },
     data: { category:"photos" }
   }

   $http(req).then(function(data){
    console.log(data['data'])
    $scope.urls = data['data']
  }, function(err){console.log(err);

  })
 }
 $scope.getMusic = function(){ //fetch the music urls from the database
   var req = {
     method: 'POST',
     url: '/fetch',
     headers: {
       'Content-Type': 'application/json'
     },
     data: { category:"music" }
   }

   $http(req).then(function(data){
    console.log(data['data'])
    $scope.urls = data['data']
  }, function(err){console.log(err);

  })
 }

$scope.addUrl = function (name,url, category){ // add a new url to the database

  var req = {
   method: 'POST',
   url: '/add',
   headers: {
     'Content-Type': 'application/json'
   },
   data: { name: name, url: url, category:category }
 }

 $http(req).then(function(data){
$scope.urlMessage = true;
   setTimeout(function(){
     $window.location.reload()
   },1000)
//$window.location.reload() //to refresh the page in order to show the newly added url

}, function(response){

})

}



$scope.logout= function(){ //redirect the user to the login page.

  var req= {
    method: 'GET',
    url: '/logout'
  }
  $http(req).then(function(){
    console.log('hello logout22222');
    $window.location.href = '/';
  },function(){})
}


$scope.init = function (){ // to fetch the user categories from data base. 
  $scope.urlMessage = false;
  $scope.getUser()
  var route=$window.location.href.split("!")[1];
  switch (route) {

    case "/Videos":
    $scope.getVideos()
    break;
    case "/Articles":
    $scope.getArticles()
    break;
    case "/Photos":
    $scope.getPhotos()
    break;
    case "/Music":
    $scope.getMusic()
    break;
    case "/Others":
    $scope.getOthers()
    break;

  }
}



$scope.getUser = function(){
  //fetching the user data from data base and display it in the DOM
  var req = {
 method: 'GET',
 url: '/getUser'
}

$http(req).then(function(data){
  $scope.user = data['data'];
}, function(err){
  console.log(err);
})
}
$scope.delete = function(id){ //delete a specific url.
  var req = {
   method: 'DELETE',
   url: '/delete',
   headers: {
     'Content-Type': 'application/json'
   },

   data: { id:id}

 }

 $http(req).then(function(data){
   $window.location.reload()
 }, function(err){

  console.log(err);
})
}
$scope.like = function(username,name){
  //able the user to like  others content
  var req = {

   method: 'POST',
   url: '/like',
   headers: {
     'Content-Type': 'application/json'
   },
   data: { username:username,name:name }
 }

 $http(req).then(function(data){
  // $window.location.reload()

  $scope.search(username)

 }, function(err){

  console.log(err);
})


}
$scope.unlike = function(username,name){
  //able the user to unlike  his like 
  var req = {
   method: 'POST',
   url: '/unlike',
   headers: {
     'Content-Type': 'application/json'
   },
   data: { username:username,name:name }
 }

 $http(req).then(function(data){
   console.log("success unlike")
 $scope.search(username)

 // $window.location.reload()
}, function(err){
  console.log(err);
})
}
$scope.import = function(username,name){
  //let the user import the others urls, and save it in his categories
  var req = {

   method: 'POST',
   url: '/import',
   headers: {
     'Content-Type': 'application/json'
   },
   data: { username:username,name:name }
 }

 $http(req).then(function(data){
   console.log("success import")
 }, function(err){
  console.log(err);
})
}
$scope.search = function (username) {// searching for other users and display other user in the DOM

$scope.searchUser = username;
  var req = {
   method: 'POST',
   url: '/searchUser',
   headers: {
     'Content-Type': 'application/json'
   },
   data: { username:username }
 }

 $http(req).then(function(data){
  console.log("bushra burshra ", data)
  if(data['data'].length===0){
    alert("user not found!")
  }
  for (var i = 0; i < data['data'].length; i++) {

    data['data'][i]['like'] =(data['data'][i].likesUsers.indexOf($scope.user.userName) !== -1)

  }
   $scope.usernames = data['data']
 }, function(response){

  
})


}



}])
