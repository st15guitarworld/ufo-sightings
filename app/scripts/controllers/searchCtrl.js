'use strict';

/**
 * @ngdoc function
 * @name siteApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the siteApp
 */
angular.module('siteApp')
  .controller('SearchCtrl',['$scope' ,'$rootScope','$element','fusionLayerService','MapService',function ($scope,$rootScope,$element,fusionLayerService,MapService) {
      $scope.inputAutocomplete="";
      $scope.autocomplete;
      $scope.SearchPanel = "expanded";
      $scope.options = {
        format:'dd-MM-yyyy',
        dateOptions:{
          formatYear: 'yyyy',
          startingDay: 1
        },
        altInputFormats:['M!/d!/yyyy'],
        minDate : new Date("1995","01","01"),
        maxDate : new Date("2010","08","30")
      };
      $scope.dt1 = {
        date:null,
        isOpen:false
      };
      $scope.dt2 = {
        date:null,
        isOpen:false
      };
    $scope.getAllInputs = function(){
      return  $(".form-control");
    }
    $scope.setupAutocomplete = function(){
      var inputAutoComplete = document.getElementById('places-input');
      $scope.autocomplete = new google.maps.places.Autocomplete(inputAutoComplete);
      $scope.autocomplete.addListener('place_changed',$scope.onPlaceChanged );
    }
    $scope.onPlaceChanged = function(){
      console.log('place changed');
    }
    $scope.resetFilter = function(){
      $scope.autocomplete.set('place',void(0));
      var inputs = $scope.getAllInputs();
      inputs.val('');
      fusionLayerService.reset();
    }
    $scope.disabled = function(date, mode) {
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    };
    $scope.open1 = function(){
      $scope.dt1.isOpen = true;;

    }
    $scope.open2 = function(){
      $scope.dt2.isOpen = true;
    }
    $scope.formatDateYYYYMMDD = function(date){
      var yyyy = date.getFullYear().toString();
      var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
      var dd  = date.getDate().toString();
      return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
    }
    $scope.searchPressed = function(){
        var autocompletePlace = $scope.autocomplete.getPlace();
        var fromDate = $scope.dt1.date;
        var toDate = $scope.dt2.date;
        if (autocompletePlace) {
          if(autocompletePlace.geometry.viewport){
            MapService.getInstance().fitBounds(autocompletePlace.geometry.viewport);
          }else{
            MapService.getInstance().setCenter(autocompletePlace.geometry.location);
            MapService.getInstance().setZoom(17);
          }
        }

        var emptyQuery = fusionLayerService.getNewQuery();
        emptyQuery.where = "reported_at >= " +$scope.formatDateYYYYMMDD(fromDate)+
        " AND reported_at <= " +$scope.formatDateYYYYMMDD(toDate);
        console.log(emptyQuery);
        fusionLayerService.options.query = emptyQuery;

    }
    $scope.onAutocompleteChange = function(){
      console.log("autocomplete changed");
      if($scope.inputAutocomplete == ""){
        $scope.autocomplete.set('place',void(0));
      }
    }
    $scope.setupAutocomplete();
  }]);
