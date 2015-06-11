  $('.trigger').click(function(e){
    e.stopPropagation();
   $('.category' + $(this).attr('id')).children('ul').toggle();
  })

  $('#toggler').hover(function(e){
    e.stopPropagation();
    $(this).css({ 'width':  '100%',
                  'height': '100%'})
    $('#layers').toggle();
    $('#stacks').toggle();
  }, function(e){
    e.stopPropagation();
    $(this).css({ 'width':  '30px',
                  'height': '30px'})
    $('#layers').toggle();
    $('#stacks').toggle();
  })
  L.mapbox.accessToken='pk.eyJ1IjoidXJiaW5zaWdodCIsImEiOiJIbG1xUDBBIn0.o2RgJkl1-wCO7yyG7Khlzg';

  var map = L.mapbox.map('map', 'urbinsight.1114602d', {
    zoomControl: true,
    legendControl: {
      position: 'bottomleft'
    }
  })
  .setView([-12.0433, -77.0283], 11);

  map.on('layeradd', function(e) {
    console.log(e);
    map.fitBounds(e.layer.options.bounds);
  });

  var mapboxIDs = ['urbinsight.dailysolidwasteLima', 'urbinsight.miningconcessionsLima', 'urbinsight.communityResource', 'urbinsight.jose-galvez-zoning',
  'urbinsight.hilllsidecensus', 'urbinsight.publichealthrisks', 'urbinsight.JGtopology']
    
      
    function addLayer(layer, gridLayer, num) {
      // layer.setZIndex(zIndex);
      var gridControl = L.mapbox.gridControl(gridLayer, {follow: false}).addTo(map);
      $('#input' + num).click(function(e){
        e.stopPropagation();
        if (map.hasLayer(layer)){
          map.removeLayer(layer);
          map.removeLayer(gridLayer);
          map.legendControl.removeLegend(layer.getTileJSON().legend);
        } else {
          map.addLayer(layer);
          map.addLayer(gridLayer);
          map.legendControl.addLegend(layer.getTileJSON().legend);
        }
      })
    }
    for (var i = mapboxIDs.length - 1; i >= 0; i--) {
      addLayer(L.mapbox.tileLayer(mapboxIDs[i]), L.mapbox.gridLayer(mapboxIDs[i]), i)
    };