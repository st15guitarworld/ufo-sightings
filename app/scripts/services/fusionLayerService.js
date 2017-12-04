'use strict';

angular.module('siteApp')
.service('fusionLayerService',function(){
var options = {
  query: {
    from: '12OGzBkwXOkK9jUWlMOgUzp2ZYVB16Yjnl6SzuXBu',
    select : 'latitude',
    where : ''
  }
};
function createBlankMapQueryOperation(){
  return {
    from : '12OGzBkwXOkK9jUWlMOgUzp2ZYVB16Yjnl6SzuXBu',
    select : 'latitude',
    where :''
  };
}
function andTwoQeries(q1,q2){
  if( typeof q1.where === 'undefined' || typeof q2.where === 'undefined'){
    return null;
  }else{
    return {
        from : q1.from,
        select : q1.select,
        where : q1.where + " AND " +q2.where
    };
  }
}
function getcurrentMapQuery(){
  return options.query;
}
function resetLayer(){
  options.query = createBlankMapQueryOperation();
}
  return {
    options:options,
    getNewQuery : createBlankMapQueryOperation,
    and :andTwoQeries,
    reset : resetLayer

  };



});
