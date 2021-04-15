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
      // This GeoJSON contains features that include an "icon"
      // property. The value of the "icon" property corresponds
      // to an image in the Mapbox Streets style's sprite.
      'type': 'geojson',
      'data': points
  });
  // Add a layer showing the places.
  map.addLayer({
      'id': 'places',
      'type': 'symbol',
      'source': 'places',
      'layout': {
          'icon-image': '{icon}',
          'icon-allow-overlap': true
      }
  });

  // When a click event occurs on a feature in the places layer, open a popup at the
  // location of the feature, with description HTML from its properties.
  map.on('click', 'places', function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on('mouseenter', 'places', function () {
      map.getCanvas().style.cursor = 'pointer';
  });

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'places', function () {
      map.getCanvas().style.cursor = '';
  });
});

