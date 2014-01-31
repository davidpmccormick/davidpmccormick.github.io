var busModule = angular.module('bus', ['ngRoute']);

busModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/busang/partials/stops.html',
      controller: 'Stops'
    })
    .when('/:stop_id', {
      templateUrl: '/busang/partials/stop.html',
      controller: 'Stop'
    })
}]);

busModule.controller('Stops', ['$scope', '$http', '$location', '$q', function($scope, $http, $location, $q) {

  $scope.goBack = function() {
    $location.path('/');
  }

  $scope.getLocation = function() {
    var deferred = $q.defer();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        $scope.getStopListingForLocation(position.coords.latitude, position.coords.longitude);
        deferred.resolve(position);
      });
    } else {
      $scope.endpoint = 'http://countdown.tfl.gov.uk/markers/swLat/51.532689100000006/swLng/-0.0666296/neLat/51.5526891/neLng/-0.04662959999999999/';
    }
    return deferred.promise;
  }

  $scope.getDistanceFromLatLonInKm = function(lat1,lon1,lat2,lon2) {
    var R = 6371; // radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = (1000 * (R * c).toFixed(3)); // distance in m
    return d;
  };

  $scope.deg2rad = function(deg) {
    return deg * (Math.PI/180);
  };

  $scope.getStopListingForLocation = function(lat, lng) {
    var swLat, swLng, neLat, neLng;
    swLat = lat - 0.005;
    swLng = lng - 0.005;
    neLat = lat + 0.005;
    neLng = lng + 0.005;

    $scope.current_lat = lat;
    $scope.current_lng = lng;
    $scope.endpoint = 'http://countdown.tfl.gov.uk/markers/swLat/' + swLat + '/swLng/' + swLng + '/neLat/' + neLat + '/neLng/' + neLng + '/';
  };

  $scope.getLocation().then(function() {
    $http({
      method: 'json',
      url: 'proxy.php?url=' + $scope.endpoint
    })
    .success(function(data) {
      var stops = [];
      data.contents.markers.forEach(function(item) {
      item.distance_to_stop = $scope.getDistanceFromLatLonInKm(item.lat, item.lng, $scope.current_lat, $scope.current_lng);
        stops.push(item);
        stops.sort(function(a, b){
         return a.distance_to_stop-b.distance_to_stop;
        });
      });
      $scope.stops = stops;
    });
  });

}]);

busModule.controller('Stop', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $http({
    method: 'get',
    url: 'http://countdown.api.tfl.gov.uk/interfaces/ura/instant_V1?StopCode1=' + $routeParams.stop_id + '&ReturnList=EstimatedTime,LineID',
    transformResponse: function(data) {
      var buses = [];
      var bus_array = data.split(']');
      for(var i = 1; i < bus_array.length-1; i++) {
        var this_bus_array = bus_array[i].split(',');
        var this_number = this_bus_array[1].substring(1, this_bus_array[1].length-1);
        var this_time = this_bus_array[2];
        var date = new Date(parseInt(this_time, 10));
        buses.push({
          number: this_number,
          time: date
        });
        buses.sort(function(a, b){
         return a.time-b.time;
        });
      }
      return buses;
    }
  })
  .success(function(data) {
    $scope.buses = data;
  })
}]);