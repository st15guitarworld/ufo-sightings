'use strict';
angular.module('siteApp')
.service('MapService',[function(){
   var mapInstance = null;

   var theMap = {
    events:{
      tilesloaded:onTilesLoaded
    },
    center : {
      latitude: 45,
      longitude: -73
    },
    control:{},
    zoom:8,
    options:{
      zoomControl : false,
      streetViewControl: false,
      minZoom:4
    }
  };

   function onBoundsChanged(){
     console.log("Bounds Have Changed");

          if (mapInstance == null || typeof mapInstance === 'undefined') {
            console.log('hahaha null');
            return;
          }
          var mapBounds = mapInstance.getBounds();
          var zoom = mapInstance.zoom;
          var query = {
            from: '12OGzBkwXOkK9jUWlMOgUzp2ZYVB16Yjnl6SzuXBu',
            select : 'latitude',
            where : 'ST_INTERSECTS(latitude, RECTANGLE(LATLNG'+mapBounds.getSouthWest()+',LATLNG'+mapBounds.getNorthEast() +'))',
            limit :""+zoomLevelToPoints(zoom)+""
          }
          theMap.options.query= query;

   }
   function FilterPointsBasedOnBounds(){

   }
   function centerandZoomTo(latlong){
     mapInstance.setCenter(latlong);
     mapInstance.setZoom(7);
   }
   function getInstance(){
     return mapInstance;
   }
   function onTilesLoaded(map){
         mapInstance = map;
   }
   function zoomLevelToPoints(zoom){
      return zoom == 0 ? 10000 : zoom * 450;
   }

return {
  theMap:theMap,
  getInstance:getInstance
};
}]);
