'use strict';

/**
 * @ngdoc function
 * @name siteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the siteApp
 */
angular.module('siteApp')
  .controller('MainCtrl',['$scope','MapService' ,'uiGmapGoogleMapApi','uiGmapIsReady','$rootScope',
  'fusionLayerService','infoWindowService','$interpolate','$controller',function ($scope,MapService,uiGmapGoogleMapApi,
    uiGmapIsReady,$rootScope,fusionLayerService,infoWindowService,$interpolate,$controller) {
$rootScope.searchIsVisible= false;
$scope.geomarker = null;
$scope.geoPositionChanged = false;
$scope.template = "<div class=\"googft-info-window\">" +
  "<b>Reported On:</b> {{yyyymmddToDate(row.reported_at.value)}}<br>" +
  "<b>Location Sited:</b> {{row.location.value}}<br>" +
  "<b>Eye Witness Description:</b> {{row.description.value}}" +
"</div>"

    uiGmapGoogleMapApi.then(function(maps) {
          if( typeof _.contains === 'undefined' ) {
            _.contains = _.includes;
          }
          if( typeof _.object === 'undefined' ) {
            _.object = _.zipObject;
          }
          $scope.theMap = MapService.theMap;
          $scope.fusionLayer = fusionLayerService;

    });

$scope.setupAutocomplete = function(){
  var inputAutoComplete = document.getElementById('places-input');
  var autocomplete = new google.maps.places.Autocomplete(inputAutoComplete);
}
$scope.toggleSearchPanel = function(){
  $rootScope.searchIsVisible = !$rootScope.searchIsVisible;
}
$scope.handleLocationError = function(){

}
$scope.geolocatePressed = function(){
  var mapinstance = MapService.getInstance();
  if(!$scope.geomarker){
      $scope.geomarker = new GeolocationMarker(mapinstance);
      $scope.geomarker.addListener('position_changed',$scope.gemarkerPositionChanged);
  }
}
$scope.gemarkerPositionChanged = function(){
    if(!$scope.geoPositionChanged){
      var mapinstance = MapService.getInstance();
      mapinstance.setCenter($scope.geomarker.getPosition());
      mapinstance.setZoom(12);
      $scope.geoPositionChanged = true;
    }
}
  $scope.fusionTableCreateCallBack = function(layer){
    layer.addListener('click',function(e){
      console.log(e);
      infoWindowService.setRow(e.row);
      e.infoWindowHtml = infoWindowService.interpolateIt($scope.template);
    //  console.log(infoCtrl);
      //infoCtrl.loadColumns(e);
    //  e.infoWindowHtml = $interpolate(template)(infoCtrl);
    })
  }
}]);
