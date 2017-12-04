'use strict';

angular.module('siteApp')
.service('PointService',function(){
  this.toRadians = function(degrees){
    return degrees * Math.PI/180;
  }
  this.getDistance = function(p1,p2){
    var R = 6371000; // metres
    var φ1 = toRadians(p1.lat);
    var φ2 = toRadians(p2.lat);
    var Δφ = toRadians(p2.lat - p1.lat);
    var Δλ = toRadians(p2.lng - p1.lng);

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
  }

})
