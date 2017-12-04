'use strict';
angular.module('siteApp').service('infoWindowService',['$templateCache','$interpolate',function($templateCache,$interpolate){
  var service={};
  service.row = {};

var templateId = "views/UfoWndow.tpl.html";

service.interpolateIt = function(expresson){
  return $interpolate(expresson)(service);
};
service.yyyymmddToDate = function(string){
  var year = string.slice(0,4);
  var month = string.slice(4,6);
  var day = string.slice(6,8);
  return month+"/"+day+"/"+year;
};
service.setRow = function(obj){
  console.log(obj);
  service.row = obj;
};
  service.loadTemplate = function(){
    return $templateCache.get(templateId);
  };
  return service;
}]);
