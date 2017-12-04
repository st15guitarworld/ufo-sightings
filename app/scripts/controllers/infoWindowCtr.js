'use strict';
angular.module("siteApp")
.controller("infoWindCtr",['$scope',function($scope){
$scope.infoColumns={
    reported_at:null,
    location:null,
    shape:null,
    duration:null,
    description:null
};
$scope.loadColumns = function loadColumns(object){
  angular.forEach($scope.infoColumns,function(key,value){
    var key = "row";
    if(object.hasOwnProperty(key)){
      $scope.infoColumns[key] = object[key];
    }
  });
}

}]);
