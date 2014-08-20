/* global google:true */

(function(){
  'use strict';

  var map;

  $(document).ready(function(){
    var pos = getPosition();
    initMap(pos.lat, pos.lng, 11);
    addMarker(pos.lat, pos.lng, pos.name);
  });

  function addMarker(lat, lng, name){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.BOUNCE});
  }

  function getPosition(){
    var $vacation = $('#vacation'),
        name      = $vacation.attr('data-name'),
        lat       = $vacation.attr('data-lat'),
        lng       = $vacation.attr('data-lng'),
        pos       = {name:name, lat:parseFloat(lat), lng:parseFloat(lng)};

    return pos;
  }

  function initMap(lat, lng, zoom){
    var styles = [{'stylers':[{'hue':'#ff1a00'},{'invert_lightness':true},{'saturation':-100},{'lightness':33},{'gamma':0.5}]},{'featureType':'water','elementType':'geometry','stylers':[{'color':'#2D333C'}]}],
        mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: styles};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
})();
