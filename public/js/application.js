// MapBox


mapboxgl.accessToken = 'pk.eyJ1Ijoic2VlbnlhdCIsImEiOiJja25odW9sY3YzaXBmMnBwOWx4MXA5eWwyIn0.TL1Zyx2TDLUmkT-WShQiyQ';
var map = new mapboxgl.Map({
  container : 'mapbox',
  style : 'mapbox://styles/mapbox/streets-v11',
  zoom : 11,
  center : [37.618423, 55.751244],
  pitch : 45,
  bearing : 17.6
});

map.on('load', function () {
  map.addSource('places', {
      'type': 'geojson',
      'data': points
  });
  map.addLayer({
      'id': 'places',
      'type': 'symbol',
      'source': 'places',
      'layout': {
          'icon-image': '{icon}',
          'icon-allow-overlap': true
      }
  });
  map.on('click', 'places', function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
  });
  map.on('mouseenter', 'places', function () {
      map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'places', function () {
      map.getCanvas().style.cursor = '';
  });
});

