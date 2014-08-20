/* global google:true */

(function(){
  'use strict';

  var map;

  $(document).ready(function(){
    initMap(0, 0, 2);
    var positions = getPositions();
    positions.forEach(function(pos){
      addMarker(pos.lat, pos.lng, pos.name);
    });
  });

  function initMap(lat, lng, zoom){
    var styles = [{'stylers':[{'hue':'#ff1a00'},{'invert_lightness':true},{'saturation':-100},{'lightness':33},{'gamma':0.5}]},{'featureType':'water','elementType':'geometry','stylers':[{'color':'#2D333C'}]}],
        mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAPi, styles: styles};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function getPositions(){
    var positions = $('table tbody tr').toArray().map(function(tr){
      var name  = $(tr).attr('data-name'),
            lat = $(tr).attr('data-lat'),
            lng = $(tr).attr('data-lng'),
            pos = {name:name, lat:parseFloat(lat), lng:parseFloat(lng)};

      return pos;
    });
    return positions;
  }
//adding animation: google.maps.Animation.DROP gives the markers a droping animations, line 36 end of line
  function addMarker(lat, lng, name){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.DROP, icon: '/img/map-pointer-icon.png'});
  }

})();
