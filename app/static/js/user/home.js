/* global google:true */

(function(){
  'use strict';
  var map;

  $(document).ready(function(){
//this starts the zoom control of the map
    initMap(36, -86, 2);
  });

  function initMap(lat, lng, zoom){
//styles is the code from snazzy maps.com and I put styles:styles to input at the end of line 14, RAODMAP is the kind of map
    var styles = [{'stylers':[{'hue':'#ff1a00'},{'invert_lightness':true},{'saturation':-100},{'lightness':33},{'gamma':0.5}]},{'featureType':'water','elementType':'geometry','stylers':[{'color':'#2D333C'}]}],
        mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: styles};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

})();

